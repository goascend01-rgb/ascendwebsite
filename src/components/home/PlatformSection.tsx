import Link from "next/link";
import { DOMAINS } from "@/lib/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

/* The six domains (spec section 6.6). Every line is verified against the
   shipped code.

   The closing panel is not a disclaimer that slipped through. It costs one
   feature and buys the credibility of every other line on the page, so it
   is designed to be read, not tucked into small print. */
export function PlatformSection() {
  return (
    <section id="what-it-does" className="scroll-mt-24 border-t border-border-soft py-24 md:py-32">
      <div className="shell">
        <SectionHeader
          label="// What it actually does, all day"
          title={<>One system where seven used to be.</>}
        />

        <RevealGroup className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DOMAINS.map((domain) => (
            <RevealItem key={domain.id} className="h-full">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-border-line bg-surface-1 p-7 transition-colors duration-500 hover:border-border-strong hover:bg-surface-2">
                {/* accent hairline grows across the top edge on hover */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-700 ease-out group-hover:scale-x-100"
                />

                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-mono text-[0.64rem] tracking-[0.2em] text-accent uppercase">
                    {domain.eyebrow}
                  </span>
                  <span className="font-mono text-[0.62rem] tracking-[0.14em] text-fg-muted uppercase">
                    {domain.name}
                  </span>
                </div>

                <p className="mt-7 text-[0.92rem] leading-[1.7] font-light text-fg-secondary">
                  {domain.summary}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-col gap-5 rounded-lg border border-border-line bg-bg p-7 sm:flex-row sm:items-center sm:gap-8 md:p-8">
            <span className="w-fit shrink-0 rounded-sm border border-border-strong px-3 py-1.5 font-mono text-[0.62rem] tracking-[0.18em] text-fg-muted uppercase">
              Not built
            </span>
            <p className="text-[0.98rem] leading-[1.65] font-light text-fg-secondary">
              Ascend does not answer your phone. That is on the roadmap and it is
              not built, so we do not sell it.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <Link
            href="/platform"
            className="group mt-10 inline-flex items-center gap-3 font-mono text-[0.78rem] tracking-[0.08em] text-accent transition-colors duration-300 hover:text-accent-bright"
          >
            Each of the six, in depth, including where it stops
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
