import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Mark } from "@/components/ui/Logo";

export function CtaSection() {
  return (
    <section className="py-28">
      <div className="shell">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-border-line bg-surface-1 px-8 py-20 text-center md:px-16 md:py-28">
            {/* ambient accent wash */}
            <div
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                background:
                  "radial-gradient(circle at 50% 120%, var(--accent-dim), transparent 60%)",
              }}
            />
            <Mark className="relative mx-auto h-10 w-10 text-accent" />
            <h2 className="display relative mt-8 text-[clamp(2.2rem,5vw,3.6rem)] text-fg">
              Grow without the hiring.
            </h2>
            <p className="relative mx-auto mt-5 max-w-md text-[1.05rem] leading-relaxed text-fg-secondary font-light">
              Book a 20-minute demo. We&apos;ll map your roles, show you the AI in
              action, and put a deployment plan in front of you. No upfront cost.
            </p>
            <div className="relative mt-9 flex flex-wrap justify-center gap-4">
              <ButtonLink href="/contact" variant="primary" size="lg">
                Book a demo →
              </ButtonLink>
              <ButtonLink href="/pricing" variant="ghost" size="lg">
                See pricing
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
