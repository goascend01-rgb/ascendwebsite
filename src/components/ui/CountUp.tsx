"use client";

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useInView } from "motion/react";

/* Animates the numeric part of a value like "50%", "5 days" or "10" from
   zero to its target when scrolled into view, preserving any prefix and
   suffix.

   The previous version shipped "0%" and "0 days" to the live site: it
   rendered zero on the server and only ever reached the target if an
   intersection callback fired, so any failure of that callback left a
   permanent zero on the first screen. Three changes make that
   unreachable:

     1. The target is what renders on the server and on the first client
        paint, so the honest value is the fallback rather than zero.
     2. The countdown to zero happens in a layout effect, before paint, and
        only once we know we can animate.
     3. The animation always settles on the exact target, and a timer
        forces it there if the frame loop is throttled or never runs. */

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

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
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const { prefix, target, suffix, isNum } = useMemo(() => {
    const m = value.match(/^(\D*?)(\d[\d,]*)(.*)$/);
    if (!m) return { prefix: "", target: 0, suffix: "", isNum: false };
    return {
      prefix: m[1],
      target: parseInt(m[2].replace(/,/g, ""), 10),
      suffix: m[3],
      isNum: true,
    };
  }, [value]);

  /* null means "not animating": render the real value. */
  const [n, setN] = useState<number | null>(null);
  const [armed, setArmed] = useState(false);

  useIsomorphicLayoutEffect(() => {
    if (!isNum || target === 0) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    setN(0);
    setArmed(true);
  }, [isNum, target]);

  useEffect(() => {
    if (!armed || !inView) return;

    let raf = 0;
    /* The start is the first frame's own timestamp, never performance.now().
       The two can sit on different time origins, and subtracting across them
       produces a wildly out of range progress value and a nonsense number on
       screen. Taking both readings from the same clock removes the class of
       bug entirely. */
    let start: number | null = null;

    const tick = (t: number) => {
      if (start === null) start = t;
      const p = Math.min(1, Math.max(0, (t - start) / duration));
      if (p >= 1) {
        setN(null); // settle on the exact value, never a rounded approximation
        return;
      }
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * target));
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    /* Backstop: a throttled or suspended frame loop must never leave a zero
       on screen, which is the failure this component shipped before. */
    const settle = window.setTimeout(() => setN(null), duration + 400);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(settle);
    };
  }, [armed, inView, target, duration]);

  const display =
    n === null || !isNum ? value : `${prefix}${n.toLocaleString()}${suffix}`;

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
