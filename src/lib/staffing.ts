/* ==============================================================
   Ascend Staffing, the secondary business.

   Kept in its own file deliberately. Human service vocabulary
   (eligibility verification, prior authorization, claim status)
   is true here because people do it, and it must never leak into
   platform copy, where none of it is built. The guard tests scope
   those terms to this file and to /staffing.

   Status confirmed 2026-08-20: the capability is offered, no
   clients are placed yet. Nothing on this page may claim a
   placement, a client, or a retention rate.
   ============================================================== */

export type Role = {
  slug: string;
  index: string;
  name: string;
  short: string;
  tagline: string;
  blurb: string;
  /** Monthly USD. */
  price: number;
  /** Typical published US in-house monthly cost for the role. Market rate, not measured. */
  inHouse: number;
  responsibilities: string[];
  /** Generic, because naming a vendor would read as an integration claim. */
  stack: string;
};

export const ROLES: Role[] = [
  {
    slug: "reception",
    index: "01",
    name: "Front Desk and Reception",
    short: "Reception",
    tagline: "Every enquiry answered. Every chair filled.",
    blurb:
      "A dedicated remote receptionist who answers your calls live, books and confirms appointments, runs patient intake, and works your recall list, indistinguishable from someone sitting at your front desk.",
    price: 1290,
    inHouse: 3400,
    responsibilities: [
      "Answer inbound calls live, no voicemail black holes",
      "Schedule, confirm and reschedule appointments",
      "Patient intake and insurance details captured at booking",
      "Recall and reactivation outreach to fill the schedule",
      "Triage messages and route clinical questions to your team",
    ],
    stack: "Trained on your practice management system before day one.",
  },
  {
    slug: "billing",
    index: "02",
    name: "Billing and Insurance",
    short: "Billing",
    tagline: "Cleaner claims. Faster money.",
    blurb:
      "Specialists who submit clean claims, verify eligibility before the visit, post payments, and chase down every denial and aging balance so your revenue stops leaking.",
    price: 1490,
    inHouse: 3800,
    responsibilities: [
      "Insurance eligibility and benefits verification",
      "Clean claim submission and electronic posting",
      "Denial management, appeals and resubmission",
      "Prior authorization follow-up and claim status tracking",
      "Patient statements and payment plans",
    ],
    stack: "Trained on your practice management system and clearinghouse before day one.",
  },
  {
    slug: "coding",
    index: "03",
    name: "Coding and Scribes",
    short: "Coding and Scribes",
    tagline: "Providers free. Notes done.",
    blurb:
      "Certified coders and real time scribes who keep documentation accurate and complete, so your providers stay with patients instead of charts.",
    price: 1690,
    inHouse: 4200,
    responsibilities: [
      "Real time clinical documentation during visits",
      "CPT, ICD-10 and CDT coding accuracy review",
      "Chart prep and after visit summaries",
      "Coding audits to capture missed revenue",
      "Provider hand-off notes and task lists",
    ],
    stack: "Trained on your clinical record system before day one.",
  },
];

export type PriceItem = {
  key: string;
  name: string;
  price: number;
  inHouse: number;
  desc: string;
};

export const PRICE_ITEMS: PriceItem[] = [
  { key: "reception", name: "Front Desk Receptionist", price: 1290, inHouse: 3400, desc: "Calls, scheduling, intake, recall" },
  { key: "scheduler", name: "Scheduling Coordinator", price: 1190, inHouse: 3200, desc: "Books, confirms, fills cancellations" },
  { key: "billing", name: "Billing Specialist", price: 1490, inHouse: 3800, desc: "Claims, posting, balance follow-up" },
  { key: "insurance", name: "Insurance and Claims Coordinator", price: 1590, inHouse: 3900, desc: "Eligibility, denials, appeals" },
  { key: "coder", name: "Certified Coder", price: 1690, inHouse: 4200, desc: "CPT, ICD-10 and CDT accuracy" },
  { key: "scribe", name: "Scribe", price: 1390, inHouse: 3600, desc: "Real time documentation" },
];

export const STAFFING_PROCESS: {
  day: string;
  title: string;
  desc: string;
}[] = [
  {
    day: "Day 0",
    title: "Tell us what you need",
    desc: "A twenty minute call to map the role, your software and your workflows.",
  },
  {
    day: "Day 1 to 3",
    title: "We match pre-trained talent",
    desc: "Hand-picked and vetted for your role. We will tell you on the call exactly who is available for it today.",
  },
  {
    day: "Day 3 to 4",
    title: "Meet and approve",
    desc: "You interview the shortlist and choose. If they are not right, we re-match. You do not pay until you hire.",
  },
  {
    day: "Day 5",
    title: "Deploy and support",
    desc: "They start integrated into your systems, with a success manager behind them.",
  },
];

export const STAFFING_FOOTNOTE =
  "In-house figures are typical published US market rates for the role, for comparison rather than measured. We will price against your actual cost on the call.";

export const STAFFING_STATUS = {
  eyebrow: "WHERE WE ARE",
  title: "We are building this bench now.",
  body: [
    "Ascend Staffing is open and taking briefs. We are not going to show you a placement count we have not earned. What we will tell you on the call is exactly who is on the bench for your role today, and if there is nobody, we will say so and tell you how long it takes.",
    "You pay only after you hire, so the risk of finding out sits with us.",
  ],
};
