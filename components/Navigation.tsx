"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LiquidGlassButton } from "@/components/LiquidGlass";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const SECTION_IDS = ["about", "projects", "skills", "experience", "contact"];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      const scrollPosition = window.scrollY + 160;
      let current = "";

      for (const section of SECTION_IDS) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            current = section;
            break;
          }
        }
      }

      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[padding] duration-500 ${
          scrolled ? "pt-3" : "pt-5"
        }`}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <nav
            aria-label="Main Navigation"
            className="liquid-glass-nav relative flex items-center justify-between gap-4 rounded-2xl px-3 py-2 sm:px-4 transition-all duration-500 overflow-hidden"
          >
            <span className="liquid-glass-specular-edge" aria-hidden="true" />

            <a
              href="#"
              aria-label="Efa Tariku, back to top"
              className="group relative z-10 flex items-center gap-2.5 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span className="relative h-7 w-7 shrink-0 overflow-hidden rounded-lg border border-border transition-colors group-hover:border-accent/60">
                <Image
                  src="/efa.jpeg"
                  alt=""
                  fill
                  className="object-cover object-top"
                  sizes="28px"
                  priority
                />
              </span>
              <span className="text-sm font-semibold tracking-tight text-foreground">
                Efa Tariku
              </span>
            </a>

            <div className="relative z-10 hidden items-center md:flex">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.replace("#", "");
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    aria-current={isActive ? "location" : undefined}
                    className={`relative px-3.5 py-1.5 text-sm transition-colors duration-200 ${
                      isActive ? "text-accent" : "text-subtle hover:text-foreground"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="navIndicator"
                        className="absolute inset-x-3.5 -bottom-px h-px bg-accent"
                        transition={{ type: "spring", stiffness: 420, damping: 36 }}
                      />
                    )}
                  </a>
                );
              })}
            </div>

            <div className="relative z-10 flex items-center gap-2">
              <ThemeToggle />

              <LiquidGlassButton
                variant="primary"
                size="sm"
                href="#contact"
                className="hidden rounded-lg md:inline-flex"
              >
                <span>Get in touch</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </LiquidGlassButton>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-subtle transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent md:hidden"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-[55] bg-background/70 backdrop-blur-sm md:hidden"
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="liquid-glass-drawer fixed inset-x-4 top-20 z-[60] overflow-hidden rounded-2xl p-3 shadow-2xl md:hidden"
            >
              <span className="liquid-glass-specular-edge" aria-hidden="true" />
              <nav aria-label="Mobile Navigation" className="relative z-10 flex flex-col">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-xl px-3 py-3 text-base font-medium text-muted transition-colors hover:bg-fill-2 hover:text-accent"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="relative z-10 mt-2 grid grid-cols-2 gap-2 border-t border-border pt-3">
                <LiquidGlassButton
                  variant="primary"
                  size="md"
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="justify-center"
                >
                  <span>Get in touch</span>
                </LiquidGlassButton>
                <LiquidGlassButton
                  variant="secondary"
                  size="md"
                  href={PERSONAL_INFO.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="justify-center"
                >
                  <GithubIcon className="h-4 w-4" />
                  <span>GitHub</span>
                </LiquidGlassButton>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
