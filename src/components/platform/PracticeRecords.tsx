import { RECORDS_CAPABILITIES, RECORDS_STOPS } from "@/lib/capabilities";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { WhereItStops } from "./WhereItStops";

/* The practice record. The site never mentioned it, which left a reader to
   assume Ascend is a messaging layer bolted to a calendar.

   Two of these six are security properties rather than features, and they
   are the ones a careful buyer cares most about, so they sit in the same
   grid at the same weight rather than being exiled to a trust page. */
export function PracticeRecords() {
  return (
    <section
      id="records"
      className="scroll-mt-[100px] border-t border-border-line py-20 md:py-24"
    >
      <SectionHeader
        label="// The practice record"
        title={
          <>
            The clinical record, the consultations,{" "}
            <span className="text-fg-secondary">and the money.</span>
          </>
        }
        lead="Ascend holds the record itself, not a copy of somebody else's. That is what lets the rest of it reason about your patients at all, and it is why the access rules below are built the way they are."
      />

      <RevealGroup className="mt-16 grid gap-px overflow-hidden rounded-lg border border-border-line bg-border-soft sm:grid-cols-2">
        {RECORDS_CAPABILITIES.map((cap) => (
          <RevealItem key={cap.title} className="h-full">
            <article className="flex h-full flex-col bg-surface-1 p-7 transition-colors duration-500 hover:bg-surface-2">
              <h3 className="font-display text-[1.06rem] leading-snug font-medium text-fg">
                {cap.title}
              </h3>
              <p className="mt-3.5 text-[0.97rem] leading-[1.72] font-light text-fg-secondary">
                {cap.body}
              </p>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>

      <WhereItStops>{RECORDS_STOPS}</WhereItStops>
    </section>
  );
}
