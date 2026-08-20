import { SectionHeader } from "@/components/ui/SectionHeader";
import { InstallTimeline } from "@/components/product/InstallTimeline";

/* Spec section 6.15. */
export function InstallSection() {
  return (
    <section className="border-t border-border-soft py-24 md:py-28">
      <div className="shell">
        <SectionHeader
          label="// The install, and what the fee buys"
          title={
            <>Thirty days from signature to an operator that knows your practice.</>
          }
        />
        <div className="mt-16">
          <InstallTimeline />
        </div>
      </div>
    </section>
  );
}
