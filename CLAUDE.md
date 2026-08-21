# CLAUDE.md — Ascend Website

## Always Do First
- **Read and apply the custom skills in `/skills/`** before writing any frontend/UI code, every session, no exceptions:
  - `skills/frontend-design/frontendSKILL.md` — for marketing pages (homepage, pricing, landing).
  - `skills/interface-design/interfaceSKILL.md` — for product surfaces (the Command Center card, the truth cards, the calculator, anything app-like).
- These are the project's own copies of the Anthropic frontend-design / interface-design skills. They are NOT installed as harness skills — read the files directly.
- **Read `WEBSITE-REBUILD-SPEC.md` §4, the claim-truth register, before writing a single line of copy.** It is the document that stops you shipping a lie. Where this file and the spec disagree, the spec wins.

---

## The one rule that matters

> Every claim on this website must be something the Ascend codebase can actually do today, and the product's willingness to say "I do not know yet" is the strongest selling point it has.

The guard tests in `tests/` exist to keep that true after this session. Run `npm test` before you commit. If a guard fails, the copy is wrong, not the test.

---

## The Company — Ascend

Two offerings under one brand. **They are not equal and the site must not pretend they are.**

1. **Ascend Operator (primary).** An operating system for independent, appointment-based practices. Front desk across web chat, SMS, WhatsApp, Instagram DM and Facebook Messenger; slot fill when a chair frees up; patient reactivation from the practice's own visit history; reputation; Creative Studio; a ranked Command Center queue where every item carries its reason and its evidence; the Intelligence Network. Assisted by default: nothing reaches a patient until a human approves it.

2. **Ascend Staffing (secondary).** Pre-trained remote professionals: reception, billing and insurance, coding and scribes. Deployed in days, pay only after you hire. **The capability is offered. No clients are placed yet.** No placement count, no client name, no retention rate, ever.

---

## Project Decisions (locked)

- **Platform-first.** The homepage sells Ascend Operator. **There is no hero toggle.** Staffing has its own complete story at `/staffing`.
- **US primary, USD pricing.** HIPAA posture written as architecture. No GDPR badge, no region switcher.
- **The Network leads.** It is the moat, it gets a homepage section and its own page at `/network`.
- **The CTA is not "book a demo".** It is the leak report: send your last twelve months, get your own numbers through the four leaks on a 20-minute call.
- **Pricing:** three tiers, $697 / $1,997 / $4,997 monthly, install $995 / $2,500 / $7,500. Annual is two months free. Founding cohort is 10 practices, price locked for life, cohort two opens at $2,497.
- **No money-back guarantee, ever.** The 90-day working commitment replaces it: outcomes agreed in writing before signature, and if they have not landed by day 90 Ascend keeps working at no further monthly cost until they do.
- **Voice/tone:** bold and visionary but outcome-focused; confident; always ties back to cost, time or revenue. Sentence case headlines, uppercase wide-tracked mono eyebrows.

---

## Content rules (enforced by tests)

- **No long dash may surface.** No em dash, no en dash, no minus sign as punctuation. Use a comma, a colon, a semicolon, parentheses, or two sentences. Guard: `tests/no-long-dash-in-copy.test.ts`.
- **Never claim what is not built.** No voice product, no phone answering, no named PMS or EHR integration, no eligibility or prior-auth or claims work *by the platform*, no email as a patient channel, no "N patients on your waitlist", no monitoring of Google reviews. Guard: `tests/no-unbuilt-claims.test.ts`.
- **No company-scale or measured-outcome statistic.** No practices served, no retention rate, no star rating, no roles placed, no founded year, no "41% fewer no-shows". Zero practices have run Ascend in production. Guard: `tests/no-invented-scale-stats.test.ts`.
- **Social proof is placeholder and unattributable.** Testimonials carry `status: 'placeholder'` and are attributed by **role, practice shape and region** ("Practice owner · two-location group · Texas"). **Never an invented person or business name** — a prospect who searches one and finds nothing gets exactly the reaction this site exists to prevent. Guard: `tests/placeholder-proof-is-unattributed.test.ts`.
- **No vertical is named as the target.** Say "independent practices", "your practice". A vertical may appear only inside an inclusive enumeration in body copy, never in a heading or in metadata. Guard: `tests/no-vertical-in-headlines.test.ts`.
- **Prefer "practice" to "clinic".** Never "campaign" alone: say "CRM outreach" for private patient messaging, "social content" for public posting. Different systems, different consent models.
- **Every number must be attributable.** A market range is labelled as a range and as unmeasured. A worked example says its rates are placeholders.
- **Human service vocabulary lives in `src/lib/staffing.ts` and under `/staffing` only.** Eligibility verification, prior authorization and claim status are true there because people do them, and must never leak into platform copy.

