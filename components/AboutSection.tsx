"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import {
  Code2,
  Cpu,
  Shield,
  Layers,
  Sparkles,
  GitPullRequest,
  CheckCircle2,
  Terminal,
  HeartHandshake,
  Compass,
} from "lucide-react";

export function AboutSection() {
  const principles = [
    {
      title: "Resilience Over Hype",
      description:
        "Enterprise platforms cannot afford fragile abstractions. I prioritize deterministic state, idempotent endpoints, graceful degradation, and ACID transactions.",
      icon: Cpu,
    },
    {
      title: "Decoupled Architectures",
      description:
        "Building distributed services that communicate via clean event boundaries, asynchronous message brokers (RabbitMQ), and strong schema contracts.",
      icon: Layers,
    },
    {
      title: "User-Centered Utility",
      description:
        "Code is meaningful only when it delivers tangible human utility—whether enabling national digital identity, digitizing healthcare pharmacy access, or preserving community trust.",
      icon: HeartHandshake,
    },
    {
      title: "Mentorship & Engineering Rigor",
      description:
        "Actively guiding junior developers and interns at INSA. Writing maintainable code, enforcing code reviews, and cultivating sustainable engineering cultures.",
      icon: GitPullRequest,
    },
  ];

  return (
    <section
      id="about"
      aria-label="About Me & Engineering Philosophy"
      className="py-24 border-t border-white/[0.06] relative"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Editorial Bio & Identity */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#d4f932]">
              <Compass className="w-3.5 h-3.5" />
              <span>ABOUT & ENGINEERING PHILOSOPHY</span>
            </div>

            {/* Authentic Portrait Card */}
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0c0e15] shadow-2xl group max-w-sm">
              <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                <Image
                  src="/efa.jpeg"
                  alt="Efa Tariku — Software Engineer"
                  fill
                  className="object-cover object-top filter grayscale contrast-110 group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e15] via-transparent to-transparent opacity-90" />
              </div>

              <div className="p-4 border-t border-white/[0.06] bg-[#090b10] flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-white">Efa Tariku</div>
                  <div className="text-[11px] font-mono text-zinc-400">Full-Stack Developer @ INSA</div>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Verified</span>
                </div>
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              Software engineering focused on reliability, architecture, and purpose.
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
              <p>
                I am a software engineer focused on designing and building scalable,
                reliable, and user-centered software applications.
              </p>
              <p>
                I enjoy solving complex engineering problems, designing backend
                architectures, building intuitive frontend experiences, and turning
                ideas into production-ready software.
              </p>
              <p>
                My professional experience includes building large-scale enterprise
                software and national platforms at the{" "}
                <span className="text-white font-medium">
                  Information Network Security Administration (INSA)
                </span>
                . I work with Java, Spring Boot, Next.js, React, PostgreSQL, and
                distributed systems architectures.
              </p>
              <p className="text-zinc-400">
                Grounded in the rigorous foundations of the{" "}
                <span className="text-zinc-200">ALX Software Engineering Program</span> and
                the <span className="text-zinc-200">INSA Cyber Talent Program</span>, my focus
                remains squarely on software engineering, backend systems, and
                AI-powered practical applications.
              </p>
            </div>

            {/* Core Focus Badges */}
            <div className="pt-2">
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-3">
                Primary Engineering Domains
              </div>
              <div className="flex flex-wrap gap-2">
                {PERSONAL_INFO.interests.map((interest) => (
                  <span
                    key={interest}
                    className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.07] text-xs font-mono text-zinc-300"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Engineering Principles Cards */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-1 rounded-2xl bg-gradient-to-b from-white/[0.08] to-transparent">
              <div className="p-6 sm:p-8 rounded-2xl bg-[#0b0c13] border border-white/[0.06] space-y-6">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                  <span className="text-xs font-mono text-[#d4f932] tracking-wider uppercase">
                    ARCHITECTURAL VALUES
                  </span>
                  <span className="text-xs font-mono text-zinc-500">
                    FOUR CORE TENETS
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {principles.map((p, idx) => {
                    const Icon = p.icon;
                    return (
                      <div
                        key={idx}
                        className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#d4f932]/10 border border-[#d4f932]/20 flex items-center justify-center text-[#d4f932] mb-3">
                          <Icon className="w-4 h-4" />
                        </div>
                        <h3 className="text-sm font-semibold text-white mb-1.5">
                          {p.title}
                        </h3>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          {p.description}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Milestone Counter Strip */}
                <div className="pt-4 border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3 rounded-lg bg-black/40">
                    <div className="text-lg font-bold text-white font-mono">5th Place</div>
                    <div className="text-[10px] text-zinc-500 font-mono">
                      Fayda Hackathon
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-black/40">
                    <div className="text-lg font-bold text-[#d4f932] font-mono">
                      National
                    </div>
                    <div className="text-[10px] text-zinc-500 font-mono">
                      Enterprise Scale @ INSA
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-black/40">
                    <div className="text-lg font-bold text-white font-mono">ALX & INSA</div>
                    <div className="text-[10px] text-zinc-500 font-mono">
                      Alumni & Graduate
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-black/40">
                    <div className="text-lg font-bold text-[#d4f932] font-mono">
                      Stanford
                    </div>
                    <div className="text-[10px] text-zinc-500 font-mono">
                      Data Science & Cloud
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

