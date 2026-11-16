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
      className="py-24 border-t border-white/[0.06] relative"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-2xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#d4f932]">
            <Terminal className="w-3.5 h-3.5" />
            <span>TECHNICAL CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Engineering Toolchain
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
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
                className={`relative p-4 rounded-xl text-left border transition-all ${
                  isSelected
                    ? "border-[#d4f932] bg-[#d4f932]/10 shadow-[0_0_20px_rgba(212,249,50,0.1)]"
                    : "border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/15"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon
                    className={`w-4 h-4 ${
                      isSelected ? "text-[#d4f932]" : "text-zinc-400"
                    }`}
                  />
                  <span className="text-[10px] font-mono text-zinc-500">
                    0{idx + 1}
                  </span>
                </div>
                <div
                  className={`text-xs font-semibold ${
                    isSelected ? "text-white" : "text-zinc-300"
                  }`}
                >
                  {cat.title}
                </div>
                <div className="text-[11px] text-zinc-500 mt-1 truncate">
                  {cat.skills.length} core competencies
                </div>

                {isSelected && (
                  <motion.div
                    layoutId="activeSkillCategoryBorder"
                    className="absolute inset-0 rounded-xl border-2 border-[#d4f932] pointer-events-none"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Category Display Grid */}
        <div className="p-6 sm:p-8 rounded-2xl border border-white/[0.08] bg-[#0b0d14] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4f932]/[0.03] rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.07] pb-4 mb-6">
            <div>
              <h3 className="text-lg font-bold text-white">
                {SKILL_CATEGORIES[selectedCategoryIndex].title}
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                {SKILL_CATEGORIES[selectedCategoryIndex].description}
              </p>
            </div>
            <div className="text-xs font-mono text-zinc-500">
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
                      ? "border-[#d4f932] bg-[#d4f932]/10"
                      : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/15"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-semibold text-white group-hover:text-[#d4f932] transition-colors">
                      {skill.name}
                    </span>
                    {skill.highlight && (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        PROD
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {skill.role}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Interactive Inspection Banner */}
          <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4 bg-black/40 p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#d4f932]/10 border border-[#d4f932]/30 flex items-center justify-center text-[#d4f932]">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-mono text-zinc-400">
                  SELECTED TOOL: <span className="text-white font-bold">{activeSkillName}</span>
                </div>
                <div className="text-xs text-zinc-300">
                  Applied across enterprise microservices, transactional databases, and Next.js applications.
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Production verified</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

