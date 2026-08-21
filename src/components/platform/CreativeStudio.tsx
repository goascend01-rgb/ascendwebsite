import { CREATIVE_SURFACES, CREATIVE_STOPS } from "@/lib/capabilities";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { WhereItStops } from "./WhereItStops";

/* Creative Studio is seven surfaces and the site previously gave it one
   sentence. Laid out as a spec sheet rather than a card grid: the reader
   here is deciding whether this replaces an agency, and that is a
   question you answer with specifics in order, not with tiles. */
export function CreativeStudio() {
  return (
    <section
      id="creative-studio"
      className="scroll-mt-[100px] border-t border-border-line py-20 md:py-24"
    >
      <SectionHeader
        label="// Creative Studio"
        title={
          <>
            The part that replaces an agency,{" "}
            <span className="text-fg-secondary">not a scheduling tool.</span>
          </>
        }
        lead="Most practice software will queue a post for you. This decides what is worth making, from your own cases and your own market, then makes it and tells you what it built each piece from."
      />

      <RevealGroup className="mt-16 divide-y divide-border-line border-y border-border-line">
        {CREATIVE_SURFACES.map((surface, i) => (
          <RevealItem key={surface.name}>
            <article className="grid gap-5 py-9 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] md:gap-14">
              <div>
                <span className="font-mono text-[0.7rem] tabular-nums tracking-[0.14em] text-fg-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-[1.3rem] leading-snug font-medium text-fg">
                  {surface.name}
                </h3>
                <p className="mt-2.5 text-[0.97rem] leading-snug text-accent">
                  {surface.summary}
                </p>
              </div>

              <ul className="space-y-4 md:pt-9">
                {surface.detail.map((d) => (
                  <li key={d} className="flex gap-3.5">
                    <span
                      aria-hidden="true"
                      className="mt-[0.7rem] h-px w-3 shrink-0 bg-accent/40"
                    />
                    <span className="max-w-[62ch] text-[0.98rem] leading-[1.72] font-light text-fg-secondary">
                      {d}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>

      <WhereItStops>{CREATIVE_STOPS}</WhereItStops>
    </section>
  );
}
