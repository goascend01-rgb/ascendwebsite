import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Mark } from "@/components/ui/Logo";

/* Spec section 6.18, the ask. The offer is not a demo, it is the leak
   report: your own twelve months run through the four leaks. The last
   paragraph gives the visitor permission to get a no, which is what makes
   booking cheap. */
export function CtaSection() {
  return (
    <section className="py-24 md:py-28">
      <div className="shell">
        <Reveal>
          <div className="relative overflow-hidden rounded-xl border border-border-line bg-surface-1 px-7 py-16 md:px-14 md:py-20">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-70"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 130%, var(--accent-dim), transparent 62%)",
              }}
            />

            <div className="relative">
              <div className="flex items-center gap-4">
                <Mark className="h-7 w-7 text-accent" />
                <span className="label-mono">{"// The ask"}</span>
              </div>

              <h2 className="display mt-8 max-w-[22ch] text-[clamp(2rem,4.8vw,3.3rem)] text-fg">
                Send us your last twelve months. We will run your own numbers
                through the four leaks.
              </h2>

              <div className="mt-9 max-w-[58ch] space-y-5 text-[1rem] leading-[1.72] font-light text-fg-secondary">
                <p>
                  Not the worked example from earlier. Yours. You will see the
                  actual figure for your practice, with every assumption named and
                  arguable.
                </p>
                <p className="text-fg-tertiary">
                  If the number is not big enough to justify the fee, that is a
                  completely reasonable outcome and we will tell you on the call
                  rather than chase you for a quarter.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <ButtonLink href="/contact" variant="primary" size="lg">
                  Book the 20-minute call →
                </ButtonLink>
                <ButtonLink href="/pricing" variant="ghost" size="lg">
                  See pricing
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
