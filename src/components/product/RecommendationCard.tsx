"use client";

import { motion } from "motion/react";
import { ConfidenceRail } from "./ConfidenceRail";

/* A real Command Center recommendation, rendered in the site's own design
   language. Not a mock dashboard with invented revenue: this is the actual
   shape the product produces, which is the most persuasive object Ascend
   owns.

   It is a figure, not a control. The Approve and Not now affordances are
   depicted rather than wired, and the caption says so, because a site whose
   argument is "we do not fake things" cannot ship a fake button. */

const ease = [0.2, 0.7, 0.2, 1] as const;

export function RecommendationCard({ delay = 0 }: { delay?: number }) {
  return (
    <figure className="relative mx-auto w-full max-w-[440px]">
      {/* queue context: a card floating alone reads as a component demo */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay }}
        className="flex items-center justify-between px-1 pb-3"
      >
        <span className="label-mono">{"// Command Center"}</span>
        <span className="flex items-center gap-2 font-mono text-[0.62rem] tracking-[0.16em] text-fg-tertiary uppercase">
          <span className="h-1 w-1 rounded-full bg-accent" />
          1 of 4 waiting
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: delay + 0.08 }}
        className="relative flex gap-5 rounded-lg border border-border-line bg-surface-1 p-6 shadow-[0_40px_90px_-50px_rgba(0,0,0,0.9)]"
      >
        <ConfidenceRail confidence={0.6} label="Evidence 60 percent, established" />

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-[0.62rem] tracking-[0.18em] text-accent uppercase">
              Opportunity
            </span>
            <span aria-hidden="true" className="h-2.5 w-px bg-border-strong" />
            <span className="font-mono text-[0.62rem] tracking-[0.18em] text-fg-tertiary uppercase">
              High
            </span>
          </div>

          <h3 className="mt-3.5 font-display text-[1.06rem] leading-snug font-medium text-fg">
            Win back 64 patients who slipped away
          </h3>

          <p className="mt-3 text-[0.87rem] leading-[1.65] font-light text-fg-secondary">
            64 patients cancelled or no-showed in the last 3 months and never
            rebooked. A win-back campaign could recover an estimated $3,584 (at a
            20% return rate).
          </p>

          {/* the evidence, because a number you cannot interrogate is a number
              you should not be shown */}
          <dl className="mt-5 space-y-2 rounded-md border border-border-soft bg-control px-4 py-3.5">
            {[
              ["Source", "Your visit history, last 3 months"],
              ["Assumed", "20% return rate"],
              ["Excluded", "Patients who opted out of SMS"],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-3 text-[0.72rem]">
                <dt className="w-[4.6rem] shrink-0 font-mono tracking-[0.1em] text-fg-muted uppercase">
                  {k}
                </dt>
                <dd className="min-w-0 font-light text-fg-tertiary">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-5">
            <div className="flex items-center justify-between font-mono text-[0.62rem] tracking-[0.14em] text-fg-tertiary uppercase">
              <span>Confidence</span>
              <span className="text-accent">Established · 60</span>
            </div>
            <div className="mt-2">
              <ConfidenceRail
                confidence={0.6}
                orientation="horizontal"
                label="Confidence established, 60"
              />
            </div>
          </div>

          <div aria-hidden="true" className="mt-6 flex gap-2.5">
            <span className="inline-flex flex-1 items-center justify-center rounded-sm bg-accent px-4 py-2.5 font-mono text-[0.72rem] font-bold tracking-[0.04em] text-on-accent">
              Approve
            </span>
            <span className="inline-flex flex-1 items-center justify-center rounded-sm border border-border-strong px-4 py-2.5 font-mono text-[0.72rem] tracking-[0.04em] text-fg-secondary">
              Not now
            </span>
          </div>
        </div>
      </motion.div>

      <motion.figcaption
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease, delay: delay + 0.4 }}
        className="mt-3.5 px-1 text-[0.72rem] leading-relaxed font-light text-fg-tertiary"
      >
        A real card from the product, shown at rest. Nothing here is sent until
        somebody presses Approve.
      </motion.figcaption>
    </figure>
  );
}
