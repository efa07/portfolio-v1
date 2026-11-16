"use client";

import React, {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";

export type Theme = "dark" | "light";

const STORAGE_KEY = "theme";
const listeners = new Set<() => void>();

// The inline script in app/layout.tsx has already painted the stored theme
// before this module runs, so the document attribute is the source of truth.
let currentTheme: Theme =
  typeof document !== "undefined" && document.documentElement.dataset.theme === "light"
    ? "light"
    : "dark";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
}

function getSnapshot(): Theme {
  return currentTheme;
}

// Server (and hydration) always assume the default theme; React re-reads the
// client snapshot right after hydration, so there is no mismatch.
function getServerSnapshot(): Theme {
  return "dark";
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  // Keep tabs in sync when the theme changes elsewhere.
  const handleStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    const next: Theme = event.newValue === "light" ? "light" : "dark";
    if (next === currentTheme) return;
    currentTheme = next;
    applyTheme(next);
    listeners.forEach((notify) => notify());
  };

  window.addEventListener("storage", handleStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
}

export function setTheme(theme: Theme) {
  currentTheme = theme;
  applyTheme(theme);
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Storage can be unavailable (private mode); theming still works.
  }
  listeners.forEach((listener) => listener());
}

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      toggleTheme: () => setTheme(theme === "dark" ? "light" : "dark"),
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
