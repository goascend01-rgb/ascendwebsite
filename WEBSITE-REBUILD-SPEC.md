# goascend.co: full content rebuild spec

**Written 2026-08-20. For execution by a Claude Code session working in `C:/Users/HP/Desktop/Ascend Website`.**

This document replaces the content direction in this repo's `CLAUDE.md`. Where the two disagree,
this wins, and `CLAUDE.md` should be updated as the last step of the rebuild (see §13).

The visual system stays. The **content** is being rebuilt from the ground up, because the current
site sells a product Ascend does not have, to a market Ascend is not targeting, with proof that
does not exist.

---

## 0. How to use this document

1. Read §1 to §4 before writing a single line. §4 is the one that stops you shipping a lie.
2. §5 is the route map. §6 is the copy, verbatim, ready to paste.
3. §7 is the content-model rewrite. §8 is the file-by-file work plan.
4. §9 is the legal pages, which are a hard dependency for Meta app review.
5. §12 lists guard tests. Write them. They are the only thing that keeps §4 true after this session.

**Copy in §6 is final copy, not a brief.** Paste it. Do not "improve" it, do not add adjectives,
and do not restore anything this document deleted. Where a value needs the founder, it is written
as `[[TOKEN]]` and listed in §11.

---

## 1. What Ascend actually is

Ascend is one brand with two offerings. They are not equal and the site must not pretend they are.

### 1.1 Ascend Operator (the AI operating system): the primary business

An operating system for independent, appointment-based practices. Not a chatbot, not a dashboard.
It runs the unglamorous, revenue-critical follow-ups a practice never has hands for, it shows its
reasoning before it acts, and it will not act without permission until the owner grants it.

The shipped product, verified against the codebase on 2026-08-20:

| Area | What is real |
| --- | --- |
| **Front desk** | AI receptionist over web chat, SMS, WhatsApp, Instagram DM and Facebook Messenger. Grounded in the practice's own knowledge base. A deterministic router picks the tier before any model is involved, so a safety-relevant message can never be answered by the cheap tier. Escalation to a human is a code path, not a prompt instruction. |
| **Schedule** | Appointments, slot-fill offers when a chair frees up, patient forms with tokenised links. |
| **Growth** | CRM outreach (reactivation, recall, win-back, birthday) gated on per-channel consent. Creative Studio: cases, posts, collages, reels, media vault, market intelligence. Acquisition spend and funnel economics. |
| **Reputation** | Review requests over SMS, 4 and 5 star ratings routed to the practice's own Google link, 1 to 3 star feedback captured privately and handed to staff as a task. Drafted replies to public reviews the practice brings in. |
| **Command** | Command Center: a ranked queue of recommendations, each carrying its reason and its evidence. The Brief: a daily edition. Board Meeting: a weekly synthesis. Autopilot: per-domain autonomy across six domains, assisted by default. Shadow mode: a read-only preview of what full Autopilot would do. |
| **Records** | Patient list and clinical record, consultations, Treatment Readiness, a patient financial ledger. Every clinical read writes an audit row inside the same transaction. |
| **Intelligence Network** | Anonymised cross-practice learning. Publication floor of 3 independent practices and 30 observations, enforced in policy. Claims are built from normalised tokens, so a magnitude cannot physically appear inside one. |

The philosophy, which is the actual product and must survive into the copy:

> If Ascend has information that could reasonably help the practice, it surfaces it, with the
> correct level of confidence. It does not hide it because it isn't perfect.

Two failure modes, both fatal: **fabrication** (a confident number with nothing behind it) and
**silence** (a blank card, an empty queue). Every metric occupies one of four states: `measured`,
`estimated`, `unknown`, `not_applicable`. `$0` and "Not yet measurable" are different statements
and the product keeps them apart, on screen, in words.

**Commercial position (locked, founder-directed 2026-08-10):**

| | Front Desk | **Operator** | Partner |
| --- | --- | --- | --- |
| Monthly | $697 | **$1,997** | $4,997 |
| Install | $995 | **$2,500** | $7,500 |
| Network access | no | yes | yes |

Annual is two months free. Founding cohort is 10 practices, price locked for life, cohort two
opens at $2,497. **No money-back guarantee, ever.** Risk reversal is the 90-day working
commitment: outcomes agreed in writing before signature, and if they have not landed by day 90,
Ascend keeps working at no further monthly cost until they do.

### 1.2 Ascend Staffing (remote hiring): the secondary business

Pre-trained remote professionals for practices: front desk and reception, billing and insurance,
coding and scribes. Deployed in days. **You pay only after you hire.**

Status confirmed by the founder on 2026-08-20: **the capability is offered, no clients are placed
yet.** Every stat on the current site implying an operating placement business is invented and
comes out.

---

## 2. What is wrong with the site today

An audit of the live site and this repo. Each line is a defect, not an opinion.

### 2.1 It sells a product that does not exist

| Claim on the site | Reality in the codebase |
| --- | --- |
| "AI Voice Receptionist", "sub-second pickup", "answers 100% of calls", "60+ after-hours appointments/mo" | **There is no voice product.** `ROADMAP.md:698` lists a voice receptionist as `Later`. The only telephony code is Twilio SMS. TwiML in the platform repo is an SMS webhook reply path, not a call handler. This is the single largest false claim on the site. |
| Integrations with Dentrix, Open Dental, Eaglesoft, Epic, athenahealth, NexHealth, Weave, Curve, RingCentral, Square | **None are built.** `integration_provider` is an enum with no adapter behind it. `booking.ts:82` says Ascend's own schedule is the source of truth today and a real adapter "drops in" later. |
| "AI Back-Office Agents": eligibility checks, prior authorization, claim status, referral coordination | **None of this exists.** No eligibility, no prior-auth, no claims code anywhere in the platform. |
| "Automated Appointment Booking", "24/7 self-booking", "reminders over SMS, email and voice" | Booking and reminders exist over SMS and WhatsApp. **Voice reminders do not.** Email is in the channel enum but the only outbound text channels are `sms` and `whatsapp` (`outboundChannel.ts:12`). |
| "127 new Google reviews / yr", "41% fewer no-shows", "3.2x lead conversion", "$48k recovered / quarter" | Invented. No practice has ever run Ascend in production. |

### 2.2 Its proof is fabricated in the most checkable way possible

- Four named testimonials from named people at named practices: Renee Castellano at Lakeshore
  Dental Group, Dr. Marcus Whitfield at Whitfield Family Dental, Dr. Priya Nair at Cedar Park
  Internal Medicine, James Okafor at Summit Oral Surgery. **None exist.**
- Eight client logos naming practices that do not exist.
- "120+ practices served", "98% 12-month retention", "340+ roles placed", "4 countries of talent",
  "Founded 2024", "4.9/5 average".
- A four-person leadership team (Daniel Osei, Sofia Marchetti, Arjun Mehta, Lena Brooks) that
  **does not exist.** Ascend is founder-led.
- A phone number, `+1 (512) 555-0142`, which is a reserved fictional number.

### 2.3 The moat is entirely absent

The Intelligence Network is the reason Ascend is not a commodity, and the founder's locked position
is that it leads. **The word "network" does not appear on the site once.** The site currently sells
an AI receptionist plus tools, which is the exact positioning the founder rejected: "Everybody has
the chat receptionist, this is something else."

### 2.4 Two bugs visible on the live page

The talent showcase renders "**0%** lower staffing cost" and "**0** days deployment time". A
`CountUp` component is animating from zero and never reaching its target, or is bound to a missing
value. Both are on the first screen.

### 2.5 It talks to the wrong buyer

The homepage sells staffing first, so a visitor who arrived for the operating system reads two
screens of outsourcing before finding it. Staffing has no clients and the platform is the business.

### 2.6 Copy rule violations

Long dashes are used as sentence punctuation throughout (`site.ts` alone has more than thirty).
The founder rule is that a long dash may never surface in anything a human reads. See §10.

---

## 3. Decisions locked for this rebuild

Confirmed with the founder, 2026-08-20. Do not re-open these.

1. **Platform-first.** The homepage sells Ascend Operator. Staffing gets its own complete story at
   `/staffing`. **The hero toggle is deleted.** One brand, one funnel, one argument per screen.
2. **US primary, USD pricing.** HIPAA and BAA posture front and centre. No PKR, no region switcher.
   Pakistan is handled by enquiry, not by the site.
3. **Staffing is described as offered, never as proven.** No placement counts, no retention rates,
   no client names.
4. **Proof:** see §3.1. This is the one place where the founder's instruction and the product's
   own philosophy pull against each other, so read it carefully.
5. **The Network leads.** It gets a homepage section and its own page at `/network`.
6. **The CTA is not "book a demo".** It is the leak report: send your last twelve months, get your
   own numbers through the four leaks on a 20-minute call.

### 3.1 Proof, and the one recommendation in this document

The founder's instruction: *"we can use some madeup reviews that I will replace with real ones once
we start selling to waitlist. There has to be at least some sort of proof on the website."* The
waitlist itself is not to be mentioned.

