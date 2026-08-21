import { PRODUCT_TRUTH_CARDS, type ProductTruthCard } from "@/lib/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ConfidenceRail } from "@/components/product/ConfidenceRail";
import { EVIDENCE_TEXT } from "@/lib/confidence";

/* Section 6.4 of the rebuild spec, and the most differentiating thing on the
   page. Every string in these cards is verbatim output from the shipped
   product.

   The design argument: colour is earned by evidence. A card Ascend can back
   is lit cyan. A card it is holding is amber. A metric it genuinely cannot
   produce gets no accent at all, only outlined type and an unlit rail. The
   three cards therefore look progressively quieter as the evidence thins,
   which is the point the copy is making, made structurally. */

function CardShell({
  card,
  featured,
  children,
}: {
  card: ProductTruthCard;
  featured: boolean;
  children: React.ReactNode;
}) {
  return (
    <article
      className={`flex h-full gap-5 rounded-lg border p-6 transition-colors duration-500 md:p-7 ${
        featured
          ? "border-border-strong bg-surface-2"
          : "border-border-line bg-surface-1 hover:border-border-strong"
      }`}
    >
      <ConfidenceRail state={card.evidence} />
      <div className="flex min-w-0 flex-1 flex-col">{children}</div>
    </article>
  );
}

function LabelRow({ card }: { card: ProductTruthCard }) {
  const tone = EVIDENCE_TEXT[card.evidence];
  return (
    <div className="flex items-center gap-2.5">
      <span
        className="font-mono text-[0.62rem] tracking-[0.18em] uppercase"
        style={{ color: tone }}
      >
        {card.label}
      </span>
      {card.state && (
        <>
          <span aria-hidden="true" className="h-2.5 w-px bg-border-strong" />
          <span className="font-mono text-[0.62rem] tracking-[0.18em] text-fg-tertiary uppercase">
            {card.state}
          </span>
        </>
      )}
    </div>
  );
}

function OpportunityCard({ card }: { card: ProductTruthCard }) {
  return (
    <CardShell card={card} featured={false}>
      <LabelRow card={card} />
      <h3 className="mt-4 font-display text-[1.06rem] leading-snug font-medium text-fg">
        {card.title}
      </h3>
      <p className="mt-3.5 flex-1 text-[0.94rem] leading-[1.68] font-light text-fg-secondary">
        {card.reason}
      </p>
      <p className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-accent-dim px-3 py-1.5 font-mono text-[0.63rem] tracking-[0.1em] text-accent uppercase">
        {card.chip}
      </p>
    </CardShell>
  );
}

function BlockerCard({ card }: { card: ProductTruthCard }) {
  return (
    <CardShell card={card} featured>
      <LabelRow card={card} />
      <h3 className="mt-4 font-display text-[1.14rem] leading-snug font-medium text-fg">
        {card.title}
      </h3>
      <p className="mt-3.5 flex-1 text-[0.94rem] leading-[1.68] font-light text-fg-secondary">
        {card.reason}
      </p>
      <p
        className="mt-6 border-t pt-4 text-[0.8rem] leading-[1.6] font-light"
        style={{ borderColor: "var(--border-soft)", color: "var(--warning)" }}
      >
        {card.chip}
      </p>
    </CardShell>
  );
}

function MetricCard({ card }: { card: ProductTruthCard }) {
  /* A metric tile whose value is words, not a number. Deliberately the
     quietest object in the section: no accent anywhere, outlined type,
     an unlit rail. */
  return (
    <CardShell card={card} featured={false}>
      <span className="font-mono text-[0.62rem] tracking-[0.18em] text-fg-tertiary uppercase">
        {card.label}
      </span>
      <p className="mt-6 font-display text-[1.7rem] leading-[1.1] font-light tracking-[-0.01em] text-fg-tertiary [overflow-wrap:anywhere]">
        {card.title}
      </p>
      <p className="mt-auto pt-6 text-[0.84rem] leading-[1.68] font-light text-fg-tertiary">
        {card.reason}
      </p>
    </CardShell>
  );
}

function TruthCard({ card }: { card: ProductTruthCard }) {
  if (card.kind === "opportunity") return <OpportunityCard card={card} />;
  if (card.kind === "blocker") return <BlockerCard card={card} />;
  return <MetricCard card={card} />;
}

export function ProductTruth() {
  return (
    <section className="border-t border-border-soft py-24 md:py-32">
      <div className="shell">
        <SectionHeader
          label="// What nothing else you have been sold will ever say"
          title={<>Ascend tells you when it does not know.</>}
          lead="Every dashboard you have bought prints a number whether or not it has the evidence for one. On a chart, “we measured it and it was zero” and “we have no idea” look identical. Ascend keeps them apart, in words, on the screen. These are real cards from the product."
        />

        <RevealGroup className="mt-16 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.24fr)_minmax(0,1fr)] lg:gap-6">
          {PRODUCT_TRUTH_CARDS.map((card) => (
            <RevealItem key={card.label + card.title} className="h-full">
              <TruthCard card={card} />
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.12}>
          <p className="mt-14 max-w-[64ch] font-display text-[1.16rem] leading-[1.6] font-light text-fg">
            An operator who can say &ldquo;quiet day, nothing needs you&rdquo; has
            earned the right to be believed when they say the opposite.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
