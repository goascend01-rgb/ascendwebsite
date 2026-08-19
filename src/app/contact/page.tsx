import type { Metadata } from "next";
import { DemoForm } from "@/components/forms/DemoForm";
import { Reveal } from "@/components/ui/Reveal";
import { STATS, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a demo",
  description:
    "Book a 20-minute demo with Ascend. We'll map your roles, show the AI platform in action, and build a deployment plan. No upfront cost.",
};

export default function ContactPage() {
  return (
    <div className="pt-36 md:pt-44">
      <section className="shell grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        {/* left: pitch */}
        <div className="lg:sticky lg:top-28">
          <Reveal>
            <span className="label-mono text-accent">{"// Book a demo"}</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="display mt-5 text-[clamp(2.4rem,5.5vw,4rem)] text-fg">
              Let&apos;s map your{" "}
              <span className="text-fg-muted font-light">first hire.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-md text-[1.08rem] leading-relaxed text-fg-secondary font-light">
              Twenty minutes. We&apos;ll learn your workflows, show you the right
              talent and the AI platform live, and give you a deployment plan and
              exact pricing.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border-line bg-border-soft">
              {STATS.map((s) => (
                <div key={s.label} className="bg-surface-1 px-5 py-6">
                  <div
                    className={`font-display text-2xl font-semibold ${
                      s.accent ? "text-accent" : "text-fg"
                    }`}
                  >
                    {s.value}
                  </div>
                  <div className="mt-1.5 font-mono text-[0.6rem] tracking-wider text-fg-tertiary uppercase">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-col gap-2 text-sm text-fg-secondary">
              <a
                href={`mailto:${SITE.email}`}
                className="transition-colors hover:text-accent"
              >
                {SITE.email}
              </a>
              <span className="text-fg-tertiary">{SITE.phone}</span>
            </div>
          </Reveal>
        </div>

        {/* right: form */}
        <Reveal delay={0.12}>
          <DemoForm />
        </Reveal>
      </section>

      <div className="h-20" />
    </div>
  );
}
