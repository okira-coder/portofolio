"use client";

import { motion, type Variants } from "motion/react";
import type { AriaAttributes, ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

type Tag = "div" | "ul" | "ol" | "li" | "dl";

type Props = AriaAttributes & {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Décale l’apparition des enfants directs <RevealItem>. */
  stagger?: number;
  as?: Tag;
};

/**
 * Apparition au premier passage dans le viewport.
 * Avec prefers-reduced-motion, MotionConfig (reducedMotion="user") supprime le déplacement.
 */
export function Reveal({ children, className, delay = 0, stagger, as = "div", ...aria }: Props) {
  const Component = motion[as];
  const variants: Variants = stagger
    ? { hidden: {}, shown: { transition: { staggerChildren: stagger, delayChildren: delay } } }
    : { hidden: item.hidden, shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease, delay } } };
  return (
    <Component
      {...aria}
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={variants}
    >
      {children}
    </Component>
  );
}

export function RevealItem({ children, className, as = "div", ...aria }: Omit<Props, "delay" | "stagger">) {
  const Component = motion[as];
  return (
    <Component {...aria} className={className} variants={item}>
      {children}
    </Component>
  );
}