---

## Claims corrected on 2026-08-21, and why they are easy to get wrong again

A seven-lens review verified against the platform source found these. Each one
had been written in good faith from a plausible-sounding summary rather than
from the code. **Read the module, not the roadmap, not a doc, not a memory.**

| The site said | The code says | Where |
| --- | --- | --- |
| "Participation is opt in" | `isNetworkEligible` returns true unless explicitly excluded. Contribution is **opt-out**, and there is no customer-facing control. | `network/collect.ts` |
| "Withdraw and everything is purged" | "MARKED, NEVER DELETED... a withdrawn contribution decays. It never zeroes." | `network/standing.ts` |
| Four subprocessors touch patient data | **Five.** Meta transports Instagram Direct and Messenger, which are two of the five channels the site sells. | `apps/api/src/meta.ts` |
| Hero card: "Confidence · Established · 60" | "Null on deterministic recs, which have no honest tier, surfacing one there would fabricate it." | `decisions.ts` |
| "Excluded: patients who opted out of SMS" | The win-back query filters appointment status only. Consent is enforced at **send**, not in the count. | `revenueRecovery.ts` |
| "Clinical questions routed to a human before any model reads it" | Routed to the **full receptionist tier**, which is a model, and is the only tier that can escalate. | `chatRouter.ts` |
| "Every recommendation carries five fields" | Only pattern-derived ones. Deterministic detectors do not. | `decisions.ts` |
| Calculator "measures your reactivation rate and fill rate" | Neither is measured back. Value per visit is. | |

### The evidence rail takes a STATE, never a number
`ConfidenceRail` used to accept `confidence={0.6}`, and those numbers were
invented by this website. It now takes one of the product's four real metric
states: `measured`, `estimated`, `unknown`, `not_applicable`. The only numeric
escape hatch is `tierPct`, for Intelligence Network lessons, whose tier is a
genuine published constant. **Do not add a numeric confidence back.**

### Contrast is a calculation, not a judgement
All four text tokens clear WCAG AA body text (4.5:1) on the darkest surface
they sit on. `--fg-muted` was at 2.9:1 while carrying tier install prices and
the calculator's "Not applicable" state. If you change a token, compute the
ratio.

### Two traps that wasted real time here
1. **A stale `next start` serves a broken build.** After `npm run build`,
   restart the server on a fresh port. A server whose `.next` was replaced
   underneath it serves 404 CSS and unstyled pages, which reads exactly like a
   catastrophic styling regression and is not one.
2. **A guard that can silently see nothing is worse than no guard.**
   `check-tokens.mjs` inspected one token out of five for weeks and printed
   "All founder tokens resolved". It now cross-checks itself against the
   `TokenId` union and fails if it cannot account for every token.

## Where the capability content comes from

`src/lib/capabilities.ts` carries the second half of the product: the daily loop, the three
intelligence layers, Creative Studio, acquisition economics, the practice record, the briefings,
and the Network mechanics. **Every claim in it was read out of the platform repository
(`../Ascend Platform`) module by module on 2026-08-21.** Before adding or editing a capability
claim, go and read the module, not the roadmap: the roadmap describes intent and the code
describes what ships.

Verified limits that must survive any future edit, because each one is a place the site would
otherwise drift into a lie:

| Capability | The real limit |
| --- | --- |
| Market research | Competitor snapshots are **pasted in by staff**. Ascend does not scrape. Staleness is labelled rather than hidden. |
| Acquisition | Spend is **entered manually**, not synced from an ad platform. Revenue figures are withheld below the revenue-capture floor rather than estimated. |
| Practice record | A clinical and financial record, **not** invoicing or payments. Ascend does not process or chase money. |
| Post citations | A citation naming a case, review or recommendation must match a real row or it is dropped. Narrative citations are marked unverified. The two are never shown as equivalent. |
| Foundation layer | A prior, not a finding. It may never say it observed something in this practice. |

### Names that stay off the site
Founder-directed 2026-08-21. The internal product names are not marketing copy:

- **Command Center** → "the morning queue", "the queue"
- **Board Meeting** → "the weekly review", "a written review each week"

Describe what they do. Both are real and both should be prominent; only the labels are banned.

### The Foundation layer is the answer to "the network is empty on day one"
Do not let a future edit soften the Network's honest baseline without also carrying Foundation
beside it. The honest position is not "the network needs time", it is "two of the three layers
work on day one and the third compounds". Losing half of that makes the product sound weaker
than it is.

## Founder tokens

Live in `src/lib/tokens.ts`. Four of five are resolved; **`FOUNDER_STORY` is the only one still `null`**, and it blocks the production build.

