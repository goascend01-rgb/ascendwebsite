"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { LEAK_MODEL, LEAK_FIELDS, type LeakInputs, type LeakField } from "@/lib/site";
import { computeLeaks, money } from "@/lib/leak";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";

/* The leak calculator (spec section 6.11).

   The visitor builds the number themselves, which is why every rate is
   exposed and editable rather than baked into a claim. Two behaviours are
   borrowed straight from the product: whole visits only, and a row whose
   inputs are zero reads "Not applicable" instead of $0. */

function formatField(field: LeakField, value: number) {
  if (field.kind === "money") return money(value);
  if (field.kind === "rate") return `${Math.round(value * 100)}%`;
  return value.toLocaleString();
}

function Field({
  field,
  value,
  onChange,
}: {
  field: LeakField;
  value: number;
  onChange: (v: number) => void;
}) {
  const id = `leak-${field.key}`;
  return (
    <div className="group py-4">
      <div className="flex items-baseline justify-between gap-4">
        <label
          htmlFor={id}
          className="text-[0.92rem] leading-snug font-light text-fg-secondary transition-colors duration-300 group-focus-within:text-fg"
        >
          {field.label}
        </label>
        <output
          htmlFor={id}
          className="shrink-0 font-mono text-[0.93rem] tabular-nums text-fg"
        >
          {formatField(field, value)}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={field.min}
        max={field.max}
        step={field.step}
        value={value}
        /* Without this a rate slider is announced as "0.08" and the money one
           as "12000". The visible <output> already shows 8% and PKR 12,000, and the
           two should not disagree. */
        aria-valuetext={formatField(field, value)}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
      />
    </div>
  );
}

const GROUP_LABELS: Record<LeakField["group"], string> = {
  shared: "Your practice",
  reactivation: "Patients who drift",
  slots: "Cancellations",
  enquiries: "Enquiries after hours",
};

const GROUP_ORDER: LeakField["group"][] = [
  "shared",
  "reactivation",
  "slots",
  "enquiries",
];

