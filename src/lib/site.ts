/* =============================================================
   Ascend — single source of truth for site content & data
   (Testimonials, metrics and pricing are representative.)
   ============================================================= */

export const SITE = {
  name: "Ascend",
  domain: "goascend.co",
  email: "hello@goascend.co",
  phone: "+1 (512) 555-0142",
};

export const NAV: { label: string; href: string }[] = [
  { label: "Staffing", href: "/#staffing" },
  { label: "AI Platform", href: "/platform" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

/* ----------------------------- Stats ----------------------------- */
export const STATS: { value: string; label: string; accent?: boolean }[] = [
  { value: "50%", label: "Lower staffing cost", accent: true },
  { value: "5 days", label: "Avg. time to deploy" },
  { value: "120+", label: "Practices served" },
  { value: "98%", label: "12-month retention" },
];

/* --------------------------- Staffing roles --------------------------- */
export type Role = {
  slug: string;
  index: string;
  name: string;
  short: string;
  tagline: string;
  blurb: string;
  price: number; // monthly USD
  inHouse: number; // comparable US in-house monthly cost
  responsibilities: string[];
  tools: string[];
  metric: { value: string; label: string };
};

export const ROLES: Role[] = [
  {
    slug: "reception",
    index: "01",
    name: "Front Desk & Reception",
    short: "Reception",
    tagline: "Every call answered. Every chair filled.",
    blurb:
      "A dedicated remote receptionist who answers your phones, books and confirms appointments, runs patient intake, and works your recall list — indistinguishable from someone sitting at your front desk.",
    price: 1290,
    inHouse: 3400,
    responsibilities: [
      "Answer inbound calls live, no voicemail black holes",
      "Schedule, confirm and reschedule appointments",
      "Patient intake, insurance verification at booking",
      "Recall & reactivation outreach to fill the schedule",
      "Triage messages and route clinical questions",
    ],
    tools: ["Dentrix", "Open Dental", "Eaglesoft", "NexHealth", "Weave"],
    metric: { value: "0", label: "Calls to voicemail" },
  },
  {
    slug: "billing",
    index: "02",
    name: "Billing & Insurance",
    short: "Billing",
    tagline: "Cleaner claims. Faster money.",
    blurb:
      "Specialists who submit clean claims, verify eligibility before the visit, post payments, and chase down every denial and aging balance so your revenue stops leaking.",
    price: 1490,
    inHouse: 3800,
    responsibilities: [
      "Insurance eligibility & benefits verification",
      "Clean claim submission and electronic posting",
      "Denial management, appeals and resubmission",
      "AR follow-up on aging balances",
      "Patient statements and payment plans",
    ],
    tools: ["Dentrix", "Epic", "athenahealth", "Availity", "Stripe"],
    metric: { value: "12 days", label: "Avg. AR reduction" },
  },
  {
    slug: "coding",
    index: "03",
    name: "Coding & Scribes",
    short: "Coding & Scribes",
    tagline: "Providers free. Notes done.",
    blurb:
      "Certified medical coders and real-time scribes who keep documentation accurate and complete — so your providers stay with patients instead of charts.",
    price: 1690,
    inHouse: 4200,
    responsibilities: [
      "Real-time clinical documentation during visits",
      "CPT / ICD-10 / CDT coding accuracy review",
      "Chart prep and after-visit summaries",
      "Coding audits to capture missed revenue",
      "Provider hand-off notes and task lists",
    ],
    tools: ["Epic", "athenahealth", "Open Dental", "Dragon", "DeepScribe"],
    metric: { value: "2.1 hrs", label: "Saved per provider / day" },
  },
];

/* --------------------------- Pricing add-ons --------------------------- */
export type PriceItem = {
  key: string;
  name: string;
  price: number;
  inHouse: number;
  desc: string;
};

export const PRICE_ITEMS: PriceItem[] = [
  { key: "reception", name: "Front Desk / Receptionist", price: 1290, inHouse: 3400, desc: "Calls, scheduling, intake, recall" },
  { key: "scheduler", name: "Scheduling Coordinator", price: 1190, inHouse: 3200, desc: "Books, confirms, fills cancellations" },
  { key: "billing", name: "Billing Specialist", price: 1490, inHouse: 3800, desc: "Claims, posting, AR follow-up" },
  { key: "insurance", name: "Insurance / Claims Coordinator", price: 1590, inHouse: 3900, desc: "Eligibility, denials, appeals" },
  { key: "coder", name: "Certified Medical Coder", price: 1690, inHouse: 4200, desc: "CPT / ICD-10 / CDT accuracy" },
  { key: "scribe", name: "Medical Scribe", price: 1390, inHouse: 3600, desc: "Real-time documentation" },
];

/* --------------------------- AI Platform --------------------------- */
export type AiFeature = {
  id: string;
  index: string;
  name: string;
  tagline: string;
  desc: string;
  points: string[];
};

export const AI_FEATURES: AiFeature[] = [
  {
    id: "voice",
    index: "01",
    name: "AI Voice Receptionist",
    tagline: "Answers on the first ring. Talks like a person.",
    desc: "A natural-voice agent that picks up every call 24/7, books and reschedules appointments, answers questions about your practice, and warm-transfers anything clinical.",
    points: [
      "Sub-second pickup, zero hold music",
      "Books directly into your schedule",
      "Bilingual — English & Spanish",
      "Escalates to staff with full context",
    ],
  },
  {
    id: "chat",
    index: "02",
    name: "AI Chat & SMS",
    tagline: "Turns website visitors into booked patients.",
    desc: "An on-site and SMS assistant that handles intake, answers FAQs, captures new patients, and follows up automatically — even after hours.",
    points: [
      "Website widget + two-way SMS",
      "New-patient intake and forms",
      "Instant answers from your knowledge base",
      "Hands off to a human anytime",
    ],
  },
  {
    id: "crm",
    index: "03",
    name: "Growth CRM",
    tagline: "Every lead followed up. Automatically.",
    desc: "A practice CRM that tracks every lead and patient, automates recalls and reactivation, wins back no-shows, and shows you exactly where revenue comes from.",
    points: [
      "Lead pipeline with automated follow-up",
      "Recall, reactivation & no-show win-back",
      "Campaigns over SMS, email and voice",
      "Attribution and revenue reporting",
    ],
  },
];

/* Practice groups for the "trusted by" strip (representative). */
export const CLIENTS: string[] = [
  "Lakeshore Dental Group",
  "Cedar Park Internal Medicine",
  "Summit Oral Surgery",
  "Northstar Pediatric Dentistry",
  "Whitfield Family Dental",
  "Vela Health Partners",
  "Brightwater Dental",
  "Meridian Family Practice",
];

/* ----------------------- AI Platform (dedicated page) ----------------------- */
export const PLATFORM_STATS: { value: string; label: string; accent?: boolean }[] = [
  { value: "100%", label: "Calls answered", accent: true },
  { value: "30 hrs", label: "Reclaimed per week" },
  { value: "41%", label: "Fewer no-shows" },
  { value: "3.2×", label: "More leads converted" },
];

export type PlatformFeature = {
  id: string;
  index: string;
  tag: string;
  name: string;
  headline: string;
  desc: string;
  outcomes: string[];
  metric: { value: string; label: string };
};

export const PLATFORM_FEATURES: PlatformFeature[] = [
  {
    id: "voice",
    index: "01",
    tag: "Front desk",
    name: "AI Voice Receptionist",
    headline: "Never miss another call.",
    desc: "A natural-voice agent answers every call in under a second, around the clock — booking appointments, answering questions about your practice, and warm-transferring anything clinical to your team.",
    outcomes: [
      "Answers 100% of calls, day or night",
      "Books straight into your schedule",
      "Bilingual — English & Spanish",
      "Zero hold time, zero voicemail",
    ],
    metric: { value: "60+", label: "after-hours appointments / mo" },
  },
  {
    id: "chat",
    index: "02",
    tag: "Web & SMS",
    name: "AI Chat & Chatbots",
    headline: "Turn visitors into booked patients.",
    desc: "An on-site widget and two-way SMS assistant that captures new patients, answers questions instantly from your knowledge base, and follows up automatically — even at midnight.",
    outcomes: [
      "Website chat + two-way SMS",
      "New-patient intake and forms",
      "Instant, accurate answers 24/7",
      "Follows up until they book",
    ],
    metric: { value: "3.2×", label: "website lead conversion" },
  },
  {
    id: "booking",
    index: "03",
    tag: "Scheduling",
    name: "Automated Appointment Booking",
    headline: "A schedule that fills itself.",
    desc: "Self-serve booking, automatic confirmations and reminders, instant rescheduling, and smart waitlist fill that plugs cancellations before they ever cost you a chair.",
    outcomes: [
      "24/7 self-booking and rescheduling",
      "Reminders over SMS, email and voice",
      "Auto-fills cancellations from the waitlist",
      "Cuts no-shows dramatically",
    ],
    metric: { value: "41%", label: "reduction in no-shows" },
  },
  {
    id: "crm",
    index: "04",
    tag: "Growth CRM",
    name: "Lead & Client Management",
    headline: "No lead ever slips again.",
    desc: "Every lead and patient lives in one pipeline with automated follow-up, recall and reactivation campaigns — plus revenue attribution that shows you exactly what's working.",
    outcomes: [
      "Automated follow-up on every lead",
      "Recall & reactivation of dormant patients",
      "Campaigns across SMS, email & voice",
      "Revenue attribution and reporting",
    ],
    metric: { value: "$48k", label: "revenue recovered / quarter" },
  },
  {
    id: "reviews",
    index: "05",
    tag: "Reputation",
    name: "Automated Review System",
    headline: "More 5-star reviews, on autopilot.",
    desc: "Automatically requests reviews from happy patients after every visit, routes them straight to Google, and quietly catches unhappy feedback in private before it ever goes public.",
    outcomes: [
      "Auto-requests reviews after each visit",
      "Routes 5-star patients to Google",
      "Intercepts unhappy feedback privately",
      "Climbs local search rankings",
    ],
    metric: { value: "127", label: "new Google reviews / yr" },
  },
  {
    id: "agents",
    index: "06",
    tag: "Back office",
    name: "AI Back-Office Agents",
    headline: "The paperwork, handled by agents.",
    desc: "Autonomous agents check eligibility, chase prior authorizations, track claim status and coordinate referrals — clearing the back-office queue around the clock so your staff never touches busywork.",
    outcomes: [
      "Insurance eligibility & benefits checks",
      "Prior authorization follow-up",
      "Claim status tracking",
      "Referral coordination",
    ],
    metric: { value: "30 hrs", label: "back-office work saved / wk" },
  },
];

export const INTEGRATIONS: string[] = [
  "Dentrix", "Open Dental", "Eaglesoft", "Epic", "athenahealth",
  "NexHealth", "Weave", "Curve", "RingCentral", "Twilio", "Stripe", "Square",
];

/* --------------------------- Testimonials --------------------------- */
export type Testimonial = {
  quote: string;
  name: string;
  title: string;
  org: string;
  metric?: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "We filled three front-desk roles in a week and cut staffing costs nearly in half — without losing a single call. Our schedule has never been this full.",
    name: "Renee Castellano",
    title: "Practice Manager",
    org: "Lakeshore Dental Group · 4 locations",
    metric: "−47% staffing cost",
  },
  {
    quote:
      "Our AR dropped from 38 to 26 days in the first two months. The billing team Ascend placed knows the codes better than people we hired locally.",
    name: "Dr. Marcus Whitfield, DDS",
    title: "Owner",
    org: "Whitfield Family Dental · Austin, TX",
    metric: "−12 days AR",
  },
  {
    quote:
      "The AI receptionist answers after hours and books patients while we sleep. We added 60+ appointments a month we were simply missing before.",
    name: "Dr. Priya Nair, MD",
    title: "Medical Director",
    org: "Cedar Park Internal Medicine",
    metric: "+60 appts / mo",
  },
  {
    quote:
      "Onboarding took five days. Our scribes were documenting live by the second week and our providers stopped charting at home.",
    name: "James Okafor",
    title: "Operations Director",
    org: "Summit Oral Surgery",
    metric: "2 hrs saved / provider / day",
  },
];

/* ----------------------------- About ----------------------------- */
export const ABOUT_STATS: { value: string; label: string; accent?: boolean }[] = [
  { value: "2024", label: "Founded" },
  { value: "120+", label: "Practices served", accent: true },
  { value: "340+", label: "Roles placed" },
  { value: "4", label: "Countries of talent" },
];

export const VALUES: { index: string; title: string; desc: string }[] = [
  {
    index: "01",
    title: "Outcomes over hours",
    desc: "We measure ourselves by your filled chairs and collected revenue — not seats warmed or tickets closed.",
  },
  {
    index: "02",
    title: "People first, software second",
    desc: "Skilled people solve the problem today. Our AI extends what they do best — it doesn't replace the judgment that matters.",
  },
  {
    index: "03",
    title: "Zero risk by default",
    desc: "If we don't deliver the right fit, you don't pay. We only win when you do, so our incentives are yours.",
  },
  {
    index: "04",
    title: "Built for healthcare",
    desc: "HIPAA, GDPR and real clinical workflows aren't add-ons. They're the foundation everything else is built on.",
  },
  {
    index: "05",
    title: "Radically reliable",
    desc: "Coverage, QA and a dedicated success manager stand behind every placement. No single points of failure.",
  },
  {
    index: "06",
    title: "Talent deserves growth",
    desc: "Remote shouldn't mean overlooked. We invest in careers with training and mentorship — not disposable gigs.",
  },
];

export const TEAM: { name: string; role: string }[] = [
  { name: "Daniel Osei", role: "Founder & CEO" },
  { name: "Sofia Marchetti", role: "Head of Talent" },
  { name: "Arjun Mehta", role: "Head of Product, AI Platform" },
  { name: "Lena Brooks", role: "Head of Client Success" },
];

/* --------------------------- Process steps --------------------------- */
export const PROCESS: { index: string; title: string; desc: string; day: string }[] = [
  { index: "01", title: "Tell us what you need", desc: "A 20-minute call to map your roles, software and workflows. No commitment, no obligation.", day: "Day 0" },
  { index: "02", title: "We match pre-trained talent", desc: "We hand-pick from a bench of vetted, healthcare-trained professionals — most already know your software.", day: "Day 1–3" },
  { index: "03", title: "Meet and approve", desc: "You interview the shortlist and choose. If they're not right, we re-match — you don't pay until you hire.", day: "Day 3–4" },
  { index: "04", title: "Deploy and support", desc: "They start integrated into your systems, with an Ascend success manager and QA backing them daily.", day: "Day 5" },
];
