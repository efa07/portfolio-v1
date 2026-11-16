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
      className="py-24 border-t border-border relative"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fill-2 border border-border text-xs font-mono text-accent-ink">
              <Briefcase className="w-3.5 h-3.5" />
              <span>CAREER TIMELINE & CREDENTIALS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
              Experience & Education
            </h2>
            <p className="text-sm sm:text-base text-subtle leading-relaxed">
              Engineering enterprise software at national scale, grounded by intensive
              software engineering programs and continuous computational study.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-fill-1 border border-border">
            {(["All", "Work", "Education", "Certification"] as const).map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                    isActive ? "text-accent-fg font-semibold" : "text-subtle hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="expPill"
                      className="absolute inset-0 bg-accent rounded-lg shadow-sm"
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
                    ? "border-accent/40 bg-gradient-to-r from-card-2 to-card shadow-xl"
                    : "border-border bg-card-3/60 hover:bg-card hover:border-border-strong"
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  {/* Left Metadata Block */}
                  <div className="lg:w-1/3 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-fill-2 border border-border text-muted">
                        {item.period}
                      </span>
                      {item.badge && (
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-accent/10 border border-accent/30 text-accent-ink">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight group-hover:text-foreground transition-colors">
                      {item.role}
                    </h3>

                    <div className="flex items-center gap-2 text-sm text-subtle font-medium">
                      <Building className="w-4 h-4 text-faint" />
                      <span>{item.organization}</span>
                    </div>

                    <div className="text-xs font-mono text-faint pt-1">
                      TYPE: {item.type.toUpperCase()}
                    </div>
                  </div>

                  {/* Right Content Block */}
                  <div className="lg:w-2/3 space-y-4">
                    <p className="text-sm text-muted leading-relaxed font-normal">
                      {item.description}
                    </p>

                    {item.details && item.details.length > 0 && (
                      <ul className="space-y-2 pt-1">
                        {item.details.map((detail, dIdx) => (
                          <li
                            key={dIdx}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-subtle leading-relaxed"
                          >
                            <CheckCircle2 className="w-4 h-4 text-accent-ink shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Technologies Pills */}
                    {item.technologies && (
                      <div className="pt-3 border-t border-border flex flex-wrap gap-1.5">
                        {item.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-fill-1 border border-border text-subtle"
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

