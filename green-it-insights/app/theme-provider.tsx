"use client";

import React, { createContext, useContext, useCallback, useSyncExternalStore } from "react";
import { Theme } from "@radix-ui/themes";

type ThemeContextType = {
  useDarkMode: boolean;
  setUseDarkMode: (val: boolean) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot(): boolean {
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "light") return false;
    if (stored === "dark") return true;
  } catch {}
  if (typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
    return true;
  }
  return true; // default = dark (OLED)
}

function getServerSnapshot(): boolean {
  return true; // default = dark on server
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const useDarkMode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setUseDarkMode = useCallback((dark: boolean) => {
    const root = window.document.documentElement;
    if (dark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {}
  }, []);

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
