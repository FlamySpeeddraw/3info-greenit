"use client";

import React, { useState } from "react";
import {
  Container,
  Box,
  Heading,
  Text,
  Flex,
  Grid,
  Card,
  Button,
  Badge,
  Switch,
  Slider,
  Separator,
  TextField,
} from "@radix-ui/themes";
import {
  CheckCircledIcon,
  GlobeIcon,
  LightningBoltIcon,
  DashboardIcon,
  EnvelopeOpenIcon,
  BarChartIcon,
  SunIcon,
  MoonIcon
} from "@radix-ui/react-icons";
import { COLORS } from "./color.const";
import { useTheme } from "./theme-provider";
import { ScrollReveal } from "@/components/ScrollReveal";
import { MetricCard } from "@/components/MetricCard";
import { ArticleCard } from "@/components/ArticleCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
    title: "Le climat depuis les temps géologiques",
    description: "De l'optimum thermique de l'Éocène aux glaciations quaternaires, observez comment les cycles naturels du carbone ont été supplantés par l'explosion industrielle et numérique récente en moins d'un siècle.",
  },
  {
    category: "Matériel & Mines",
    badgeColor: "brown" as const,
    type: "Dossier",
    title: "Cartographie de la production IT",
    description: "De l'extraction des terres rares en Mongolie intérieure au raffinage et à l'assemblage dans la \"Silicon Valley\" asiatique (Taiwan, Shenzhen). Découvrez les coulisses géopolitiques et énergétiques de nos puces.",
  },
  {
    category: "Logistique",
    badgeColor: "yellow" as const,
    type: "Dossier",
    title: "Modes de transport et coût carbone",
    description: "Aérien, maritime, ferroviaire ou routier : analyse comparative des modes d'acheminement des terminaux électroniques. Comment le choix logistique impacte directement le bilan carbone final d'un appareil.",
  },
];

