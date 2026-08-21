import type { Metadata } from "next";
import { pageMetadata, breadcrumbLd } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { InstallTimeline } from "@/components/product/InstallTimeline";
import { TrustLadder } from "@/components/home/TrustLadder";
import { CtaSection } from "@/components/home/CtaSection";
import { WHAT_WE_NEED } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "How it works",
  description:
    "Thirty days from signature to an operator that knows your practice, and about four hours of your time spread across the month. Then you decide, domain by domain, what it may do on its own.",
  path: "/how-it-works",
});

function Breadcrumbs() {
  const data = breadcrumbLd([{ name: "Home", path: "/" }, { name: "How it works", path: "/how-it-works" }]);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function HowItWorksPage() {
  return (
    <>
      <Breadcrumbs />

      <PageHero
        label="// The install, and what the fee buys"
        title={
          <>Thirty days from signature to an operator that knows your practice.</>
        }
        lead="Four hours of your time, spread across the month, and we do the rest."
      />

      <section className="border-t border-border-soft py-20 md:py-24">
        <div className="shell">
          <InstallTimeline headingLevel={2} />
        </div>
      </section>

      <TrustLadder />

      <section className="border-t border-border-soft py-24 md:py-28">
        <div className="shell">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
            <SectionHeader
              label="// What we need from you"
              title={<>Four hours of your time, spread over a month.</>}
            />

            <div>
              <RevealGroup className="space-y-px overflow-hidden rounded-lg border border-border-line bg-border-soft">
                {WHAT_WE_NEED.map((item) => (
                  <RevealItem key={item.index}>
                    <div className="flex gap-5 bg-surface-1 p-6 transition-colors duration-500 hover:bg-surface-2">
                      <span className="font-mono text-[0.74rem] tabular-nums tracking-[0.12em] text-accent">
                        {item.index}
                      </span>
                      <p className="text-[1rem] leading-[1.7] font-light text-fg-secondary">
                        {item.body}
                      </p>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>

              <Reveal delay={0.12}>
                <p className="mt-8 max-w-[58ch] text-[0.99rem] leading-[1.72] font-light text-fg-tertiary">
                  That is the whole implementation. There is no project, and there
                  is no new job for the person at your front desk who is already
                  busiest.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
