// Contenu des projets et études de cas.
// Règle : aucun chiffre, client ou fonctionnalité qui n’ait pas été confirmé.
// Une information manquante s’écrit avec `todo(...)`, elle s’affiche comme placeholder.

export type Status = "Production" | "Pré-production" | "Prototype" | "R&D" | "MVP";

export type ImageSlot = {
  /** Chemin attendu dans /public. S’il n’existe pas, un placeholder est affiché. */
  src: string;
  alt: string;
  /** Dimensions prévues du visuel, en pixels. */
  width: number;
  height: number;
  caption?: string;
};

export type Metric = { value: string; label: string };

export type CaseSection =
  | { kind: "text"; paragraphs: string[] }
  | { kind: "list"; intro?: string; items: string[] }
  | { kind: "metrics"; intro?: string; metrics: Metric[]; note?: string }
  | { kind: "pipeline"; intro?: string; steps: string[]; note?: string }
  | { kind: "todo"; note: string };

export type CaseStudy = {
  period: string;
  role: string;
  problem: CaseSection;
  users: CaseSection;
  constraints: CaseSection;
  approach: CaseSection;
  architecture: CaseSection;
  personal: CaseSection;
  results: CaseSection;
  failures: CaseSection;
  changes: CaseSection;
  learnings: CaseSection;
  aside?: { title: string; paragraphs: string[] };
  images: ImageSlot[];
};

export type Project = {
  slug: string;
  number: string;
  name: string;
  category: string;
  title: string;
  problem: string;
  result: string;
  role: string;
  stack: string[];
  status: Status;
  statusDetail: string;
  cover: ImageSlot;
  caseStudy: CaseStudy;
};

const todo = (note: string): CaseSection => ({ kind: "todo", note });

