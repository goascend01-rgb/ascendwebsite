import Link from "next/link";
import { EVERY_DAY, EVERY_DAY_CLOSE } from "@/lib/capabilities";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

/* The clearest thing this site can say, and the thing it was missing.

   A practice generates work all day. Each line is one thing that happens
   and the one thing Ascend does about it. Read as a pair, left to right,
   so a visitor understands the product in about six seconds without
   having to hold any of the philosophy in their head first.

   Every row is a doorway. A homepage reader would otherwise never learn
   that the acquisition, records and briefing sections exist at all, which
   is the whole reason the product read as "a receptionist" before.

   The last beat is the differentiator and it is deliberately the only
   amber row on the page: every other line is Ascend acting, and that one
   is Ascend declining to. */
export function EveryDay() {
  return (
    <section
      id="every-day"
      className="scroll-mt-24 border-t border-border-soft py-24 md:py-28"
    >
      <div className="shell">
        <SectionHeader
          label="// What it does, all day, in one screen"
          title={
            <>
              Your practice generates work all day.{" "}
              <span className="text-fg-secondary">
                Ascend handles what falls through.
              </span>
            </>
          }
        />

        <RevealGroup className="mt-16 overflow-hidden rounded-lg border border-border-line">
          {EVERY_DAY.map((beat, i) => {
            const uncertain = i === EVERY_DAY.length - 1;
            return (
              <RevealItem key={beat.trigger}>
                <Link
                  href={`/platform#${beat.where}`}
                  className={`group grid gap-3 border-b border-border-soft px-6 py-5 transition-colors duration-500 last:border-b-0 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-[-2px] md:grid-cols-[minmax(0,0.85fr)_2.5rem_minmax(0,1.15fr)] md:items-center md:gap-6 ${
                    uncertain ? "bg-surface-1/60" : "hover:bg-surface-1/50"
                  }`}
                >
                  <p className="text-[1rem] leading-snug font-light text-fg-tertiary">
                    {beat.trigger}
                  </p>

                  <span
                    aria-hidden="true"
                    className="hidden justify-self-center md:block"
                  >
                    <span
                      className={`block h-px w-6 transition-[width,background-color] duration-500 group-hover:w-8 ${
                        uncertain
                          ? "bg-warning/60"
                          : "bg-accent/50 group-hover:bg-accent"
                      }`}
                    />
                  </span>

                  <p
                    className={`flex items-center gap-2.5 text-[1.02rem] leading-snug ${
                      uncertain ? "text-warning" : "text-fg"
                    }`}
                  >
                    {beat.response}
                    <span
                      aria-hidden="true"
                      className="shrink-0 font-mono text-accent opacity-40 transition-[opacity,transform] duration-300 group-hover:translate-x-1 group-hover:opacity-100 md:opacity-0"
                    >
                      <span aria-hidden="true">→</span>
                    </span>
                  </p>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <Reveal delay={0.1}>
          <p className="mt-10 max-w-[64ch] text-[1.02rem] leading-[1.72] font-light text-fg-secondary">
            {EVERY_DAY_CLOSE}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
