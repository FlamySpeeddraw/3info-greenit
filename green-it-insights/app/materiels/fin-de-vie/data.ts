import type { KeyFigure, Source } from "@/components/sections/types";

/**
 * Données de contenu de la page « Fin de vie & recyclage des produits IT ».
 */

export const keyFigures: KeyFigure[] = [
  {
    value: "62 Mt",
    label:
      "de déchets d'équipements électriques et électroniques (DEEE) produits dans le monde en 2022, soit +82 % depuis 2010.",
    source: "Global E-waste Monitor 2024",
  },
  {
    value: "82 Mt",
    label:
      "projetés pour 2030 (+33 %) : le flux de déchets électroniques croît plus vite que tout autre flux de déchets.",
    source: "UNITAR / ITU",
  },
  {
    value: "22,3 %",
    label:
      "seulement de ces déchets ont été collectés et recyclés correctement en 2022 — et la part devrait encore baisser.",
    source: "Global E-waste Monitor 2024",
  },
  {
    value: "~91 Md$",
    label:
      "valeur des métaux contenus dans ces déchets (or, cuivre, terres rares), en grande partie perdue faute de récupération.",
    source: "UNITAR / ITU",
  },
];

export const sources: Source[] = [
  {
    label: "Global E-waste Monitor 2024 (UNITAR / ITU)",
    url: "https://ewastemonitor.info/the-global-e-waste-monitor-2024/",
  },
  {
    label:
      "UNITAR — E-waste rising five times faster than documented recycling",
    url: "https://unitar.org/about/news-stories/press/global-e-waste-monitor-2024-electronic-waste-rising-five-times-faster-documented-e-waste-recycling",
  },
  {
    label:
      "Parlement européen — Déchets électroniques dans l'UE : faits et chiffres",
    url: "https://www.europarl.europa.eu/topics/fr/article/20201208STO93325/dechets-electroniques-dans-l-union-europeenne-faits-et-chiffres-infographie",
  },
  {
    label: "ADEME — Les Déchets d'Équipements Électriques et Électroniques (D3E)",
    url: "https://serd.ademe.fr/serd-2025-les-dechets-dequipements-electriques-et-electroniques-d3e/",
  },
  {
    label: "ecosystem — Taux de recyclage des appareils électriques",
    url: "https://www.ecosystem.eco/comprendre/taux-recyclage",
  },
  {
    label:
      "notre-environnement.gouv.fr — Quand les déchets électroniques atteignent des records",
    url: "https://www.notre-environnement.gouv.fr/actualites/breves/article/quand-les-dechets-electroniques-atteignent-des-records",
  },
];
