import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SubprocessorTable } from "@/components/legal/LegalLayout";
import { CtaSection } from "@/components/home/CtaSection";
import { SECURITY_SECTIONS, SUBPROCESSORS } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Data and security",
  description:
    "Where patient data lives, which vendors are deliberately blind to it, how access is controlled by row level security, and why every clinical read writes an audit row in the same transaction.",
  path: "/security",
});

export default function SecurityPage() {
  const phiVendors = SUBPROCESSORS.filter((s) => s.processesPatientData);

  return (
    <>
      <PageHero
        label="// Data and security"
        title={<>Where your patients&apos; data lives, and who can reach it.</>}
        lead="Every statement on this page describes how the system is built today, not how we intend to build it. Architecture is checkable in a way that a policy promise is not."
      />

      <section className="border-t border-border-soft py-20 md:py-24">
        <div className="shell">
          <RevealGroup className="grid gap-5 md:grid-cols-2">
            {SECURITY_SECTIONS.map((section, i) => (
              <RevealItem key={section.title} className="h-full">
                <article className="flex h-full flex-col rounded-lg border border-border-line bg-surface-1 p-7">
                  <div className="flex items-baseline gap-3.5">
                    <span className="font-mono text-[0.7rem] tabular-nums text-fg-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-mono text-[0.68rem] tracking-[0.18em] text-accent uppercase">
                      {section.title}
                    </h2>
                  </div>
                  <p className="mt-5 text-[1rem] leading-[1.72] font-light text-fg-secondary">
                    {section.body}
                  </p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="shell">
          <SectionHeader
            label="// Subprocessors"
            title={
              <>
                {phiVendors.length} vendors may touch patient data. That is the
                whole list.
              </>
            }
            lead="Publishing this table is unusual, and it is the point. A careful buyer can check every name on it, and the ones marked no are architected so patient data cannot reach them."
          />

          <Reveal delay={0.12}>
            <div className="mt-12">
              <SubprocessorTable rows={SUBPROCESSORS} />
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-6 max-w-[64ch] text-[0.93rem] leading-[1.7] font-light text-fg-tertiary">
              Patient data is processed by {phiVendors.length} vendors and no
              others:{" "}
              {phiVendors.map((v) => v.name).join(", ")}. Everything else on this
              list is deliberately blind to it.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-12 rounded-lg border border-border-line bg-bg p-7 md:p-8">
              <p className="max-w-[68ch] text-[0.99rem] leading-[1.72] font-light text-fg-secondary">
                Ascend acts as a business associate to your practice. HIPAA
                compliance is a shared responsibility and we will walk through the
                agreement on the call. We do not print a certification badge,
                because no such certification exists.
              </p>
              <p className="mt-5 text-[0.93rem] leading-[1.7] font-light text-fg-tertiary">
                The full detail of what we collect and why is in the{" "}
                <Link
                  href="/legal/privacy"
                  className="text-accent underline-offset-4 transition-colors duration-300 hover:text-accent-bright hover:underline"
                >
                  privacy policy
                </Link>
                , and deletion instructions are{" "}
                <Link
                  href="/legal/data-deletion"
                  className="text-accent underline-offset-4 transition-colors duration-300 hover:text-accent-bright hover:underline"
                >
                  here
                </Link>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
