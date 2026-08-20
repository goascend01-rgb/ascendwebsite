import { LEAKS } from "@/lib/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

/* Four leaks, as a stacked ledger rather than a card grid. Each row is one
   line of a diagnosis, so it reads top to bottom like a list a person would
   actually write down, and the index sits in the margin the way a figure
   number does. */
export function Leaks() {
  return (
    <section id="the-leaks" className="scroll-mt-24 py-24 md:py-28">
      <div className="shell">
        <SectionHeader
          label="// The diagnosis"
          title={<>Four leaks, and none of them are anybody&apos;s fault.</>}
        />

        <RevealGroup className="mt-16 border-t border-border-line">
          {LEAKS.map((leak) => (
            <RevealItem key={leak.index}>
              <article className="group grid gap-4 border-b border-border-line py-8 transition-colors duration-500 hover:bg-surface-1/50 md:grid-cols-[5.5rem_minmax(0,1fr)_minmax(0,1.25fr)] md:items-baseline md:gap-8 md:px-4">
                <span className="font-mono text-[0.78rem] tabular-nums tracking-[0.14em] text-fg-tertiary transition-colors duration-500 group-hover:text-accent">
                  {leak.index}
                </span>
                <h3 className="font-display text-[1.12rem] leading-snug font-medium text-fg">
                  {leak.title}
                </h3>
                <p className="max-w-[46ch] text-[0.94rem] leading-[1.68] font-light text-fg-secondary">
                  {leak.body}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1}>
          <p className="mt-10 max-w-[62ch] text-[0.94rem] leading-[1.7] font-light text-fg-tertiary">
            Every practice has all four. They persist because a practice has
            finite hands and infinite small, unglamorous, revenue-critical
            follow-ups.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
