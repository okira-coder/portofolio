import { Counter } from "@/components/motion/Counter";
import { ScrollFloat } from "@/components/motion/ScrollFloat";
import { Media } from "@/components/ui/Media";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { wod } from "@/data/home";
import { getProject } from "@/data/projects";
import { CaseLink, FeatureHeader } from "./shared";

// Chaque téléphone a sa propre amplitude et une légère rotation.
const phoneStyles = [
  { distance: 70, className: "z-10 -rotate-6 translate-y-10" },
  { distance: 140, className: "z-20" },
  { distance: 90, className: "z-10 rotate-6 translate-y-16" },
];

/** Un vrai produit utilisé : le chiffre en très grand, trois écrans mobiles à côté. */
export function WodFeature() {
  const project = getProject(wod.slug)!;

  return (
    <article className="grid items-center gap-16 py-20 sm:py-28 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-6">
        <FeatureHeader project={project} title={wod.title} />
        <p className="mt-10 text-[clamp(5rem,13vw,10.5rem)] font-semibold leading-[0.9] tracking-[-0.05em]">
          <Counter to={wod.users.to} suffix={wod.users.suffix} duration={2} />
        </p>
        <p className="mt-3 text-xl text-muted">{wod.users.label}</p>
        <p className="mt-8 max-w-md leading-relaxed text-muted">{wod.text}</p>
        <p className="mt-2 text-sm text-faint">{wod.period}</p>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <StatusBadge status={project.status} label={project.statusDetail} />
          <CaseLink slug={project.slug} />
        </div>
      </div>

      <div className="flex justify-center pb-16 lg:col-span-6">
        {wod.phones.map((phone, i) => (
          <ScrollFloat
            key={phone.src}
            distance={phoneStyles[i].distance}
            className={`relative w-[36%] max-w-[13rem] ${i > 0 ? "-ml-[8%]" : ""} ${phoneStyles[i].className}`}
          >
            <Media slot={phone} frame="phone" compact sizes="(min-width: 1024px) 13rem, 36vw" />
          </ScrollFloat>
        ))}
      </div>
    </article>
  );
}
