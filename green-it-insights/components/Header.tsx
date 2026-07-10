"use client";

import React from "react";
import { Container, Flex, Heading, Text, Switch } from "@radix-ui/themes";
import { GlobeIcon, SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { useTheme } from "@/app/theme-provider";

export function Header() {
  const { useDarkMode, setUseDarkMode } = useTheme();

  return (
    <header 
      className="sticky top-0 z-50 backdrop-blur-md border-b border-brown-dark/10 dark:border-eco-white/5 bg-eco-white/80 dark:bg-oled-black/80 transition-colors duration-500"
    >
      <Container size="4" className="px-4 py-4">
        <Flex justify="between" align="center">
          <Flex align="center" gap="2">
            <div 
              className="p-2 rounded-lg flex items-center justify-center bg-green-dark dark:bg-green-light text-eco-white"
            >
              <GlobeIcon className="w-5 h-5 eco-pulse" />
            </div>
            <Heading size="4" weight="bold" className="tracking-tight font-sans text-green-dark dark:text-eco-white">
              Green IT Insights
            </Heading>
          </Flex>
          <Flex align="center" gap="5" className="text-sm font-medium">
            <a href="#articles" className="hover:underline transition-all hidden sm:block text-green-dark dark:text-eco-white">Analyses</a>
            <a href="#simulator" className="hover:underline transition-all hidden sm:block text-green-dark dark:text-eco-white">Simulateur Matériel</a>
            
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
              <Text size="1" weight="medium" className="hidden xs:block text-green-dark dark:text-eco-white">
                {useDarkMode ? "Mode Sombre" : "Mode Clair"}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </header>
  );
}
