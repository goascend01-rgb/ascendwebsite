import { BRIEFINGS, BRIEFINGS_STOPS } from "@/lib/capabilities";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { WhereItStops } from "./WhereItStops";

/* The advisor half of the product, which the site had somehow never
   mentioned at all.

   Organised by rhythm rather than by feature, because that is how an owner
   experiences it: something each morning, something each day, something
   each week, and something running underneath the whole time. The internal
   product names are deliberately absent. */
export function Briefings() {
  return (
    <section
      id="briefings"
      className="scroll-mt-[100px] border-t border-border-line py-20 md:py-24"
    >
      <SectionHeader
        label="// What it tells you"
        title={
          <>
            An operator who reports to you,{" "}
            <span className="text-fg-secondary">on a rhythm.</span>
          </>
        }
        lead="This is the half that makes Ascend an analyst rather than an inbox. It reads everything it runs, decides what actually deserves your attention, and writes it down in sentences."
      />

      <RevealGroup className="mt-16 space-y-5">
        {BRIEFINGS.map((item) => (
          <RevealItem key={item.title}>
            <article className="grid gap-6 rounded-lg border border-border-line bg-surface-1 p-7 transition-colors duration-500 hover:border-border-strong md:grid-cols-[8.5rem_minmax(0,1fr)] md:gap-10 md:p-8">
              <span className="font-mono text-[0.66rem] tracking-[0.18em] text-accent uppercase md:pt-1">
                {item.eyebrow}
              </span>

              <div className="min-w-0">
                <h3 className="font-display text-[1.24rem] leading-snug font-medium text-fg">
                  {item.title}
                </h3>
                <p className="mt-4 max-w-[64ch] text-[1rem] leading-[1.72] font-light text-fg-secondary">
                  {item.body}
                </p>
                <p className="mt-5 max-w-[64ch] border-t border-border-soft pt-4 text-[0.93rem] leading-[1.68] font-light text-fg-tertiary">
                  {item.note}
                </p>
              </div>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>

      <WhereItStops>{BRIEFINGS_STOPS}</WhereItStops>
    </section>
  );
}
