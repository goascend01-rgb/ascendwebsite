import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/* Mono telemetry label + large headline, with optional lead paragraph. */
export function SectionHeader({
  label,
  title,
  lead,
  align = "left",
  className = "",
}: {
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const isCenter = align === "center";
  return (
    <div
      className={`${isCenter ? "mx-auto max-w-2xl text-center" : "max-w-3xl"} ${className}`}
    >
      <Reveal>
        <div
          className={`label-mono flex items-center gap-3.5 ${
            isCenter ? "justify-center" : ""
          }`}
        >
          <span className="text-accent">{label}</span>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="display mt-5 text-[clamp(2rem,4.4vw,3.4rem)] text-fg">
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.16}>
          <p
            className={`mt-5 text-[1.05rem] leading-relaxed text-fg-secondary font-light ${
              isCenter ? "mx-auto" : ""
            } max-w-xl`}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}
