import { INSTALL_STEPS } from "@/lib/site";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

/* The thirty day install. Shared by the homepage, /pricing and
   /how-it-works.

   A rail with the window in the margin, so the reader takes in the whole
   month at once. The final marker is unlit because D30+ has no closing
   date: leaving everything supervised for months is a supported way to run
   it, and the drawing should not imply otherwise. */
export function InstallTimeline({
  headingLevel = 3,
}: {
  /** 2 on /how-it-works, where the timeline is the page's own subject and
      sits directly under the h1. 3 wherever a section h2 already precedes it. */
  headingLevel?: 2 | 3;
} = {}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const last = INSTALL_STEPS.length - 1;

  return (
    <RevealGroup>
      {INSTALL_STEPS.map((step, i) => {
        const open = i === last;
        return (
          <RevealItem key={step.window}>
            <div className="flex gap-5 md:gap-8">
              <span className="hidden w-[8.5rem] shrink-0 pt-[1.15rem] text-right font-mono text-[0.68rem] tracking-[0.16em] text-fg-tertiary uppercase md:block">
                {step.window}
              </span>

              <div
                aria-hidden="true"
                className="flex shrink-0 flex-col items-center"
              >
                <span className="h-[1.2rem] w-px bg-border-line" />
                <span
                  className={`h-[7px] w-[7px] shrink-0 rounded-full ${
                    open ? "bg-border-strong" : "bg-accent"
                  }`}
                />
                {!open && <span className="w-px flex-1 bg-border-line" />}
              </div>

              <div className="min-w-0 flex-1 pb-10">
                <span className="mb-2 block font-mono text-[0.66rem] tracking-[0.16em] text-fg-tertiary uppercase md:hidden">
                  {step.window}
                </span>
                <Heading className="font-display text-[1.08rem] leading-snug font-medium text-fg">
                  {step.title}
                </Heading>
                <p className="mt-3 max-w-[56ch] text-[0.97rem] leading-[1.7] font-light text-fg-secondary">
                  {step.body}
                </p>
              </div>
            </div>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
