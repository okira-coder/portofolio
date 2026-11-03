import { Reveal } from "@/components/motion/Reveal";
import { Tilt } from "@/components/motion/Tilt";
import { Media } from "@/components/ui/Media";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getProject } from "@/data/projects";
import { CaseLink, FeatureHeader, SiteLink } from "./shared";

/** Produit web : grande capture dans un cadre navigateur, lien vers le site en ligne. */
export function SiteFeature({ slug, reverse = false }: { slug: string; reverse?: boolean }) {
  const project = getProject(slug)!;
  const { images } = project.caseStudy;
  const host = project.link ? new URL(project.link.href).host : undefined;

  return (
    <article className="grid items-center gap-14 py-20 sm:py-28 lg:grid-cols-12 lg:gap-12">
      <div className={`lg:col-span-4 ${reverse ? "lg:order-2" : ""}`}>
        <FeatureHeader project={project} title={project.title} />
        <p className="mt-8 leading-relaxed text-muted">{project.problem}</p>
        <p className="mt-4 leading-relaxed text-muted">{project.result}</p>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <StatusBadge status={project.status} label={project.statusDetail} />
          {project.link && <SiteLink href={project.link.href} label={project.link.label} />}
          <CaseLink slug={project.slug} />
        </div>
      </div>

      <div className={`relative lg:col-span-8 ${reverse ? "lg:order-1" : ""}`}>
        <Reveal>
          <Tilt>
            <Media slot={images[0]} frame="browser" label={host} sizes="(min-width: 1024px) 65vw, 100vw" />
          </Tilt>
        </Reveal>
      </div>
    </article>
  );
}
