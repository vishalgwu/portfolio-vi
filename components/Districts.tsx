"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { categories, projectsFor } from "@/lib/data";
import { emoji } from "@/lib/meta";
import { districts } from "@/lib/theme";
import type { CategoryId, Project } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function Districts({ onOpen }: { onOpen: (p: Project, list: Project[]) => void }) {
  const [active, setActive] = useState<CategoryId>("featured");
  const d = districts.find((x) => x.id === active) ?? districts[0];
  const cat = categories.find((c) => c.id === active);
  const list = projectsFor(active);

  return (
    <section id="map" className="relative scroll-mt-16 px-5 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-teal">Map</p>
        <h2 className="mt-2 font-display text-5xl uppercase leading-[0.95] sm:text-7xl">
          Explore the <span className="sunset-text">districts</span>
        </h2>
        <p className="mt-4 max-w-2xl text-white/75">Five districts, one per kind of work. Tap a blip to see what is built there.</p>

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/15 bg-dusk shadow-[0_0_60px_-20px_#6a4bd6]">
            <svg viewBox="0 0 1000 560" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
              <defs>
                <linearGradient id="mapwater" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#120b34" />
                  <stop offset="1" stopColor="#25124f" />
                </linearGradient>
                <pattern id="mapgrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M40 0H0V40" fill="none" stroke="#6a4bd6" strokeOpacity="0.18" />
                </pattern>
              </defs>
              <rect width="1000" height="560" fill="url(#mapwater)" />
              <rect width="1000" height="560" fill="url(#mapgrid)" />
              {[
                "M0 80 C120 40 220 100 300 180 C360 250 330 330 260 380 C200 430 120 470 0 500Z",
                "M360 80 C440 40 560 50 640 100 C700 140 690 210 620 240 C540 270 430 250 380 200 C340 160 330 110 360 80Z",
                "M720 200 C800 150 920 160 1000 210 L1000 420 C930 440 830 430 770 380 C710 330 690 250 720 200Z",
                "M300 430 C380 400 500 410 560 450 C600 490 560 540 480 550 C390 560 310 520 300 430Z",
                "M760 40 C820 20 920 30 960 70 C990 110 930 140 860 130 C790 120 740 80 760 40Z",
              ].map((p, i) => (
                <path key={i} d={p} fill="#34196b" stroke="#ff2e93" strokeOpacity="0.55" strokeWidth="2" style={{ filter: "drop-shadow(0 0 8px rgba(255,46,147,0.45))" }} />
              ))}
              {[
                "M300 200 L380 170",
                "M640 150 L740 120",
                "M640 220 L730 260",
                "M470 250 L440 420",
                "M300 360 L360 440",
              ].map((p, i) => (
                <path key={i} d={p} stroke="#ffc15e" strokeOpacity="0.6" strokeWidth="3" strokeDasharray="8 8" fill="none" />
              ))}
            </svg>

            {districts.map((x) => {
              const on = x.id === active;
              return (
                <button
                  key={x.id}
                  onClick={() => setActive(x.id)}
                  aria-pressed={on}
                  aria-label={`${x.name}: ${x.tagline}`}
                  className="group absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${x.x}%`, top: `${x.y}%` }}
                >
                  <span className={cn("absolute inset-0 -m-3 rounded-full bg-hot/40", on && "animate-ping")} />
                  <span className={cn("relative grid h-9 w-9 place-items-center rounded-full border-2 transition sm:h-11 sm:w-11", on ? "scale-125 border-gold bg-hot shadow-[0_0_24px_#ff2e93]" : "border-white/70 bg-night/80 group-hover:border-gold")}>
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                  <span className={cn("absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider sm:text-[11px]", on ? "bg-gold text-night" : "bg-night/80 text-white/80")}>
                    {x.name}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="glass rounded-3xl p-5 sm:p-7">
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">{list.length} missions here</p>
                <h3 className="mt-1 font-display text-4xl uppercase leading-none sm:text-5xl">{d.name}</h3>
                <p className="mt-2 text-sm text-white/70">{cat?.blurb}</p>
                <ul className="thin-scroll mt-5 max-h-[300px] space-y-2 overflow-y-auto pr-1">
                  {list.map((p) => (
                    <li key={p.slug}>
                      <button
                        onClick={() => onOpen(p, list)}
                        className="group flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-left transition hover:border-hot hover:bg-hot/10"
                      >
                        <span className="text-2xl">{emoji(p)}</span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-bold">{p.title}</span>
                          <span className="block truncate text-xs text-white/60">{p.tagline}</span>
                        </span>
                        <span className="font-mono text-[10px] uppercase text-white/40 transition group-hover:text-gold">brief →</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
