"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/* Honours prefers-reduced-motion across every animation on the site.

   The CSS rule in globals.css only reaches CSS transitions and keyframes. It
   cannot touch Motion, which animates by writing inline styles frame by
   frame, so every scroll reveal, the staggered hero, the rail fills and the
   mobile sheet all ignored the setting entirely. `reducedMotion="user"`
   makes Motion read the same media query and hold transform and opacity at
   their target values instead of animating to them.

   Reveals therefore render visible rather than never appearing, which is the
   behaviour that matters: a reduced-motion visitor must not get a blank
   page. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
