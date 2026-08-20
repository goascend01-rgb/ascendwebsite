import { TRUST_LADDER, RECOMMENDATION_FIELDS } from "@/lib/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

/* Spec section 6.10. The reasonable worry is not "will it work", it is
   "what happens the day it does something stupid to one of my patients",
   so the ladder is drawn as an actual ladder: each rung shows how much
   autonomy has been granted at that stage, and the first rung is almost
   entirely unfilled. */
export function TrustLadder() {
  return (
    <section className="border-t border-border-soft py-24 md:py-28">
      <div className="shell">
        <SectionHeader
          label="// The real objection, answered"
          title={<>It has to earn the right to act, one domain at a time.</>}
          lead="The reasonable worry is not “will it work”. It is “what happens the day it does something stupid to one of my patients”. So that is the part that was built first."
        />

        <RevealGroup className="mt-16 grid gap-5 md:grid-cols-3">
          {TRUST_LADDER.map((rung, i) => (
            <RevealItem key={rung.title} className="h-full">
              <article className="flex h-full flex-col rounded-lg border border-border-line bg-surface-1 p-7">
                {/* rungs granted at this stage */}
                <div aria-hidden="true" className="flex gap-1">
                  {[0, 1, 2].map((slot) => (
                    <span
                      key={slot}
                      className={`h-[3px] flex-1 rounded-full ${
                        slot <= i ? "bg-accent" : "bg-border-line"
                      }`}
                    />
                  ))}
                </div>

                <p className="mt-6 font-mono text-[0.62rem] tracking-[0.18em] text-fg-tertiary uppercase">
                  {rung.stage}
                </p>
                <h3 className="mt-3 font-display text-[1.24rem] font-medium text-fg">
                  {rung.title}
                </h3>
                <p className="mt-4 text-[0.92rem] leading-[1.7] font-light text-fg-secondary">
                  {rung.body}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* the five fields, which are real product structure */}
        <Reveal delay={0.12}>
          <div className="mt-12 rounded-lg border border-border-line bg-bg p-7 md:p-8">
            <p className="max-w-[64ch] text-[0.94rem] leading-[1.68] font-light text-fg-secondary">
              Every recommendation carries five fields, and it does not ship
              without all five.
            </p>
            <ul className="mt-7 grid gap-px overflow-hidden rounded-md border border-border-soft bg-border-soft sm:grid-cols-2 lg:grid-cols-5">
              {RECOMMENDATION_FIELDS.map((f) => (
                <li key={f.field} className="bg-surface-1 px-4 py-5">
                  <span className="font-mono text-[0.62rem] tracking-[0.16em] text-accent uppercase">
                    {f.field}
                  </span>
                  <p className="mt-2.5 text-[0.84rem] leading-[1.55] font-light text-fg-tertiary">
                    {f.question}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
