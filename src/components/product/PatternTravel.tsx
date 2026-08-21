import { NETWORK_STEPS } from "@/lib/site";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

/* How a pattern travels between practices (spec section 6.8).

   The connecting rule is the diagram. It runs unlit through the first two
   steps, which happen out in the network, and lights at step three, which
   is where the principle arrives and every number attached to it is
   recomputed from the practice's own rows. The handoff is the idea, so the
   handoff is what the line shows. */
export function PatternTravel() {
  return (
    <RevealGroup className="relative grid gap-10 md:grid-cols-4 md:gap-6">
      {/* the rule, desktop only */}
      <div
        aria-hidden="true"
        className="absolute top-[13px] right-0 left-0 hidden md:block"
      >
        <div className="mx-auto flex h-px w-[75%]">
          <span className="h-px flex-1 bg-border-strong" />
          <span
            className="h-px flex-1"
            style={{
              background:
                "linear-gradient(to right, var(--border-strong), var(--accent))",
            }}
          />
          <span className="h-px flex-1 bg-accent opacity-70" />
        </div>
      </div>

      {NETWORK_STEPS.map((step, i) => {
        const lit = i >= 2;
        return (
          <RevealItem key={step.step}>
            <div className="relative">
              <span
                className={`relative z-10 flex h-[27px] w-[27px] items-center justify-center rounded-full border font-mono text-[0.7rem] tabular-nums ${
                  lit
                    ? "border-accent bg-bg text-accent"
                    : "border-border-strong bg-bg text-fg-tertiary"
                }`}
              >
                {step.step}
              </span>
              <h3 className="mt-6 font-display text-[1.02rem] font-medium text-fg">
                {step.title}
              </h3>
              <p className="mt-3 max-w-[38ch] text-[0.94rem] leading-[1.68] font-light text-fg-secondary">
                {step.body}
              </p>
            </div>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
