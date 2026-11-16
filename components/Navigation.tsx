"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { Menu, X, ArrowUpRight, Terminal, Mail } from "lucide-react";
import { GithubIcon } from "@/components/Icons";

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
                ? "bg-[#090a0f]/90 backdrop-blur-xl border-white/[0.09] shadow-2xl shadow-black/60"
                : "bg-[#090a0f]/60 backdrop-blur-md border-white/[0.05]"
            }`}
          >
            {/* Wordmark Logo */}
            <a
              href="#"
              className="group flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4f932] rounded-md"
            >
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center group-hover:border-[#d4f932]/60 transition-colors">
                <span className="text-xs font-mono font-bold text-[#d4f932]">ET</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold tracking-tight text-white group-hover:text-zinc-200 transition-colors">
                  EFA TARIKU
                </span>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest hidden sm:block">
                  Software Engineer
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1 rounded-full border border-white/[0.04]">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.replace("#", "");
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`relative px-4 py-1.5 text-xs font-medium transition-colors rounded-full ${
                      isActive
                        ? "text-white"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activePill"
                        className="absolute inset-0 bg-white/10 rounded-full border border-white/15"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </a>
                );
              })}
            </div>

            {/* Availability Pill & Quick Contact */}
            <div className="hidden lg:flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/[0.08] border border-emerald-500/20 text-[11px] font-mono text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Open to opportunities</span>
              </div>

              <a
                href="#contact"
                className="relative inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-black bg-[#d4f932] hover:bg-[#e2ff4a] transition-all rounded-full shadow-[0_0_15px_rgba(212,249,50,0.25)] hover:shadow-[0_0_22px_rgba(212,249,50,0.4)] active:scale-95"
              >
                <span>Get in touch</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-zinc-400 hover:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4f932]"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
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
            className="fixed inset-x-4 top-20 z-40 md:hidden bg-[#0d0e15] border border-white/10 rounded-2xl p-5 shadow-2xl backdrop-blur-2xl"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 pb-3 mb-2 border-b border-white/10 text-xs font-mono text-emerald-400">
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
                  className="px-3 py-2.5 text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                >
                  {item.label}
                </a>
              ))}

              <div className="pt-3 mt-2 border-t border-white/10 flex flex-col gap-2">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-semibold text-black bg-[#d4f932] rounded-xl hover:bg-[#e2ff4a]"
                >
                  <Mail className="w-4 h-4" />
                  <span>Contact Me</span>
                </a>
                <a
                  href={PERSONAL_INFO.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-medium text-zinc-300 bg-white/5 hover:bg-white/10 rounded-xl"
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
