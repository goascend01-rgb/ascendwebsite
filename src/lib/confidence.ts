/* Pure helpers for the evidence rail.

   Kept out of the component module so that server components can classify a
   value without pulling a client boundary across.

   ── WHY THIS IS A STATE AND NOT A PERCENTAGE ──────────────────────────────

   The first version of this file took a 0 to 1 "confidence" number and the
   product cards passed literals: 0.6 for the win-back card, 0.15 for the
   setup blocker. Those numbers were invented by this website.

   The platform is explicit that they cannot exist. packages/core/src/
   decisions.ts, on the confidence tier:

       "Null on deterministic recs, which have no honest
        Emerging/Established/Proven tier, surfacing one there would
        fabricate it."

   A deterministic recommendation is a count over real rows. It is not
   uncertain, and it is also not "established" on a scale that only applies
   to pattern-derived lessons. Printing a tier there is the exact failure
   this site is built to argue against, and it was doing it on the hero.

   So the rail encodes the product's OWN vocabulary instead: every metric
   occupies one of four states, and those states are real.

       measured         we checked, and this is the number
       estimated        derived under assumptions that are shown
       unknown          the evidence has not arrived yet
       not_applicable   there is nothing here to measure

   A NUMERIC tier is still honest in exactly one place: Intelligence Network
   lessons really do carry emerging (40), established (60) and proven (90) as
   policy constants, earned from independent corroboration. `networkTier`
   exists for that and nothing else. */

export type EvidenceState =
  | "measured"
  | "estimated"
  | "unknown"
  | "not_applicable";

/** How much of the rail is filled for each state. Fixed, so no caller can
    invent a value by passing a number. */
export const EVIDENCE_FILL: Record<EvidenceState, number> = {
  measured: 1,
  estimated: 0.55,
  unknown: 0.18,
  not_applicable: 0,
};

/** Colour is earned by evidence. Only `measured` and `estimated` are lit. */
export const EVIDENCE_COLOR: Record<EvidenceState, string> = {
  measured: "var(--accent)",
  estimated: "var(--accent)",
  unknown: "var(--warning)",
  not_applicable: "transparent",
};

/** What the rail is announced as. Never a number the product cannot produce. */
export const EVIDENCE_LABEL: Record<EvidenceState, string> = {
  measured: "Measured",
  estimated: "Estimated, assumptions shown",
  unknown: "Not yet known",
  not_applicable: "Nothing to measure",
};

/** Text colour for a card's label row, following the same rule. */
export const EVIDENCE_TEXT: Record<EvidenceState, string> = {
  measured: "var(--accent)",
  estimated: "var(--accent)",
  unknown: "var(--warning)",
  not_applicable: "var(--fg-tertiary)",
};

/* ── The one place a numeric tier is real ────────────────────────────────
   Network lessons carry a published confidence tier, mirrored from
   packages/core/src/policy. These are earned, not asserted. */

export type NetworkTier = "emerging" | "established" | "proven";

export const NETWORK_TIER_SCORE: Record<NetworkTier, number> = {
  emerging: 40,
  established: 60,
  proven: 90,
};
