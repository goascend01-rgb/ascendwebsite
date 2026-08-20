import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { PatternTravel } from "@/components/product/PatternTravel";
import { NETWORK } from "@/lib/site";

/* The moat (spec sections 6.7 and 6.8). This is the one argument a
   competitor cannot copy in a year, so it gets the loudest moment on the
   page: full-bleed dark panel, the headline broken across two lines with
   the second unlit, and the publication floor stated as a hard number
   because it is a policy constant rather than a marketing figure. */
export function NetworkSection() {
  return (
    <section className="relative overflow-hidden border-y border-border-line bg-surface-1/40 py-24 md:py-32">
      {/* a quiet field of nodes, masked out at the edges */}
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 opacity-60"
        style={{
          maskImage: "radial-gradient(ellipse at 50% 0%, #000 0%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 0%, #000 0%, transparent 70%)",
        }}
      />

      <div className="shell relative">
        <Reveal>
          <p className="label-mono text-accent">{"// The part nobody else has"}</p>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="display mt-7 max-w-[22ch] text-[clamp(1.9rem,4.6vw,3.5rem)] text-fg">
            Every practice on Ascend makes every other practice better.{" "}
            <span className="text-fg-muted">
              None of them ever sees another&apos;s numbers.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-9 max-w-[62ch] text-[1.02rem] leading-[1.7] font-light text-fg-secondary">
            This is the whole argument. Everything above this line, a determined
            competitor could copy in a year. This they cannot, because it is not
            a feature. It is what happens when a network of practices contributes
            evidence to a system built from the first day to keep every
            practice&apos;s numbers inside its own walls.
          </p>
        </Reveal>

        <div className="mt-20 border-t border-border-line pt-14">
          <Reveal>
            <p className="label-mono">
              {"// How a pattern travels between practices"}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h3 className="display mt-6 max-w-[24ch] text-[clamp(1.5rem,3.2vw,2.3rem)] text-fg">
              The network supplies the principle.{" "}
              <span className="text-fg-muted">
                Your practice supplies every number.
              </span>
            </h3>
          </Reveal>

          <div className="mt-14">
            <PatternTravel />
          </div>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-16 flex flex-col gap-6 border-t border-border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[46ch] text-[0.9rem] leading-[1.65] font-light text-fg-tertiary">
              Nothing publishes until at least{" "}
              <span className="text-fg">
                {NETWORK.minIndependentPractices} independent practices
              </span>{" "}
              and{" "}
              <span className="text-fg">
                {NETWORK.minObservations} separate observations
              </span>{" "}
              support it. Both are policy constants, not editorial judgement.
            </p>
            <Link
              href="/network"
              className="group inline-flex shrink-0 items-center gap-3 font-mono text-[0.78rem] tracking-[0.08em] text-accent transition-colors duration-300 hover:text-accent-bright"
            >
              How a pattern travels between practices
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
