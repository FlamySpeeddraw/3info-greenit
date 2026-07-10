import type { KeyFigure, Source } from "@/components/sections/types";

/**
 * Données de contenu de la page « Durée d'utilisation & mutualisation ».
 * Séparées du rendu pour être éditables facilement.
 */

export const keyFigures: KeyFigure[] = [
  {
    value: "2,5–3 ans",
    label:
      "durée d'usage moyenne d'un smartphone, souvent remplacé bien avant la fin de vie technique (jusqu'à 5 ans possibles).",
    source: "ADEME",
  },
  {
    value: "+50 %",
    label:
      "passer de 2 à 4 ans d'utilisation améliore d'autant le bilan environnemental d'un équipement.",
    source: "ADEME / GreenIT",
  },
  {
    value: "5–10 %",
    label:
      "taux d'utilisation moyen d'un serveur non mutualisé : il tourne quasiment à vide la plupart du temps.",
    source: "LeMagIT",
  },
  {
    value: "60–80 %",
    label:
      "taux d'utilisation atteint après mutualisation / virtualisation, en regroupant les charges sur moins de machines.",
    source: "LeMagIT / Silicon",
  },
];

export const sources: Source[] = [
  {
    label: "ADEME — Choisir et faire durer son ordinateur",
    url: "https://agirpourlatransition.ademe.fr/particuliers/maison/numerique/choisir-faire-durer-ordinateur",
  },
  {
    label:
      "GoodPlanet — Réduire l'impact du numérique passe d'abord par l'allongement de la durée de vie",
    url: "https://www.goodplanet.info/2022/01/20/la-reduction-de-limpact-ecologique-du-numerique-passe-dabord-par-lallongement-de-la-duree-de-vie-des-appareils/",
  },
  {
    label:
      "LeMagIT — Virtualisation de serveurs : taux d'utilisation de 5-10 % à 60 %",
    url: "https://www.lemagit.fr/actualites/2240188481/Virtualisation-de-serveurs-lage-industriel",
  },
  {
    label: "Silicon — Près de 40 % des serveurs d'entreprise sont virtualisés",
    url: "https://www.silicon.fr/pres-de-40-des-serveurs-dentreprise-sont-virtualises-59190.html",
  },
  {
    label: "Evernex — Durée d'amortissement d'un serveur informatique",
    url: "https://evernex.com/fr/guides-sur-lindustrie/duree-amortissement-serveur-informatique/",
  },
  {
    label: "Curvature — How long do servers last?",
    url: "https://www.curvature.com/resources/blog/how-long-do-servers-last/",
  },
];
