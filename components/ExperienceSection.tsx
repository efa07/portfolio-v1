"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { EXPERIENCES, ExperienceItem } from "@/data/portfolioData";
import {
  Briefcase,
  GraduationCap,
  Award,
  Calendar,
  Building,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Shield,
  Layers,
} from "lucide-react";

export function ExperienceSection() {
  const [activeTab, setActiveTab] = useState<"All" | "Work" | "Education" | "Certification">("All");

  const filtered =
    activeTab === "All"
      ? EXPERIENCES
      : EXPERIENCES.filter((e) => e.type === activeTab);

  return (
    <section
      id="experience"
      aria-label="Experience & Education"
      className="py-24 border-t border-white/[0.06] relative"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#d4f932]">
              <Briefcase className="w-3.5 h-3.5" />
              <span>CAREER TIMELINE & CREDENTIALS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Experience & Education
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              Engineering enterprise software at national scale, grounded by intensive
              software engineering programs and continuous computational study.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            {(["All", "Work", "Education", "Certification"] as const).map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                    isActive ? "text-black font-semibold" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="expPill"
                      className="absolute inset-0 bg-[#d4f932] rounded-lg shadow-sm"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Editorial Timeline */}
        <div className="space-y-6">
          {filtered.map((item, idx) => {
            const isWork = item.type === "Work";
            const isCert = item.type === "Certification";

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={`group relative rounded-2xl border transition-all duration-300 p-6 sm:p-8 ${
                  item.id === "insa-fullstack"
                    ? "border-[#d4f932]/40 bg-gradient-to-r from-[#0c0e15] to-[#08090f] shadow-xl"
                    : "border-white/[0.07] bg-[#090b10]/60 hover:bg-[#0c0d15] hover:border-white/15"
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  {/* Left Metadata Block */}
                  <div className="lg:w-1/3 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/[0.05] border border-white/[0.08] text-zinc-300">
                        {item.period}
                      </span>
                      {item.badge && (
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#d4f932]/10 border border-[#d4f932]/30 text-[#d4f932]">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-zinc-100 transition-colors">
                      {item.role}
                    </h3>

                    <div className="flex items-center gap-2 text-sm text-zinc-400 font-medium">
                      <Building className="w-4 h-4 text-zinc-500" />
                      <span>{item.organization}</span>
                    </div>

                    <div className="text-xs font-mono text-zinc-500 pt-1">
                      TYPE: {item.type.toUpperCase()}
                    </div>
                  </div>

                  {/* Right Content Block */}
                  <div className="lg:w-2/3 space-y-4">
                    <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                      {item.description}
                    </p>

                    {item.details && item.details.length > 0 && (
                      <ul className="space-y-2 pt-1">
                        {item.details.map((detail, dIdx) => (
                          <li
                            key={dIdx}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-400 leading-relaxed"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#d4f932] shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Technologies Pills */}
                    {item.technologies && (
                      <div className="pt-3 border-t border-white/[0.06] flex flex-wrap gap-1.5">
                        {item.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.06] text-zinc-400"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

