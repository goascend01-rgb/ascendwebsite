import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Hero } from "@/components/home/Hero";
import { OpeningQuestion } from "@/components/home/OpeningQuestion";
import { Leaks } from "@/components/home/Leaks";
import { EveryDay } from "@/components/home/EveryDay";
import { ProductTruth } from "@/components/home/ProductTruth";
import { SoftwareVsOperator } from "@/components/home/SoftwareVsOperator";
import { PlatformSection } from "@/components/home/PlatformSection";
import { IntelligenceLayers } from "@/components/home/IntelligenceLayers";
import { NetworkSection } from "@/components/home/NetworkSection";
import { PrivacyContract } from "@/components/home/PrivacyContract";
import { TrustLadder } from "@/components/home/TrustLadder";
import { Calculator } from "@/components/pricing/Calculator";
import { CostComparison } from "@/components/home/CostComparison";
import { Testimonials } from "@/components/home/Testimonials";
import { PricingPreview } from "@/components/home/PricingPreview";
import { InstallSection } from "@/components/home/InstallSection";
import { Protection } from "@/components/home/Protection";
import { FoundingCohort } from "@/components/home/FoundingCohort";
import { StaffingSection } from "@/components/home/StaffingSection";
import { CtaSection } from "@/components/home/CtaSection";
import { SITE, TIERS } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Ascend · The AI operator for independent practices",
  description:
    "Ascend answers every enquiry across chat, SMS, WhatsApp, Instagram and Messenger, refills the chair a cancellation empties, brings back patients who quietly stopped coming, and shows its reasoning before it acts. Assisted by default.",
  path: "/",
});

/* Organization and SoftwareApplication only. No AggregateRating field: an
   invented rating is both a lie and a Google penalty risk, so the property
   is omitted entirely rather than set to a placeholder. */
function StructuredData() {
  const operator = TIERS.find((t) => t.id === "operator");

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE.url}/#organization`,
        name: SITE.name,
        url: SITE.url,
        email: SITE.email,
        description:
          "An operating system for independent, appointment-based practices. Ascend runs the revenue-critical follow-ups a practice never has hands for, and shows its reasoning before it acts.",
        logo: `${SITE.url}/brand/ascend-icon.png`,
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE.url}/#software`,
        name: "Ascend Operator",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: SITE.url,
        publisher: { "@id": `${SITE.url}/#organization` },
        description:
          "An AI operator for independent practices: front desk across chat, SMS, WhatsApp, Instagram and Facebook Messenger, slot fill when a chair frees up, patient reactivation from your own visit history, reputation, content and a ranked queue of recommendations that each carry their reason.",
        offers: {
          "@type": "Offer",
          price: operator?.monthly,
          priceCurrency: "USD",
          category: "subscription",
          url: `${SITE.url}/pricing`,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <Hero />
      <OpeningQuestion />
      <Leaks />
      <EveryDay />
      <ProductTruth />
      <SoftwareVsOperator />
      <PlatformSection />
      <IntelligenceLayers />
      <NetworkSection />
      <PrivacyContract />
      <TrustLadder />
      <Calculator />
      <CostComparison />
      <Testimonials />
      <PricingPreview />
      <InstallSection />
      <Protection />
      <FoundingCohort />
      <StaffingSection />
      <CtaSection />
    </>
  );
}
