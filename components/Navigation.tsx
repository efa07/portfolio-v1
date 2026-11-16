"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { Menu, X, ArrowUpRight, Terminal, Mail } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { ThemeToggle } from "@/components/ThemeToggle";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      // Simple intersection check for current section
      const sections = ["about", "projects", "skills", "experience", "contact"];
      const scrollPosition = window.scrollY + 160;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <nav
            aria-label="Main Navigation"
            className={`flex items-center justify-between rounded-full px-4 sm:px-6 py-2.5 transition-all duration-300 border ${
              scrolled
                ? "bg-card/90 backdrop-blur-xl border-border shadow-2xl"
                : "bg-card/60 backdrop-blur-md border-border"
            }`}
          >
            {/* Wordmark Logo */}
            <a
              href="#"
              className="group flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md"
            >
              <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-border group-hover:border-accent/60 transition-colors shrink-0 bg-fill-2">
                <Image
                  src="/efa.jpeg"
                  alt="Efa Tariku"
                  fill
                  className="object-cover object-top"
                  sizes="32px"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold tracking-tight text-foreground group-hover:text-foreground/90 transition-colors">
                  EFA TARIKU
                </span>
                <span className="text-[10px] font-mono text-faint uppercase tracking-widest hidden sm:block">
                  Software Engineer
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1 bg-fill-1 p-1 rounded-full border border-border">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.replace("#", "");
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`relative px-4 py-1.5 text-xs font-medium transition-colors rounded-full ${
                      isActive
                        ? "text-foreground"
                        : "text-subtle hover:text-foreground"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activePill"
                        className="absolute inset-0 bg-fill-3 rounded-full border border-border-strong"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </a>
                );
              })}
            </div>

            {/* Right Cluster: availability, theme toggle, quick contact, mobile menu */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden lg:flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/[0.08] border border-emerald-500/20 text-[11px] font-mono text-success">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>Open to opportunities</span>
                </div>

                <a
                  href="#contact"
                  className="relative inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-accent-fg bg-accent hover:bg-accent-hover transition-all rounded-full shadow-[0_0_15px_rgba(212,249,50,0.25)] hover:shadow-[0_0_22px_rgba(212,249,50,0.4)] active:scale-95"
                >
                  <span>Get in touch</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <ThemeToggle />

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-subtle hover:text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-40 md:hidden bg-card border border-border rounded-2xl p-5 shadow-2xl backdrop-blur-2xl"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 pb-3 mb-2 border-b border-border text-xs font-mono text-success">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Open to opportunities (Full-Stack & Backend)</span>
              </div>

              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 text-sm font-medium text-muted hover:text-foreground hover:bg-fill-2 rounded-xl transition-colors"
                >
                  {item.label}
                </a>
              ))}

              <div className="pt-3 mt-2 border-t border-border flex flex-col gap-2">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-semibold text-accent-fg bg-accent rounded-xl hover:bg-accent-hover"
                >
                  <Mail className="w-4 h-4" />
                  <span>Contact Me</span>
                </a>
                <a
                  href={PERSONAL_INFO.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-medium text-muted bg-fill-2 hover:bg-fill-3 rounded-xl"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub Profile</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
