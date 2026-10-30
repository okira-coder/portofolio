import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="py-32">
      <h1 className="text-4xl font-semibold tracking-tight">Cette page n’existe pas.</h1>
      <p className="mt-4 text-muted">Le lien est peut-être ancien. Les projets sont listés sur la page d’accueil.</p>
      <div className="mt-8">
        <ButtonLink href="/#projets">Voir les projets</ButtonLink>
      </div>
    </Container>
  );
}
