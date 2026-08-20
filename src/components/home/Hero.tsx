"use client";

import { motion } from "motion/react";
import { ButtonLink } from "@/components/ui/Button";
import { RecommendationCard } from "@/components/product/RecommendationCard";

const ease = [0.2, 0.7, 0.2, 1] as const;

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease, delay },
});

const CHIPS = [
  "Assisted by default",
  "Built for HIPAA",
  "Export any time, no exit fee",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-[132px] pb-24 md:pt-[168px] md:pb-32">
      <div className="shell">
        <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)] lg:gap-20">
          {/* ------------------------------ copy ------------------------------ */}
          <div>
            <motion.p
              {...rise(0)}
              className="font-mono text-[0.68rem] leading-relaxed tracking-[0.2em] text-accent uppercase"
            >
              Founding cohort · 10 practices · price locked for life
            </motion.p>

            <motion.h1
              {...rise(0.08)}
              className="display mt-7 text-[clamp(2.5rem,6.2vw,4.4rem)] text-fg"
            >
              The operator your practice
              <br className="hidden sm:block" />{" "}
              <span className="text-fg-secondary">never got round to hiring.</span>
            </motion.h1>

            <motion.p
              {...rise(0.16)}
              className="mt-8 max-w-xl text-[1.08rem] leading-[1.62] font-light text-fg-secondary"
            >
              Ascend answers every enquiry, refills the chair a cancellation
              empties, brings back the patients who quietly stopped coming, and
              shows you its reasoning before it does any of it.
            </motion.p>

            <motion.div {...rise(0.24)} className="mt-10 flex flex-wrap gap-3.5">
              <ButtonLink href="/contact" variant="primary" size="lg">
                Get my leak report →
              </ButtonLink>
              <ButtonLink href="#what-it-does" variant="ghost" size="lg">
                See what it actually does
              </ButtonLink>
            </motion.div>

            <motion.p
              {...rise(0.32)}
              className="mt-6 text-[0.82rem] leading-relaxed font-light text-fg-tertiary"
            >
              Assisted by default. Nothing reaches a patient until you approve it.
            </motion.p>

            <motion.ul
              {...rise(0.4)}
              className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-border-soft pt-7"
            >
              {CHIPS.map((chip) => (
                <li
                  key={chip}
                  className="flex items-center gap-2.5 font-mono text-[0.68rem] tracking-[0.1em] text-fg-tertiary uppercase"
                >
                  <span
                    aria-hidden="true"
                    className="h-1 w-1 rounded-full bg-accent"
                  />
                  {chip}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* ---------------------------- the product ---------------------------- */}
          <div className="relative lg:pl-4">
            <RecommendationCard delay={0.34} />
          </div>
        </div>
      </div>
    </section>
  );
}
