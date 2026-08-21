import { INTELLIGENCE_LAYERS, LAYERS_CLOSE } from "@/lib/capabilities";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

/* The honest answer to "so the network has nothing on day one".

   Correct, and it does not need to, because two of the three layers work
   immediately. Drawn as three lanes on one time axis so the reader sees
   the answer before reading a word of it.

   The colour follows the same rule as everywhere else on this site:
   it is earned by evidence, not by importance. Foundation is available
   first and is deliberately the unlit lane, because it is a prior rather
   than something Ascend measured in your practice. Practice is lit,
   because it is the strongest evidence there is about you. Network
   starts unlit and brightens, because that is exactly what it does. */

const LANES: Record<string, { start: string; fill: string }> = {
  foundation: {
    start: "0%",
    fill: "repeating-linear-gradient(90deg, var(--fg-muted) 0 6px, transparent 6px 11px)",
  },
  practice: { start: "18%", fill: "var(--accent)" },
  network: {
    start: "52%",
    fill: "linear-gradient(90deg, var(--fg-muted), var(--accent))",
  },
};

export function IntelligenceLayers() {
  return (
    <section className="border-t border-border-soft py-24 md:py-28">
      <div className="shell">
        <SectionHeader
          label="// Three sources of intelligence, kept apart on purpose"
          title={
            <>
              Two of them work on day one.{" "}
              <span className="text-fg-secondary">
                The third is the one that compounds.
              </span>
            </>
          }
          lead="Ascend does not arrive empty and wait to learn. It starts with established knowledge about what tends to work, adds what it measures in your rooms, and only much later adds what the network has corroborated."
        />

        {/* the time axis */}
        <Reveal delay={0.1}>
          <div className="mt-16 rounded-lg border border-border-line bg-surface-1 p-7 md:p-8">
            <div className="flex justify-between font-mono text-[0.62rem] tracking-[0.16em] text-fg-tertiary uppercase">
              <span>Day one</span>
              <span className="hidden sm:block">First weeks</span>
              <span>Month twelve</span>
            </div>

            <div className="mt-5 space-y-4">
              {INTELLIGENCE_LAYERS.map((layer) => {
                const lane = LANES[layer.id];
                return (
                  <div key={layer.id} className="flex items-center gap-4">
                    <span className="w-[5.5rem] shrink-0 font-mono text-[0.66rem] tracking-[0.12em] text-fg-secondary uppercase">
                      {layer.name}
                    </span>
                    <div className="relative h-[6px] flex-1 overflow-hidden rounded-full bg-bg">
                      <span
                        aria-hidden="true"
                        className="absolute inset-y-0 rounded-full"
                        style={{
                          left: lane.start,
                          right: 0,
                          background: lane.fill,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="mt-6 border-t border-border-soft pt-5 font-mono text-[0.63rem] leading-relaxed tracking-[0.1em] text-fg-tertiary uppercase">
              Lit means measured. The dashed lane is real knowledge that is not
              yet evidence about you.
            </p>
          </div>
        </Reveal>

        {/* the three layers in full */}
        <RevealGroup className="mt-6 grid gap-5 lg:grid-cols-3">
          {INTELLIGENCE_LAYERS.map((layer) => (
            <RevealItem key={layer.id} className="h-full">
              <article className="flex h-full flex-col rounded-lg border border-border-line bg-surface-1 p-7 transition-colors duration-500 hover:border-border-strong">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-mono text-[0.66rem] tracking-[0.2em] text-accent uppercase">
                    {layer.name}
                  </h3>
                  <span className="font-mono text-[0.62rem] tracking-[0.12em] text-fg-tertiary uppercase">
                    {layer.available}
                  </span>
                </div>

                <p className="mt-6 font-display text-[1.14rem] leading-snug font-light text-fg">
                  &ldquo;{layer.voice}&rdquo;
                </p>

                <p className="mt-5 text-[0.97rem] leading-[1.72] font-light text-fg-secondary">
                  {layer.body}
                </p>

                <ul className="mt-5 flex-1 space-y-3">
                  {layer.detail.map((d) => (
                    <li key={d} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-[0.65rem] h-px w-2.5 shrink-0 bg-border-strong"
                      />
                      <span className="text-[0.93rem] leading-[1.65] font-light text-fg-tertiary">
                        {d}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="mt-6 border-t border-border-soft pt-5 text-[0.9rem] leading-[1.65] font-light text-fg-tertiary">
                  <span className="font-mono text-[0.58rem] tracking-[0.18em] text-fg-muted uppercase">
                    Where it stops
                  </span>
                  <br />
                  {layer.stops}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.12}>
          <p className="mt-10 max-w-[68ch] text-[1rem] leading-[1.72] font-light text-fg-secondary">
            {LAYERS_CLOSE}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
