import type { EvidenceState } from "./confidence";

/* ==============================================================
   Ascend, single source of truth for platform and shared content.

   Every claim in this file was checked against the claim truth
   register in WEBSITE-REBUILD-SPEC.md section 4. Nothing here
   describes a capability that is not shipped today.

   Staffing content lives in ./staffing.ts on purpose: the guard
   tests allow human service vocabulary (eligibility, prior auth,
   claim status) only in that file and under /staffing, so it can
   never leak back into platform copy.

   Copy rule: no long dash may appear in any string on this site.
   ============================================================== */

export const SITE = {
  name: "Ascend",
  domain: "goascend.co",
  url: "https://goascend.co",
  email: "info@goascend.co",
  // No phone until a real one exists. Do not put a placeholder here.
};

/** How much of the proof on this site is real. Flip to 'verified' when it is. */
export const PROOF_MODE: "placeholder" | "verified" = "placeholder";

/* ----------------------------- Navigation ----------------------------- */

export const NAV: { label: string; href: string }[] = [
  { label: "Platform", href: "/platform" },
  { label: "Network", href: "/network" },
  { label: "Pricing", href: "/pricing" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Staffing", href: "/staffing" },
];

/* ------------------------------ The leaks ------------------------------ */

export const LEAKS: { index: string; title: string; body: string }[] = [
  {
    index: "01",
    title: "The enquiry arrives when nobody can answer",
    body: "A message during a procedure. An Instagram DM at 9pm. A form on a Sunday. They book somewhere else.",
  },
  {
    index: "02",
    title: "A cancellation leaves a chair empty",
    body: "Filling Thursday's 2pm means working a list one patient at a time. The front desk is already three deep.",
  },
  {
    index: "03",
    title: "Patients stop coming and nobody notices for a year",
    body: "They did not complain and they did not leave. There is no alert for a patient who does nothing.",
  },
  {
    index: "04",
    title: "Your reputation is written by accident",
    body: "The delighted patient is never asked. The unhappy one is never caught before they post.",
  },
];

/* --------------------------- The leak model ---------------------------
   Single source for the calculator. Every rate is a placeholder and the
   page says so. At these defaults the model returns 136 visits and
   PKR 1,632,000.
   ---------------------------------------------------------------------- */

export const LEAK_MODEL = {
  activePatients: 1200,
  averageVisitValue: 12_000,
  inactiveRate: 0.08,
  recoveryRate: 0.15,
  cancellationsPerWeek: 2,
  refillRate: 0.6,
  afterHoursPerMonth: 25,
  afterHoursConversion: 0.2,
};

export type LeakInputs = typeof LEAK_MODEL;

export type LeakField = {
  key: keyof LeakInputs;
  label: string;
  kind: "count" | "money" | "rate";
  min: number;
  max: number;
  step: number;
  /** Which leak this input feeds, for the readout. */
  group: "shared" | "reactivation" | "slots" | "enquiries";
};

export const LEAK_FIELDS: LeakField[] = [
  { key: "activePatients", label: "Active patients", kind: "count", min: 0, max: 20000, step: 50, group: "shared" },
  { key: "averageVisitValue", label: "Average visit value", kind: "money", min: 0, max: 150_000, step: 500, group: "shared" },
  { key: "inactiveRate", label: "Go inactive per year", kind: "rate", min: 0, max: 0.5, step: 0.01, group: "reactivation" },
  { key: "recoveryRate", label: "Recovered at", kind: "rate", min: 0, max: 1, step: 0.01, group: "reactivation" },
  { key: "cancellationsPerWeek", label: "Unfilled cancellations per week", kind: "count", min: 0, max: 60, step: 1, group: "slots" },
  { key: "refillRate", label: "Refilled at", kind: "rate", min: 0, max: 1, step: 0.01, group: "slots" },
  { key: "afterHoursPerMonth", label: "After hours enquiries per month", kind: "count", min: 0, max: 500, step: 1, group: "enquiries" },
  { key: "afterHoursConversion", label: "Converted at", kind: "rate", min: 0, max: 1, step: 0.01, group: "enquiries" },
];

/* --------------------- Proof of character (real output) ---------------------
   Every string in these three cards is real output from the shipped
   product. Do not rewrite them to sound better. The fact that they are
   verbatim is the entire point of the section.
   ---------------------------------------------------------------------------- */

export type ProductTruthCard = {
  kind: "opportunity" | "blocker" | "metric";
  label: string;
  /** Priority or state chip beside the label. Empty on the metric card. */
  state: string;
  title: string;
  reason: string;
  chip: string;
  /** The product's own metric state. Never an invented score: a deterministic
      recommendation has no honest Emerging/Established/Proven tier, and this
      site used to print one anyway. See lib/confidence.ts. */
  evidence: EvidenceState;
};

export const PRODUCT_TRUTH_CARDS: ProductTruthCard[] = [
  {
    kind: "opportunity",
    label: "OPPORTUNITY",
    state: "HIGH",
    title: "Win back 64 patients who slipped away",
    reason:
      "64 patients cancelled or no-showed in the last 3 months and never rebooked. A win-back campaign could recover an estimated PKR 153,600 (at a 20% return rate).",
    chip: "Estimated · assumptions shown",
    evidence: "estimated",
  },
  {
    kind: "blocker",
    label: "SETUP",
    state: "NORMAL",
    title: "I can't spot lapsed patients yet: visit history is thin",
    reason:
      "You have 1,240 contacts, and I have watched 38 of them complete a visit, so I can't tell yet who has drifted away. I start counting from the first visit I watch happen, which means a reactivation list would take months to build from scratch. If your previous system has visit dates, importing them lets me find lapsed patients today.",
    chip: "No estimate. The opportunity is real and its size is genuinely unknown.",
    evidence: "unknown",
  },
  {
    kind: "metric",
    label: "REVENUE RECOVERED",
    state: "",
    title: "Not yet measurable",
    reason:
      "Not PKR 0. Zero would mean we checked and nothing happened. This means the evidence has not arrived yet, and it names what it is waiting for.",
    chip: "",
    evidence: "unknown",
  },
];

/* ------------------ Software versus operator (the contrast) ------------------ */

export const SOFTWARE_VS_OPERATOR: { software: string; operator: string }[] = [
  {
    software: "Tells you 96 patients are inactive",
    operator: "Works out which of the 96 are worth contacting",
  },
  {
    software: "Puts the number on a dashboard",
    operator: "Tells you why, in a sentence you can argue with",
  },
  {
    software: "Waits for a human to act on it",
    operator: "Contacts them once you say yes",
  },
  {
    software: "Is worth the same on your last day as your first",
    operator: "Gets better every month it runs",
  },
  {
    software: "Knows your practice and nothing else",
    operator: "Learns from practices you will never meet",
  },
];

/* ------------------------------- The domains -------------------------------
   The six things Ascend does. Every string verified against the platform
   codebase. `stops` is never empty: each domain states where it ends.
   ---------------------------------------------------------------------------- */

export type Domain = {
  id: "front-desk" | "schedule" | "growth" | "reputation" | "creative" | "command";
  eyebrow: string;
  name: string;
  /** The homepage paragraph. */
  summary: string;
  /** The /platform expansion. */
  detail: string[];
  /** What this domain deliberately does not do. Never empty. */
  stops: string;
};

export const DOMAINS: Domain[] = [
  {
    id: "front-desk",
    eyebrow: "FRONT DESK",
    name: "Answers everything",
    summary:
      "WhatsApp first, because that is where your patients already are, and then Instagram, Facebook Messenger, the web widget and SMS. Grounded strictly in your knowledge base. It will not invent a price or a policy, and it hands over the moment it does not know. Anything clinical is routed, before a model is chosen, to the only tier that is able to hand off to a person. That decision lives in code rather than in a prompt, so no cheap tier can answer a safety question just because it recognised a keyword.",
    detail: [
      "Channels, in the order they matter here: WhatsApp, Instagram DM, Facebook Messenger, the web chat widget and SMS. A patient who messages your clinic at 11pm on WhatsApp gets a real answer instead of a blue tick.",
      "Every answer is grounded in your knowledge base: your prices, your policies, your hours, your services. When it does not have the answer it says so and hands over, rather than producing something plausible.",
      "The routing happens before any model is involved. A greeting, an opening hours question or a directions question is answered deterministically at no cost. A pricing or insurance question goes to a knowledge base tier, which has your knowledge base and no ability to escalate. Anything clinical, anything urgent, and any explicit request for a human goes straight to the full receptionist, which is the only tier that can hand off to a person. That ordering is code, not an instruction in a prompt, which means it cannot be talked out of it, and a safety question can never be pulled down to a tier that could not escalate even if it wanted to.",
    ],
    stops:
      "It does not answer the telephone, and it does not read your clinical chart. The receptionist and the clinical record are separated at the table level, not by asking the model nicely.",
  },
  {
    id: "schedule",
    eyebrow: "SCHEDULE",
    name: "Refills the chair",
    summary:
      "When a slot frees up, Ascend offers it to the patients already holding a later appointment for the same treatment, longest wait first. The first yes takes it. If nobody claims it in time, Ascend tells you, rather than quietly dropping it.",
    detail: [
      "The offer goes to several patients at once and the first to accept is moved in, with the rest released automatically, so nobody arrives to find the slot gone. If the window closes unclaimed, that becomes a line in your queue rather than a silent non-event.",
      "Patient forms go out as tokenised links, so a form reaches one patient and only that patient.",
    ],
    stops:
      "Ascend will never tell you that twelve patients are on your waitlist, because it does not keep a standing waitlist and that number would be invented. What it reports is what actually happened: how many slots came free and how many were filled.",
  },
  {
    id: "growth",
    eyebrow: "GROWTH",
    name: "Brings patients back",
    summary:
      "Finds who has drifted using your own visit history, values them from your own average visit value, and runs consent checked reactivation, recall, win back and birthday outreach. Somebody who opts out is never contacted again on that channel.",
    detail: [
      "A patient is somebody who has completed a visit. A lead is somebody who never has. Lapsed means a patient whose last completed visit falls outside your recency window. Those are three different states, most software collapses them into one contact list, and collapsing them is how a practice ends up sending a win-back message to somebody who has never been through the door.",
      "It values a win back list from your own average visit value. If you have not set one, it says so and asks, rather than printing a number it made up.",
      "Every message is gated on consent, per channel. An SMS opt out is honoured immediately and permanently, and it says nothing about permission to use a photo, which is a different consent entirely.",
    ],
    stops:
      "Outreach goes over SMS and WhatsApp. Email to patients is not a channel Ascend sends on.",
  },
  {
    id: "reputation",
    eyebrow: "REPUTATION",
    name: "Builds it on purpose",
    summary:
      "Asks patients for a review at the right moment. Four and five star replies go to your Google link. One to three star replies are captured privately and land on your desk as a task, never in public. Drafts your reply to public reviews you bring in.",
    detail: [
      "The split matters more than the request does. A four or five star reply reaches your public Google listing, and a one to three star reply is captured privately, never posted anywhere, and lands on your desk as a task with the patient's own words attached, while there is still time to fix it.",
      "For public reviews, Ascend drafts your reply, with a hard rule that a public response may never confirm treatment details or even that the person is a patient.",
    ],
    stops:
      "Ascend does not yet pull your reviews in from Google or anywhere else. Your team pastes in the ones that need a reply.",
  },
  {
    id: "creative",
    eyebrow: "CREATIVE",
    name: "Makes the content",
    summary:
      "Case studies, posts, collages and reels built from your own consented cases. The consent gate is enforced in code before anything can be published, so a case without permission cannot reach a public feed by any route.",
    detail: [
      "The gate sits at the exit rather than in the editor, which is what makes it hold: a case whose consent is missing cannot reach a public feed by any route, including a route somebody adds next year without knowing the rule existed.",
      "This is the smallest part of what Creative Studio does. The research, the media vault, the case scoring and the reel builder are set out in full further down this page.",
    ],
    stops:
      "Public content is public: it never references a patient's history, ever. Private outreach may. That line is absolute and it is why the two systems share nothing but a word.",
  },
  {
    id: "command",
    eyebrow: "COMMAND",
    name: "Tells you what matters",
    summary:
      "One ranked queue each morning of what needs a human, each item carrying its reason and its evidence. A daily brief and a written weekly review, both built from your own numbers, neither of them a template.",
    detail: [
      "One ranked queue. Each item carries its reason, its evidence and its confidence, and the ones Ascend cannot back it says so about instead of hiding.",
      "A daily brief, written from sixteen producers, where every line names the thing that justifies it and no line appears unless that thing actually answered. A producer that failed is reported as failed, never as an all clear.",
      "A written review each week, built from your own numbers and compared against the week before.",
    ],
    stops:
      "The brief has no buttons. It answers what you should know. The queue answers what you should do. Keeping them apart is deliberate.",
  },
];

/* ------------------------------- The Network ------------------------------- */

export const NETWORK = {
  /** Mirrors packages/core/src/policy/v1.ts. If the platform changes, change here. */
  minIndependentPractices: 3,
  minObservations: 30,
  confidence: { emerging: 40, established: 60, proven: 90 },
};

export const NETWORK_STEPS: { step: string; title: string; body: string }[] = [
  {
    step: "1",
    title: "Evidence",
    body: "Ascend observes what actually happened across the network. Not opinions, not a survey, not an industry benchmark report. Outcomes, recorded as they occurred.",
  },
  {
    step: "2",
    title: "Transfer",
    body: "When a pattern holds, a separate question is asked: can the mechanism behind it apply elsewhere? That judgement is written in code and reviewed by a human. It is never guessed at run time, and anything unrecognised fails closed.",
  },
  {
    step: "3",
    title: "Adaptation",
    body: "The principle arrives. Every number attached to it is then computed from your rows: your patient list, your measured rates, your history, your currency.",
  },
  {
    step: "4",
    title: "Validation",
    body: "Ascend states in advance what it expects to move and over what window, then measures whether it did. A recommendation that cannot be checked afterwards does not ship as one.",
  },
];

export const PRIVACY_CONTRACT: { allowed: boolean; body: string }[] = [
  {
    allowed: true,
    body: "The network carries principles. It is incapable of carrying magnitudes: not revenue, not pricing, not patient counts, not conversion rates, not budgets.",
  },
  {
    allowed: true,
    body: "Patterns are assembled from a fixed vocabulary of tokens, so a number cannot physically appear inside one.",
  },
  {
    allowed: true,
    body: "Nothing is published until at least three independent practices and thirty separate observations support it.",
  },
  {
    allowed: true,
    body: "Nothing identifying your practice ever enters the pool, so there is nothing there to reclaim: you exist in it only as a one way hash, and only patterns that generalise are emitted at all. Ask us to stop contributing and we stop, and what you already contributed stops counting as current evidence.",
  },
  {
    allowed: false,
    body: 'No "practices like yours". Ascend never compares you to a competitor, never ranks you against a peer group, and never builds a similarity profile of your business.',
  },
];

export const NETWORK_HONEST: string[] = [
  "In your first weeks the network will have very little to tell you, and Ascend will say exactly that rather than dress a thin signal in confident language.",
  "Ascend is fully useful on day one from your own data. The network compounds on top of that over the months that follow.",
  "Every recommendation is labelled with where it came from, how much evidence sits behind it, and how confident that makes it.",
  "Nobody else in this market will tell you when they are unsure. That is the feature.",
];

/* ------------------------------ Trust ladder ------------------------------ */

export const TRUST_LADDER: { stage: string; title: string; body: string }[] = [
  {
    stage: "DEFAULT STATE",
    title: "Assisted",
    body: "Ascend proposes, you approve. Nothing reaches a patient without a human pressing a button. This never expires on its own.",
  },
  {
    stage: "BEFORE YOU COMMIT",
    title: "Shadow mode",
    body: "See exactly what Ascend would have done over the last fortnight, on your real practice, without it doing any of it. Never a leap of faith.",
  },
  {
    stage: "OVER TIME",
    title: "Earned autonomy",
    body: "It only asks to run a domain alone after building an approval record there. Your call, per domain, across six domains, reversible instantly.",
  },
];

/** The five fields a pattern-derived recommendation carries. Real product
    structure: a deterministic count is not one of these and does not pretend
    to be. */
export const RECOMMENDATION_FIELDS: { field: string; question: string }[] = [
  { field: "Belief", question: "what it believes" },
  { field: "Relevance", question: "why it may apply to you" },
  { field: "Difference", question: "what is different about your practice" },
  { field: "Adaptation", question: "what it changed because of that" },
  { field: "Verification", question: "how you will both know whether it worked" },
];

/* -------------------------------- Pricing -------------------------------- */

export type Tier = {
  id: "front-desk" | "operator" | "partner";
  eyebrow: string;
  name: string;
  /** List price per month, PKR. */
  monthly: number;
  install: number;
  /** Founding cohort price, where the tier has one. Locked for the life of
      the account. Only Operator carries one. */
  foundingMonthly?: number;
  highlight?: boolean;
  includes: string[];
  excludes?: string[];
};

export const TIERS: Tier[] = [
  {
    id: "front-desk",
    eyebrow: "ENTRY · YOU RUN IT",
    name: "Front Desk",
    monthly: 24_000,
    install: 30_000,
    includes: [
      "Receptionist on web chat, SMS and WhatsApp",
      "Grounded in your knowledge base",
      "Reminders and no-show follow-up",
      "Review requests and feedback routing",
      "One unified inbox",
    ],
    excludes: [
      "No CRM outreach campaigns",
      "No intelligence layer",
      "No Network",
    ],
  },
  {
    id: "operator",
    eyebrow: "CORE · WE INSTALL, YOU STEER",
    name: "Operator",
    monthly: 65_000,
    foundingMonthly: 35_000,
    install: 75_000,
    highlight: true,
    includes: [
      "Everything in Front Desk",
      "Instagram and Facebook Messenger",
      "Slot fill when a chair frees up",
      "Reactivation, recall and win back outreach",
      "The morning queue, every item with its reason",
      "Daily brief and written weekly review",
      "Intelligence Network",
      "Autopilot with shadow preview",
      "Acquisition economics",
      "Creative Studio",
      "Full done for you install",
      "Direct line to the founder",
    ],
  },
  {
    id: "partner",
    eyebrow: "PREMIUM · WE RUN IT",
    name: "Partner",
    monthly: 150_000,
    install: 200_000,
    includes: [
      "Everything in Operator",
      "A named operator, weekly",
      "Content produced for you",
      "Monthly strategy session",
      "Multi-location views",
      "Knowledge module for your specialty",
      "Roadmap priority",
      "Quarterly business review",
    ],
  },
];

/* The comparison that closes in Pakistan is a salary, not a software stack.
   Nobody here is paying for six SaaS subscriptions to replace; they are paying
   a person, and the person goes home at eight. */
export const COST_COMPARISON: { item: string; low: number; high: number }[] = [
  { item: "One front desk person, clinic hours only", low: 50_000, high: 80_000 },
  { item: "Cover when they are on leave or off sick", low: 6_000, high: 12_000 },
  { item: "Recruiting and retraining when they move on", low: 5_000, high: 10_000 },
  { item: "A social media page somebody runs on the side", low: 15_000, high: 40_000 },
];

export const PRICING_FAQ: { q: string; a: string }[] = [
  {
    q: "What happens if it does something wrong to a patient?",
    a: "In Assisted mode, which is the default and never expires, it cannot reach a patient without you pressing a button. Autonomy is granted by you, one domain at a time, and revoked instantly.",
  },
  {
    q: "Do you integrate with my practice management software?",
    a: "Not yet, and we will not pretend otherwise. Ascend runs on its own schedule and imports your patients and visit history by file. A direct integration is on the roadmap and is not built. If a live two way sync is a requirement for you today, we are not the right fit yet and we will say so on the call.",
  },
  {
    q: "Does Ascend answer my phone?",
    a: "No. Ascend answers web chat, SMS, WhatsApp, Instagram DMs and Facebook Messenger. Voice is on the roadmap. We do not sell what we have not built.",
  },
  {
    q: "Is there a contract?",
    a: "Thirty days notice, no exit fee, export any time. The install fee buys the install and is not an activation toll.",
  },
  {
    q: "How do we pay?",
    a: "Bank transfer, monthly, invoiced at the start of the month. Card processing for Pakistani businesses is still awkward enough that we would rather not build the price around it. If you would prefer to prepay a quarter we will discount it, and if you would rather stay monthly that is the default and it costs you nothing.",
  },
  {
    q: "Why should we buy this before the bigger clinics in the US do?",
    a: "Because you can. Selling this in the United States means clearing a vendor agreement chain that we are still working through. Here there is nothing in the way, WhatsApp is already built and it is already the channel your patients use. The first twenty practices in Pakistan get the founding price and the direct line, and they get them because they are early rather than because we discounted.",
  },
  {
    q: "Why is there no free trial or money-back guarantee?",
    a: "Because a refund gives you your money back and not your quarter. Instead you get shadow mode before any autonomy decision, and a ninety day working commitment: we agree the outcomes in writing before you sign, and if they have not landed by day ninety we keep working at no further monthly cost until they do.",
  },
  {
    q: "What do you do with our patient data?",
    a: "It stays yours. Clinical records sit behind row level security with an append only access log, so every read is recorded. Clinical AI runs on Anthropic only. The Network never carries a number out of your practice: it carries principles, and it is built so that a magnitude cannot physically appear inside one.",
  },
  {
    q: "How long until it is useful?",
    a: "From your own data, day one. The Network compounds on top over months, and in your first weeks it will tell you it has little to say rather than inventing something.",
  },
];

/* ------------------------------- The install ------------------------------- */

export const INSTALL_STEPS: { window: string; title: string; body: string }[] = [
  {
    window: "D1 to 3",
    title: "Your data comes in",
    body: "Patients, visit history, providers, hours. Your service catalog built from what your bookings are actually called, including the three spellings of the same treatment.",
  },
  {
    window: "D4 to 7",
    title: "It learns how you answer",
    body: "Knowledge base built from your site, your policies, your pricing and the questions your front desk really fields. Its writing tuned until it reads like your practice rather than like software.",
  },
  {
    window: "D8 to 14",
    title: "Channels connected",
    body: "Your messaging number, WhatsApp, Instagram, Facebook and the web widget live, consent state imported so nobody who opted out is ever contacted.",
  },
  {
    window: "D15 to 30",
    title: "It runs supervised, in front of you",
    body: "Everything it wants to do, it shows you first with its reasoning. This is where you find out what it is like to work with, at zero risk.",
  },
  {
    window: "D30+",
    title: "You decide what it may do alone",
    body: "Domain by domain, at your pace, reversible any time. Leaving everything supervised for months is a perfectly good way to run it.",
  },
];

export const WHAT_WE_NEED: { index: string; body: string }[] = [
  {
    index: "01",
    body: "A twenty minute call to agree the outcomes we are committing to in writing.",
  },
  {
    index: "02",
    body: "An export from your current system: patients, visit history, providers, hours. A spreadsheet is fine. We do the mapping.",
  },
  {
    index: "03",
    body: "One hour walking us through how your front desk answers the ten questions it answers most.",
  },
  {
    index: "04",
    body: "Fifteen minutes a day in week three, reading what it wanted to do and telling it yes or no.",
  },
];

/* ------------------------------- Protection ------------------------------- */

export const PROTECTIONS: { title: string; body: string }[] = [
  {
    title: "It cannot act without you",
    body: "Assisted is the default and it does not time out.",
  },
  {
    title: "You see it before you trust it",
    body: "Shadow mode, on your real practice, before any autonomy decision.",
  },
  {
    title: "We do the work, not your staff",
    body: "No implementation project landing on the person who is already busiest.",
  },
  {
    title: "The ninety day working commitment",
    body: "We agree the outcomes in writing before you sign. If they have not landed by day ninety, we keep working at no further monthly cost until they do.",
  },
  {
    title: "You are never held hostage",
    body: "Export any time, ask us to stop contributing to the Network and we stop, thirty days notice, no exit fee.",
  },
];

/* ---------------------------- The founding cohort ---------------------------- */

export const COHORT = {
  size: 20,
  /** What the founding cohort pays, locked. */
  foundingPrice: 35_000,
  /** What everyone after them pays. */
  nextPrice: 65_000,
  benefits: [
    "PKR 35,000 a month, locked for the life of the account, against a list price of PKR 65,000. It does not come back down.",
    "Direct access to the founder, not a support tier.",
    "Your requests go to the front of the roadmap, and you will see them ship.",
    "A knowledge module built around how you practise, which becomes part of what Ascend knows.",
  ],
  ask: "What we ask in return, and it is the whole reason the price is what it is: a written case study once the results are real, and a willingness to take a reference call.",
};

/* ------------------------------ Testimonials ------------------------------
   Attribution is role plus practice shape plus region. Never an invented
   person or business name: a prospect who searches a name and finds nothing
   gets exactly the reaction this site is built to prevent. A guard test
   asserts no placeholder carries a person name or a business suffix.
   -------------------------------------------------------------------------- */

export type Testimonial = {
  quote: string;
  /** Role plus practice shape plus region. Never an invented person or business name. */
  attribution: string;
  status: "placeholder" | "verified";
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "The reactivation list was the thing I always meant to get to and never did. Ascend built it from our own history in an afternoon and then asked before it sent a single message.",
    attribution: "Practice owner · two-location group · Lahore",
    status: "placeholder",
  },
  {
    quote:
      "Half our bookings come through WhatsApp and most of them arrive after we have closed. It answers them properly now, in our own words, and I read every one before it went out for the first fortnight.",
    attribution: "Practice manager · single site · Karachi",
    status: "placeholder",
  },
  {
    quote:
      "It told me it could not measure something yet. I have never had a piece of software do that, and it is the reason I trust the numbers it does give me.",
    attribution: "Clinical director · three-location group · Islamabad",
    status: "placeholder",
  },
];

