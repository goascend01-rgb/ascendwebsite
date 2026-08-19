"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "motion/react";

/* Animates the leading number of a value like "50%", "5 days", "120+"
   from 0 to target when scrolled into view; preserves prefix/suffix. */
export function CountUp({
  value,
  className,
  duration = 1200,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  // Derive stable primitives so the effect deps don't change every render.
  const { target, suffix, isNum } = useMemo(() => {
    const m = value.match(/^(\d+)(.*)$/);
    return {
      target: m ? parseInt(m[1], 10) : 0,
      suffix: m ? m[2] : "",
      isNum: !!m,
    };
  }, [value]);

  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || !isNum) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration, isNum]);

  return (
    <span ref={ref} className={className}>
      {isNum ? `${n}${suffix}` : value}
    </span>
  );
}
