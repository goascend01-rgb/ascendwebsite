import { PRIVACY_CONTRACT, NETWORK_HONEST } from "@/lib/site";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

/* Spec section 6.9. The honest panel beside the claims is not optional: it
   is the reason the five claims are believable, so it sits at equal weight
   rather than as a footnote, on its own surface. */
export function PrivacyContract() {
  return (
    <section className="py-24 md:py-28">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <div>
            <Reveal>
              <p className="label-mono text-accent">{"// The privacy contract"}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display mt-6 text-[clamp(1.9rem,4vw,3rem)] text-fg">
                Structural, not promised.
              </h2>
            </Reveal>

            <RevealGroup className="mt-12 space-y-px overflow-hidden rounded-lg border border-border-line bg-border-soft">
              {PRIVACY_CONTRACT.map((item) => (
                <RevealItem key={item.body}>
                  <div
                    className={`flex gap-4 p-6 ${
                      item.allowed ? "bg-surface-1" : "bg-bg"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`mt-[3px] flex h-4 w-4 shrink-0 items-center justify-center font-mono text-[0.8rem] leading-none ${
                        item.allowed ? "text-accent" : "text-fg-muted"
                      }`}
                    >
                      {item.allowed ? "✓" : "✗"}
                    </span>
                    <p
                      className={`text-[0.98rem] leading-[1.68] font-light ${
                        item.allowed ? "text-fg-secondary" : "text-fg-tertiary"
                      }`}
                    >
                      <span className="sr-only">
                        {item.allowed ? "Guaranteed: " : "Never: "}
                      </span>
                      {item.body}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <Reveal delay={0.14}>
            <aside className="h-full rounded-lg border border-border-strong bg-surface-2 p-7 md:p-8">
              <p className="label-mono text-warning">{"// And the honest part"}</p>
              <div className="mt-8 space-y-6">
                {NETWORK_HONEST.map((para, i) => (
                  <p
                    key={para}
                    className={`text-[0.98rem] leading-[1.72] font-light ${
                      i === NETWORK_HONEST.length - 1
                        ? "border-t border-border-soft pt-6 text-fg"
                        : "text-fg-secondary"
                    }`}
                  >
                    {para}
                  </p>
                ))}
              </div>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
