import { Counter } from "@/components/motion/Counter";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { ScrollFloat } from "@/components/motion/ScrollFloat";
import { Media } from "@/components/ui/Media";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { predictive } from "@/data/home";
import { getProject } from "@/data/projects";
import { CaseLink, FeatureHeader } from "./shared";
import { PipelineScroll } from "./PipelineScroll";

/** Projet hero de la homepage : grands chiffres à gauche, système qui s’allume à droite. */
export function PredictiveFeature() {
  const project = getProject(predictive.slug)!;

  return (
    <article className="grid gap-14 py-20 sm:py-28 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-6">
        <FeatureHeader project={project} title={predictive.title} />

        <Reveal as="dl" stagger={0.12} className="mt-12 space-y-8">
          {predictive.metrics.map((m) => (
            <RevealItem key={m.label} className="flex flex-col-reverse">
              <dt className="mt-1 text-muted">{m.label}</dt>
              <dd className="text-[clamp(3.5rem,8vw,6rem)] font-semibold leading-none tracking-[-0.04em]">
                <Counter to={m.to} prefix={"prefix" in m ? m.prefix : ""} suffix={"suffix" in m ? m.suffix : ""} />
              </dd>
            </RevealItem>
          ))}
        </Reveal>

        <p className="mt-12 max-w-md leading-relaxed text-muted">{predictive.role}</p>
        <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4">
          <StatusBadge status={project.status} label={project.statusDetail} />
          <CaseLink slug={project.slug} />
        </div>
      </div>

      <div className="relative lg:col-span-6 lg:pl-4">
        <div className="rounded-2xl border border-line bg-ink p-5 sm:p-8">
          <p className="mb-6 text-sm text-muted">Le système, du capteur à l’alerte</p>
          <PipelineScroll steps={predictive.pipeline} />
        </div>
      </div>

      {/* Le résultat concret : l’alerte reçue chaque matin par le SAV, en grand pour être lue. */}
      <figure className="m-0 lg:col-span-12">
        <ScrollFloat distance={50} className="mx-auto max-w-4xl">
          <Media slot={predictive.slack} frame="window" label="Slack — #alerte-ia-shadow-mode" sizes="(min-width: 1024px) 56rem, 100vw" />
        </ScrollFloat>
        <figcaption className="mx-auto mt-5 max-w-4xl text-sm leading-relaxed text-muted">
          Ce que reçoit le SAV : un rapport quotidien sur tout le parc, puis une alerte par fontaine avec la panne prédite,
          le niveau d’urgence, les mesures qui l’ont déclenchée et l’action conseillée. Identifiants et client masqués.
        </figcaption>
      </figure>
    </article>
  );
}
