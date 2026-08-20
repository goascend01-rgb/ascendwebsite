import { RevealGroup, RevealItem } from "./Reveal";

/* Accordion built on native details and summary: it is keyboard operable,
   announced correctly, and works before hydration, which matters for a
   page whose answers are the objection handling.

   The FAQPage structured data is generated from the same array that renders
   the list, so the two cannot drift apart. */
export function Faq({
  items,
  withStructuredData = true,
}: {
  items: { q: string; a: string }[];
  withStructuredData?: boolean;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      {withStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      )}

      <RevealGroup className="overflow-hidden rounded-lg border border-border-line">
        {items.map((item) => (
          <RevealItem key={item.q}>
            <details className="group border-b border-border-soft bg-surface-1/40 last:border-b-0 open:bg-surface-1">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 px-6 py-5 transition-colors duration-300 hover:bg-surface-1 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-[-2px] [&::-webkit-details-marker]:hidden">
                <h3 className="font-display text-[1rem] leading-snug font-medium text-fg">
                  {item.q}
                </h3>
                <span
                  aria-hidden="true"
                  className="relative mt-[7px] h-[9px] w-[9px] shrink-0"
                >
                  <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-accent" />
                  <span className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-accent transition-transform duration-300 group-open:scale-y-0" />
                </span>
              </summary>
              <p className="max-w-[68ch] px-6 pb-6 text-[0.93rem] leading-[1.72] font-light text-fg-secondary">
                {item.a}
              </p>
            </details>
          </RevealItem>
        ))}
      </RevealGroup>
    </>
  );
}
