import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-titre" className="theme-dark py-24 sm:py-32">
      <Container>
        <h2
          id="contact-titre"
          className="max-w-3xl text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-balance"
        >
          Un problème métier à transformer en produit ?
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
          Je suis ouvert aux opportunités Chef de Projet IA, AI Product Manager ainsi qu’aux missions freelance.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href={`mailto:${site.links.email}`} external>
            <Mail aria-hidden className="size-4" />
            Me contacter
          </ButtonLink>
          <ButtonLink href={site.links.linkedin} variant="secondary" external>
            <LinkedinIcon className="size-4" />
            LinkedIn
          </ButtonLink>
          <ButtonLink href={site.links.github} variant="secondary" external>
            <GithubIcon className="size-4" />
            GitHub
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
