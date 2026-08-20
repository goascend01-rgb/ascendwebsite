import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { TrustLadder } from "@/components/home/TrustLadder";
import { CtaSection } from "@/components/home/CtaSection";
import { DOMAINS } from "@/lib/site";

export const metadata: Metadata = {
  title: "The platform",
  description:
    "Six things Ascend does every day: front desk across chat, SMS, WhatsApp, Instagram and Messenger, slot fill, patient reactivation, reputation, content and one ranked queue. Each described exactly as it works, including where it stops.",
  alternates: { canonical: "/platform" },
};

function Breadcrumbs() {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Platform", item: "/platform" },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function PlatformPage() {
  return (
    <>
      <Breadcrumbs />

      <PageHero
        label="// The platform"
        title={<>An operator, not an inbox.</>}
        lead="Six things Ascend does every day. Each one is described here exactly as it works, including where it stops."
      >
        {/* jump index: six is enough to need one */}
        <nav aria-label="The six domains">
          <ul className="flex flex-wrap gap-2">
            {DOMAINS.map((d, i) => (
              <li key={d.id}>
                <a
                  href={`#${d.id}`}
                  className="inline-flex items-center gap-2.5 rounded-sm border border-border-line px-3.5 py-2 font-mono text-[0.66rem] tracking-[0.14em] text-fg-secondary uppercase transition-colors duration-300 hover:border-accent hover:text-accent"
                >
                  <span className="text-fg-muted tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {d.eyebrow}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <div className="shell">
        {DOMAINS.map((domain, i) => (
          <section
            key={domain.id}
            id={domain.id}
            className="scroll-mt-[100px] border-t border-border-line py-16 md:py-20"
          >
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-16">
              <div className="lg:sticky lg:top-[110px] lg:self-start">
                <Reveal>
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[0.72rem] tabular-nums text-fg-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[0.68rem] tracking-[0.2em] text-accent uppercase">
                      {domain.eyebrow}
                    </span>
                  </div>
                  <h2 className="display mt-5 text-[clamp(1.6rem,3.4vw,2.4rem)] text-fg">
                    {domain.name}
                  </h2>
                </Reveal>
              </div>

              <div>
                <Reveal delay={0.08}>
                  <p className="text-[1.02rem] leading-[1.7] font-light text-fg">
                    {domain.summary}
                  </p>
                </Reveal>

                <div className="mt-8 space-y-5">
                  {domain.detail.map((para, j) => (
                    <Reveal key={para} delay={0.12 + j * 0.05}>
                      <p className="max-w-[62ch] text-[0.95rem] leading-[1.72] font-light text-fg-secondary">
                        {para}
                      </p>
                    </Reveal>
                  ))}
                </div>

                {/* The honest edge, six times. No competitor's site carries
                    this block, which is exactly why it is here. */}
                <Reveal delay={0.2}>
                  <div className="mt-10 flex flex-col gap-4 rounded-lg border border-border-line bg-surface-1 p-6 sm:flex-row sm:gap-6">
                    <span className="w-fit shrink-0 rounded-sm border border-border-strong px-2.5 py-1 font-mono text-[0.58rem] tracking-[0.18em] text-fg-muted uppercase">
                      Where it stops
                    </span>
                    <p className="max-w-[54ch] text-[0.92rem] leading-[1.7] font-light text-fg-secondary">
                      {domain.stops}
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
        ))}
      </div>

      <TrustLadder />
      <CtaSection />
    </>
  );
}
