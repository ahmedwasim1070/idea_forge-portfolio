// Data
// Relative paths on purpose: this runs on Netlify's servers, outside the "@"
// alias, and reads the same catalogue the site renders — a renamed product is
// renamed in every email too.
import { products } from "../../src/data/products";
import { SITE_URL, publisher, supportForm } from "../../src/data/site";
// Utils
// The same checks the form runs before it sends anything.
import { normaliseSupportRequest, validateSupportRequest } from "../../src/utils/support";
// Types
import type { Product, SupportRequest } from "../../src/types";

// Brevo's transactional endpoint. The key is only ever read here, on the server.
const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";

// Shown when the mail cannot go out, which is never the visitor's doing.
const unavailable =
  "Your message could not be sent right now. Please try again in a few minutes.";

// Interface
interface EmailMessage {
  to: { email: string; name: string };
  replyTo?: { email: string; name: string };
  subject: string;
  html: string;
  text: string;
}

//
const json = (status: number, body: Record<string, unknown>): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

// Everything a visitor typed ends up inside HTML, so it is escaped first.
const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// Escaped, with the visitor's own line breaks kept.
const toHtmlText = (value: string): string => escapeHtml(value).replace(/\r?\n/g, "<br />");

// Where the confirmation points while a request waits for a reply: the
// product's Terms of Usage when it has them, otherwise its page, or the whole
// catalogue for a request about no one product.
const getHelpLink = (siteUrl: string, product?: Product): { label: string; url: string } => {
  if (!product) return { label: "Browse our products", url: `${siteUrl}/products` };

  const terms = product.legal["terms-of-usage"];

  if (terms?.kind === "hosted")
    return { label: `Read the ${terms.label}`, url: `${siteUrl}/products/${product.slug}/terms-of-usage` };
  if (terms?.kind === "external") return { label: `Read the ${terms.label}`, url: terms.url };

  return { label: `View ${product.name}`, url: `${siteUrl}/products/${product.slug}` };
};

