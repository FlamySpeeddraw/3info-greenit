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
  const [isMounted, setIsMounted] = useState(false);

  // Load theme preference on mount
  useEffect(() => {
    setIsMounted(true);
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme !== null) {
      setUseDarkMode(savedTheme === "dark");
    } else {
      // Fallback to system preference if no manual choice has been saved
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setUseDarkMode(systemPrefersDark);
    }
  }, []);

  // Sync Tailwind v4 dark class on root html tag and save selection
  useEffect(() => {
    if (!isMounted) return;
    const root = window.document.documentElement;
    if (useDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [useDarkMode, isMounted]);

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
