/**
 * Design System Colors for Green IT Insights.
 * 
 * This file contains the color constants for use in React components, inline styles,
 * canvas, GSAP animations, or any other JavaScript/TypeScript context.
 * 
 * Please keep this file in sync with CSS variables in app/globals.css.
 */

export const COLORS = {
  // Core colors
  green: {
    dark: "#112F1F",
    light: "#224D35",
    accent: "#2E6A49",
    bg: "#F0F4F1",
  },
  brown: {
    dark: "#3D2E2B",
    light: "#5C4641",
    accent: "#8E6E66",
    bg: "#F5F1EF",
  },
  eco: {
    white: "#FBFBF9",
    gray: "#F4F3EE",
  },
  oled: {
    black: "#080E0A",
    gray: "#121A15",
  },

  // Theme-specific background/foreground defaults
  light: {
    background: "#FBFBF9",
    foreground: "#112F1F",
    // Radix UI overrides for 'grass' (emerald/forest) palette
    grass: {
      1: "#f8faf8",
      2: "#f0f4f1",
      3: "#e1eae3",
      4: "#cfdfd2",
      5: "#bad2be",
      6: "#a0c2a5",
      7: "#80ae87",
      8: "#5c9365",
      9: "#112F1F", // Primary
      10: "#224D35", // Hover
      11: "#112F1F",
      12: "#08170F",
    },
    // Radix UI overrides for 'brown' palette
    brown: {
      1: "#faf9f9",
      2: "#f5f1ef",
      3: "#eae2e0",
      4: "#dfd2cf",
      5: "#d2beba",
      6: "#c1a6a0",
      7: "#ae8b83",
      8: "#996e64",
      9: "#3D2E2B", // Primary
      10: "#5C4641", // Hover
      11: "#3D2E2B",
      12: "#1F1715",
    },
  },
  dark: {
    background: "#080E0A",
    foreground: "#EAEFEA",
    // Radix UI overrides for 'grass' palette in dark mode
    grass: {
      1: "#080e0a",
      2: "#0e1711",
      3: "#16261c",
      4: "#1d3627",
      5: "#254732",
      6: "#2d5a3f",
      7: "#37704e",
      8: "#43885e",
      9: "#2E6A49", // Primary Dark Green
      10: "#37704e", // Hover
      11: "#bbf7d0",
      12: "#e8fdf0",
    },
    // Radix UI overrides for 'brown' palette in dark mode
    brown: {
      1: "#0e0c0b",
      2: "#171312",
      3: "#241d1c",
      4: "#332725",
      5: "#44322f",
      6: "#573e3a",
      7: "#6e4c47",
      8: "#875c55",
      9: "#8E6E66", // Primary Bright Brown
      10: "#9e7f77", // Hover
      11: "#fed7d7",
      12: "#fff5f5",
    },
  },
} as const;

export type Colors = typeof COLORS;
export type ColorTheme = "light" | "dark";
export type CoreColorGroup = "green" | "brown" | "eco" | "oled";