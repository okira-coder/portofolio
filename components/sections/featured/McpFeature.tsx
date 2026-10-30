import { Fragment } from "react";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { mcp } from "@/data/home";
import { getProject } from "@/data/projects";
import { McpDiagram } from "./McpDiagram";
import { CaseLink, FeatureHeader } from "./shared";

/** Un sujet abstrait rendu lisible : l’architecture au centre, le parcours d’une question en dessous. */
export function McpFeature() {
  const project = getProject(mcp.slug)!;

  return (
    <article className="py-20 sm:py-28">
      <FeatureHeader project={project} title={mcp.title} align="center" />
      <p className="mx-auto mt-6 max-w-xl text-center leading-relaxed text-muted text-pretty">{mcp.text}</p>

      <div className="mx-auto mt-14 max-w-3xl rounded-2xl border border-line bg-panel/40 px-4 py-8 sm:px-10 sm:py-12">
        <McpDiagram nodes={mcp.nodes} />
      </div>

      <Reveal
        as="ol"
        stagger={0.1}
        className="mx-auto mt-10 flex max-w-4xl flex-wrap items-center justify-center gap-x-3 gap-y-3 font-mono text-sm"
        aria-label="Parcours d’une question"
      >
        {mcp.flow.map((step, i) => (
          <Fragment key={step}>
            {i > 0 && (
              <RevealItem as="li" className="text-faint" aria-hidden>
                →
              </RevealItem>
            )}
            <RevealItem as="li" className="rounded-md border border-line bg-ink px-3 py-1.5">
              {step}
            </RevealItem>
          </Fragment>
        ))}
      </Reveal>

      <div className="mx-auto mt-12 flex max-w-3xl flex-col items-center gap-5 text-center">
        <p className="text-sm text-muted">{mcp.decision}</p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <StatusBadge status={project.status} label={project.statusDetail} />
          <CaseLink slug={project.slug} />
        </div>
      </div>
    </article>
  );
}
