"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { PRICE_ITEMS } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";

export function Calculator() {
  const [qty, setQty] = useState<Record<string, number>>({ reception: 1 });

  const set = (key: string, next: number) =>
    setQty((q) => ({ ...q, [key]: Math.max(0, Math.min(9, next)) }));

  const totals = useMemo(() => {
    let ascend = 0;
    let inHouse = 0;
    let count = 0;
    for (const item of PRICE_ITEMS) {
      const n = qty[item.key] ?? 0;
      ascend += item.price * n;
      inHouse += item.inHouse * n;
      count += n;
    }
    const save = inHouse - ascend;
    const pct = inHouse > 0 ? Math.round((save / inHouse) * 100) : 0;
    return { ascend, inHouse, save, pct, count };
  }, [qty]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
      {/* role list */}
      <div className="overflow-hidden rounded-xl border border-border-line">
        {PRICE_ITEMS.map((item, i) => {
          const n = qty[item.key] ?? 0;
          const active = n > 0;
          return (
            <div
              key={item.key}
              className={`flex items-center gap-4 bg-surface-1 px-6 py-5 transition-colors duration-300 ${
                i !== 0 ? "border-t border-border-soft" : ""
              } ${active ? "bg-surface-2/40" : ""}`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="font-display font-medium text-fg">
                    {item.name}
                  </span>
                  {active && (
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  )}
                </div>
                <div className="mt-1 text-sm text-fg-tertiary">{item.desc}</div>
              </div>

              <div className="text-right">
                <div className="font-display font-semibold text-fg">
                  ${item.price.toLocaleString()}
                </div>
                <div className="font-mono text-[0.58rem] tracking-wider text-fg-muted uppercase">
                  / mo each
                </div>
              </div>

              {/* stepper */}
              <div className="flex items-center gap-1 rounded-full border border-border-line bg-control p-1">
                <button
                  onClick={() => set(item.key, n - 1)}
                  aria-label={`Remove one ${item.name}`}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-fg-secondary transition-colors hover:bg-surface-2 hover:text-fg disabled:opacity-30"
                  disabled={n === 0}
                >
                  −
                </button>
                <span className="w-6 text-center font-mono text-sm text-fg">
                  {n}
                </span>
                <button
                  onClick={() => set(item.key, n + 1)}
                  aria-label={`Add one ${item.name}`}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-fg-secondary transition-colors hover:bg-accent hover:text-on-accent"
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* summary */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="overflow-hidden rounded-xl border border-border-line bg-surface-1">
          <div className="border-b border-border-soft bg-surface-2/40 px-6 py-4">
            <span className="label-mono">{"// Your estimate"}</span>
          </div>
          <div className="p-6">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-fg-secondary">
                Ascend · {totals.count} {totals.count === 1 ? "role" : "roles"}
              </span>
              <motion.span
                key={totals.ascend}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-display text-3xl font-semibold text-fg"
              >
                ${totals.ascend.toLocaleString()}
                <span className="text-sm font-normal text-fg-tertiary">/mo</span>
              </motion.span>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-fg-tertiary">In-house equivalent</span>
              <span className="font-mono text-fg-tertiary line-through">
                ${totals.inHouse.toLocaleString()}/mo
              </span>
            </div>

            <div className="mt-6 rounded-lg bg-accent-dim p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-fg">You save</span>
                <motion.span
                  key={totals.save}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-display text-2xl font-semibold text-accent"
                >
                  ${totals.save.toLocaleString()}/mo
                </motion.span>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-accent/15 pt-3 text-sm">
                <span className="text-fg-secondary">
                  ${(totals.save * 12).toLocaleString()} / year
                </span>
                <span className="font-mono text-accent">{totals.pct}% less</span>
              </div>
            </div>

            <div className="mt-6">
              <ButtonLink
                href="/contact"
                variant="primary"
                className="w-full"
                size="lg"
              >
                Book a demo →
              </ButtonLink>
            </div>
            <p className="mt-4 text-center font-mono text-[0.62rem] tracking-wider text-fg-muted uppercase">
              No upfront cost · Pay only after you hire
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
