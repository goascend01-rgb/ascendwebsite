import { Hero } from "@/components/home/Hero";
import { StatsStrip } from "@/components/home/StatsStrip";
import { TrustedBy } from "@/components/home/TrustedBy";
import { StaffingSection } from "@/components/home/StaffingSection";
import { PlatformSection } from "@/components/home/PlatformSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { Testimonials } from "@/components/home/Testimonials";
import { CtaSection } from "@/components/home/CtaSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <TrustedBy />
      <StaffingSection />
      <PlatformSection />
      <ProcessSection />
      <Testimonials />
      <CtaSection />
    </>
  );
}
