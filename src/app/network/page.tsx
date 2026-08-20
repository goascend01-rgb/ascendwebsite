import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { PatternTravel } from "@/components/product/PatternTravel";
import { ConfidenceRail } from "@/components/product/ConfidenceRail";
import { PrivacyContract } from "@/components/home/PrivacyContract";
import { CtaSection } from "@/components/home/CtaSection";
import { NETWORK } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Intelligence Network",
  description:
    "Anonymised cross-practice learning that carries principles and cannot carry magnitudes. Nothing publishes below three independent practices and thirty observations, participation is opt in, and withdrawal purges the contribution.",
  alternates: { canonical: "/network" },
};

const TIERS = [
  {
    name: "Emerging",
    score: NETWORK.confidence.emerging,
    body: "A pattern that has cleared the publication floor and is worth telling you about, labelled as early rather than dressed up as settled.",
  },
  {
    name: "Established",
    score: NETWORK.confidence.established,
    body: "Enough independent evidence that Ascend will act on it in a recommendation, with the reasoning attached.",
  },
  {
    name: "Proven",
    score: NETWORK.confidence.proven,
    body: "Held across the network over time and validated against what it predicted would move.",
  },
];

const CANNOT_DO_YET = [
  `A pattern needs ${NETWORK.minIndependentPractices} independent practices and ${NETWORK.minObservations} observations before it publishes. Below that it is held, and you are not shown a thin signal wearing confident language.`,
  "Everything Ascend does from your own data works on day one and does not wait for anybody else. Reactivation, slot fill, the receptionist, the queue, the brief: all of it runs on your rows.",
  "The network is the part that compounds. In month one it will have little to add. In month twelve, with a cohort behind it, it is the reason Ascend knows something your last vendor could not.",
  "We would rather tell you that now than have you discover it in week three.",
];

function Breadcrumbs() {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Network", item: "/network" },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function NetworkPage() {
  return (
    <>
      <Breadcrumbs />

      <PageHero
        label="// The part nobody else has"
        title={
          <>
            Every practice on Ascend makes every other practice better.{" "}
            <span className="text-fg-muted">
              None of them ever sees another&apos;s numbers.
            </span>
          </>
        }
        lead="This is the whole argument. Everything else, a determined competitor could copy in a year. This they cannot, because it is not a feature. It is what happens when a network of practices contributes evidence to a system built from the first day to keep every practice's numbers inside its own walls."
      />

      {/* how a pattern travels */}
      <section className="border-t border-border-soft py-20 md:py-24">
        <div className="shell">
          <SectionHeader
            label="// How a pattern travels between practices"
            title={
              <>
                The network supplies the principle.{" "}
                <span className="text-fg-muted">
                  Your practice supplies every number.
                </span>
              </>
            }
          />
          <div className="mt-16">
            <PatternTravel />
          </div>
        </div>
      </section>

      {/* confidence tiers */}
      <section className="py-20 md:py-24">
        <div className="shell">
          <SectionHeader
            label="// Confidence is a number, not an adjective"
            title={<>Three tiers, and Ascend tells you which one it is on.</>}
          />

          <RevealGroup className="mt-14 grid gap-5 md:grid-cols-3">
            {TIERS.map((tier) => (
              <RevealItem key={tier.name} className="h-full">
                <article className="flex h-full gap-5 rounded-lg border border-border-line bg-surface-1 p-7">
                  <ConfidenceRail
                    confidence={tier.score / 100}
                    label={`${tier.name}, ${tier.score}`}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-[1.1rem] font-medium text-fg">
                        {tier.name}
                      </h3>
                      <span className="font-mono text-[0.8rem] tabular-nums text-accent">
                        {tier.score}
                      </span>
                    </div>
                    <p className="mt-3.5 text-[0.9rem] leading-[1.7] font-light text-fg-secondary">
                      {tier.body}
                    </p>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <PrivacyContract />

      {/* the honest state, which no competitor would write */}
      <section className="border-t border-border-soft py-24 md:py-28">
        <div className="shell">
          <SectionHeader
            label="// What the network cannot do yet"
            title={<>The honest state of it.</>}
            lead="A network needs practices before it has anything to say, and the founding cohort is how that starts. Here is where it genuinely stands."
          />

          <RevealGroup className="mt-14 max-w-[70ch] space-y-6">
            {CANNOT_DO_YET.map((para, i) => (
              <RevealItem key={para}>
                <p
                  className={`text-[1rem] leading-[1.75] font-light ${
                    i === CANNOT_DO_YET.length - 1
                      ? "border-t border-border-line pt-6 text-fg"
                      : "text-fg-secondary"
                  }`}
                >
                  {para}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1}>
            <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border-line bg-border-soft sm:grid-cols-2">
              <div className="bg-surface-1 px-6 py-7">
                <p className="display text-[2.6rem] leading-none text-accent">
                  {NETWORK.minIndependentPractices}
                </p>
                <p className="mt-3 font-mono text-[0.66rem] tracking-[0.14em] text-fg-tertiary uppercase">
                  Independent practices, minimum
                </p>
              </div>
              <div className="bg-surface-1 px-6 py-7">
                <p className="display text-[2.6rem] leading-none text-accent">
                  {NETWORK.minObservations}
                </p>
                <p className="mt-3 font-mono text-[0.66rem] tracking-[0.14em] text-fg-tertiary uppercase">
                  Separate observations, minimum
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-[62ch] text-[0.88rem] leading-[1.7] font-light text-fg-tertiary">
              Both are policy constants in the platform rather than editorial
              judgement, which means nobody can decide to publish something early
              because it would look good.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
