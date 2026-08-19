import Link from "next/link";
import { ROLES } from "@/lib/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

export function StaffingSection() {
  return (
    <section id="staffing" className="scroll-mt-24 py-28">
      <div className="shell">
        <SectionHeader
          label="// Staffing"
          title={
            <>
              The seats you can&apos;t fill,{" "}
              <span className="text-fg-muted font-light">handled by people</span>{" "}
              you didn&apos;t train.
            </>
          }
          lead="Every person we place is already trained on the software you run. You decide who joins the team; we handle everything that comes before."
        />

        <RevealGroup className="mt-16 grid gap-px overflow-hidden rounded-xl border border-border-line bg-border-soft md:grid-cols-3">
          {ROLES.map((role) => (
            <RevealItem key={role.slug}>
              <Link
                href={`/roles/${role.slug}`}
                className="group flex h-full flex-col bg-surface-1 p-8 transition-colors duration-300 hover:bg-surface-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs tracking-[0.16em] text-fg-tertiary">
                    {role.index}
                  </span>
                  <span className="font-mono text-[0.6rem] tracking-wider text-fg-muted uppercase">
                    {role.tools[0]} · {role.tools[1]}
                  </span>
                </div>

                <h3 className="mt-7 font-display text-xl font-medium text-fg">
                  {role.name}
                </h3>
                <p className="mt-2 text-sm font-medium text-accent">
                  {role.tagline}
                </p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-fg-secondary font-light">
                  {role.blurb}
                </p>

                <div className="mt-7 flex items-end justify-between border-t border-border-soft pt-5">
                  <div>
                    <div className="font-display text-lg font-semibold text-fg">
                      ${role.price.toLocaleString()}
                      <span className="text-xs font-normal text-fg-tertiary">
                        {" "}
                        / mo
                      </span>
                    </div>
                    <div className="mt-0.5 font-mono text-[0.6rem] tracking-wider text-fg-muted uppercase line-through">
                      ${role.inHouse.toLocaleString()} in-house
                    </div>
                  </div>
                  <span className="font-mono text-xs text-accent opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                    View role →
                  </span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
