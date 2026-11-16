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
      className="py-24 border-t border-white/[0.06] relative overflow-hidden"
    >
      {/* Subtle ambient lighting */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[350px] bg-[#d4f932]/[0.05] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Headline & Direct Contact Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#d4f932]">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>START A CONVERSATION</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Have an interesting problem to solve?
            </h2>

            <p className="text-base text-zinc-400 leading-relaxed">
              I&apos;m always interested in connecting with people building meaningful
              products and solving challenging engineering problems.
            </p>

            {/* Quick Copy Email Card */}
            <div className="p-4 rounded-xl border border-white/[0.08] bg-[#0c0d15] space-y-3">
              <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                Direct Communication
              </div>
              <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-black/50 border border-white/[0.06]">
                <div className="flex items-center gap-2 overflow-hidden">
                  <Mail className="w-4 h-4 text-[#d4f932] shrink-0" />
                  <span className="text-xs sm:text-sm font-mono text-zinc-200 truncate">
                    {PERSONAL_INFO.socials.email}
                  </span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/15 text-xs font-medium text-white transition-colors shrink-0"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#d4f932]" />
                      <span className="text-[#d4f932]">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Social Channels */}
            <div className="space-y-2">
              <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                Profiles & Repositories
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={PERSONAL_INFO.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] text-xs font-medium text-zinc-300 hover:text-white transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub (@efa07)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
                </a>

                <a
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] text-xs font-medium text-zinc-300 hover:text-white transition-colors"
                >
                  <LinkedinIcon className="w-4 h-4 text-sky-400" />
                  <span>LinkedIn Profile</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
                </a>
              </div>
            </div>

            {/* Location & Timezone Note */}
            <div className="flex items-center gap-3 pt-2 text-xs font-mono text-zinc-500">
              <span className="flex items-center gap-1">
                <Globe2 className="w-3.5 h-3.5 text-zinc-400" />
                <span>{PERSONAL_INFO.location}</span>
              </span>
              <span>•</span>
              <span>Remote / Worldwide</span>
            </div>
          </div>

          {/* Right Column: Interactive Message Dispatch Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl border border-white/[0.08] bg-[#0b0c13] shadow-xl relative">
              <div className="flex items-center justify-between border-b border-white/[0.07] pb-4 mb-6">
                <div>
                  <h3 className="text-base font-semibold text-white">
                    Send a Message
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    For job inquiries, technical collaborations, or consulting
                  </p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  ACTIVE INBOX
                </span>
              </div>

              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white">
                    Message Dispatched Successfully
                  </h4>
                  <p className="text-xs text-zinc-300 max-w-sm mx-auto">
                    Thank you for reaching out! I will review your message and reply
                    shortly at {formData.email || "your email"}.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ name: "", email: "", message: "" });
                    }}
                    className="mt-4 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-white font-medium"
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
                        className="text-xs font-mono text-zinc-400"
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
                        className="w-full px-3.5 py-2.5 rounded-xl border border-white/[0.08] bg-black/40 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#d4f932] focus:ring-1 focus:ring-[#d4f932] transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="email"
                        className="text-xs font-mono text-zinc-400"
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
                        className="w-full px-3.5 py-2.5 rounded-xl border border-white/[0.08] bg-black/40 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#d4f932] focus:ring-1 focus:ring-[#d4f932] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="message"
                      className="text-xs font-mono text-zinc-400"
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
                      className="w-full px-3.5 py-2.5 rounded-xl border border-white/[0.08] bg-black/40 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#d4f932] focus:ring-1 focus:ring-[#d4f932] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#d4f932] hover:bg-[#e2ff4a] text-black font-semibold text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(212,249,50,0.2)] hover:shadow-[0_0_28px_rgba(212,249,50,0.35)] active:scale-[0.99]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Efa</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
