"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useRef, useState } from "react";

/** Pipeline dont les étapes s’activent une à une au fil du scroll. */
export function PipelineScroll({ steps }: { steps: readonly string[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 45%"] });
  const [active, setActive] = useState(steps.length);
  const [ready, setReady] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (reduce) return;
    setReady(true);
    setActive(Math.min(steps.length, Math.floor(p * steps.length + 0.15)));
  });

  // Tant que le scroll n’a pas été mesuré, tout est actif (rendu serveur lisible).
  const count = ready ? active : steps.length;
  const last = steps.length - 1;

  return (
    <ol ref={ref} className="relative space-y-3">
      <span aria-hidden className="absolute bottom-6 left-[1.4rem] top-6 w-px bg-line" />
      <motion.span
        aria-hidden
        className="absolute left-[1.4rem] top-6 w-px origin-top bg-accent"
        style={{ bottom: "1.5rem", scaleY: reduce ? 1 : scrollYProgress }}
      />
      {steps.map((s, i) => {
        const on = i < count;
        const isLast = i === last;
        return (
          <li
            key={s}
            className={`relative flex items-center gap-4 rounded-lg border px-4 py-3.5 transition-colors duration-500 ${
              on ? (isLast ? "border-preprod/60 bg-panel" : "border-accent/40 bg-panel") : "border-line bg-ink"
            }`}
          >
            <span
              aria-hidden
              className={`relative z-10 grid size-3 shrink-0 place-items-center rounded-full border-2 transition-colors duration-500 ${
                on ? (isLast ? "border-preprod bg-preprod" : "border-accent bg-accent") : "border-faint bg-ink"
              }`}
            />
            <span className={`font-mono text-sm transition-colors duration-500 ${on ? "text-text" : "text-faint"}`}>
              {s}
            </span>
            <span className="ml-auto font-mono text-xs text-faint">{String(i + 1).padStart(2, "0")}</span>
          </li>
        );
      })}
    </ol>
  );
}
