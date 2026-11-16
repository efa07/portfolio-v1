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
      className="py-24 border-t border-border relative"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Editorial Bio & Identity */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fill-2 border border-border text-xs font-mono text-accent-ink">
              <Compass className="w-3.5 h-3.5" />
              <span>ABOUT & ENGINEERING PHILOSOPHY</span>
            </div>

            {/* Authentic Portrait Card */}
            <div className="relative rounded-2xl overflow-hidden border border-border bg-card shadow-2xl group max-w-sm">
              <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                <Image
                  src="/efa.jpeg"
                  alt="Efa Tariku — Software Engineer"
                  fill
                  className="object-cover object-top filter grayscale contrast-110 group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card-2 via-transparent to-transparent opacity-90" />
              </div>

              <div className="p-4 border-t border-border bg-card-3 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-foreground">Efa Tariku</div>
                  <div className="text-[11px] font-mono text-subtle">Full-Stack Developer @ INSA</div>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-success">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Verified</span>
                </div>
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground leading-tight">
              Software engineering focused on reliability, architecture, and purpose.
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-muted leading-relaxed font-normal">
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
                <span className="text-foreground font-medium">
                  Information Network Security Administration (INSA)
                </span>
                . I work with Java, Spring Boot, Next.js, React, PostgreSQL, and
                distributed systems architectures.
              </p>
              <p className="text-subtle">
                Grounded in the rigorous foundations of the{" "}
                <span className="text-foreground/90">ALX Software Engineering Program</span> and
                the <span className="text-foreground/90">INSA Cyber Talent Program</span>, my focus
                remains squarely on software engineering, backend systems, and
                AI-powered practical applications.
              </p>
            </div>

            {/* Core Focus Badges */}
            <div className="pt-2">
              <div className="text-xs font-mono text-subtle uppercase tracking-wider mb-3">
                Primary Engineering Domains
              </div>
              <div className="flex flex-wrap gap-2">
                {PERSONAL_INFO.interests.map((interest) => (
                  <span
                    key={interest}
                    className="px-3 py-1.5 rounded-lg bg-fill-1 border border-border text-xs font-mono text-muted"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Engineering Principles Cards */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-1 rounded-2xl bg-gradient-to-b from-foreground/[0.08] to-transparent">
              <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border space-y-6">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <span className="text-xs font-mono text-accent-ink tracking-wider uppercase">
                    ARCHITECTURAL VALUES
                  </span>
                  <span className="text-xs font-mono text-faint">
                    FOUR CORE TENETS
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {principles.map((p, idx) => {
                    const Icon = p.icon;
                    return (
                      <div
                        key={idx}
                        className="p-4 rounded-xl border border-border bg-fill-1 hover:bg-fill-2 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent-ink mb-3">
                          <Icon className="w-4 h-4" />
                        </div>
                        <h3 className="text-sm font-semibold text-foreground mb-1.5">
                          {p.title}
                        </h3>
                        <p className="text-xs text-subtle leading-relaxed">
                          {p.description}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Milestone Counter Strip */}
                <div className="pt-4 border-t border-border grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3 rounded-lg bg-well">
                    <div className="text-lg font-bold text-foreground font-mono">5th Place</div>
                    <div className="text-[10px] text-faint font-mono">
                      Fayda Hackathon
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-well">
                    <div className="text-lg font-bold text-accent-ink font-mono">
                      National
                    </div>
                    <div className="text-[10px] text-faint font-mono">
                      Enterprise Scale @ INSA
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-well">
                    <div className="text-lg font-bold text-foreground font-mono">ALX & INSA</div>
                    <div className="text-[10px] text-faint font-mono">
                      Alumni & Graduate
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-well">
                    <div className="text-lg font-bold text-accent-ink font-mono">
                      Stanford
                    </div>
                    <div className="text-[10px] text-faint font-mono">
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

