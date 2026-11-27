import React from "react";

interface FallbackPoint {
  x: number;
  y: number;
  r: number;
  ember: boolean;
  opacity: number;
}

// Rounded so server and client markup match exactly during hydration.
const round4 = (value: number) => Math.round(value * 10000) / 10000;

function buildFallbackPoints(count: number): FallbackPoint[] {
  let seed = 11;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  const golden = Math.PI * (3 - Math.sqrt(5));
  const yaw = 0.5;
  const pitch = 0.28;
  const points: FallbackPoint[] = [];

  for (let i = 0; i < count; i++) {
    const y0 = 1 - (i / (count - 1)) * 2;
    const r0 = Math.sqrt(Math.max(0, 1 - y0 * y0));
    const theta = golden * i;
    const x0 = Math.cos(theta) * r0;
    const z0 = Math.sin(theta) * r0;

    const x1 = x0 * Math.cos(yaw) + z0 * Math.sin(yaw);
    const z1 = -x0 * Math.sin(yaw) + z0 * Math.cos(yaw);
    const y2 = y0 * Math.cos(pitch) - z1 * Math.sin(pitch);
    const z2 = y0 * Math.sin(pitch) + z1 * Math.cos(pitch);

    const tone = Math.pow(rand(), 2.2);
    const front = z2 > 0;
    points.push({
      x: round4(x1),
      y: round4(y2),
      r: round4(0.008 + rand() * 0.012),
      ember: tone > 0.82 && front,
      opacity: round4(front ? 0.3 + 0.6 * z2 : 0.07),
    });
  }

  return points;
}

const FALLBACK_POINTS = buildFallbackPoints(640);

export function OrbFallback({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="-1.375 -1.375 2.75 2.75"
      aria-hidden="true"
      focusable="false"
      className={`h-full w-full ${className}`}
    >
      <defs>
        <radialGradient id="orb-fallback-glow">
          <stop offset="0" stopColor="#ff5f00" stopOpacity="0.16" />
          <stop offset="0.6" stopColor="#ff5f00" stopOpacity="0.04" />
          <stop offset="1" stopColor="#ff5f00" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="0" cy="0" r="1.35" fill="url(#orb-fallback-glow)" />
      {FALLBACK_POINTS.map((point, index) => (
        <circle
          key={index}
          cx={point.x}
          cy={point.y}
          r={point.r}
          fill={point.ember ? "#ff5f00" : "#ffffff"}
          fillOpacity={point.opacity}
        />
      ))}
    </svg>
  );
}
