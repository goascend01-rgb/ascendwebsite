import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { TierCards } from "@/components/pricing/TierCards";

/* Spec section 6.14: the tiers condensed, with the full argument at
   /pricing. */
export function PricingPreview() {
  return (
    <section className="py-24 md:py-28">
      <div className="shell">
        <SectionHeader
          label="// Pricing"
          title={<>Three tiers. The difference is how much of the running you do.</>}
          lead="Annual is two months free on any tier. Groups and multi-site are priced per location with a real discount at scale."
        />

        <div className="mt-16">
          <TierCards condensed />
        </div>

        <Reveal delay={0.12}>
          <Link
            href="/pricing"
            className="group mt-10 inline-flex items-center gap-3 font-mono text-[0.78rem] tracking-[0.08em] text-accent transition-colors duration-300 hover:text-accent-bright"
          >
            Everything in each tier, and the questions a buyer actually asks
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <span aria-hidden="true">→</span>
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
