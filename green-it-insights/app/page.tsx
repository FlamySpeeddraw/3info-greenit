"use client";

import React, { useState, useEffect } from "react";
import { Container, Box, Heading, Text, Flex, Grid, Badge, Button } from "@radix-ui/themes";
import { BarChartIcon } from "@radix-ui/react-icons";
import { MetricCard } from "@/components/MetricCard";
import { ArticleCard } from "@/components/ArticleCard";
import { DeviceSimulator } from "@/components/DeviceSimulator";
import { NewsletterSection } from "@/components/NewsletterSection";
import { ScrollReveal } from "@/components/ScrollReveal";

const METRICS = [
  {
    value: "+1.5°C Limite",
    description: "Le seuil critique de réchauffement planétaire défini par l'accord de Paris face aux émissions anthropiques accumulées dans l'atmosphère.",
  },
  {
    value: "Asie de l'Est",
    description: "Zone géographique concentrant plus de 80% de la production mondiale de puces électroniques, alimentée par un mix électrique carboné.",
  },
  {
    value: "x80 en Aérien",
    description: "Le fret aérien de matériel IT émet environ 80 fois plus de CO2 par km parcouru que le transport par cargo maritime.",
  },
];

const ARTICLES = [
  {
    category: "Histoire & Climat",
    badgeColor: "grass" as const,
    type: "Dossier",
    title: "Évolution des gaz à effet de serre",
    description: "De l'ère préindustrielle aux projections du GIEC, comprenez comment l'essor industriel et technologique a bouleversé la concentration de gaz à effet de serre et les équilibres climatiques.",
    link: "/evolution-gaz-effet-serre",
  },
  {
    category: "Matériel & Mines",
    badgeColor: "brown" as const,
    type: "Dossier",
    title: "Cartographie de la production IT",
    description: "De l'extraction des terres rares en Mongolie intérieure au raffinage et à l'assemblage dans la \"Silicon Valley\" asiatique (Taiwan, Shenzhen). Découvrez les coulisses géopolitiques et énergétiques de nos puces.",
    link: "/ressourcesDevices",
  },
  {
    category: "Logistique",
    badgeColor: "yellow" as const,
    type: "Dossier",
    title: "Modes de transport et coût carbone",
    description: "Aérien, maritime, ferroviaire ou routier : analyse comparative des modes d'acheminement des terminaux électroniques. Comment le choix logistique impacte directement le bilan carbone final d'un appareil.",
    link: "/materiels/transport",
  },
  {
    category: "Énergie & IA",
    badgeColor: "orange" as const,
    type: "Dossier",
    title: "Numérique & l'IA dans la consommation mondiale d'énergie",
    description: "L'essor de l'intelligence artificielle générative et l'expansion des centres de données redéfinissent nos besoins en électricité. Décryptage des enjeux de consommation et des pistes de sobriété.",
    link: "/energie/numerique-ia",
  },
  {
    category: "Mix Énergétique",
    badgeColor: "teal" as const,
    type: "Dossier",
    title: "Mix énergétique par pays",
    description: "Analyse de la dépendance carbone de l'infrastructure numérique mondiale. Découvrez comment l'empreinte de vos calculs varie selon les sources d'énergie (charbon, solaire, nucléaire) des serveurs.",
    link: "/mix",
  },
  {
    category: "Usage & Impact",
    badgeColor: "blue" as const,
    type: "Dossier",
    title: "Durée d'utilisation & mutualisation des matériels IT",
    description: "Analyse de la consommation d'électricité lors de l'utilisation de nos ordinateurs, smartphones et serveurs. Comment l'intensité carbone de l'électricité locale dicte le bilan d'usage.",
    link: "/materiels/utilisation",
  },
  {
    category: "Fin de Vie",
    badgeColor: "tomato" as const,
    type: "Dossier",
    title: "Fin de vie et recyclage des produits IT",
    description: "Traitement des déchets électroniques (e-waste), recyclage des métaux précieux et impacts environnementaux des décharges technologiques dans les pays en développement.",
    link: "/materiels/fin-de-vie",
  },
  {
    category: "Émissions",
    badgeColor: "blue" as const,
    type: "Dossier",
    title: "Émissions par pays",
    description: "Calculez l'impact du mix électrique national d'hébergement sur vos serveurs cloud. Comparez les émissions carbone de vos serveurs selon leur localisation géographique.",
    link: "/emissions_par_pays",
  },
  {
    category: "Production d'Énergie",
    badgeColor: "amber" as const,
    type: "Dossier",
    title: "Types de production d'énergie et impact sur les GES",
    description: "Analyse comparée des sources de production d'électricité : charbon, gaz, nucléaire, hydraulique, solaire et éolien. Quel est l'impact réel de chaque type d'énergie sur les émissions mondiales.",
    link: "/energie/production",
  },
];

