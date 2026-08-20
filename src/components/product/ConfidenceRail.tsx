"use client";

import { motion } from "motion/react";
import { confidenceState, type ConfidenceState } from "@/lib/confidence";

/* The signature element of this site.

   A hairline rail on the leading edge of every product object, whose fill
   encodes how much evidence sits behind what the card says. It is EMPTY
   when there is none, which is the whole argument: colour here is earned
   by evidence rather than applied for decoration.

     backed   (>= 0.5)   cyan, the only lit state
     held     (0 to 0.5) amber, a real signal that has not cleared the floor
     unknown  (0)        unlit, track only

   Used on the hero recommendation, the three truth cards, the network
   confidence tiers, and the calculator readout. */

const fillColor: Record<ConfidenceState, string> = {
  backed: "var(--accent)",
  held: "var(--warning)",
  unknown: "transparent",
};

export function ConfidenceRail({
  confidence,
  label,
  orientation = "vertical",
}: {
  /** 0 to 1. Zero means no evidence at all, and the rail stays unlit. */
  confidence: number;
  label?: string;
  orientation?: "vertical" | "horizontal";
}) {
  const state = confidenceState(confidence);
  const pct = Math.max(0, Math.min(1, confidence)) * 100;
  const description =
    label ??
    (state === "unknown"
      ? "No evidence yet"
      : `Evidence ${Math.round(pct)} percent`);

  if (orientation === "horizontal") {
    return (
      <div
        role="img"
        aria-label={description}
        className="relative h-[2px] w-full overflow-hidden rounded-full bg-border-line"
      >
        <motion.span
          className="absolute inset-y-0 left-0 block"
          style={{ background: fillColor[state] }}
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
        style={{ background: fillColor[state] }}
        initial={{ height: 0 }}
        whileInView={{ height: `${pct}%` }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1, ease: [0.2, 0.7, 0.2, 1], delay: 0.15 }}
      />
      {state === "unknown" && (
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
