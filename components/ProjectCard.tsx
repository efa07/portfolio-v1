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
          ? "border-[#d4f932]/40 bg-gradient-to-b from-[#0e1017] to-[#08090e] shadow-2xl shadow-black/80 lg:col-span-2"
          : "border-white/[0.08] hover:border-white/20 bg-[#0c0d14]/80 hover:bg-[#0f111a]"
      }`}
    >
      {/* Visual Accent Glow */}
      <div
        className={`absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 ${
          isOneCitizen
            ? "bg-[#d4f932]/10 opacity-70 group-hover:opacity-100"
            : "bg-white/[0.02] group-hover:bg-[#d4f932]/[0.06] opacity-0 group-hover:opacity-100"
        }`}
      />

      <div className="p-6 sm:p-8 flex flex-col justify-between h-full space-y-6 relative z-10">
        {/* Top Header: Number, Category, Achievement */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-[#d4f932] px-2 py-0.5 rounded bg-[#d4f932]/10 border border-[#d4f932]/20">
                {project.number}
              </span>
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                {project.category}
              </span>
            </div>

            {project.achievement && (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>{project.achievement}</span>
              </div>
            )}
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover:text-zinc-100 transition-colors">
            {project.title}
          </h3>

          <p className="text-xs sm:text-sm font-mono text-[#d4f932] mt-1.5 font-medium">
            {project.tagline}
          </p>

          <p className="text-sm text-zinc-400 mt-4 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Visual Architectural Preview Blueprint */}
        <div className="p-4 rounded-xl border border-white/[0.06] bg-black/40 space-y-3 font-mono">
          <div className="flex items-center justify-between text-[11px] text-zinc-500 border-b border-white/[0.05] pb-2">
            <span className="flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-[#d4f932]" />
              <span>CORE ARCHITECTURAL HIGHLIGHTS</span>
            </span>
            <span className="text-zinc-600">SPEC_REV_1.0</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {project.architectureHighlights.slice(0, 2).map((item, i) => (
              <div
                key={i}
                className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]"
              >
                <div className="text-zinc-200 font-semibold mb-0.5 text-[11px]">
                  {item.title}
                </div>
                <div className="text-zinc-500 text-[10px] line-clamp-2">
                  {item.description}
                </div>
              </div>
            ))}
          </div>

          {/* Metrics row */}
          {project.metrics && (
            <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px]">
              {project.metrics.map((m, i) => (
                <div key={i} className="flex items-center gap-1.5 text-zinc-400">
                  <span className="text-zinc-500">{m.label}:</span>
                  <span className="text-white font-medium">{m.value}</span>
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
                className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-xs font-mono text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 border-t border-white/[0.07] flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => onOpenDetails(project)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-medium text-white transition-colors"
          >
            <Layers className="w-3.5 h-3.5 text-[#d4f932]" />
            <span>Architecture Deep-Dive</span>
          </button>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-xs font-mono text-zinc-300 hover:text-white transition-colors border border-white/[0.05]"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>Source</span>
                <ArrowUpRight className="w-3 h-3 text-zinc-500" />
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#d4f932] hover:bg-[#e2ff4a] text-xs font-semibold text-black transition-all shadow-[0_0_12px_rgba(212,249,50,0.2)]"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Live Site</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
