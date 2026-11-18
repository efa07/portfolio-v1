"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SKILL_CATEGORIES } from "@/data/portfolioData";
import {
  Code,
  Server,
  Database,
  Cpu,
  Terminal,
  CheckCircle,
  ExternalLink,
  Layers,
  Sparkles,
} from "lucide-react";

export function SkillsSection() {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(0);
  const [activeSkillName, setActiveSkillName] = useState<string>("Spring Boot");

  const categoryIcons = [Server, Code, Database, Cpu];

  return (
    <section
      id="skills"
      aria-label="Technical Skills"
      className="py-24 border-t border-border relative"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-2xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fill-2 border border-border text-xs font-mono text-accent-ink">
            <Terminal className="w-3.5 h-3.5" />
            <span>TECHNICAL CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
            Engineering Toolchain
          </h2>
          <p className="text-sm sm:text-base text-subtle leading-relaxed">
            Technologies selected for operational reliability, transactional
            integrity, and scalable architecture. No superficial percentage ratings—just
            practical production engineering.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const Icon = categoryIcons[idx] || Layers;
            const isSelected = selectedCategoryIndex === idx;

            return (
              <button
                key={cat.title}
                onClick={() => setSelectedCategoryIndex(idx)}
                className={`relative p-4 rounded-xl text-left border transition-all cursor-pointer overflow-hidden ${
                  isSelected
                    ? "border-accent/80 bg-accent/10 shadow-[0_0_24px_rgba(242, 90, 34,0.14),inset_0_1px_0_rgba(255,255,255,0.25)]"
                    : "border-border/80 liquid-glass-pill hover:border-border-strong"
                }`}
              >
                <span className="liquid-glass-specular-edge" aria-hidden="true" />
                <div className="flex items-center justify-between mb-2">
                  <Icon
                    className={`w-4 h-4 ${
                      isSelected ? "text-accent-ink" : "text-subtle"
                    }`}
                  />
                  <span className="text-[10px] font-mono text-faint">
                    0{idx + 1}
                  </span>
                </div>
                <div
                  className={`text-xs font-semibold ${
                    isSelected ? "text-foreground" : "text-muted"
                  }`}
                >
                  {cat.title}
                </div>
                <div className="text-[11px] text-faint mt-1 truncate">
                  {cat.skills.length} core competencies
                </div>

                {isSelected && (
                  <motion.div
                    layoutId="activeSkillCategoryBorder"
                    className="absolute inset-0 rounded-xl border-2 border-accent pointer-events-none"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Category Display Grid */}
        <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/[0.03] rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4 mb-6">
            <div>
              <h3 className="text-lg font-bold text-foreground">
                {SKILL_CATEGORIES[selectedCategoryIndex].title}
              </h3>
              <p className="text-xs text-subtle mt-0.5">
                {SKILL_CATEGORIES[selectedCategoryIndex].description}
              </p>
            </div>
            <div className="text-xs font-mono text-faint">
              CLICK TECHNOLOGY TO INSPECT ARCHITECTURAL ROLE
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {SKILL_CATEGORIES[selectedCategoryIndex].skills.map((skill) => {
              const isActive = activeSkillName === skill.name;
              return (
                <div
                  key={skill.name}
                  onClick={() => setActiveSkillName(skill.name)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer group ${
                    isActive
                      ? "border-accent bg-accent/10"
                      : "border-border bg-fill-1 hover:bg-fill-2 hover:border-border-strong"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-semibold text-foreground group-hover:text-accent-ink transition-colors">
                      {skill.name}
                    </span>
                    {skill.highlight && (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-success border border-emerald-500/30">
                        PROD
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-subtle line-clamp-2 leading-relaxed">
                    {skill.role}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Interactive Inspection Banner */}
          <div className="mt-8 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4 bg-well p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center text-accent-ink">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-mono text-subtle">
                  SELECTED TOOL: <span className="text-foreground font-bold">{activeSkillName}</span>
                </div>
                <div className="text-xs text-muted">
                  Applied across enterprise microservices, transactional databases, and Next.js applications.
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-subtle">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Production verified</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

