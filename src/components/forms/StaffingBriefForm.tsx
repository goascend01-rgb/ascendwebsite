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
import { ROLES } from "@/lib/staffing";

/* A staffing enquiry is not a leak report.

   Both staffing calls to action used to land on the platform contact form,
   which asks for twelve months of appointment history, explains the four
   revenue leaks, and files the result as "Leak report request". A practice
   that wants to know who is available for a front desk seat next month was
   asked for none of that, and the enquiry arrived labelled as something it
   was not.

   The questions here are the ones the staffing call actually opens with. */

const SEATS = ["1", "2", "3", "4 or more", "Not sure yet"];
const START = ["As soon as possible", "Within a month", "One to three months", "Just exploring"];

export function StaffingBriefForm() {
  const { state, submit } = useSubmit("staffing-brief");
  const [role, setRole] = useState("");
  const [seats, setSeats] = useState("");
  const [start, setStart] = useState("");

  const busy = state.status === "submitting";
  const fieldErrors = state.status === "error" ? state.fieldErrors : undefined;

  if (state.status === "sent") {
    return (
      <SuccessPanel
        title="That is with us."
        message="We reply within one business day. On the call we will tell you exactly who is available for your role today, and if there is nobody we will say so and tell you how long it takes."
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
          <Field label="Your name" htmlFor="sname" error={fieldErrors?.name}>
            <TextInput id="sname" name="name" required autoComplete="name" />
          </Field>

          <Field label="Practice name" htmlFor="spractice" error={fieldErrors?.practice}>
            <TextInput
              id="spractice"
              name="practice"
              required
              autoComplete="organization"
            />
          </Field>

          <Field label="Email" htmlFor="semail" error={fieldErrors?.email}>
            <TextInput
              id="semail"
              name="email"
              type="email"
              required
              autoComplete="email"
            />
          </Field>

          <Field label="Phone" htmlFor="sphone" optional error={fieldErrors?.phone}>
            <TextInput id="sphone" name="phone" type="tel" autoComplete="tel" />
          </Field>

          <Field label="Role you need" htmlFor="srole">
            <Select
              id="srole"
              label="Role you need"
              options={[...ROLES.map((r) => r.name), "Something else"]}
              value={role}
              onChange={setRole}
              placeholder="Select a role"
            />
            <input type="hidden" name="role" value={role} />
          </Field>

          <Field label="How many people" htmlFor="sseats">
            <Select
              id="sseats"
              label="How many people"
              options={SEATS}
              value={seats}
              onChange={setSeats}
              placeholder="Select"
            />
            <input type="hidden" name="seats" value={seats} />
          </Field>
        </div>

        <div className="mt-6 space-y-6">
          <Field label="When you need them" htmlFor="sstart">
            <Select
              id="sstart"
              label="When you need them"
              options={START}
              value={start}
              onChange={setStart}
              placeholder="Select"
            />
            <input type="hidden" name="start" value={start} />
          </Field>

          <Field
            label="Software they would work in"
            htmlFor="ssystems"
            optional
            error={fieldErrors?.systems}
          >
            <TextInput id="ssystems" name="systems" />
          </Field>

          <Field label="Anything else" htmlFor="smessage" optional error={fieldErrors?.message}>
            <TextArea id="smessage" name="message" rows={4} />
          </Field>
        </div>

        <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Button type="submit" variant="primary" size="lg" disabled={busy}>
            {busy ? "Sending" : <>Send my brief <span aria-hidden="true">→</span></>}
          </Button>
          <span className="font-mono text-[0.66rem] tracking-wider text-fg-muted uppercase">
            You pay only after you hire
          </span>
        </div>
      </fieldset>

      <p aria-live="polite" className="sr-only">
        {busy ? "Sending your brief." : ""}
      </p>

      {state.status === "error" && (
        <FormError message={state.message} email={SITE.email} />
      )}
    </form>
  );
}
