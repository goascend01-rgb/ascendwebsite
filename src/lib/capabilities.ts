/* ==============================================================
   The rest of the product.

   The first pass of this site described the front desk and little
   else. This file carries what was missing: the daily loop, the
   three intelligence layers, Creative Studio, acquisition
   economics, the practice record, and the briefings.

   Every claim here was read out of the platform codebase on
   2026-08-21, module by module. Where a capability has a real
   limit, the limit is written down beside it rather than left for
   a prospect to discover. Same rule as everything else on this
   site: no long dash, and nothing that is not built.
   ============================================================== */

/* ---------------------------------------------------------------
   What happens every day.

   The single clearest thing the site can say, and it was missing.
   A practice owner should be able to read six lines and know what
   they are buying.
   --------------------------------------------------------------- */

export type DailyBeat = {
  trigger: string;
  response: string;
  /** The surface that does it, for the reader who wants to go deeper. */
  where: string;
};

export const EVERY_DAY: DailyBeat[] = [
  {
    trigger: "A patient messages on WhatsApp at 11pm",
    response: "Ascend answers, from your knowledge base",
    where: "front-desk",
  },
  {
    trigger: "A patient is due back",
    response: "Ascend works the recall, once consent allows it",
    where: "growth",
  },
  {
    trigger: "A chair comes free",
    response: "Ascend offers it to the patients already waiting",
    where: "schedule",
  },
  {
    trigger: "Somebody drifts away",
    response: "Ascend finds them and values the list from your own history",
    where: "growth",
  },
  {
    trigger: "A visit ends well",
    response: "Ascend asks for the review at the right moment",
    where: "reputation",
  },
  {
    trigger: "Money went out on ads",
    response: "Ascend shows what came back, and what it cost per booking",
    where: "acquisition",
  },
  {
    trigger: "A consultation is written up",
    response: "Ascend summarises the note for the next clinician who opens it",
    where: "records",
  },
  {
    trigger: "The week produces a pattern",
    response: "Ascend puts it in front of you with its reasoning attached",
    where: "briefings",
  },
  {
    trigger: "Ascend is not sure",
    response: "Ascend says so, and asks",
    where: "briefings",
  },
];

export const EVERY_DAY_CLOSE =
  "The nine above are not a feature list. They are what a practice generates in a day, and the ones Ascend did not feel confident enough to handle alone are the ones it brings to you.";

/* ---------------------------------------------------------------
   The three intelligence layers.

   The honest answer to "the network has nothing on day one". It
   does not need to: two of the three layers work immediately, and
   the platform keeps all three disjoint by construction so that
   one can never quietly borrow another's authority.
   --------------------------------------------------------------- */

export type IntelligenceLayer = {
  id: "foundation" | "practice" | "network";
  name: string;
  /** The sentence this layer is entitled to say, verbatim from the codebase. */
  voice: string;
  available: string;
  body: string;
  detail: string[];
  /** Where this layer stops. Never empty. */
  stops: string;
};

export const INTELLIGENCE_LAYERS: IntelligenceLayer[] = [
  {
    id: "foundation",
    name: "Foundation",
    voice: "This is established knowledge I started with.",
    available: "Day one",
    body: "Ascend does not arrive empty. It carries curated guidance and industry research about what tends to work in appointment-based practices, and it can speak from that on the morning you sign.",
    detail: [
      "Deterministic and free: it is a database read and a ranking, with no model in the path, so it costs nothing and cannot drift.",
      "Every item carries its provenance, either industry research or curated guidance, and how current that guidance is. Age costs a prior its rank, never its existence.",
      "It answers a different question from your queue. The queue says what needs you today. This says what is generally known to work, so you are not starting from nothing.",
    ],
    stops:
      "A prior is not a finding, and the wording is held to that. Nothing in this layer may say it has seen something in your practice, because it has not. It is where to start, not evidence about you.",
  },
  {
    id: "practice",
    name: "Practice",
    voice: "I have seen this in your practice.",
    available: "From your first weeks",
    body: "As your own history accumulates, Ascend starts reasoning from what actually happened in your rooms: your visit history, your measured rates, your conversion, your value per visit.",
    detail: [
      "Everything Ascend does from your own data works without waiting for anybody else. Reactivation, slot fill, the receptionist, the queue and the brief all run on your rows.",
      "Ascend will tell you when your own history is too thin to support a claim, and name what it is waiting for, rather than filling the gap from somewhere else.",
    ],
    stops:
      "It cannot rank who has lapsed until it has watched enough of your contact book complete a visit. Below that share it says so and explains why, instead of producing a list it cannot stand behind.",
  },
  {
    id: "network",
    name: "Network",
    voice: "Enough independent practices have seen this that it is worth telling you.",
    available: "Compounds over months",
    body: "Once enough independent practices have contributed the same pattern, it becomes something Ascend can bring to you, with the principle transferred and every number recomputed from your rows.",
    detail: [
      "Nothing publishes below the floor, so a thin signal never reaches you wearing confident language.",
      "You are shown how much evidence sits behind it and how confident that makes it, every time.",
    ],
    stops:
      "In your first weeks it will have very little to say, and it will say that. It is the layer that compounds, not the layer that starts.",
  },
];

