"use client";

import React, { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Mail } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { LiquidGlassButton } from "@/components/LiquidGlass";
import { DitheringShader } from "@/components/ui/dithering-shader";
import { ShaderAnimation } from "@/components/ui/shader-animation";
import { useTheme } from "@/components/ThemeProvider";

const EASE = [0.22, 1, 0.36, 1] as const;
const HEADLINE = "Building software that solves real problems.".split(" ");
const HIGHLIGHT_FROM = 4;

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const rise = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

const headline = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const word = {
  hidden: { opacity: 0, y: "0.35em" },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

const socialLinks = [
  { label: "GitHub", href: PERSONAL_INFO.socials.github, icon: GithubIcon, external: true },
  { label: "LinkedIn", href: PERSONAL_INFO.socials.linkedin, icon: LinkedinIcon, external: true },
  { label: "Email", href: `mailto:${PERSONAL_INFO.socials.email}`, icon: Mail, external: false },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { theme } = useTheme();
  const reduceMotionFlag = reduceMotion === true;
  const showShader = theme === "dark" && !reduceMotion;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const orbY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 140]);

  const initial = reduceMotion ? false : "hidden";

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Hero Introduction"
      className="bg-dot-pattern relative isolate flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16 sm:pt-32 lg:pb-24"
    >
      {showShader && (
        <>
          <ShaderAnimation className="pointer-events-none absolute inset-0 -z-10 h-full opacity-60" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-background/60 via-background/30 to-background"
          />
        </>
      )}
      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10">
        <motion.div
          variants={stagger}
          initial={initial}
          animate="show"
          className="relative z-10 lg:col-span-6"
        >
          <motion.p
            variants={rise}
            className="flex items-center gap-3 text-sm text-subtle"
          >
            <span aria-hidden="true" className="h-px w-8 bg-accent" />
            <span>Efa Tariku, Software Engineer in Addis Ababa</span>
          </motion.p>

          <motion.h1
            variants={headline}
            initial={initial}
            animate="show"
            className="mt-7 text-[clamp(2.75rem,5.6vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.035em] text-foreground text-balance"
          >
            {HEADLINE.map((text, index) => (
              <React.Fragment key={`${text}-${index}`}>
                <motion.span
                  variants={word}
                  className={`inline-block ${index >= HIGHLIGHT_FROM ? "text-accent-ink" : ""}`}
                >
                  {text}
                </motion.span>
                {index < HEADLINE.length - 1 ? " " : null}
              </React.Fragment>
            ))}
          </motion.h1>

          <motion.p
            variants={rise}
            className="mt-7 max-w-[34rem] text-base leading-relaxed text-subtle sm:text-lg"
          >
            I&apos;m <span className="font-medium text-foreground">Efa Tariku</span>, a software
            engineer focused on building scalable applications, intelligent systems, and
            exceptional digital experiences.
          </motion.p>

          <motion.div variants={rise} className="mt-10 flex flex-wrap items-center gap-3">
            <LiquidGlassButton variant="primary" size="lg" href="#projects">
              <span>Explore My Work</span>
              <ArrowUpRight className="h-4 w-4" />
            </LiquidGlassButton>
            <LiquidGlassButton variant="secondary" size="lg" href="#contact">
              <span>Get in Touch</span>
            </LiquidGlassButton>
          </motion.div>

          <motion.ul variants={rise} className="mt-10 flex items-center gap-6" aria-label="Social links">
            {socialLinks.map(({ label, href, icon: Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="inline-flex text-subtle transition-colors hover:text-accent-ink focus:outline-none focus-visible:text-accent-ink"
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  <span className="sr-only">{label}</span>
                </a>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 2, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.25, ease: EASE }}
          className={`relative order-first mx-auto aspect-square w-full max-w-[300px] overflow-hidden sm:max-w-[420px] lg:order-none lg:col-span-6 lg:mx-0 lg:max-w-[600px] lg:justify-self-end ${theme === "light" ? "bg-[#111111]" : ""}`}
        >
          <motion.div style={{ y: orbY }} className="absolute inset-0 ">
            <DitheringShader
              shape="sphere"
              type="random"
              colorBack="rgba(247, 245, 245, 0)"
              colorFront="#ff5f00"
              size={1}
              speed={reduceMotionFlag ? 0 : 2}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
