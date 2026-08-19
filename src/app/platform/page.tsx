import type { Metadata } from "next";
import { PLATFORM_STATS, PLATFORM_FEATURES, INTEGRATIONS } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CountUp } from "@/components/ui/CountUp";
import { Marquee } from "@/components/ui/Marquee";
import { Mark } from "@/components/ui/Logo";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { FeatureRow } from "@/components/platform/FeatureRow";

export const metadata: Metadata = {
  title: "AI Platform — Practice Automation",
  description:
    "Ascend's AI platform runs your front office on autopilot: AI voice receptionist, chatbots, automated appointment booking, lead & client management, automated reviews and back-office agents. Reclaim ~30 hours a week and cut costs.",
};

const RECLAIM = [
  { task: "Answering routine & after-hours calls", hrs: "8 hrs" },
  { task: "Confirming and rescheduling appointments", hrs: "6 hrs" },
  { task: "Chasing reminders & no-show win-backs", hrs: "4 hrs" },
  { task: "Following up with new leads", hrs: "5 hrs" },
  { task: "Requesting and managing reviews", hrs: "3 hrs" },
  { task: "Eligibility, auth & claim status busywork", hrs: "4 hrs" },
];

export default function PlatformPage() {
  return (
    <div className="pt-36 md:pt-44">
      {/* hero */}
      <section className="shell">
        <Reveal>
          <span className="label-mono text-accent">{"// AI Platform"}</span>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="display mt-6 max-w-4xl text-[clamp(2.7rem,6.2vw,5rem)] text-fg">
            Run your front office{" "}
            <span className="text-fg-muted font-light">on</span>{" "}
            <span className="text-accent glow-accent">autopilot.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-7 max-w-2xl text-[1.15rem] leading-relaxed text-fg-secondary font-light">
            One platform of AI agents that answer every call, book every
            appointment, follow up with every lead, and clear the back-office
            queue — 24/7. The output of a full front-office team, without adding
            a single hire.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-9 flex flex-wrap gap-4">
            <ButtonLink href="/contact" variant="primary" size="lg">
              Book a demo →
            </ButtonLink>
            <ButtonLink href="/pricing" variant="ghost" size="lg">
              See pricing
            </ButtonLink>
          </div>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-9 flex flex-wrap gap-x-3 gap-y-2">
            {PLATFORM_FEATURES.map((f) => (
              <a
                key={f.id}
                href={`#${f.id}`}
                className="rounded-full border border-border-line bg-surface-1/50 px-3.5 py-1.5 font-mono text-[0.68rem] tracking-wide text-fg-secondary transition-colors duration-300 hover:border-accent hover:text-fg"
              >
                {f.name}
              </a>
            ))}
          </div>
        </Reveal>
      </section>

      {/* outcome stats */}
      <section className="relative z-10 mt-20 border-y border-border-line bg-surface-1/30">
        <RevealGroup className="shell grid grid-cols-2 md:grid-cols-4">
          {PLATFORM_STATS.map((s, i) => (
            <RevealItem
              key={s.label}
              className={`px-4 py-10 ${i % 2 !== 0 ? "border-l border-border-soft" : ""} ${
                i !== 0 ? "md:border-l" : ""
              }`}
            >
              <CountUp
                value={s.value}
                className={`block font-display text-[2.4rem] font-semibold leading-none tabular-nums ${
                  s.accent ? "text-accent" : "text-fg"
                }`}
              />
              <div className="mt-2.5 font-mono text-[0.66rem] tracking-[0.16em] text-fg-tertiary uppercase">
                {s.label}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* capabilities */}
      <section className="shell mt-28">
        <SectionHeader
          label="// Capabilities"
          title={
            <>
              Everything your front office does,{" "}
              <span className="text-fg-muted font-light">automated.</span>
            </>
          }
          lead="Each agent works on its own or together as one system — plugged into the software you already run."
        />

        <div className="mt-20 space-y-28">
          {PLATFORM_FEATURES.map((feature, i) => (
            <FeatureRow key={feature.id} feature={feature} reverse={i % 2 === 1} />
          ))}
        </div>
      </section>

      {/* reclaim hours */}
      <section className="shell mt-32">
        <div className="overflow-hidden rounded-2xl border border-border-line bg-surface-1">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
            <div className="p-8 md:p-12">
              <span className="label-mono text-accent">{"// The outcome"}</span>
              <h2 className="display mt-5 text-[clamp(1.9rem,3.8vw,2.8rem)] text-fg">
                Reclaim your week.
              </h2>
              <p className="mt-4 max-w-md text-fg-secondary font-light leading-relaxed">
                Here&apos;s the repetitive work the platform takes off your
                team&apos;s plate — every single week.
              </p>
              <ul className="mt-8 divide-y divide-border-soft">
                {RECLAIM.map((r) => (
                  <li
                    key={r.task}
                    className="flex items-center justify-between py-3.5"
                  >
                    <span className="text-sm text-fg-secondary">{r.task}</span>
                    <span className="font-mono text-xs tracking-wider text-accent">
                      {r.hrs}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* summary */}
            <div className="relative flex flex-col justify-center gap-6 border-t border-border-line bg-surface-2/30 p-8 md:p-12 lg:border-l lg:border-t-0">
              <div
                className="pointer-events-none absolute inset-0 opacity-60"
                style={{
                  background:
                    "radial-gradient(circle at 70% 0%, var(--accent-dim), transparent 60%)",
                }}
              />
              <div className="relative">
                <div className="font-display text-5xl font-semibold text-accent">
                  ≈30 hrs
                </div>
                <div className="mt-2 font-mono text-[0.66rem] tracking-wider text-fg-tertiary uppercase">
                  Reclaimed every week
                </div>
              </div>
              <div className="relative hairline" />
              <div className="relative">
                <div className="font-display text-5xl font-semibold text-fg">
                  ~$3,800
                </div>
                <div className="mt-2 font-mono text-[0.66rem] tracking-wider text-fg-tertiary uppercase">
                  Saved per month vs. staffing
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* integrations */}
      <section className="shell mt-24">
        <Reveal>
          <div className="rounded-xl border border-border-line bg-surface-1 p-8">
            <div className="mb-7 label-mono text-center">
              {"// Plugs into the software you already run"}
            </div>
            <Marquee items={INTEGRATIONS} />
          </div>
        </Reveal>
      </section>

      {/* cta */}
      <section className="shell mt-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-border-line bg-surface-1 px-8 py-20 text-center md:py-24">
            <div
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                background:
                  "radial-gradient(circle at 50% 120%, var(--accent-dim), transparent 60%)",
              }}
            />
            <Mark className="relative mx-auto h-10 w-10 text-accent" />
            <h2 className="display relative mt-8 text-[clamp(2rem,4.5vw,3.4rem)] text-fg">
              See it answer a live call.
            </h2>
            <p className="relative mx-auto mt-4 max-w-md text-fg-secondary font-light">
              Book a 20-minute demo and watch the AI book a real appointment,
              end to end — then we&apos;ll map it to your practice.
            </p>
            <div className="relative mt-9 flex flex-wrap justify-center gap-4">
              <ButtonLink href="/contact" variant="primary" size="lg">
                Book a demo →
              </ButtonLink>
              <ButtonLink href="/pricing" variant="ghost" size="lg">
                See pricing
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </section>

      <div className="h-12" />
    </div>
  );
}
