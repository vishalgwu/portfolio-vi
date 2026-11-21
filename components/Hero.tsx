"use client";

import { motion } from "framer-motion";
import { ArrowDown, Play } from "lucide-react";
import Scene from "./Scene";
import { profile, projects } from "@/lib/data";
import { Github, Linkedin } from "./icons";

const EASE = [0.16, 1, 0.3, 1] as const;

function Line({ children, delay, ready }: { children: React.ReactNode; delay: number; ready: boolean }) {
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span
        className="block"
        initial={{ y: "115%" }}
        animate={ready ? { y: 0 } : { y: "115%" }}
        transition={{ duration: 1, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

interface HeroProps {
  ready: boolean;
  onTrailer: () => void;
}

export default function Hero({ ready, onTrailer }: HeroProps) {
  const live = projects.filter((p) => p.demo).length;
  return (
    <section id="home" className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-5 pb-28 pt-28 sm:px-10 sm:pb-32">
      <Scene />

      <div className="relative mx-auto w-full max-w-7xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="font-script text-4xl text-hot neon-pink sm:text-6xl"
        >
          Welcome to
        </motion.p>

        <h1 className="font-display text-[clamp(3.8rem,14vw,12rem)] uppercase leading-[0.86] tracking-tight">
          <Line delay={0.15} ready={ready}>
            <span className="sunset-text">Vishal</span>
          </Line>
          <Line delay={0.27} ready={ready}>
            <span className="text-white [text-shadow:0_6px_0_rgba(255,46,147,0.45),0_0_40px_rgba(255,46,147,0.4)]">Fulsundar</span>
          </Line>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.8, ease: EASE }}
          className="mt-6 grid items-end gap-8 lg:grid-cols-[1.3fr_1fr]"
        >
          <div>
            <p className="font-script text-3xl text-gold sm:text-5xl [text-shadow:0_0_24px_rgba(255,193,94,0.5)]">{profile.headline}</p>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
              {profile.currentRole}. Agents that cite their evidence, memory that earns its place, and models measured before they are trusted.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                onClick={onTrailer}
                className="inline-flex items-center gap-2.5 rounded-xl bg-hot px-6 py-3.5 font-display text-xl uppercase tracking-wide text-white shadow-[0_0_34px_rgba(255,46,147,0.65)] transition hover:-translate-y-0.5 hover:shadow-[0_0_50px_rgba(255,46,147,0.9)]"
              >
                <Play className="h-5 w-5 fill-white" /> Watch trailer
              </button>
              <a
                href="#missions"
                className="inline-flex items-center gap-2.5 rounded-xl border border-teal/70 bg-night/40 px-6 py-3.5 font-display text-xl uppercase tracking-wide text-teal backdrop-blur transition hover:-translate-y-0.5 hover:bg-teal/10"
              >
                <ArrowDown className="h-5 w-5" /> {projects.length} missions
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="glass grid h-[52px] w-[52px] place-items-center rounded-xl transition hover:-translate-y-0.5 hover:border-white/40">
                <Github className="h-5 w-5" />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="glass grid h-[52px] w-[52px] place-items-center rounded-xl transition hover:-translate-y-0.5 hover:border-white/40">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <dl className="grid grid-cols-3 gap-2 sm:gap-3">
            {[
              { v: "94%", l: "Coupa-to-ERP auto-match" },
              { v: String(projects.length), l: "projects built" },
              { v: String(live), l: "live and deployed" },
            ].map((s) => (
              <div key={s.l} className="glass rounded-xl px-3 py-3 sm:px-4">
                <dd className="font-display text-3xl leading-none text-gold sm:text-4xl">{s.v}</dd>
                <dt className="mt-1 font-mono text-[10px] uppercase leading-tight tracking-wider text-white/65">{s.l}</dt>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
