"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Theme } from "@radix-ui/themes";

type ThemeContextType = {
  useDarkMode: boolean;
  setUseDarkMode: (val: boolean) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Default to dark mode (OLED) as specified in the graphical charter
  const [useDarkMode, setUseDarkMode] = useState(true);

  // Sync Tailwind v4 dark class on root html tag
  useEffect(() => {
    const root = window.document.documentElement;
    if (useDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [useDarkMode]);

  return (
    <ThemeContext.Provider value={{ useDarkMode, setUseDarkMode }}>
      <Theme 
        appearance={useDarkMode ? "dark" : "light"} 
        accentColor="grass" 
        grayColor="sand" 
        panelBackground="translucent" 
        radius="large"
      >
        {children}
      </Theme>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