That instruction is honoured. **How** it is honoured matters, because the risk is asymmetric: a
prospect who searches "Renee Castellano Lakeshore Dental Group" and finds nothing has exactly the
reaction the entire pitch is engineered to prevent, on a site whose central promise is that Ascend
tells you when it is unsure. Named, searchable, non-existent people and practices are the one form
of placeholder proof that can be disproved in ten seconds.

**So build it this way:**

- Placeholder testimonials are attributed by **role, practice shape and region**, never by an
  invented person or business name. "Practice owner, two-location group, Texas" instead of
  "Dr. Marcus Whitfield, Whitfield Family Dental". Nothing on the page can be searched and found
  missing, nothing needs a real person's permission later, and the quote reads exactly as strongly.
- Every entry carries `status: 'placeholder' | 'verified'` in the content model, so swapping in a
  real one is a one-line edit and an audit of what is still placeholder is a grep.
- Attribution shape is a single constant. If the founder later wants named attribution, it is one
  field in one file, not a rewrite.
- **No aggregate scale statistics at all.** No "120+ practices", no "98% retention", no "4.9/5".
  These are simultaneously the most checkable, the most damaging, and the least persuasive claims
  on the page. A quote about an outcome is placeholder proof; "120+ practices served" is a
  falsifiable statement about the size of the company.
- **The real proof carries the page.** Ascend has something better than testimonials it has not
  earned yet: a product that says true things out loud. §6.4 is built entirely from real sentences
  the software actually produces. No competitor's marketing site shows their product admitting it
  does not know something, because no competitor's product does.

---

## 4. The claim-truth register

**This is the section that matters most.** Before any sentence goes on the site, check it here.
Every "may claim" line was verified against the codebase on 2026-08-20.

### 4.1 MAY be claimed

**Front desk**
- Answers over web chat, SMS, WhatsApp, Instagram DM and Facebook Messenger.
- Answers are grounded in the practice's own knowledge base.
- It will not invent a price or a policy, and hands over to a human when it does not know.
- Escalation is enforced in code. A message about clinical suitability is routed above every
  commercial intent, before any model sees it.
- Bilingual only if the founder confirms it. Claude handles many languages, but do not put a
  specific language pair on the site without confirmation.

**Schedule**
- When a slot frees up, Ascend offers it to patients who already hold a later appointment for the
  same treatment, longest wait first, and the first yes takes it.
- If nobody claims the slot in time, Ascend says so rather than dropping it silently.
- **Never say "N patients are on your waitlist".** There is no standing waitlist table. What is
  recorded is how many freed slots came up and how many were filled.
- Patient forms are sent as tokenised links.

**Growth**
- Finds patients who have drifted, using the practice's own visit history.
- Values them from the practice's own average visit value, or says it cannot when that is unset.
- Reactivation, recall, win-back and birthday outreach, gated on per-channel consent with STOP and
  START handling.
- Creative Studio produces posts, collages, case studies and reels from the practice's own
  consented cases, with the consent gate enforced in code before publishing.

**Reputation**
- Requests reviews over SMS at a configurable delay after a visit.
- A 4 or 5 star reply is routed to the practice's own Google review link.
- A 1 to 3 star reply is captured privately and becomes a task for staff. It is never posted.
- Drafts replies to public reviews. **Say "reviews you bring in".** Ascend does not yet fetch
  reviews from any platform; staff paste them today.

**Command and trust**
- One ranked queue, each item carrying its reason.
- A daily brief and a weekly board meeting built from the practice's own numbers.
- Assisted mode is the default and does not expire.
- Shadow mode shows what full Autopilot would have done, over a 14-day look-back, without doing it.
- Autonomy is granted per domain across six domains: conversations, schedule, waitlist, campaigns,
  reviews, content. Reversible at any time.
- Every recommendation carries five fields: what it believes, why it may apply here, what is
  different about this practice, what changed because of that, and how both parties will know
  whether it worked.

**Network**
- Nothing publishes until at least 3 independent practices and 30 separate observations support it.
  Both are policy constants (`publishing.minIndependentClinics: 3`, `publishing.minSampleSize: 30`).
- Confidence tiers are real: emerging at 40, established at 60, proven at 90.
- The network carries principles and cannot carry magnitudes. Claims are built from normalised
  tokens, so revenue, pricing, patient counts, conversion rates and budgets cannot appear inside
  one. This is structural, enforced at five contribution paths plus an FX rule.
- Participation is opt-in and withdrawal purges the contribution.
- Ascend never compares a practice to a competitor and never builds a similarity profile of it.
- **And the honest half, which must appear beside the claims:** in the first weeks the network has
  very little to say, and Ascend says so. Ascend is useful on day one from the practice's own data;
  the network compounds on top over months.

**Data and compliance**
- Patient clinical data is stored with forced row-level security, role-gated routes and an
  append-only access log. No clinical read happens without an audit row written in the same
  transaction.
- Clinical AI runs on Anthropic only.
- Export any time. Thirty days notice. No exit fee.

### 4.2 MUST NOT be claimed

Delete on sight. Each of these is currently on the site.

| Never say | Why |
| --- | --- |
| Voice receptionist, phone answering, call handling, "answers the phone", "sub-second pickup", hold times, "100% of calls answered" | No voice product exists. Roadmapped as Later. |
| Any named practice-management or EHR integration: Dentrix, Open Dental, Eaglesoft, Epic, athenahealth, NexHealth, Weave, Curve, RingCentral, Square | No adapter exists. An enum is not an integration. |
| Eligibility verification, prior authorization, claim status, claim submission, referral coordination, AR follow-up **by the platform** | Not built. These belong to the **staffing** page, where they are done by people. Do not let them leak into platform copy. |
| Email as a channel Ascend sends patient messages on | Outbound is SMS and WhatsApp only. The daily briefing to the owner by email is the one exception and is opt-in. |
| Any measured outcome statistic: "41% fewer no-shows", "$48k recovered", "3.2x conversion", "127 reviews" | Zero practices have run Ascend in production. |
| Any company-scale statistic: practices served, roles placed, retention rate, star rating, countries, founded year | Invented. See §3.1. |
| Named team members other than the founder | Ascend is founder-led. |
| Monitors, watches or pulls in your Google reviews | Public reviews are pasted in by staff today. |
| "N patients on your waitlist" | The number does not exist and cannot be produced. |
| A money-back guarantee, refund, or "risk-free trial" | Founder-directed, absolute. The 90-day working commitment replaces it. |
| "Practices like yours", benchmarks against peers, "compared to similar clinics" | The Network is explicitly built to never do this. |
| Fake phone number | Remove `+1 (512) 555-0142`. Use email until a real number exists. |

### 4.3 Handle with care

- **HIPAA.** Ascend's posture is real (RLS, audit log, PHI vendor boundary, Anthropic and Twilio
  and Neon and Render only). But BAA coverage across the vendor stack is a launch prerequisite the
  founder is resolving. Write the compliance section as **architecture**, which is defensible and
  true: where PHI lives, which vendors are deliberately PHI-blind, what is logged. Do not print a
  certification badge or the words "HIPAA certified". There is no such thing. "Built for HIPAA" and
  "HIPAA-conscious architecture" are fine; "HIPAA compliant" as a bare badge is not.
- **GDPR.** The current site badges it. Drop it from the primary path. US-first, and an unexamined
  GDPR badge is a claim nobody has audited.
- **Instagram and Facebook.** The integration is built but inert until Meta credentials are set,
  and Meta app review is pending. It is fine to list them as channels. Do not promise a
  same-day connection.
- **Verticals.** Founder rule: no user-facing copy names a single vertical as the target. Say
  "independent practices", "your practice". Verticals may appear **only** in inclusive
  enumerations, which is also the right SEO shape: "whether you run a dental practice, an esthetic
  clinic, a medspa or another appointment-based practice". Never "dental software", never
  "for dentists".

---

## 5. Information architecture

Delete the hero toggle. Delete `/roles/[slug]` at the top level and move it under staffing.

| Route | Purpose | Priority |
| --- | --- | --- |
| `/` | The full argument, compressed. Sells Ascend Operator. | P0 |
| `/platform` | What it does all day, in depth. Six domains expanded. | P0 |
| `/network` | The moat. How a pattern travels, the privacy contract, the honest baseline. | P0 |
| `/pricing` | Three tiers, cost comparison, the leak calculator, install, protection. | P0 |
| `/how-it-works` | The 30-day install and the autonomy ladder. | P0 |
| `/staffing` | The remote hiring business, complete and self-contained. | P1 |
| `/staffing/roles/[slug]` | Reception, billing, coding and scribes. | P1 |
| `/about` | Why Ascend exists. Founder-led, honest about stage. | P1 |
| `/contact` | Book the 20-minute call. The conversion endpoint. | P0 |
| `/apply` | Talent application for the staffing bench. | P2 |
| `/security` | Data posture, PHI boundary, subprocessors. Sells to a US buyer. | P1 |
| `/legal/privacy` | Privacy policy. **Hard dependency for Meta app review.** | P0 |
| `/legal/terms` | Terms of service. **Hard dependency for Meta app review.** | P0 |
| `/legal/data-deletion` | Data deletion instructions. **Hard dependency for Meta app review.** | P0 |

