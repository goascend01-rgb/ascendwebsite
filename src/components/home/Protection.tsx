import { PROTECTIONS } from "@/lib/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

/* Spec section 6.16. The headline says out loud that there is no refund,
   which is founder-directed and absolute, and then earns the right to say
   it with five specific protections. */
export function Protection() {
  return (
    <section className="py-24 md:py-28">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <div>
            <SectionHeader
              label="// Your protection"
              title={<>We do not offer a refund. We offer something considerably better.</>}
            />
            <Reveal delay={0.16}>
              <p className="mt-8 max-w-[46ch] text-[0.98rem] leading-[1.7] font-light text-fg-secondary">
                A money-back guarantee pays you back for a wasted quarter. It does
                not give you the quarter back. So this offer is built to make the
                failure hard to reach instead.
              </p>
            </Reveal>
          </div>

          <RevealGroup className="space-y-px overflow-hidden rounded-lg border border-border-line bg-border-soft">
            {PROTECTIONS.map((p) => (
              <RevealItem key={p.title}>
                <div className="flex gap-4 bg-surface-1 p-6 transition-colors duration-500 hover:bg-surface-2">
                  <span
                    aria-hidden="true"
                    className="mt-[5px] font-mono text-[0.8rem] leading-none text-accent"
                  >
                    ✓
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-[0.98rem] font-medium text-fg">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-[0.95rem] leading-[1.68] font-light text-fg-secondary">
                      {p.body}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
