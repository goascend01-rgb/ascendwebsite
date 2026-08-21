import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Faq } from "@/components/ui/Faq";
import { TierCards } from "@/components/pricing/TierCards";
import { Calculator } from "@/components/pricing/Calculator";
import { CostComparison } from "@/components/home/CostComparison";
import { InstallSection } from "@/components/home/InstallSection";
import { Protection } from "@/components/home/Protection";
import { CtaSection } from "@/components/home/CtaSection";
import { PRICING_FAQ } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Pricing",
  description:
    "Three tiers from PKR 24,000 to PKR 150,000 a month, and a founding price of PKR 35,000 for the first twenty practices. Billed monthly by bank transfer, thirty days notice, no exit fee, and no money-back guarantee: a ninety day working commitment instead.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <>
      <PageHero
        label="// Pricing"
        title={<>Three tiers. The difference is how much of the running you do.</>}
        lead="Billed monthly by bank transfer. Multi-site is priced per location with a real discount at scale, and the first twenty practices hold a founding price for the life of the account."
      />

      <section className="pb-8">
        <div className="shell">
          <TierCards headingLevel={2} />
        </div>
      </section>

      <CostComparison />
      <Calculator />
      <InstallSection />
      <Protection />

      <section className="border-t border-border-soft py-24 md:py-28">
        <div className="shell">
          <SectionHeader
            label="// Questions a buyer actually asks"
            title={<>The objections, answered before the call.</>}
          />
          <div className="mt-14">
            <Faq items={PRICING_FAQ} />
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
