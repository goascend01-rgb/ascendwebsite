import { AI_FEATURES, INTEGRATIONS } from "@/lib/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Marquee } from "@/components/ui/Marquee";
import { ButtonLink } from "@/components/ui/Button";

export function PlatformSection() {
  return (
    <section
      id="platform"
      className="relative scroll-mt-24 overflow-hidden border-y border-border-line bg-surface-1/30 py-28"
    >
      <div className="shell">
        <SectionHeader
          label="// AI Platform"
          title={
            <>
              Answer every call. Book every patient.{" "}
              <span className="text-accent glow-accent">Chase every claim.</span>
            </>
          }
          lead="The output of a full front-desk team, running around the clock, without a single hire."
        />

        {/* CRM dashboard centerpiece */}
        <Reveal delay={0.1} className="mt-16">
          <CrmDashboard />
        </Reveal>

        {/* feature cards */}
        <RevealGroup className="mt-8 grid gap-px overflow-hidden rounded-xl border border-border-line bg-border-soft md:grid-cols-3">
          {AI_FEATURES.map((f) => (
            <RevealItem key={f.id}>
              <div className="flex h-full flex-col bg-surface-1 p-8">
                <span className="font-mono text-xs tracking-[0.16em] text-accent">
                  {f.index}
                </span>
                <h3 className="mt-6 font-display text-lg font-medium text-fg">
                  {f.name}
                </h3>
                <p className="mt-2 text-sm font-medium text-fg-secondary">
                  {f.tagline}
                </p>
                <ul className="mt-5 space-y-2.5">
                  {f.points.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-2.5 text-sm text-fg-secondary font-light"
                    >
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* integrations */}
        <Reveal delay={0.1} className="mt-16">
          <div className="rounded-xl border border-border-line bg-surface-1 p-8">
            <div className="mb-7 label-mono text-center">
              {"// Plugs into the software you already run"}
            </div>
            <Marquee items={INTEGRATIONS} />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 flex justify-center">
          <ButtonLink href="/platform" variant="ghost" size="lg">
            Explore the full platform →
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------- CRM dashboard mock --------------------- */
function CrmDashboard() {
  const pipeline = [
    { stage: "New leads", count: 34, pct: 100, tone: "accent" },
    { stage: "Contacted", count: 28, pct: 82, tone: "fg" },
    { stage: "Booked", count: 19, pct: 56, tone: "fg" },
    { stage: "Showed", count: 16, pct: 47, tone: "success" },
  ];
  const activity = [
    { icon: "↳", text: "AI booked Jordan P. — Thu 2:15 PM", time: "2m" },
    { icon: "✦", text: "Recall sent to 42 inactive patients", time: "14m" },
    { icon: "↳", text: "No-show win-back: 6 rebooked", time: "1h" },
    { icon: "✦", text: "New lead from website chat — verified", time: "2h" },
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-border-line bg-surface-1 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]">
      {/* top bar */}
      <div className="flex items-center justify-between border-b border-border-soft bg-surface-2/40 px-5 py-3.5">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-fg-muted/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-fg-muted/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-fg-muted/30" />
          <span className="ml-3 font-mono text-[0.66rem] tracking-wider text-fg-tertiary">
            ascend / growth-crm
          </span>
        </div>
        <span className="flex items-center gap-2 font-mono text-[0.62rem] tracking-wider text-success">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
          LIVE
        </span>
      </div>

      <div className="grid md:grid-cols-[200px_1fr]">
        {/* sidebar */}
        <div className="hidden flex-col gap-1 border-r border-border-soft p-4 md:flex">
          {[
            { l: "Dashboard", active: true },
            { l: "Pipeline" },
            { l: "Conversations" },
            { l: "Campaigns" },
            { l: "Reports" },
          ].map((n) => (
            <div
              key={n.l}
              className={`rounded-md px-3 py-2 text-sm ${
                n.active
                  ? "bg-accent-dim text-fg"
                  : "text-fg-tertiary"
              }`}
            >
              {n.l}
            </div>
          ))}
        </div>

        {/* main */}
        <div className="p-5 md:p-7">
          {/* metric row */}
          <div className="grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-border-soft bg-border-soft">
            {[
              { v: "$48.2k", l: "Revenue recovered", accent: true },
              { v: "127", l: "Appts booked / mo" },
              { v: "3.2×", l: "Lead → patient" },
            ].map((m) => (
              <div key={m.l} className="bg-surface-1 px-4 py-5">
                <div
                  className={`font-display text-2xl font-semibold ${
                    m.accent ? "text-accent" : "text-fg"
                  }`}
                >
                  {m.v}
                </div>
                <div className="mt-1.5 font-mono text-[0.6rem] tracking-wider text-fg-tertiary uppercase">
                  {m.l}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {/* pipeline */}
            <div>
              <div className="label-mono">{"// Pipeline · this week"}</div>
              <div className="mt-4 space-y-3">
                {pipeline.map((p) => (
                  <div key={p.stage}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-fg-secondary">{p.stage}</span>
                      <span className="font-mono text-xs text-fg">{p.count}</span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-control">
                      <div
                        className={`h-full rounded-full ${
                          p.tone === "accent"
                            ? "bg-accent"
                            : p.tone === "success"
                              ? "bg-success"
                              : "bg-fg-tertiary"
                        }`}
                        style={{ width: `${p.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* activity */}
            <div>
              <div className="label-mono">{"// Automated activity"}</div>
              <div className="mt-4 space-y-2.5">
                {activity.map((a, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-lg bg-surface-2/40 px-3.5 py-3"
                  >
                    <span className="font-mono text-accent">{a.icon}</span>
                    <span className="flex-1 text-sm text-fg-secondary">
                      {a.text}
                    </span>
                    <span className="font-mono text-[0.62rem] text-fg-muted">
                      {a.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
