"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const TIPS = [
  "Every answer cites its evidence, or refuses.",
  "No verbatim source span, no memory write.",
  "Measure before you trust. Then measure again.",
  "Fail closed, not quiet.",
  "Humans approve anything above read-only.",
  "Ship it, then make it faster.",
];

const KEY = "vi-loaded";

export default function Loader({ onDone }: { onDone: () => void }) {
  const [show, setShow] = useState(true);
  const [pct, setPct] = useState(0);
  const [tip] = useState(() => TIPS[Math.floor(Math.random() * TIPS.length)]);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {
      /* storage unavailable: just play the loader */
    }
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShow(false);
      onDone();
      return;
    }
    const start = performance.now();
    const total = 2100;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / total);
      setPct(Math.round((1 - Math.pow(1 - p, 2.2)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {
        /* ignore */
      }
      document.body.style.overflow = prev;
      setShow(false);
    }, total + 300);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
      document.body.style.overflow = prev;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {show && (
        <motion.div
          key="loader"
          exit={{ opacity: 0, scale: 1.08 }}
          transition={{ duration: 0.7, ease: "easeIn" }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-night"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(255,46,147,0.35),transparent_60%)]" />
          <div className="relative text-center">
            <p className="font-script text-4xl text-hot sm:text-6xl neon-pink animate-flicker">Welcome to</p>
            <h1 className="sunset-text font-display text-6xl uppercase leading-none tracking-wide sm:text-9xl">Vishal&apos;s City</h1>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.5em] text-ice/80">Portfolio VI</p>
          </div>
          <div className="relative mt-12 w-[min(78vw,520px)]">
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-violet via-hot to-gold" style={{ width: `${pct}%` }} />
            </div>
            <div className="mt-2 flex justify-between font-mono text-xs text-white/60">
              <span>LOADING MISSIONS</span>
              <span>{pct}%</span>
            </div>
            <p className="mt-6 text-center text-sm text-white/70">
              <span className="font-bold text-gold">TIP:</span> {tip}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
