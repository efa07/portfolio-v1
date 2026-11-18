"use client";

import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      aria-pressed={!isDark}
      className={`group relative inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full liquid-glass-pill text-subtle hover:text-foreground transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${className}`}
    >
      <span className="liquid-glass-specular-edge" aria-hidden="true" />
      {/* Both icons render always; `.theme-icon-*` in globals.css swaps them
          based on the document theme so there is no flash or mismatch. */}
      <span className="relative flex h-3.5 w-3.5 items-center justify-center">
        <Moon aria-hidden="true" className="theme-icon-moon" />
        <Sun aria-hidden="true" className="theme-icon-sun" />
      </span>
    </button>
  );
}
