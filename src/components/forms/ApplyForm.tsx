"use client";

import { useState } from "react";
import {
  Field,
  TextInput,
  TextArea,
  Select,
  SuccessPanel,
  Honeypot,
  FormError,
} from "./fields";
import { Button } from "@/components/ui/Button";
import { useSubmit } from "./useSubmit";
import { SITE } from "@/lib/site";

const ROLES = [
  "Front desk and reception",
  "Scheduling coordinator",
  "Billing specialist",
  "Insurance and claims coordinator",
  "Certified coder",
  "Scribe",
];

const EXPERIENCE = [
  "Less than 1 year",
  "1 to 3 years",
  "3 to 5 years",
  "More than 5 years",
];

export function ApplyForm() {
  const { state, submit } = useSubmit("talent-application");
  const [role, setRole] = useState("");
  const [exp, setExp] = useState("");

  const busy = state.status === "submitting";
  const fieldErrors = state.status === "error" ? state.fieldErrors : undefined;

  if (state.status === "sent") {
    return (
      <SuccessPanel
        title="Application received."
        message="Thanks for applying to Ascend. If your experience is a match, we will reach out to schedule a short screening call."
      />
    );
  }

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (!busy) submit(e.currentTarget);
      }}
      className="relative rounded-xl border border-border-line bg-surface-1 p-7 md:p-10"
    >
      <Honeypot />

      <fieldset disabled={busy} className="contents">
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Full name" htmlFor="aname" error={fieldErrors?.name}>
            <TextInput id="aname" name="name" required autoComplete="name" />
          </Field>

          <Field label="Email" htmlFor="aemail" error={fieldErrors?.email}>
            <TextInput
              id="aemail"
              name="email"
              type="email"
              required
              autoComplete="email"
            />
          </Field>

          <Field label="Phone or WhatsApp" htmlFor="aphone" error={fieldErrors?.phone}>
            <TextInput id="aphone" name="phone" type="tel" autoComplete="tel" />
          </Field>

          <Field
            label="Location and time zone"
            htmlFor="aloc"
            hint="Most roles cover US practice hours."
            error={fieldErrors?.location}
          >
            <TextInput id="aloc" name="location" />
          </Field>

          <Field label="Role you are applying for">
            <Select
              id="arole"
              options={ROLES}
              value={role}
              onChange={setRole}
              placeholder="Select a role"
            />
            <input type="hidden" name="role" value={role} />
          </Field>

          <Field label="Years of experience">
            <Select
              id="aexp"
              options={EXPERIENCE}
              value={exp}
              onChange={setExp}
              placeholder="Select"
            />
            <input type="hidden" name="experience" value={exp} />
          </Field>
        </div>

        <div className="mt-6 space-y-6">
          <Field
            label="Systems you have worked in"
            htmlFor="asystems"
            optional
            hint="Practice management, scheduling, billing or clinical record systems."
            error={fieldErrors?.systems}
          >
            <TextInput id="asystems" name="systems" />
          </Field>

          <Field
            label="Resume or portfolio link"
            htmlFor="aresume"
            optional
            error={fieldErrors?.resume}
          >
            <TextInput id="aresume" name="resume" type="url" placeholder="https://" />
          </Field>

          <Field label="Why Ascend" htmlFor="amsg" optional error={fieldErrors?.message}>
            <TextArea id="amsg" name="message" rows={4} />
          </Field>
        </div>

        <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Button type="submit" variant="primary" size="lg" disabled={busy}>
            {busy ? "Sending" : "Send my application →"}
          </Button>
          <span className="font-mono text-[0.66rem] tracking-wider text-fg-muted uppercase">
            We reply to every application
          </span>
        </div>
      </fieldset>

      <p aria-live="polite" className="sr-only">
        {busy ? "Sending your application." : ""}
      </p>

      {state.status === "error" && (
        <FormError message={state.message} email={SITE.email} />
      )}
    </form>
  );
}
