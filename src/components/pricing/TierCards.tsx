import { TIERS } from "@/lib/site";
import { money } from "@/lib/leak";
import { ButtonLink } from "@/components/ui/Button";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

/* The three tiers. Shared by the homepage preview and by /pricing, because
   a price that renders differently in two places is a price somebody will
   eventually get wrong.

   Included and excluded lines are marked with hairlines rather than glyphs:
   a lit rule for what you get, an unlit one for what you do not. */

function Line({ text, included }: { text: string; included: boolean }) {
  return (
    <li className="flex gap-3">
      <span
        aria-hidden="true"
        className={`mt-[0.62rem] h-px w-3 shrink-0 ${
          included ? "bg-accent" : "bg-fg-muted"
        }`}
      />
      <span
        className={`text-[0.88rem] leading-[1.6] font-light ${
          included ? "text-fg-secondary" : "text-fg-muted"
        }`}
      >
        <span className="sr-only">{included ? "Included: " : "Not included: "}</span>
        {text}
      </span>
    </li>
  );
}

export function TierCards({ condensed = false }: { condensed?: boolean }) {
  return (
    <RevealGroup className="grid gap-5 lg:grid-cols-3">
      {TIERS.map((tier) => {
        const visible = condensed ? tier.includes.slice(0, 5) : tier.includes;
        const remaining = tier.includes.length - visible.length;

        return (
          <RevealItem key={tier.id} className="h-full">
            <article
              className={`relative flex h-full flex-col rounded-lg border p-7 transition-colors duration-500 md:p-8 ${
                tier.highlight
                  ? "border-accent/40 bg-surface-2"
                  : "border-border-line bg-surface-1 hover:border-border-strong"
              }`}
            >
              {tier.highlight && (
                <span className="absolute -top-[9px] left-7 rounded-sm bg-accent px-2.5 py-1 font-mono text-[0.58rem] font-bold tracking-[0.16em] text-on-accent uppercase">
                  The one to take
                </span>
              )}

              <p className="font-mono text-[0.6rem] tracking-[0.18em] text-fg-tertiary uppercase">
                {tier.eyebrow}
              </p>
              <h3 className="mt-4 font-display text-[1.6rem] font-medium text-fg">
                {tier.name}
              </h3>

              <p className="mt-5 flex items-baseline gap-2">
                <span
                  className={`font-display text-[2.1rem] leading-none font-semibold tabular-nums ${
                    tier.highlight ? "text-accent" : "text-fg"
                  }`}
                >
                  {money(tier.monthly)}
                </span>
                <span className="font-mono text-[0.68rem] tracking-[0.12em] text-fg-tertiary uppercase">
                  / month
                </span>
              </p>
              <p className="mt-2 font-mono text-[0.68rem] tracking-[0.1em] text-fg-muted uppercase">
                Install {money(tier.install)}
              </p>

              <ul className="mt-7 flex-1 space-y-2.5 border-t border-border-soft pt-6">
                {visible.map((line) => (
                  <Line key={line} text={line} included />
                ))}
                {remaining > 0 && (
                  <li className="pt-1 pl-6 font-mono text-[0.68rem] tracking-[0.1em] text-fg-muted uppercase">
                    plus {remaining} more
                  </li>
                )}
                {!condensed &&
                  tier.excludes?.map((line) => (
                    <Line key={line} text={line} included={false} />
                  ))}
              </ul>

              <div className="mt-8">
                <ButtonLink
                  href="/contact"
                  variant={tier.highlight ? "primary" : "ghost"}
                  className="w-full"
                >
                  Book the 20-minute call
                </ButtonLink>
              </div>
            </article>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
