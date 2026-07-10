import type {
  Co2DataPoint,
  Co2HealthThreshold,
  GeologicalPeriod,
} from "@/types/geological-ghg";

export const co2EvolutionPoints = [
  {
    id: "co2-hadean",
    periodId: "primitive-earth",
    label: "Atmosphère primitive",
    shortLabel: "Hadéen",
    timeLabel: "4,6 Ga",
    visualPosition: 0,
    co2Ppm: 100000,
  },
  {
    id: "co2-archean",
    periodId: "primitive-earth",
    label: "Archéen",
    shortLabel: "Archéen",
    timeLabel: "3,5 Ga",
    visualPosition: 0.75,
    co2Ppm: 25000,
  },
  {
    id: "co2-proterozoic",
    periodId: "proterozoic",
    label: "Protérozoïque",
    shortLabel: "Proto.",
    timeLabel: "2,5 Ga",
    visualPosition: 1.65,
    co2Ppm: 7000,
  },
  {
    id: "co2-paleozoic-high",
    periodId: "paleozoic",
    label: "Début du Paléozoïque",
    shortLabel: "Paléo.",
    timeLabel: "541 Ma",
    visualPosition: 2.55,
    co2Ppm: 4500,
  },
  {
    id: "co2-carboniferous",
    periodId: "paleozoic",
    label: "Carbonifère",
    shortLabel: "Carbon.",
    timeLabel: "320 Ma",
    visualPosition: 3.05,
    co2Ppm: 350,
  },
  {
    id: "co2-mesozoic",
    periodId: "mesozoic",
    label: "Mésozoïque chaud",
    shortLabel: "Méso.",
    timeLabel: "200 Ma",
    visualPosition: 3.95,
    co2Ppm: 1800,
  },
  {
    id: "co2-cenozoic",
    periodId: "cenozoic",
    label: "Refroidissement cénozoïque",
    shortLabel: "Céno.",
    timeLabel: "34 Ma",
    visualPosition: 4.85,
    co2Ppm: 550,
  },
  {
    id: "co2-preindustrial",
    periodId: "current",
    label: "Préindustriel",
    shortLabel: "1850",
    timeLabel: "1850",
    visualPosition: 5.55,
    co2Ppm: 280,
  },
  {
    id: "co2-current",
    periodId: "current",
    label: "Aujourd'hui",
    shortLabel: "Actuel",
    timeLabel: "2026",
    visualPosition: 5.95,
    co2Ppm: 420,
    isIndustrialRise: true,
  },
] satisfies Co2DataPoint[];

