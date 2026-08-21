import { TESTIMONIALS } from "@/lib/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

/* Spec section 6.13.

   Attribution is role plus practice shape plus region, never an invented
   person or business. Nothing here can be searched and found missing. No
   avatars either: a face or an initial circle would imply a specific
   person, which is exactly the claim this shape exists to avoid. No
   ratings, no logos, no aggregate counts. */
export function Testimonials() {
  return (
    <section className="border-t border-border-soft py-24 md:py-28">
      <div className="shell">
        <SectionHeader
          label="// What we are building toward"
          title={<>What we intend a practice to be able to say.</>}
        />

        <RevealGroup className="mt-16 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <RevealItem key={t.attribution} className="h-full">
              <figure className="flex h-full flex-col rounded-lg border border-border-line bg-surface-1 p-7 transition-colors duration-500 hover:border-border-strong">
                <span
                  aria-hidden="true"
                  className="font-display text-[2rem] leading-none text-fg-muted"
                >
                  &ldquo;
                </span>
                <blockquote className="mt-3 flex-1 text-[0.98rem] leading-[1.68] font-light text-fg-secondary">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-7 border-t border-border-soft pt-5 font-mono text-[0.68rem] leading-relaxed tracking-[0.1em] text-fg-tertiary uppercase">
                  {t.attribution}
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