// The branded frame both emails share: the name on steel, a line of heat as on
// the site's hero, the content on white, and a quiet footer. Tables and inline
// styles are what mail clients reliably render.
const renderFrame = (siteUrl: string, content: string): string => `<!doctype html>
<html lang="en">
<body style="margin:0;padding:0;background-color:#f5f3ff;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f3ff;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border:1px solid #e4e0f5;border-radius:16px;overflow:hidden;font-family:Inter,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#43406b;">
          <tr>
            <td style="background-color:#141026;padding:24px 32px;font-family:'Space Grotesk','Segoe UI',Helvetica,Arial,sans-serif;font-size:20px;font-weight:700;color:#ffffff;">
              ${escapeHtml(publisher.fullName)}
            </td>
          </tr>
          <tr>
            <td style="height:4px;background-color:#ff8a3d;background-image:linear-gradient(100deg,#ff8a3d,#ffc24b);font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:32px;">${content}</td>
          </tr>
          <tr>
            <td style="padding:20px 32px;border-top:1px solid #e4e0f5;font-size:13px;color:#74719b;">
              ${escapeHtml(publisher.fullName)} &middot; ${escapeHtml(publisher.tagline)}<br />
              <a href="${siteUrl}" style="color:#6d4aff;">${siteUrl.replace(/^https?:\/\//, "")}</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

// To the support inbox. Replying to it answers the visitor directly.
const renderNotification = (
  siteUrl: string,
  request: SupportRequest,
  productName: string
): EmailMessage => {
  const rows: [string, string][] = [
    ["Name", request.name],
    ["Email", request.email],
    ["Product", productName],
    ["Topic", request.topic],
    ["Subject", request.subject],
  ];

  const table = rows
    .map(
      ([term, value]) =>
        `<tr><td style="padding:8px 16px 8px 0;color:#74719b;vertical-align:top;white-space:nowrap;">${term}</td><td style="padding:8px 0;color:#12102a;">${escapeHtml(value)}</td></tr>`
    )
    .join("");

  return {
    to: { email: supportForm.email, name: publisher.fullName },
    replyTo: { email: request.email, name: request.name },
    subject: `[${productName}] ${request.topic}: ${request.subject}`,
    html: renderFrame(
      siteUrl,
      `<p style="margin:0 0 20px;font-size:18px;font-weight:600;color:#12102a;">New support request</p>
      <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:14px;">${table}</table>
      <div style="margin-top:24px;padding:16px 20px;border-left:2px solid #6d4aff;background-color:#f5f3ff;color:#12102a;">${toHtmlText(request.message)}</div>`
    ),
    text: [
      "New support request",
      "",
      ...rows.map(([term, value]) => `${term}: ${value}`),
      "",
      request.message,
    ].join("\n"),
  };
};

// To the visitor: the request has arrived, what happens next, and somewhere
// useful to look in the meantime.
const renderConfirmation = (
  siteUrl: string,
  request: SupportRequest,
  product?: Product
): EmailMessage => {
  const help = getHelpLink(siteUrl, product);
  const about = product ? ` about <strong style="color:#12102a;">${escapeHtml(product.name)}</strong>` : "";
  const aboutText = product ? ` about ${product.name}` : "";

  return {
    to: { email: request.email, name: request.name },
    subject: `We have received your message — ${publisher.fullName}`,
    html: renderFrame(
      siteUrl,
      `<p style="margin:0 0 16px;font-size:18px;font-weight:600;color:#12102a;">Hi ${escapeHtml(request.name)},</p>
      <p style="margin:0 0 16px;">Thank you for contacting ${escapeHtml(publisher.fullName)}${about}. Your message has reached us, and we will reach you at this address as soon as we can.</p>
      <p style="margin:0 0 16px;">Until then, this may help:</p>
      <p style="margin:0 0 28px;"><a href="${help.url}" style="display:inline-block;padding:10px 20px;border-radius:8px;background-color:#6d4aff;color:#ffffff;font-weight:600;text-decoration:none;">${escapeHtml(help.label)}</a></p>
      <p style="margin:0 0 8px;font-size:13px;color:#74719b;">What you sent us</p>
      <div style="padding:16px 20px;border-left:2px solid #6d4aff;background-color:#f5f3ff;color:#12102a;">
        <strong>${escapeHtml(request.subject)}</strong><br />${toHtmlText(request.message)}
      </div>
      <p style="margin:24px 0 0;font-size:13px;color:#74719b;">To add anything, reply to this email. We will never ask for your password or payment details.</p>`
    ),
    text: [
      `Hi ${request.name},`,
      "",
      `Thank you for contacting ${publisher.fullName}${aboutText}. Your message has reached us, and we will reach you at this address as soon as we can.`,
      "",
      `Until then, this may help: ${help.url}`,
      "",
      "What you sent us:",
      request.subject,
      request.message,
      "",
      "To add anything, reply to this email. We will never ask for your password or payment details.",
      "",
      `${publisher.fullName} · ${siteUrl}`,
    ].join("\n"),
  };
};

// Sends one email through Brevo, from the support address. Reports failure
// rather than throwing, so the caller decides what a failure means.
const sendEmail = async (message: EmailMessage): Promise<boolean> => {
  try {
    const response = await fetch(BREVO_ENDPOINT, {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY ?? "",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        sender: { name: publisher.fullName, email: supportForm.email },
        to: [message.to],
        replyTo: message.replyTo,
        subject: message.subject,
        htmlContent: message.html,
        textContent: message.text,
      }),
    });

    if (!response.ok) console.error("Brevo refused the email:", response.status, await response.text());
    return response.ok;
  } catch (error) {
    console.error("Brevo could not be reached:", error);
    return false;
  }
};

// Served at /.netlify/functions/support, which the single-page fallback in
// netlify.toml never rewrites.
export default async (request: Request): Promise<Response> => {
  if (request.method !== "POST") return json(405, { error: "Method not allowed." });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json(400, { error: "The form could not be read. Please try again." });
  }

  // Refused field by field, so the form can mark each one.
  const submission = normaliseSupportRequest(body);
  const errors = validateSupportRequest(submission);
  const firstError = Object.values(errors)[0];
  if (firstError) return json(400, { error: firstError, errors });

  // Only a bot fills in the hidden field. It is told the message went through,
  // so it has no reason to try again.
  if (submission.website) return json(200, { ok: true });

  if (!process.env.BREVO_API_KEY) {
    console.error("BREVO_API_KEY is not set for this site's functions.");
    return json(500, { error: unavailable });
  }

  // The primary address Netlify reports, so links do not detour through a redirect.
  const siteUrl = (process.env.URL ?? SITE_URL).replace(/\/$/, "");
  const product = products.find((item) => item.slug === submission.product);

  // The request only counts as received once it is in the support inbox.
  const delivered = await sendEmail(
    renderNotification(siteUrl, submission, product?.name ?? "General")
  );
  if (!delivered) return json(502, { error: unavailable });

  // By now the request has reached us, so a failed confirmation is logged
  // rather than reported as a failed submission.
  if (!(await sendEmail(renderConfirmation(siteUrl, submission, product)))) {
    console.error("The confirmation to the visitor could not be sent.");
  }

  return json(200, { ok: true });
};
