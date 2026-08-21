import { ACQUISITION_CHAIN, ACQUISITION_STOPS } from "@/lib/capabilities";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { WhereItStops } from "./WhereItStops";

/* Acquisition economics, drawn as the chain of questions it actually is.

   The questions are the design. Most analytics products collapse all five
   into one number and hand it over; the reason Ascend's version is worth
   anything is that it keeps them apart, and the layout has to show that
   separation rather than describe it. */
export function Acquisition() {
  return (
    <section
      id="acquisition"
      className="scroll-mt-[100px] border-t border-border-line py-20 md:py-24"
    >
      <SectionHeader
        label="// Acquisition economics"
        title={
          <>
            What you spent, what came back,{" "}
            <span className="text-fg-secondary">and whether to believe it.</span>
          </>
        }
        lead="Five questions, answered in order and never collapsed into one. Most reporting jumps straight from spend to a confident cost per patient. The step in the middle, deciding whether the inputs can carry that number at all, is the one that makes the rest defensible."
      />

      <RevealGroup className="mt-16 grid gap-px overflow-hidden rounded-lg border border-border-line bg-border-soft sm:grid-cols-2 lg:grid-cols-5">
        {ACQUISITION_CHAIN.map((stage, i) => (
          <RevealItem key={stage.index} className="h-full">
            <article className="flex h-full flex-col bg-surface-1 p-6">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-[0.66rem] tabular-nums text-fg-muted">
                  {stage.index}
                </span>
                {i < ACQUISITION_CHAIN.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="h-px flex-1 bg-border-strong"
                  />
                )}
              </div>

              <p className="mt-6 font-mono text-[0.68rem] leading-relaxed tracking-[0.1em] text-accent">
                {stage.question}
              </p>
              <h3 className="mt-3 font-display text-[1.05rem] leading-snug font-medium text-fg">
                {stage.name}
              </h3>
              <p className="mt-3.5 text-[0.94rem] leading-[1.68] font-light text-fg-secondary">
                {stage.body}
              </p>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>

      <WhereItStops>{ACQUISITION_STOPS}</WhereItStops>
    </section>
  );
}
