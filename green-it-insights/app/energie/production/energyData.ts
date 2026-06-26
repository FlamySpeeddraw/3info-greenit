import type { FilieresData } from "@/types/energie";

/**
 * Facteurs d'émission en gCO₂e/kWh
 * Source : ADEME — Base Carbone® & notre-environnement.gouv.fr
 * Méthode ACV (analyse du cycle de vie)
 */
export const ENERGY_DATA: FilieresData[] = [
  {
    id: "charbon",
    name: "Charbon",
    emissionFactor: 1060,
    globalShare: "~36 %",
    exampleCountry: "Chine, Inde, Pologne",
    icon: "🏭",
    description:
      "La filière la plus émettrice. La combustion du charbon libère de grandes quantités de CO₂ et de méthane. Malgré la transition énergétique, elle reste la première source d'électricité mondiale.",
  },
  {
    id: "fioul",
    name: "Fioul (pétrole)",
    emissionFactor: 777,
    globalShare: "~3 %",
    exampleCountry: "Arabie Saoudite, Îles du Pacifique",
    icon: "🛢️",
    description:
      "Le fioul est principalement utilisé dans les pays producteurs de pétrole et les territoires insulaires. Son facteur d'émission est légèrement inférieur au charbon mais reste très élevé.",
  },
  {
    id: "gaz-naturel",
    name: "Gaz naturel",
    emissionFactor: 418,
    globalShare: "~23 %",
    exampleCountry: "États-Unis, Russie, Pays-Bas",
    icon: "🔥",
    description:
      "Souvent présenté comme une énergie de transition, le gaz naturel émet deux fois moins de CO₂ que le charbon à la combustion. Toutefois, les fuites de méthane tout au long de la chaîne rehaussent son bilan réel.",
  },
  {
    id: "biomasse",
    name: "Biomasse",
    emissionFactor: 230,
    globalShare: "~2 %",
    exampleCountry: "Brésil, Finlande, États-Unis",
    icon: "🌿",
    description:
      "La biomasse est considérée renouvelable car le CO₂ émis est théoriquement réabsorbé par les forêts. En ACV, la valeur reste significative en raison de la collecte, du transport et de la conversion.",
  },
  {
    id: "solaire-pv",
    name: "Solaire photovoltaïque",
    emissionFactor: 43,
    globalShare: "~4 %",
    exampleCountry: "Allemagne, Chine, Espagne",
    icon: "☀️",
    description:
      "Le solaire PV voit son facteur d'émission baisser chaque année. La valeur ACV inclut la production des cellules, souvent réalisée dans des pays à mix électrique carboné.",
  },
  {
    id: "geothermie",
    name: "Géothermie",
    emissionFactor: 38,
    globalShare: "< 1 %",
    exampleCountry: "Islande, Kenya, États-Unis",
    icon: "🌋",
    description:
      "Son bilan varie fortement selon les sites : certains gisements libèrent naturellement des gaz à effet de serre (CO₂, H₂S) issus des fluides hydrothermaux.",
  },
  {
    id: "eolien-offshore",
    name: "Éolien offshore",
    emissionFactor: 15,
    globalShare: "~1 %",
    exampleCountry: "Royaume-Uni, Danemark, Belgique",
    icon: "🌊",
    description:
      "Légèrement plus émetteur que l'éolien terrestre en ACV en raison des fondations marines. En contrepartie, la production est plus constante grâce à des vents plus forts en mer.",
  },
  {
    id: "eolien-terrestre",
    name: "Éolien terrestre",
    emissionFactor: 14,
    globalShare: "~7 %",
    exampleCountry: "Danemark, Espagne, Allemagne",
    icon: "🌬️",
    description:
      "Excellent bilan carbone. Les émissions ACV correspondent principalement à la fabrication des turbines (acier, béton des fondations) et à leur transport.",
  },
  {
    id: "hydroelectricite",
    name: "Hydroélectricité",
    emissionFactor: 11,
    globalShare: "~15 %",
    exampleCountry: "Norvège, Canada, Brésil",
    icon: "💧",
    description:
      "L'une des filières les plus propres. Le principal impact ACV provient de la construction des barrages. Les grands réservoirs tropicaux peuvent émettre du méthane issu de la décomposition de matière organique.",
  },
  {
    id: "nucleaire",
    name: "Nucléaire",
    emissionFactor: 6,
    globalShare: "~10 %",
    exampleCountry: "France, États-Unis, Corée du Sud",
    icon: "⚛️",
    description:
      "En ACV, le nucléaire est l'une des sources les moins émettrices. L'essentiel des émissions provient de l'extraction et de l'enrichissement de l'uranium, ainsi que de la construction des centrales.",
  },
];
