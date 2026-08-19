"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ButtonLink } from "@/components/ui/Button";

type Mode = "staffing" | "platform";

const ease = [0.2, 0.7, 0.2, 1] as const;

const COPY: Record<
  Mode,
  {
    eyebrow: string;
    title: React.ReactNode;
    sub: string;
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
  }
> = {
  staffing: {
    eyebrow: "// Remote Healthcare Staffing",
    title: (
      <>
        Staff your practice
        <br />
        <span className="text-fg-muted font-light">without the</span>{" "}
        <span className="text-stroke">hiring.</span>
      </>
    ),
    sub: "Pre-trained, bilingual professionals for dental & medical practices — reception, billing, insurance, coding and scribes. Deployed in days. You pay only after you hire.",
    primary: { label: "Book a demo →", href: "/contact" },
    secondary: { label: "Browse roles", href: "/#staffing" },
  },
  platform: {
    eyebrow: "// AI Practice Automation",
    title: (
      <>
        An AI that runs
        <br />
        <span className="text-fg-muted font-light">your</span>{" "}
        <span className="text-accent glow-accent">front office.</span>
      </>
    ),
    sub: "A voice receptionist that answers every call, chat that books patients around the clock, and a CRM that never forgets to follow up — all before your team clocks in.",
    primary: { label: "Explore the platform →", href: "/platform" },
    secondary: { label: "See it in action", href: "/platform" },
  },
};

export function Hero() {
  const [mode, setMode] = useState<Mode>("staffing");
  const c = COPY[mode];

  return (
    <section className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-28">
      <div className="shell grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        {/* ---------- Left: copy ---------- */}
        <div>
          <ModeToggle mode={mode} setMode={setMode} />

          <div className="mt-9 min-h-[clamp(170px,22vw,300px)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease }}
              >
                <div className="label-mono text-accent">{c.eyebrow}</div>
                <h1 className="display mt-6 text-[clamp(2.6rem,6.4vw,5.2rem)] text-fg">
                  {c.title}
                </h1>
              </motion.div>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={mode + "-sub"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mt-7 max-w-lg text-[1.08rem] leading-relaxed text-fg-secondary font-light"
            >
              {c.sub}
            </motion.p>
          </AnimatePresence>

          <div className="mt-9 flex flex-wrap gap-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={mode + "-cta"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, delay: 0.12 }}
                className="flex flex-wrap gap-4"
              >
                <ButtonLink href={c.primary.href} variant="primary" size="lg">
                  {c.primary.label}
                </ButtonLink>
                <ButtonLink href={c.secondary.href} variant="ghost" size="lg">
                  {c.secondary.label}
                </ButtonLink>
              </motion.div>
            </AnimatePresence>
          </div>

          <p className="mt-8 font-mono text-[0.7rem] tracking-[0.18em] text-fg-tertiary uppercase">
            HIPAA &amp; GDPR compliant · No upfront cost · Cancel anytime
          </p>
        </div>

        {/* ---------- Right: morphing visual ---------- */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {mode === "staffing" ? (
              <motion.div
                key="visual-staffing"
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -16 }}
                transition={{ duration: 0.5, ease }}
              >
                <TalentCard />
              </motion.div>
            ) : (
              <motion.div
                key="visual-platform"
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -16 }}
                transition={{ duration: 0.5, ease }}
              >
                <CallConsole />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Toggle ----------------------------- */
function StaffIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="9" cy="8" r="3" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M16.5 5.6a3 3 0 0 1 0 5.6" />
      <path d="M21.5 20a6.5 6.5 0 0 0-4.2-6.1" />
    </svg>
  );
}

function AiIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M11 2l1.7 5.5L18 9l-5.3 1.5L11 16l-1.7-5.5L4 9l5.3-1.5z" />
      <circle cx="18.5" cy="17.5" r="1.7" />
    </svg>
  );
}

