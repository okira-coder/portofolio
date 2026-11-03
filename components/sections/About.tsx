import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Media } from "@/components/ui/Media";
import { Section } from "@/components/ui/Section";
import { journey } from "@/data/home";
import { about } from "@/data/skills";

export function About() {
  return (
    <Section id="a-propos" tone="paper" title="À propos">
      {/* Le parcours, plutôt que le CV : chaque étape avec sa preuve. */}
      <Reveal
        as="ol"
        stagger={0.1}
        aria-label="Parcours"
        className="grid gap-3 lg:grid-cols-[repeat(5,minmax(0,1fr))] lg:gap-0"
      >
        {journey.map((j, i) => (
            <RevealItem key={j.step} as="li" className="relative rounded-xl border border-line bg-panel/40 p-5 lg:mr-6 lg:last:mr-0">
              <p className="font-mono text-xs text-faint">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-2 text-lg font-semibold tracking-tight">{j.step}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{j.proof}</p>
              {i < journey.length - 1 && (
                <span aria-hidden className="absolute -right-5 top-1/2 hidden -translate-y-1/2 text-faint lg:block">
                  →
                </span>
              )}
            </RevealItem>
        ))}
      </Reveal>

      <div className="mt-16 grid gap-12 lg:grid-cols-12">
        <Reveal className="space-y-5 text-xl leading-relaxed text-pretty lg:col-span-7">
          {about.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <figure className="!mt-10 text-base">
            <Media
              slot={about.github}
              frame="browser"
              label="github.com/okira-coder"
              sizes="(min-width: 1024px) 55vw, 100vw"
            />
            <figcaption className="mt-3 text-sm text-muted">{about.github.caption}</figcaption>
          </figure>
        </Reveal>
        <div className="space-y-10 lg:col-span-4 lg:col-start-9">
          <div>
            <h3 className="text-sm text-faint">Formation</h3>
            <ul className="mt-3 space-y-4">
              {about.education.map((e) => (
                <li key={e.title}>
                  <p className="font-medium">{e.title}</p>
                  <p className="text-sm text-muted">{e.detail}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm text-faint">Certifications</h3>
            <ul className="mt-3 space-y-4">
              {about.certifications.map((c) => (
                <li key={c.title}>
                  <p className="font-medium">{c.title}</p>
                  <p className="text-sm text-muted">{c.detail}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm text-faint">Langues</h3>
            <ul className="mt-3 space-y-4">
              {about.languages.map((l) => (
                <li key={l.name}>
                  <p className="font-medium">{l.name}</p>
                  <p className="text-sm text-muted">{l.level}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