export const LAYERS_CLOSE =
  "The three are kept apart on purpose. Mixing them would let a general prior borrow the authority of something Ascend actually measured in your practice, which is the quiet way a system starts being confidently wrong.";

/* ---------------------------------------------------------------
   Creative Studio.

   Seven surfaces. The site previously gave the whole thing one
   sentence.
   --------------------------------------------------------------- */

export type CreativeSurface = {
  name: string;
  summary: string;
  detail: string[];
};

export const CREATIVE_SURFACES: CreativeSurface[] = [
  {
    name: "Strategy",
    summary: "What is worth making this week, and why.",
    detail: [
      "Opens on the question a practice actually has, which is not what to post but what to make next.",
      "Reads your season and your calendar, so a plan lands in the month you are actually in rather than a generic one.",
    ],
  },
  {
    name: "Research",
    summary: "What your market is doing, checked before you see it.",
    detail: [
      "You bring in competitor profiles and posts. Ascend normalises them, then analyses the set on a weekly pass.",
      "Every figure in the report is computed deterministically and the model is only allowed to interpret what it was handed. A claim that does not survive the arithmetic is downgraded in strength, never deleted, so thin evidence reads as early signal rather than disappearing.",
      "Confidence is a pure function of how much real data there was, not something the model asserts. A dimension without enough behind it comes back as insufficient rather than being scored anyway.",
    ],
  },
  {
    name: "Media Vault",
    summary: "Everything you have shot, in one place and findable.",
    detail: [
      "Upload once and reuse. Assets carry their own descriptive metadata, which is what lets the reel builder find the right clip later instead of you scrolling.",
    ],
  },
  {
    name: "Case Studio",
    summary: "Your cases, stored, scored and ready to become content.",
    detail: [
      "Keep a case with its photography and its consent state recorded against it.",
      "Ascend scores a case for content potential across six separate dimensions, and says so when it could not judge one rather than guessing a number.",
      "Before and after treatments are assembled from the case you already hold.",
    ],
  },
  {
    name: "Create Posts",
    summary: "Months of posts, each one able to say why it exists.",
    detail: [
      "Plan a week or plan a season, in your voice, and edit anything before it goes anywhere.",
      "Every post carries what it was built from. The model cites its sources and deterministic code decides which citations count: one that names a case, a review or a recommendation must match a row that was really supplied, or it is dropped rather than persisted. What survives is marked as traced to a row, and what cannot be traced is marked as the model saying it used something. The two are never presented as the same thing.",
    ],
  },
  {
    name: "Create Reel",
    summary: "Clips in, a cut out.",
    detail: [
      "Add your video and let Ascend compile it into a reel, using the metadata in your vault to find what belongs in it.",
      "Draft as many versions as you want. Nothing overwrites the last one.",
    ],
  },
  {
    name: "Publishing",
    summary: "The consent gate sits at the exit.",
    detail: [
      "A case without permission cannot reach a public feed by any route, including a route somebody adds later, because the gate is at the point of publishing rather than in the editor.",
    ],
  },
];

