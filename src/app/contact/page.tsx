import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { LeakReportForm } from "@/components/forms/LeakReportForm";
import { LEAKS, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book the 20-minute call",
  description:
    "Send us your last twelve months and we will run your own numbers through the four leaks, with every assumption named and arguable. If the number is not big enough to justify the fee, we will tell you on the call.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="// The ask"
        title={<>Send us your last twelve months.</>}
        lead="We will run your own numbers through the four leaks and show you the actual figure for your practice, with every assumption named and arguable. Twenty minutes. If the number is not big enough to justify the fee, we will tell you on the call."
      />

      <section className="pb-24 md:pb-28">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
            <div>
              <LeakReportForm />
            </div>

            <aside className="lg:pt-2">
              <Reveal delay={0.1}>
                <div className="rounded-lg border border-border-line bg-surface-1 p-7">
                  <h2 className="label-mono">{"// What happens next"}</h2>
                  <p className="mt-6 text-[0.93rem] leading-[1.7] font-light text-fg-secondary">
                    We reply within one business day with a time. Before the call
                    we ask for an export of your last twelve months of appointments
                    if you have one. If you do not, the call still works and we use
                    ranges instead.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.16}>
                <div className="mt-5 rounded-lg border border-border-line bg-bg p-7">
                  <h2 className="label-mono">{"// What we run it through"}</h2>
                  <ol className="mt-6 space-y-3.5">
                    {LEAKS.map((leak) => (
                      <li key={leak.index} className="flex gap-3.5">
                        <span className="mt-[2px] font-mono text-[0.7rem] tabular-nums text-fg-muted">
                          {leak.index}
                        </span>
                        <span className="text-[0.89rem] leading-[1.55] font-light text-fg-secondary">
                          {leak.title}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>

              <Reveal delay={0.22}>
                <p className="mt-5 px-1 text-[0.85rem] leading-[1.7] font-light text-fg-tertiary">
                  Prefer email? Write to{" "}
                  <a
                    href={`mailto:${SITE.email}`}
                    className="text-accent underline-offset-4 transition-colors duration-300 hover:text-accent-bright hover:underline"
                  >
                    {SITE.email}
                  </a>{" "}
                  and we will reply the same way.
                </p>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
