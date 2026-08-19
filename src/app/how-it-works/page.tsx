import type { Metadata } from "next";
import { PROCESS } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "From a 20-minute call to a deployed, pre-trained team member in five days. Zero upfront cost — you pay only after you hire.",
};

const DIFF = [
  {
    title: "Pre-trained, not just pre-screened",
    desc: "Every professional is healthcare-trained and tested on real workflows before they ever reach your shortlist.",
  },
  {
    title: "Pay only after you hire",
    desc: "No retainers, no recruitment fees up front. If the match isn't right, we re-match — you owe nothing until someone starts.",
  },
  {
    title: "Backed by a success team",
    desc: "Every placement comes with an Ascend success manager and QA layer monitoring quality, attendance and output.",
  },
  {
    title: "Drop-in, day one",
    desc: "Most talent already knows Dentrix, Open Dental, Epic and athenahealth — so there's no software ramp.",
  },
];

const FAQ = [
  {
    q: "How fast can someone start?",
    a: "Most roles are deployed within five business days of your first call — interview, approve, and integrate.",
  },
  {
    q: "What if the person isn't a fit?",
    a: "We re-match at no cost. You're never locked into a placement, and you don't pay until someone you approve starts.",
  },
  {
    q: "Are they HIPAA compliant?",
    a: "Yes. All talent is HIPAA and GDPR trained, works on secured systems, and operates under signed BAAs.",
  },
  {
    q: "Do they work in my time zone?",
    a: "Talent is matched to your operating hours, including full US time-zone coverage and after-hours options.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="pt-36 md:pt-44">
      {/* hero */}
      <section className="shell">
        <Reveal>
          <span className="label-mono text-accent">{"// How it works"}</span>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="display mt-5 max-w-4xl text-[clamp(2.6rem,6vw,4.6rem)] text-fg">
            From call to deployed{" "}
            <span className="text-fg-muted font-light">in</span>{" "}
            <span className="text-accent glow-accent">five days.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-xl text-[1.08rem] leading-relaxed text-fg-secondary font-light">
            No job posts. No screening marathon. No training overhead. We do the
            hard part and hand you someone ready to work.
          </p>
        </Reveal>
      </section>

      {/* timeline */}
      <section className="shell mt-24">
        <div className="overflow-hidden rounded-xl border border-border-line">
          {PROCESS.map((step, i) => (
            <Reveal key={step.index} delay={i * 0.06}>
              <div
                className={`grid gap-6 bg-surface-1 p-8 md:grid-cols-[100px_1fr_140px] md:items-center md:p-10 ${
                  i !== 0 ? "border-t border-border-soft" : ""
                }`}
              >
                <span className="font-display text-5xl font-semibold text-fg-muted">
                  {step.index}
                </span>
                <div>
                  <h3 className="font-display text-xl font-medium text-fg">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-fg-secondary font-light">
                    {step.desc}
                  </p>
                </div>
                <span className="font-mono text-xs tracking-wider text-accent uppercase md:text-right">
                  {step.day}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* differentiators */}
      <section className="shell mt-28">
        <SectionHeader
          label="// Why Ascend"
          title={
            <>
              Built to remove{" "}
              <span className="text-fg-muted font-light">all the risk.</span>
            </>
          }
        />
        <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-xl border border-border-line bg-border-soft md:grid-cols-2">
          {DIFF.map((d) => (
            <RevealItem key={d.title}>
              <div className="h-full bg-surface-1 p-8">
                <h3 className="font-display text-lg font-medium text-fg">
                  {d.title}
                </h3>
                <p className="mt-3 text-fg-secondary font-light leading-relaxed">
                  {d.desc}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* faq */}
      <section className="shell mt-28">
        <SectionHeader label="// Questions" title="The things everyone asks." />
        <RevealGroup className="mt-12 overflow-hidden rounded-xl border border-border-line">
          {FAQ.map((f, i) => (
            <RevealItem key={f.q}>
              <div
                className={`grid gap-3 bg-surface-1 p-8 md:grid-cols-[0.9fr_1.1fr] ${
                  i !== 0 ? "border-t border-border-soft" : ""
                }`}
              >
                <h3 className="font-display text-lg font-medium text-fg">
                  {f.q}
                </h3>
                <p className="text-fg-secondary font-light leading-relaxed">
                  {f.a}
                </p>
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
              Start with a 20-minute call.
            </h2>
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
