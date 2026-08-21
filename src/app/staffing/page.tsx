import type { Metadata } from "next";
import { pageMetadata, breadcrumbLd } from "@/lib/seo";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { usd } from "@/lib/leak";
import {
  ROLES,
  PRICE_ITEMS,
  STAFFING_PROCESS,
  STAFFING_FOOTNOTE,
  STAFFING_STATUS,
} from "@/lib/staffing";

export const metadata: Metadata = pageMetadata({
  title: "Staffing",
  description:
    "Pre-trained remote professionals for independent practices: reception, billing and insurance, coding and scribes. Deployed in days, and you pay only after you hire.",
  path: "/staffing",
});

function Breadcrumbs() {
  const data = breadcrumbLd([{ name: "Home", path: "/" }, { name: "Staffing", path: "/staffing" }]);
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
          <ButtonLink href="/staffing/contact" variant="primary" size="lg">
            Tell us what you need <span aria-hidden="true">→</span>
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
                  <p className="mt-2 text-[0.95rem] font-medium text-accent">
                    {role.tagline}
                  </p>
                  <p className="mt-4 flex-1 text-[0.95rem] leading-[1.68] font-light text-fg-secondary">
                    {role.blurb}
                  </p>

                  <div className="mt-7 border-t border-border-soft pt-5">
                    <p className="font-display text-[1.35rem] leading-none font-semibold tabular-nums text-fg">
                      {usd(role.price)}
                      <span className="ml-1.5 font-mono text-[0.66rem] font-normal tracking-[0.1em] text-fg-tertiary uppercase">
                        / month
                      </span>
                    </p>
                    <p className="mt-2.5 font-mono text-[0.64rem] tracking-[0.1em] text-fg-muted uppercase">
                      Against a typical US in-house cost of {usd(role.inHouse)}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.08em] text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                      View role
                      <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.12}>
            <p className="mt-8 max-w-[66ch] text-[0.95rem] leading-[1.72] font-light text-fg-tertiary">
              {STAFFING_FOOTNOTE}
            </p>
          </Reveal>
        </div>
      </section>


      {/* The three cards above are the roles most practices ask for first.
          The bench covers more than that, and a reader looking at three
          cards will immediately wonder whether three is the whole list. */}
      <section className="py-20 md:py-24">
        <div className="shell">
          <SectionHeader
            label="// The full rate card"
            title={<>Six roles, priced the same way.</>}
            lead="Every one is a trained remote professional working your hours, in your systems. In-house figures are typical published US market rates for the role, for comparison rather than measured."
          />

          <Reveal delay={0.1}>
            <div className="mt-14 overflow-x-auto rounded-lg border border-border-line">
              <table className="w-full min-w-[560px] border-collapse text-left">
                <thead>
                  <tr className="bg-surface-1">
                    <th className="px-6 py-4 font-mono text-[0.64rem] tracking-[0.14em] text-fg-tertiary uppercase">
                      Role
                    </th>
                    <th className="px-6 py-4 font-mono text-[0.64rem] tracking-[0.14em] text-fg-tertiary uppercase">
                      What they do
                    </th>
                    <th className="px-6 py-4 text-right font-mono text-[0.64rem] tracking-[0.14em] text-fg-tertiary uppercase">
                      Monthly
                    </th>
                    <th className="px-6 py-4 text-right font-mono text-[0.64rem] tracking-[0.14em] text-fg-tertiary uppercase">
                      Typical in-house
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {PRICE_ITEMS.map((item) => (
                    <tr
                      key={item.key}
                      className="border-t border-border-soft transition-colors duration-300 hover:bg-surface-1/60"
                    >
                      <td className="px-6 py-4 text-[0.97rem] font-medium text-fg">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 text-[0.93rem] font-light text-fg-secondary">
                        {item.desc}
                      </td>
                      <td className="px-6 py-4 text-right font-mono text-[0.95rem] tabular-nums text-accent">
                        {usd(item.price)}
                      </td>
                      <td className="px-6 py-4 text-right font-mono text-[0.9rem] tabular-nums text-fg-muted">
                        {usd(item.inHouse)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
                  <p className="mt-3 text-[0.94rem] leading-[1.68] font-light text-fg-secondary">
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
                  <span aria-hidden="true">→</span>
                </span>
              </span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
