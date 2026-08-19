import type { ReactNode } from "react";

/* Shared framed panel for every mock. */
function Panel({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border-line bg-surface-1 p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.85)]">
      {children}
    </div>
  );
}

function PanelHead({ label, status, tone = "accent" }: { label: string; status: string; tone?: "accent" | "success" }) {
  return (
    <div className="flex items-center justify-between">
      <span className="label-mono">{label}</span>
      <span className={`flex items-center gap-2 font-mono text-[0.62rem] tracking-wider uppercase ${tone === "success" ? "text-success" : "text-accent"}`}>
        <span className={`h-1.5 w-1.5 animate-pulse rounded-full ${tone === "success" ? "bg-success" : "bg-accent"}`} />
        {status}
      </span>
    </div>
  );
}

/* 01 — Voice receptionist */
export function VoiceMock() {
  const bars = [10, 20, 14, 28, 18, 24, 12, 26, 16, 22, 14, 20, 12, 24];
  return (
    <Panel>
      <PanelHead label="// Live call" status="On air" />
      <div className="mt-5 flex h-14 items-center justify-center gap-1 rounded-lg bg-control px-4">
        {bars.map((h, i) => (
          <span
            key={i}
            className={`w-1 rounded-full bg-accent ${i % 3 === 0 ? "animate-pulse" : ""}`}
            style={{ height: h }}
          />
        ))}
      </div>
      <div className="mt-5 space-y-2.5">
        <div className="flex justify-start">
          <div className="max-w-[82%] rounded-lg bg-accent-dim px-3.5 py-2.5 text-sm text-fg">
            <span className="mr-2 font-mono text-[0.58rem] tracking-wider text-fg-tertiary uppercase">AI</span>
            Thanks for calling Cedar Park Dental — how can I help?
          </div>
        </div>
        <div className="flex justify-end">
          <div className="max-w-[82%] rounded-lg bg-surface-2 px-3.5 py-2.5 text-sm text-fg-secondary">
            I need to book a cleaning this week.
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between rounded-lg bg-accent-dim px-4 py-3">
        <span className="text-sm text-fg">Appointment booked</span>
        <span className="font-mono text-xs tracking-wider text-accent">THU · 2:15 PM</span>
      </div>
    </Panel>
  );
}

/* 02 — Chat / chatbot */
export function ChatMock() {
  return (
    <Panel>
      <PanelHead label="// Website chat" status="Online" tone="success" />
      <div className="mt-5 space-y-2.5">
        <div className="flex justify-end">
          <div className="max-w-[80%] rounded-lg bg-surface-2 px-3.5 py-2.5 text-sm text-fg-secondary">
            Do you take Delta Dental?
          </div>
        </div>
        <div className="flex justify-start">
          <div className="max-w-[85%] rounded-lg bg-accent-dim px-3.5 py-2.5 text-sm text-fg">
            Yes — we&apos;re in-network with Delta Dental PPO. Want me to find you a time?
          </div>
        </div>
        <div className="flex justify-end">
          <div className="max-w-[80%] rounded-lg bg-surface-2 px-3.5 py-2.5 text-sm text-fg-secondary">
            Yes please, mornings are best.
          </div>
        </div>
        <div className="flex justify-start">
          <div className="max-w-[85%] rounded-lg bg-accent-dim px-3.5 py-2.5 text-sm text-fg">
            Booked you for Wed 9:30 AM ✓ I&apos;ve texted a confirmation.
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 rounded-lg border border-border-soft bg-control px-3.5 py-2.5">
        <span className="text-sm text-fg-muted">Type a message…</span>
        <span className="ml-auto font-mono text-xs text-accent">Send →</span>
      </div>
    </Panel>
  );
}

