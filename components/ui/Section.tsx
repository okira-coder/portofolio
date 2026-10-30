import type { ReactNode } from "react";
import { Container } from "./Container";

export type Tone = "beige" | "paper" | "dark";

export const toneClass: Record<Tone, string> = {
  beige: "",
  paper: "theme-paper",
  dark: "theme-dark",
};

type Props = {
  id?: string;
  /** Ton de fond de la section. */
  tone?: Tone;
  title: string;
  intro?: string;
  children: ReactNode;
  className?: string;
};

/** Section de page : titre aligné à gauche, introduction courte, contenu. */
export function Section({ id, tone = "beige", title, intro, children, className = "" }: Props) {
  const headingId = id ? `${id}-titre` : undefined;
  return (
    <section id={id} aria-labelledby={headingId} className={`border-t border-line py-20 sm:py-28 ${toneClass[tone]} ${className}`}>
      <Container>
        <div className="max-w-2xl">
          <h2 id={headingId} className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {title}
          </h2>
          {intro && <p className="mt-4 text-lg leading-relaxed text-muted text-pretty">{intro}</p>}
        </div>
        <div className="mt-12 sm:mt-16">{children}</div>
      </Container>
    </section>
  );
}
