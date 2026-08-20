/* Pure helpers for the confidence rail.

   Kept out of the component module so that server components can classify a
   confidence value without pulling a client boundary across. */

export type ConfidenceState = "backed" | "held" | "unknown";

export function confidenceState(confidence: number): ConfidenceState {
  if (confidence <= 0) return "unknown";
  return confidence >= 0.5 ? "backed" : "held";
}

/* backed is the only lit state: colour on this site is earned by evidence. */
export const CONFIDENCE_COLOR: Record<ConfidenceState, string> = {
  backed: "var(--accent)",
  held: "var(--warning)",
  unknown: "var(--fg-muted)",
};