/* 03 — Appointment booking */
export function BookingMock() {
  const days = [
    { d: "Mon", slots: ["9:00", "—"] },
    { d: "Tue", slots: ["10:30", "2:00"] },
    { d: "Wed", slots: ["9:30", "—"] },
    { d: "Thu", slots: ["2:15", "4:00"] },
    { d: "Fri", slots: ["11:00", "—"] },
  ];
  return (
    <Panel>
      <PanelHead label="// Schedule · this week" status="Auto-fill on" />
      <div className="mt-5 grid grid-cols-5 gap-1.5">
        {days.map((day, di) => (
          <div key={day.d} className="rounded-lg bg-control p-2 text-center">
            <div className="font-mono text-[0.6rem] tracking-wider text-fg-tertiary uppercase">{day.d}</div>
            <div className="mt-2 space-y-1.5">
              {day.slots.map((s, si) => (
                <div
                  key={si}
                  className={`rounded px-1 py-1.5 text-[0.66rem] font-medium ${
                    s === "—"
                      ? "text-fg-muted"
                      : di === 3 && si === 0
                        ? "bg-accent text-on-accent"
                        : "bg-surface-2 text-fg"
                  }`}
                >
                  {s}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between rounded-lg bg-surface-2/50 px-4 py-2.5 text-sm">
          <span className="text-fg-secondary">Reminder sent · 24h before</span>
          <span className="font-mono text-xs text-success">✓</span>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-accent-dim px-4 py-2.5 text-sm">
          <span className="text-fg">Cancellation auto-filled from waitlist</span>
          <span className="font-mono text-xs text-accent">THU 2:15</span>
        </div>
      </div>
    </Panel>
  );
}

/* 04 — Growth CRM */
export function CrmMock() {
  const pipeline = [
    { stage: "New leads", count: 34, pct: 100, tone: "accent" },
    { stage: "Contacted", count: 28, pct: 80, tone: "fg" },
    { stage: "Booked", count: 19, pct: 56, tone: "fg" },
    { stage: "Showed", count: 16, pct: 47, tone: "success" },
  ];
  return (
    <Panel>
      <PanelHead label="// Pipeline · this week" status="Live" tone="success" />
      <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border-soft bg-border-soft">
        {[
          { v: "$48.2k", l: "Recovered", accent: true },
          { v: "3.2×", l: "Lead → patient" },
        ].map((m) => (
          <div key={m.l} className="bg-surface-1 px-4 py-3.5">
            <div className={`font-display text-xl font-semibold ${m.accent ? "text-accent" : "text-fg"}`}>{m.v}</div>
            <div className="mt-1 font-mono text-[0.58rem] tracking-wider text-fg-tertiary uppercase">{m.l}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 space-y-2.5">
        {pipeline.map((p) => (
          <div key={p.stage}>
            <div className="flex items-center justify-between text-sm">
              <span className="text-fg-secondary">{p.stage}</span>
              <span className="font-mono text-xs text-fg">{p.count}</span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-control">
              <div
                className={`h-full rounded-full ${p.tone === "accent" ? "bg-accent" : p.tone === "success" ? "bg-success" : "bg-fg-tertiary"}`}
                style={{ width: `${p.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

/* 05 — Review system */
export function ReviewMock() {
  return (
    <Panel>
      <PanelHead label="// Reputation" status="Auto-request" />
      <div className="mt-5 flex justify-start">
        <div className="max-w-[88%] rounded-lg bg-accent-dim px-3.5 py-2.5 text-sm text-fg">
          <span className="mr-2 font-mono text-[0.58rem] tracking-wider text-fg-tertiary uppercase">SMS</span>
          Thanks for visiting today! How did we do? Tap to leave a quick review →
        </div>
      </div>
      <div className="mt-4 rounded-lg border border-border-soft bg-control p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-2 font-display text-xs font-semibold text-fg-secondary">JP</div>
          <div>
            <div className="text-sm font-medium text-fg">Jordan P.</div>
            <div className="tracking-[0.2em] text-accent text-xs">★★★★★</div>
          </div>
          <span className="ml-auto font-mono text-[0.58rem] tracking-wider text-fg-muted uppercase">Google</span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-fg-secondary font-light">
          &ldquo;Booked in seconds and barely any wait. Front desk was so easy to deal with.&rdquo;
        </p>
      </div>
      <div className="mt-4 flex items-center justify-between rounded-lg bg-accent-dim px-4 py-2.5 text-sm">
        <span className="text-fg">Routed to Google · published</span>
        <span className="font-mono text-xs text-accent">+1 ★</span>
      </div>
    </Panel>
  );
}

/* 06 — Back-office agents */
export function AgentsMock() {
  const tasks = [
    { t: "Eligibility check · Patient #2841", s: "Done", done: true },
    { t: "Prior authorization #4821", s: "Completed", done: true },
    { t: "Claim status · BCBS", s: "Tracking", done: false },
    { t: "Referral to Dr. Nair", s: "Coordinated", done: true },
  ];
  return (
    <Panel>
      <PanelHead label="// Agent queue" status="Working" />
      <div className="mt-5 space-y-2.5">
        {tasks.map((task) => (
          <div key={task.t} className="flex items-center gap-3 rounded-lg bg-surface-2/40 px-3.5 py-3">
            <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-xs ${task.done ? "bg-accent-dim text-success" : "bg-control text-accent"}`}>
              {task.done ? "✓" : "…"}
            </span>
            <span className="flex-1 text-sm text-fg-secondary">{task.t}</span>
            <span className={`font-mono text-[0.62rem] tracking-wider uppercase ${task.done ? "text-success" : "text-accent"}`}>{task.s}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between rounded-lg bg-accent-dim px-4 py-3 text-sm">
        <span className="text-fg">Back-office queue cleared</span>
        <span className="font-mono text-xs tracking-wider text-accent">30 HRS / WK</span>
      </div>
    </Panel>
  );
}

export const MOCKS: Record<string, () => ReactNode> = {
  voice: VoiceMock,
  chat: ChatMock,
  booking: BookingMock,
  crm: CrmMock,
  reviews: ReviewMock,
  agents: AgentsMock,
};
