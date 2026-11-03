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
  /** Site ou application en ligne. */
  link?: { label: string; href: string };
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
    stack: ["Python", "Docker", "PostgreSQL", "One-Class SVM", "PCA", "Slack"],
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
        note: "Modèle retenu : RobustScaler → PCA(5) → One-Class SVM, suivi d’un moteur de diagnostic à règles métier. L’ensemble du pipeline (extraction, modèle, diagnostic, alerting) est conteneurisé avec Docker.",
      },
      personal: {
        kind: "list",
        items: [
          "Cadrage du besoin avec le SAV et l’équipe industrielle.",
          "Analyse des données et benchmark des modèles, choix du One-Class SVM.",
          "Conception et développement du pipeline, de l’extraction à l’alerte Slack.",
          "Conteneurisation de l’ensemble du pipeline avec Docker.",
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
      failures: todo(""),
      changes: todo(""),
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
      constraints: todo(""),
      approach: todo(""),
      architecture: {
        kind: "pipeline",
        steps: ["Application", "Backend Node.js", "Hébergement Railway"],
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
      failures: todo(""),
      changes: todo(""),
      learnings: todo(""),
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
  {
    slug: "onbump",
    number: "05",
    name: "OnBump",
    category: "Produit · Mobile & Web · Networking",
    title: "Trouver les bons événements et rencontrer les bonnes personnes",
    problem:
      "Un événement dure quelques heures, mais les rencontres qu’il permet se perdent souvent après coup. OnBump aide à choisir où aller, qui rencontrer, et à relancer au bon moment.",
    result:
      "Application mobile iPhone et site web en ligne sur onbump.net : plus d’une centaine d’événements recensés et plus de 2 500 visiteurs web.",
    role: "Conception et développement de l’application mobile et du site web",
    stack: ["Next.js", "Supabase", "Application iPhone"],
    status: "Production",
    statusDetail: "En ligne : iPhone et web",
    link: { label: "Voir onbump.net", href: "https://onbump.net" },
    cover: {
      src: "/images/projects/onbump/home.png",
      width: 1440,
      height: 900,
      alt: "Accueil du site onbump.net",
    },
    caseStudy: {
      period: "2026",
      role: "Conception et développement — application mobile et site web",
      problem: {
        kind: "text",
        paragraphs: [
          "Les événements professionnels réunissent beaucoup de monde, mais on repart souvent sans savoir qui était vraiment pertinent à rencontrer, ni comment relancer ensuite.",
          "OnBump se positionne avant, pendant et après l’événement : trouver où aller, savoir qui rencontrer, échanger en une seconde et relancer au bon moment.",
        ],
      },
      users: {
        kind: "list",
        items: [
          "Les networkers, qui cherchent où aller et qui rencontrer.",
          "Les organisateurs, qui veulent faire découvrir leur événement.",
        ],
      },
      constraints: todo(""),
      approach: todo(""),
      architecture: todo(""),
      personal: {
        kind: "list",
        items: [
          "Application mobile iPhone et site web onbump.net.",
          "Parcours côté networkers : découvrir les événements, repérer les personnes à rencontrer.",
          "Parcours côté organisateurs : faire découvrir son événement.",
        ],
      },
      results: {
        kind: "metrics",
        metrics: [
          { value: "100+", label: "événements recensés" },
          { value: "2 500+", label: "visiteurs web" },
          { value: "iOS + web", label: "application iPhone et site web" },
        ],
      },
      failures: todo(""),
      changes: todo(""),
      learnings: todo(""),
      images: [
        {
          src: "/images/projects/onbump/home.png",
          width: 1440,
          height: 900,
          alt: "Accueil de onbump.net",
          caption: "Accueil : « Les bonnes rencontres commencent avant l’événement »",
        },
        {
          src: "/images/projects/onbump/networkers.png",
          width: 1440,
          height: 900,
          alt: "Page networkers de onbump.net",
          caption: "Page networkers : trouver où aller et qui rencontrer",
        },
        {
          src: "/images/projects/onbump/organisateurs.png",
          width: 1440,
          height: 900,
          alt: "Page organisateurs de onbump.net",
          caption: "Page organisateurs : faire découvrir son événement",
        },
      ],
    },
  },
  {
    slug: "opsbyfranck",
    number: "06",
    name: "Claude Ops by Franck",
    category: "Produit · IA générative · B2B",
    title: "Des workflows IA pour gagner du temps et structurer les équipes",
    problem:
      "Les équipes B2B perdent des heures sur des tâches répétitives (synthèses, prospection, RH, SEO). Claude Ops propose des workflows IA testés, qui donnent un résultat concret en moins de 2 minutes.",
    result:
      "Un catalogue de 20 workflows en ligne sur opsbyfranck.com, par métier : SEO & Marketing, Vente, RH, Management & Ops.",
    role: "Conception, création des workflows et développement du site",
    stack: ["Next.js", "Supabase", "Claude (Artifacts)"],
    status: "Production",
    statusDetail: "En ligne",
    link: { label: "Voir opsbyfranck.com", href: "https://opsbyfranck.com" },
    cover: {
      src: "/images/projects/opsbyfranck/home.png",
      width: 1440,
      height: 900,
      alt: "Accueil du site opsbyfranck.com",
    },
    caseStudy: {
      period: "2026",
      role: "Fondateur — conception, workflows et développement",
      problem: {
        kind: "text",
        paragraphs: [
          "Chaque workflow répond à une douleur business précise : vous le testez, vous mesurez le résultat, et si ça marche, il est intégré aux outils internes (Slack, Notion, CRM) pour que toute l’équipe en profite.",
        ],
      },
      users: {
        kind: "list",
        items: ["Des professionnels et équipes B2B : SEO & marketing, vente, RH, management et opérations."],
      },
      constraints: todo(""),
      approach: {
        kind: "pipeline",
        steps: ["Identifier la douleur", "Vivre le résultat", "Ajuster au contexte", "Industrialiser"],
        note: "La méthode affichée sur le site : un résultat en moins de 2 minutes, puis intégration dans les outils internes.",
      },
      architecture: {
        kind: "pipeline",
        steps: ["Catalogue de workflows", "Prompt autonome", "Artifact Claude", "Outils internes"],
      },
      personal: {
        kind: "list",
        items: [
          "Conception du produit et du catalogue de 20 workflows, testés avant publication.",
          "Site opsbyfranck.com : catalogue par métier, boîte à idées, veille par domaine.",
          "Offre d’accompagnement et prise de rendez-vous pour les audits.",
        ],
      },
      results: {
        kind: "metrics",
        note: "Chiffres affichés sur opsbyfranck.com au moment de la capture.",
        metrics: [
          { value: "20", label: "workflows au catalogue" },
          { value: "4", label: "domaines métier" },
          { value: "< 2 min", label: "pour obtenir un résultat concret" },
        ],
      },
      failures: todo(""),
      changes: todo(""),
      learnings: todo(""),
      images: [
        {
          src: "/images/projects/opsbyfranck/home.png",
          width: 1440,
          height: 900,
          alt: "Accueil de opsbyfranck.com",
          caption: "Accueil : des workflows IA pour gagner du temps et mieux convertir",
        },
        {
          src: "/images/projects/opsbyfranck/workflow.png",
          width: 1440,
          height: 900,
          alt: "Page d’un workflow : synthèse de réunion avec decision log",
          caption: "Un workflow du catalogue : synthèse de réunion avec decision log",
        },
      ],
    },
  },
  {
    slug: "cashup",
    number: "07",
    name: "TECH-UP Reprise (CashUp)",
    category: "Produit web · CRM · Règles métier",
    title: "Estimer le prix d’un iPhone en 2 minutes, et suivre chaque lead",
    problem:
      "Racheter des smartphones demande de chiffrer vite et de façon cohérente, puis de ne perdre aucune demande. Il fallait un estimateur de prix fiable et un suivi des leads.",
    result:
      "Un site de rachat de smartphones avec estimation en ligne, adossé à un CRM de suivi des leads et à des règles de calcul déterministes pour chiffrer les iPhone.",
    role: "Mise en place du CRM de suivi des leads et des règles de calcul de prix",
    stack: ["Vite", "CRM de suivi des leads", "Règles de calcul déterministes"],
    status: "Production",
    statusDetail: "En ligne",
    link: { label: "Voir cashupstore.fr", href: "https://cashupstore.fr/" },
    cover: {
      src: "/images/projects/cashup/home.png",
      width: 1440,
      height: 900,
      alt: "Accueil du site de rachat de smartphones TECH-UP Reprise",
    },
    caseStudy: {
      period: "2025 – 2026",
      role: "Mise en place du CRM de suivi des leads et des règles de calcul de prix",
      problem: {
        kind: "text",
        paragraphs: [
          "TECH-UP Store rachète des smartphones, même cassés, partout en France. Le client décrit son téléphone (modèle, capacité, état) et reçoit une estimation gratuite en 2 minutes, sans engagement.",
          "Deux besoins : donner un prix cohérent et immédiat, et suivre chaque demande jusqu’à la reprise pour ne perdre aucun lead.",
        ],
      },
      users: {
        kind: "list",
        items: [
          "Les particuliers qui revendent leur smartphone.",
          "L’équipe TECH-UP, qui suit les demandes et organise les remises en boutique ou par expédition.",
        ],
      },
      constraints: {
        kind: "list",
        items: [
          "Un prix qui doit rester explicable : le même appareil dans le même état donne toujours la même estimation.",
          "Des appareils parfois cassés, donc des états à décrire simplement.",
        ],
      },
      approach: todo(""),
      architecture: {
        kind: "list",
        items: [
          "Frontend du site : Vite.",
          "Estimation du prix d’un iPhone : règles de calcul déterministes.",
          "Suivi des demandes : CRM dédié aux leads.",
        ],
      },
      personal: {
        kind: "list",
        items: [
          "Mise en place d’un CRM pour le suivi des leads.",
          "Définition de règles de calcul déterministes pour estimer le prix d’un iPhone.",
        ],
      },
      results: {
        kind: "metrics",
        note: "Chiffres de TECH-UP affichés sur le site au moment de la capture, pas des résultats attribués à ma seule contribution.",
        metrics: [
          { value: "500+", label: "reprises effectuées (affiché sur le site)" },
          { value: "4,6 / 5", label: "note Trustpilot, 87 avis (affiché sur le site)" },
          { value: "2 min", label: "pour obtenir une estimation" },
        ],
      },
      failures: todo(""),
      changes: todo(""),
      learnings: {
        kind: "list",
        items: [
          "Des règles déterministes donnent des prix explicables et reproductibles, là où un modèle opaque serait difficile à défendre face au client.",
        ],
      },
      images: [
        {
          src: "/images/projects/cashup/home.png",
          width: 1440,
          height: 900,
          alt: "Accueil du site TECH-UP Reprise",
          caption: "Accueil : « Revendez votre smartphone. Même cassé. »",
        },
        {
          src: "/images/projects/cashup/estimation.png",
          width: 1440,
          height: 900,
          alt: "Parcours d’estimation du prix d’un smartphone",
          caption: "Parcours d’estimation du prix",
        },
      ],
    },
  },
  {
    slug: "terolia",
    number: "08",
    name: "Terolia",
    category: "Produit B2B · GEO · RAG · Freelance",
    title: "Devenir la marque que les IA recommandent",
    problem:
      "Les prospects B2B demandent de plus en plus à ChatGPT, Claude, Perplexity ou Gemini quel prestataire choisir. Terolia mesure si une marque est citée dans ces réponses et dit quoi faire pour l’être.",
    result:
      "Un produit en ligne : audit de visibilité sur 4 moteurs IA, comparaison aux concurrents et plan d’action priorisé. Utilisé par environ 5 professionnels, dont Castalie.",
    role: "Conception et développement de A à Z jusqu’au déploiement",
    stack: ["React", "Python", "FastAPI", "Scraping", "RAG", "Supabase", "PostgreSQL", "pgvector", "Railway"],
    status: "Production",
    statusDetail: "En ligne",
    link: { label: "Voir terolia.com", href: "https://terolia.com" },
    cover: {
      src: "/images/projects/terolia/home.png",
      width: 1440,
      height: 900,
      alt: "Accueil de terolia.com",
    },
    caseStudy: {
      period: "2025 – 2026",
      role: "Freelance — conception et développement de bout en bout",
      problem: {
        kind: "text",
        paragraphs: [
          "Quand un décideur demande à une IA quel prestataire choisir, les marques absentes de la réponse n’existent pas pour lui. C’est le GEO (Generative Engine Optimization), le pendant du SEO pour les moteurs de réponse IA.",
          "Terolia pose aux IA les mêmes questions que les prospects, mesure si la marque est recommandée et à quelle fréquence, puis propose les actions à mener, classées par impact.",
        ],
      },
      users: {
        kind: "text",
        paragraphs: ["Des professionnels et équipes marketing B2B : environ 5 utilisateurs, dont Castalie."],
      },
      constraints: {
        kind: "list",
        items: [
          "Des réponses d’IA variables d’un test à l’autre : chaque question est posée 3 fois pour fiabiliser la mesure.",
          "Quatre moteurs à mesurer en parallèle : ChatGPT, Claude, Perplexity et Gemini.",
          "Hébergement dans l’Union européenne et conformité RGPD, mis en avant sur le site.",
        ],
      },
      approach: todo(""),
      architecture: {
        kind: "list",
        intro: "Stack technique :",
        items: [
          "Frontend : React.",
          "Backend : Python avec FastAPI.",
          "Collecte de données : scraping.",
          "IA : RAG (retrieval-augmented generation).",
          "Base de données : Supabase, PostgreSQL avec l’extension pgvector.",
          "Hébergement : Railway, avec des tâches planifiées.",
        ],
      },
      personal: {
        kind: "list",
        items: [
          "Conception du produit et développement complet, du frontend au backend.",
          "Mesure de la visibilité d’une marque sur 4 moteurs IA, avec comparaison à chaque concurrent.",
          "Tableau de bord : taux de mention, couverture des moteurs, part de voix, concurrents.",
          "Plan d’action priorisé et studio de contenu.",
          "Audit technique, données structurées et fichier llms.txt.",
          "Copilote IA intégré pour interpréter les résultats.",
          "Déploiement et tâches planifiées sur Railway.",
        ],
      },
      results: {
        kind: "metrics",
        note: "La démo publique utilise des données d’exemple (marque fictive Facturio).",
        metrics: [
          { value: "4", label: "moteurs IA mesurés : ChatGPT, Claude, Perplexity, Gemini" },
          { value: "3×", label: "tests par question pour fiabiliser la mesure" },
          { value: "≈ 5", label: "professionnels utilisateurs, dont Castalie" },
        ],
      },
      failures: todo(""),
      changes: todo(""),
      learnings: todo(""),
      images: [
        {
          src: "/images/projects/terolia/home.png",
          width: 1440,
          height: 900,
          alt: "Accueil de terolia.com",
          caption: "Accueil : « Soyez la marque que les IA recommandent »",
        },
        {
          src: "/images/projects/terolia/demo.png",
          width: 1440,
          height: 900,
          alt: "Tableau de bord de la démo Terolia",
          caption: "Tableau de bord de la démo (données d’exemple) : taux de mention, couverture des 4 moteurs, actions prioritaires et concurrents",
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
