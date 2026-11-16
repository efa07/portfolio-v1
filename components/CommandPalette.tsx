"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Command,
  ArrowRight,
  Code,
  Briefcase,
  User,
  Mail,
  Copy,
  Check,
  Globe,
  X,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { PERSONAL_INFO, PROJECTS } from "@/data/portfolioData";

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const actions = [
    {
      label: "Jump to Projects",
      category: "Navigation",
      icon: Code,
      action: () => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      },
    },
    {
      label: "Jump to About Me",
      category: "Navigation",
      icon: User,
      action: () => {
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      },
    },
    {
      label: "Jump to Technical Skills",
      category: "Navigation",
      icon: Code,
      action: () => {
        document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      },
    },
    {
      label: "Jump to Experience & Timeline",
      category: "Navigation",
      icon: Briefcase,
      action: () => {
        document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      },
    },
    {
      label: "Jump to Contact",
      category: "Navigation",
      icon: Mail,
      action: () => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      },
    },
    {
      label: `Copy Email: ${PERSONAL_INFO.socials.email}`,
      category: "Contact",
      icon: Copy,
      action: () => {
        navigator.clipboard.writeText(PERSONAL_INFO.socials.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
    },
    {
      label: "Open GitHub Profile (@efa07)",
      category: "Social",
      icon: GithubIcon,
      action: () => {
        window.open(PERSONAL_INFO.socials.github, "_blank");
        setIsOpen(false);
      },
    },
    {
      label: "Open LinkedIn Profile (Efa Tariku)",
      category: "Social",
      icon: LinkedinIcon,
      action: () => {
        window.open(PERSONAL_INFO.socials.linkedin, "_blank");
        setIsOpen(false);
      },
    },
  ];

  const filtered = actions.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      {/* Floating Keyboard Shortcut Trigger */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:block">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-white/10 text-xs font-mono text-zinc-400 hover:text-white transition-all shadow-xl backdrop-blur-md"
          title="Command Palette (Cmd+K)"
        >
          <Command className="w-3.5 h-3.5 text-[#d4f932]" />
          <span>Quick actions</span>
          <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-zinc-300">
            ⌘K
          </kbd>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="relative w-full max-w-xl rounded-2xl border border-white/10 bg-[#0c0d15] shadow-2xl overflow-hidden z-10"
            >
              {/* Search Bar Input */}
              <div className="flex items-center px-4 py-3.5 border-b border-white/[0.08] gap-3">
                <Search className="w-4 h-4 text-zinc-400 shrink-0" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Type a command or jump to a section..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-md text-zinc-500 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Action List */}
              <div className="max-h-72 overflow-y-auto p-2 space-y-1">
                {filtered.length === 0 ? (
                  <div className="p-4 text-center text-xs text-zinc-500 font-mono">
                    No results found for &quot;{query}&quot;
                  </div>
                ) : (
                  filtered.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={idx}
                        onClick={item.action}
                        className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-white/[0.06] text-left text-xs transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4 text-zinc-400 group-hover:text-[#d4f932] transition-colors" />
                          <span className="text-zinc-200 group-hover:text-white font-medium">
                            {item.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-zinc-500 uppercase">
                            {item.category}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-300 transition-colors" />
                        </div>
                      </button>
                    );
                  })
                )}
              </div>

              {/* Palette Footer */}
              <div className="px-4 py-2.5 border-t border-white/[0.06] bg-[#08090f] flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span>Navigation & Shortcuts</span>
                <span>ESC to close</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
