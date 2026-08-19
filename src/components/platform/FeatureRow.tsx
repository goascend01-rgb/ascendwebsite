import type { PlatformFeature } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { MOCKS } from "./mocks";

export function FeatureRow({
  feature,
  reverse,
}: {
  feature: PlatformFeature;
  reverse: boolean;
}) {
  const Visual = MOCKS[feature.id];
  return (
    <div
      id={feature.id}
      className="grid scroll-mt-28 gap-12 lg:grid-cols-2 lg:items-center lg:gap-20"
    >
      {/* text */}
      <Reveal className={reverse ? "lg:order-2" : ""}>
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-accent-dim px-3 py-1 font-mono text-[0.66rem] tracking-wider text-accent uppercase">
            {feature.tag}
          </span>
          <span className="font-mono text-xs tracking-[0.16em] text-fg-tertiary">
            {feature.index}
          </span>
        </div>

        <h3 className="display mt-6 text-[clamp(1.9rem,3.8vw,2.8rem)] text-fg">
          {feature.headline}
        </h3>
        <p className="mt-2 font-display text-sm font-medium tracking-wide text-fg-tertiary">
          {feature.name}
        </p>

        <p className="mt-5 max-w-lg text-[1.05rem] leading-relaxed text-fg-secondary font-light">
          {feature.desc}
        </p>

        <ul className="mt-7 grid gap-3 sm:grid-cols-2">
          {feature.outcomes.map((o) => (
            <li
              key={o}
              className="flex items-start gap-2.5 text-sm text-fg-secondary"
            >
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent-dim font-mono text-[0.6rem] text-accent">
                ✓
              </span>
              {o}
            </li>
          ))}
        </ul>

        <div className="mt-8 inline-flex items-baseline gap-3 rounded-lg border border-border-soft bg-surface-1/60 px-5 py-3">
          <span className="font-display text-2xl font-semibold text-accent">
            {feature.metric.value}
          </span>
          <span className="font-mono text-[0.66rem] tracking-wider text-fg-tertiary uppercase">
            {feature.metric.label}
          </span>
        </div>
      </Reveal>

      {/* visual */}
      <Reveal delay={0.1} className={reverse ? "lg:order-1" : ""}>
        <Visual />
      </Reveal>
    </div>
  );
}
