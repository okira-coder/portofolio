import { ArrowUpRight } from "lucide-react";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Media, imageExists } from "@/components/ui/Media";
import { Section } from "@/components/ui/Section";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { labs, type Lab } from "@/data/projects";

export function Labs() {
  return (
    <Section
      id="labs"
      title="Labs"
      intro="Des projets personnels où j’explore de nouvelles architectures, produits et usages de l’IA."
    >
      <Reveal
        as="ul"
        stagger={0.1}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        {labs.map((lab) => (
          <RevealItem as="li" key={lab.name}>
            <LabCard lab={lab} />
          </RevealItem>
        ))}
      </Reveal>
    </Section>
  );
}

function LabCard({ lab }: { lab: Lab }) {
  const hasImage = imageExists(lab.image.src);
  const isPhone = lab.image.height > lab.image.width;
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-panel/40 transition-colors duration-200 hover:border-faint">
      {hasImage && (
        <div
          className={`overflow-hidden border-b border-line ${
            isPhone
              ? "flex flex-1 items-center justify-center bg-raised/50 px-10 py-10"
              : ""
          }`}
        >
          {isPhone ? (
            <Media
              slot={lab.image}
              frame="phone"
              className="w-[62%] max-w-[15rem] transition-transform duration-500 ease-out group-hover:-translate-y-1.5 lg:w-[48%]"
              sizes="15rem"
            />
          ) : (
            <Media
              slot={lab.image}
              rounded="rounded-none"
              className="border-0"
              imageClassName="group-hover:scale-[1.04]"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          )}
        </div>
      )}
      <div className="flex flex-col p-6">
        <p className="text-sm text-muted">{lab.category}</p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight">
          {lab.name}
        </h3>
        <p className="mt-2 leading-relaxed text-muted text-pretty">
          {lab.summary}
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <StatusBadge status={lab.status} label={lab.statusDetail} />
          {lab.link && (
            <a
              href={lab.link.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-text"
            >
              {lab.link.label}
              <ArrowUpRight aria-hidden className="size-3.5" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
