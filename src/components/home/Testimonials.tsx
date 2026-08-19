import { TESTIMONIALS } from "@/lib/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

function initials(name: string) {
  return name
    .replace(/^Dr\.?\s*/, "")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
}

function Avatar({ name }: { name: string }) {
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-2 font-display text-sm font-semibold text-fg-secondary">
      {initials(name)}
    </div>
  );
}

export function Testimonials() {
  const [featured, ...rest] = TESTIMONIALS;

  return (
    <section className="py-28">
      <div className="shell">
        <SectionHeader
          label="// Proof"
          title={
            <>
              Practices that stopped{" "}
              <span className="text-fg-muted font-light">hiring the hard way.</span>
            </>
          }
          align="center"
        />

        <Reveal delay={0.18}>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
            <span className="tracking-[0.25em] text-accent">★★★★★</span>
            <span className="text-fg">
              4.9<span className="text-fg-tertiary">/5 average</span>
            </span>
            <span className="text-fg-muted">·</span>
            <span className="text-fg-secondary">120+ practices</span>
            <span className="text-fg-muted">·</span>
            <span className="text-fg-secondary">98% 12-month retention</span>
          </div>
        </Reveal>

        {/* featured quote — larger, editorial */}
        <Reveal delay={0.1}>
          <figure className="mt-14 grid gap-10 rounded-2xl border border-border-line bg-surface-1 p-8 md:grid-cols-[1.7fr_1fr] md:p-12">
            <blockquote className="font-display text-[clamp(1.5rem,2.8vw,2.1rem)] font-light leading-snug tracking-[-0.01em] text-fg">
              <span className="mr-1 text-accent">“</span>
              {featured.quote}
            </blockquote>
            <div className="flex flex-col justify-between gap-8 md:border-l md:border-border-soft md:pl-10">
              {featured.metric && (
                <div>
                  <div className="font-display text-4xl font-semibold text-accent">
                    {featured.metric}
                  </div>
                  <div className="mt-1.5 font-mono text-[0.62rem] tracking-wider text-fg-tertiary uppercase">
                    Reported by the practice
                  </div>
                </div>
              )}
              <figcaption className="flex items-center gap-3.5">
                <Avatar name={featured.name} />
                <div>
                  <div className="text-sm font-medium text-fg">
                    {featured.name}
                  </div>
                  <div className="text-xs text-fg-tertiary">
                    {featured.title} · {featured.org}
                  </div>
                </div>
              </figcaption>
            </div>
          </figure>
        </Reveal>

        {/* supporting quotes */}
        <RevealGroup className="mt-5 grid gap-5 md:grid-cols-3">
          {rest.map((t) => (
            <RevealItem key={t.name}>
              <figure className="flex h-full flex-col rounded-xl border border-border-line bg-surface-1 p-7 transition-colors duration-300 hover:border-border-strong">
                {t.metric && (
                  <div className="mb-4 inline-flex w-fit items-center rounded-full bg-accent-dim px-3 py-1 font-mono text-[0.64rem] tracking-wider text-accent">
                    {t.metric}
                  </div>
                )}
                <blockquote className="flex-1 text-[0.98rem] leading-relaxed text-fg-secondary font-light">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border-soft pt-5">
                  <Avatar name={t.name} />
                  <div>
                    <div className="text-sm font-medium text-fg">{t.name}</div>
                    <div className="text-xs text-fg-tertiary">{t.org}</div>
                  </div>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
