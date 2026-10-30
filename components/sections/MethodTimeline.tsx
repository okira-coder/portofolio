"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useRef, useState } from "react";

type Step = { name: string; items: readonly string[] };

/** Timeline : la ligne progresse au scroll et les étapes s’activent successivement. */
export function MethodTimeline({ steps }: { steps: readonly Step[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const [progress, setProgress] = useState<number | null>(null);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (!reduce) setProgress(p);
  });

  // Rendu serveur et mouvement réduit : toutes les étapes sont actives.
  const isOn = (i: number) => progress === null || progress >= i / (steps.length - 1) - 0.02;
  const scale = reduce ? 1 : scrollYProgress;

  return (
    <ol ref={ref} className="relative grid gap-10 lg:grid-cols-6 lg:gap-6">
      {/* Ligne verticale (mobile) */}
      <span aria-hidden className="absolute bottom-2 left-[5px] top-2 w-px bg-line lg:hidden" />
      <motion.span
        aria-hidden
        className="absolute bottom-2 left-[5px] top-2 w-px origin-top bg-accent lg:hidden"
        style={{ scaleY: scale }}
      />
      {/* Ligne horizontale (desktop) */}
      <span aria-hidden className="absolute inset-x-0 top-[5px] hidden h-px bg-line lg:block" />
      <motion.span
        aria-hidden
        className="absolute inset-x-0 top-[5px] hidden h-px origin-left bg-accent lg:block"
        style={{ scaleX: scale }}
      />

      {steps.map((step, i) => {
        const on = isOn(i);
        return (
          <li key={step.name} className="relative flex gap-5 lg:flex-col">
            <span
              aria-hidden
              className={`relative z-10 mt-1.5 size-[11px] shrink-0 rounded-full border-2 transition-colors duration-500 lg:mt-0 ${
                on ? "border-accent bg-accent" : "border-faint bg-ink"
              }`}
            />
            <div className={`transition-opacity duration-500 ${on ? "opacity-100" : "opacity-40"}`}>
              <p className="font-mono text-xs text-faint">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-1 text-xl font-semibold">{step.name}</h3>
              <ul className="mt-2 space-y-0.5 text-sm text-muted">
                {step.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
