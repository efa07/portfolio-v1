"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PROJECTS, Project } from "@/data/portfolioData";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { Sparkles, Filter, Code, Terminal, Layers } from "lucide-react";

const CATEGORIES = [
  "All",
  "Civic Tech",
  "Full-Stack",
  "Enterprise",
  "AI & Health",
] as const;

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    activeCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section
      id="projects"
      aria-label="Selected Projects"
      className="py-24 border-t border-border relative"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fill-2 border border-border text-xs font-mono text-accent-ink">
              <Layers className="w-3.5 h-3.5" />
              <span>CASE STUDIES & PRODUCTION REPOSITORIES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
              Featured Projects
            </h2>
            <p className="text-sm sm:text-base text-subtle leading-relaxed">
              Real-world software systems spanning national digital identity,
              healthcare, community mutual aid, and intelligent tutoring. Built with
              modern full-stack architectures.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl liquid-glass-pill border border-border/80 relative overflow-hidden">
            <span className="liquid-glass-specular-edge" aria-hidden="true" />
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative px-4 py-2 rounded-xl text-xs font-mono font-medium transition-colors cursor-pointer ${
                    isActive ? "text-accent-fg font-semibold" : "text-subtle hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="categoryPill"
                      className="absolute inset-0 bg-accent border border-white/40"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenDetails={setSelectedProject}
              index={index}
            />
          ))}
        </div>

        {/* Project Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
}