export function Calculator() {
  const [inputs, setInputs] = useState<LeakInputs>(LEAK_MODEL);
  const result = computeLeaks(inputs);

  const set = (key: keyof LeakInputs, value: number) =>
    setInputs((prev) => ({ ...prev, [key]: value }));

  const reset = () => setInputs(LEAK_MODEL);
  const isDefault = GROUP_ORDER.length > 0 &&
    (Object.keys(LEAK_MODEL) as (keyof LeakInputs)[]).every(
      (k) => inputs[k] === LEAK_MODEL[k]
    );

  return (
    <section id="calculator" className="scroll-mt-24 py-24 md:py-28">
      <div className="shell">
        <SectionHeader
          label="// What it is worth, with the assumptions in the open"
          title={<>We would rather show the working than quote a big number.</>}
        />

        <div className="mt-16 grid gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          {/* ------------------------------ inputs ------------------------------ */}
          <Reveal className="h-full">
            <div className="flex h-full flex-col rounded-lg border border-border-line bg-surface-1 p-7 md:p-8">
              <div className="flex items-center justify-between">
                <h3 className="label-mono">{"// Your inputs"}</h3>
                <button
                  type="button"
                  onClick={reset}
                  disabled={isDefault}
                  className="rounded-sm font-mono text-[0.66rem] tracking-[0.14em] text-fg-tertiary uppercase transition-colors duration-300 hover:text-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4 disabled:pointer-events-none disabled:opacity-40"
                >
                  Reset
                </button>
              </div>

              <div className="mt-4 divide-y divide-border-soft">
                {GROUP_ORDER.map((group) => (
                  <fieldset key={group} className="py-3">
                    <legend className="font-mono text-[0.6rem] tracking-[0.18em] text-fg-muted uppercase">
                      {GROUP_LABELS[group]}
                    </legend>
                    {LEAK_FIELDS.filter((f) => f.group === group).map((field) => (
                      <Field
                        key={field.key}
                        field={field}
                        value={inputs[field.key]}
                        onChange={(v) => set(field.key, v)}
                      />
                    ))}
                  </fieldset>
                ))}
              </div>
            </div>
          </Reveal>

          {/* ------------------------------ readout ------------------------------ */}
          <Reveal delay={0.1} className="h-full">
            <div className="flex h-full flex-col rounded-lg border border-border-strong bg-surface-2 p-7 md:p-8">
              <h3 className="label-mono">{"// The working"}</h3>

              <ul className="mt-7 space-y-px overflow-hidden rounded-md border border-border-soft bg-border-soft">
                {result.rows.map((row) => (
                  <li key={row.id} className="bg-surface-1 px-5 py-4">
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="text-[0.93rem] leading-snug font-light text-fg-secondary">
                        {row.label}
                      </p>
                      {row.state === "not_applicable" ? (
                        <span className="shrink-0 font-mono text-[0.72rem] tracking-[0.08em] text-fg-muted uppercase">
                          Not applicable
                        </span>
                      ) : (
                        <span className="shrink-0 font-mono text-[1rem] tabular-nums text-fg">
                          {row.visits.toLocaleString()}
                          <span className="ml-1.5 text-[0.68rem] tracking-[0.1em] text-fg-muted uppercase">
                            visits
                          </span>
                        </span>
                      )}
                    </div>
                    <div className="mt-1.5 flex items-baseline justify-between gap-4">
                      <p className="font-mono text-[0.66rem] tracking-[0.08em] text-fg-muted uppercase">
                        {row.basis}
                      </p>
                      {row.state === "estimated" && !result.valueNotApplicable && (
                        <span className="shrink-0 font-mono text-[0.74rem] tabular-nums text-fg-tertiary">
                          {money(row.value)}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              {/* total */}
              <div className="mt-7 border-t border-border-line pt-7">
                {result.allNotApplicable ? (
                  <>
                    <p className="font-display text-[1.6rem] leading-tight font-light text-fg-tertiary">
                      Not applicable
                    </p>
                    <p className="mt-3 max-w-[42ch] text-[0.84rem] leading-[1.65] font-light text-fg-tertiary">
                      With those inputs there is nothing to recover. That is a real
                      answer, so it is the one shown, rather than a zero dressed up
                      as a result.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="font-mono text-[0.66rem] tracking-[0.16em] text-fg-tertiary uppercase">
                        Recoverable per year
                      </span>
                      <span className="font-mono text-[0.8rem] tabular-nums text-fg-secondary">
                        {result.totalVisits.toLocaleString()} visits
                      </span>
                    </div>
                    <motion.p
                      key={result.totalValue}
                      initial={{ opacity: 0.55 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.35 }}
                      className="display mt-3 text-[clamp(2.3rem,5.5vw,3.4rem)] tabular-nums text-accent"
                    >
                      {result.valueNotApplicable
                        ? "Not applicable"
                        : money(result.totalValue)}
                    </motion.p>
                    {result.valueNotApplicable && (
                      <p className="mt-3 max-w-[42ch] text-[0.84rem] leading-[1.65] font-light text-fg-tertiary">
                        {result.totalVisits.toLocaleString()} visits are recoverable,
                        but with no value per visit set there is nothing honest to
                        multiply them by.
                      </p>
                    )}
                    <p className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-accent-dim px-3 py-1.5 font-mono text-[0.62rem] tracking-[0.1em] text-accent uppercase">
                      Estimated · assumptions shown
                    </p>
                  </>
                )}
              </div>

              {/* The assumptions live beside the number rather than under the
                  fold, because the number means nothing without them. */}
              <div className="mt-auto space-y-4 border-t border-border-soft pt-7 text-[0.93rem] leading-[1.7] font-light text-fg-secondary">
                <p>
                  Every rate on the left is a placeholder, deliberately. Ascend does
                  not run on assumed rates.
                </p>
                <p>
                  Once your history is imported, the ones it can measure it
                  measures. Your value per visit comes straight from your own
                  records. The rest stay visible as the assumptions they are,
                  rather than hardening into numbers nobody checked.
                </p>
                <p className="text-fg-tertiary">
                  Where it has no evidence yet it says not yet measurable rather
                  than guessing. A number you cannot interrogate is a number you
                  should not be shown.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="mt-5 flex flex-col gap-5 rounded-lg border border-border-line bg-bg p-7 sm:flex-row sm:items-center sm:justify-between md:p-8">
            <p className="max-w-[52ch] text-[1rem] leading-[1.7] font-light text-fg-secondary">
              That is a worked example. The one that matters is yours, built from
              your last twelve months.
            </p>
            <ButtonLink
              href="/contact"
              variant="primary"
              size="lg"
              className="w-fit shrink-0"
            >
              Run this on my real numbers <span aria-hidden="true">→</span>
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