export const CREATIVE_STOPS =
  "Ascend does not scrape your competitors. Your team brings the snapshots in, and Ascend tells you how old the picture is rather than presenting last month's market as this week's.";

/* ---------------------------------------------------------------
   Acquisition economics.

   Five layers, deliberately separated so the later intelligence is
   defensible. The site had no mention of any of it.
   --------------------------------------------------------------- */

export type AcquisitionStage = {
  index: string;
  question: string;
  name: string;
  body: string;
};

export const ACQUISITION_CHAIN: AcquisitionStage[] = [
  {
    index: "01",
    question: "What did we spend?",
    name: "The spend ledger",
    body: "Your ad accounts and campaigns, with what each one cost. Corrections are appended rather than edited over, so the number you saw last month is still there and still explains itself.",
  },
  {
    index: "02",
    question: "What happened?",
    name: "The funnel",
    body: "Lead, then booked, then attended. Counted per person rather than per event, so one patient cannot inflate three stages, and each stage is a real count over real rows.",
  },
  {
    index: "03",
    question: "How much can we trust it?",
    name: "Readiness",
    body: "Before Ascend costs anything out, it decides whether the inputs can carry the conclusion. When they cannot, it withholds the figure and tells you plainly which input was too thin, rather than printing a precise looking number.",
  },
  {
    index: "04",
    question: "What does it mean?",
    name: "Economics and intelligence",
    body: "Cost per lead, per booking and per attendance, converted into one currency, with every figure walking back to the facts it came from.",
  },
  {
    index: "05",
    question: "Did it work?",
    name: "Outcome",
    body: "What Ascend expected to move, and whether it moved. A recommendation that cannot be checked afterwards does not ship as one.",
  },
];

export const ACQUISITION_STOPS =
  "Spend is entered rather than synced from an ad platform, and Ascend says so on the page. Where too little of your revenue is captured to support a revenue figure, it withholds that figure rather than estimating it.";

/* ---------------------------------------------------------------
   The practice record.

   Patients, consultations, the clinical record, the money.
   --------------------------------------------------------------- */

export const RECORDS_CAPABILITIES: { title: string; body: string }[] = [
  {
    title: "The patient record",
    body: "Your patient list and each patient's clinical record, with consultations, standing clinical facts and their history in one place.",
  },
  {
    title: "Consultation notes, summarised",
    body: "Write the consultation up as you always would. Ascend produces the summary, so the next clinician to open the chart reads a paragraph rather than a wall.",
  },
  {
    title: "Every read is attributable",
    body: "There is no way to open a chart anonymously. Every clinical read takes an actor and writes its audit row inside the same transaction as the read itself, so if the log cannot be written the read does not happen.",
  },
  {
    title: "The receptionist cannot reach it",
    body: "The patient-facing side and the clinical record are separated at the table level. A test fails the build if a patient-facing module so much as imports the clinical surface, which is why the boundary holds without anyone having to remember it.",
  },
  {
    title: "Treatment readiness",
    body: "Who is ready for what, derived from the record rather than from a guess.",
  },
  {
    title: "The patient ledger",
    body: "What was billed, what arrived, what was returned, and what is outstanding. A patient with no charges recorded reads as not yet billed, never as a zero balance, because those are different facts.",
  },
];

export const RECORDS_STOPS =
  "This is a clinical and financial record, not an invoicing or payments system. Ascend does not process payments, chase them, or allocate one against a particular charge.";

/* ---------------------------------------------------------------
   The briefings.

   Named carefully. The founder does not want the internal product
   names on the marketing site, and one of them reads as gimmicky
   in front of a clinician, so this describes what they do instead.
   --------------------------------------------------------------- */

