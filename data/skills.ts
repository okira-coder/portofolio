// Compétences, méthode, gestion de projet, transmission, parcours.

export const skillGroups = [
  {
    name: "Product & projet",
    items: ["Cadrage & recueil des besoins", "Cas d’usage IA", "Cahier des charges", "Roadmap & backlog", "MVP", "Recette", "ROI", "Conformité AI Act", "Conduite du changement"],
  },
  {
    name: "Intelligence artificielle",
    note: "Implémentés en pratique",
    items: ["Machine Learning", "LLM & prompt engineering", "RAG hybride", "Agents IA (ReAct)", "MCP", "Guardrails", "vLLM"],
  },
  {
    name: "Engineering",
    items: ["Python", "FastAPI", "Node.js", "React", "Next.js", "SQL", "REST APIs & webhooks", "PostgreSQL", "pgvector", "Scraping", "Docker", "Conteneurisation", "CI/CD", "Authentification", "Power BI"],
  },
  {
    name: "Intégrations & plateformes",
    items: ["Odoo", "n8n", "Zapier", "Zendesk", "Pipedrive", "Airtable", "Slack", "Notion", "Supabase", "Railway"],
  },
] as const;

export const methodSteps = [
  { name: "Comprendre", items: ["Utilisateurs", "Processus", "Irritants", "Données disponibles"] },
  { name: "Prioriser", items: ["Impact", "Faisabilité", "Risques", "ROI"] },
  { name: "Prototyper", items: ["MVP", "Architecture", "Tests rapides"] },
  { name: "Mesurer", items: ["KPI", "Utilisateurs", "Qualité", "Erreurs"] },
  { name: "Industrialiser", items: ["APIs", "Sécurité", "Tests", "Monitoring", "Infrastructure"] },
  { name: "Déployer", items: ["Formation", "Documentation", "Adoption", "Feedback"] },
] as const;

export const methodQuote =
  "Un bon projet IA ne se termine pas lorsque le modèle fonctionne. Il se termine lorsqu’il crée réellement de la valeur pour les utilisateurs.";

export const projectManagement = {
  practices: [
    "Cahier des charges et specs",
    "Backlog et priorisation",
    "Sprint planning",
    "Recette",
    "Coordination de développeurs et de prestataires",
    "Présentation à la direction",
    "Calcul de ROI",
    "Conduite du changement",
  ],
  stakeholders: [
    "Équipe Odoo",
    "Prestataire infrastructure IoT",
    "Prestataire web",
    "Équipe industrielle",
    "SAV",
    "Direction",
  ],
};

export const training = {
  workshops: "4",
  perWorkshop: "4",
  topics: ["Bonnes pratiques IA", "Utilisation des LLM", "Limites", "Confidentialité", "Usages métier"],
  audiences: ["Finance", "Commerce", "Communication", "Métiers opérationnels"],
};

export const about = {
  paragraphs: [
    "J’ai commencé par écrire du code. Puis, à force de travailler avec les équipes métier, je me suis intéressé à ce qui se passe avant et après : quel problème mérite d’être résolu, comment le mesurer, comment faire adopter la solution.",
    "Aujourd’hui je fais les deux : je cadre et je pilote, mais je construis aussi les prototypes moi-même et je les accompagne jusqu’à la production, chez Castalie comme en freelance.",
  ],
  github: {
    src: "/images/about/github-profile.png",
    alt: "Profil GitHub okira-coder : 68 dépôts et des contributions chaque année depuis 2022",
    width: 2880,
    height: 1510,
    caption: "Profil GitHub : 68 dépôts et des contributions année après année depuis 2022, bien avant l’arrivée de l’IA générative dans mon quotidien.",
  },
  education: [
    { title: "Manager de la Transformation Digitale, Data et IA", detail: "Mastère Chef de projet IA, titre certifié niveau 7 · ISCOD Paris" },
    { title: "Licence Informatique, spécialisation IA", detail: "Aix-Marseille Université · 2020 – 2023" },
  ],
  certifications: [
    { title: "Hackathon IA 2025 — Hacktogone", detail: "1er hackathon IA de France : création d’agents IA, équipe de 3 en 48 h" },
    { title: "Kaggle — Data Visualization", detail: "2024" },
  ],
  languages: [
    { name: "Français", level: "Courant / natif" },
    { name: "Anglais", level: "Professionnel technique : documentation, présentation de projets" },
  ],
};
