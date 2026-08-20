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

/* The conversion endpoint (spec section 6.26). Eight fields and no more:
   every extra field costs conversions, and the call is where the real
   questions get asked.

   The submission posts to /api/submissions and only reports success on a
   2xx. If delivery fails, the form says so and offers an email address that
   does not depend on the thing that just broke. */

const LOCATIONS = ["1", "2", "3 to 5", "6 to 10", "More than 10"];

export function LeakReportForm() {
  const { state, submit } = useSubmit("leak-report");
  const [locations, setLocations] = useState("");

  const busy = state.status === "submitting";
  const fieldErrors = state.status === "error" ? state.fieldErrors : undefined;

  if (state.status === "sent") {
    return (
      <SuccessPanel
        title="That is with us."
        message="We reply within one business day with a time. If you have an export of your last twelve months of appointments, have it to hand. If you do not, the call still works and we use ranges instead."
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
          <Field label="Your name" htmlFor="name" error={fieldErrors?.name}>
            <TextInput id="name" name="name" required autoComplete="name" />
          </Field>

          <Field label="Practice name" htmlFor="practice" error={fieldErrors?.practice}>
            <TextInput
              id="practice"
              name="practice"
              required
              autoComplete="organization"
            />
          </Field>

          <Field label="Email" htmlFor="email" error={fieldErrors?.email}>
            <TextInput
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
            />
          </Field>

          <Field label="Phone" htmlFor="phone" optional error={fieldErrors?.phone}>
            <TextInput id="phone" name="phone" type="tel" autoComplete="tel" />
          </Field>

          <Field label="Number of locations">
            <Select
              id="locations"
              options={LOCATIONS}
              value={locations}
              onChange={setLocations}
              placeholder="Select"
            />
            <input type="hidden" name="locations" value={locations} />
          </Field>

          <Field
            label="Roughly how many active patients"
            htmlFor="patients"
            hint="An estimate is fine. We are not going to hold you to it."
            error={fieldErrors?.patients}
          >
            <TextInput
              id="patients"
              name="patients"
              inputMode="numeric"
              placeholder="1,200"
            />
          </Field>
        </div>

        <div className="mt-6 space-y-6">
          <Field label="What you are using today" htmlFor="stack" error={fieldErrors?.stack}>
            <TextInput
              id="stack"
              name="stack"
              placeholder="Practice management software, phone system, anything else"
            />
          </Field>

          <Field label="Anything else" htmlFor="message" optional error={fieldErrors?.message}>
            <TextArea id="message" name="message" rows={4} />
          </Field>
        </div>

        <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Button type="submit" variant="primary" size="lg" disabled={busy}>
            {busy ? "Sending" : "Send my twelve months →"}
          </Button>
          <span className="font-mono text-[0.66rem] tracking-wider text-fg-muted uppercase">
            20 minutes · No obligation
          </span>
        </div>
      </fieldset>

      <p aria-live="polite" className="sr-only">
        {busy ? "Sending your details." : ""}
      </p>

      {state.status === "error" && (
        <FormError message={state.message} email={SITE.email} />
      )}
    </form>
  );
}