export default function HomePage() {
  // Page Global OLED Dark Mode state (from global Theme Context)
  const { useDarkMode, setUseDarkMode } = useTheme();

  // State for the Device Carbon Footprint Simulator
  const [deviceType, setDeviceType] = useState<"smartphone" | "laptop" | "desktop">("laptop");
  const [manufacturingLocation, setManufacturingLocation] = useState<"asia" | "europe">("asia");
  const [transportMode, setTransportMode] = useState<"air" | "sea">("air");
  const [deviceLifespan, setDeviceLifespan] = useState(3); // in years

  // Footprint Calculation logic based on general Green IT studies (ADEME, Shifter Project)
  // Base Manufacturing Carbon Cost (in kg CO2e)
  const baseCost = deviceType === "smartphone" ? 75 : deviceType === "laptop" ? 240 : 520;
  // Location factor reflecting electricity mix carbon intensity
  const locationFactor = manufacturingLocation === "asia" ? 1.25 : 0.80; 
  // Transport Cost (in kg CO2e)
  const transportCost = transportMode === "air" ? 95 : 12;

  const totalManufacturingAndShipping = Math.round(baseCost * locationFactor + transportCost);
  const annualAmortizedFootprint = totalManufacturingAndShipping / deviceLifespan;

  // Eco-grade calculations based on annual amortized carbon footprint
  let ecoGrade = "A";
  let gradeColor: "green" | "grass" | "yellow" | "orange" | "tomato" = "grass";
  
  if (annualAmortizedFootprint > 160) {
    ecoGrade = "E";
    gradeColor = "tomato";
  } else if (annualAmortizedFootprint > 90) {
    ecoGrade = "D";
    gradeColor = "orange";
  } else if (annualAmortizedFootprint > 50) {
    ecoGrade = "C";
    gradeColor = "yellow";
  } else if (annualAmortizedFootprint > 25) {
    ecoGrade = "B";
    gradeColor = "grass";
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Inscription validée ! Merci pour votre démarche éco-responsable.");
  };

  // Inline theme colors based on the toggle state for dynamic live preview
  const bgTheme = useDarkMode ? COLORS.oled.black : COLORS.eco.white;
  const textTheme = useDarkMode ? COLORS.dark.foreground : COLORS.light.foreground;
  const borderTheme = useDarkMode ? "rgba(244, 243, 238, 0.08)" : "rgba(61, 46, 43, 0.08)";
  const cardBgTheme = useDarkMode ? COLORS.oled.gray : COLORS.eco.gray;

  return (
    <div 
      className="flex-1 min-h-screen transition-colors duration-500 overflow-x-hidden"
      style={{ backgroundColor: bgTheme, color: textTheme }}
    >
        {/* Navigation Bar */}
        <header 
          className="sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-500"
          style={{ 
            borderColor: borderTheme,
            backgroundColor: useDarkMode ? "rgba(8, 14, 10, 0.8)" : "rgba(251, 251, 249, 0.8)"
          }}
        >
          <Container size="4" className="px-4 py-4">
            <Flex justify="between" align="center">
              <Flex align="center" gap="2">
                <div 
                  className="p-2 rounded-lg flex items-center justify-center transition-colors"
                  style={{ 
                    backgroundColor: useDarkMode ? COLORS.green.light : COLORS.green.dark, 
                    color: COLORS.eco.white 
                  }}
                >
                  <GlobeIcon className="w-5 h-5 eco-pulse" />
                </div>
                <Heading size="4" weight="bold" className="tracking-tight font-sans" style={{ color: useDarkMode ? COLORS.eco.white : COLORS.green.dark }}>
                  Green IT Insights
                </Heading>
              </Flex>
              <Flex align="center" gap="5" className="text-sm font-medium">
                <a href="#articles" className="hover:underline transition-all hidden sm:block" style={{ color: textTheme }}>Analyses</a>
                <a href="#simulator" className="hover:underline transition-all hidden sm:block" style={{ color: textTheme }}>Simulateur Matériel</a>
                
                {/* Mode Sombre Switch */}
                <Flex align="center" gap="2" className="bg-brown-dark/5 dark:bg-eco-white/5 px-3 py-1.5 rounded-full border border-brown-dark/10 dark:border-eco-white/10 transition-colors">
                  <SunIcon className={`w-3.5 h-3.5 ${!useDarkMode ? "text-amber-500" : "text-gray-400"}`} />
                  <Switch 
                    checked={useDarkMode} 
                    onCheckedChange={setUseDarkMode} 
                    color="grass" 
                    size="2"
                    aria-label="Activer le mode sombre"
                  />
                  <MoonIcon className={`w-3.5 h-3.5 ${useDarkMode ? "text-emerald-500" : "text-gray-400"}`} />
                  <Text size="1" weight="medium" className="hidden xs:block" style={{ color: textTheme }}>
                    {useDarkMode ? "Mode Sombre" : "Mode Clair"}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Container>
        </header>

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
                  className="tracking-tight leading-none font-sans"
                  style={{ color: useDarkMode ? COLORS.eco.white : COLORS.green.dark }}
                >
                  Comprendre l'impact carbone du numérique.
                </Heading>
                <Text size="4" className="block max-w-2xl font-light opacity-90 leading-relaxed">
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
                {/* Visual Eco-Badge */}
                <div 
                  className="p-8 rounded-3xl border flex flex-col justify-center items-center text-center space-y-4"
                  style={{ 
                    backgroundColor: cardBgTheme, 
                    borderColor: borderTheme 
                  }}
                >
                  <div className="w-16 h-16 rounded-full bg-green-accent/25 flex items-center justify-center text-green-accent">
                    <BarChartIcon className="w-8 h-8 eco-pulse" />
                  </div>
                  <div>
                    <Text size="1" color="gray" className="uppercase tracking-wider font-bold block mb-1">
                      Cycle de vie IT
                    </Text>
                    <Heading size="7" style={{ color: COLORS.green.accent }}>
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
              <Heading size="6" className="font-sans" style={{ color: useDarkMode ? COLORS.eco.white : COLORS.green.dark }}>
                L'empreinte écologique sous toutes ses facettes
              </Heading>
              <Text size="2" color="gray">
                Des études basées sur les rapports du GIEC, de l'ADEME et du Shift Project.
              </Text>
            </ScrollReveal>

            <Grid columns={{ initial: "1", md: "3" }} gap="6">
              {ARTICLES.map((article) => (
                <ArticleCard 
                  key={article.title}
                  category={article.category}
                  badgeColor={article.badgeColor}
                  type={article.type}
                  title={article.title}
                  description={article.description}
                />
              ))}
            </Grid>
          </section>

          {/* INTERACTIVE SIMULATOR SECTION */}
          <section id="simulator" className="mb-20 scroll-mt-24">
            <ScrollReveal className="mb-8">
              <Badge size="2" color="brown" className="mb-2 uppercase tracking-wider font-semibold">
                Simulateur Matériel
              </Badge>
              <Heading size="6" className="font-sans" style={{ color: useDarkMode ? COLORS.eco.white : COLORS.green.dark }}>
                Éco-Calculateur d'Équipement Numérique
              </Heading>
              <Text size="2" color="gray">
                Estimez le coût carbone de fabrication et de transport de votre appareil, puis découvrez comment sa durée de vie amortit son impact annuel.
              </Text>
            </ScrollReveal>

            <ScrollReveal>
              <Grid columns={{ initial: "1", lg: "12" }} gap="6">
                {/* Control Panel */}
                <Card 
                  variant="surface" 
                  className="lg:col-span-7 p-6 border transition-all"
                  style={{ backgroundColor: cardBgTheme, borderColor: borderTheme }}
                >
                  <Heading size="4" className="mb-6 flex items-center gap-2" style={{ color: useDarkMode ? COLORS.eco.white : COLORS.green.dark }}>
                    <DashboardIcon className="w-5 h-5" style={{ color: COLORS.green.accent }} />
                    Configuration de l'Appareil
                  </Heading>

                  <Flex direction="column" gap="6">
                    {/* Device Selector */}
                    <Box className="pb-4 border-b" style={{ borderColor: borderTheme }}>
                      <Text size="2" weight="bold" className="block mb-3" style={{ color: useDarkMode ? COLORS.eco.white : COLORS.green.dark }}>
                        Type d'équipement
                      </Text>
                      <Flex gap="2">
                        <Button 
                          variant={deviceType === "smartphone" ? "solid" : "soft"} 
                          color="grass" 
                          onClick={() => setDeviceType("smartphone")}
                          className="cursor-pointer"
                        >
                          Smartphone
                        </Button>
                        <Button 
                          variant={deviceType === "laptop" ? "solid" : "soft"} 
                          color="grass" 
                          onClick={() => setDeviceType("laptop")}
                          className="cursor-pointer"
                        >
                          Ordinateur Portable
                        </Button>
                        <Button 
                          variant={deviceType === "desktop" ? "solid" : "soft"} 
                          color="grass" 
                          onClick={() => setDeviceType("desktop")}
                          className="cursor-pointer"
                        >
                          PC Fixe (+ Écran)
                        </Button>
                      </Flex>
                    </Box>

                    {/* Manufacturing Location Selector */}
                    <Box className="pb-4 border-b" style={{ borderColor: borderTheme }}>
                      <Text size="2" weight="bold" className="block mb-3" style={{ color: useDarkMode ? COLORS.eco.white : COLORS.green.dark }}>
                        Localisation du centre de production
                      </Text>
                      <Flex gap="2">
                        <Button 
                          variant={manufacturingLocation === "asia" ? "solid" : "soft"} 
                          color="brown" 
                          onClick={() => setManufacturingLocation("asia")}
                          className="cursor-pointer"
                        >
                          Asie de l'Est (Mix carboné : Charbon)
                        </Button>
                        <Button 
                          variant={manufacturingLocation === "europe" ? "solid" : "soft"} 
                          color="brown" 
                          onClick={() => setManufacturingLocation("europe")}
                          className="cursor-pointer"
                        >
                          Europe (Mix décarboné / Nucléaire / EnR)
                        </Button>
                      </Flex>
                    </Box>

                    {/* Transport Selector */}
                    <Box className="pb-4 border-b" style={{ borderColor: borderTheme }}>
                      <Text size="2" weight="bold" className="block mb-3" style={{ color: useDarkMode ? COLORS.eco.white : COLORS.green.dark }}>
                        Mode de transport logistique
                      </Text>
                      <Flex gap="2">
                        <Button 
                          variant={transportMode === "air" ? "solid" : "soft"} 
                          color="grass" 
                          onClick={() => setTransportMode("air")}
                          className="cursor-pointer"
                        >
                          Aérien (Rapide - Haute intensité CO2)
                        </Button>
                        <Button 
                          variant={transportMode === "sea" ? "solid" : "soft"} 
                          color="grass" 
                          onClick={() => setTransportMode("sea")}
                          className="cursor-pointer"
                        >
                          Maritime (Lent - Basse intensité CO2)
                        </Button>
                      </Flex>
                    </Box>

                    {/* Lifespan Slider */}
                    <Box className="pb-2">
                      <Flex justify="between" align="center" className="mb-2">
                        <Box>
                          <Text size="2" weight="bold" className="block" style={{ color: useDarkMode ? COLORS.eco.white : COLORS.green.dark }}>
                            Durée d'utilisation de l'appareil
                          </Text>
                          <Text size="1" color="gray">
                            Garder son équipement plus longtemps est le premier levier de sobriété numérique.
                          </Text>
                        </Box>
                        <Badge color="brown" size="2" className="font-mono">
                          {deviceLifespan} ans
                        </Badge>
                      </Flex>
                      <Slider
                          value={[deviceLifespan]}
                          onValueChange={(val) => setDeviceLifespan(val[0])}
                          min={1}
                          max={8}
                          step={1}
                          color="brown"
                      />
                    </Box>
                  </Flex>
                </Card>

                {/* Results Panel */}
                <Card 
                  variant="surface" 
                  className="lg:col-span-5 p-6 border flex flex-col justify-between transition-all"
                  style={{ 
                    backgroundColor: useDarkMode ? "rgba(18, 26, 21, 0.4)" : "rgba(61, 46, 43, 0.03)", 
                    borderColor: borderTheme 
                  }}
                >
                  <div className="space-y-6">
                    <Heading size="4" style={{ color: useDarkMode ? COLORS.eco.white : COLORS.green.dark }}>
                      Bilan Carbone Amorti
                    </Heading>

                    <Flex align="center" justify="between" className="p-4 rounded-xl border transition-all" style={{ backgroundColor: bgTheme, borderColor: borderTheme }}>
                      <Box>
                        <Text size="1" color="gray" className="uppercase tracking-wider font-semibold block mb-1">
                          Score Annuel
                        </Text>
                        <Heading size="9" weight="bold" style={{ color: ecoGrade === "A" || ecoGrade === "B" ? COLORS.green.accent : undefined }}>
                          {ecoGrade}
                        </Heading>
                      </Box>
                      <Box className="text-right">
                        <Text size="1" color="gray" className="uppercase tracking-wider font-semibold block mb-1">
                          Empreinte / An
                        </Text>
                        <Heading size="7" weight="bold" className="font-mono" style={{ color: useDarkMode ? COLORS.eco.white : COLORS.green.dark }}>
                          {Math.round(annualAmortizedFootprint)} kg
                        </Heading>
                        <Text size="1" color="gray">
                          CO2 équivalent
                        </Text>
                      </Box>
                    </Flex>

                    <div className="space-y-3">
                      <Flex align="center" gap="2" className="text-sm">
                        <CheckCircledIcon className="w-4 h-4" style={{ color: COLORS.green.accent }} />
                        <Text color="gray">Empreinte brute initiale : {totalManufacturingAndShipping} kg CO2e</Text>
                      </Flex>
                      <Flex align="center" gap="2" className="text-sm">
                        <CheckCircledIcon className="w-4 h-4" style={{ color: COLORS.green.accent }} />
                        <Text color="gray">Impact fabrication : {Math.round(baseCost * locationFactor)} kg ({manufacturingLocation === "asia" ? "Mix carboné" : "Mix propre"})</Text>
                      </Flex>
                      <Flex align="center" gap="2" className="text-sm">
                        <CheckCircledIcon className="w-4 h-4" style={{ color: COLORS.green.accent }} />
                        <Text color="gray">Impact fret logistique : {transportCost} kg ({transportMode === "air" ? "Avion" : "Cargo maritime"})</Text>
                      </Flex>
                      <Flex align="center" gap="2" className="text-sm">
                        <CheckCircledIcon className="w-4 h-4" style={{ color: COLORS.green.accent }} />
                        <Text color="gray">Facteur d'amortissement : {deviceLifespan} an(s) d'utilisation</Text>
                      </Flex>
                    </div>
                  </div>

                  <div className="pt-6">
                    <Separator size="4" className="mb-4" style={{ backgroundColor: borderTheme }} />
                    <Flex align="center" gap="2" className="p-3 rounded-lg border transition-all" style={{ backgroundColor: bgTheme, borderColor: borderTheme }}>
                      <LightningBoltIcon className="w-5 h-5 text-amber-500" />
                      <Text size="1" color="gray">
                        {deviceLifespan >= 5
                            ? "Excellent ! Garder un appareil 5 ans ou plus divise par 2 son impact annuel moyen."
                            : "Conseil : Augmenter la durée d'usage à 5 ans pour réduire drastiquement l'empreinte annuelle."
                        }
                      </Text>
                    </Flex>
                  </div>
                </Card>
              </Grid>
            </ScrollReveal>
          </section>

          {/* NEWSLETTER SECTION */}
          <ScrollReveal>
            <section className="mb-20">
              <Card 
                variant="surface" 
                className="p-8 border transition-all"
                style={{ backgroundColor: cardBgTheme, borderColor: borderTheme }}
              >
                <Grid columns={{ initial: "1", md: "12" }} gap="6" align="center">
                  <Box className="md:col-span-7 space-y-3">
                    <Heading size="5" style={{ color: useDarkMode ? COLORS.eco.white : COLORS.green.dark }}>
                      Restez informé de manière sobre
                    </Heading>
                    <Text size="2" color="gray" className="block max-w-xl">
                      Inscrivez-vous à notre veille mensuelle rédigée en texte brut. Un email ultra-léger par mois, sans images superflues, pour minimiser l'impact environnemental de votre boîte de réception (~0.2g CO2/mail).
                    </Text>
                  </Box>
                  <Box className="md:col-span-5">
                    <form onSubmit={handleSubscribe} className="flex gap-2">
                      <div className="flex-1">
                        <TextField.Root
                            placeholder="Entrez votre adresse email..."
                            type="email"
                            required
                            size="3"
                            color="grass"
                        />
                      </div>
                      <Button type="submit" color="grass" size="3" className="cursor-pointer">
                        <EnvelopeOpenIcon /> S'abonner
                      </Button>
                    </form>
                  </Box>
                </Grid>
              </Card>
            </section>
          </ScrollReveal>

          {/* Footer */}
          <footer className="pt-8 border-t text-center" style={{ borderColor: borderTheme }}>
            <Text size="1" color="gray">
              Green IT Insights &copy; {new Date().getFullYear()} — Média éco-conçu. Moins de 0,1g CO2 par visite en mode sombre OLED.
            </Text>
          </footer>
        </Container>
      </div>
  );
}
