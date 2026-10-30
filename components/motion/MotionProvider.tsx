"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** Respecte prefers-reduced-motion pour toutes les animations Motion. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
