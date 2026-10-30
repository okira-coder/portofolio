# Portfolio — Franck ARIKO

Next.js 16 (App Router), TypeScript, Tailwind CSS 4, Motion, Lucide.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de production
```

## Modifier le contenu

Tout le texte est dans `data/`, l’UI n’a pas besoin d’être touchée :

- `data/site.ts` : identité, liens, chiffres d’impact
- `data/home.ts` : textes courts de la homepage (hero, 4 projets, parcours)
- `data/projects.ts` : les 4 projets principaux, leurs études de cas, les Labs
- `data/experience.ts` : expériences
- `data/skills.ts` : compétences, méthode, gestion de projet, ateliers, À propos

Une section d’étude de cas encore inconnue s’écrit `todo("…")` : elle s’affiche en placeholder.
Ajouter un projet = ajouter une entrée dans `projects` ; la page `/projects/<slug>` et le sitemap suivent.

## Images

Déposer les captures dans `public/images/` avec le nom attendu
(liste dans `public/images/README.md`). Tant qu’un fichier manque, un placeholder
indiquant le chemin attendu s’affiche.

## Variables d’environnement

| Variable | Rôle |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL publique (SEO, sitemap, OpenGraph) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Adresse du bouton « Me contacter » |
