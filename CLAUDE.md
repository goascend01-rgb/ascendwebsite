# CLAUDE.md — Ascend Website

## Always Do First
- **Read and apply the custom skills in `/skills/`** before writing any frontend/UI code, every session, no exceptions:
  - `skills/frontend-design/frontendSKILL.md` — for marketing pages (homepage, role pages, pricing, landing).
  - `skills/interface-design/interfaceSKILL.md` — for product/app UI (the AI Platform dashboard mockups, calculators, app-like components).
- These are the project's own copies of the Anthropic frontend-design / interface-design skills. They are NOT installed as harness skills — read the files directly.

---

## The Company — Ascend
Ascend has **two offerings under one brand**:

1. **Staffing (live, revenue-proven)** — Remote, pre-trained, bilingual healthcare talent for dental clinics & hospitals. Roles: receptionists / front desk, appointment handling, billing & insurance claims, medical coding, scribes. Value: cut staffing cost up to ~50%, no hiring/training hassle, deploy in days, **pay only after you hire**, HIPAA & GDPR compliant.

2. **AI Platform (in progress — presented on the site as fully live)** — Software to automate the practice: AI voice receptionist (real phone conversations), AI chatbot, automated lead management & client follow-ups, CRM + practice-management dashboard, EHR/payment integrations.

**Reference sites:** `goascend.co` (the current site we're replacing/improving), `ranea.ai` (reference for how to present the AI half — borrow the thinking, not the look).

---

## Project Decisions (locked)
- **Structure:** Single site, two sections (Staffing + AI Platform). Homepage hero has a **toggle/switcher** that swaps the entire hero + CTA between Staffing and Platform.
- **Primary audience:** Clinics hiring talent (clinic owners / practice managers). Conversion goal = **Book a Demo**. Secondary path = talent application.
- **AI Platform presentation:** Show it as **completely active** — realistic mockups, descriptions, and demos (voice receptionist in action, interactive chatbot demo, CRM/management dashboard, integration showcase).
- **Voice/tone:** Bold + visionary, but outcome-focused. Confident, challenges the status quo, always ties back to results (cost, time, revenue).
- **Social proof:** Use **realistic fabricated** testimonials & data — must look completely real (named practice managers, multi-location groups, believable metrics). Never label as fake on the site.
- **Pages at launch:** Homepage, individual role pages (reception, billing/insurance, coding/scribes), How it works, Pricing.
- **Pricing:** **Per-role monthly subscription** model with realistic example pricing + an interactive cost/savings calculator.
- **Interactive features:** Contact form, cost calculator, talent application flow.
- **Responsive:** Fully responsive, mobile-first.
- **Timeline:** MVP in 2–3 weeks. **SEO is critical** (metadata, structured data, semantic HTML, fast loads).

---

## Visual Direction — "Premium Dark" (Option A, approved)
Brand-true, aerospace/architectural, distinctly NOT generic-healthcare-blue.

- **Palette:** Near-black canvas (`#08090b`), layered dark surfaces, crisp white/off-white type, muted gray text hierarchy, **single electric-cyan accent** (`~#34e6e0`). Color must mean something — accent only for emphasis/action.
- **Typography:** Distinctive, non-generic. Geometric display sans for headlines (NOT Inter/Roboto/Arial; avoid converging on Space Grotesk). Monospace for telemetry-style labels/eyebrows (`// section`, `01/02/03`). Echo the wordmark's wide letter-spacing on uppercase labels.
- **Depth:** Borders-first (low-opacity rgba hairlines), subtle surface-lightness shifts for elevation, whisper-quiet — never harsh lines or dramatic shadows.
- **Atmosphere:** Faint grid, radial glow, subtle grain/noise. Gradient mesh sparingly.
- **Motion (BOLD — motion is a design feature):** Orchestrated staggered page-load reveals, scroll-triggered animations, parallax, surprising hover states, animated backgrounds. Use **Framer Motion**. Only animate `transform`/`opacity`; never `transition-all`.

---

## Tech Stack
- **Next.js (App Router) + React + TypeScript**
- **Tailwind CSS** (utility layer) + CSS custom properties for the design tokens
- **Framer Motion** for animation
- `src/` directory, import alias `@/*`
- Fonts via `next/font` (Google) — pick distinctive families per the design direction.

## Dev Commands
- Install: `npm install`
- Dev server: `npm run dev` (http://localhost:3000)
- Build: `npm run build` / Start: `npm start`
- Lint: `npm run lint`

## Brand Assets
- Logo + wordmark live in `brand guidelines/` (`ascend icon.png`, `ascendwordmark.png`). Use them — do not invent brand marks. An inline SVG approximation of the icon is acceptable where a crisp scalable mark is needed; match the real mark's geometry.

---

## Anti-Generic Guardrails (keep — they reinforce the skills)
- **Colors:** Never use default Tailwind palette names as brand color (no `indigo-500`/`blue-600`). Derive everything from the tokens above.
- **Shadows:** No flat `shadow-md`. On dark, lean on borders + surface-lightness for depth; shadows subtle and color-tinted only.
- **Typography:** Different families for display vs body. Tight tracking on large headings (`~-0.02em`), comfortable line-height on body (`~1.6`).
- **Animations:** Animate only `transform`/`opacity`. Never `transition-all`. Deceleration/spring easing.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states. Data needs loading/empty/error states.
- **Spacing:** Pick a base unit and use multiples. No random values.
- **Depth:** Surfaces follow a layering system (base → elevated → floating), not one flat z-plane.

## Hard Rules
- Apply the `/skills/` guidance before coding UI.
- Don't converge on generic AI aesthetics or repeat identical layouts/components.
- Don't use `transition-all` or default Tailwind blue/indigo as the brand color.
- Keep the AI Platform presented as live; keep fabricated proof realistic and unlabeled.
