// Data
// Relative paths on purpose: the support function imports this file too, and
// it runs on Netlify outside the "@" alias.
import { products } from "../data/products";
import { supportForm, supportTopics } from "../data/site";
// Types
import type { SupportRequest } from "@/types";

// One message per field that needs fixing, in the order the form lists them.
export type SupportErrors = Partial<Record<keyof SupportRequest, string>>;

// A loose check. Whether an address really works is settled by the confirmation.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Reads anything that claims to be a support request into one, trimmed, with
// every field present, so what is checked is exactly what gets sent.
export const normaliseSupportRequest = (input: unknown): SupportRequest => {
  const fields = (typeof input === "object" && input !== null ? input : {}) as Record<string, unknown>;
  const read = (key: keyof SupportRequest): string =>
    typeof fields[key] === "string" ? (fields[key] as string).trim() : "";

  return {
    name: read("name"),
    email: read("email"),
    product: read("product"),
    topic: read("topic"),
    subject: read("subject"),
    message: read("message"),
    website: read("website"),
  };
};

// The form and the support function both run this, so the form never lets
// through something the server would refuse, and the server never trusts the
// form. The wording is for the person filling it in.
export const validateSupportRequest = (request: SupportRequest): SupportErrors => {
  const errors: SupportErrors = {};
  const { limits } = supportForm;

  if (!request.name) errors.name = "Enter your name.";
  else if (request.name.length > limits.name)
    errors.name = `Keep your name to ${limits.name} characters or fewer.`;

  if (!request.email) errors.email = "Enter your email address.";
  else if (!EMAIL_PATTERN.test(request.email) || request.email.length > limits.email)
    errors.email = "Enter a valid email address, like name@example.com.";

  if (request.product !== "general" && !products.some((product) => product.slug === request.product))
    errors.product = "Select the product your message is about.";

  if (!supportTopics.includes(request.topic)) errors.topic = "Select a topic.";

  if (!request.subject) errors.subject = "Enter a subject.";
  else if (request.subject.length > limits.subject)
    errors.subject = `Keep the subject to ${limits.subject} characters or fewer.`;

  if (!request.message) errors.message = "Describe your feedback or problem.";
  else if (request.message.length < limits.messageMin)
    errors.message = `Add a little more detail, at least ${limits.messageMin} characters.`;
  else if (request.message.length > limits.message)
    errors.message = `Keep the description to ${limits.message} characters or fewer.`;

  return errors;
};