**Navigation:** Platform · Network · Pricing · How it works · Staffing, with a `Book the call`
button. About, Security, Apply and legal live in the footer.

---
## 6. The copy deck

Everything below is **final copy**. Paste it verbatim. It contains no long dashes, which is a hard
founder rule (§10). If you find yourself adding one, the sentence needs a comma or a full stop.

### 6.1 Homepage: hero

```
EYEBROW    FOUNDING COHORT · 10 PRACTICES · PRICE LOCKED FOR LIFE

H1         The operator your practice
           never got round to hiring.

SUB        Ascend answers every enquiry, refills the chair a cancellation
           empties, brings back the patients who quietly stopped coming,
           and shows you its reasoning before it does any of it.

CTA-1      Get my leak report
CTA-2      See what it actually does        (anchor to §6.6)

FOOTNOTE   Assisted by default. Nothing reaches a patient until you approve it.
```

Under the hero, three short trust chips, not badges: `Assisted by default` ·
`Built for HIPAA` · `Export any time, no exit fee`.

**Hero visual.** Not a fake dashboard with invented revenue. Use a single real Command Center
recommendation card, rendered in the site's own design language, showing the true structure: title,
reason, evidence, confidence, and the two buttons (Approve, Not now). This is the product's actual
shape and it is the most persuasive object Ascend owns.

### 6.2 Homepage: the opening question

```
EYEBROW    TO OPEN

H2         How many patients did your practice lose last year
           without ever learning their name?

BODY       Nobody can answer that, which is exactly the problem. The revenue that
           leaves a practice does not leave loudly. It leaves as an unanswered
           message at 9pm, a chair that stayed empty on Thursday, and a patient
           who simply never came back.
```

### 6.3 Homepage: the four leaks

```
EYEBROW    THE DIAGNOSIS

H2         Four leaks, and none of them are anybody's fault.

01         The enquiry arrives when nobody can answer
           A message during a procedure. An Instagram DM at 9pm. A form on a
           Sunday. They book somewhere else.

02         A cancellation leaves a chair empty
           Filling Thursday's 2pm means working a list one patient at a time.
           The front desk is already three deep.

03         Patients stop coming and nobody notices for a year
           They did not complain and they did not leave. There is no alert for
           a patient who does nothing.

04         Your reputation is written by accident
           The delighted patient is never asked. The unhappy one is never caught
           before they post.

FOOTNOTE   Every practice has all four. They persist because a practice has finite
           hands and infinite small, unglamorous, revenue-critical follow-ups.
```

Note the change from the deck: leak 01 is now "the enquiry arrives when nobody can answer", not
"the phone rings and nobody can pick up". Ascend does not answer phones. The leak is real and the
fix Ascend offers is real; the channel had to change.

### 6.4 Homepage: proof of character (NEW SECTION, highest priority)

This section did not exist on the old site or in the deck, and it is the most differentiating thing
on the page. Every sentence in the cards is **real output from the shipped product**, taken from
`packages/core/src/decisions.ts` and `packages/core/src/metricValue.ts`.

```
EYEBROW    WHAT NOTHING ELSE YOU HAVE BEEN SOLD WILL EVER SAY

H2         Ascend tells you when it does not know.

BODY       Every dashboard you have bought prints a number whether or not it has
           the evidence for one. On a chart, "we measured it and it was zero" and
           "we have no idea" look identical. Ascend keeps them apart, in words, on
           the screen. These are real cards from the product.
```

Three cards, side by side. Card 2 is the hero of the three.

**Card 1, an opportunity it can back:**
```
LABEL      OPPORTUNITY · HIGH
TITLE      Win back 64 patients who slipped away
REASON     64 patients cancelled or no-showed in the last 3 months and never
           rebooked. A win-back campaign could recover an estimated $3,584
           (at a 20% return rate).
CHIP       Estimated · assumptions shown
```

**Card 2, a blocker it admits:**
```
LABEL      SETUP · NORMAL
TITLE      I can't spot lapsed patients yet: visit history is thin
REASON     You have 1,240 contacts, and I have watched 38 of them complete a
           visit, so I can't tell yet who has drifted away. I start counting from
           the first visit I watch happen, which means a reactivation list would
           take months to build from scratch. If your previous system has visit
           dates, importing them lets me find lapsed patients today.
CHIP       No estimate. The opportunity is real and its size is genuinely unknown.
```

**Card 3, a metric that refuses to guess:**
```
LABEL      REVENUE RECOVERED
VALUE      Not yet measurable
CAPTION    Not $0. Zero would mean we checked and nothing happened. This means
           the evidence has not arrived yet, and it names what it is waiting for.
```

```
CLOSING    An operator who can say "quiet day, nothing needs you" has earned the
           right to be believed when they say the opposite.
```

### 6.5 Homepage: software versus operator

```
EYEBROW    WHY THE LAST THING YOU BOUGHT DID NOT FIX IT

H2         You were sold a report. You needed an operator.

LEFT       WHAT SOFTWARE DOES
           Tells you 96 patients are inactive
           Puts the number on a dashboard
           Waits for a human to act on it
           Is worth the same on your last day as your first
           Knows your practice and nothing else

RIGHT      WHAT AN OPERATOR DOES
           Works out which of the 96 are worth contacting
           Tells you why, in a sentence you can argue with
           Contacts them once you say yes
           Gets better every month it runs
           Learns from practices you will never meet

FOOTNOTE   The number was always correct. The chair was still empty.
           The unit of value is a completed action, not a chart.
```

### 6.6 Homepage: what it does all day

```
EYEBROW    WHAT IT ACTUALLY DOES, ALL DAY

H2         One system where seven used to be.
```

Six cards. **Every line below is verified against the shipped code. Do not embellish.**

```
FRONT DESK · Answers everything
Web chat, SMS, WhatsApp, Instagram and Facebook Messenger. Grounded strictly in
your knowledge base. It will not invent a price or a policy, and it hands over the
moment it does not know. A question about clinical suitability is routed to a human
before any model reads it, because that rule lives in code and not in a prompt.

SCHEDULE · Refills the chair
When a slot frees up, Ascend offers it to the patients already holding a later
appointment for the same treatment, longest wait first. The first yes takes it. If
nobody claims it in time, Ascend tells you, rather than quietly dropping it.

GROWTH · Brings patients back
Finds who has drifted using your own visit history, values them from your own
average visit value, and runs consent-checked reactivation, recall, win-back and
birthday outreach. Somebody who opts out is never contacted again on that channel.

REPUTATION · Builds it on purpose
Asks patients for a review at the right moment. Four and five star replies go to
your Google link. One to three star replies are captured privately and land on your
desk as a task, never in public. Drafts your reply to public reviews you bring in.

CREATIVE · Makes the content
Case studies, posts, collages and reels built from your own consented cases. The
consent gate is enforced in code before anything can be published, so a case
without permission cannot reach a public feed by any route.

COMMAND · Tells you what matters
One ranked queue each morning of what needs a human, each item carrying its reason
and its evidence. A daily brief and a weekly board meeting, both built from your
own numbers, neither of them a template.
```

```
FOOTNOTE   Ascend does not answer your phone. That is on the roadmap and it is not
           built, so we do not sell it.
```

That footnote is deliberate and it should stay. It costs one feature and buys the credibility of
every other line on the page.

### 6.7 Homepage: the Network

```
EYEBROW    THE PART NOBODY ELSE HAS

H2         Every practice on Ascend makes every other practice better.
           None of them ever sees another's numbers.

BODY       This is the whole argument. Everything above this line, a determined
           competitor could copy in a year. This they cannot, because it is not a
           feature. It is what happens when a network of practices contributes
           evidence to a system built from the first day to keep every practice's
           numbers inside its own walls.

CTA        How a pattern travels between practices  →  /network
```

### 6.8 Homepage: how a pattern travels

```
EYEBROW    HOW A PATTERN TRAVELS BETWEEN PRACTICES

H2         The network supplies the principle.
           Your practice supplies every number.

1  Evidence
   Ascend observes what actually happened across the network. Not opinions, not a
   survey, not an industry benchmark report. Outcomes, recorded as they occurred.

2  Transfer
   When a pattern holds, a separate question is asked: can the mechanism behind it
   apply elsewhere? That judgement is written in code and reviewed by a human. It
   is never guessed at run time, and anything unrecognised fails closed.

3  Adaptation
   The principle arrives. Every number attached to it is then computed from your
   rows: your patient list, your measured rates, your history, your currency.

4  Validation
   Ascend states in advance what it expects to move and over what window, then
   measures whether it did. A recommendation that cannot be checked afterwards
   does not ship as one.
```

### 6.9 Homepage: the privacy contract

