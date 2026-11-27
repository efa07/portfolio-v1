"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Cpu,
  Layers,
  Activity,
  Play,
  RotateCcw,
  ShieldCheck,
  Server,
  Database,
  Radio,
  Zap,
  Sliders,
  CheckCircle2,
} from "lucide-react";
import { LiquidGlassButton } from "@/components/LiquidGlass";

type Mode = "pipeline" | "spring" | "fayda";

export function SystemInspector() {
  const [activeTab, setActiveTab] = useState<Mode>("pipeline");

  // Distributed Pipeline State
  const [pipelineStep, setPipelineStep] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([
    "System idle: Ready to dispatch event payload",
  ]);

  // Spring Sandbox State
  const [stiffness, setStiffness] = useState<number>(300);
  const [damping, setDamping] = useState<number>(25);
  const [mass, setMass] = useState<number>(1);
  const [springKey, setSpringKey] = useState<number>(0);
  const [isMoved, setIsMoved] = useState<boolean>(false);

  // Fayda OIDC State
  const [oidcStep, setOidcStep] = useState<number>(1);
  const [verifiedToken, setVerifiedToken] = useState<boolean>(false);

  const triggerPipeline = () => {
    if (isProcessing) return;
    setIsProcessing(true);
    setPipelineStep(1);
    setLogs(["[00ms] Client sends POST /api/v1/identity/verify..."]);

    setTimeout(() => {
      setPipelineStep(2);
      setLogs((prev) => [
        ...prev,
        "[45ms] API Gateway validates Keycloak JWT & route guard",
      ]);
    }, 600);

    setTimeout(() => {
      setPipelineStep(3);
      setLogs((prev) => [
        ...prev,
        "[95ms] Publishes to RabbitMQ: 'identity.claims.exchange'",
      ]);
    }, 1200);

    setTimeout(() => {
      setPipelineStep(4);
      setLogs((prev) => [
        ...prev,
        "[140ms] Worker persists immutable audit log in PostgreSQL",
      ]);
    }, 1800);

    setTimeout(() => {
      setPipelineStep(5);
      setLogs((prev) => [
        ...prev,
        "[180ms] HTTP 200 OK — Citizen consent verified & cached in Redis",
      ]);
      setIsProcessing(false);
    }, 2400);
  };

  const resetPipeline = () => {
    setPipelineStep(0);
    setIsProcessing(false);
    setLogs(["System reset: Pipeline ready"]);
  };

  return (
    <div className="w-full rounded-2xl border border-border bg-card/90 backdrop-blur-xl overflow-hidden shadow-2xl">
      {/* Top Bar with Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between border-b border-border px-4 py-3 bg-card-3">
        {/* Interactive Mode Switcher */}
        <div className="flex items-center gap-1.5 liquid-glass-pill p-1 rounded-xl border border-border/80 overflow-x-auto max-w-full relative">
          <button
            onClick={() => setActiveTab("pipeline")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "pipeline"
                ? "liquid-glass-pill-active font-semibold shadow-sm"
                : "text-subtle hover:text-foreground"
            }`}
          >
            <Activity className="w-3.5 h-3.5 shrink-0" />
            <span>Distributed Flow</span>
          </button>
          <button
            onClick={() => setActiveTab("spring")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "spring"
                ? "liquid-glass-pill-active font-semibold shadow-sm"
                : "text-subtle hover:text-foreground"
            }`}
          >
            <Sliders className="w-3.5 h-3.5 shrink-0" />
            <span>Springs</span>
          </button>
          <button
            onClick={() => setActiveTab("fayda")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "fayda"
                ? "liquid-glass-pill-active font-semibold shadow-sm"
                : "text-subtle hover:text-foreground"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <span>Fayda OIDC</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {activeTab === "pipeline" && (
            <motion.div
              key="pipeline"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-semibold text-foreground">
                    Event-Driven Architecture Trace
                  </h4>
                  <p className="text-xs text-subtle">
                    Simulate an enterprise async verification request across services
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <LiquidGlassButton
                    variant="primary"
                    size="sm"
                    onClick={triggerPipeline}
                    disabled={isProcessing}
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>{isProcessing ? "Processing..." : "Dispatch Request"}</span>
                  </LiquidGlassButton>
                  <button
                    onClick={resetPipeline}
                    className="p-2 rounded-lg liquid-glass-pill text-subtle hover:text-foreground text-xs transition-colors cursor-pointer"
                    title="Reset"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Node Graph */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  {
                    step: 1,
                    title: "Client",
                    subtitle: "Next.js App",
                    icon: Cpu,
                    tech: "REST / OIDC",
                  },
                  {
                    step: 2,
                    title: "Gateway",
                    subtitle: "Spring / Express",
                    icon: Server,
                    tech: "Keycloak JWT",
                  },
                  {
                    step: 3,
                    title: "Message Broker",
                    subtitle: "RabbitMQ",
                    icon: Radio,
                    tech: "AMQP Event",
                  },
                  {
                    step: 4,
                    title: "Worker Daemon",
                    subtitle: "Async Worker",
                    icon: Zap,
                    tech: "Background Task",
                  },
                  {
                    step: 5,
                    title: "Persistence",
                    subtitle: "PostgreSQL & Redis",
                    icon: Database,
                    tech: "ACID + Cache",
                  },
                ].map((node) => {
                  const isActive = pipelineStep === node.step;
                  const isPassed = pipelineStep > node.step;
                  const Icon = node.icon;

                  return (
                    <div
                      key={node.step}
                      className={`relative p-3 rounded-xl border transition-all duration-300 ${
                        isActive
                          ? "border-accent bg-accent/10"
                          : isPassed
                          ? "border-emerald-500/40 bg-emerald-500/5 text-success"
                          : "border-border bg-fill-1 text-subtle"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Icon
                          className={`w-4 h-4 ${
                            isActive
                              ? "text-accent-ink"
                              : isPassed
                              ? "text-success"
                              : "text-faint"
                          }`}
                        />
                        <span className="text-[10px] font-mono font-medium text-faint">
                          0{node.step}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-foreground">
                        {node.title}
                      </div>
                      <div className="text-[11px] text-subtle truncate">
                        {node.subtitle}
                      </div>
                      <div className="mt-2 text-[10px] font-mono px-1.5 py-0.5 rounded bg-well text-subtle w-fit">
                        {node.tech}
                      </div>

                      {isActive && (
                        <motion.span
                          layoutId="activeGlow"
                          className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-accent ring-4 ring-accent/30"
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Real-time Telemetry Log */}
              <div className="rounded-xl border border-border bg-well p-3 font-mono text-xs">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-border text-[11px] text-faint">
                  <span>TELEMETRY CONSOLE</span>
                  <span className="text-success">LATENCY: ~180ms</span>
                </div>
                <div className="space-y-1 text-muted max-h-24 overflow-y-auto">
                  {logs.map((log, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-accent-ink">$</span>
                      <span className="text-muted">{log}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "spring" && (
            <motion.div
              key="spring"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-semibold text-foreground">
                    Motion Spring Physics Sandbox
                  </h4>
                  <p className="text-xs text-subtle">
                    Fine-tune physics parameters used across UI micro-interactions
                  </p>
                </div>
                <LiquidGlassButton
                  variant="primary"
                  size="sm"
                  onClick={() => setIsMoved(!isMoved)}
                >
                  <span>Trigger Spring Bounce</span>
                </LiquidGlassButton>
              </div>

              {/* Interactive Canvas */}
              <div className="relative h-44 rounded-xl border border-border bg-well overflow-hidden flex items-center justify-center p-6 bg-grid-pattern">
                <motion.div
                  key={springKey}
                  animate={{
                    x: isMoved ? 140 : -140,
                    scale: isMoved ? 1.05 : 1,
                    rotate: isMoved ? 8 : -8,
                  }}
                  transition={{
                    type: "spring",
                    stiffness,
                    damping,
                    mass,
                  }}
                  drag
                  dragConstraints={{ left: -180, right: 180, top: -50, bottom: 50 }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.96 }}
                  className="cursor-grab active:cursor-grabbing px-5 py-4 rounded-2xl bg-gradient-to-br from-fill-3 to-card-3 border border-accent/40 shadow-xl flex items-center gap-3 select-none"
                >
                  <div className="w-8 h-8 rounded-lg bg-accent text-accent-fg flex items-center justify-center font-bold text-xs">
                    ET
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-foreground">
                      Spring Object
                    </div>
                    <div className="text-[10px] font-mono text-subtle">
                      drag me or click button
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Spring Sliders */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-subtle">Stiffness</span>
                    <span className="text-accent-ink">{stiffness}</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="600"
                    value={stiffness}
                    onChange={(e) => {
                      setStiffness(Number(e.target.value));
                      setSpringKey((k) => k + 1);
                    }}
                    className="w-full accent-accent-ink bg-fill-3 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-subtle">Damping</span>
                    <span className="text-accent-ink">{damping}</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    value={damping}
                    onChange={(e) => {
                      setDamping(Number(e.target.value));
                      setSpringKey((k) => k + 1);
                    }}
                    className="w-full accent-accent-ink bg-fill-3 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-subtle">Mass</span>
                    <span className="text-accent-ink">{mass}</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="3"
                    step="0.1"
                    value={mass}
                    onChange={(e) => {
                      setMass(Number(e.target.value));
                      setSpringKey((k) => k + 1);
                    }}
                    className="w-full accent-accent-ink bg-fill-3 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "fayda" && (
            <motion.div
              key="fayda"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-foreground">
                      OneCitizen — Fayda OIDC Authentication Flow
                    </h4>
                    
                  </div>
                  <p className="text-xs text-subtle">
                    National ID authentication with zero-knowledge consent verification
                  </p>
                </div>
                <LiquidGlassButton
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setOidcStep((prev) => (prev % 3) + 1);
                    if (oidcStep === 2) setVerifiedToken(true);
                  }}
                >
                  <span>Advance Auth Phase ({oidcStep}/3)</span>
                </LiquidGlassButton>
              </div>

              {/* 3 Step Protocol Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div
                  className={`p-3.5 rounded-xl border transition-all ${
                    oidcStep >= 1
                      ? "border-emerald-500/40 bg-emerald-500/5 text-foreground/90"
                      : "border-border bg-fill-1 text-faint"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-success">
                      STEP 01
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                  </div>
                  <div className="text-xs font-semibold text-foreground mb-1">
                    Client Auth Request
                  </div>
                  <div className="text-[11px] text-subtle leading-relaxed font-mono">
                    response_type=code
                    <br />
                    scope=openid fayda_eid
                    <br />
                    code_challenge_method=S256
                  </div>
                </div>

                <div
                  className={`p-3.5 rounded-xl border transition-all ${
                    oidcStep >= 2
                      ? "border-emerald-500/40 bg-emerald-500/5 text-foreground/90"
                      : "border-border bg-fill-1 text-faint"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-success">
                      STEP 02
                    </span>
                    {oidcStep >= 2 ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-faint" />
                    )}
                  </div>
                  <div className="text-xs font-semibold text-foreground mb-1">
                    Fayda eID Consent
                  </div>
                  <div className="text-[11px] text-subtle leading-relaxed font-mono">
                    Cryptographic signature
                    <br />
                    Biometric challenge verified
                    <br />
                    Issuer: auth.fayda.et
                  </div>
                </div>

                <div
                  className={`p-3.5 rounded-xl border transition-all ${
                    oidcStep >= 3
                      ? "border-accent bg-accent/10 text-foreground"
                      : "border-border bg-fill-1 text-faint"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-accent-ink">
                      STEP 03
                    </span>
                    {oidcStep >= 3 ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent-ink" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-faint" />
                    )}
                  </div>
                  <div className="text-xs font-semibold text-foreground mb-1">
                    Verified JWT Claims
                  </div>
                  <div className="text-[11px] text-subtle leading-relaxed font-mono">
                    sub: "fayda-eid-849204"
                    <br />
                    status: "VERIFIED_CITIZEN"
                    <br />
                    aud: "onecitizen-app"
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

