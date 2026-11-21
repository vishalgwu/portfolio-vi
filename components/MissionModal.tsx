"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Check, X } from "lucide-react";
import { Github } from "./icons";
import { emoji, fmtUpdated } from "@/lib/meta";
import { poster } from "@/lib/theme";
import type { Project } from "@/lib/types";

interface Props {
  project: Project | null;
  index: number;
  total: number;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
}

export default function MissionModal({ project, index, total, onClose, onStep }: Props) {
  useEffect(() => {
    if (!project) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose, onStep]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[110] flex items-end justify-center bg-night/80 backdrop-blur-md sm:items-center sm:p-6"
        >
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 60, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label={`Mission briefing: ${project.title}`}
            onClick={(e) => e.stopPropagation()}
            style={{ ["--glow" as string]: poster[project.accent].glow }}
            className="relative flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-t-3xl border border-white/15 bg-dusk shadow-[0_0_80px_-10px_var(--glow)] sm:max-h-[90vh] sm:rounded-3xl"
          >
            <div
              className="relative shrink-0 px-5 pb-6 pt-7 sm:px-9"
              style={{ background: `linear-gradient(120deg, ${poster[project.accent].from}, ${poster[project.accent].mid} 55%, ${poster[project.accent].to})` }}
            >
              <div className="absolute inset-0 bg-night/35" />
              <div className="relative">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">
                    Mission briefing · {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                  </p>
                  <div className="flex gap-2">
                    <button onClick={() => onStep(-1)} aria-label="Previous mission" className="grid h-9 w-9 place-items-center rounded-full glass hover:bg-white/10">
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button onClick={() => onStep(1)} aria-label="Next mission" className="grid h-9 w-9 place-items-center rounded-full glass hover:bg-white/10">
                      <ChevronRight className="h-4 w-4" />
                    </button>
                    <button onClick={onClose} aria-label="Close briefing" className="grid h-9 w-9 place-items-center rounded-full glass hover:bg-white/10">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <h2 className="mt-3 font-display text-4xl uppercase leading-[0.98] sm:text-6xl">
                  <span className="mr-3">{emoji(project)}</span>
                  {project.title}
                </h2>
                <p className="mt-2 max-w-3xl text-base text-white/90 sm:text-lg">{project.tagline}</p>
                <div className="mt-4 flex flex-wrap items-center gap-2 font-mono text-[11px]">
                  <span className="rounded-md bg-night/60 px-2 py-1 uppercase">{project.status}</span>
                  <span className="rounded-md bg-night/60 px-2 py-1">{project.language}</span>
                  <span className="rounded-md bg-night/60 px-2 py-1">updated {fmtUpdated(project.updated)}</span>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a href={project.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 font-display text-lg uppercase tracking-wide text-night transition hover:-translate-y-0.5">
                    <Github className="h-4 w-4" /> Start mission
                  </a>
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-hot px-5 py-2.5 font-display text-lg uppercase tracking-wide text-white shadow-[0_0_24px_#ff2e93] transition hover:-translate-y-0.5">
                      <ExternalLink className="h-4 w-4" /> Play live
                    </a>
                  )}
                  {project.secondary && (
                    <a href={project.secondary.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/40 px-5 py-2.5 font-display text-lg uppercase tracking-wide transition hover:bg-white/10">
                      {project.secondary.label}
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="thin-scroll min-h-0 flex-1 space-y-9 overflow-y-auto px-5 py-7 sm:px-9">
              <section>
                <h3 className="mb-2 font-display text-2xl uppercase tracking-wide text-gold">The brief</h3>
                <p className="leading-relaxed text-white/85">{project.overview}</p>
              </section>

              <section>
                <h3 className="mb-3 font-display text-2xl uppercase tracking-wide text-gold">Rewards</h3>
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                  {project.metrics.map((m, i) => (
                    <motion.div
                      key={m.label}
                      initial={{ opacity: 0, y: 16, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: 0.15 + i * 0.1, type: "spring", stiffness: 240, damping: 16 }}
                      className="rounded-2xl border border-gold/30 bg-gold/[0.06] p-4"
                    >
                      <p className="font-display text-2xl leading-tight text-gold sm:text-3xl">{m.value}</p>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-white/65">{m.label}</p>
                    </motion.div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="mb-3 font-display text-2xl uppercase tracking-wide text-gold">Objectives</h3>
                <ul className="space-y-2.5">
                  {project.challenges.map((c, i) => (
                    <motion.li
                      key={c}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 + i * 0.12 }}
                      className="flex gap-3 text-sm leading-relaxed text-white/85 sm:text-base"
                    >
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md bg-teal text-night">
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                      {c}
                    </motion.li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="mb-3 font-display text-2xl uppercase tracking-wide text-gold">Blueprint</h3>
                <pre className="thin-scroll overflow-x-auto rounded-2xl border border-teal/30 bg-night/80 p-4 font-mono text-[11px] leading-relaxed text-teal sm:text-xs">{project.architecture}</pre>
              </section>

              <section>
                <h3 className="mb-3 font-display text-2xl uppercase tracking-wide text-gold">Loadout</h3>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <span key={s} className="rounded-lg border border-hot/50 bg-hot/10 px-3 py-1 font-mono text-xs text-white">
                      {s}
                    </span>
                  ))}
                </div>
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
