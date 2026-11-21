"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, Pause, Play, X } from "lucide-react";
import Scene from "./Scene";
import { projects } from "@/lib/data";
import { cn } from "@/lib/utils";

const FRAMES = [
  { kicker: "Portfolio VI", big: "VISHAL FULSUNDAR", sub: "AI Systems & Data Science Engineer", script: true },
  { kicker: "Coupa-to-ERP accrual automation", big: "94%", sub: "auto-match, shipped as FastAPI services" },
  { kicker: "Reviewer preparation", big: "11 → 5 min", sub: "down 55% across 80 paired invoice trials" },
  { kicker: "HR Agentic RAG Copilot", big: "21 / 21", sub: "routing and grading decisions correct" },
  { kicker: "Latent Instability Diagnostics", big: "0.71", sub: "AUROC, flagging hallucinations a token early" },
  { kicker: "The whole city", big: `${projects.length} missions`, sub: `across five districts. ${projects.filter((p) => p.demo).length} are live.` },
  { kicker: "Now playing", big: "TENTO RESIDENT OS", sub: "deployed. role workspaces, tenant-scoped retrieval, 339 tests" },
];

const MS = 3000;

export default function Trailer({ open, onClose, onExplore }: { open: boolean; onClose: () => void; onExplore: () => void }) {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [t, setT] = useState(0);

  const reset = useCallback(() => {
    setI(0);
    setT(0);
    setPlaying(true);
  }, []);

  useEffect(() => {
    if (open) reset();
  }, [open, reset]);

  useEffect(() => {
    if (!open || !playing) return;
    const id = setInterval(() => {
      setT((p) => {
        if (p + 50 >= MS) {
          setI((n) => (n + 1 < FRAMES.length ? n + 1 : n));
          return 0;
        }
        return p + 50;
      });
    }, 50);
    return () => clearInterval(id);
  }, [open, playing]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === " ") {
        e.preventDefault();
        setPlaying((p) => !p);
      }
      if (e.key === "ArrowRight") {
        setI((n) => Math.min(FRAMES.length - 1, n + 1));
        setT(0);
      }
      if (e.key === "ArrowLeft") {
        setI((n) => Math.max(0, n - 1));
        setT(0);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const f = FRAMES[i];
  const last = i === FRAMES.length - 1;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Trailer"
          className="fixed inset-0 z-[120] bg-night"
        >
          <Scene intensity={0.55} interactive={false} />
          <div className="absolute inset-0 bg-night/45" />

          <div className="absolute inset-x-0 top-0 flex gap-1.5 px-4 pt-4 sm:px-8">
            {FRAMES.map((_, n) => (
              <button
                key={n}
                aria-label={`Go to scene ${n + 1}`}
                onClick={() => {
                  setI(n);
                  setT(0);
                }}
                className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/25"
              >
                <span className="block h-full bg-gradient-to-r from-hot to-gold" style={{ width: n < i ? "100%" : n === i ? `${(t / MS) * 100}%` : "0%" }} />
              </button>
            ))}
          </div>

          <div className="absolute right-4 top-9 flex gap-2 sm:right-8">
            <button onClick={() => setPlaying((p) => !p)} aria-label={playing ? "Pause trailer" : "Play trailer"} className="grid h-10 w-10 place-items-center rounded-full glass hover:bg-white/10">
              {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
            <button onClick={onClose} aria-label="Close trailer" className="grid h-10 w-10 place-items-center rounded-full glass hover:bg-white/10">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 1.25, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="font-mono text-xs uppercase tracking-[0.4em] text-ice sm:text-sm">{f.kicker}</p>
                <h2
                  className={cn(
                    "mt-3 font-display uppercase leading-[0.95] sunset-text",
                    f.big.length > 12 ? "text-5xl sm:text-8xl lg:text-9xl" : "text-7xl sm:text-9xl lg:text-[11rem]",
                  )}
                >
                  {f.big}
                </h2>
                <p className={cn("mx-auto mt-4 max-w-2xl text-white/90", f.script ? "font-script text-3xl text-hot neon-pink sm:text-5xl" : "text-lg sm:text-2xl")}>{f.sub}</p>
              </motion.div>
            </AnimatePresence>

            {last && (
              <motion.button
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={onExplore}
                className="mt-10 inline-flex items-center gap-2 rounded-full bg-hot px-7 py-3.5 font-display text-xl uppercase tracking-wide text-white shadow-[0_0_34px_#ff2e93] transition hover:scale-105"
              >
                Start playing <ArrowDown className="h-5 w-5" />
              </motion.button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
