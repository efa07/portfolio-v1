import React from "react";
import { SystemInspector } from "@/components/SystemInspector";

export function ArchitectureSection() {
  return (
    <section
      id="architecture"
      aria-label="Architecture Inspector"
      className="relative border-t border-border py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 max-w-2xl space-y-3">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            How the systems fit together
          </h2>
          <p className="text-sm leading-relaxed text-subtle sm:text-base">
            Trace a verification request through the stack, tune spring physics, or step
            through the OneCitizen OIDC flow.
          </p>
        </div>
        <SystemInspector />
      </div>
    </section>
  );
}
