"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

type Props = {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

const format = (n: number) => new Intl.NumberFormat("fr-FR").format(Math.round(n)).replace(/ /g, " ");

/**
 * Compteur animé une seule fois à l’entrée dans le viewport.
 * Le rendu serveur affiche la valeur finale : sans JavaScript, le chiffre reste juste.
 */
export function Counter({ to, prefix = "", suffix = "", duration = 1.6, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const started = useRef(false);

  // Avant le premier passage à l’écran, on repart de zéro (sauf mouvement réduit).
  useEffect(() => {
    const el = ref.current;
    if (!el || reduce || started.current) return;
    const rect = el.getBoundingClientRect();
    if (rect.top > window.innerHeight) el.textContent = `${prefix}${format(0)}${suffix}`;
  }, [prefix, suffix, reduce]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView || reduce || started.current) return;
    started.current = true;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = `${prefix}${format(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduce, to, prefix, suffix, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className ?? ""}`}>
      {prefix}
      {format(to)}
      {suffix}
    </span>
  );
}
