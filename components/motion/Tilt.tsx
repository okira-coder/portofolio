"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import type { PointerEvent, ReactNode } from "react";

/** Légère perspective qui suit le curseur au survol. Amplitude volontairement faible. */
export function Tilt({ children, className, max = 3 }: { children: ReactNode; className?: string; max?: number }) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 120, damping: 20 });
  const sy = useSpring(py, { stiffness: 120, damping: 20 });
  const rotateY = useTransform(sx, (v) => v * max);
  const rotateX = useTransform(sy, (v) => -v * max);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    py.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div style={{ perspective: 1400 }} className={className}>
      <motion.div style={{ rotateX, rotateY }} onPointerMove={onMove} onPointerLeave={onLeave}>
        {children}
      </motion.div>
    </div>
  );
}
