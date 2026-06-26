"use client";

import React from "react";
import { Card, Heading, Text } from "@radix-ui/themes";
import { useTheme } from "@/app/theme-provider";
import { COLORS } from "@/app/color.const";

type MetricCardProps = {
  value: string;
  description: string;
};

export function MetricCard({ value, description }: MetricCardProps) {
  const { useDarkMode } = useTheme();
  
  const borderTheme = useDarkMode ? "rgba(244, 243, 238, 0.08)" : "rgba(61, 46, 43, 0.08)";
  const cardBgTheme = useDarkMode ? COLORS.oled.gray : COLORS.eco.gray;
  const headingColor = useDarkMode ? COLORS.green.accent : COLORS.green.dark;

  return (
    <Card 
      variant="surface" 
      className="p-6 border transition-all"
      style={{ backgroundColor: cardBgTheme, borderColor: borderTheme }}
    >
      <Heading size="6" className="mb-1" style={{ color: headingColor }}>
        {value}
      </Heading>
      <Text size="2" color="gray">
        {description}
      </Text>
    </Card>
  );
}
