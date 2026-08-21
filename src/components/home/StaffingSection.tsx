import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { ROLES } from "@/lib/staffing";

/* Staffing is the secondary business, so on the homepage it is a
   cross-link and nothing more. The full story lives at /staffing. No
   placement count, no client, no retention rate: the capability is
   offered, not proven. */
export function StaffingSection() {
  return (
    <section className="py-16 md:py-20">
      <div className="shell">
        <Reveal>
          <Link
            href="/staffing"
            className="group flex flex-col gap-6 rounded-lg border border-border-line bg-surface-1 p-7 transition-colors duration-500 hover:border-border-strong hover:bg-surface-2 md:flex-row md:items-center md:gap-10 md:p-9"
          >
            <div className="min-w-0 flex-1">
              <p className="label-mono">{"// Also from Ascend"}</p>
              <h2 className="mt-4 font-display text-[1.28rem] leading-snug font-medium text-fg">
                Some practices need a person, not an operator.
              </h2>
              <p className="mt-3 max-w-[58ch] text-[0.98rem] leading-[1.7] font-light text-fg-secondary">
                Ascend Staffing places pre-trained remote professionals:{" "}
                {ROLES.map((r) => r.short.toLowerCase()).join(", ")}. Deployed in
                days, and you pay only after you hire.
              </p>
            </div>

            <span className="inline-flex shrink-0 items-center gap-3 font-mono text-[0.76rem] tracking-[0.08em] text-accent transition-colors duration-300 group-hover:text-accent-bright">
              See staffing
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <span aria-hidden="true">→</span>
              </span>
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
