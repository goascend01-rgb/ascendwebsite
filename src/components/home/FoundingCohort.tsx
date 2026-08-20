import { COHORT, NETWORK } from "@/lib/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";

/* Spec section 6.17. The scarcity is real and it is structural, so the
   drawing makes the mechanism visible: ten slots, of which the first three
   are what carries a pattern over the publication floor. The number is not
   a deadline, it is a threshold. */
export function FoundingCohort() {
  const slots = Array.from({ length: COHORT.size }, (_, i) => i);

  return (
    <section className="border-y border-border-line bg-surface-1/40 py-24 md:py-32">
      <div className="shell">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <div>
            <SectionHeader
              label="// Why now, and it is not a fake deadline"
              title={<>The founding cohort is ten practices.</>}
            />

            <Reveal delay={0.16}>
              <p
                className="display mt-12 text-[clamp(5rem,14vw,9.5rem)] leading-[0.8] text-accent"
                style={{ textShadow: "0 0 60px var(--accent-glow)" }}
              >
                <CountUp value={String(COHORT.size)} />
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-9">
                <ul
                  aria-hidden="true"
                  className="flex gap-1.5"
                >
                  {slots.map((i) => (
                    <li
                      key={i}
                      className={`h-6 flex-1 rounded-sm border ${
                        i < NETWORK.minIndependentPractices
                          ? "border-accent/50 bg-accent-dim"
                          : "border-border-line bg-bg"
                      }`}
                    />
                  ))}
                </ul>
                <p className="mt-4 font-mono text-[0.64rem] leading-relaxed tracking-[0.12em] text-fg-tertiary uppercase">
                  The first {NETWORK.minIndependentPractices} are the publication
                  floor
                </p>
              </div>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <p className="max-w-[54ch] text-[1rem] leading-[1.72] font-light text-fg-secondary">
                Being early is worth something specific rather than sentimental. A
                pattern cannot be published to the Network until at least{" "}
                {NETWORK.minIndependentPractices} independent practices have
                contributed to it. The founding cohort is who crosses that
                threshold, and they cross it first, in their own market.
              </p>
            </Reveal>

            <RevealGroup className="mt-10 space-y-4">
              {COHORT.benefits.map((benefit) => (
                <RevealItem key={benefit}>
                  <div className="flex gap-4 border-t border-border-soft pt-4">
                    <span
                      aria-hidden="true"
                      className="mt-[5px] font-mono text-[0.8rem] leading-none text-accent"
                    >
                      ✓
                    </span>
                    <p className="text-[0.93rem] leading-[1.68] font-light text-fg-secondary">
                      {benefit}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal delay={0.1}>
              <p className="mt-10 max-w-[58ch] rounded-lg border border-border-line bg-bg p-6 text-[0.9rem] leading-[1.7] font-light text-fg-tertiary">
                {COHORT.ask}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
