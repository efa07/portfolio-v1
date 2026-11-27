"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import {
  Mail,
  Copy,
  Check,
  Send,
  MessageSquare,
  Globe2,
  Clock,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { LiquidGlassButton, LiquidGlassPill } from "@/components/LiquidGlass";

export function ContactSection() {
  const [copied, setCopied] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.socials.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSubmitted(true);
    // In production, integrate with form provider or webhook
  };

  return (
    <section
      id="contact"
      aria-label="Contact Section"
      className="py-24 border-t border-border relative overflow-hidden"
    >
      {/* Subtle ambient lighting */}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Headline & Direct Contact Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fill-2 border border-border text-xs font-mono text-accent-ink">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>START A CONVERSATION</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight">
              Have an interesting problem to solve?
            </h2>

            <p className="text-base text-subtle leading-relaxed">
              I&apos;m always interested in connecting with people building meaningful
              products and solving challenging engineering problems.
            </p>

            {/* Quick Copy Email Card */}
            <div className="p-4 rounded-2xl liquid-glass-pill border border-border/80 space-y-3 relative overflow-hidden block">
              <span className="liquid-glass-specular-edge" aria-hidden="true" />
              <div className="text-xs font-mono text-faint uppercase tracking-wider relative z-10">
                Direct Communication
              </div>
              <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-well/60 border border-border relative z-10">
                <div className="flex items-center gap-2 overflow-hidden">
                  <Mail className="w-4 h-4 text-accent-ink shrink-0" />
                  <span className="text-xs sm:text-sm font-mono text-foreground/90 truncate">
                    {PERSONAL_INFO.socials.email}
                  </span>
                </div>
                <LiquidGlassButton
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={handleCopyEmail}
                  className="rounded-lg shrink-0"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-accent-ink" />
                      <span className="text-accent-ink font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-subtle" />
                      <span>Copy</span>
                    </>
                  )}
                </LiquidGlassButton>
              </div>
            </div>

            {/* Social Channels */}
            <div className="space-y-2">
              <div className="text-xs font-mono text-faint uppercase tracking-wider">
                Profiles & Repositories
              </div>
              <div className="flex flex-wrap gap-3">
                <LiquidGlassButton
                  variant="secondary"
                  size="md"
                  href={PERSONAL_INFO.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl font-mono text-xs"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub (@efa07)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-faint" />
                </LiquidGlassButton>

                <LiquidGlassButton
                  variant="secondary"
                  size="md"
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl font-mono text-xs"
                >
                  <LinkedinIcon className="w-4 h-4 text-info" />
                  <span>LinkedIn Profile</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-faint" />
                </LiquidGlassButton>
              </div>
            </div>

            {/* Location & Timezone Note */}
            <div className="flex items-center gap-3 pt-2 text-xs font-mono text-faint">
              <span className="flex items-center gap-1">
                <Globe2 className="w-3.5 h-3.5 text-subtle" />
                <span>{PERSONAL_INFO.location}</span>
              </span>
              <span>•</span>
              <span>Remote / Worldwide</span>
            </div>
          </div>

          {/* Right Column: Interactive Message Dispatch Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card shadow-xl relative">
              <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
                <div>
                  <h3 className="text-base font-semibold text-foreground">
                    Send a Message
                  </h3>
                  <p className="text-xs text-subtle mt-0.5">
                    For job inquiries, technical collaborations, or consulting
                  </p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-success border border-emerald-500/20">
                  ACTIVE INBOX
                </span>
              </div>

              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-success flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-foreground">
                    Message Dispatched Successfully
                  </h4>
                  <p className="text-xs text-muted max-w-sm mx-auto">
                    Thank you for reaching out! I will review your message and reply
                    shortly at {formData.email || "your email"}.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ name: "", email: "", message: "" });
                    }}
                    className="mt-4 px-4 py-2 rounded-lg bg-fill-3 hover:bg-fill-4 text-xs text-foreground font-medium"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="name"
                        className="text-xs font-mono text-subtle"
                      >
                        Your Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Ada Lovelace"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-well text-sm text-foreground placeholder-ghost focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="email"
                        className="text-xs font-mono text-subtle"
                      >
                        Your Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="ada@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-well text-sm text-foreground placeholder-ghost focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="message"
                      className="text-xs font-mono text-subtle"
                    >
                      Project Details or Inquiry
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Describe your project, engineering challenge, or role specifications..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-well text-sm text-foreground placeholder-ghost focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-none"
                    />
                  </div>

                  <LiquidGlassButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full justify-center"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Efa</span>
                  </LiquidGlassButton>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
