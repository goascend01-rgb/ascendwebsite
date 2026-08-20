import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/* Shared opening for every inner page. One shape, so a visitor always knows
   where the eyebrow, the claim and the qualifier will be. */
export function PageHero({
  label,
  title,
  lead,
  children,
}: {
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="pt-[128px] pb-16 md:pt-[164px] md:pb-20">
      <div className="shell">
        <Reveal>
          <p className="label-mono text-accent">{label}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="display mt-6 max-w-[20ch] text-[clamp(2.2rem,5.4vw,3.9rem)] text-fg">
            {title}
          </h1>
        </Reveal>
        {lead && (
          <Reveal delay={0.16}>
            <p className="mt-8 max-w-[58ch] text-[1.05rem] leading-[1.68] font-light text-fg-secondary">
              {lead}
            </p>
          </Reveal>
        )}
        {children && (
          <Reveal delay={0.24}>
            <div className="mt-10">{children}</div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
