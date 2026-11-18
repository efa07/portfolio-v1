"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export interface ParticleOrbSceneProps {
  particleCount: number;
  animate: boolean;
  interactive: boolean;
  active: boolean;
  maxDpr: number;
  onReady?: () => void;
}

const VERTEX_SHADER = /* glsl */ `
uniform float uTime;
uniform float uPixelRatio;
uniform float uSize;
uniform vec2 uPointer;
uniform float uPointerAmt;
uniform vec3 uHot[3];

attribute float aSeed;
attribute float aTone;
attribute float aSize;

varying vec3 vColor;
varying float vAlpha;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

void main() {
  float shell = length(position);
  vec3 n = position / shell;

  float slow = uTime * 0.04;
  float n1 = snoise(n * 1.15 + vec3(slow, 0.0, slow * 0.6));
  float n2 = snoise(n * 2.7 - vec3(0.0, uTime * 0.07, slow));
  float bulge = 1.0 + 0.085 * n1 + 0.025 * n2;
  float drift = sin(uTime * (0.45 + aSeed * 0.6) + aSeed * 40.0) * 0.012;

  vec3 p = n * (shell * bulge + drift);

  vec3 wp0 = (modelMatrix * vec4(p, 1.0)).xyz;
  vec3 pointerWorld = vec3(uPointer * 1.05, sqrt(max(0.0, 1.0 - dot(uPointer, uPointer) * 1.1)));
  float dist = length(wp0 - pointerWorld);
  p += n * exp(-dist * dist * 5.0) * uPointerAmt * 0.13;

  vec4 wp4 = modelMatrix * vec4(p, 1.0);
  vec3 wn = normalize((modelMatrix * vec4(n, 0.0)).xyz);
  vec3 toCamera = normalize(cameraPosition - wp4.xyz);
  float facing = dot(wn, toCamera);

  float hot = 0.0;
  for (int i = 0; i < 3; i++) {
    hot += pow(max(dot(wn, normalize(uHot[i])), 0.0), 7.0);
  }
  hot = clamp(hot, 0.0, 1.0);

  float tone = clamp(aTone * 0.35 + hot * 1.1, 0.0, 1.0);
  vec3 warm = vec3(1.0, 0.95, 0.9);
  vec3 ember = vec3(1.0, 0.36, 0.13);
  vColor = mix(warm, ember, tone);

  float front = smoothstep(-0.25, 0.9, facing);
  float rim = pow(1.0 - clamp(facing, 0.0, 1.0), 2.4);
  float twinkle = 0.82 + 0.18 * sin(uTime * (0.8 + aSeed * 1.3) + aSeed * 52.0);
  float bright = (0.16 + 0.5 * front + 1.0 * rim) * twinkle * (1.0 + hot * 1.2);
  vAlpha = clamp(bright, 0.0, 1.5);

  vec4 mv = viewMatrix * wp4;
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * aSize * uPixelRatio * (4.0 / -mv.z);
}
`;

const FRAGMENT_SHADER = /* glsl */ `
varying vec3 vColor;
varying float vAlpha;

void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  float a = smoothstep(1.0, 0.0, d);
  a *= a;
  vec3 color = vColor * vAlpha * a;
  gl_FragColor = vec4(color, max(color.r, max(color.g, color.b)));
}
`;

const GLOW_VERTEX_SHADER = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const GLOW_FRAGMENT_SHADER = /* glsl */ `
uniform float uTime;
varying vec2 vUv;
void main() {
  vec2 p = vUv * 2.0 - 1.0;
  float r = length(p);
  float halo = exp(-pow((r - 0.8) * 3.2, 2.0));
  float core = exp(-r * r * 6.0) * 0.35;
  float fade = 1.0 - smoothstep(0.7, 1.0, r);
  float breathe = 0.92 + 0.08 * sin(uTime * 0.5);
  float glow = (halo * 0.55 + core) * fade * breathe;
  vec3 color = vec3(1.0, 0.37, 0.14) * glow * 0.24;
  gl_FragColor = vec4(color, max(color.r, max(color.g, color.b)));
}
`;

const HOTSPOTS = [
  new THREE.Vector3(0.55, 0.35, 0.75),
  new THREE.Vector3(-0.8, -0.1, 0.35),
  new THREE.Vector3(0.15, -0.75, -0.2),
];

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildGeometry(count: number) {
  const positions = new Float32Array(count * 3);
  const seeds = new Float32Array(count);
  const tones = new Float32Array(count);
  const sizes = new Float32Array(count);
  const rand = mulberry32(7);
  const golden = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    const x = Math.cos(theta) * r + (rand() - 0.5) * 0.02;
    const z = Math.sin(theta) * r + (rand() - 0.5) * 0.02;
    const shell =
      rand() < 0.82 ? 1 + (rand() - 0.5) * 0.04 : 0.78 + rand() * 0.2;

    positions[i * 3] = x * shell;
    positions[i * 3 + 1] = y * shell;
    positions[i * 3 + 2] = z * shell;
    seeds[i] = rand();
    tones[i] = Math.pow(rand(), 2.2);
    sizes[i] = 0.5 + rand() * 1.1;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
  geometry.setAttribute("aTone", new THREE.BufferAttribute(tones, 1));
  geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
  return geometry;
}

