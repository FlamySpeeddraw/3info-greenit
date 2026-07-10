"use client";

import React from "react";
import { Card, Flex, Badge, Heading, Text } from "@radix-ui/themes";
import { ReaderIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { ScrollReveal } from "./ScrollReveal";
import { useTheme } from "@/app/theme-provider";
import { COLORS } from "@/app/color.const";

type ArticleCardProps = {
  category: string;
  badgeColor: "grass" | "brown" | "yellow" | "orange" | "tomato" | "gray" | "teal" | "blue" | "amber";
  type: string;
  title: string;
  description: string;
  linkText?: string;
  link?: string;
};

export function ArticleCard({
  category,
  badgeColor,
  type,
  title,
  description,
  linkText = "Lire le dossier",
  link = "/ressourcesDevices"
}: ArticleCardProps) {
  const { useDarkMode } = useTheme();

  const borderTheme = useDarkMode ? "rgba(244, 243, 238, 0.08)" : "rgba(61, 46, 43, 0.08)";
  const cardBgTheme = useDarkMode ? COLORS.oled.gray : COLORS.eco.gray;
  const headingColor = useDarkMode ? COLORS.eco.white : COLORS.green.dark;

  return (
    <ScrollReveal className="flex">
      <Link 
        href={link} 
        className="flex flex-1 no-underline" 
        style={{ color: "inherit", textDecoration: "none" }}
      >
        <Card 
          variant="surface" 
          className="group flex-1 flex flex-col justify-between p-6 border transition-all duration-300 cursor-pointer hover:shadow-lg hover:border-green-accent/30 dark:hover:border-green-accent/30"
          style={{ backgroundColor: cardBgTheme, borderColor: borderTheme }}
        >
          <div className="space-y-4">
            <Flex justify="between" align="center">
              <Badge color={badgeColor}>{category}</Badge>
              <Text size="1" color="gray">{type}</Text>
            </Flex>
            <Heading size="4" style={{ color: headingColor }}>
              {title}
            </Heading>
            <Text size="2" color="gray" className="line-clamp-4">
              {description}
            </Text>
          </div>
          <Flex 
            align="center" 
            gap="1" 
            className="mt-6 font-semibold text-sm text-green-accent group-hover:underline"
          >
            <ReaderIcon /> {linkText}
          </Flex>
        </Card>
      </Link>
    </ScrollReveal>
  );
}
