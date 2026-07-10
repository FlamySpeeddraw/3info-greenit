"use client";

import React, { useState } from "react";
import { Grid, Card, Heading, Flex, Box, Text, Button, Badge, Slider, Separator } from "@radix-ui/themes";
import { DashboardIcon, CheckCircledIcon, LightningBoltIcon } from "@radix-ui/react-icons";
import { useTheme } from "@/app/theme-provider";
import { COLORS } from "@/app/color.const";
import { ScrollReveal } from "./ScrollReveal";

export function DeviceSimulator() {
  const { useDarkMode } = useTheme();

  // State for the Device Carbon Footprint Simulator
  const [deviceType, setDeviceType] = useState<"smartphone" | "laptop" | "desktop">("laptop");
  const [manufacturingLocation, setManufacturingLocation] = useState<"asia" | "europe">("asia");
  const [transportMode, setTransportMode] = useState<"air" | "sea">("air");
  const [deviceLifespan, setDeviceLifespan] = useState(3); // in years

  // Calculation parameters
  const baseCost = deviceType === "smartphone" ? 75 : deviceType === "laptop" ? 240 : 520;
  const locationFactor = manufacturingLocation === "asia" ? 1.25 : 0.80; 
  const transportCost = transportMode === "air" ? 95 : 12;

  const totalManufacturingAndShipping = Math.round(baseCost * locationFactor + transportCost);
  const annualAmortizedFootprint = totalManufacturingAndShipping / deviceLifespan;

  // Eco-grade logic
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

  // Theme values
  const bgTheme = useDarkMode ? COLORS.oled.black : COLORS.eco.white;
  const borderTheme = useDarkMode ? "rgba(244, 243, 238, 0.08)" : "rgba(61, 46, 43, 0.08)";
  const cardBgTheme = useDarkMode ? COLORS.oled.gray : COLORS.eco.gray;

  return (
    <ScrollReveal>
      <Grid columns={{ initial: "1", md: "12" }} gap="6">
        {/* Control Panel */}
        <Card 
          variant="surface" 
          className="md:col-span-7 p-6 border transition-all"
          style={{ backgroundColor: cardBgTheme, borderColor: borderTheme }}
        >
          <Heading size="4" className="mb-6 flex items-center gap-2 text-green-dark dark:text-eco-white">
            <DashboardIcon className="w-5 h-5 text-green-accent" />
            Configuration de l'Appareil
          </Heading>

          {/* Mobile-only Quick Results Summary */}
          <Box display={{ initial: "block", md: "none" }} className="mb-6 p-4 rounded-xl border text-center" style={{ backgroundColor: bgTheme, borderColor: borderTheme }}>
            <Flex align="center" justify="between">
              <Text size="2" weight="bold" className="text-green-dark dark:text-eco-white">Bilan Carbone :</Text>
              <Flex gap="3" align="center">
                <Badge color={gradeColor} size="2">Score {ecoGrade}</Badge>
                <Text size="2" weight="bold" className="font-mono text-green-dark dark:text-eco-white">
                  {Math.round(annualAmortizedFootprint)} kg/an
                </Text>
              </Flex>
            </Flex>
          </Box>

          <Flex direction="column" gap="6">
            {/* Device Selector */}
            <Box className="pb-4 border-b border-brown-dark/10 dark:border-eco-white/5">
              <Text size="2" weight="bold" className="block mb-3 text-green-dark dark:text-eco-white">
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
            <Box className="pb-4 border-b border-brown-dark/10 dark:border-eco-white/5">
              <Text size="2" weight="bold" className="block mb-3 text-green-dark dark:text-eco-white">
                Localisation du centre de production
              </Text>
              <Flex gap="2">
                <Button 
                  variant={manufacturingLocation === "asia" ? "solid" : "soft"} 
                  color="brown" 
                  onClick={() => setManufacturingLocation("asia")}
                  className="cursor-pointer"
                >
                  Asie de l'Est (Mix carboné)
                </Button>
                <Button 
                  variant={manufacturingLocation === "europe" ? "solid" : "soft"} 
                  color="brown" 
                  onClick={() => setManufacturingLocation("europe")}
                  className="cursor-pointer"
                >
                  Europe (Mix décarboné)
                </Button>
              </Flex>
            </Box>

            {/* Transport Selector */}
            <Box className="pb-4 border-b border-brown-dark/10 dark:border-eco-white/5">
              <Text size="2" weight="bold" className="block mb-3 text-green-dark dark:text-eco-white">
                Mode de transport logistique
              </Text>
              <Flex gap="2">
                <Button 
                  variant={transportMode === "air" ? "solid" : "soft"} 
                  color="grass" 
                  onClick={() => setTransportMode("air")}
                  className="cursor-pointer"
                >
                  Aérien (Rapide - CO2 élevé)
                </Button>
                <Button 
                  variant={transportMode === "sea" ? "solid" : "soft"} 
                  color="grass" 
                  onClick={() => setTransportMode("sea")}
                  className="cursor-pointer"
                >
                  Maritime (Lent - CO2 faible)
                </Button>
              </Flex>
            </Box>

            {/* Lifespan Slider */}
            <Box className="pb-2">
              <Flex justify="between" align="center" className="mb-2">
                <Box>
                  <Text size="2" weight="bold" className="block text-green-dark dark:text-eco-white">
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
          className="md:col-span-5 p-6 border flex flex-col justify-between transition-all"
          style={{ 
            backgroundColor: useDarkMode ? "rgba(18, 26, 21, 0.4)" : "rgba(61, 46, 43, 0.03)", 
            borderColor: borderTheme 
          }}
        >
          <div className="space-y-6">
            <Heading size="4" className="text-green-dark dark:text-eco-white">
              Bilan Carbone Amorti
            </Heading>

            <Flex align="center" justify="between" className="p-4 rounded-xl border transition-all" style={{ backgroundColor: bgTheme, borderColor: borderTheme }}>
              <Box>
                <Text size="1" color="gray" className="uppercase tracking-wider font-semibold block mb-1">
                  Score Annuel
                </Text>
                <Heading size="9" weight="bold" color={gradeColor}>
                  {ecoGrade}
                </Heading>
              </Box>
              <Box className="text-right">
                <Text size="1" color="gray" className="uppercase tracking-wider font-semibold block mb-1">
                  Empreinte / An
                </Text>
                <Heading size="7" weight="bold" className="font-mono text-green-dark dark:text-eco-white">
                  {Math.round(annualAmortizedFootprint)} kg
                </Heading>
                <Text size="1" color="gray">
                  CO2 équivalent
                </Text>
              </Box>
            </Flex>

            <div className="space-y-3">
              <Flex align="center" gap="2" className="text-sm">
                <CheckCircledIcon className="w-4 h-4 text-green-accent" />
                <Text color="gray">Empreinte brute initiale : {totalManufacturingAndShipping} kg CO2e</Text>
              </Flex>
              <Flex align="center" gap="2" className="text-sm">
                <CheckCircledIcon className="w-4 h-4 text-green-accent" />
                <Text color="gray">Impact fabrication : {Math.round(baseCost * locationFactor)} kg ({manufacturingLocation === "asia" ? "Mix carboné" : "Mix propre"})</Text>
              </Flex>
              <Flex align="center" gap="2" className="text-sm">
                <CheckCircledIcon className="w-4 h-4 text-green-accent" />
                <Text color="gray">Impact fret logistique : {transportCost} kg ({transportMode === "air" ? "Avion" : "Cargo maritime"})</Text>
              </Flex>
              <Flex align="center" gap="2" className="text-sm">
                <CheckCircledIcon className="w-4 h-4 text-green-accent" />
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
  );
}
