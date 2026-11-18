"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";
import { OrbFallback } from "@/components/OrbFallback";

const ParticleOrbScene = dynamic(
  () => import("@/components/ParticleOrbScene").then((mod) => mod.ParticleOrbScene),
  { ssr: false, loading: () => null }
);

const COMPACT_QUERY = "(max-width: 767px)";

export interface ParticleOrbProps {
  className?: string;
  interactive?: boolean;
}

let webglSupport: boolean | null = null;

function supportsWebGL() {
  if (webglSupport === null) {
    try {
      const canvas = document.createElement("canvas");
      webglSupport = Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
    } catch {
      webglSupport = false;
    }
  }
  return webglSupport;
}

const subscribeNone = () => () => {};

function subscribeCompact(onChange: () => void) {
  const query = window.matchMedia(COMPACT_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

const isCompact = () => window.matchMedia(COMPACT_QUERY).matches;

/**
 * Generative particle sphere. Renders a static SVG first (SSR, loading, and
 * unsupported devices), then fades in a WebGL point cloud once it is ready.
 */
export function ParticleOrb({ className = "", interactive = true }: ParticleOrbProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const webgl = useSyncExternalStore(subscribeNone, supportsWebGL, () => null);
  const compact = useSyncExternalStore(subscribeCompact, isCompact, () => false);
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "120px" }
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  const handleReady = useCallback(() => setReady(true), []);

  const showScene = webgl === true;
  const animate = !reduceMotion;

  return (
    <div
      ref={hostRef}
      role="img"
      aria-label="Generative particle sphere"
      className={`relative h-full w-full ${className}`}
    >
      <OrbFallback
        className={`absolute inset-0 transition-opacity duration-700 ${
          ready ? "opacity-0" : "opacity-100"
        }`}
      />
      {showScene && (
        <div
          className={`pointer-events-none absolute inset-0 transition-opacity duration-1000 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        >
          <ParticleOrbScene
            particleCount={compact ? 3200 : 9000}
            animate={animate}
            interactive={interactive && animate}
            active={visible}
            maxDpr={compact ? 1.5 : 1.75}
            onReady={handleReady}
          />
        </div>
      )}
    </div>
  );
}
