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
            className="relative w-full max-w-3xl rounded-2xl border border-white/10 bg-[#0d0f18] text-zinc-100 shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-4 bg-[#090a10]">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-[#d4f932] px-2 py-0.5 rounded bg-[#d4f932]/10 border border-[#d4f932]/20">
                  PROJECT {project.number}
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  {project.category}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg border border-white/10 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {project.title}
                </h3>
                <p className="text-sm font-mono text-[#d4f932] mt-1">
                  {project.tagline}
                </p>
                {project.achievement && (
                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>{project.achievement}</span>
                  </div>
                )}
              </div>

              {/* Comprehensive Description */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Overview & Engineering Scope
                </h4>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {project.longDescription}
                </p>
              </div>

              {/* Architecture Highlights */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Technical Architecture
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {project.architectureHighlights.map((arch, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-white/[0.07] bg-white/[0.02]"
                    >
                      <div className="text-xs font-semibold text-white mb-1 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#d4f932]" />
                        <span>{arch.title}</span>
                      </div>
                      <p className="text-xs text-zinc-400 leading-normal">
                        {arch.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stack Breakdown */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Technologies & Frameworks
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg bg-white/[0.05] border border-white/[0.08] text-xs font-mono text-zinc-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Metrics / Architecture Stats */}
              {project.metrics && (
                <div className="grid grid-cols-3 gap-3 pt-2 border-t border-white/[0.08]">
                  {project.metrics.map((m, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-black/40">
                      <div className="text-[10px] font-mono text-zinc-400 uppercase">
                        {m.label}
                      </div>
                      <div className="text-xs font-bold text-white mt-0.5">
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer with Actions */}
            <div className="border-t border-white/[0.08] px-6 py-4 bg-[#090a10] flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-zinc-500 font-mono">
                {project.githubUrl
                  ? "Source code available on GitHub"
                  : "Proprietary / Architecture Reference"}
              </div>

              <div className="flex items-center gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-medium text-white transition-colors"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>View GitHub</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#d4f932] hover:bg-[#e2ff4a] text-xs font-semibold text-black transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                    <span>Live Website</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