export const BRIEFINGS: { eyebrow: string; title: string; body: string; note: string }[] = [
  {
    eyebrow: "EACH MORNING",
    title: "One ranked queue of what needs a person",
    body: "Not a feed and not a notification pile. A short ordered list of the things Ascend believes deserve a human today, each carrying its reason, its evidence and how confident it is.",
    note: "The ones it cannot back, it says so about, rather than leaving them out and letting the list look cleaner than the evidence.",
  },
  {
    eyebrow: "EACH DAY",
    title: "A short written brief on what you should know",
    body: "Ascend already knows a great deal and says it across a dozen screens, which is no use to an owner who does not open all twelve. This is the one screen that answers what you should know right now.",
    note: "It computes nothing itself and calls no model. Every sentence traces to a producer that already did the reasoning, and a line does not appear unless that producer actually answered.",
  },
  {
    eyebrow: "EACH WEEK",
    title: "A written review of the week against the last one",
    body: "This week against last week, on your real counts, with the changes that matter picked out and explained in sentences rather than left as a chart to interpret.",
    note: "The numbers are computed first and handed over. The writing only narrates them, so a review cannot invent a figure even if the wording around it is generous.",
  },
  {
    eyebrow: "CONTINUOUSLY",
    title: "What Ascend is watching, and what it got right",
    body: "A board of the things Ascend is holding open, ranked by how much evidence sits behind each one, plus the wins it can actually prove.",
    note: "A win only appears here if a recommendation you approved moved a metric against your own baseline. Nothing is celebrated that was not measured.",
  },
];

export const BRIEFINGS_STOPS =
  "The daily brief has no buttons. It answers what you should know. The queue answers what you should do. Keeping the two apart is deliberate, because a screen that does both ends up doing neither well.";

/* ---------------------------------------------------------------
   What makes the Network unlike anything else on the market.

   The moat, argued mechanically rather than adjectivally.
   --------------------------------------------------------------- */

export const NETWORK_MECHANICS: {
  index: string;
  title: string;
  body: string;
}[] = [
  {
    index: "01",
    title: "The same action, described three ways, counts once",
    body: "Posted a whitening case, uploaded a smile transformation, shared a before and after. Three practices, three phrasings, one thing. Left as text those stay three weak signals forever, no matter how many practices join. Ascend normalises every observation to a fixed vocabulary at the moment it is captured, so the network gets stronger with scale instead of noisier. Anything it does not recognise is held aside rather than forced into the nearest bucket.",
  },
  {
    index: "02",
    title: "Anonymised three separate ways, not promised once",
    body: "No practice identifier ever touches a contributed row. A contributing practice exists only as a one way hash. And only patterns that generalise are emitted at all, so the specific never leaves in the first place. The tables that hold contributions are not reachable by the application at all, only by the nightly job that writes them.",
  },
  {
    index: "03",
    title: "You are told your number, not the flattering one",
    body: "A pattern might have eighteen contributing practices worldwide and three in your market. Ascend shows you the three. The larger number is the right one for the network and the wrong one for your practice, and printing it would be the easiest exaggeration in the product.",
  },
  {
    index: "04",
    title: "Knowledge is revised, not quietly forgotten",
    body: "When two established patterns in the same slice start predicting opposite things, that is not noise to be aged out. The side with real outcome evidence behind it wins, and the other is superseded with a reason attached and kept on the record. Advice that is actively wrong now does more damage than advice that is merely old, so it is handled differently.",
  },
  {
    index: "05",
    title: "It learns which recommendations practices actually act on",
    body: "Not only which patterns hold, but which kinds of advice get taken up and, as the evidence matures, whether taking them up worked. That runs through the same anonymisation and the same floors as everything else.",
  },
  {
    index: "06",
    title: "The model never goes looking",
    body: "Retrieval is deterministic. A query hands the model a small, already validated set of patterns, ordered so a weak one can never outrank a strong one. The model writes and explains. It does not decide what counts as evidence, which is the job it would be worst at.",
  },
];

export const NETWORK_UNIQUE_CLOSE =
  "Any of the individual features on this site could be built by a competent team in a year. This could not, because it is not a feature. It is the compound result of every practice on Ascend contributing evidence to a system that was built from the first day to keep each practice's numbers inside its own walls, and none of that is retrofittable onto a product that did not start that way.";

/* ---------------------------------------------------------------
   The full module inventory, for /platform.

   Everything the product actually contains, so that a buyer never
   concludes from this site that Ascend is a receptionist.
   --------------------------------------------------------------- */

