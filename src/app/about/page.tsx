import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Token, TokenText } from "@/components/ui/Token";
import { FoundingCohort } from "@/components/home/FoundingCohort";
import { CtaSection } from "@/components/home/CtaSection";
import { PRINCIPLES } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ascend is founder-led and honest about its stage. The principles here are not marketing copy: each one is a rule the software actually enforces, including the one that says we do not sell what we have not built.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="// About"
        title={
          <>Built by one person who got tired of watching good practices lose money quietly.</>
        }
      />

      {/* the founder's own words */}
      <section className="pb-20 md:pb-24">
        <div className="shell">
          <Reveal>
            <div className="max-w-[64ch] rounded-lg border border-border-line bg-surface-1 p-7 md:p-10">
              <Token
                id="FOUNDER_STORY"
                as="div"
                className="text-[1.02rem] leading-[1.75] font-light text-fg-secondary"
              />
              <p className="mt-8 border-t border-border-soft pt-6 font-mono text-[0.68rem] tracking-[0.16em] text-fg-tertiary uppercase">
                <TokenText id="FOUNDER_NAME" />, founder
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* principles */}
      <section className="border-t border-border-soft py-20 md:py-24">
        <div className="shell">
          <SectionHeader
            label="// Principles"
            title={<>Five rules the software actually enforces.</>}
            lead="These are not values written for a website. Each one is a constraint in the codebase, which is why they are worth reading."
          />

          <RevealGroup className="mt-14 border-t border-border-line">
            {PRINCIPLES.map((principle) => (
              <RevealItem key={principle.index}>
                <article className="group grid gap-4 border-b border-border-line py-8 transition-colors duration-500 hover:bg-surface-1/50 md:grid-cols-[4.5rem_minmax(0,1fr)_minmax(0,1.35fr)] md:items-baseline md:gap-8 md:px-4">
                  <span className="font-mono text-[0.78rem] tabular-nums tracking-[0.14em] text-fg-tertiary transition-colors duration-500 group-hover:text-accent">
                    {principle.index}
                  </span>
                  <h3 className="font-display text-[1.08rem] leading-snug font-medium text-fg">
                    {principle.title}
                  </h3>
                  <p className="max-w-[52ch] text-[0.93rem] leading-[1.7] font-light text-fg-secondary">
                    {principle.body}
                  </p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <FoundingCohort />
      <CtaSection />
    </>
  );
}
