import { STATS } from "@/lib/site";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";

export function StatsStrip() {
  return (
    <section className="relative z-10 border-y border-border-line bg-surface-1/30">
      <RevealGroup className="shell grid grid-cols-2 md:grid-cols-4">
        {STATS.map((s, i) => (
          <RevealItem
            key={s.label}
            className={`border-border-soft px-4 py-9 ${i % 2 !== 0 ? "border-l" : ""} ${
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
  );
}
