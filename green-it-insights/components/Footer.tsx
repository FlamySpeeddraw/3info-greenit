"use client";

import React from "react";
import { Container, Text } from "@radix-ui/themes";

export function Footer() {
  return (
    <footer 
      className="mt-auto py-8 border-t border-brown-dark/10 dark:border-eco-white/5 bg-eco-white dark:bg-oled-black text-center transition-colors duration-500"
    >
      <Container size="4" className="px-4">
        <Text size="1" color="gray">
          Green IT Insights &copy; {new Date().getFullYear()} — Média éco-conçu. Moins de 0,1g CO2 par visite en mode sombre OLED.
        </Text>
      </Container>
    </footer>
  );
}
