"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, FileText } from "lucide-react";
import { Github, Linkedin } from "./icons";
import { profile } from "@/lib/data";

export default function Crew() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      /* clipboard unavailable: the mailto link still works */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="crew" className="relative scroll-mt-16 overflow-hidden px-5 pb-28 pt-28 sm:px-10 sm:pb-24">
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[70%] bg-[radial-gradient(ellipse_at_50%_100%,rgba(255,46,147,0.55),rgba(255,122,69,0.25)_40%,transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl text-center">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-script text-4xl text-hot neon-pink sm:text-6xl">
          Ready to
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(3.5rem,13vw,11rem)] uppercase leading-[0.9]"
        >
          <span className="sunset-text">Join the crew?</span>
        </motion.h2>
        <p className="mx-auto mt-4 max-w-xl text-white/80">If you are building something that has to hold up in production, I would like to hear about it.</p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={copy}
            className="inline-flex items-center gap-3 rounded-xl bg-white px-6 py-4 font-display text-xl uppercase tracking-wide text-night shadow-[0_0_44px_rgba(255,46,147,0.55)] transition hover:-translate-y-0.5 sm:text-2xl"
          >
            {profile.email}
            {copied ? <Check className="h-5 w-5 text-teal" /> : <Copy className="h-5 w-5" />}
          </button>
          <a href={`mailto:${profile.email}`} className="glass inline-flex items-center gap-2 rounded-xl px-5 py-4 font-display text-xl uppercase tracking-wide transition hover:-translate-y-0.5 hover:border-hot">
            Say hello <ArrowUpRight className="h-5 w-5" />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="glass inline-flex items-center gap-2 rounded-xl px-5 py-4 font-display text-xl uppercase tracking-wide transition hover:-translate-y-0.5 hover:border-hot">
            <Linkedin className="h-5 w-5" /> LinkedIn
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="glass inline-flex items-center gap-2 rounded-xl px-5 py-4 font-display text-xl uppercase tracking-wide transition hover:-translate-y-0.5 hover:border-hot">
            <Github className="h-5 w-5" /> GitHub
          </a>
          <a href="https://vishalgwu.github.io/vishal-portfolio/resume/" target="_blank" rel="noreferrer" className="glass inline-flex items-center gap-2 rounded-xl px-5 py-4 font-display text-xl uppercase tracking-wide transition hover:-translate-y-0.5 hover:border-hot">
            <FileText className="h-5 w-5" /> Resume
          </a>
        </div>

        <p className="mt-6 font-mono text-xs uppercase tracking-widest text-white/50">
          Prefer the calm version? <a className="text-gold underline-offset-4 hover:underline" href="https://vishalgwu.github.io/vishal-portfolio/" target="_blank" rel="noreferrer">Open the channel-style portfolio</a>
        </p>

        <div className="mx-auto mt-20 max-w-3xl border-t border-white/10 pt-6 font-mono text-[11px] leading-relaxed text-white/45">
          © {new Date().getFullYear()} Vishal Fulsundar. This site is a fan-made visual homage to Vice City sunsets and has no affiliation with, and is not endorsed by, Rockstar Games or Take-Two Interactive. All artwork on this page is drawn in code. All project figures come from each repository&apos;s README or the resume.
        </div>
      </div>
    </footer>
  );
}
