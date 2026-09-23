// Imports
import { useState } from "react";
import type { ChangeEvent, FocusEvent, FormEvent, ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
// Components
import { Button } from "@/components/ui";
// Data
import { products, supportForm, supportTopics } from "@/data";
// Utils
import { normaliseSupportRequest, validateSupportRequest } from "@/utils";
import type { SupportErrors } from "@/utils";
// Types
import type { SupportRequest } from "@/types";

type FormStatus = "idle" | "sending" | "sent" | "error";
type FieldElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

// Shared by every field so the form reads as one piece.
const labelClasses = "block text-sm font-medium text-ink";
const fieldClasses =
  "mt-2 block w-full rounded-lg border bg-canvas px-3.5 py-2.5 text-sm text-ink transition-colors placeholder:text-muted focus:border-accent";

const fallbackError = "Your message could not be sent. Check your connection and try again.";

// Interface
interface FieldProps {
  name: keyof SupportRequest;
  label: string;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}

// A labelled field with its required mark, an optional hint, and, once there
// is one, its error in the hint's place. Both are tied to the control, so a
// screen reader reads them with the field.
function Field({ name, label, hint, error, className = "", children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={`support-${name}`} className={labelClasses}>
        {label}
        <span className="ml-0.5 text-accent" aria-hidden="true">
          *
        </span>
      </label>
      {children}
      {error ? (
        <p id={`support-${name}-error`} className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      ) : (
        hint && (
          <p id={`support-${name}-hint`} className="mt-1.5 text-sm text-muted">
            {hint}
          </p>
        )
      )}
    </div>
  );
}

//
function SupportForm() {
  // An application or a product page can link here with ?product=<slug>, so
  // the product arrives already selected.
  const [searchParams] = useSearchParams();
  const requested = searchParams.get("product") ?? "";
  const initialProduct = products.some((product) => product.slug === requested) ? requested : "";

  const [values, setValues] = useState<SupportRequest>({
    name: "",
    email: "",
    product: initialProduct,
    topic: "",
    subject: "",
    message: "",
    website: "",
  });
  const [errors, setErrors] = useState<SupportErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState<string>("");

  // Checks one field against the same rules the server applies.
  const checkField = (name: keyof SupportRequest, next: SupportRequest) => {
    const message = validateSupportRequest(normaliseSupportRequest(next))[name];
    setErrors((current) => ({ ...current, [name]: message }));
  };

  const update = (event: ChangeEvent<FieldElement>) => {
    const name = event.target.name as keyof SupportRequest;
    const next = { ...values, [name]: event.target.value };
    setValues(next);

    // A flagged field clears the moment it is put right.
    if (errors[name]) checkField(name, next);
  };

  // A field is checked once it is left, not while it is still being typed in.
  // An empty one waits for the submit, so tabbing through does not flag it.
  const leave = (event: FocusEvent<FieldElement>) => {
    const name = event.target.name as keyof SupportRequest;
    if (values[name].trim()) checkField(name, values);
  };

  // Everything a field needs to take part: its value, its checks, and the
  // attributes that tie it to its label and its error.
  const bind = (name: keyof SupportRequest) => ({
    id: `support-${name}`,
    name,
    value: values[name],
    onChange: update,
    onBlur: leave,
    required: true,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `support-${name}-error` : undefined,
    className: `${fieldClasses} ${errors[name] ? "border-red-500" : "border-rule"}`,
  });

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const request = normaliseSupportRequest(values);
    const found = validateSupportRequest(request);
    setErrors(found);

    // Nothing is sent until every field passes; the visitor is taken straight
    // to the first one that needs fixing.
    const firstInvalid = (Object.keys(found) as (keyof SupportRequest)[])[0];
    if (firstInvalid) {
      window.document.getElementById(`support-${firstInvalid}`)?.focus();
      return;
    }

    setStatus("sending");
    setError("");

    try {
      const response = await fetch(supportForm.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        // The function explains a refused request field by field; anything
        // else gets the general message.
        const result = (await response.json().catch(() => ({}))) as {
          error?: string;
          errors?: SupportErrors;
        };
        setErrors(result.errors ?? {});
        setError(result.error ?? fallbackError);
        setStatus("error");
        return;
      }

      setStatus("sent");
    } catch {
      setError(fallbackError);
      setStatus("error");
    }
  };

  // Once sent, the form gives way to a confirmation rather than sitting there
  // inviting a second copy of the same message.
  if (status === "sent") {
    return (
      <div role="status" className="rounded-2xl border border-rule bg-surface p-6 sm:p-8">
        <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
          Thanks, {values.name.trim()}.
        </h2>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-body">
          Your message is with us. A confirmation is on its way to{" "}
          <span className="font-medium text-ink">{values.email.trim()}</span>, and we will
          reach you there as soon as we can.
        </p>
      </div>
    );
  }

  // The browser's own bubbles are switched off; the checks above replace them,
  // with the same rules the server applies.
  return (
    <form
      noValidate
      onSubmit={submit}
      className="rounded-2xl border border-rule bg-surface p-6 sm:p-8"
    >
      <p className="mb-6 text-sm text-muted">
        Fields marked <span className="text-accent">*</span> are required.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        {/*  */}
        <Field name="name" label="Name" error={errors.name}>
          <input
            {...bind("name")}
            type="text"
            maxLength={supportForm.limits.name}
            autoComplete="name"
            placeholder="Your full name"
          />
        </Field>

        {/* The guidance sits under the field rather than in it, where a
            half-width input would cut it short. */}
        <Field
          name="email"
          label="Email Address"
          hint="Enter the working email address where we will reach out to you."
          error={errors.email}
        >
          <input
            {...bind("email")}
            aria-describedby={errors.email ? "support-email-error" : "support-email-hint"}
            type="email"
            maxLength={supportForm.limits.email}
            autoComplete="email"
            placeholder="name@example.com"
          />
        </Field>

        {/* Listed from the catalogue, so a renamed or new product shows here as it is. */}
        <Field name="product" label="Product" error={errors.product}>
          <select {...bind("product")}>
            <option value="" disabled>
              Select a product
            </option>
            {products.map((product) => (
              <option key={product.slug} value={product.slug}>
                {product.name}
              </option>
            ))}
            <option value="general">Not about a specific product</option>
          </select>
        </Field>

        <Field name="topic" label="Topic" error={errors.topic}>
          <select {...bind("topic")}>
            <option value="" disabled>
              Select a topic
            </option>
            {supportTopics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </Field>

        {/*  */}
        <Field name="subject" label="Subject" error={errors.subject} className="sm:col-span-2">
          <input
            {...bind("subject")}
            type="text"
            maxLength={supportForm.limits.subject}
            placeholder="Subject to the Feedback or Support"
          />
        </Field>

        <Field
          name="message"
          label="Description"
          error={errors.message}
          className="sm:col-span-2"
        >
          <textarea
            {...bind("message")}
            rows={7}
            maxLength={supportForm.limits.message}
            placeholder="Brief Description of Feedback or Problem"
          />
        </Field>
      </div>

      {/* Kept off-screen and out of the tab order. People never fill it in; a
          bot that fills in every field does, and its message is dropped. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>
          Website
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={update}
          />
        </label>
      </div>

      {/*  */}
      <div className="mt-8 flex flex-col gap-4 border-t border-rule pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          Never include passwords or payment details in this form.
        </p>
        <Button type="submit" disabled={status === "sending"} className="shrink-0">
          {status === "sending" ? "Sending…" : "Send message"}
        </Button>
      </div>

      {status === "error" && (
        <p role="alert" className="mt-4 text-sm text-red-600">
          {error}
        </p>
      )}
    </form>
  );
}

export default SupportForm;
