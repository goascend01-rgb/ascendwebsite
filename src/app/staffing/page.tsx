import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { money } from "@/lib/leak";
import {
  ROLES,
  STAFFING_PROCESS,
  STAFFING_FOOTNOTE,
  STAFFING_STATUS,
} from "@/lib/staffing";

export const metadata: Metadata = {
  title: "Ascend Staffing",
  description:
    "Pre-trained remote professionals for independent practices: reception, billing and insurance, coding and scribes. Deployed in days, and you pay only after you hire.",
  alternates: { canonical: "/staffing" },
};

function Breadcrumbs() {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Staffing", item: "/staffing" },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function StaffingPage() {
  return (
    <>
      <Breadcrumbs />

      <PageHero
        label="// Ascend Staffing"
        title={
          <>
            The seats you cannot fill, handled by people you did not have to
            train.
          </>
        }
        lead="Pre-trained remote professionals for independent practices. Reception, billing and insurance, coding and scribes. Deployed in days, and you pay only after you hire."
      >
        <div className="flex flex-wrap gap-4">
          <ButtonLink href="/contact" variant="primary" size="lg">
            Tell us what you need →
          </ButtonLink>
          <ButtonLink href="#roles" variant="ghost" size="lg">
            Browse roles
          </ButtonLink>
        </div>
      </PageHero>

      {/* ------------------------------- roles ------------------------------- */}
      <section id="roles" className="scroll-mt-24 border-t border-border-soft py-20 md:py-24">
        <div className="shell">
          <RevealGroup className="grid gap-5 md:grid-cols-3">
            {ROLES.map((role) => (
              <RevealItem key={role.slug} className="h-full">
                <Link
                  href={`/staffing/roles/${role.slug}`}
                  className="group flex h-full flex-col rounded-lg border border-border-line bg-surface-1 p-7 transition-colors duration-500 hover:border-border-strong hover:bg-surface-2"
                >
                  <span className="font-mono text-[0.7rem] tracking-[0.16em] text-fg-muted">
                    {role.index}
                  </span>

                  <h2 className="mt-6 font-display text-[1.2rem] leading-snug font-medium text-fg">
                    {role.name}
                  </h2>
                  <p className="mt-2 text-[0.9rem] font-medium text-accent">
                    {role.tagline}
                  </p>
                  <p className="mt-4 flex-1 text-[0.9rem] leading-[1.68] font-light text-fg-secondary">
                    {role.blurb}
                  </p>

                  <div className="mt-7 border-t border-border-soft pt-5">
                    <p className="font-display text-[1.35rem] leading-none font-semibold tabular-nums text-fg">
                      {money(role.price)}
                      <span className="ml-1.5 font-mono text-[0.66rem] font-normal tracking-[0.1em] text-fg-tertiary uppercase">
                        / month
                      </span>
                    </p>
                    <p className="mt-2.5 font-mono text-[0.64rem] tracking-[0.1em] text-fg-muted uppercase">
                      Against a typical US in-house cost of {money(role.inHouse)}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.08em] text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      View role
                      <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.12}>
            <p className="mt-8 max-w-[66ch] text-[0.9rem] leading-[1.72] font-light text-fg-tertiary">
              {STAFFING_FOOTNOTE}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------ process ------------------------------ */}
      <section className="py-20 md:py-24">
        <div className="shell">
          <SectionHeader
            label="// How it works"
            title={<>Hired and working in a week, not a quarter.</>}
          />

          <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border-line bg-border-soft md:grid-cols-4">
            {STAFFING_PROCESS.map((step) => (
              <RevealItem key={step.day} className="h-full">
                <div className="flex h-full flex-col bg-surface-1 p-6">
                  <span className="font-mono text-[0.66rem] tracking-[0.16em] text-accent uppercase">
                    {step.day}
                  </span>
                  <h3 className="mt-5 font-display text-[1.02rem] leading-snug font-medium text-fg">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[0.89rem] leading-[1.68] font-light text-fg-secondary">
                    {step.desc}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ------------------------------ honesty ------------------------------ */}
      <section className="border-t border-border-soft py-20 md:py-24">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
            <SectionHeader
              label={`// ${STAFFING_STATUS.eyebrow}`}
              title={<>{STAFFING_STATUS.title}</>}
            />
            <Reveal delay={0.1}>
              <div className="space-y-5 rounded-lg border border-border-line bg-surface-1 p-7 md:p-8">
                {STAFFING_STATUS.body.map((para, i) => (
                  <p
                    key={para}
                    className={`text-[0.97rem] leading-[1.72] font-light ${
                      i === STAFFING_STATUS.body.length - 1
                        ? "border-t border-border-soft pt-5 text-fg"
                        : "text-fg-secondary"
                    }`}
                  >
                    {para}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ----------------------------- cross-link ----------------------------- */}
      <section className="pb-24 md:pb-28">
        <div className="shell">
          <Reveal>
            <Link
              href="/platform"
              className="group flex flex-col gap-6 rounded-lg border border-border-line bg-bg p-7 transition-colors duration-500 hover:border-border-strong hover:bg-surface-1 md:flex-row md:items-center md:gap-10 md:p-9"
            >
              <p className="min-w-0 flex-1 text-[0.97rem] leading-[1.72] font-light text-fg-secondary">
                The same practices asking us for a receptionist usually have a
                second problem: the follow-ups nobody has hands for. That is what
                Ascend Operator does.
              </p>
              <span className="inline-flex shrink-0 items-center gap-3 font-mono text-[0.76rem] tracking-[0.08em] text-accent transition-colors duration-300 group-hover:text-accent-bright">
                See the platform
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
