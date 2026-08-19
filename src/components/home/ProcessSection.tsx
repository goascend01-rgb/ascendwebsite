import { PROCESS } from "@/lib/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { RevealGroup, RevealItem, Reveal } from "@/components/ui/Reveal";

export function ProcessSection() {
  return (
    <section className="py-28">
      <div className="shell">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeader
            label="// How it works"
            title="Hired and working in a week, not a quarter."
          />
          <Reveal delay={0.2}>
            <ButtonLink href="/how-it-works" variant="ghost">
              See the full process →
            </ButtonLink>
          </Reveal>
        </div>

        <RevealGroup className="mt-16 grid gap-px overflow-hidden rounded-xl border border-border-line bg-border-soft md:grid-cols-4">
          {PROCESS.map((step) => (
            <RevealItem key={step.index}>
              <div className="flex h-full flex-col bg-surface-1 p-7">
                <div className="flex items-center justify-between">
                  <span className="font-display text-3xl font-semibold text-fg-muted">
                    {step.index}
                  </span>
                  <span className="font-mono text-[0.62rem] tracking-wider text-accent uppercase">
                    {step.day}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-base font-medium text-fg">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-secondary font-light">
                  {step.desc}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
