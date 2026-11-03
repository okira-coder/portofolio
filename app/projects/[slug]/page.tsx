import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Suspense, type ReactNode } from "react";
import { CaseSectionView } from "@/components/project/CaseSectionView";
import { Container } from "@/components/ui/Container";
import { imageExists } from "@/components/ui/Media";
import { ProjectImage } from "@/components/ui/ProjectImage";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getProject, projects, type CaseSection } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: `${project.title}. ${project.result}`,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { title: project.name, description: project.title },
  };
}

function Block({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="grid gap-4 border-t border-line py-12 lg:grid-cols-12 lg:gap-10">
      <h2 id={id} className="text-lg font-semibold tracking-tight lg:col-span-3">
        {title}
      </h2>
      <div className="lg:col-span-8 lg:col-start-5">{children}</div>
    </section>
  );
}

// L’accès à `params` est sous <Suspense> : la navigation reste instantanée (Cache Components).
export default function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  return (
    <Suspense fallback={<CaseStudyFallback />}>
      <CaseStudy params={params} />
    </Suspense>
  );
}

function CaseStudyFallback() {
  return (
    <Container className="py-16">
      <div aria-hidden className="h-4 w-32 rounded bg-panel" />
      <div aria-hidden className="mt-10 h-14 max-w-2xl rounded bg-panel" />
      <div aria-hidden className="mt-4 h-14 max-w-xl rounded bg-panel" />
    </Container>
  );
}

async function CaseStudy({ params }: { params: PageProps<"/projects/[slug]">["params"] }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const cs = project.caseStudy;
  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  // Seuls les visuels réellement présents sont affichés : pas de placeholder.
  const [firstImage, ...otherImages] = cs.images.filter((img) => imageExists(img.src));

  // Les blocs non renseignés (kind "todo") ne sont pas affichés.
  const done = (section: CaseSection) => section.kind !== "todo";
  const sections: { id: string; title: string; section: CaseSection }[] = [
    { id: "probleme", title: "Le problème", section: cs.problem },
    { id: "utilisateurs", title: "Les utilisateurs", section: cs.users },
    { id: "contraintes", title: "Contraintes", section: cs.constraints },
    { id: "demarche", title: "Ma démarche", section: cs.approach },
  ].filter((x) => done(x.section));

  return (
    <article>
      <header className="pb-12 pt-12 sm:pt-16">
        <Container>
          <Link href="/#projets" className="inline-flex items-center gap-2 text-sm text-muted hover:text-text">
            <ArrowLeft aria-hidden className="size-4" />
            Tous les projets
          </Link>
          <p className="mt-10 text-sm text-muted">
            <span className="font-mono text-faint">{project.number}</span>
            <span className="ml-3">{project.category}</span>
          </p>
          <p className="mt-6 font-medium text-accent-ink">{project.name}</p>
          <h1 className="mt-2 max-w-4xl text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-balance">
            {project.title}
          </h1>
          {project.link && (
            <a
              href={project.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 font-medium transition-colors hover:border-accent hover:text-accent-ink"
            >
              {project.link.label}
              <ArrowUpRight aria-hidden className="size-4" />
            </a>
          )}
          <dl className="mt-10 grid gap-6 border-t border-line pt-6 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-faint">Période</dt>
              <dd className="mt-1">{cs.period}</dd>
            </div>
            <div>
              <dt className="text-faint">Rôle</dt>
              <dd className="mt-1">{cs.role}</dd>
            </div>
            <div>
              <dt className="text-faint">Statut</dt>
              <dd className="mt-1">
                <StatusBadge status={project.status} label={project.statusDetail} />
              </dd>
            </div>
          </dl>
        </Container>
      </header>

      <Container>
        {sections.map((s) => (
          <Block key={s.id} id={s.id} title={s.title}>
            <CaseSectionView section={s.section} />
          </Block>
        ))}

        {done(cs.architecture) ? (
          <Block id="architecture" title="Architecture">
            <CaseSectionView section={cs.architecture} />
            {firstImage && (
              <div className="mt-8">
                <ProjectImage slot={firstImage} priority />
              </div>
            )}
          </Block>
        ) : (
          firstImage && (
            <Block id="apercu" title="Aperçu">
              <ProjectImage slot={firstImage} priority />
            </Block>
          )
        )}

        <Block id="realise" title="Ce que j’ai personnellement réalisé">
          <CaseSectionView section={cs.personal} />
        </Block>

        <Block id="resultats" title="Résultats">
          <CaseSectionView section={cs.results} />
          {otherImages.length > 0 && (
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {otherImages.map((img) => (
                <ProjectImage key={img.src} slot={img} />
              ))}
            </div>
          )}
        </Block>

        {/* Le passage le plus important : ce qui n’a pas marché, et la réponse. */}
        {(done(cs.failures) || done(cs.changes) || cs.aside) && (
          <section aria-labelledby="echecs" className="border-t border-line py-12">
            {(done(cs.failures) || done(cs.changes)) && (
              <div
                className={`grid gap-px overflow-hidden rounded-xl border border-line bg-line ${
                  done(cs.failures) && done(cs.changes) ? "md:grid-cols-2" : ""
                }`}
              >
                {done(cs.failures) && (
                  <div className="border-l-2 border-l-preprod bg-panel p-6 sm:p-8">
                    <h2 id="echecs" className="text-lg font-semibold tracking-tight">
                      Ce qui n’a pas marché
                    </h2>
                    <div className="mt-5">
                      <CaseSectionView section={cs.failures} />
                    </div>
                  </div>
                )}
                {done(cs.changes) && (
                  <div className="bg-panel p-6 sm:p-8">
                    <h2 className="text-lg font-semibold tracking-tight">Ce que j’ai changé</h2>
                    <div className="mt-5">
                      <CaseSectionView section={cs.changes} />
                    </div>
                  </div>
                )}
              </div>
            )}
            {cs.aside && (
              <aside className="mt-6 rounded-xl border border-line p-6 sm:p-8">
                <h3 className="font-semibold">{cs.aside.title}</h3>
                <div className="mt-3 max-w-3xl space-y-3 leading-relaxed text-muted">
                  {cs.aside.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </aside>
            )}
          </section>
        )}

        {done(cs.learnings) && (
          <Block id="appris" title="Ce que j’ai appris">
            <CaseSectionView section={cs.learnings} />
          </Block>
        )}

        <Block id="stack" title="Stack">
          <ul className="flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <li key={s} className="rounded-full border border-line px-3 py-1 text-sm text-muted">
                {s}
              </li>
            ))}
          </ul>
        </Block>
      </Container>

      <nav aria-label="Projet suivant" className="border-t border-line">
        <Container>
          <Link href={`/projects/${next.slug}`} className="group flex flex-col gap-2 py-14 sm:py-20">
            <span className="text-sm text-faint">Projet suivant</span>
            <span className="flex items-center gap-3 text-2xl font-semibold tracking-tight sm:text-4xl">
              {next.name}
              <ArrowRight aria-hidden className="size-6 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="text-muted">{next.title}</span>
          </Link>
        </Container>
      </nav>
    </article>
  );
}