function OrbPoints({
  particleCount,
  animate,
  interactive,
  onReady,
}: Pick<ParticleOrbSceneProps, "particleCount" | "animate" | "interactive" | "onReady">) {
  const groupRef = useRef<THREE.Group>(null);
  const particleMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const glowMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const pointer = useRef({ x: 0, y: 0, tx: 0, ty: 0, amt: 0, tAmt: 0 });
  const { gl, invalidate } = useThree();

  const geometry = useMemo(() => buildGeometry(particleCount), [particleCount]);
  const glowGeometry = useMemo(() => new THREE.PlaneGeometry(3.4, 3.4), []);

  const particleUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: gl.getPixelRatio() },
      uSize: { value: 1.9 },
      uPointer: { value: new THREE.Vector2() },
      uPointerAmt: { value: 0 },
      uHot: { value: HOTSPOTS },
    }),
    [gl]
  );

  const glowUniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  useEffect(() => {
    return () => {
      geometry.dispose();
      glowGeometry.dispose();
    };
  }, [geometry, glowGeometry]);

  useEffect(() => {
    if (!animate) invalidate();
    onReady?.();
  }, [invalidate, animate, onReady]);

  useEffect(() => {
    if (!interactive) return;

    const readTarget = (clientX: number, clientY: number) => {
      const rect = gl.domElement.getBoundingClientRect();
      const halfW = rect.width / 2 || 1;
      const halfH = rect.height / 2 || 1;
      const nx = (clientX - (rect.left + halfW)) / halfW;
      const ny = -(clientY - (rect.top + halfH)) / halfH;
      const len = Math.hypot(nx, ny);
      const p = pointer.current;
      p.tx = THREE.MathUtils.clamp(nx, -1, 1) * 0.8;
      p.ty = THREE.MathUtils.clamp(ny, -1, 1) * 0.8;
      p.tAmt = THREE.MathUtils.clamp(1.6 - len * 0.6, 0, 1);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      readTarget(event.clientX, event.clientY);
    };

    const onLeave = (event: PointerEvent) => {
      if (event.relatedTarget) return;
      const p = pointer.current;
      p.tx = 0;
      p.ty = 0;
      p.tAmt = 0;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerout", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerout", onLeave);
    };
  }, [gl, interactive]);

  useFrame((state, delta) => {
    const t = animate ? state.clock.elapsedTime : 0;
    const p = pointer.current;
    const k = 1 - Math.exp(-delta * 2.6);

    p.x += (p.tx - p.x) * k;
    p.y += (p.ty - p.y) * k;
    p.amt += (p.tAmt - p.amt) * k;

    const particle = particleMaterialRef.current?.uniforms;
    if (particle) {
      particle.uTime.value = t;
      particle.uPointer.value.set(p.x, p.y);
      particle.uPointerAmt.value = p.amt;
    }
    const glow = glowMaterialRef.current?.uniforms;
    if (glow) glow.uTime.value = t;

    const group = groupRef.current;
    if (group) {
      group.rotation.set(0.28 + p.y * 0.12, t * 0.07 + p.x * 0.18, -0.16);
      group.position.set(p.x * 0.06, -p.y * 0.05, 0);
    }
  });

  return (
    <>
      <mesh
        geometry={glowGeometry}
        position={[0, 0, -1.3]}
        renderOrder={-1}
        frustumCulled={false}
      >
        <shaderMaterial
          ref={glowMaterialRef}
          vertexShader={GLOW_VERTEX_SHADER}
          fragmentShader={GLOW_FRAGMENT_SHADER}
          uniforms={glowUniforms}
          transparent
          depthWrite={false}
          blending={THREE.CustomBlending}
          blendSrc={THREE.OneFactor}
          blendDst={THREE.OneFactor}
          blendSrcAlpha={THREE.OneFactor}
          blendDstAlpha={THREE.OneFactor}
        />
      </mesh>
      <group ref={groupRef}>
        <points geometry={geometry} frustumCulled={false}>
          <shaderMaterial
            ref={particleMaterialRef}
            vertexShader={VERTEX_SHADER}
            fragmentShader={FRAGMENT_SHADER}
            uniforms={particleUniforms}
            transparent
            depthWrite={false}
            blending={THREE.CustomBlending}
            blendSrc={THREE.OneFactor}
            blendDst={THREE.OneFactor}
            blendSrcAlpha={THREE.OneFactor}
            blendDstAlpha={THREE.OneFactor}
          />
        </points>
      </group>
    </>
  );
}

export function ParticleOrbScene({
  particleCount,
  animate,
  interactive,
  active,
  maxDpr,
  onReady,
}: ParticleOrbSceneProps) {
  const frameloop = !active ? "never" : animate ? "always" : "demand";

  return (
    <Canvas
      dpr={[1, maxDpr]}
      frameloop={frameloop}
      camera={{ position: [0, 0, 3.6], fov: 38 }}
      gl={{ antialias: false, alpha: true, premultipliedAlpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.setClearColor(new THREE.Color("#000000"), 0);
      }}
    >
      <OrbPoints
        particleCount={particleCount}
        animate={animate}
        interactive={interactive}
        onReady={onReady}
      />
    </Canvas>
  );
}
