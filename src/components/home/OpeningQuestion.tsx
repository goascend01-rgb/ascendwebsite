import { Reveal } from "@/components/ui/Reveal";

/* A quiet beat after the hero. The question does the work, so the layout
   gives it the whole width and pushes the answer off to one side rather
   than centring both and flattening the hierarchy. */
export function OpeningQuestion() {
  return (
    <section className="border-t border-border-soft py-24 md:py-32">
      <div className="shell">
        <Reveal>
          <p className="label-mono text-accent">{"// To open"}</p>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="display mt-7 max-w-[19ch] text-[clamp(2rem,5vw,3.9rem)] text-fg sm:max-w-[24ch]">
            How many patients did your practice lose last year without ever
            learning their name?
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:gap-16">
          <Reveal delay={0.14}>
            <div
              aria-hidden="true"
              className="hidden h-full min-h-[1px] items-start md:flex"
            >
              <span className="mt-3 block h-px w-full bg-border-line" />
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="max-w-[52ch] text-[1.05rem] leading-[1.7] font-light text-fg-secondary">
              Nobody can answer that, which is exactly the problem. The revenue
              that leaves a practice does not leave loudly. It leaves as an
              unanswered message at 9pm, a chair that stayed empty on Thursday,
              and a patient who simply never came back.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
