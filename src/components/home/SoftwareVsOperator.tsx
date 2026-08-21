import { SOFTWARE_VS_OPERATOR } from "@/lib/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

/* Paired rows rather than two independent lists. The whole argument is that
   each line on the left has a specific counterpart on the right, so they are
   aligned across a shared rule and read horizontally. The left column is
   deliberately unlit: it is what you already bought. */
export function SoftwareVsOperator() {
  return (
    <section className="py-24 md:py-28">
      <div className="shell">
        <SectionHeader
          label="// Why the last thing you bought did not fix it"
          title={<>You were sold a report. You needed an operator.</>}
        />

        <div className="mt-16 overflow-hidden rounded-lg border border-border-line">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="border-b border-border-line px-6 py-4 md:border-r md:border-b-0">
              <h3 className="font-mono text-[0.66rem] tracking-[0.2em] text-fg-muted uppercase">
                What software does
              </h3>
            </div>
            <div className="border-b border-border-line px-6 py-4 md:border-b-0">
              <h3 className="font-mono text-[0.66rem] tracking-[0.2em] text-accent uppercase">
                What an operator does
              </h3>
            </div>
          </div>

          <RevealGroup>
            {SOFTWARE_VS_OPERATOR.map((row) => (
              <RevealItem key={row.software}>
                <div className="group grid grid-cols-1 border-t border-border-line md:grid-cols-2">
                  <p className="bg-bg px-6 py-5 text-[0.99rem] leading-[1.6] font-light text-fg-muted transition-colors duration-500 md:border-r md:border-border-line">
                    {row.software}
                  </p>
                  <p className="flex items-start gap-3 bg-surface-1/60 px-6 py-5 text-[0.99rem] leading-[1.6] font-light text-fg transition-colors duration-500 group-hover:bg-surface-1">
                    <span
                      aria-hidden="true"
                      className="mt-[0.6rem] h-px w-3 shrink-0 bg-accent opacity-40 transition-opacity duration-500 group-hover:opacity-100"
                    />
                    <span className="min-w-0">{row.operator}</span>
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <Reveal delay={0.1}>
          <p className="mt-10 max-w-[58ch] text-[0.99rem] leading-[1.7] font-light text-fg-tertiary">
            The number was always correct. The chair was still empty. The unit of
            value is a completed action, not a chart.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
