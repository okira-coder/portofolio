// Expériences professionnelles. Chaque bloc : un intitulé clair + une phrase qui explique concrètement ce qui a été fait.

export type ExperienceGroup = {
  /** Domaine, en quelques mots (lu en premier). */
  title: string;
  /** Ce qui a été fait, en langage clair. */
  text: string;
};

export type Experience = {
  company: string;
  role: string;
  /** Années, affichées en très grand. */
  years: string;
  /** Mois et lieu, sous les années. */
  dates: string;
  location: string;
  summary: string;
  groups: ExperienceGroup[];
  tools: string[];
  links?: { label: string; href: string }[];
};

export const experiences: Experience[] = [
  {
    company: "Castalie",
    role: "Chef de projet IA & Data",
    years: "2025 — 2026",
    dates: "Sept. 2025 – sept. 2026",
    location: "Boulogne-Billancourt",
    summary:
      "Entreprise d’environ 100 collaborateurs qui exploite un parc de fontaines à eau connectées. Je cadre, développe et déploie les projets IA et data, en lien avec les équipes métier, la direction et les prestataires.",
    groups: [
      {
        title: "IA générative en entreprise",
        text: "Déploiement de Claude (Team & Max) : administration des accès, cadrage des usages et règles de confidentialité. Connexion au SI via MCP (Odoo ERP, Slack, Notion) pour que l’IA réponde à partir des vraies données métier.",
      },
      {
        title: "Agents IA & RAG",
        text: "Conception d’agents ReAct multi-outils connectés à Odoo et Slack via n8n, et d’une architecture RAG hybride sur les bases de connaissances internes.",
      },
      {
        title: "Sécurité des LLM",
        text: "Guardrails contre l’injection de prompt et masquage des données personnelles (PII) avant tout envoi au modèle.",
      },
      {
        title: "Machine Learning industriel",
        text: "Maintenance prédictive sur 877 fontaines IoT : modèle One-Class SVM, pipeline quotidien automatisé et alertes Slack pour anticiper les pannes avec le SAV.",
      },
      {
        title: "Produit & intégration SI",
        text: "Plateforme iot.castalie.com : développement du frontend et des règles métier, APIs obtenues auprès de l’équipe Odoo et du prestataire IoT, déploiement du sous-domaine.",
      },
      {
        title: "Automatisation & développement assisté",
        text: "Sprint Reporter pour l’équipe projet, workflows n8n pour les RH, prototype de classification des tickets Zendesk relié à Odoo (environ 1 800 demandes par an). Mise en place de Claude Code pour accélérer le projet ERP Odoo.",
      },
      {
        title: "Pilotage & conduite du changement",
        text: "Audit des processus et priorisation des cas d’usage IA, coordination de l’équipe Odoo et des prestataires, documentation, démos et 4 ateliers de formation IA pour les équipes métier.",
      },
    ],
    tools: ["Claude", "MCP", "n8n", "Python", "PostgreSQL", "Odoo", "Slack", "Notion", "Zendesk"],
  },
  {
    company: "Freelance",
    role: "Développeur & Product Builder",
    years: "2025 — 2026",
    dates: "Déc. 2025 – juil. 2026",
    location: "Paris",
    summary:
      "Micro-entreprise de développement. Je conçois et livre des produits web pour des clients, de la maquette au déploiement, sur trois missions : sport, marketing / SEO et retail.",
    groups: [
      {
        title: "MonsieurWod — plateforme sociale sportive",
        text: "Conception et développement de bout en bout (Node.js, hébergé sur Railway) : WOD chronométrés, feed social, following et amis, statistiques, classements, badges, partage de photos et vidéos. Plus de 3 000 utilisateurs, produit toujours en ligne.",
      },
      {
        title: "Terolia — GEO, visibilité dans les réponses des IA",
        text: "Produit B2B réalisé de A à Z jusqu’au déploiement. Il mesure si une marque est citée par ChatGPT, Claude, Perplexity et Gemini, la compare à ses concurrents et propose un plan d’action priorisé. Frontend React, backend Python FastAPI, scraping, RAG, base Supabase (PostgreSQL + pgvector), hébergement Railway avec tâches planifiées. Utilisé par environ 5 professionnels, dont Castalie.",
      },
      {
        title: "TECH-UP Reprise — retail, rachat de smartphones",
        text: "Mise en place d’un CRM pour le suivi des leads et de règles de calcul déterministes pour estimer le prix d’un iPhone, en ligne sur cashupstore.fr.",
      },
    ],
    tools: ["Node.js", "React", "Python", "FastAPI", "Supabase", "PostgreSQL", "pgvector", "RAG", "Scraping", "Railway"],
    links: [
      { label: "Étude de cas MonsieurWod", href: "/projects/monsieurwod" },
      { label: "Étude de cas Terolia", href: "/projects/terolia" },
      { label: "Étude de cas TECH-UP Reprise", href: "/projects/cashup" },
    ],
  },
  {
    company: "Recrutons Ensemble",
    role: "Assistant chef de projet Data & Low Code",
    years: "2023 — 2024",
    dates: "Oct. 2023 – oct. 2024",
    location: "Marseille",
    summary:
      "Équipe RH de 5 personnes recevant, selon les postes, plus de 100 candidatures par jour. Mon rôle : réduire le travail manuel en automatisant le parcours des candidats.",
    groups: [
      {
        title: "Analyse des processus",
        text: "Cartographie des processus métier et identification des tâches répétitives à automatiser.",
      },
      {
        title: "Automatisation",
        text: "Automatisation de 3 processus avec Zapier, dont la classification des CV et l’orientation des candidats après le premier entretien : qualification téléphonique ou refus.",
      },
      {
        title: "Données & CRM",
        text: "Structuration des données et des outils internes avec Airtable et Notion, intégration de Pipedrive aux outils commerciaux.",
      },
      {
        title: "Accompagnement",
        text: "Tests avec les équipes, accompagnement à la prise en main et amélioration continue des automatisations.",
      },
    ],
    tools: ["Zapier", "Airtable", "Notion", "Pipedrive"],
  },
];
