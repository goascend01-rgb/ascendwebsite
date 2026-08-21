/* ==============================================================
   Form submission shapes and server side validation.

   Hand written rather than pulled from a schema library: there are
   two forms and sixteen fields between them, the rules are simple,
   and the site is better served by one fewer dependency than by a
   more expressive validator.

   Everything here runs on the server. The browser also checks, but
   a browser check is a convenience for the person filling the form,
   never a guarantee about what arrives.
   ============================================================== */

export type SubmissionKind =
  | "leak-report"
  | "staffing-brief"
  | "talent-application";

export type FieldSpec = {
  name: string;
  label: string;
  required: boolean;
  maxLength: number;
  kind?: "email" | "url";
};

export const FORM_FIELDS: Record<SubmissionKind, FieldSpec[]> = {
  "leak-report": [
    { name: "name", label: "Your name", required: true, maxLength: 120 },
    { name: "practice", label: "Practice name", required: true, maxLength: 160 },
    { name: "email", label: "Email", required: true, maxLength: 200, kind: "email" },
    { name: "phone", label: "Phone", required: false, maxLength: 60 },
    { name: "locations", label: "Number of locations", required: false, maxLength: 40 },
    { name: "patients", label: "Active patients", required: false, maxLength: 40 },
    { name: "stack", label: "What you are using today", required: false, maxLength: 400 },
    { name: "message", label: "Anything else", required: false, maxLength: 4000 },
  ],
  "staffing-brief": [
    { name: "name", label: "Your name", required: true, maxLength: 120 },
    { name: "practice", label: "Practice name", required: true, maxLength: 160 },
    { name: "email", label: "Email", required: true, maxLength: 200, kind: "email" },
    { name: "phone", label: "Phone", required: false, maxLength: 60 },
    { name: "role", label: "Role you need", required: false, maxLength: 120 },
    { name: "seats", label: "How many people", required: false, maxLength: 40 },
    { name: "start", label: "When you need them", required: false, maxLength: 80 },
    { name: "systems", label: "Software they would work in", required: false, maxLength: 400 },
    { name: "message", label: "Anything else", required: false, maxLength: 4000 },
  ],
  "talent-application": [
    { name: "name", label: "Full name", required: true, maxLength: 120 },
    { name: "email", label: "Email", required: true, maxLength: 200, kind: "email" },
    { name: "phone", label: "Phone or WhatsApp", required: false, maxLength: 60 },
    { name: "location", label: "Location and time zone", required: false, maxLength: 160 },
    { name: "role", label: "Role", required: false, maxLength: 80 },
    { name: "experience", label: "Years of experience", required: false, maxLength: 60 },
    { name: "systems", label: "Systems you have worked in", required: false, maxLength: 400 },
    { name: "resume", label: "Resume or portfolio link", required: false, maxLength: 400, kind: "url" },
    { name: "message", label: "Why Ascend", required: false, maxLength: 4000 },
  ],
};

export const KIND_LABEL: Record<SubmissionKind, string> = {
  "leak-report": "Leak report request",
  "staffing-brief": "Staffing brief",
  "talent-application": "Talent application",
};

export function isSubmissionKind(value: unknown): value is SubmissionKind {
  return (
    value === "leak-report" ||
    value === "staffing-brief" ||
    value === "talent-application"
  );
}

/* Deliberately permissive. The job is to reject what cannot possibly be an
   address, not to adjudicate the RFC. A real address that this rejected
   would be a lost customer. */
const EMAIL = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;

export type ValidationResult =
  | { ok: true; values: Record<string, string> }
  | { ok: false; errors: Record<string, string> };

export function validate(
  kind: SubmissionKind,
  raw: Record<string, unknown>
): ValidationResult {
  const errors: Record<string, string> = {};
  const values: Record<string, string> = {};

  for (const field of FORM_FIELDS[kind]) {
    const input = raw[field.name];
    const value = typeof input === "string" ? input.trim() : "";

    if (!value) {
      if (field.required) errors[field.name] = `${field.label} is required.`;
      continue;
    }

    if (value.length > field.maxLength) {
      errors[field.name] = `${field.label} is too long.`;
      continue;
    }

    if (field.kind === "email" && !EMAIL.test(value)) {
      errors[field.name] = "That does not look like an email address.";
      continue;
    }

    if (field.kind === "url" && !/^https?:\/\/\S+$/i.test(value)) {
      errors[field.name] = "A link needs to start with http or https.";
      continue;
    }

    values[field.name] = value;
  }

  return Object.keys(errors).length > 0 ? { ok: false, errors } : { ok: true, values };
}

/* Header injection guard for the values that reach an email envelope. */
export function sanitiseHeaderValue(value: string): string {
  return value.replace(/[\r\n]+/g, " ").slice(0, 200);
}

export function renderSubmission(
  kind: SubmissionKind,
  values: Record<string, string>,
  meta: { receivedAt: string }
): { subject: string; text: string } {
  const who = values.name ?? "Unknown";
  const where = values.practice ? ` at ${values.practice}` : "";
  const subject = sanitiseHeaderValue(`${KIND_LABEL[kind]}: ${who}${where}`);

  const lines = FORM_FIELDS[kind]
    .filter((field) => values[field.name])
    .map((field) => `${field.label}:\n${values[field.name]}\n`);

  const text = [
    KIND_LABEL[kind],
    `Received ${meta.receivedAt}`,
    "",
    ...lines,
  ].join("\n");

  return { subject, text };
}
