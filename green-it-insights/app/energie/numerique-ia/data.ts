import type { KeyFigure, Source } from "./types";

/**
 * Données de contenu de la page « Focus numérique & IA ».
 * Séparées du rendu pour être éditables facilement (chiffres, sources).
 */

export const keyFigures: KeyFigure[] = [
  {
    value: "~4 %",
    label:
      "des émissions mondiales de gaz à effet de serre sont dues au numérique, soit un niveau comparable à l'aviation civile.",
    source: "ADEME",
  },
  {
    value: "415 TWh",
    label:
      "consommés par les data centers dans le monde en 2024, soit environ 1,5 % de la demande électrique mondiale — l'équivalent de la consommation de la France.",
    source: "AIE (IEA)",
  },
  {
    value: "~945 TWh",
    label:
      "projetés pour les data centers en 2030 : la consommation devrait plus que doubler, croissant ~4× plus vite que celle des autres secteurs.",
    source: "AIE (IEA)",
  },
  {
    value: "20–50 %",
    label:
      "part de l'IA dans la consommation totale des data centers attendue à l'horizon 2030.",
    source: "AIE (IEA)",
  },
];

export const sources: Source[] = [
  {
    label:
      "ADEME — Évaluation de l'impact environnemental du numérique en France (2024)",
    url: "https://ecoresponsable.numerique.gouv.fr/docs/2024/etude-ademe-impacts-environnementaux-numerique.pdf",
  },
  {
    label:
      "ADEME — Numérique et environnement, dossier de presse (janvier 2025)",
    url: "https://www.ademe.fr/wp-content/uploads/2025/01/dossier-de-presse-numerique-et-environnement-090125.pdf",
  },
  {
    label:
      "Bpi / Balises — Les data centers : 13 % de la consommation électrique mondiale en 2030 ?",
    url: "https://balises.bpi.fr/les-data-centers-13-de-la-consommation-energetique-mondiale-en-2030/",
  },
  {
    label: "Opéra Énergie — Consommation d'énergie des data centers, chiffres 2026",
    url: "https://opera-energie.com/consommation-energie-datacenter/",
  },
  {
    label:
      "DCmag — L'AIE alerte : la consommation des data centers d'IA multipliée par 3 d'ici 2030",
    url: "https://dcmag.fr/liea-alerte-la-consommation-electrique-des-datacenters-dia-sera-multipliee-par-3-dici-2030/",
  },
  {
    label:
      "Projet Celsius — Combien d'électricité consomme une requête ChatGPT ?",
    url: "https://projetcelsius.com/blog/combien-consomme-requete-chatgpt/",
  },
  {
    label:
      "Reservoir — Une requête ChatGPT consomme 10× plus d'eau qu'une recherche Google",
    url: "https://www.reservoir.live/une-requete-chatgpt-consomme-10x-plus-deau-quune-recherche-google/",
  },
];
