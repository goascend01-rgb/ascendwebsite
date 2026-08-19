# Ascend

Marketing website for **Ascend** — remote healthcare staffing and AI practice
automation for dental & medical clinics.

Two offerings under one brand:

- **Staffing** — pre-trained, bilingual remote talent (reception, billing,
  insurance, coding, scribes).
- **AI Platform** — voice receptionist, chat, automated booking, growth CRM,
  reviews, and back-office agents.

## Stack

- [Next.js](https://nextjs.org) (App Router) + React + TypeScript
- Tailwind CSS v4
- [Motion](https://motion.dev) for animation

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Project structure

```
src/
  app/           routes (home, platform, about, pricing, how-it-works,
                 contact, apply, roles/[slug]) + layout, globals.css
  components/    ui/ · layout/ · home/ · platform/ · pricing/ · forms/
  lib/site.ts    single source of truth for site content & data
public/brand/    logo + wordmark assets
```

## Note

Testimonials, metrics, and pricing shown on the site are representative
placeholder content and not real client data.