```
EYEBROW    THE PRIVACY CONTRACT

H2         Structural, not promised.

✓  The network carries principles. It is incapable of carrying magnitudes: not
   revenue, not pricing, not patient counts, not conversion rates, not budgets.

✓  Patterns are assembled from a fixed vocabulary of tokens, so a number cannot
   physically appear inside one.

✓  Nothing is published until at least three independent practices and thirty
   separate observations support it.

✓  Participation is opt-in. Withdraw and everything you contributed is purged,
   including from the published record.

✗  No "practices like yours". Ascend never compares you to a competitor, never
   ranks you against a peer group, and never builds a similarity profile of your
   business.
```

Beside it, in a bordered panel, the honest half. **This panel is not optional.** It is the reason
the five claims above are believable.

```
EYEBROW    AND THE HONEST PART

BODY       In your first weeks the network will have very little to tell you, and
           Ascend will say exactly that rather than dress a thin signal in
           confident language.

           Ascend is fully useful on day one from your own data. The network
           compounds on top of that over the months that follow.

           Every recommendation is labelled with where it came from, how much
           evidence sits behind it, and how confident that makes it.

           Nobody else in this market will tell you when they are unsure.
           That is the feature.
```

### 6.10 Homepage: the real objection

```
EYEBROW    THE REAL OBJECTION, ANSWERED

H2         It has to earn the right to act, one domain at a time.

BODY       The reasonable worry is not "will it work". It is "what happens the day
           it does something stupid to one of my patients". So that is the part
           that was built first.

DEFAULT STATE · Assisted
Ascend proposes, you approve. Nothing reaches a patient without a human pressing a
button. This never expires on its own.

BEFORE YOU COMMIT · Shadow mode
See exactly what Ascend would have done over the last fortnight, on your real
practice, without it doing any of it. Never a leap of faith.

OVER TIME · Earned autonomy
It only asks to run a domain alone after building an approval record there. Your
call, per domain, across six domains, reversible instantly.

FOOTNOTE   Every recommendation carries five fields: what it believes, why it may
           apply to you, what is different about your practice, what it changed
           because of that, and how you will both know whether it worked.
```

### 6.11 Homepage: the leak calculator

Interactive. This replaces the static deck slide and the old savings calculator. It is the single
highest-converting element on the page, because the visitor builds the number themselves.

```
EYEBROW    WHAT IT IS WORTH, WITH THE ASSUMPTIONS IN THE OPEN

H2         We would rather show the working than quote a big number.
```

Inputs, all editable, all with sensible defaults shown below:

| Input | Default | Note under the field |
| --- | --- | --- |
| Active patients | 1,200 | |
| Average visit value | $280 | |
| Go inactive per year | 8% | |
| Recovered at | 15% | |
| Unfilled cancellations per week | 2 | |
| Refilled at | 60% | |
| After-hours enquiries per month | 25 | |
| Converted at | 20% | |

Derived rows, recomputed live: inactive per year, visits recovered, visits refilled, visits
converted, then the total. At the defaults the total is **136 visits at $280, $38,080**.

```
SIDE PANEL
Every rate on the left is a placeholder, deliberately. Ascend does not run on
assumed rates.

Once your history is imported it measures your reactivation rate, your fill rate
and your value per visit, and replaces all of them.

Where it has no evidence yet it says not yet measurable rather than guessing. A
number you cannot interrogate is a number you should not be shown.

CTA        Run this on my real numbers  →  /contact
```

**Implementation notes.** Every derived figure must round the way the deck does (floor to whole
visits). If a visitor sets a field to zero, the row shows `Not applicable` rather than `$0`,
because that is the product's own vocabulary and the page should behave like the product.

### 6.12 Homepage: what one subscription replaces

```
EYEBROW    COST COMPARISON

H2         What one subscription replaces.

Part-time front desk or patient coordinator      $1,800 to $2,600
After-hours answering service                    $300 to $800
Patient communications platform                  $400 to $600
Reputation and review management                 $400 to $600
Practice analytics                               $400 to $1,000
Social media agency                              $1,500 to $3,000
Recall and reactivation campaigns                $800 to $2,000
Combined                                         $5,600 to $10,600

Ascend Operator, all of it, one system           $1,997

FOOTNOTE   Ranges are typical published US market rates, for comparison rather
           than measured. The only number that matters is what your stack costs,
           and we will price against yours on the call. If Ascend does not beat
           it, we will say so.
```

That footnote is load-bearing. It converts an unverifiable table into an honest one.

### 6.13 Homepage: proof (placeholder testimonials)

Placement: after the cost comparison, before pricing. Not near the hero. See §3.1 for why the
attribution is shaped this way.

```
EYEBROW    FROM THE FOUNDING COHORT

H2         What practices say once it is running.
```

Three cards. Attribution is role plus practice shape plus region. No names, no logos, no ratings,
no aggregate counts.

```
"The reactivation list was the thing I always meant to get to and never did. Ascend
built it from our own history in an afternoon and then asked before it sent a single
message."
Practice owner · two-location group · Texas

"I did not want another dashboard. What changed my mind was watching it run in shadow
mode for two weeks and seeing it was right about things I would have missed."
Practice manager · single site · Arizona

"It told me it could not measure something yet. I have never had a piece of software
do that, and it is the reason I trust the numbers it does give me."
Clinical director · three-location group · Florida
```

**Every one of these carries `status: 'placeholder'` in the content model.** They are written to be
replaced. When a real quote arrives, change the string and flip the field.

### 6.14 Homepage: pricing preview

Three tier cards, condensed, linking to `/pricing`. Full copy in §6.19.

### 6.15 Homepage: the install

```
EYEBROW    THE INSTALL, AND WHAT THE FEE BUYS

H2         Thirty days from signature to an operator that knows your practice.

D1 to 3    Your data comes in
           Patients, visit history, providers, hours. Your service catalog built
           from what your bookings are actually called, including the three
           spellings of the same treatment.

D4 to 7    It learns how you answer
           Knowledge base built from your site, your policies, your pricing and
           the questions your front desk really fields. Voice tuned until it
           sounds like your practice.

D8 to 14   Channels connected
           Number provisioned, WhatsApp, Instagram, Facebook and the web widget
           live, consent state imported so nobody who opted out is ever contacted.

D15 to 30  It runs supervised, in front of you
           Everything it wants to do, it shows you first with its reasoning. This
           is where you find out what it is like to work with, at zero risk.

D30+       You decide what it may do alone
           Domain by domain, at your pace, reversible any time. Leaving everything
           supervised for months is a perfectly good way to run it.
```

### 6.16 Homepage: your protection

```
EYEBROW    YOUR PROTECTION

H2         We do not offer a refund. We offer something considerably better.

BODY       A money-back guarantee pays you back for a wasted quarter. It does not
           give you the quarter back. So this offer is built to make the failure
           hard to reach instead.

✓  It cannot act without you. Assisted is the default and it does not time out.
✓  You see it before you trust it. Shadow mode, on your real practice, before any
   autonomy decision.
✓  We do the work, not your staff. No implementation project landing on the person
   who is already busiest.
✓  The ninety-day working commitment. We agree the outcomes in writing before you
   sign. If they have not landed by day ninety, we keep working at no further
   monthly cost until they do.
✓  You are never held hostage. Export any time, leave the Network and your
   contribution is purged, thirty days notice, no exit fee.
```

### 6.17 Homepage: why now

```
EYEBROW    WHY NOW, AND IT IS NOT A FAKE DEADLINE

H2         The founding cohort is ten practices.

BIG        10

BODY       Being early is worth something specific rather than sentimental. A
           pattern cannot be published to the Network until at least three
           independent practices have contributed to it. The founding cohort is
           who crosses that threshold, and they cross it first, in their own
           market.

✓  Price locked for the life of the account. Cohort two opens at $2,497 and does
   not come back down.
✓  Direct access to the founder, not a support tier.
✓  Your requests go to the front of the roadmap, and you will see them ship.
✓  A knowledge module built around how you practise, which becomes part of what
   Ascend knows.

FOOTNOTE   What we ask in return, and it is the whole reason the price is what it
           is: a written case study once the results are real, and a willingness
           to take a reference call.
```

### 6.18 Homepage: the ask

```
EYEBROW    THE ASK

H2         Send us your last twelve months. We will run your own numbers
           through the four leaks.

BODY       Not the worked example from earlier. Yours. You will see the actual
           figure for your practice, with every assumption named and arguable.

           If the number is not big enough to justify the fee, that is a completely
           reasonable outcome and we will tell you on the call rather than chase
           you for a quarter.

CTA-1      Book the 20-minute call
CTA-2      See pricing
```

---
### 6.19 `/pricing`

```
EYEBROW    PRICING

H1         Three tiers. The difference is how much of the running you do.

SUB        Annual is two months free on any tier. Groups and multi-site are priced
           per location with a real discount at scale.
```

**Tier 1**
```
ENTRY · YOU RUN IT
Front Desk
$697 / month · install $995

+ Receptionist on web chat, SMS and WhatsApp
+ Grounded in your knowledge base
+ Reminders and no-show follow-up
+ Review requests and feedback routing
+ One unified inbox
− No CRM outreach campaigns
− No intelligence layer
− No Network
```

