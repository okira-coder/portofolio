// Identité et liens du site. Modifier ici, pas dans les composants.

export const site = {
  name: "Franck ARIKO",
  title: "Chef de Projet IA · AI Product Manager",
  badge: "Chef de Projet IA · AI Product Manager · Freelance",
  promise: "Je transforme des problèmes métier en produits IA.",
  subtitle: "De l’idée à la production — cadrage, développement, intégration SI et adoption.",
  heroText:
    "De l’identification du besoin jusqu’au déploiement : je conçois des solutions mêlant intelligence artificielle, produits numériques, APIs, automatisation et systèmes métier.",
  location: "Paris, France",
  // URL publique du site (utilisée pour le SEO, le sitemap et OpenGraph).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  links: {
    github: "https://github.com/okira-coder",
    githubHandle: "okira-coder",
    linkedin: "https://www.linkedin.com/in/franck-ariko-9a7480208",
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "franck.okira1@gmail.com",
  },
  nav: [
    { label: "Projets", href: "/#projets" },
    { label: "Expérience", href: "/#experience" },
    { label: "À propos", href: "/#a-propos" },
  ],
} as const;

export const impact = [
  { to: 877, label: "fontaines IoT analysées dans un projet de maintenance prédictive" },
  { to: 8, suffix: " / 8", label: "dernières pannes détectées par le système de maintenance prédictive" },
  { to: 3000, suffix: "+", label: "utilisateurs sur un produit sportif développé pour un client freelance" },
  { to: 30, suffix: "+", label: "utilisateurs internes d’une plateforme IoT métier" },
] as const;
