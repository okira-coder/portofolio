"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { createContext, useContext, type PointerEvent, type ReactNode } from "react";

type Pointer = { x: MotionValue<number>; y: MotionValue<number> };
const PointerContext = createContext<Pointer | null>(null);

/** Scène qui suit le curseur (desktop uniquement). Les calques bougent selon leur profondeur. */
export function ParallaxScene({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 80, damping: 20, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 80, damping: 20, mass: 0.6 });

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - r.left) / r.width - 0.5);
    rawY.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <PointerContext.Provider value={{ x, y }}>
      <div className={className} onPointerMove={onMove} onPointerLeave={onLeave}>
        {children}
      </div>
    </PointerContext.Provider>
  );
}

/** Calque de la scène. `depth` en pixels de déplacement maximal. */
export function ParallaxLayer({
  depth,
  children,
  className,
}: {
  depth: number;
  children: ReactNode;
  className?: string;
}) {
  const ctx = useContext(PointerContext);
  const fallback = useMotionValue(0);
  const x = useTransform(ctx?.x ?? fallback, (v) => v * depth);
  const y = useTransform(ctx?.y ?? fallback, (v) => v * depth);
  return (
    <motion.div className={className} style={{ x, y }}>
      {children}
    </motion.div>
  );
}