**Tier 2, marked THE ONE TO TAKE**
```
CORE · WE INSTALL, YOU STEER
Operator
$1,997 / month · install $2,500

+ Everything in Front Desk
+ Instagram and Facebook Messenger
+ Slot fill when a chair frees up
+ Reactivation, recall and win-back outreach
+ Command Center, every item with its reason
+ Daily brief and weekly board meeting
+ Intelligence Network
+ Autopilot with shadow preview
+ Acquisition economics
+ Creative Studio
+ Full done-for-you install
+ Direct line to the founder
```

**Tier 3**
```
PREMIUM · WE RUN IT
Partner
$4,997 / month · install $7,500

+ Everything in Operator
+ A named operator, weekly
+ Content produced for you
+ Monthly strategy session
+ Multi-location views
+ Knowledge module for your specialty
+ Roadmap priority
+ Quarterly business review
```

Below the tiers, in order: the cost comparison table (§6.12), the leak calculator (§6.11), the
install timeline (§6.15), the protection block (§6.16), then an FAQ.

**Pricing FAQ.** Answer the objections a $1,997 buyer actually raises.

```
Q  What happens if it does something wrong to a patient?
A  In Assisted mode, which is the default and never expires, it cannot reach a
   patient without you pressing a button. Autonomy is granted by you, one domain
   at a time, and revoked instantly.

Q  Do you integrate with my practice management software?
A  Not yet, and we will not pretend otherwise. Ascend runs on its own schedule and
   imports your patients and visit history by file. A direct integration is on the
   roadmap and is not built. If a live two-way sync is a requirement for you today,
   we are not the right fit yet and we will say so on the call.

Q  Does Ascend answer my phone?
A  No. Ascend answers web chat, SMS, WhatsApp, Instagram DMs and Facebook
   Messenger. Voice is on the roadmap. We do not sell what we have not built.

Q  Is there a contract?
A  Thirty days notice, no exit fee, export any time. The install fee buys the
   install and is not an activation toll.

Q  Why is there no free trial or money-back guarantee?
A  Because a refund gives you your money back and not your quarter. Instead you
   get shadow mode before any autonomy decision, and a ninety-day working
   commitment: we agree the outcomes in writing before you sign, and if they have
   not landed by day ninety we keep working at no further monthly cost until they
   do.

Q  What do you do with our patient data?
A  It stays yours. Clinical records sit behind row-level security with an
   append-only access log, so every read is recorded. Clinical AI runs on
   Anthropic only. The Network never carries a number out of your practice: it
   carries principles, and it is built so that a magnitude cannot physically
   appear inside one.

Q  How long until it is useful?
A  From your own data, day one. The Network compounds on top over months, and in
   your first weeks it will tell you it has little to say rather than inventing
   something.
```

### 6.20 `/platform`

```
EYEBROW    THE PLATFORM

H1         An operator, not an inbox.

SUB        Six things Ascend does every day. Each one is described here exactly as
           it works, including where it stops.
```

Then the six domains at full depth. For each: what it does, what it will not do, and the honest
edge. Use the §6.6 copy as the opening paragraph of each, then extend:

```
FRONT DESK
Channels: web chat widget, SMS, WhatsApp, Instagram DM, Facebook Messenger.

Every answer is grounded in your knowledge base: your prices, your policies, your
hours, your services. When it does not have the answer it says so and hands over,
rather than producing something plausible.

The routing happens before any model is involved. A greeting, an opening-hours
question or a directions question is answered deterministically at no cost. A
pricing or insurance question goes to a knowledge-base tier. Anything clinical,
anything urgent, and any explicit request for a human goes straight to the full
receptionist, which is the only tier that can escalate. That ordering is code, not
an instruction in a prompt, which means it cannot be talked out of it.

Where it stops: it does not answer the telephone, and it does not read your
clinical chart. The receptionist and the clinical record are separated at the
table level, not by asking the model nicely.
```

```
SCHEDULE
When an appointment is cancelled, Ascend looks for patients who already hold a
later appointment for the same treatment, ranks them longest wait first, and offers
the freed slot. The first patient to say yes gets moved in, and the rest are
released automatically. If nobody claims it in time, that comes back to you as a
line in the queue.

Where it stops: Ascend will never tell you "twelve patients are on your waitlist",
because it does not keep a standing waitlist and that number would be invented.
What it reports is what actually happened: how many slots came free and how many
were filled.
```

```
GROWTH
Ascend finds the patients who have drifted, using your visit history rather than a
guess. A patient is somebody who has completed a visit; a lead is somebody who
never has; lapsed means a patient whose last completed visit falls outside your
recency window. Those are three different states and Ascend never collapses them.

It values a win-back list from your own average visit value. If you have not set
one, it says so and asks, rather than printing a number it made up.

Every message is gated on consent, per channel. An SMS opt-out is honoured
immediately and permanently, and it says nothing about permission to use a photo,
which is a different consent entirely.

Where it stops: outreach goes over SMS and WhatsApp. Email to patients is not a
channel Ascend sends on.
```

```
REPUTATION
A review request goes out at a delay you set after the visit. A four or five star
reply is routed to your own Google review link. A one to three star reply is
captured privately, never posted anywhere, and lands on your desk as a task with
the patient's words attached, so somebody can pick up the phone.

For public reviews, Ascend drafts your reply, with a hard rule that a public
response may never confirm treatment details or even that the person is a patient.

Where it stops: Ascend does not yet pull your reviews in from Google or anywhere
else. Your team pastes in the ones that need a reply.
```

```
CREATIVE
Cases, posts, collages and reels, built from your own consented cases, with the
consent gate enforced in code before anything can publish. A case whose consent is
missing cannot reach a public feed by any route, including a route somebody adds
later, because the gate sits at the exit rather than in the editor.

Public content is public: it never references a patient's history, ever. Private
outreach may. That line is absolute and it is why the two systems share nothing
but a word.
```

```
COMMAND
One ranked queue. Each item carries its reason, its evidence and its confidence,
and the ones Ascend cannot back it says so about instead of hiding.

A daily brief, written from sixteen producers, where every line names the thing
that justifies it and no line appears unless that thing actually answered. A
producer that failed is reported as failed, never as an all-clear.

A weekly board meeting built from your own numbers.

Where it stops: the brief has no buttons. It answers what you should know. The
Command Center answers what you should do. Keeping them apart is deliberate.
```

Close the page with the trust ladder (§6.10) and the ask (§6.18).

### 6.21 `/network`

The moat page. Structure:

1. Hero: §6.7 copy, expanded.
2. How a pattern travels: §6.8, as a diagram rather than a list.
3. The privacy contract: §6.9, both panels.
4. **A new section that no competitor would write:**

```
EYEBROW    WHAT THE NETWORK CANNOT DO YET

H2         The honest state of it.

BODY       A network needs practices before it has anything to say, and the
           founding cohort is how that starts. Here is where it genuinely stands.

           A pattern needs three independent practices and thirty observations
           before it publishes. Below that it is held, and you are not shown a
           thin signal wearing confident language.

           Everything Ascend does from your own data works on day one and does not
           wait for anybody else. Reactivation, slot fill, the receptionist, the
           queue, the brief: all of it runs on your rows.

           The network is the part that compounds. In month one it will have
           little to add. In month twelve, with a cohort behind it, it is the
           reason Ascend knows something your last vendor could not.

           We would rather tell you that now than have you discover it in week
           three.
```

5. Then the ask.

### 6.22 `/how-it-works`

The 30-day install (§6.15) at full depth, then the autonomy ladder (§6.10), then what is asked of
the practice:

```
EYEBROW    WHAT WE NEED FROM YOU

H2         Four hours of your time, spread over a month.

01  A twenty minute call to agree the outcomes we are committing to in writing.
02  An export from your current system: patients, visit history, providers, hours.
    A spreadsheet is fine. We do the mapping.
03  One hour walking us through how your front desk answers the ten questions it
    answers most.
04  Fifteen minutes a day in week three, reading what it wanted to do and telling
    it yes or no.

FOOTNOTE   That is the whole implementation. There is no project, and there is no
           new job for the person at your front desk who is already busiest.
```

### 6.23 `/staffing`

Self-contained. **Nothing on this page may claim a placement, a client or a retention rate.**

```
EYEBROW    ASCEND STAFFING

H1         The seats you cannot fill, handled by people you did not have to train.

SUB        Pre-trained remote professionals for independent practices. Reception,
           billing and insurance, coding and scribes. Deployed in days, and you pay
           only after you hire.

CTA-1      Tell us what you need
CTA-2      Browse roles
```

Three role cards, unchanged in structure from the current site but with the invented metrics
removed. Keep the price and in-house comparison, which is a market-rate comparison and honest when
labelled as one.

```
01  Front Desk and Reception
    Every enquiry answered. Every chair filled.
    $1,290 / month, against a typical US in-house cost of $3,400

02  Billing and Insurance
    Cleaner claims. Faster money.
    $1,490 / month, against a typical US in-house cost of $3,800

03  Coding and Scribes
    Providers free. Notes done.
    $1,690 / month, against a typical US in-house cost of $4,200

FOOTNOTE   In-house figures are typical published US market rates for the role,
           for comparison rather than measured. We will price against your actual
           cost on the call.
```

