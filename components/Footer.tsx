"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { ArrowUp, Mail, Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";

export function Footer() {
  const [currentYear, setCurrentYear] = useState<number>(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      aria-label="Site Footer"
      className="border-t border-white/[0.08] bg-[#06070a] py-12 text-zinc-500 font-mono text-xs"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/[0.05]">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-white/10 shrink-0 bg-zinc-900">
              <Image
                src="/efa.jpeg"
                alt="Efa Tariku"
                fill
                className="object-cover object-top"
                sizes="32px"
              />
            </div>
            <div>
              <div className="text-white font-semibold tracking-tight text-sm">
                Efa Tariku
              </div>
              <div className="text-[10px] text-zinc-500">
                Software Engineer • Full-Stack Developer
              </div>
            </div>
          </div>

          {/* Nav / Social Links */}
          <div className="flex items-center gap-5">
            <a
              href={PERSONAL_INFO.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href={PERSONAL_INFO.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.socials.email}`}
              className="hover:text-white transition-colors"
            >
              Email
            </a>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20 hover:text-white transition-colors"
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#d4f932]" />
            </button>
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-zinc-600">
          <div>
            &copy; {currentYear} {PERSONAL_INFO.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span>Built with Next.js 16, Motion & Tailwind CSS</span>
            <span>•</span>
            <span className="text-zinc-500">Addis Ababa, Ethiopia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
