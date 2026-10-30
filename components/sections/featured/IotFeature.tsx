import { Counter } from "@/components/motion/Counter";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Tilt } from "@/components/motion/Tilt";
import { Media } from "@/components/ui/Media";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { iot } from "@/data/home";
import { getProject } from "@/data/projects";
import { CaseLink, FeatureHeader } from "./shared";

// Position des annotations autour du mockup (desktop). À ajuster quand la vraie capture sera en place.
// Alignées sur la capture réelle : fiche, alertes en cours, historique, boutons d’action.
const positions = [
  "left-[-1.5rem] top-[24%]",
  "left-[-1.5rem] top-[61%]",
  "right-[-1.5rem] top-[44%]",
  "left-[14%] bottom-[-1.25rem]",
];

/** Le produit domine : grand mockup navigateur, texte réduit au minimum. */
export function IotFeature() {
  const project = getProject(iot.slug)!;

  return (
    <article className="grid items-center gap-14 py-20 sm:py-28 lg:grid-cols-12 lg:gap-12">
      <div className="lg:order-2 lg:col-span-4">
        <FeatureHeader project={project} title={iot.title} />
        <p className="mt-10 text-6xl font-semibold tracking-[-0.04em] sm:text-7xl">
          <Counter to={iot.users.to} suffix={iot.users.suffix} />
        </p>
        <p className="mt-2 text-muted">{iot.users.label}</p>
        <p className="mt-8 leading-relaxed text-muted">{iot.contribution}</p>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <StatusBadge status={project.status} label={project.statusDetail} />
          <CaseLink slug={project.slug} />
        </div>
      </div>

      <div className="relative lg:order-1 lg:col-span-8 lg:-ml-10">
        <Reveal>
          <Tilt>
            <Media slot={iot.screenshot} frame="browser" label="iot.castalie.com" sizes="(min-width: 1024px) 65vw, 100vw" />
          </Tilt>
        </Reveal>
        <Reveal as="ul" stagger={0.12} delay={0.3} className="mt-6 flex flex-wrap gap-2 lg:pointer-events-none lg:absolute lg:inset-0 lg:mt-0 lg:block">
          {iot.annotations.map((a, i) => (
            <RevealItem
              as="li"
              key={a}
              className={`rounded-full border border-accent/40 bg-ink/90 px-3.5 py-1.5 text-sm shadow-lg shadow-shade backdrop-blur lg:absolute ${positions[i]}`}
            >
              <span aria-hidden className="mr-2 inline-block size-1.5 rounded-full bg-accent align-middle" />
              {a}
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </article>
  );
}
