"use client";

import React, { useState } from "react";
import { Card, Grid, Box, Heading, Text, TextField, Button } from "@radix-ui/themes";
import { EnvelopeOpenIcon, CheckCircledIcon } from "@radix-ui/react-icons";
import { useTheme } from "@/app/theme-provider";
import { COLORS } from "@/app/color.const";
import { ScrollReveal } from "./ScrollReveal";

export function NewsletterSection() {
  const { useDarkMode } = useTheme();
  const [subscribed, setSubscribed] = useState(false);

  // TODO: brancher un vrai endpoint d'inscription (ex. API route, service email)
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
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
                Inscrivez-vous à notre veille mensuelle rédigée en texte brut. Un email ultra-léger par mois, sans images superflues, pour minimiser l&apos;impact environnemental de votre boîte de réception (~0.2g CO2/mail).
              </Text>
            </Box>
            <Box className="md:col-span-5">
              {subscribed ? (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-green-accent/10 text-green-accent">
                  <CheckCircledIcon className="w-5 h-5 flex-shrink-0" />
                  <Text size="2" weight="medium">
                    Inscription validée ! Merci pour votre démarche éco-responsable.
                  </Text>
                </div>
              ) : (
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
                    <EnvelopeOpenIcon /> S&apos;abonner
                  </Button>
                </form>
              )}
            </Box>
          </Grid>
        </Card>
      </section>
    </ScrollReveal>
  );
}