export const projects: Project[] = [
  {
    slug: "predictive-maintenance",
    number: "01",
    name: "Maintenance prédictive Castalie",
    category: "Machine Learning · IoT · MLOps · Produit métier",
    title: "Anticiper les pannes avant qu’elles n’impactent le client",
    problem:
      "La maintenance du parc de fontaines connectées était réactive : la panne était souvent déjà perceptible par le client au moment de l’intervention SAV.",
    result:
      "Détection d’anomalies sur 877 fontaines : 8 / 8 dernières pannes détectées, jusqu’à 16 jours d’anticipation observés, pipeline quotidien en moins d’une minute.",
    role: "Cadrage, data science, industrialisation du pipeline et suivi terrain",
    stack: ["Python", "PostgreSQL", "One-Class SVM", "PCA", "Slack"],
    status: "Pré-production",
    statusDetail: "Pré-production / validation terrain avancée",
    cover: {
      src: "/images/projects/predictive/architecture.png",
      width: 1600,
      height: 1000,
      alt: "Diagramme d’architecture du pipeline de maintenance prédictive",
    },
    caseStudy: {
      period: "2025 – 2026",
      role: "Chef de Projet IA & Data — conception, développement et pilotage",
      problem: {
        kind: "text",
        paragraphs: [
          "Castalie exploite un parc de fontaines connectées qui remontent des données IoT. Jusqu’ici, la maintenance était principalement réactive : un seuil d’alerte se déclenchait, ou la panne devenait perceptible, le client appelait, puis le SAV intervenait.",
          "L’objectif : exploiter les données déjà collectées pour repérer la dégradation du groupe froid avant la panne, et donner au SAV le temps d’intervenir avant que le client ne la remarque.",
        ],
      },
      users: {
        kind: "list",
        items: [
          "L’équipe SAV, qui reçoit les alertes et planifie les interventions.",
          "L’équipe industrielle, qui analyse les causes des défaillances.",
        ],
      },
      constraints: {
        kind: "list",
        items: [
          "Des pannes rares : peu d’exemples positifs pour apprendre, d’où une approche par détection d’anomalies plutôt que par classification.",
          "Des fréquences de remontée des données hétérogènes d’une fontaine à l’autre.",
          "Une alerte n’a de valeur que si le SAV lui fait confiance : le bruit coûte autant qu’une panne manquée.",
          "Une base PostgreSQL volumineuse à restaurer avant chaque traitement.",
        ],
      },
      approach: {
        kind: "list",
        items: [
          "Audit des données IoT disponibles et analyse exploratoire.",
          "Définition des KPI avec les équipes SAV et industrielles.",
          "Feature engineering sur les signaux du groupe froid.",
          "Benchmark de trois modèles : Isolation Forest, One-Class SVM, Local Outlier Factor.",
          "Industrialisation du pipeline et orchestration quotidienne.",
          "Alerting métier dans Slack, puis monitoring.",
          "Itérations à partir des retours du SAV et de l’équipe industrielle.",
        ],
      },
      architecture: {
        kind: "pipeline",
        intro: "Pipeline quotidien :",
        steps: [
          "IoT",
          "PostgreSQL",
          "Extraction",
          "Feature engineering",
          "Modèle",
          "Diagnostic",
          "Persistance",
          "Slack",
        ],
        note: "Modèle retenu : RobustScaler → PCA(5) → One-Class SVM, suivi d’un moteur de diagnostic à règles métier.",
      },
      personal: {
        kind: "list",
        items: [
          "Cadrage du besoin avec le SAV et l’équipe industrielle.",
          "Analyse des données et benchmark des modèles, choix du One-Class SVM.",
          "Conception et développement du pipeline, de l’extraction à l’alerte Slack.",
          "Optimisation de la restauration PostgreSQL.",
          "Suivi des faux positifs et recalibrage des règles de diagnostic.",
          "Rédaction du cahier des charges et modélisation économique (ROI).",
          "Classification du risque du système selon l’EU AI Act.",
        ],
      },
      results: {
        kind: "metrics",
        intro: "Benchmark historique du One-Class SVM, phase shadow et industrialisation :",
        metrics: [
          { value: "89 %", label: "recall (benchmark)" },
          { value: "44 %", label: "precision (benchmark)" },
          { value: "59 %", label: "F1 (benchmark)" },
          { value: "8 / 9", label: "pannes détectables détectées (benchmark)" },
          { value: "6 / 6", label: "pannes détectées pendant la phase shadow initiale" },
          { value: "16 j", label: "d’anticipation maximale observée" },
          { value: "13 Go → 185 Mo", label: "restauration PostgreSQL" },
          { value: "15–30 min → 18 s", label: "temps de restauration" },
          { value: "< 1 min", label: "pipeline complet en régime nominal" },
        ],
        note: "Depuis la phase shadow documentée dans le mémoire : 8 / 8 dernières pannes détectées. Les deux plus récentes (fin septembre et début octobre) ont été détectées environ 2 jours et 1 jour à l’avance. L’anticipation médiane historique est de quelques jours. Le système n’est pas « 100 % précis ».",
      },
      failures: {
        kind: "text",
        paragraphs: [
          "La première version détectait bien les pannes, mais générait beaucoup trop d’alertes. La précision par alerte-jour n’était que de 6,9 % : pour le SAV, l’essentiel des notifications était du bruit.",
          "Un modèle qui trouve les pannes mais noie l’équipe sous les alertes n’est pas utilisable, même avec un bon recall.",
        ],
      },
      changes: {
        kind: "list",
        items: [
          "Investigation alerte par alerte avec les retours terrain.",
          "Calibration des seuils (P99) sur les fontaines saines.",
          "Correction du diagnostic physique et suppression des règles inutiles.",
          "Résultat actuel : entre 2 et 9 alertes, jugées pertinentes lors du suivi terrain.",
        ],
      },
      learnings: {
        kind: "list",
        items: [
          "En ML industriel, la métrique qui compte pour l’utilisateur n’est pas forcément celle du benchmark : ici, c’était le volume d’alertes à traiter.",
          "Une phase shadow, sans impact sur les opérations, permet de mesurer en conditions réelles avant d’engager l’équipe.",
          "L’optimisation de l’infrastructure (restauration, temps de traitement) conditionne la possibilité d’itérer chaque jour.",
        ],
      },
      images: [
        {
          src: "/images/projects/predictive/architecture.png",
      width: 1600,
      height: 1000,
          alt: "Diagramme d’architecture du pipeline",
          caption: "Architecture du pipeline quotidien",
        },
        {
          src: "/images/projects/predictive/slack-alert.png",
      width: 1008,
      height: 792,
          alt: "Rapport quotidien et alerte Slack envoyés au SAV",
          caption: "Rapport quotidien et alerte détaillée dans Slack : panne prédite, urgence, preuves déclenchantes et action conseillée (identifiants masqués)",
        },
        {
          src: "/images/projects/predictive/benchmark.png",
      width: 1600,
      height: 1000,
          alt: "Benchmark des trois algorithmes, scores d’anomalie",
          caption: "Benchmark des trois algorithmes",
        },
      ],
    },
  },
  {
    slug: "castalie-iot",
    number: "02",
    name: "iot.castalie.com",
    category: "Product · IoT · Data · API",
    title: "Transformer les données IoT en outil métier",
    problem:
      "Les données des fontaines connectées étaient dispersées entre le serveur IoT, l’ERP Odoo et les équipes, sans interface commune pour les clients ni pour les collaborateurs.",
    result:
      "Une plateforme unique : suivi des consommations et bilan RSE pour les clients, recherche de fontaine et alertes pour environ 30 utilisateurs internes.",
    role: "Développement frontend, règles métier, coordination des APIs et déploiement",
    stack: ["APIs REST", "Odoo", "API serveur IoT", "FTP"],
    status: "Production",
    statusDetail: "Production",
    cover: {
      src: "/images/projects/iot/dashboard.png",
      width: 1160,
      height: 853,
      alt: "Fiche d’une fontaine sur iot.castalie.com",
    },
    caseStudy: {
      period: "2025 – 2026",
      role: "Chef de Projet IA & Data — développement et coordination",
      problem: {
        kind: "text",
        paragraphs: [
          "Les fontaines Castalie remontent des données techniques, mais ces données restaient difficiles à exploiter : réparties entre le serveur IoT du prestataire et l’ERP Odoo, elles n’étaient accessibles ni aux clients ni simplement aux équipes internes.",
          "Je n’ai pas seulement développé une interface. J’ai coordonné plusieurs systèmes et interlocuteurs pour transformer des données techniques dispersées en un produit métier unique.",
        ],
      },
      users: {
        kind: "list",
        intro: "Deux usages :",
        items: [
          "Clients Castalie : visualisation des consommations, données de leurs fontaines, indicateurs environnementaux et bilan RSE.",
          "Collaborateurs Castalie (environ 30, SAV, industriel, direction) : rechercher une fontaine, consulter son état et ses informations techniques, suivre les alertes en cours.",
        ],
      },
      constraints: {
        kind: "list",
        items: [
          "Trois systèmes et trois interlocuteurs : l’équipe Odoo, Polygone (prestataire de l’infrastructure IoT) et le prestataire du site castalie.com.",
          "Des APIs à définir ou à obtenir avant de pouvoir construire l’interface.",
          "Un déploiement sur un sous-domaine d’un site géré par un prestataire externe.",
        ],
      },
      approach: {
        kind: "list",
        items: [
          "Analyse du besoin des clients et des équipes internes.",
          "Définition, avec l’équipe Odoo, des APIs nécessaires côté ERP.",
          "Intégration des APIs du serveur IoT des fontaines fournies par Polygone.",
          "Développement du frontend et implémentation des règles métier.",
          "Obtention des accès auprès du prestataire de castalie.com, puis déploiement.",
        ],
      },
      architecture: {
        kind: "pipeline",
        steps: ["Serveur IoT (Polygone)", "API Odoo", "Règles métier", "Frontend", "iot.castalie.com"],
        note: "Déploiement du sous-domaine iot.castalie.com via FTP.",
      },
      personal: {
        kind: "list",
        items: [
          "Développement du frontend.",
          "Implémentation de règles métier.",
          "Définition des APIs nécessaires avec l’équipe Odoo.",
          "Coordination avec Polygone pour l’intégration des APIs IoT.",
          "Échanges avec le prestataire de castalie.com et déploiement du sous-domaine.",
        ],
      },
      results: {
        kind: "metrics",
        metrics: [
          { value: "Production", label: "plateforme en ligne" },
          { value: "≈ 30", label: "utilisateurs internes (SAV, industriel, direction)" },
          { value: "2", label: "publics servis : clients et équipes internes" },
        ],
      },
      failures: todo("À compléter : difficultés rencontrées pendant l’intégration ou après la mise en ligne."),
      changes: todo("À compléter : ajustements faits après les premiers retours utilisateurs."),
      learnings: {
        kind: "list",
        items: [
          "Sur un produit connecté au SI, une grande partie du travail se joue avant le code : obtenir les bonnes APIs et les bons accès.",
          "Coordonner trois prestataires demande de traduire un besoin métier en demandes techniques précises.",
        ],
      },
      images: [
        {
          src: "/images/projects/iot/dashboard.png",
      width: 1160,
      height: 853,
          alt: "Fiche d’une fontaine sur iot.castalie.com",
          caption: "Vue interne : fiche d’une fontaine, alertes en cours, historique et actions à distance (données client masquées)",
        },
        {
          src: "/images/projects/iot/internal.png",
      width: 1600,
      height: 1000,
          alt: "Vue interne de recherche d’une fontaine",
          caption: "Vue interne : recherche d’une fontaine et alertes",
        },
      ],
    },
  },
  {
    slug: "claude-mcp",
    number: "03",
    name: "IA générative & MCP Castalie",
    category: "GenAI · MCP · Agents · SI",
    title: "Connecter une IA générative au système d’information",
    problem:
      "Les informations des équipes sont réparties entre plusieurs outils. L’objectif : permettre à une IA d’utiliser les données métier de façon contextualisée, sans créer un énième outil isolé.",
    result:
      "Claude connecté à Odoo, Slack et Notion via MCP, utilisé par la direction et ouvert progressivement aux équipes qui en font la demande.",
    role: "Cadrage, gouvernance des accès, intégrations MCP et accompagnement",
    stack: ["Claude Team & Max", "MCP", "Odoo", "Slack", "Notion", "Claude Code"],
    status: "Production",
    statusDetail: "Production / déploiement progressif",
    cover: {
      src: "/images/projects/mcp/architecture.png",
      width: 1600,
      height: 1000,
      alt: "Schéma des intégrations MCP entre Claude et le SI",
    },
    caseStudy: {
      period: "2025 – 2026",
      role: "Chef de Projet IA & Data — cadrage, intégration et déploiement",
      problem: {
        kind: "text",
        paragraphs: [
          "Comment permettre à une direction d’interroger et d’utiliser les données métier à travers une IA, sans exposer ces données ni construire un chatbot isolé du reste du SI ?",
        ],
      },
      users: {
        kind: "list",
        items: [
          "La direction, utilisatrice principale aujourd’hui.",
          "Les équipes métier qui en font la demande, au fil d’un déploiement progressif.",
        ],
      },
      constraints: {
        kind: "list",
        items: [
          "Confidentialité des données métier.",
          "Gouvernance des accès : chacun ne doit accéder qu’à ce qui le concerne.",
          "Adoption par des utilisateurs non techniques.",
        ],
      },
      approach: {
        kind: "pipeline",
        steps: ["Besoin", "Sécurité", "Architecture", "MCP", "Intégrations", "Tests", "Déploiement", "Adoption"],
      },
      architecture: {
        kind: "pipeline",
        steps: ["Utilisateur", "Claude", "Serveurs MCP", "Odoo, Slack, Notion"],
      },
      personal: {
        kind: "list",
        items: [
          "Cadrage des cas d’usage.",
          "Réflexion sur la confidentialité et gouvernance des accès.",
          "Déploiement de Claude Team & Max : administration des accès et règles de confidentialité.",
          "Connexion au SI via MCP : Odoo ERP, Slack et Notion.",
          "Mise en place de Claude Code pour accélérer les développements du projet ERP Odoo.",
          "Tests, documentation et accompagnement des utilisateurs.",
        ],
      },
      results: {
        kind: "metrics",
        metrics: [
          { value: "Production", label: "utilisé par la direction" },
          { value: "Progressif", label: "ouverture aux équipes qui en font la demande" },
        ],
      },
      failures: {
        kind: "text",
        paragraphs: [
          "La première approche était un assistant interne, CastaAI, construit sur l’interface open source Better Chatbot et connecté à un serveur MCP Odoo.",
          "Après expérimentation, la complexité à maintenir était trop élevée au regard de ce qu’apportaient déjà les outils disponibles.",
        ],
      },
      changes: {
        kind: "text",
        paragraphs: [
          "Le projet CastaAI a été abandonné au profit d’une approche plus simple : Claude directement connecté au SI via MCP.",
        ],
      },
      learnings: {
        kind: "list",
        items: [
          "Ne pas conserver une architecture uniquement parce qu’on l’a déjà développée.",
          "Pour une IA d’entreprise, la gouvernance des accès et l’accompagnement comptent autant que l’intégration technique.",
        ],
      },
      aside: {
        title: "Une solution que j’ai choisi d’abandonner",
        paragraphs: [
          "CastaAI, un assistant interne basé sur Better Chatbot et MCP, a été arrêté après évaluation. Une intégration directe de Claude au SI répondait au même besoin, plus simplement.",
          "C’est une décision produit : la valeur vient de l’usage, pas de la quantité de code écrite.",
        ],
      },
      images: [
        {
          src: "/images/projects/mcp/architecture.png",
      width: 1600,
      height: 1000,
          alt: "Schéma des intégrations MCP",
          caption: "Claude, serveurs MCP et outils du SI",
        },
      ],
    },
  },
  {
    slug: "monsieurwod",
    number: "04",
    name: "MonsieurWod",
    category: "Freelance · Produit web · Sport",
    title: "Construire une plateforme sociale autour du CrossFit et des WOD",
    problem:
      "Un client voulait une plateforme où les pratiquants de CrossFit réalisent leurs WOD, suivent leurs progrès et partagent leurs performances.",
    result:
      "Un produit toujours en ligne, utilisé par plus de 3 000 personnes.",
    role: "Conception et développement du produit jusqu’au déploiement",
    stack: ["Node.js", "Railway"],
    status: "Production",
    statusDetail: "Production",
    cover: {
      src: "/images/projects/monsieurwod/wod.png",
      width: 1170,
      height: 2532,
      alt: "Capture de l’application MonsieurWod",
    },
    caseStudy: {
      period: "Janvier 2026 – juillet 2026",
      role: "Freelance — conception et développement jusqu’au déploiement",
      problem: {
        kind: "text",
        paragraphs: [
          "Construire une plateforme sociale d’entraînement : réaliser un WOD chronométré, publier ses séances, suivre celles de ses amis et comparer ses performances, avec une logique proche du social fitness à la Strava.",
        ],
      },
      users: {
        kind: "text",
        paragraphs: ["Des pratiquants de CrossFit : plus de 3 000 utilisateurs à ce jour."],
      },
      constraints: todo("À compléter : contraintes du client (délais, budget, plateformes visées)."),
      approach: todo("À compléter : déroulé de la mission, de la conception au déploiement."),
      architecture: {
        kind: "pipeline",
        steps: ["Application", "Backend Node.js", "Hébergement Railway"],
        note: "Le reste de la stack est à préciser.",
      },
      personal: {
        kind: "list",
        intro: "Conception et développement du produit jusqu’au déploiement, dont :",
        items: [
          "Lancer et suivre un WOD avec chronomètre.",
          "Publication des entraînements et feed social.",
          "Following et amis, profils utilisateurs, consultation des performances des autres.",
          "Statistiques, classements et badges.",
          "Partage de photos et vidéos, avec filtres inspirés des usages type Strava.",
        ],
      },
      results: {
        kind: "metrics",
        metrics: [
          { value: "3 000+", label: "utilisateurs" },
          { value: "Production", label: "produit toujours accessible" },
        ],
      },
      failures: todo("À compléter : principale difficulté technique ou produit rencontrée."),
      changes: todo("À compléter : ce qui a été ajusté en cours de mission."),
      learnings: todo("À compléter : enseignements de la mission."),
      images: [
        {
          src: "/images/projects/monsieurwod/wod.png",
      width: 1170,
      height: 2532,
          alt: "Accueil MonsieurWod : WOD recommandé et récap du mois",
          caption: "Accueil : WOD recommandé à l’inscription et récap du mois",
        },
        {
          src: "/images/projects/monsieurwod/feed.png",
      width: 1170,
      height: 2532,
          alt: "Feed social MonsieurWod",
          caption: "Feed : performances validées, scores et vidéos (autres utilisateurs anonymisés)",
        },
      ],
    },
  },
];