export const geologicalPeriods = [
  {
    id: "primitive-earth",
    name: "Terre primitive",
    dates: "Hadéen + Archéen · 4,6 à 2,5 milliards d'années",
    description:
      "La Terre se forme dans un environnement instable. Le dégazage volcanique, les impacts et le refroidissement progressif installent une atmosphère riche en vapeur d'eau, CO₂ et méthane, très différente de l'air actuel.",
    illustration: {
      alt: "Placeholder d'une Terre primitive volcanique sous une atmosphère dense.",
      tone: "volcanic",
    },
    greenhouseGases: ["CO₂", "CH₄", "vapeur d'eau", "N₂O traces"],
    majorEvents: [
      "Formation de la croûte et des premiers océans",
      "Volcanisme intense et dégazage massif",
      "Premières traces de vie microbienne",
    ],
    co2Values: co2EvolutionPoints.filter(
      (point) => point.periodId === "primitive-earth",
    ),
  },
  {
    id: "proterozoic",
    name: "Protérozoïque",
    dates: "2,5 milliards à 541 millions d'années",
    description:
      "Les cyanobactéries transforment lentement l'atmosphère. L'oxygène augmente, le méthane recule et le climat alterne entre longues stabilités et épisodes glaciaires extrêmes.",
    illustration: {
      alt: "Placeholder d'une mer peu profonde avec stromatolites et atmosphère en oxygénation.",
      tone: "oceanic",
    },
    greenhouseGases: ["CO₂", "CH₄", "vapeur d'eau"],
    majorEvents: [
      "Grande Oxydation",
      "Développement des stromatolites",
      "Glaciations globales dites Terre boule de neige",
    ],
    co2Values: co2EvolutionPoints.filter(
      (point) => point.periodId === "proterozoic",
    ),
  },
  {
    id: "paleozoic",
    name: "Paléozoïque",
    dates: "541 à 252 millions d'années",
    description:
      "La vie colonise les continents. Les forêts enfouissent d'immenses quantités de carbone, ce qui fait fortement baisser le CO₂ pendant le Carbonifère avant de nouvelles perturbations climatiques.",
    illustration: {
      alt: "Placeholder d'une forêt marécageuse paléozoïque liée à l'enfouissement du carbone.",
      tone: "forest",
    },
    greenhouseGases: ["CO₂", "CH₄", "vapeur d'eau"],
    majorEvents: [
      "Expansion des plantes terrestres",
      "Formation de grands bassins charbonniers",
      "Variations climatiques et crises biologiques",
    ],
    co2Values: co2EvolutionPoints.filter(
      (point) => point.periodId === "paleozoic",
    ),
  },
  {
    id: "mesozoic",
    name: "Mésozoïque",
    dates: "252 à 66 millions d'années",
    description:
      "Le climat est globalement plus chaud. Une activité volcanique importante, des mers étendues et un cycle du carbone très actif maintiennent des concentrations de CO₂ supérieures aux niveaux préindustriels.",
    illustration: {
      alt: "Placeholder d'un littoral mésozoïque chaud avec végétation et mer peu profonde.",
      tone: "coast",
    },
    greenhouseGases: ["CO₂", "CH₄", "vapeur d'eau"],
    majorEvents: [
      "Fragmentation de la Pangée",
      "Mers chaudes et hauts niveaux marins",
      "Volcanisme et changements climatiques rapides",
    ],
    co2Values: co2EvolutionPoints.filter(
      (point) => point.periodId === "mesozoic",
    ),
  },
  {
    id: "cenozoic",
    name: "Cénozoïque",
    dates: "66 millions d'années à aujourd'hui",
    description:
      "La Terre entre dans une tendance longue au refroidissement. L'altération des roches, les océans et la biosphère contribuent à faire diminuer le CO₂, jusqu'aux cycles glaciaires récents.",
    illustration: {
      alt: "Placeholder d'un paysage cénozoïque mêlant montagnes, forêts et glaces.",
      tone: "ice",
    },
    greenhouseGases: ["CO₂", "CH₄", "N₂O", "vapeur d'eau"],
    majorEvents: [
      "Soulèvement de grandes chaînes de montagnes",
      "Installation des calottes polaires",
      "Cycles glaciaires et interglaciaires",
    ],
    co2Values: co2EvolutionPoints.filter(
      (point) => point.periodId === "cenozoic",
    ),
  },
  {
    id: "current",
    name: "Époque actuelle",
    dates: "Révolution industrielle à aujourd'hui",
    description:
      "Depuis le XIXe siècle, les activités humaines ajoutent rapidement du CO₂, du méthane et du protoxyde d'azote à l'atmosphère. Le signal industriel est bref à l'échelle géologique, mais très marqué.",
    illustration: {
      alt: "Placeholder d'un paysage actuel montrant une transition entre végétation et horizon industriel.",
      tone: "industrial",
    },
    greenhouseGases: ["CO₂", "CH₄", "N₂O", "gaz fluorés"],
    majorEvents: [
      "Combustion massive d'énergies fossiles",
      "Déforestation et changements d'usage des sols",
      "Hausse rapide du CO₂ atmosphérique",
    ],
    co2Values: co2EvolutionPoints.filter((point) => point.periodId === "current"),
  },
] satisfies GeologicalPeriod[];

export const co2DataNote =
  "CO2 atmospherique uniquement, pas CO2 equivalent. Valeurs geologiques indicatives et simplifiees pour la narration visuelle, exprimees en ppm.";

export const co2HealthThresholds = [
  {
    id: "sensitive-people",
    ppm: 1000,
    label: "1 000 ppm",
    description:
      "Gene possible chez les personnes sensibles: asthme, maux de tete, fatigue, irritation oculaire ou syndrome des batiments malsains.",
    severity: "sensitive",
  },
  {
    id: "occupational-limit",
    ppm: 5000,
    label: "5 000 ppm",
    description:
      "Valeur limite d'exposition professionnelle en France pour 8 heures de travail.",
    severity: "occupational",
  },
  {
    id: "short-term-limit",
    ppm: 10000,
    rangeEndPpm: 30000,
    label: "10 000-30 000 ppm",
    description:
      "Valeurs limites d'exposition a court terme, sur 10 minutes, adoptees dans plusieurs pays.",
    severity: "short-term",
  },
  {
    id: "evacuation",
    ppm: 40000,
    label: "40 000 ppm",
    description:
      "Seuil d'effets irreversibles sur la sante: evacuation immediate des locaux.",
    severity: "evacuation",
  },
  {
    id: "lethal-risk",
    ppm: 100000,
    label: "100 000 ppm",
    description:
      "A partir de 10% et au-dela de 10 minutes d'exposition, risque mortel sans reanimation medicale.",
    severity: "lethal",
  },
] satisfies Co2HealthThreshold[];

export const co2DangerExplanation =
  "Le graphique montre le CO2 atmospherique. Pour la sante humaine en air interieur, le CO2 devient genant des 1 000 ppm pour certaines personnes, la VLEP francaise est de 5 000 ppm sur 8h, et les niveaux tres eleves imposent une evacuation. Pour le climat, le danger actuel vient surtout de la hausse rapide du CO2, qui renforce l'effet de serre et accelere les extremes climatiques.";
