import type { Metadata } from "next";
import { ABOUT_STATS, VALUES, TEAM } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Mark } from "@/components/ui/Logo";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why Ascend exists: pre-trained remote talent today, AI automation next. We start with people, then automate everything that shouldn't need a person at all.",
};

const PILLARS = [
  {
    tag: "Live today",
    title: "Pre-trained remote talent",
    desc: "Healthcare-trained professionals — reception, billing, insurance, coding and scribes — matched to your practice and deployed in days, at roughly half the cost of hiring in-house.",
  },
  {
    tag: "Now rolling out",
    title: "AI practice automation",
    desc: "A voice receptionist, chat and a growth CRM that handle the repetitive front-office work around the clock, so your people focus on patients instead of busywork.",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
}

export default function AboutPage() {
  return (
    <div className="pt-36 md:pt-44">
      {/* hero */}
      <section className="shell">
        <Reveal>
          <span className="label-mono text-accent">{"// About Ascend"}</span>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="display mt-6 max-w-4xl text-[clamp(2.6rem,6vw,4.8rem)] text-fg">
            People first.{" "}
            <span className="text-accent glow-accent">Software next.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-7 max-w-2xl text-[1.15rem] leading-relaxed text-fg-secondary font-light">
            Ascend gives dental and medical practices the team and the technology
            to grow without the cost, delay, and risk of traditional hiring. We
            start with people, then automate everything that shouldn&apos;t need
            a person at all.
          </p>
        </Reveal>
      </section>

      {/* story */}
      <section className="shell mt-28">
        <div className="grid gap-14 md:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <h2 className="display text-[clamp(1.8rem,3.6vw,2.6rem)] text-fg">
              Why we{" "}
              <span className="text-fg-muted font-light">exist.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-5 text-[1.05rem] leading-relaxed text-fg-secondary font-light">
              <p>
                Every practice owner we met was stuck in the same loop: drowning
                in front-office work, unable to hire fast enough, and bleeding
                revenue through missed calls and unbilled claims. Hiring locally
                was slow, expensive and risky — and the moment someone left, the
                whole cycle started over.
              </p>
              <p>
                Meanwhile, exceptional healthcare professionals around the world
                were ready to work — trained, reliable, and underutilized. Ascend
                started by connecting the two: pre-trained remote talent that
                drops into a practice in days, with zero risk until they&apos;re
                hired.
              </p>
              <p>
                Then we asked a harder question: how much of this work shouldn&apos;t
                need a person at all? That&apos;s the AI platform — voice, chat and
                a growth CRM that handle the repetitive front-office load so the
                people we place can focus on what actually needs them.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* stats */}
      <section className="relative z-10 mt-24 border-y border-border-line bg-surface-1/30">
        <RevealGroup className="shell grid grid-cols-2 md:grid-cols-4">
          {ABOUT_STATS.map((s, i) => (
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

      {/* what we do */}
      <section className="shell mt-28">
        <SectionHeader
          label="// What we do"
          title={
            <>
              Two halves of{" "}
              <span className="text-fg-muted font-light">one company.</span>
            </>
          }
        />
        <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-xl border border-border-line bg-border-soft md:grid-cols-2">
          {PILLARS.map((p) => (
            <RevealItem key={p.title}>
              <div className="flex h-full flex-col bg-surface-1 p-8 md:p-10">
                <span className="w-fit rounded-full bg-accent-dim px-3 py-1 font-mono text-[0.66rem] tracking-wider text-accent uppercase">
                  {p.tag}
                </span>
                <h3 className="mt-6 font-display text-2xl font-medium text-fg">
                  {p.title}
                </h3>
                <p className="mt-4 text-fg-secondary font-light leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* values */}
      <section className="shell mt-28">
        <SectionHeader
          label="// What we believe"
          title="The principles behind every placement."
        />
        <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-xl border border-border-line bg-border-soft md:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v) => (
            <RevealItem key={v.index}>
              <div className="flex h-full flex-col bg-surface-1 p-8">
                <span className="font-mono text-xs tracking-[0.16em] text-accent">
                  {v.index}
                </span>
                <h3 className="mt-6 font-display text-lg font-medium text-fg">
                  {v.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-secondary font-light">
                  {v.desc}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* team */}
      <section className="shell mt-28">
        <SectionHeader
          label="// Leadership"
          title="The people building Ascend."
        />
        <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-xl border border-border-line bg-border-soft sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member) => (
            <RevealItem key={member.name}>
              <div className="flex h-full flex-col items-start bg-surface-1 p-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-accent/30 to-accent-deep/10 font-display text-lg font-semibold text-accent">
                  {initials(member.name)}
                </div>
                <h3 className="mt-6 font-display text-base font-medium text-fg">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm text-fg-secondary">{member.role}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* cta */}
      <section className="shell mt-28">
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
            <h2 className="display relative mt-8 text-[clamp(2rem,4.5vw,3.2rem)] text-fg">
              Let&apos;s build your team.
            </h2>
            <p className="relative mx-auto mt-4 max-w-md text-fg-secondary font-light">
              See the talent and the platform in a 20-minute demo — and exactly
              what it would cost.
            </p>
            <div className="relative mt-9 flex flex-wrap justify-center gap-4">
              <ButtonLink href="/contact" variant="primary" size="lg">
                Book a demo →
              </ButtonLink>
              <ButtonLink href="/apply" variant="ghost" size="lg">
                Apply as talent
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </section>

      <div className="h-12" />
    </div>
  );
}