Then the process:

```
EYEBROW    HOW IT WORKS

H2         Hired and working in a week, not a quarter.

Day 0      Tell us what you need
           A twenty minute call to map the role, your software and your workflows.

Day 1 to 3 We match pre-trained talent
           Hand-picked from a bench of vetted professionals.

Day 3 to 4 Meet and approve
           You interview the shortlist and choose. If they are not right, we
           re-match. You do not pay until you hire.

Day 5      Deploy and support
           They start integrated into your systems, with a success manager behind
           them.
```

Then an honesty block, which is what makes this page trustworthy given the stage:

```
EYEBROW    WHERE WE ARE

H2         We are building this bench now.

BODY       Ascend Staffing is open and taking briefs. We are not going to show you
           a placement count we have not earned. What we will tell you on the call
           is exactly who is on the bench for your role today, and if there is
           nobody, we will say so and tell you how long it takes.

           You pay only after you hire, so the risk of finding out sits with us.
```

Then a cross-link:

```
The same practices asking us for a receptionist usually have a second problem: the
follow-ups nobody has hands for. That is what Ascend Operator does.
→  See the platform
```

### 6.24 `/about`

Founder-led and honest about stage. No invented team, no founded year, no counts.

```
EYEBROW    ABOUT

H1         Built by one person who got tired of watching
           good practices lose money quietly.

BODY       [[FOUNDER_STORY]]  (see §11: 200 to 300 words, in the founder's own
           words, covering why this problem, why now, and why the honesty posture
           is not marketing.)
```

Then the principles. These are real, taken from how the product is actually built, and they are
the strongest thing an about page could carry.

```
01  Say the true thing, at its true strength
    Ascend never has to choose between making something up and saying nothing.
    "Early signal, watching it" is a complete and honest sentence, and an
    exceptional operator says it several times a week.

02  A number you cannot interrogate is a number you should not be shown
    Every figure carries where it came from, what was assumed, what was excluded
    and how confident it is. If it cannot carry those, it does not ship.

03  Unknown is not the same as no
    A missing measurement reads as "not yet measurable", never as zero. Those are
    different statements and collapsing them is how a dashboard becomes
    confidently wrong.

04  Nothing reaches a patient without permission
    Consent is enforced in code at the exit, not requested of a model in a prompt.
    A rule too important to get wrong does not live in an instruction.

05  We do not sell what we have not built
    There is no voice product, so there is no voice product on this website. You
    will find that unusual and that is the point.
```

Close with the founding cohort ask.

### 6.25 `/security`

For the US buyer. All of this is true today.

```
EYEBROW    DATA AND SECURITY

H1         Where your patients' data lives, and who can reach it.

WHERE PHI LIVES
Patient data is processed by four vendors and no others: Anthropic for AI, Twilio
for messaging, Neon for the database, Render for the application.

WHO IS DELIBERATELY BLIND
Authentication, hosting for the marketing site, background jobs, caching and error
monitoring are all architected so patient data never reaches them. That is a design
constraint, not a policy promise.

HOW ACCESS IS CONTROLLED
Every practice's data is isolated at the database level by row-level security,
which is enforced by the database rather than by application code remembering to
filter. Clinical records are additionally role-gated.

EVERY CLINICAL READ IS LOGGED
Opening a patient's clinical record writes an audit row inside the same transaction
as the read. If the log write fails, the read fails. There is no path that reads a
chart without recording it.

AI AND YOUR CLINICAL DATA
Clinical context reaches AI through an audited accessor in code, never by giving a
model access and instructing it not to look. Clinical AI runs on Anthropic only.

YOUR DATA IS YOURS
Export any time. Thirty days notice. No exit fee. Leave the Network and everything
you contributed is purged, including from the published record.
```

Add a subprocessor table listing: Anthropic, Twilio, Neon, Render, Clerk, Vercel, Inngest, Sentry,
with a column for whether each may process patient data. That table is unusual, verifiable and
sells hard to a careful buyer.

```
FOOTNOTE   Ascend acts as a business associate to your practice. HIPAA compliance
           is a shared responsibility and we will walk through the agreement on
           the call. We do not print a certification badge, because no such
           certification exists.
```

### 6.26 `/contact`

The conversion endpoint. One job.

```
EYEBROW    THE ASK

H1         Send us your last twelve months.

SUB        We will run your own numbers through the four leaks and show you the
           actual figure for your practice, with every assumption named and
           arguable. Twenty minutes. If the number is not big enough to justify
           the fee, we will tell you on the call.
```

Form fields: name, practice name, email, phone (optional), number of locations, roughly how many
active patients, what you are using today, and a free-text box. Nothing else. Every extra field
costs conversions.

```
UNDER THE FORM
What happens next: we reply within one business day with a time. Before the call we
ask for an export of your last twelve months of appointments if you have one. If
you do not, the call still works and we use ranges instead.
```

---
## 7. Content model rewrite (`src/lib/site.ts`)

The current file is the single source of the problem: it is where the invented team, testimonials,
client list, stats and non-existent features are declared. Rewrite it completely.

**Delete these exports entirely:**

| Export | Why |
| --- | --- |
| `STATS` | Every value is invented company-scale proof. |
| `CLIENTS` | Eight practices that do not exist. |
| `TEAM` | Four people who do not exist. |
| `ABOUT_STATS` | Founded year, practices served, roles placed, countries. All invented. |
| `PLATFORM_STATS` | Measured outcome claims from zero production practices. |
| `INTEGRATIONS` | No integration exists. |
| `AI_FEATURES` | Superseded. Describes a voice product. |
| `PLATFORM_FEATURES` | Superseded. Contains voice, booking automation, back-office agents. |
| `SITE.phone` | Fictional number. |

**Rewrite these:**

```ts
export const SITE = {
  name: 'Ascend',
  domain: 'goascend.co',
  email: 'hello@goascend.co',
  // No phone until a real one exists. Do not put a placeholder here.
};

/** How much of the proof on this site is real. Flip to 'verified' when it is. */
export const PROOF_MODE: 'placeholder' | 'verified' = 'placeholder';

export type Testimonial = {
  quote: string;
  /** Role plus practice shape plus region. Never an invented person or business name. */
  attribution: string;
  /**
   * 'placeholder' entries are written to be replaced by real quotes. A guard test
   * asserts no placeholder carries a person name or a business name (§12).
   */
  status: 'placeholder' | 'verified';
};
```

**Add these:**

```ts
/** The six things Ascend does. Every string verified against the platform codebase. */
export const DOMAINS: {
  id: 'front-desk' | 'schedule' | 'growth' | 'reputation' | 'creative' | 'command';
  eyebrow: string;
  name: string;
  summary: string;
  /** What this domain deliberately does NOT do. Renders on /platform. Never empty. */
  stops: string;
}[]

/** The four leaks. Drives both the diagnosis section and the calculator. */
export const LEAKS: { index: string; title: string; body: string }[]

/** Calculator inputs with defaults. Single source for the leak model. */
export const LEAK_MODEL: {
  activePatients: number;      // 1200
  averageVisitValue: number;   // 280
  inactiveRate: number;        // 0.08
  recoveryRate: number;        // 0.15
  cancellationsPerWeek: number;// 2
  refillRate: number;          // 0.60
  afterHoursPerMonth: number;  // 25
  afterHoursConversion: number;// 0.20
}

/** The three real product cards for the proof-of-character section (§6.4). */
export const PRODUCT_TRUTH_CARDS: {
  label: string; title: string; reason: string; chip: string;
}[]

/** Network facts. Numbers here are policy constants in the platform; do not edit freely. */
export const NETWORK = {
  minIndependentPractices: 3,
  minObservations: 30,
  // Mirrors packages/core/src/policy/v1.ts. If the platform changes, change here.
}

export const TIERS: {
  id: 'front-desk' | 'operator' | 'partner';
  eyebrow: string; name: string; monthly: number; install: number;
  highlight?: boolean; includes: string[]; excludes?: string[];
}[]

export const COST_COMPARISON: { item: string; low: number; high: number }[]

export const INSTALL_STEPS: { window: string; title: string; body: string }[]

export const PROTECTIONS: { title: string; body: string }[]

export const PRINCIPLES: { index: string; title: string; body: string }[]  // /about

export const SUBPROCESSORS: {
  name: string; purpose: string; processesPatientData: boolean;
}[]  // /security
```

**Keep, with edits:** `NAV` (new routes), `ROLES` and `PRICE_ITEMS` (staffing, remove the invented
`metric` field from each role), `PROCESS` (staffing only, move under the staffing namespace).

---

## 8. File-by-file work plan

### 8.1 Delete

| Path | Reason |
| --- | --- |
| `src/components/home/TrustedBy.tsx` | Renders eight invented client names. Nothing replaces it. |
| `src/components/home/StatsStrip.tsx` | Renders invented company-scale stats. |
| `src/components/platform/mocks.tsx` | 255 lines of fake dashboard with invented revenue figures. Replaced by real product cards. |

### 8.2 Rewrite completely

