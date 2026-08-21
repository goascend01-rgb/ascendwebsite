"use client";

import { motion } from "motion/react";
import {
  EVIDENCE_COLOR,
  EVIDENCE_FILL,
  EVIDENCE_LABEL,
  type EvidenceState,
} from "@/lib/confidence";

/* The signature element of this site.

   A hairline on the leading edge of every product object, whose fill encodes
   what KIND of thing the number beside it is. It is empty when there is
   nothing to measure, which is the whole argument: colour here is earned by
   evidence rather than applied for decoration.

     measured        full, cyan
     estimated       partial, cyan
     unknown         short, amber
     not_applicable  unlit, with a dashed foot

   It takes a state rather than a number on purpose. See lib/confidence.ts:
   the numeric version let this site invent a "60" for a recommendation the
   platform explicitly refuses to score.

   `tierPct` is the one numeric escape hatch, for Intelligence Network
   lessons, whose tier really is a published number. */

export function ConfidenceRail({
  state,
  tierPct,
  label,
  orientation = "vertical",
}: {
  state: EvidenceState;
  /** Network lessons only, where a published tier genuinely exists. */
  tierPct?: number;
  label?: string;
  orientation?: "vertical" | "horizontal";
}) {
  const fraction =
    typeof tierPct === "number"
      ? Math.max(0, Math.min(1, tierPct / 100))
      : EVIDENCE_FILL[state];
  const pct = fraction * 100;
  const description = label ?? EVIDENCE_LABEL[state];
  const fill = EVIDENCE_COLOR[state];

  if (orientation === "horizontal") {
    return (
      <div
        role="img"
        aria-label={description}
        className="relative h-[2px] w-full overflow-hidden rounded-full bg-border-line"
      >
        <motion.span
          className="absolute inset-y-0 left-0 block"
          style={{ background: fill }}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, ease: [0.2, 0.7, 0.2, 1], delay: 0.15 }}
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={description}
      className="relative w-[2px] shrink-0 self-stretch overflow-hidden rounded-full bg-border-line"
    >
      <motion.span
        className="absolute inset-x-0 bottom-0 block"
        style={{ background: fill }}
        initial={{ height: 0 }}
        whileInView={{ height: `${pct}%` }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1, ease: [0.2, 0.7, 0.2, 1], delay: 0.15 }}
      />
      {state === "not_applicable" && (
        <span
          aria-hidden="true"
          className="absolute inset-x-[-1.5px] bottom-0 h-3"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to top, var(--fg-muted) 0 2px, transparent 2px 5px)",
          }}
        />
      )}
    </div>
  );
}
