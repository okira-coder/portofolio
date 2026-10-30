import { site } from "@/data/site";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="theme-dark border-t border-line py-10 text-sm">
      <Container className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-muted">© 2026 {site.name}</p>
        <ul className="flex gap-6 font-medium">
          <li>
            <a href={site.links.github} className="transition-colors hover:text-accent-ink" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a href={site.links.linkedin} className="transition-colors hover:text-accent-ink" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={`mailto:${site.links.email}`} className="transition-colors hover:text-accent-ink">
              Email
            </a>
          </li>
        </ul>
      </Container>
    </footer>
  );
}