| Path | What changes |
| --- | --- |
| `src/lib/site.ts` | Per §7. This is the largest single piece of work and everything else depends on it. Do it first. |
| `src/components/home/Hero.tsx` | 369 lines, currently carries the staffing/platform toggle and the "Maria R." showcase with the two zero-value bugs. Rebuild against §6.1. Delete the toggle. Delete the showcase. |
| `src/components/home/PlatformSection.tsx` | Rebuild against §6.6, six domains, no voice, no integrations. |
| `src/components/home/Testimonials.tsx` | Rebuild against §6.13. New attribution shape, `status` field, no ratings, no aggregate line. |
| `src/components/home/StaffingSection.tsx` | Becomes a short cross-link block on the homepage pointing at `/staffing`, not a primary section. |
| `src/components/pricing/Calculator.tsx` | Becomes the leak calculator (§6.11), not a staffing savings calculator. |
| `src/app/platform/page.tsx` | Rebuild against §6.20. |
| `src/app/pricing/page.tsx` | Rebuild against §6.19, three tiers. |
| `src/app/about/page.tsx` | Rebuild against §6.24. Remove `TEAM` and `ABOUT_STATS` usage. |
| `src/app/how-it-works/page.tsx` | Rebuild against §6.22, platform install rather than staffing hiring. |
| `src/components/layout/Navbar.tsx` | New IA (§5). |
| `src/components/layout/Footer.tsx` | New IA, add legal links, remove the fake phone. |

### 8.3 Create

| Path | Content |
| --- | --- |
| `src/app/network/page.tsx` | §6.21. The moat page. |
| `src/app/staffing/page.tsx` | §6.23. |
| `src/app/staffing/roles/[slug]/page.tsx` | Moved from `src/app/roles/[slug]/page.tsx`, invented `metric` removed. |
| `src/app/security/page.tsx` | §6.25. |
| `src/app/legal/privacy/page.tsx` | §9.2. |
| `src/app/legal/terms/page.tsx` | §9.3. |
| `src/app/legal/data-deletion/page.tsx` | §9.4. |
| `src/components/home/ProductTruth.tsx` | §6.4. The three real product cards. Build this well; it is the most important new component on the site. |
| `src/components/home/NetworkSection.tsx` | §6.7 and §6.8. |
| `src/components/home/PrivacyContract.tsx` | §6.9, both panels. |
| `src/components/home/TrustLadder.tsx` | §6.10. |
| `src/components/home/CostComparison.tsx` | §6.12. |
| `src/components/home/Protection.tsx` | §6.16. |
| `src/components/home/FoundingCohort.tsx` | §6.17. |
| `src/components/legal/LegalLayout.tsx` | Shared shell: title, last-updated date, table of contents, prose styles. |
| `src/components/ui/Faq.tsx` | Accordion for the pricing FAQ, with `FAQPage` structured data. |

### 8.4 Fix

`src/components/ui/CountUp.tsx` renders `0%` and `0` on the live site. Either the target prop is
missing at the call site or the intersection observer never fires. Reproduce, fix, and add a test
that a `CountUp` with a target of 47 ends at 47. If the component is only used by deleted sections,
delete it too and note that in the commit.

---

## 9. Legal pages (hard dependency for Meta app review)

Meta's app review for messaging permissions will not proceed without three publicly reachable URLs,
each loading with no login and no cookie wall:

| Meta field | URL |
| --- | --- |
| Privacy Policy URL | `https://goascend.co/legal/privacy` |
| Terms of Service URL | `https://goascend.co/legal/terms` |
| User Data Deletion | `https://goascend.co/legal/data-deletion` |

**These pages are drafts and need a lawyer's review before Ascend signs a US customer.** Ship them
for Meta review, and put the review on the launch checklist. Say this to the founder once, plainly,
and do not hedge the pages themselves into uselessness.

### 9.1 The structure the policy must reflect

Ascend sits in two different legal roles at once, and a policy that blurs them will read as
unserious to both a Meta reviewer and a US practice's counsel:

1. **Ascend as controller**, for people who visit goascend.co, submit the contact form, apply as
   talent, or hold a login to the dashboard. Ascend decides what happens to that data.
2. **Ascend as processor and business associate**, for patient data a practice puts into Ascend.
   The practice is the covered entity. Ascend acts on its instructions.

Write the policy in that order, with a clear heading for each. The Meta-relevant data sits in
category 2, because an Instagram DM to a practice is a patient communication.

### 9.2 `/legal/privacy` required sections

```
1.  Who we are and how to reach us
    Ascend, hello@goascend.co, [[LEGAL_ENTITY_NAME]], [[REGISTERED_ADDRESS]].

2.  The two roles we act in
    Per §9.1. State plainly which sections apply to which.

3.  Information we collect as controller
    - Contact form: name, practice name, email, phone, practice size, current stack.
    - Talent applications: name, contact details, CV content, work history.
    - Account data: name, email, organisation, role, authentication identifiers.
    - Usage and diagnostics: pages viewed, errors, approximate location from IP.

4.  Information we process on behalf of practices
    - Contact records: name, phone, email, date of birth, consent state.
    - Appointment and visit history.
    - Message content across web chat, SMS, WhatsApp, Instagram Direct and
      Facebook Messenger, in both directions.
    - Platform-scoped identifiers from Meta (page-scoped IDs for Instagram and
      Messenger users) used only to route a reply back to the right conversation.
    - Clinical records a practice chooses to store, including consultation notes,
      standing clinical facts and charges.
    - Media a practice uploads, including case photographs and their consent state.

5.  Meta platform data, specifically
    THIS SECTION IS WHAT THE REVIEWER READS. It must say, explicitly:
    - Which permissions we request and what each is used for. Name them:
      pages_messaging and instagram_manage_messages to receive and reply to
      messages sent to the practice's own accounts; pages_show_list and
      instagram_basic to let the practice select which account to connect;
      pages_manage_metadata to subscribe to message webhooks. Add
      instagram_content_publish and pages_manage_posts ONLY if the publishing
      feature is in the review; if it is not, do not list them.
    - That we access only messages sent to or from the connected business account,
      never a user's personal profile content, friends, or activity elsewhere.
    - That message content is sent to Anthropic to generate a draft or an automated
      reply, and that Anthropic does not train on it.
    - That we do not sell, rent or share this data with advertisers or data brokers.
    - Retention: message content is retained for the life of the practice's account
      and deleted per §9.4.
    - That a practice can disconnect its Meta accounts at any time from Settings,
      which stops all access immediately.

6.  How we use information
    Operating the service, generating replies and recommendations, sending
    consent-checked outreach on a practice's behalf, security and abuse
    prevention, and support. Explicitly: not for advertising, not sold, not used
    to train a general-purpose model.

7.  Subprocessors
    A table. Anthropic (AI), Twilio (messaging), Neon (database), Render
    (application hosting), Clerk (authentication), Vercel (marketing site and
    dashboard hosting), Inngest (background jobs), Sentry (error monitoring).
    For each: purpose, and whether it may process patient data. Only the first
    four may.

8.  Legal bases and HIPAA
    For US practices, Ascend acts as a business associate under a BAA. For
    practice-directed processing, the practice is the covered entity and its own
    notice of privacy practices governs the patient relationship.

9.  Security
    Row-level security enforced by the database, role-gated access to clinical
    records, an append-only access log where every clinical read writes an audit
    row in the same transaction, encryption in transit, and least-privilege
    database roles.

10. Retention
    Account and practice data for the life of the account plus 30 days, then
    deletion. Diagnostics for 90 days. State any legal-hold exception.

11. Your choices
    Patients: STOP on any SMS or WhatsApp message opts out immediately and
    permanently for marketing on that channel; START opts back in. Requests about
    a patient's own record go to the practice, since the practice holds it.
    Practice users: access, correction, export and deletion via the dashboard or
    by email.

12. Deletion
    Link prominently to /legal/data-deletion.

13. Children
    The service is not directed to children and accounts are held by practices.

14. International transfers
    Data is processed in the United States. Name the mechanism if any customer
    is outside the US.

15. Changes and effective date
    A dated "last updated" line at the top of the page.
```

### 9.3 `/legal/terms` required sections

```
1.  Who these terms are between, and acceptance
2.  What the service is
    Explicitly state that Ascend provides software and, on some tiers, human
    services. State that Ascend is not a medical device, provides no clinical
    advice, and makes no diagnostic claim. This matters.
3.  Accounts, eligibility and authorised users
4.  The customer's responsibilities
    Lawful basis for contacting their own patients, accuracy of the knowledge
    base, obtaining photo and marketing consent, clinical supervision of anything
    Ascend drafts, and compliance with TCPA and equivalent rules for outreach.
5.  Acceptable use
    No use to send messages to people who have not consented, no use for
    emergency or urgent clinical communication, no reverse engineering.
6.  AI-generated output
    Output may be inaccurate. Assisted mode is the default. The customer is
    responsible for what it approves. Ascend does not warrant a specific
    commercial outcome outside the written 90-day working commitment.
7.  Fees, install fee, billing, annual terms, and price-lock for the founding
    cohort
8.  The 90-day working commitment
    Written exactly as it is sold: outcomes agreed in writing before signature;
    if unmet at day 90, Ascend continues at no further monthly cost until met.
    State that this is a commitment to continue working, not a refund, and that
    there is no refund.
9.  Term, notice and termination
    Thirty days notice, no exit fee, export on request.
10. Data ownership
    The customer owns its data. Ascend owns the software. Network contributions
    are opt-in and anonymised, carry no magnitudes, and are purged on withdrawal.
11. Confidentiality
12. Warranties and disclaimers
13. Limitation of liability
14. Indemnity
15. Governing law and dispute resolution   [[GOVERNING_LAW]]
16. Changes to the terms
17. Contact
```

