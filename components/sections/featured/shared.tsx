import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import type { Project } from "@/data/projects";

/** En-tête commun : numéro, catégorie, nom et titre du projet. */
export function FeatureHeader({ project, title, align = "left" }: { project: Project; title: string; align?: "left" | "center" }) {
  return (
    <Reveal stagger={0.08} className={align === "center" ? "mx-auto max-w-3xl text-center" : ""}>
      <RevealItem>
        <p className={`flex items-baseline gap-3 text-sm text-muted ${align === "center" ? "justify-center" : ""}`}>
          <span className="font-mono text-faint">{project.number}</span>
          {project.category}
        </p>
      </RevealItem>
      <RevealItem>
        <p className="mt-5 font-medium text-accent-ink">{project.name}</p>
      </RevealItem>
      <RevealItem>
        <h3 className="mt-2 text-[clamp(1.9rem,3.6vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-balance">
          {title}
        </h3>
      </RevealItem>
    </Reveal>
  );
}

export function CaseLink({ slug }: { slug: string }) {
  return (
    <Link
      href={`/projects/${slug}`}
      className="group inline-flex items-center gap-1.5 font-medium text-text transition-colors hover:text-accent-ink"
    >
      Explorer l’étude de cas
      <ArrowUpRight
        aria-hidden
        className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </Link>
  );
}

/** Lien externe vers le site ou l’application en ligne. */
export function SiteLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-1.5 font-medium text-accent-ink transition-colors hover:text-text"
    >
      {label}
      <ArrowUpRight
        aria-hidden
        className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </a>
  );
}
