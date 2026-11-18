"use client";

import React from "react";
import { motion } from "motion/react";
import { Project } from "@/data/portfolioData";
import {
  Globe,
  ArrowUpRight,
  ExternalLink,
  Layers,
  Award,
  Terminal,
  ShieldCheck,
  Code2,
  FileCode,
} from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { LiquidGlassButton } from "@/components/LiquidGlass";

interface ProjectCardProps {
  project: Project;
  onOpenDetails: (project: Project) => void;
  index: number;
}

export function ProjectCard({ project, onOpenDetails, index }: ProjectCardProps) {
  const isOneCitizen = project.id === "onecitizen";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className={`group relative rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOneCitizen
          ? "border-accent/40 bg-gradient-to-b from-card-2 to-card shadow-2xl lg:col-span-2"
          : "border-border hover:border-border-strong bg-card/80 hover:bg-card-2"
      }`}
    >
      {/* Visual Accent Glow */}
      <div
        className={`absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 ${
          isOneCitizen
            ? "bg-accent/10 opacity-70 group-hover:opacity-100"
            : "bg-fill-1 group-hover:bg-accent/[0.06] opacity-0 group-hover:opacity-100"
        }`}
      />

      <div className="p-6 sm:p-8 flex flex-col justify-between h-full space-y-6 relative z-10">
        {/* Top Header: Number, Category, Achievement */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-accent-ink px-2 py-0.5 rounded bg-accent/10 border border-accent/20">
                {project.number}
              </span>
              <span className="text-xs font-mono text-faint uppercase tracking-wider">
                {project.category}
              </span>
            </div>

            {project.achievement && (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-warning text-xs font-medium">
                <Award className="w-3.5 h-3.5 text-warning" />
                <span>{project.achievement}</span>
              </div>
            )}
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight group-hover:text-foreground transition-colors">
            {project.title}
          </h3>

          <p className="text-xs sm:text-sm font-mono text-accent-ink mt-1.5 font-medium">
            {project.tagline}
          </p>

          <p className="text-sm text-subtle mt-4 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Visual Architectural Preview Blueprint */}
        <div className="p-4 rounded-xl border border-border bg-well space-y-3 font-mono">
          <div className="flex items-center justify-between text-[11px] text-faint border-b border-border pb-2">
            <span className="flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-accent-ink" />
              <span>CORE ARCHITECTURAL HIGHLIGHTS</span>
            </span>
            <span className="text-ghost">SPEC_REV_1.0</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {project.architectureHighlights.slice(0, 2).map((item, i) => (
              <div
                key={i}
                className="p-2.5 rounded-lg bg-fill-1 border border-border"
              >
                <div className="text-foreground/90 font-semibold mb-0.5 text-[11px]">
                  {item.title}
                </div>
                <div className="text-faint text-[10px] line-clamp-2">
                  {item.description}
                </div>
              </div>
            ))}
          </div>

          {/* Metrics row */}
          {project.metrics && (
            <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px]">
              {project.metrics.map((m, i) => (
                <div key={i} className="flex items-center gap-1.5 text-subtle">
                  <span className="text-faint">{m.label}:</span>
                  <span className="text-foreground font-medium">{m.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tech Stack Pills */}
        <div>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md bg-fill-2 border border-border text-xs font-mono text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 border-t border-border flex flex-wrap items-center justify-between gap-3">
          <LiquidGlassButton
            variant="secondary"
            size="sm"
            onClick={() => onOpenDetails(project)}
            className="rounded-xl"
          >
            <Layers className="w-3.5 h-3.5 text-accent-ink" />
            <span>Architecture Deep-Dive</span>
          </LiquidGlassButton>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <LiquidGlassButton
                variant="secondary"
                size="sm"
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs rounded-xl"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>Source</span>
                <ArrowUpRight className="w-3 h-3 text-faint" />
              </LiquidGlassButton>
            )}

            {project.liveUrl && (
              <LiquidGlassButton
                variant="primary"
                size="sm"
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl shadow-[0_0_16px_rgba(242, 90, 34,0.25)]"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Live Site</span>
                <ArrowUpRight className="w-3 h-3" />
              </LiquidGlassButton>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