/* -------------------------------- Principles -------------------------------- */

export const PRINCIPLES: { index: string; title: string; body: string }[] = [
  {
    index: "01",
    title: "Say the true thing, at its true strength",
    body: 'Ascend never has to choose between making something up and saying nothing. "Early signal, watching it" is a complete and honest sentence, and an exceptional operator says it several times a week.',
  },
  {
    index: "02",
    title: "A number you cannot interrogate is a number you should not be shown",
    body: "Every figure carries where it came from, what was assumed, what was excluded and how confident it is. If it cannot carry those, it does not ship.",
  },
  {
    index: "03",
    title: "Unknown is not the same as no",
    body: 'A missing measurement reads as "not yet measurable", never as zero. Those are different statements and collapsing them is how a dashboard becomes confidently wrong.',
  },
  {
    index: "04",
    title: "Nothing reaches a patient without permission",
    body: "Consent is enforced in code at the exit, not requested of a model in a prompt. A rule too important to get wrong does not live in an instruction.",
  },
  {
    index: "05",
    title: "We do not sell what we have not built",
    body: "There is no voice product, so there is no voice product on this website. You will find that unusual and that is the point.",
  },
];

/* --------------------------------- Security --------------------------------- */

export const SECURITY_SECTIONS: { title: string; body: string }[] = [
  {
    title: "Where patient data lives",
    body: "Patient data is processed by five vendors and no others: Anthropic for AI, Twilio for SMS and WhatsApp, Meta for Instagram and Facebook Messenger, Neon for the database, Render for the application.",
  },
  {
    title: "Where Ascend itself sits",
    body: "Ascend is established in Pakistan, and the people who run and support the service access it from there. That is an international transfer of data, and it belongs on this page rather than in a footnote you find during diligence. The access is bound by every control below, and we will agree specific transfer safeguards or residency commitments in your agreement if you need them.",
  },
  {
    title: "Who is deliberately blind",
    body: "Authentication, hosting for the marketing site, background jobs, caching and error monitoring are all architected so patient data never reaches them. That is a design constraint, not a policy promise.",
  },
  {
    title: "How access is controlled",
    body: "Every practice's data is isolated at the database level by row level security, which is enforced by the database rather than by application code remembering to filter. Clinical records are additionally role gated.",
  },
  {
    title: "Every clinical read is logged",
    body: "Opening a patient's clinical record writes an audit row inside the same transaction as the read. If the log write fails, the read fails. There is no path that reads a chart without recording it.",
  },
  {
    title: "AI and your clinical data",
    body: "Clinical context reaches AI through an audited accessor in code, never by giving a model access and instructing it not to look. Clinical AI runs on Anthropic only.",
  },
  {
    title: "Your data is yours",
    body: "Export any time. Thirty days notice. No exit fee. Ask us to stop contributing to the Network and we stop. Your past contributions stop counting as current evidence and decay out of it, and no identifier of your practice was ever stored in it to begin with.",
  },
];

export const SUBPROCESSORS: {
  name: string;
  purpose: string;
  processesPatientData: boolean;
}[] = [
  { name: "Anthropic", purpose: "AI reasoning and drafting", processesPatientData: true },
  { name: "Twilio", purpose: "SMS and WhatsApp messaging", processesPatientData: true },
  { name: "Neon", purpose: "Application database", processesPatientData: true },
  { name: "Render", purpose: "Application hosting", processesPatientData: true },
  {
    name: "Meta Platforms",
    purpose: "Instagram Direct and Facebook Messenger message transport",
    processesPatientData: true,
  },
  { name: "Clerk", purpose: "Staff authentication", processesPatientData: false },
  {
    name: "Resend",
    purpose: "Delivers enquiries sent through this website",
    processesPatientData: false,
  },
  { name: "Vercel", purpose: "Marketing site and dashboard hosting", processesPatientData: false },
  { name: "Inngest", purpose: "Background jobs", processesPatientData: false },
  { name: "Sentry", purpose: "Error monitoring", processesPatientData: false },
];
