import Link from "next/link";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { experiences } from "@/data/experience";

export function Experience() {
  return (
    <Section id="experience" title="Expérience">
      <ol className="relative">
        <span aria-hidden className="absolute bottom-0 left-[5px] top-2 w-px bg-line lg:left-[calc(17rem+1.5rem)]" />
        {experiences.map((exp) => (
          <li
            key={exp.company}
            className="relative pb-20 pl-10 last:pb-0 lg:grid lg:grid-cols-[17rem_1fr] lg:gap-12 lg:pl-0"
          >
            <span
              aria-hidden
              className="absolute left-0 top-3 size-[11px] rounded-full border-2 border-accent bg-ink lg:left-[calc(17rem+1.5rem-5px)]"
            />

            {/* Colonne dates */}
            <Reveal className="lg:text-right">
              <p className="whitespace-nowrap text-[clamp(2rem,3.4vw,2.6rem)] font-semibold leading-none tracking-[-0.03em] tabular-nums">
                {exp.years}
              </p>
              <p className="mt-3 text-sm text-muted">{exp.dates}</p>
              <p className="text-sm text-faint">{exp.location}</p>
            </Reveal>

            {/* Colonne contenu */}
            <Reveal stagger={0.06} className="mt-6 lg:mt-0 lg:pl-6">
              <RevealItem>
                <h3 className="text-2xl font-semibold tracking-tight">{exp.company}</h3>
                <p className="mt-1 font-medium text-accent-ink">{exp.role}</p>
                <p className="mt-4 max-w-2xl leading-relaxed text-muted text-pretty">{exp.summary}</p>
              </RevealItem>

              <RevealItem as="dl" className="mt-8 grid gap-x-10 gap-y-6 md:grid-cols-2">
                {exp.groups.map((g) => (
                  <div key={g.title}>
                    <dt className="font-semibold">{g.title}</dt>
                    <dd className="mt-1.5 text-[0.95rem] leading-relaxed text-muted text-pretty">{g.text}</dd>
                  </div>
                ))}
              </RevealItem>

              <RevealItem className="mt-8 flex flex-wrap items-center gap-2">
                <span className="sr-only">Outils :</span>
                {exp.tools.map((t) => (
                  <span key={t} className="rounded-full border border-line px-3 py-1 text-sm text-muted">
                    {t}
                  </span>
                ))}
                {exp.links?.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="ml-2 text-sm font-medium text-accent-ink underline-offset-4 hover:underline"
                  >
                    {l.label}
                  </Link>
                ))}
              </RevealItem>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
