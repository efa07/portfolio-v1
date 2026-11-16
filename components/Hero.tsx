"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { SystemInspector } from "./SystemInspector";
import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Globe2,
  Clock,
  Sparkles,
  Mail,
  Shield,
  Layers,
} from "lucide-react";
import { GithubIcon } from "@/components/Icons";

export function Hero() {
  const [timeString, setTimeString] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Africa/Addis_Ababa",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTimeString(new Intl.DateTimeFormat("en-US", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      aria-label="Hero Introduction"
      className="relative min-h-[92vh] pt-36 sm:pt-44 pb-20 flex flex-col justify-between overflow-hidden"
    >
      {/* Ambient background glow & grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#d4f932]/[0.07] via-emerald-500/[0.02] to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full relative z-10">
        {/* Top Meta Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-between gap-3 pb-8 border-b border-white/[0.06] mb-10"
        >
          {/* Location & Time Indicator */}
          <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
            <span className="flex items-center gap-1.5 text-zinc-300">
              <Globe2 className="w-3.5 h-3.5 text-[#d4f932]" />
              <span>Addis Ababa, Ethiopia</span>
            </span>
            <span className="text-zinc-600">|</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-zinc-500" />
              <span>{timeString ? `${timeString} EAT (UTC+3)` : "UTC+3"}</span>
            </span>
          </div>

          {/* Current Engineering Role */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-[#d4f932] animate-pulse-subtle" />
            <span className="text-zinc-300">Full-Stack Developer</span>
            <span className="text-zinc-600">@</span>
            <span className="text-white font-medium">INSA</span>
          </div>
        </motion.div>

        {/* Hero Editorial Typography */}
        <div className="max-w-4xl space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-300"
          >
            <span className="text-[#d4f932] font-bold">01/01</span>
            <span>Software Engineer & Full-Stack Developer</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.21, 1.02, 0.49, 0.99] }}
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.08] text-balance"
          >
            Building software that{" "}
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
              solves real problems.
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.8, ease: "easeInOut" }}
                className="absolute left-0 -bottom-1 h-[2px] bg-gradient-to-r from-[#d4f932] to-transparent"
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
            className="text-lg sm:text-xl text-zinc-400 font-normal leading-relaxed max-w-2xl text-balance"
          >
            I&apos;m <span className="text-white font-medium">Efa Tariku</span>, a
            software engineer focused on building scalable applications, intelligent
            systems, and exceptional digital experiences.
          </motion.p>

          {/* Call to Actions & Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-black bg-[#d4f932] hover:bg-[#e2ff4a] rounded-xl transition-all shadow-[0_0_25px_rgba(212,249,50,0.25)] hover:shadow-[0_0_35px_rgba(212,249,50,0.4)] active:scale-[0.98]"
            >
              <span>View Projects</span>
              <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-zinc-200 bg-white/[0.04] hover:bg-white/[0.08] hover:text-white border border-white/[0.09] hover:border-white/20 rounded-xl transition-all active:scale-[0.98]"
            >
              <Mail className="w-4 h-4 text-zinc-400" />
              <span>Contact Me</span>
            </a>

            <a
              href={PERSONAL_INFO.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3.5 text-sm font-medium text-zinc-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/20 rounded-xl transition-all"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
            </a>
          </motion.div>
        </div>

        {/* Interactive Motion & System Inspector */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="mt-14"
        >
          <div className="flex items-center justify-between mb-3 px-1 text-xs font-mono text-zinc-500">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4f932]" />
              INTERACTIVE ARCHITECTURE & MOTION INSPECTOR
            </span>
            <span className="hidden sm:inline">CLICK TABS TO EXPLORE ARCHITECTURE</span>
          </div>
          <SystemInspector />
        </motion.div>
      </div>

      {/* Subtle Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 w-full pt-12 flex items-center justify-between text-xs font-mono text-zinc-500"
      >
        <span className="hidden sm:inline">SCROLL FOR CASE STUDIES</span>
        <a
          href="#projects"
          className="flex items-center gap-2 hover:text-[#d4f932] transition-colors mx-auto sm:mx-0"
        >
          <span>EXPLORE CODE & ARCHITECTURE</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </a>
        <span className="hidden sm:inline">ETHIOPIA / REMOTE READY</span>
      </motion.div>
    </section>
  );
}
