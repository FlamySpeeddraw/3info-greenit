"use client";

import React from "react";
import { Container, Flex, Heading, Text, Switch, DropdownMenu, Button, Box } from "@radix-ui/themes";
import { GlobeIcon, SunIcon, MoonIcon, CaretDownIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useTheme } from "@/app/theme-provider";
import Link from "next/link";

export function Header() {
  const { useDarkMode, setUseDarkMode } = useTheme();

  return (
    <header 
      className="sticky top-0 z-50 backdrop-blur-md border-b border-brown-dark/10 dark:border-eco-white/5 bg-eco-white/80 dark:bg-oled-black/80 transition-colors duration-500"
    >
      <Container size="4" className="px-4 py-4">
        <Flex justify="between" align="center">
          {/* Logo & Brand */}
          <Link href="/" passHref legacyBehavior>
            <a className="!no-underline">
              <Flex align="center" gap="2" className="cursor-pointer">
                <div 
                  className="p-2 rounded-lg flex items-center justify-center bg-green-dark dark:bg-green-light text-eco-white"
                >
                  <GlobeIcon className="w-5 h-5 eco-pulse" />
                </div>
                <Heading size="4" weight="bold" className="tracking-tight font-sans text-green-dark dark:text-eco-white">
                  Green IT Insights
                </Heading>
              </Flex>
            </a>
          </Link>

          {/* Desktop Navigation & Actions */}
          <Flex align="center" gap="5" className="text-sm font-medium">
            {/* Dropdown for Analyses */}
            <Box display={{ initial: "none", sm: "block" }}>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Button variant="ghost" color="grass" className="cursor-pointer gap-1 text-green-dark dark:text-eco-white hover:bg-brown-dark/5 dark:hover:bg-eco-white/5">
                    Analyses <CaretDownIcon />
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content color="grass" variant="soft" className="z-[100] max-h-[400px] overflow-y-auto">
                  <DropdownMenu.Item className="cursor-pointer" asChild>
                    <Link href="/evolution-gaz-effet-serre">Évolution des GES</Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="cursor-pointer" asChild>
                    <Link href="/ressourcesDevices">Production IT</Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="cursor-pointer" asChild>
                    <Link href="/materiels/transport">Logistique & Transport</Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="cursor-pointer" asChild>
                    <Link href="/energie/numerique-ia">Numérique & IA</Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="cursor-pointer" asChild>
                    <Link href="/mix">Mix Énergétique</Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="cursor-pointer" asChild>
                    <Link href="/materiels/utilisation">Utilisation & Mutualisation</Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="cursor-pointer" asChild>
                    <Link href="/materiels/fin-de-vie">Fin de Vie & Recyclage</Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="cursor-pointer" asChild>
                    <Link href="/energie/production">Production d'Énergie</Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="cursor-pointer" asChild>
                    <Link href="/emissions_par_pays">Émissions par Pays</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </Box>

            {/* Link to Simulator */}
            <Box display={{ initial: "none", sm: "block" }}>
              <Button variant="ghost" color="grass" className="cursor-pointer text-green-dark dark:text-eco-white hover:bg-brown-dark/5 dark:hover:bg-eco-white/5" asChild>
                <Link href="/#simulator">
                  Simulateur Matériel
                </Link>
              </Button>
            </Box>
            
            {/* Mode Sombre Switch (Visible on all viewports) */}
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
              <Text size="1" weight="medium" className="hidden md:block text-green-dark dark:text-eco-white">
                {useDarkMode ? "Mode Sombre" : "Mode Clair"}
              </Text>
            </Flex>

            {/* Mobile Burger Menu (Visible only on mobile/tablet) */}
            <Box display={{ initial: "block", sm: "none" }}>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Button variant="ghost" color="grass" size="2" className="cursor-pointer p-1">
                    <HamburgerMenuIcon className="w-5 h-5 text-green-dark dark:text-eco-white" />
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content color="grass" align="end" className="z-[100] max-h-[400px] overflow-y-auto">
                  <DropdownMenu.Label>Navigation</DropdownMenu.Label>
                  <DropdownMenu.Item className="cursor-pointer" asChild>
                    <Link href="/">Accueil</Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="cursor-pointer" asChild>
                    <Link href="/#simulator">Simulateur Matériel</Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Label>Analyses & Dossiers</DropdownMenu.Label>
                  <DropdownMenu.Item className="cursor-pointer" asChild>
                    <Link href="/evolution-gaz-effet-serre">Évolution des GES</Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="cursor-pointer" asChild>
                    <Link href="/ressourcesDevices">Production IT</Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="cursor-pointer" asChild>
                    <Link href="/materiels/transport">Logistique & Transport</Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="cursor-pointer" asChild>
                    <Link href="/energie/numerique-ia">Numérique & IA</Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="cursor-pointer" asChild>
                    <Link href="/mix">Mix Énergétique</Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="cursor-pointer" asChild>
                    <Link href="/materiels/utilisation">Utilisation & Mutualisation</Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="cursor-pointer" asChild>
                    <Link href="/materiels/fin-de-vie">Fin de Vie & Recyclage</Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="cursor-pointer" asChild>
                    <Link href="/energie/production">Production d'Énergie</Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="cursor-pointer" asChild>
                    <Link href="/emissions_par_pays">Émissions par Pays</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </Box>
          </Flex>
        </Flex>
      </Container>
    </header>
  );
}