export const PLATFORM_MODULES: {
  group: string;
  items: { name: string; body: string }[];
}[] = [
  {
    group: "Front desk",
    items: [
      { name: "Unified inbox", body: "WhatsApp, Instagram, Facebook Messenger, the web widget and SMS, in one thread per patient." },
      { name: "Knowledge base", body: "Your prices, policies, hours and services, with Ascend reporting where patients asked something it could not answer." },
      { name: "Deterministic routing", body: "Greetings and opening hours answered at no cost, clinical and urgent messages sent straight to a human before any model reads them." },
      { name: "Kept promises", body: "When the receptionist tells a patient somebody will follow up, that becomes a task with a person attached, and Ascend measures whether it was kept." },
    ],
  },
  {
    group: "Schedule",
    items: [
      { name: "Appointments", body: "The working schedule, including who attended and who did not." },
      { name: "Slot fill", body: "When a chair frees, the patients already holding a later appointment for that treatment are offered it, longest wait first." },
      { name: "Patient forms", body: "Sent as single use links, with a record of what was sent and to whom." },
      { name: "Services catalogue", body: "Built from what your bookings are actually called, including the three spellings of the same treatment." },
    ],
  },
  {
    group: "Growth",
    items: [
      { name: "Reactivation and recall", body: "Who has drifted, valued from your own average visit value, contacted only where consent allows." },
      { name: "Lost leads", body: "Somebody asked about a treatment, got an answer and never booked. The cheapest booking available to you, and the one nobody has time to chase." },
      { name: "Revenue recovery", body: "Patients who cancelled or did not show and were never rebooked, with the recovery rate used to value them shown on the page rather than hidden." },
      { name: "Consent", body: "Per channel, with opt out honoured immediately and permanently, and photo permission treated as a separate question entirely." },
    ],
  },
  {
    group: "Reputation",
    items: [
      { name: "Review requests", body: "Sent at a delay you set after the visit." },
      { name: "Feedback routing", body: "Four and five star replies to your Google link, one to three star captured privately and turned into a task with the patient's words attached." },
      { name: "Drafted replies", body: "For public reviews you bring in, with a hard rule that a reply may never confirm treatment details or even that the person is a patient." },
    ],
  },
  {
    group: "Creative Studio",
    items: [
      { name: "Strategy and calendar", body: "What to make, and when, with your season taken into account." },
      { name: "Market research", body: "Competitor snapshots you bring in, analysed weekly, every number checked before it reaches you." },
      { name: "Media Vault", body: "Your footage and photography, described well enough to be found again." },
      { name: "Case Studio", body: "Cases with consent recorded, scored for content potential, ready to become before and afters." },
      { name: "Posts and reels", body: "Months of posts in your voice, and reels compiled from your own clips." },
    ],
  },
  {
    group: "Acquisition",
    items: [
      { name: "Spend ledger", body: "What you spent, by account and campaign, with corrections appended rather than overwritten." },
      { name: "Funnel", body: "Lead to booked to attended, counted per person." },
      { name: "Economics", body: "Cost per lead, booking and attendance, withheld when the inputs cannot carry it." },
    ],
  },
  {
    group: "The practice record",
    items: [
      { name: "Patients and consultations", body: "The clinical record, with consultation notes summarised for whoever opens it next." },
      { name: "Audited access", body: "Every clinical read attributed and logged in the same transaction as the read." },
      { name: "Treatment readiness", body: "Who is ready for what, derived from the record." },
      { name: "Patient ledger", body: "Billed, received, refunded and outstanding, with no charges never rendered as nothing owed." },
    ],
  },
  {
    group: "Command",
    items: [
      { name: "The morning queue", body: "Ranked, each item carrying its reason and its evidence." },
      { name: "The daily brief", body: "One screen for what you should know, assembled from producers that already did the reasoning." },
      { name: "The weekly review", body: "This week against last, narrated from numbers computed before the writing starts." },
      { name: "The watch board", body: "What Ascend is holding open, ranked by how much evidence sits behind it." },
      { name: "Autonomy", body: "Per domain, across six domains, assisted by default, reversible instantly, with a shadow preview before any of it." },
    ],
  },
];