export default function HomePage() {
  const [displayedArticles, setDisplayedArticles] = useState<typeof ARTICLES>([]);

  useEffect(() => {
    // Shuffle the array and take the first 3
    const shuffled = [...ARTICLES].sort(() => 0.5 - Math.random());
    setDisplayedArticles(shuffled.slice(0, 3));
  }, []);

  return (
    <div 
      className="flex-1 min-h-screen bg-eco-white dark:bg-oled-black text-green-dark dark:text-eco-white transition-colors duration-500 overflow-x-hidden"
    >
      <Container size="4" className="px-4 py-12 sm:py-20">
        {/* HERO SECTION */}
        <section className="mb-20 text-center sm:text-left">
          <Grid columns={{ initial: "1", md: "12" }} gap="6" align="center">
            <Box className="md:col-span-8 space-y-6">
              <Badge size="2" color="grass" variant="soft" className="uppercase tracking-wider font-semibold">
                Média de sensibilisation écologique
              </Badge>
              <Heading 
                size="9" 
                weight="bold" 
                className="tracking-tight leading-none font-sans text-green-dark dark:text-eco-white"
              >
                Comprendre l'impact carbone du numérique.
              </Heading>
              <Text size="4" className="block max-w-2xl font-light opacity-90 leading-relaxed text-green-dark dark:text-eco-white">
                Des temps géologiques à la mondialisation logistique, décryptez l'évolution des émissions de gaz à effet de serre et l'empreinte cachée de la production de nos équipements technologiques.
              </Text>
              <Flex gap="4" justify={{ initial: "center", sm: "start" }} wrap="wrap" className="pt-2">
                <a href="#articles" className="no-underline">
                  <Button size="3" variant="solid" color="grass" className="cursor-pointer font-medium px-6 py-3">
                    Consulter les dossiers
                  </Button>
                </a>
                <a href="#simulator" className="no-underline">
                  <Button size="3" variant="outline" color="grass" className="cursor-pointer font-medium px-6 py-3">
                    Estimer mon empreinte
                  </Button>
                </a>
              </Flex>
            </Box>
            <Box className="md:col-span-4 hidden md:block">
              {/* Visual Eco-Badge using theme-tailored classes */}
              <div 
                className="p-8 rounded-3xl border flex flex-col justify-center items-center text-center space-y-4 bg-eco-gray dark:bg-oled-gray border-brown-dark/10 dark:border-eco-white/5"
              >
                <div className="w-16 h-16 rounded-full bg-green-accent/25 flex items-center justify-center text-green-accent">
                  <BarChartIcon className="w-8 h-8 eco-pulse" />
                </div>
                <div>
                  <Text size="1" color="gray" className="uppercase tracking-wider font-bold block mb-1">
                    Cycle de vie IT
                  </Text>
                  <Heading size="7" className="text-green-accent dark:text-green-light">
                    78% Fabrication
                  </Heading>
                </div>
                <Text size="1" color="gray" className="max-w-[200px]">
                  La majorité de la pollution numérique a lieu à l'usine, bien avant l'utilisation.
                </Text>
              </div>
            </Box>
          </Grid>
        </section>

        {/* KEY METRICS SECTION */}
        <ScrollReveal>
          <section className="mb-20">
            <Grid columns={{ initial: "1", sm: "3" }} gap="6">
              {METRICS.map((metric) => (
                <MetricCard 
                  key={metric.value} 
                  value={metric.value} 
                  description={metric.description} 
                />
              ))}
            </Grid>
          </section>
        </ScrollReveal>

        {/* RECENT ARTICLES / INSIGHTS SECTION */}
        <section id="articles" className="mb-20 scroll-mt-24">
          <ScrollReveal className="mb-8">
            <Badge size="2" color="grass" className="mb-2 uppercase tracking-wider font-semibold">
              Dossiers & Analyses
            </Badge>
            <Heading size="6" className="font-sans text-green-dark dark:text-eco-white">
              L'empreinte écologique sous toutes ses facettes
            </Heading>
            <Text size="2" color="gray">
              Des études basées sur les rapports du GIEC, de l'ADEME et du Shift Project.
            </Text>
          </ScrollReveal>

          <Grid columns={{ initial: "1", sm: "2", md: "3" }} gap="6">
            {displayedArticles.map((article) => (
              <ArticleCard 
                key={article.title}
                category={article.category}
                badgeColor={article.badgeColor}
                type={article.type}
                title={article.title}
                description={article.description}
                link={article.link}
              />
            ))}
          </Grid>
        </section>

        {/* INTERACTIVE SIMULATOR SECTION (Client component logic) */}
        <section id="simulator" className="mb-20 scroll-mt-24">
          <ScrollReveal className="mb-8">
            <Badge size="2" color="brown" className="mb-2 uppercase tracking-wider font-semibold">
              Simulateur Matériel
            </Badge>
            <Heading size="6" className="font-sans text-green-dark dark:text-eco-white">
              Éco-Calculateur d'Équipement Numérique
            </Heading>
            <Text size="2" color="gray">
              Estimez le coût carbone de fabrication et de transport de votre appareil, puis découvrez comment sa durée de vie amortit son impact annuel.
            </Text>
          </ScrollReveal>

          <DeviceSimulator />
        </section>

        {/* NEWSLETTER SECTION (Client component form) */}
        <NewsletterSection />
      </Container>
    </div>
  );
}
