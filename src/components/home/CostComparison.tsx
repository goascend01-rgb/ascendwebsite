import { COST_COMPARISON, TIERS } from "@/lib/site";
import { money } from "@/lib/leak";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

/* Spec section 6.12. The footnote is load-bearing: it is what converts an
   unverifiable table into an honest one, so it is set at readable size
   directly under the total rather than shrunk into small print. */
export function CostComparison() {
  const operator = TIERS.find((t) => t.id === "operator");
  const low = COST_COMPARISON.reduce((sum, r) => sum + r.low, 0);
  const high = COST_COMPARISON.reduce((sum, r) => sum + r.high, 0);

  return (
    <section className="py-24 md:py-28">
      <div className="shell">
        <SectionHeader
          label="// Cost comparison"
          title={<>What one subscription replaces.</>}
        />

        <div className="mt-16 overflow-hidden rounded-lg border border-border-line">
          <RevealGroup>
            {COST_COMPARISON.map((row) => (
              <RevealItem key={row.item}>
                <div className="flex items-baseline justify-between gap-6 border-b border-border-soft bg-surface-1/40 px-6 py-4">
                  <p className="text-[0.94rem] leading-snug font-light text-fg-secondary">
                    {row.item}
                  </p>
                  <p className="shrink-0 font-mono text-[0.84rem] tabular-nums text-fg-tertiary">
                    {money(row.low)}
                    <span className="mx-1.5 text-fg-muted">to</span>
                    {money(row.high)}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal>
            <div className="flex items-baseline justify-between gap-6 border-b border-border-line bg-bg px-6 py-5">
              <p className="font-mono text-[0.7rem] tracking-[0.18em] text-fg uppercase">
                Combined
              </p>
              <p className="shrink-0 font-mono text-[0.95rem] tabular-nums text-fg">
                {money(low)}
                <span className="mx-1.5 text-fg-muted">to</span>
                {money(high)}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div
              className="flex flex-col gap-3 px-6 py-7 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              style={{
                background:
                  "linear-gradient(to right, var(--accent-dim), transparent 70%)",
              }}
            >
              <p className="font-display text-[1.06rem] font-medium text-fg">
                Ascend {operator?.name}, all of it, one system
              </p>
              <p className="shrink-0 font-display text-[1.9rem] leading-none font-semibold tabular-nums text-accent">
                {money(operator?.monthly ?? 0)}
                <span className="ml-2 font-mono text-[0.7rem] font-normal tracking-[0.12em] text-fg-tertiary uppercase">
                  / month
                </span>
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <p className="mt-8 max-w-[68ch] text-[0.92rem] leading-[1.72] font-light text-fg-tertiary">
            Ranges are typical published US market rates, for comparison rather
            than measured. The only number that matters is what your stack costs,
            and we will price against yours on the call. If Ascend does not beat
            it, we will say so.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