function ModeToggle({
  mode,
  setMode,
}: {
  mode: Mode;
  setMode: (m: Mode) => void;
}) {
  const items: { key: Mode; label: string; icon: () => ReactNode }[] = [
    { key: "staffing", label: "Staffing", icon: StaffIcon },
    { key: "platform", label: "AI Platform", icon: AiIcon },
  ];
  return (
    <div className="inline-flex items-center gap-3">
      <span className="hidden font-mono text-[0.66rem] tracking-[0.18em] text-fg-tertiary uppercase sm:inline">
        I need
      </span>
      <div className="inline-flex rounded-full border border-border-strong bg-surface-2/70 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-md">
        {items.map((it) => {
          const active = mode === it.key;
          return (
            <button
              key={it.key}
              type="button"
              onClick={() => setMode(it.key)}
              aria-pressed={active}
              className="group relative rounded-full px-5 py-2.5 font-mono text-[0.78rem] tracking-[0.04em] transition-colors duration-300"
            >
              {active && (
                <motion.span
                  layoutId="mode-pill"
                  className="absolute inset-0 rounded-full bg-accent shadow-[0_4px_22px_-2px_var(--accent-glow)]"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span
                className={`relative z-10 flex items-center gap-2 ${
                  active
                    ? "text-on-accent font-bold"
                    : "text-fg-secondary group-hover:text-fg"
                }`}
              >
                {it.icon()}
                {it.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------- Staffing visual ------------------------- */
function TalentCard() {
  return (
    <div className="relative mx-auto max-w-md">
      {/* stacked ghost cards for depth */}
      <div className="absolute inset-x-6 -top-4 h-full rounded-xl border border-border-soft bg-surface-1/40" />
      <div className="absolute inset-x-3 -top-2 h-full rounded-xl border border-border-soft bg-surface-1/60" />

      <div className="relative rounded-xl border border-border-line bg-surface-1 p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
        <div className="flex items-center justify-between">
          <span className="label-mono">{"// Deployed talent"}</span>
          <span className="flex items-center gap-2 font-mono text-[0.68rem] tracking-wider text-success">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
            ACTIVE
          </span>
        </div>

        <div className="mt-6 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-accent/30 to-accent-deep/10 font-display text-lg font-semibold text-accent">
            MR
          </div>
          <div>
            <div className="font-medium text-fg">Maria R.</div>
            <div className="text-sm text-fg-secondary">
              Front Desk Receptionist
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-border-soft bg-border-soft">
          {[
            { v: "247", l: "Calls / wk" },
            { v: "0", l: "To voicemail" },
            { v: "98%", l: "Booked" },
          ].map((s) => (
            <div key={s.l} className="bg-surface-1 px-3 py-4 text-center">
              <div className="font-display text-xl font-semibold text-fg">
                {s.v}
              </div>
              <div className="mt-1 font-mono text-[0.6rem] tracking-wider text-fg-tertiary uppercase">
                {s.l}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between rounded-lg bg-control px-4 py-3">
          <span className="text-sm text-fg-secondary">Speaks</span>
          <span className="font-mono text-xs tracking-wider text-fg">
            EN · ES
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between rounded-lg bg-accent-dim px-4 py-3">
          <span className="text-sm text-fg">Monthly cost</span>
          <span className="font-display font-semibold text-accent">
            $1,290{" "}
            <span className="text-xs font-normal text-fg-tertiary">
              vs $3,400 in-house
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------- Platform visual ------------------------- */
function CallConsole() {
  const bars = [10, 22, 14, 30, 18, 26, 12, 24, 16, 28, 14, 20];
  const transcript = [
    { who: "AI", text: "Thanks for calling Cedar Park Dental — how can I help?" },
    { who: "Caller", text: "Hi, I'd like to book a cleaning this week." },
    { who: "AI", text: "Of course. I have Thursday at 2:15 or Friday at 10:00." },
  ];
  return (
    <div className="relative mx-auto max-w-md">
      <div className="relative rounded-xl border border-border-line bg-surface-1 p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
        <div className="flex items-center justify-between">
          <span className="label-mono">{"// Live call"}</span>
          <span className="flex items-center gap-2 font-mono text-[0.68rem] tracking-wider text-accent">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            ON AIR
          </span>
        </div>

        {/* waveform */}
        <div className="mt-6 flex h-16 items-center justify-center gap-1 rounded-lg bg-control px-4">
          {bars.map((h, i) => (
            <motion.span
              key={i}
              className="w-1 rounded-full bg-accent"
              animate={{ height: [h, h * 2.2, h] }}
              transition={{
                duration: 0.9,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.07,
              }}
              style={{ height: h }}
            />
          ))}
        </div>

        {/* transcript */}
        <div className="mt-5 space-y-3">
          {transcript.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.5, duration: 0.4 }}
              className={`flex ${t.who === "Caller" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-3.5 py-2.5 text-sm leading-snug ${
                  t.who === "AI"
                    ? "bg-accent-dim text-fg"
                    : "bg-surface-2 text-fg-secondary"
                }`}
              >
                <span className="mr-2 font-mono text-[0.6rem] tracking-wider text-fg-tertiary uppercase">
                  {t.who}
                </span>
                {t.text}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between rounded-lg bg-accent-dim px-4 py-3">
          <span className="text-sm text-fg">Appointment booked</span>
          <span className="font-mono text-xs tracking-wider text-accent">
            THU · 2:15 PM
          </span>
        </div>
      </div>
    </div>
  );
}
