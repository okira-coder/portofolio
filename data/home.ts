// Contenu court des projets sur la homepage. Le détail vit dans les études de cas (data/projects.ts).
import type { ImageSlot } from "./projects";

export const hero = {
  eyebrow: "AI Product · AI Engineering · Product Builder",
  title: "Je transforme des problèmes métier en produits IA.",
  subtitle: "De l’idée à la production — cadrage, développement, intégration SI et adoption.",
  portrait: {
    src: "/images/franck-portrait.jpg",
    alt: "Portrait de Franck ARIKO",
    width: 1200,
    height: 1500,
  } satisfies ImageSlot,
  iotPreview: {
    src: "/images/projects/iot/dashboard.png",
    alt: "Aperçu de la fiche d’une fontaine sur iot.castalie.com",
    width: 1160,
    height: 853,
  } satisfies ImageSlot,
  mobilePreview: {
    src: "/images/projects/monsieurwod/wod.png",
    alt: "Aperçu mobile MonsieurWod",
    width: 1170,
    height: 2532,
  } satisfies ImageSlot,
};

export const predictive = {
  slug: "predictive-maintenance",
  name: "Maintenance prédictive Castalie",
  title: "Détecter la dégradation des groupes froids avant l’incident client.",
  role: "Cadrage, modèle, pipeline quotidien et suivi terrain avec le SAV.",
  metrics: [
    { to: 877, label: "fontaines analysées chaque jour" },
    { to: 8, suffix: " / 8", label: "dernières pannes détectées" },
    { to: 16, prefix: "J-", label: "anticipation maximale historique observée" },
  ],
  pipeline: ["Fontaines", "PostgreSQL", "Feature engineering", "One-Class SVM", "Alertes"],
  slack: {
    src: "/images/projects/predictive/slack-alert.png",
    alt: "Rapport quotidien et alerte Slack envoyés au SAV (identifiants masqués)",
    width: 1008,
    height: 792,
  } satisfies ImageSlot,
};

export const iot = {
  slug: "castalie-iot",
  name: "iot.castalie.com",
  title: "Transformer les données IoT en outil métier",
  users: { to: 30, suffix: "+", label: "utilisateurs internes : SAV, industrie, direction" },
  contribution:
    "Frontend et règles métier. APIs obtenues auprès de l’équipe Odoo et de Polygone, prestataire IoT, puis déploiement du sous-domaine.",
  annotations: ["Fiche fontaine", "Alertes en cours", "Historique des alertes", "Actions à distance"],
  screenshot: {
    src: "/images/projects/iot/dashboard.png",
    alt: "Fiche d’une fontaine sur iot.castalie.com : informations, alertes en cours et historique (données client masquées)",
    width: 1160,
    height: 853,
  } satisfies ImageSlot,
};

export const mcp = {
  slug: "claude-mcp",
  name: "IA générative & MCP Castalie",
  title: "Connecter une IA générative au système d’information.",
  text: "Claude relié à Odoo, Slack et Notion via MCP : la direction interroge les données métier en langage naturel, et l’outil s’ouvre progressivement aux équipes.",
  nodes: ["Odoo", "Slack", "Notion", "SI métier"],
  flow: ["Question", "Permission", "MCP", "Outil", "Réponse contextualisée"],
  decision: "Une première architecture, CastaAI, a été abandonnée au profit de cette approche plus simple.",
};

export const wod = {
  slug: "monsieurwod",
  name: "MonsieurWod",
  title: "Une plateforme sociale autour du CrossFit et des WOD",
  users: { to: 3000, suffix: "+", label: "utilisateurs" },
  text: "Mission freelance, de la conception au déploiement : WOD chronométrés, feed social, classements, badges et partage de photos et vidéos.",
  period: "Janvier – juillet 2026",
  phones: [
    { src: "/images/projects/monsieurwod/wods.png", alt: "Catalogue de WODs avec leurs points", width: 1170, height: 2532 },
    { src: "/images/projects/monsieurwod/wod.png", alt: "Accueil : WOD recommandé et récap du mois", width: 1170, height: 2532 },
    { src: "/images/projects/monsieurwod/feed.png", alt: "Feed social : performances, scores et vidéos", width: 1170, height: 2532 },
  ] satisfies ImageSlot[],
};

export const journey = [
  { step: "Informatique", proof: "Licence spécialisation IA, Aix-Marseille Université" },
  { step: "Développement", proof: "Produits web et mobiles livrés en freelance" },
  { step: "IA", proof: "Machine Learning et IA générative appliqués" },
  { step: "Produit", proof: "Plateformes utilisées par des clients et des équipes" },
  { step: "Industrialisation", proof: "Pipelines automatisés et intégrations au SI" },
];