export type Lab = {
  name: string;
  category: string;
  /** Une phrase, affichée sur la homepage. */
  summary: string;
  /** Détails conservés pour une future page dédiée. */
  details: string[];
  status: Status;
  statusDetail: string;
  note?: string;
  /** Lien public (dépôt GitHub), uniquement s’il existe. */
  link?: { label: string; href: string };
  image: ImageSlot;
};

export const labs: Lab[] = [
  {
    name: "ViralHit",
    category: "Computer Vision · Mobile · Live",
    summary:
      "Fondateur solo : une application gratuite qui compte les répétitions sportives avec la caméra du téléphone.",
    details: [
      "Comptage de répétitions, défis sportifs, sessions live",
      "React Native, Supabase, LiveKit, modèle de pose Google",
    ],
    status: "MVP",
    statusDetail: "MVP fonctionnel, pas encore lancé",
    image: {
      src: "/images/projects/viralhit/app.png",
      width: 1170,
      height: 2532,
      alt: "Écran ViralHit : caméra et squelette de pose",
    },
  },
  {
    name: "Trader Lab",
    category: "Quant Research · Trading Systems · R&D",
    summary:
      "Un laboratoire de recherche de stratégies : données Kraken, backtesting, walk-forward, Monte-Carlo et frais réels.",
    details: [
      "Données Kraken, reconstruction des données marché, frais réels",
      "Backtesting, walk-forward, Monte-Carlo, holdout",
      "Gestion du risque, recherche évolutionnaire, journal des expériences",
    ],
    status: "R&D",
    statusDetail: "R&D active, système personnel fonctionnel",
    image: {
      src: "/images/projects/traderlab/dashboard.png",
      width: 1600,
      height: 1000,
      alt: "Dashboard Trader Lab : courbe de stratégie ou journal d’expériences",
    },
  },
  {
    name: "Goutte d’eau",
    category: "Machine Learning · Weather · API",
    summary:
      "Prévoir la pluie à J+1 pour des agriculteurs d’Occitanie, en documentant honnêtement les limites du modèle.",
    details: [
      "Données SYNOP Météo-France, SQL, FastAPI, Streamlit",
      "Logistic Regression en baseline, puis XGBoost",
      "23 000+ observations, 30+ features, TimeSeriesSplit, 33 tests",
    ],
    status: "Prototype",
    statusDetail: "Prototype",
    note: "La cible de ROC-AUC fixée n’a pas été atteinte, et le projet le documente.",
    link: { label: "Voir le code", href: "https://github.com/okira-coder/Projets-goutte-d-eau" },
    image: {
      src: "/images/projects/goutte/dashboard.png",
      width: 1600,
      height: 1000,
      alt: "Interface Streamlit de prévision Goutte d’eau",
    },
  },
  {
    name: "Mon ordonnance facile",
    category: "GenAI · Safety · Accessibility",
    summary:
      "Responsable IA en équipe de 3 : rendre une ordonnance compréhensible, avec validation obligatoire du pharmacien.",
    details: [
      "Mistral, choisi pour un acteur européen et le contexte RGPD",
      "Guardrails, seuils de confiance, human-in-the-loop",
    ],
    status: "Prototype",
    statusDetail: "Prototype de bootcamp, pas un dispositif médical",
    link: { label: "Voir le code", href: "https://github.com/okira-coder/Mon-ordonnance-facile" },
    image: {
      src: "/images/projects/ordonnance/app.png",
      width: 1600,
      height: 1000,
      alt: "Interface patient et pharmacien de Mon ordonnance facile",
    },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
