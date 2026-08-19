"use client";

import { useState } from "react";
import { Field, TextInput, TextArea, Select, SuccessPanel } from "./fields";
import { Button } from "@/components/ui/Button";

const PRACTICE_TYPES = [
  "Dental practice",
  "Dental group (multi-location)",
  "Medical practice",
  "Specialty clinic",
  "Hospital / health system",
  "Other",
];

const NEEDS = [
  "Front desk / reception",
  "Billing & insurance",
  "Coding & scribes",
  "AI platform",
  "Not sure yet",
];

export function DemoForm() {
  const [sent, setSent] = useState(false);
  const [practice, setPractice] = useState("");
  const [need, setNeed] = useState("");

  if (sent) {
    return (
      <SuccessPanel
        title="You're booked in."
        message="Thanks — our team will reach out within one business day to confirm your demo. Keep an eye on your inbox."
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
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Full name" htmlFor="name">
          <TextInput id="name" name="name" required placeholder="Jane Okafor" />
        </Field>
        <Field label="Work email" htmlFor="email">
          <TextInput
            id="email"
            name="email"
            type="email"
            required
            placeholder="jane@practice.com"
          />
        </Field>
        <Field label="Practice name" htmlFor="practice">
          <TextInput
            id="practice"
            name="practice"
            required
            placeholder="Cedar Park Dental"
          />
        </Field>
        <Field label="Phone" htmlFor="phone">
          <TextInput
            id="phone"
            name="phone"
            type="tel"
            placeholder="(512) 555-0142"
          />
        </Field>
        <Field label="Practice type">
          <Select
            options={PRACTICE_TYPES}
            value={practice}
            onChange={setPractice}
            placeholder="Select type…"
          />
        </Field>
        <Field label="What do you need?">
          <Select
            options={NEEDS}
            value={need}
            onChange={setNeed}
            placeholder="Select…"
          />
        </Field>
      </div>

      <div className="mt-6">
        <Field label="Anything else?" htmlFor="message">
          <TextArea
            id="message"
            name="message"
            rows={4}
            placeholder="Tell us about your current setup, software, or biggest staffing headache…"
          />
        </Field>
      </div>

      <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <Button type="submit" variant="primary" size="lg">
          Book my demo →
        </Button>
        <span className="font-mono text-[0.66rem] tracking-wider text-fg-muted uppercase">
          20 minutes · No upfront cost · No obligation
        </span>
      </div>
    </form>
  );
}
