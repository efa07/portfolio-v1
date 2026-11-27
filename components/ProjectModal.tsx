"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Project } from "@/data/portfolioData";
import {
  X,
  Globe,
  ArrowUpRight,
  Cpu,
  Layers,
  Database,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { LiquidGlassButton } from "@/components/LiquidGlass";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="relative w-full max-w-3xl rounded-2xl border border-border/80 liquid-glass-drawer text-foreground shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
          >
            <span className="liquid-glass-specular-edge" aria-hidden="true" />
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-border/80 px-6 py-4 bg-card-3/80">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-accent-ink px-2 py-0.5 rounded bg-accent/10 border border-accent/20">
                  PROJECT {project.number}
                </span>
                <span className="text-xs font-mono text-subtle">
                  {project.category}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg border border-border hover:bg-fill-3 text-subtle hover:text-foreground transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                  {project.title}
                </h3>
                <p className="text-sm font-mono text-accent-ink mt-1">
                  {project.tagline}
                </p>
                {project.achievement && (
                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-warning text-xs font-medium">
                    <ShieldCheck className="w-4 h-4 text-warning" />
                    <span>{project.achievement}</span>
                  </div>
                )}
              </div>

              {/* Comprehensive Description */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-subtle">
                  Overview & Engineering Scope
                </h4>
                <p className="text-sm text-muted leading-relaxed">
                  {project.longDescription}
                </p>
              </div>

              {/* Architecture Highlights */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-subtle">
                  Technical Architecture
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {project.architectureHighlights.map((arch, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-border bg-fill-1"
                    >
                      <div className="text-xs font-semibold text-foreground mb-1 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent-ink" />
                        <span>{arch.title}</span>
                      </div>
                      <p className="text-xs text-subtle leading-normal">
                        {arch.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stack Breakdown */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-subtle">
                  Technologies & Frameworks
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg bg-fill-2 border border-border text-xs font-mono text-foreground/90"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Metrics / Architecture Stats */}
              {project.metrics && (
                <div className="grid grid-cols-3 gap-3 pt-2 border-t border-border">
                  {project.metrics.map((m, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-well">
                      <div className="text-[10px] font-mono text-subtle uppercase">
                        {m.label}
                      </div>
                      <div className="text-xs font-bold text-foreground mt-0.5">
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer with Actions */}
            <div className="border-t border-border px-6 py-4 bg-card-3 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-faint font-mono">
                {project.githubUrl
                  ? "Source code available on GitHub"
                  : "Proprietary / Architecture Reference"}
              </div>

              <div className="flex items-center gap-3">
                {project.githubUrl && (
                  <LiquidGlassButton
                    variant="secondary"
                    size="sm"
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>View GitHub</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-subtle" />
                  </LiquidGlassButton>
                )}
                {project.liveUrl && (
                  <LiquidGlassButton
                    variant="primary"
                    size="sm"
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Globe className="w-4 h-4" />
                    <span>Live Website</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </LiquidGlassButton>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