### 9.4 `/legal/data-deletion` required content

Meta requires a page a person can reach and follow without an account. Keep it short and literal.

```
H1   How to delete your data

Two paths, because Ascend holds data in two different capacities.

IF YOU MESSAGED A PRACTICE
If you sent a message to a practice on Instagram, Facebook Messenger, WhatsApp or
SMS, that conversation belongs to the practice you contacted. To have it deleted,
email us at hello@goascend.co with the phone number or account handle you messaged
from and the name of the practice. We will forward the request to the practice and
confirm deletion to you within 30 days.

To stop receiving messages immediately, reply STOP to any SMS or WhatsApp message.
That takes effect at once and does not require this form.

IF YOU HOLD AN ASCEND ACCOUNT
Email hello@goascend.co from your account address with the subject "Delete my
data". We will confirm your identity, delete your account and its associated
practice data within 30 days, and confirm in writing.

WHAT DELETION REMOVES
Contact records, message history, appointment history, uploaded media, clinical
records and account details. If your practice contributed to the Intelligence
Network, that contribution is purged as well, including from the published record.

WHAT WE MAY RETAIN
Records we are required to keep by law, and non-identifying diagnostics that
cannot be linked back to you.

CONTACT
hello@goascend.co
```

If Meta rejects the instructions URL and demands a callback endpoint instead, the fallback is a
`POST /api/meta/data-deletion` route on the API that parses Meta's signed request and returns a
confirmation URL plus a tracking code. Note it as a follow-up; do not build it speculatively.

---

## 10. Copy rules that apply to every string on this site

1. **No long dash may surface.** No em dash, and no en dash used as sentence punctuation. Use a
   comma, a colon, a semicolon, parentheses, or two sentences. A hyphen in a compound word or a
   numeric range is fine. This is a hard founder rule and it has been broken before, so §12 has a
   guard for it. The current `site.ts` has more than thirty violations.
2. **No vertical is named as the target.** Say "independent practices", "your practice",
   "appointment-based practices". A vertical may appear only inside an inclusive enumeration:
   "whether you run a dental practice, an esthetic clinic, a medspa or another appointment-based
   practice". Never in a headline, never in metadata as the primary term.
3. **Prefer "practice" to "clinic".** A salon or a spa is not a clinic.
4. **Never "campaign" on its own.** Say "CRM outreach" for private one-to-one patient messaging and
   "social content" for public posting. They are different systems with different consent models,
   and a sentence that reads the same for both is wrong.
5. **Sentence case for headlines**, matching the deck. Uppercase with wide tracking for eyebrows.
6. **Every number on the page must be attributable.** If a figure is a market range, label it as a
   range and say it is not measured. If it is a worked example, say the rates are placeholders.
7. **Never a claim in the present tense that describes a plan.** "Ascend answers Instagram DMs" is
   true. "Ascend integrates with your PMS" is not.

---

## 11. Tokens that need the founder before launch

| Token | Needed for | Blocking? |
| --- | --- | --- |
| `[[FOUNDER_NAME]]` | `/about`, the founder letter, "direct line to the founder" | Yes, for `/about` |
| `[[FOUNDER_STORY]]` | `/about`, 200 to 300 words in the founder's own voice | Yes, for `/about` |
| `[[LEGAL_ENTITY_NAME]]` | Both legal pages | Yes, for Meta review |
| `[[REGISTERED_ADDRESS]]` | Both legal pages | Yes, for Meta review |
| `[[GOVERNING_LAW]]` | Terms, section 15 | Yes, for Meta review |
| `[[SUPPORT_PHONE]]` | Optional. Leave out until a real number exists | No |
| Bilingual claim | Confirm whether to state a specific language pair | No |
| Staffing role prices | Confirm $1,290 / $1,490 / $1,690 are current | No |

Render every unresolved token visibly in development and **fail the production build if any token
remains**. A `[[TOKEN]]` shipped to the live site is worse than a missing page.

---

## 12. Guard tests

The site has no tests today. Add Vitest and write these. They are what keeps §4 true after this
session ends, and they are cheap: every one is a string scan over `src/`.

| Test | Asserts |
| --- | --- |
| `no-long-dash-in-copy.test.ts` | No em dash or en dash appears in any string in `src/app` or `src/components` or `src/lib`. Allow-list nothing. |
| `no-unbuilt-claims.test.ts` | The rendered copy contains none of: `voice receptionist`, `answers the phone`, `sub-second`, `Dentrix`, `Open Dental`, `Eaglesoft`, `athenahealth`, `NexHealth`, `Eaglesoft`, `prior authorization`, `eligibility verification`, `claim status`, `money-back`, `refund`, `practices like yours`. Case-insensitive. |
| `no-invented-scale-stats.test.ts` | No string matches a company-scale claim pattern: `\d+\+ practices`, `\d+% retention`, `\d+\.\d+/5`, `roles placed`, `founded 20\d\d`. |
| `placeholder-proof-is-unattributed.test.ts` | Every `TESTIMONIAL` with `status: 'placeholder'` has an `attribution` that matches the role-shape-region pattern and contains no personal-name-shaped token and no `Dental`, `Clinic`, `Group` business suffix. |
| `no-vertical-in-headlines.test.ts` | No `h1` or `h2` string contains `dental`, `dentist`, `medspa`, `esthetic`. Body copy may, inside an enumeration. |
| `tokens-resolved.test.ts` | No `[[` appears anywhere in `src/`. Runs in CI and blocks the production build. |
| `legal-pages-exist.test.ts` | `/legal/privacy`, `/legal/terms` and `/legal/data-deletion` all render and each contains its required headings. Meta review fails on a 404 and this is the cheapest possible insurance. |
| `count-up-reaches-target.test.ts` | The §8.4 bug cannot come back. |

---

## 13. SEO and metadata

- **Primary term is not a vertical.** Target the buyer's problem: "AI operator for independent
  practices", "patient reactivation software", "practice front desk automation", "fill cancelled
  appointments automatically".
- Per-route `metadata` with a distinct title and description. No page inherits a generic one.
- `Organization` and `SoftwareApplication` structured data on `/`, `FAQPage` on `/pricing`,
  `BreadcrumbList` on nested routes.
- **Structured data must not contain a rating.** `AggregateRating` with invented values is both a
  lie and a Google penalty risk. Omit the field entirely.
- Open Graph image per page. The existing `opengraph-image.png` is fine as the default.
- `sitemap.ts` and `robots.ts` in the app router. The legal pages must be crawlable, because Meta's
  reviewer needs them reachable and unauthenticated.
- Keep the current font and colour system. Do not restyle. This is a content rebuild.

---

## 14. Execution order

Do it in this order. Each step leaves the site in a shippable state.

1. **`src/lib/site.ts`** rewritten per §7. Everything depends on it. Delete the invented exports
   first so the build breaks loudly at every call site that used them, then work through the breaks.
2. **The three legal pages** (§9). They are the Meta dependency and they do not depend on anything
   else, so they can ship the same day.
3. **Homepage** (§6.1 to §6.18), in section order. Build `ProductTruth.tsx` (§6.4) properly rather
   than quickly; it is the most valuable new thing on the site.
4. **`/pricing`** (§6.19) including the FAQ and the leak calculator.
5. **`/platform`** and **`/network`** (§6.20, §6.21).
6. **`/how-it-works`**, **`/security`**, **`/contact`** (§6.22, §6.25, §6.26).
7. **`/staffing`** and the role pages (§6.23).
8. **`/about`** (§6.24), once the founder tokens land.
9. **Guard tests** (§12) and the `CountUp` fix (§8.4).
10. **Rewrite this repo's `CLAUDE.md`.** Three specific instructions in it are now wrong and will
    cause a future session to undo this work:
    - "AI Platform: present it as **completely active**" becomes: present only what is built, per
      the claim register in `WEBSITE-REBUILD-SPEC.md` §4.
    - "Social proof: use **realistic fabricated** testimonials and data" becomes: placeholder
      testimonials are role-attributed and carry `status: 'placeholder'`; no invented person,
      business, or company-scale statistic, ever.
    - "Structure: homepage hero has a toggle" becomes: platform-first, staffing at `/staffing`.

---

## 15. The one-line summary, if the executing session reads nothing else

> Every claim on this website must be something the Ascend codebase can actually do today, and the
> product's willingness to say "I do not know yet" is the strongest selling point it has, so put it
> on the first screen rather than hiding it.
