/* ==============================================================
   Founder tokens.

   Values the founder must supply before launch. They are held as
   null rather than as a bracketed placeholder string so that no
   unresolved marker can ever be pasted into a page by accident,
   and so the guard test for stray placeholders stays trivially
   true.

   An unresolved token renders as a visible marker in development
   and fails the production build via scripts/check-tokens.mjs,
   which runs as npm prebuild. A shipped placeholder is worse than
   a missing page.
   ============================================================== */

export type TokenId =
  | "FOUNDER_NAME"
  | "FOUNDER_STORY"
  | "LEGAL_ENTITY_NAME"
  | "REGISTERED_ADDRESS"
  | "GOVERNING_LAW";

export type TokenRecord = {
  /** null means the founder has not supplied it yet. */
  value: string | null;
  /** What breaks without it, shown in the build failure and the dev marker. */
  neededFor: string;
  blocking: boolean;
};

export const TOKENS: Record<TokenId, TokenRecord> = {
  FOUNDER_NAME: {
    value: "Hamraz Azam Khan Bangash",
    neededFor: "About page, founder letter, direct line to the founder",
    blocking: true,
  },
  /* Drafted from the founder's own account on 2026-08-20 and written to be
     edited by him. Blank lines separate paragraphs. Nothing in it is
     invented: every date, practice and role came from him. */
  FOUNDER_STORY: {
    value: [
      "I qualified as a dentist in 2018 and spent the next four years inside other people's practices. Some were luxury operations with a coordinator for everything. Some were running on one overworked person at the front desk. The problems were identical. Only the budget for hiding them was different.",
      "I opened my own practice in 2022, and that is when the theory ended.",
      "Then I started working remotely with a practice in the United States, first on diagnoses and treatment planning, and with a second one on claims and insurance. That is where I learned the American side of this business from the inside: what actually gets billed, what quietly gets written off, and how much revenue leaves a practice without anybody noticing it go.",
      "In 2025 I opened a second practice, much larger than the first. That is where this stopped being a complaint and became an idea.",
      "Ascend is every time I needed a second opinion at 9pm and had nobody to ask. It is every time I knew there was a list of patients I should have been calling and no hand free to call them. It is every time I wanted the load to get lighter and bought something that handed me another dashboard instead.",
      "It is also why it tells you when it does not know. I have made decisions off confident numbers that nobody could explain to me, and I would rather run something that says it is unsure and turns out to be right than something that sounds certain and is not.",
    ].join("\n\n"),
    neededFor: "About page, 200 to 300 words in the founder's own voice",
    blocking: true,
  },
  /* Ascend is a registered business name of an individual rather than a
     separate legal person, so the contracting party is the proprietor
     trading as Ascend. The FBR registration number is deliberately kept
     out of this repository as well as off the site: it is a personal tax
     identifier, this repository is public, and nothing here needs it. */
  LEGAL_ENTITY_NAME: {
    value: "Hamraz Azam Khan Bangash, trading as Ascend",
    neededFor: "Privacy policy and terms of service, required for Meta app review",
    blocking: true,
  },
  /* Founder decision, 2026-08-20: the registered address is a private
     residence and is not published. Meta requires a reachable policy URL,
     not a postal address. Some privacy regimes expect one, so this is on
     the list for legal review. */
  REGISTERED_ADDRESS: {
    value:
      "Registered in Lahore, Pakistan. A postal address is available on request.",
    neededFor: "Privacy policy and terms of service, required for Meta app review",
    blocking: true,
  },
  /* Founder decision, 2026-08-20. Flagged at the time and reaffirmed:
     naming Delaware law while the only entity is a Pakistani sole
     proprietorship is a mismatch a lawyer must sign off on. */
  GOVERNING_LAW: {
    value: "the laws of the State of Delaware, United States",
    neededFor: "Terms of service, section 15",
    blocking: true,
  },
};

export function tokenValue(id: TokenId): string | null {
  return TOKENS[id].value;
}

export function unresolvedTokens(): TokenId[] {
  return (Object.keys(TOKENS) as TokenId[]).filter((id) => TOKENS[id].value === null);
}

export function unresolvedBlockingTokens(): TokenId[] {
  return unresolvedTokens().filter((id) => TOKENS[id].blocking);
}