| Token | Value | Decided |
| --- | --- | --- |
| `FOUNDER_NAME` | Hamraz Azam Khan Bangash | 2026-08-20 |
| `LEGAL_ENTITY_NAME` | Hamraz Azam Khan Bangash, trading as Ascend | 2026-08-20 |
| `REGISTERED_ADDRESS` | Registered in Lahore, Pakistan. Postal address on request. | 2026-08-20 |
| `GOVERNING_LAW` | The laws of the State of Delaware, United States | 2026-08-20 |
| `FOUNDER_STORY` | Drafted, **awaiting founder sign-off** | 2026-08-20 |

All five are set, so `npm run build` now runs. `FOUNDER_STORY` was drafted from the founder's own account of his history and is written to be cut and rewritten by him. Every date, practice and role in it came from him; nothing is invented. It is the one value on this site written *for* a person rather than *by* them, so treat it as a draft until he confirms it.

**The founder letter is the one place a vertical may be named**, because "I qualified as a dentist" describes the author rather than the buyer, and the founder rule bans naming a vertical *as the target*. The exemption is scoped by character span to the `FOUNDER_STORY` value in `src/lib/tokens.ts` and capped at a single mention, both enforced in `tests/no-vertical-in-headlines.test.ts`. Do not widen it.

- Render them with `<Token>` / `<TokenText>`, never as a literal bracketed placeholder.
- `npm run build` **refuses to run** while any blocking token is null (`scripts/check-tokens.mjs` as `prebuild`). Use `npx next build` for a preview build.

### The entity, and what follows from it
Ascend is a **registered business name of an individual** registered with the FBR in Pakistan, not a separate company, so the contracting party is the proprietor trading as Ascend. The proprietor is established in **Pakistan** while the buyer is a **US practice under a BAA**. Three things follow and must not be quietly reverted:

1. `/legal/privacy` §14 discloses that Ascend's people access the service from Pakistan and that this is an international transfer of data, including patient data. Infrastructure stays US-hosted.
2. `/security` carries the same disclosure as a first-class section, not a footnote.
3. `/legal/terms` §1 states plainly that the proprietor is personally the contracting party.

Do not soften any of the three. A US practice's counsel finds this in diligence regardless; the site's entire argument is that it says the awkward thing first.

The FBR registration number is deliberately kept **out of this repository as well as off the site**: it is a personal tax identifier and this repository is public. Do not paste it into a comment, a commit message or a page.

---

## Information architecture

`/` · `/platform` · `/network` · `/pricing` · `/how-it-works` · `/staffing` · `/staffing/roles/[slug]` · `/about` · `/security` · `/contact` · `/apply` · `/legal/privacy` · `/legal/terms` · `/legal/data-deletion`

Nav: Platform · Network · Pricing · How it works · Staffing, plus a `Book the call` button. About, Security, Apply and legal live in the footer. The three legal pages must stay crawlable and reachable with no login: Meta app review fails on a 404.

---

## Visual Direction — "Premium Dark"

Brand-true, aerospace/architectural, distinctly NOT generic-healthcare-blue. **This is settled. Do not restyle.**

- **Palette:** near-black canvas (`#08090b`), layered dark surfaces, crisp off-white type, muted gray hierarchy, **single electric-cyan accent** (`#34e6e0`), amber (`#e8b13d`) reserved for held or unverified states.
- **Colour is earned by evidence.** Cyan means Ascend can back it. Amber means it is holding a real but insufficient signal. **No accent at all** means it genuinely does not know. That mapping is the site's argument made structural, and it drives the `ConfidenceRail`.
- **Typography:** Sora for display, Space Mono for telemetry labels and eyebrows (`// section`, `01/02/03`). Wide letter-spacing on uppercase labels, echoing the wordmark.
- **Depth:** borders-first. Low-opacity rgba hairlines, whisper-quiet surface-lightness shifts for elevation. Never harsh lines, never dramatic shadows.
- **Motion:** orchestrated staggered load, scroll-triggered reveals, surprising hover states. Only `transform` and `opacity`. Never `transition-all`.

### The signature element
`src/components/product/ConfidenceRail.tsx` — a hairline on the leading edge of every product object whose fill encodes how much evidence sits behind it, and which is **empty** when there is none. It appears on the hero recommendation card, the three truth cards, the network confidence tiers and the calculator readout. Reuse it rather than inventing a second way to show confidence.

---

## Tech Stack
- **Next.js 16 (App Router) + React 19 + TypeScript**, `src/` directory, `@/*` alias
- **Tailwind v4** utilities over CSS custom properties in `src/app/globals.css`
- **Motion** (`motion/react`) for animation
- **Vitest** for the guard tests
- Fonts via `next/font`: Sora + Space Mono

