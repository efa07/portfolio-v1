"use client";

import React from "react";
import { motion, HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Displacement map SVG as recommended by Apple Liquid Glass guidance.
 * Encodes horizontal (R) and vertical (G) gradients for optical refraction.
 */
const LIQUID_DISPLACEMENT_MAP = `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 160">
  <defs>
    <linearGradient id="x" x1="0" x2="1">
      <stop offset="0" stop-color="#106d80"/>
      <stop offset=".5" stop-color="#808080"/>
      <stop offset="1" stop-color="#f5a080"/>
    </linearGradient>
    <linearGradient id="y" y1="0" y2="1">
      <stop offset="0" stop-color="#802080"/>
      <stop offset=".5" stop-color="#808080"/>
      <stop offset="1" stop-color="#80f080"/>
    </linearGradient>
  </defs>
  <rect width="240" height="160" fill="#808080"/>
  <rect width="240" height="160" fill="url(#x)" opacity=".55"/>
  <rect width="240" height="160" fill="url(#y)" opacity=".48"/>
</svg>
`)}`;

/**
 * Reusable hidden SVG filter for optical Liquid Glass refraction.
 * Safe fallback: browsers that do not support backdrop-filter with url(#...)
 * gracefully fall back to the standard backdrop-filter blur/saturate rules.
 */
export function LiquidGlassFilter() {
  return (
    <svg
      className="sr-only pointer-events-none fixed -top-9999px -left-9999px w-0 h-0"
      aria-hidden="true"
    >
      <defs>
        <filter
          id="liquid-glass-refraction"
          colorInterpolationFilters="sRGB"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
        >
          <feImage
            href={LIQUID_DISPLACEMENT_MAP}
            width="100%"
            height="100%"
            preserveAspectRatio="none"
            result="liquidMap"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="liquidMap"
            scale="16"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}

interface LiquidGlassButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "subtle";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Motion-powered Liquid Glass button with specular highlight,
 * refractive border, natural depth shadow, and spring micro-interactions.
 */
export function LiquidGlassButton({
  variant = "primary",
  size = "md",
  href,
  target,
  rel,
  children,
  className,
  ...props
}: LiquidGlassButtonProps) {
  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs rounded-full gap-1.5",
    md: "px-4 py-2.5 text-xs sm:text-sm rounded-xl gap-2",
    lg: "px-6 py-3.5 text-sm sm:text-base rounded-xl gap-2.5",
  }[size];

  const variantClasses = {
    primary:
      "liquid-glass-btn-primary text-accent-fg font-semibold shadow-[0_0_24px_rgba(242, 90, 34,0.28)] hover:shadow-[0_0_36px_rgba(242, 90, 34,0.45)]",
    secondary:
      "liquid-glass-btn-secondary text-foreground hover:text-foreground font-medium",
    subtle:
      "liquid-glass-btn-subtle text-subtle hover:text-foreground font-medium",
  }[variant];

  const baseClasses = cn(
    "relative inline-flex items-center justify-center select-none overflow-hidden transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent",
    sizeClasses,
    variantClasses,
    className
  );

  const motionProps = {
    whileHover: { scale: 1.025, y: -1 },
    whileTap: { scale: 0.97, y: 1 },
    transition: { type: "spring" as const, stiffness: 450, damping: 25 },
  };

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        className={baseClasses}
        {...motionProps}
      >
        <span className="relative z-10 inline-flex items-center gap-2">
          {children}
        </span>
        <span className="liquid-glass-specular-edge" aria-hidden="true" />
      </motion.a>
    );
  }

  return (
    <motion.button className={baseClasses} {...motionProps} {...props}>
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
      <span className="liquid-glass-specular-edge" aria-hidden="true" />
    </motion.button>
  );
}

/**
 * Reusable Liquid Glass Pill container for badges, active tabs, and floating chips.
 */
export function LiquidGlassPill({
  children,
  className,
  active = false,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { active?: boolean }) {
  return (
    <div
      className={cn(
        "relative inline-flex items-center rounded-full transition-all duration-200",
        active ? "liquid-glass-pill-active" : "liquid-glass-pill",
        className
      )}
      {...props}
    >
      <span className="relative z-10 inline-flex items-center gap-1.5">
        {children}
      </span>
      <span className="liquid-glass-specular-edge" aria-hidden="true" />
    </div>
  );
}
