import { NETWORK_MECHANICS, NETWORK_UNIQUE_CLOSE } from "@/lib/capabilities";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

/* Why this is not a feature anybody can copy.

   The temptation on a moat page is to write adjectives. Adjectives are
   what every competitor writes, so they carry nothing. Each of these six
   is a mechanism with a consequence: the thing it does, and the failure it
   prevents that a product built the ordinary way cannot recover from
   later. That is the argument, and it only works in specifics. */
export function NetworkMechanics() {
  return (
    <section className="border-t border-border-soft py-24 md:py-28">
      <div className="shell">
        <SectionHeader
          label="// Why this cannot simply be copied"
          title={
            <>
              Six decisions taken before the first practice joined.{" "}
              <span className="text-fg-secondary">
                None of them can be added afterwards.
              </span>
            </>
          }
          lead="Every one of these had to be true on day one of the schema. A competitor who ships a shared learning feature next year inherits data that was never captured this way, and there is no migration back."
        />

        <RevealGroup className="mt-16 grid gap-5 md:grid-cols-2">
          {NETWORK_MECHANICS.map((item) => (
            <RevealItem key={item.index} className="h-full">
              <article className="flex h-full flex-col rounded-lg border border-border-line bg-surface-1 p-7 transition-colors duration-500 hover:border-border-strong hover:bg-surface-2 md:p-8">
                <span className="font-mono text-[0.72rem] tabular-nums tracking-[0.14em] text-accent">
                  {item.index}
                </span>
                <h3 className="mt-5 font-display text-[1.16rem] leading-snug font-medium text-fg">
                  {item.title}
                </h3>
                <p className="mt-4 text-[0.98rem] leading-[1.72] font-light text-fg-secondary">
                  {item.body}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.12}>
          <div className="mt-12 rounded-lg border border-border-strong bg-surface-2 p-7 md:p-9">
            <p className="max-w-[70ch] font-display text-[1.14rem] leading-[1.65] font-light text-fg">
              {NETWORK_UNIQUE_CLOSE}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
