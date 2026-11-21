"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star } from "lucide-react";
import { sections } from "@/lib/theme";
import { cn } from "@/lib/utils";

function useClock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = () => setT(new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }));
    f();
    const id = setInterval(f, 15000);
    return () => clearInterval(id);
  }, []);
  return t;
}

export default function Hud({ visible }: { visible: boolean }) {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState<string>("home");
  const clock = useClock();

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter((e): e is HTMLElement => Boolean(e));
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (vis) setActive(vis.target.id);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0, 0.2, 0.5, 1] },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  const lit = progress <= 0.02 ? 0 : Math.min(5, Math.ceil(progress * 5));
  const maxed = lit === 5;
  const current = sections.find((s) => s.id === active) ?? sections[0];

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <AnimatePresence>
      {visible && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pointer-events-none fixed inset-0 z-50">
          {/* top bar */}
          <div className="pointer-events-auto absolute inset-x-0 top-0 flex items-start justify-between bg-gradient-to-b from-night/80 to-transparent px-4 pb-8 pt-3 sm:px-8">
            <button onClick={() => go("home")} className="flex items-baseline gap-3 text-left" aria-label="Back to the top">
              <span className="font-display text-3xl leading-none sunset-text">VF</span>
              <span className="hidden font-mono text-xs uppercase tracking-[0.25em] text-white/70 xs:inline">Portfolio VI</span>
              <span className="font-mono text-xs text-gold">{clock}</span>
            </button>

            <nav aria-label="Sections" className="hidden items-center gap-1 lg:flex">
              {sections.slice(1).map((s) => (
                <button
                  key={s.id}
                  onClick={() => go(s.id)}
                  className={cn(
                    "rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest transition",
                    active === s.id ? "bg-hot text-white shadow-[0_0_18px_#ff2e93]" : "text-white/70 hover:text-white",
                  )}
                >
                  {s.label}
                </button>
              ))}
            </nav>

            <div className="flex flex-col items-end gap-1" role="img" aria-label={`Scroll heat: ${lit} of 5 stars`}>
              <div className={cn("flex gap-1", maxed && "animate-flicker")}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={cn("h-5 w-5 transition-all duration-300 sm:h-6 sm:w-6", i < lit ? "fill-gold text-gold drop-shadow-[0_0_8px_#ffc15e]" : "text-white/25")}
                  />
                ))}
              </div>
              <span className={cn("font-mono text-[10px] uppercase tracking-[0.25em]", maxed ? "text-hot" : "text-white/50")}>
                {maxed ? "Max heat: you read it all" : "Scroll heat"}
              </span>
            </div>
          </div>

          {/* radar */}
          <div className="pointer-events-auto absolute bottom-4 left-4 sm:bottom-6 sm:left-8">
            <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-hot/70 bg-night/80 shadow-[0_0_24px_rgba(255,46,147,0.5)] sm:h-32 sm:w-32">
              <div className="absolute inset-2 rounded-full border border-white/10" />
              <div className="absolute inset-6 rounded-full border border-white/10 sm:inset-8" />
              <div className="absolute inset-x-0 top-1/2 h-px bg-white/10" />
              <div className="absolute inset-y-0 left-1/2 w-px bg-white/10" />
              <div className="animate-radar absolute inset-0 rounded-full [background:conic-gradient(from_0deg,transparent_0deg,rgba(255,46,147,0.45)_60deg,transparent_62deg)]" />
              <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal shadow-[0_0_8px_#19e3d1]" />
              {sections.map((s, i) => {
                const a = (i / sections.length) * Math.PI * 2 - Math.PI / 2;
                const r = 34 + (i % 2) * 8;
                return (
                  <button
                    key={s.id}
                    onClick={() => go(s.id)}
                    title={s.label}
                    aria-label={`Go to ${s.label}`}
                    className={cn(
                      "absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70 transition",
                      active === s.id ? "scale-125 bg-gold shadow-[0_0_10px_#ffc15e]" : "bg-hot/80 hover:bg-gold",
                    )}
                    style={{ left: `${50 + Math.cos(a) * r}%`, top: `${50 + Math.sin(a) * r}%` }}
                  />
                );
              })}
            </div>
          </div>

          {/* mission line */}
          <div className="absolute bottom-5 right-4 max-w-[58vw] text-right sm:bottom-7 sm:right-8">
            <AnimatePresence mode="wait">
              <motion.p
                key={current.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/90 [text-shadow:0_2px_8px_rgba(0,0,0,0.9)] sm:text-xs"
              >
                <span className="text-gold">Objective:</span> {current.mission}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
