import type { Metadata } from "next";
import { pageMetadata, breadcrumbLd } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { TrustLadder } from "@/components/home/TrustLadder";
import { CtaSection } from "@/components/home/CtaSection";
import { CreativeStudio } from "@/components/platform/CreativeStudio";
import { Acquisition } from "@/components/platform/Acquisition";
import { PracticeRecords } from "@/components/platform/PracticeRecords";
import { Briefings } from "@/components/platform/Briefings";
import { ModuleInventory } from "@/components/platform/ModuleInventory";
import { WhereItStops } from "@/components/platform/WhereItStops";
import { DOMAINS } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "The platform",
  description:
    "Everything Ascend runs: the front desk across five channels, slot fill, patient reactivation, reputation, Creative Studio, acquisition economics, the clinical record, and the briefings that tell you what matters. Each described exactly as it works, including where it stops.",
  path: "/platform",
});

/* The jump index covers the deep sections as well as the six domains,
   because this page is now long enough that a buyer arriving for one
   specific thing should not have to scroll past five others to find it. */
const EXTRA_SECTIONS = [
  { id: "creative-studio", label: "Creative Studio" },
  { id: "acquisition", label: "Acquisition" },
  { id: "records", label: "The record" },
  { id: "briefings", label: "What it tells you" },
  { id: "everything", label: "Everything" },
];

function Breadcrumbs() {
  const data = breadcrumbLd([{ name: "Home", path: "/" }, { name: "Platform", path: "/platform" }]);
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
        lead="Six things Ascend does every day, and then the four that most people do not find out about until they are already running it. Each one is described here exactly as it works, including where it stops."
      >
        <nav aria-label="Sections of this page">
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
            {EXTRA_SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="inline-flex items-center rounded-sm border border-accent/30 bg-accent-dim px-3.5 py-2 font-mono text-[0.66rem] tracking-[0.14em] text-accent uppercase transition-colors duration-300 hover:border-accent"
                >
                  {s.label}
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
                  <p className="text-[1.05rem] leading-[1.72] font-light text-fg">
                    {domain.summary}
                  </p>
                </Reveal>

                <div className="mt-8 space-y-5">
                  {domain.detail.map((para, j) => (
                    <Reveal key={para} delay={0.12 + j * 0.05}>
                      <p className="max-w-[62ch] text-[1rem] leading-[1.74] font-light text-fg-secondary">
                        {para}
                      </p>
                    </Reveal>
                  ))}
                </div>

                <WhereItStops delay={0.2}>{domain.stops}</WhereItStops>
              </div>
            </div>
          </section>
        ))}

        {/* The four the site never mentioned, at the depth they deserve. */}
        <CreativeStudio />
        <Acquisition />
        <PracticeRecords />
        <Briefings />
        <ModuleInventory />
      </div>

      <TrustLadder />
      <CtaSection />
    </>
  );
}
