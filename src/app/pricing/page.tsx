import type { Metadata } from "next";
import { Calculator } from "@/components/pricing/Calculator";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple per-role monthly pricing for remote healthcare staff. Build your team and see your savings instantly. No upfront cost — pay only after you hire.",
};

const INCLUDED = [
  "Dedicated, pre-trained professional",
  "Full-time, matched to your hours",
  "HIPAA & GDPR compliance built in",
  "Ascend success manager + QA",
  "Free re-match if it's not a fit",
  "No setup or recruitment fees",
];

export default function PricingPage() {
  return (
    <div className="pt-36 md:pt-44">
      {/* hero */}
      <section className="shell">
        <Reveal>
          <span className="label-mono text-accent">{"// Pricing"}</span>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="display mt-5 max-w-4xl text-[clamp(2.6rem,6vw,4.6rem)] text-fg">
            One flat monthly rate{" "}
            <span className="text-fg-muted font-light">per role.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-xl text-[1.08rem] leading-relaxed text-fg-secondary font-light">
            Build your team below and watch your savings update in real time.
            Roughly half of in-house cost — with none of the hiring, benefits or
            overhead.
          </p>
        </Reveal>
      </section>

      {/* calculator */}
      <section className="shell mt-16">
        <Reveal>
          <Calculator />
        </Reveal>
      </section>

      {/* what's included */}
      <section className="shell mt-28">
        <SectionHeader
          label="// Every seat includes"
          title="No asterisks. No surprises."
        />
        <RevealGroup className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border-line bg-border-soft sm:grid-cols-2 lg:grid-cols-3">
          {INCLUDED.map((item) => (
            <RevealItem key={item}>
              <div className="flex items-center gap-3.5 bg-surface-1 px-6 py-6">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-dim font-mono text-xs text-accent">
                  ✓
                </span>
                <span className="text-fg">{item}</span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* cta */}
      <section className="shell mt-28">
        <Reveal>
          <div className="rounded-2xl border border-border-line bg-surface-1 px-8 py-20 text-center">
            <h2 className="display text-[clamp(2rem,4.5vw,3.2rem)] text-fg">
              Not sure which roles you need?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-fg-secondary font-light">
              Book a demo and we&apos;ll map your workflows to the right team —
              and the exact savings — in 20 minutes.
            </p>
            <div className="mt-8 flex justify-center">
              <ButtonLink href="/contact" variant="primary" size="lg">
                Book a demo →
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
