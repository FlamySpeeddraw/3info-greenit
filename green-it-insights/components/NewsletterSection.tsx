"use client";

import React from "react";
import { Card, Grid, Box, Heading, Text, TextField, Button } from "@radix-ui/themes";
import { EnvelopeOpenIcon } from "@radix-ui/react-icons";
import { useTheme } from "@/app/theme-provider";
import { COLORS } from "@/app/color.const";
import { ScrollReveal } from "./ScrollReveal";

export function NewsletterSection() {
  const { useDarkMode } = useTheme();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Inscription validée ! Merci pour votre démarche éco-responsable.");
  };

  const borderTheme = useDarkMode ? "rgba(244, 243, 238, 0.08)" : "rgba(61, 46, 43, 0.08)";
  const cardBgTheme = useDarkMode ? COLORS.oled.gray : COLORS.eco.gray;

  return (
    <ScrollReveal>
      <section className="mb-20">
        <Card 
          variant="surface" 
          className="p-8 border transition-all"
          style={{ backgroundColor: cardBgTheme, borderColor: borderTheme }}
        >
          <Grid columns={{ initial: "1", md: "12" }} gap="6" align="center">
            <Box className="md:col-span-7 space-y-3">
              <Heading size="5" className="text-green-dark dark:text-eco-white">
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
  );
}
