"use client";

import { useState } from "react";
import { Field, TextInput, TextArea, Select, SuccessPanel } from "./fields";
import { Button } from "@/components/ui/Button";

const ROLES = [
  "Front desk / receptionist",
  "Scheduling coordinator",
  "Billing specialist",
  "Insurance / claims coordinator",
  "Certified medical coder",
  "Medical scribe",
];

const EXPERIENCE = ["Less than 1 year", "1–3 years", "3–5 years", "5+ years"];

export function ApplyForm() {
  const [sent, setSent] = useState(false);
  const [role, setRole] = useState("");
  const [exp, setExp] = useState("");

  if (sent) {
    return (
      <SuccessPanel
        title="Application received."
        message="Thanks for applying to Ascend. If your experience is a match, our talent team will reach out to schedule a short screening call."
      />
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="rounded-xl border border-border-line bg-surface-1 p-8 md:p-10"
    >
      {/* about you */}
      <div className="label-mono">{"// About you"}</div>
      <div className="mt-5 grid gap-6 sm:grid-cols-2">
        <Field label="Full name" htmlFor="aname">
          <TextInput id="aname" name="name" required placeholder="Maria Reyes" />
        </Field>
        <Field label="Email" htmlFor="aemail">
          <TextInput
            id="aemail"
            name="email"
            type="email"
            required
            placeholder="maria@email.com"
          />
        </Field>
        <Field label="Phone / WhatsApp" htmlFor="aphone">
          <TextInput id="aphone" name="phone" placeholder="+1 (000) 000-0000" />
        </Field>
        <Field label="Location & time zone" htmlFor="aloc">
          <TextInput id="aloc" name="location" placeholder="Manila, PH (GMT+8)" />
        </Field>
      </div>

      {/* experience */}
      <div className="label-mono mt-10">{"// Experience"}</div>
      <div className="mt-5 grid gap-6 sm:grid-cols-2">
        <Field label="Role you're applying for">
          <Select
            options={ROLES}
            value={role}
            onChange={setRole}
            placeholder="Select a role…"
          />
        </Field>
        <Field label="Years in healthcare">
          <Select
            options={EXPERIENCE}
            value={exp}
            onChange={setExp}
            placeholder="Select…"
          />
        </Field>
        <Field
          label="Software you know"
          htmlFor="asoft"
          hint="e.g. Dentrix, Open Dental, Epic, athenahealth"
        >
          <TextInput
            id="asoft"
            name="software"
            placeholder="Dentrix, Open Dental…"
          />
        </Field>
        <Field label="Resume / portfolio link" htmlFor="aresume">
          <TextInput
            id="aresume"
            name="resume"
            type="url"
            placeholder="https://…"
          />
        </Field>
      </div>

      <div className="mt-6">
        <Field label="Why Ascend?" htmlFor="amsg">
          <TextArea
            id="amsg"
            name="message"
            rows={4}
            placeholder="Tell us a little about your experience and what you're looking for…"
          />
        </Field>
      </div>

      <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <Button type="submit" variant="primary" size="lg">
          Submit application →
        </Button>
        <span className="font-mono text-[0.66rem] tracking-wider text-fg-muted uppercase">
          Remote · Full-time · We respond to every applicant
        </span>
      </div>
    </form>
  );
}