### Where content lives
- `src/lib/site.ts` — platform and shared content, the single source of truth
- `src/lib/staffing.ts` — staffing only, deliberately separate (see the content rules)
- `src/lib/tokens.ts` — outstanding founder values
- `src/lib/leak.ts` — the calculator model, unit-tested

## Dev Commands
- Install: `npm install`
- Dev: `npm run dev` (http://localhost:3000)
- Build: `npm run build` (blocked until founder tokens land) · preview build: `npx next build`
- Test: `npm test`
- Lint: `npm run lint`

## Brand Assets
Logo and wordmark live in `brand guidelines/` and `public/brand/`. Use them; do not invent brand marks.

---

## Anti-Generic Guardrails
- **Colours:** never a default Tailwind palette name as a brand colour. Everything derives from the tokens.
- **Shadows:** no flat `shadow-md`. On dark, depth comes from borders and surface lightness; shadows stay subtle and colour-tinted.
- **Typography:** display and body are different families. Tight tracking on large headings (`~-0.02em`), comfortable line-height on body (`~1.6` to `1.72`).
- **Animation:** `transform` and `opacity` only. Never `transition-all`. Deceleration easing.
- **Interactive states:** every clickable element needs hover, focus-visible and active. Data needs loading, empty and error states.
- **Spacing:** pick a base unit and use multiples.
- **Depth:** base → elevated → floating, never one flat z-plane.
- **Do not repeat a layout.** The leaks ledger, the domain cards, the tier cards, the install rail and the truth cards are each shaped for their own content on purpose.

## Hard Rules
- Apply `/skills/` before coding UI.
- Never state in the present tense something that describes a plan.
- Never add a `[[TOKEN]]`-style placeholder to a page. Use `src/lib/tokens.ts`.
- Never add an `AggregateRating` to structured data.
- Run `npm test` before committing. A failing guard means the copy is wrong.

---

## Forms

All three forms post to `POST /api/submissions`. A staffing enquiry is a `staffing-brief` and lands on `/staffing/contact`: it must never be filed as a leak report, which asks a platform buyer for twelve months of appointment history and means nothing to a practice that wants a receptionist. There is one endpoint, one validator (`src/lib/forms/schema.ts`) and one delivery layer (`src/lib/forms/delivery.ts`) with two adapters, picked by environment variable:

- **Email:** `RESEND_API_KEY` + `FORM_TO_EMAIL` + `FORM_FROM_EMAIL`
- **Webhook:** `FORM_WEBHOOK_URL` (+ optional `FORM_WEBHOOK_TOKEN`) for Zapier, Make, n8n, Slack or a CRM

Set either or both. See `.env.example`. **Until one is set the forms return an error and say nothing was sent** — that is deliberate and must not be "fixed" by optimistically showing the success panel.

The rule, enforced by `tests/form-submission.test.ts`: **only a 2xx from the endpoint may put a form into its sent state.** A form that reports success while dropping the submission is the exact failure the rest of the site argues against. Three guards hold it: every form must route through `useSubmit`, no form may keep its own `sent` boolean, and the single `status: "sent"` assignment must sit directly behind the response check.

Server side the endpoint does size limiting, a honeypot field, a minimum fill time, per-IP rate limiting, per-field validation and email header sanitisation. On delivery failure it logs the full submission so the lead is recoverable, then returns 502.

If you point `FORM_WEBHOOK_URL` at a third party that stores submissions, **add it to `SUBPROCESSORS` in `src/lib/site.ts`** so it appears in the privacy policy table. Resend is already listed.

---

## Known launch blockers (not code)
1. **Founder sign-off on the About letter.** Drafted, not approved. It is written in his first person and he has not read it in place yet.
2. **Form delivery credentials.** The plumbing is done and tested; the forms need `RESEND_API_KEY` (or a webhook URL) set in the deployment environment or they will correctly refuse every submission.
3. **The legal pages are drafts and need a lawyer's review before Ascend signs a US customer.** Ship them for Meta review; put the legal review on the launch checklist.
4. **Delaware law over a Pakistani sole proprietorship is a known mismatch.** Founder-directed on 2026-08-20 after the risk was raised, and reaffirmed. It is not resolved, only decided. The lawyer needs to confirm it is enforceable as written, or the answer is to form a US entity. Do not treat this as settled.
5. **BAA coverage across the vendor stack** is a launch prerequisite the founder is resolving. Until it is, `/security` describes architecture, never certification, and the words "HIPAA compliant" as a bare badge stay off the site.
6. If the Meta submission includes content publishing, add `instagram_content_publish` and `pages_manage_posts` to the permissions list in `/legal/privacy` §5. They are deliberately absent today.
