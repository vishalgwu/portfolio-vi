"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { categories, projects, projectsFor } from "@/lib/data";
import { emoji, sticker, thumbTitle } from "@/lib/meta";
import { districts, headline, poster } from "@/lib/theme";
import type { CategoryId, Project } from "@/lib/types";
import { cn } from "@/lib/utils";

function Poster({ project, n, onOpen }: { project: Project; n: number; onOpen: (p: Project) => void }) {
  const c = poster[project.accent];
  const st = sticker(project);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 18 });

  return (
    <div className="snap-start py-6" style={{ perspective: 900 }}>
      <motion.button
        onClick={() => onOpen(project)}
        aria-label={`Open mission briefing: ${project.title}`}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width - 0.5);
          my.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onMouseLeave={() => {
          mx.set(0);
          my.set(0);
        }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.98 }}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", ["--glow" as string]: c.glow }}
        className="group relative block h-[380px] w-[240px] overflow-hidden rounded-2xl border border-white/15 text-left outline-none transition-shadow hover:shadow-[0_0_46px_-4px_var(--glow)] focus-visible:shadow-[0_0_46px_-4px_var(--glow)] sm:h-[420px] sm:w-[270px]"
      >
        <div className="absolute inset-0" style={{ background: `linear-gradient(165deg, ${c.from}, ${c.mid} 55%, ${c.to})` }} />
        {project.thumb && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={`/${project.thumb}`} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top opacity-45 mix-blend-luminosity" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent" />
        <div className="absolute -right-10 top-10 select-none text-[170px] leading-none opacity-30 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" aria-hidden>
          {emoji(project)}
        </div>
        <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 bg-white/25 opacity-0 group-hover:animate-sweep group-hover:opacity-100" />

        <div className="absolute inset-x-4 top-4 flex items-start justify-between" style={{ transform: "translateZ(30px)" }}>
          <span className="rounded-md bg-night/70 px-2 py-1 font-mono text-[11px] font-bold uppercase tracking-widest text-gold">Mission {String(n).padStart(2, "0")}</span>
          {st && (
            <span className="rounded-md px-2 py-1 font-mono text-[10px] font-extrabold uppercase tracking-wider text-night" style={{ background: st.color }}>
              {st.text}
            </span>
          )}
        </div>

        <div className="absolute inset-x-4 bottom-4" style={{ transform: "translateZ(44px)" }}>
          <p className="line-clamp-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-gold">{headline(project)}</p>
          <h3 className="mt-1 font-display text-[28px] uppercase leading-[0.98] text-white [text-shadow:0_3px_0_rgba(0,0,0,0.4)] sm:text-[32px]">{thumbTitle(project)}</h3>
          <p className="mt-2 line-clamp-2 text-xs leading-snug text-white/80">{project.tagline}</p>
          <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-white/70">
            <span className="inline-flex items-center gap-1">
              <Star className="h-3 w-3 fill-gold text-gold" /> {project.stars}
            </span>
            <span className="opacity-0 transition group-hover:opacity-100">Open briefing →</span>
          </div>
        </div>
      </motion.button>
    </div>
  );
}

export default function Missions({ onOpen }: { onOpen: (p: Project, list: Project[]) => void }) {
  const [filter, setFilter] = useState<CategoryId | "all">("all");
  const scroller = useRef<HTMLDivElement>(null);
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(true);

  const list = useMemo(() => (filter === "all" ? [...projectsFor("featured"), ...projects.filter((p) => !p.categories.includes("featured"))] : projectsFor(filter)), [filter]);

  const update = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    setLeft(el.scrollLeft > 4);
    setRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    scroller.current?.scrollTo({ left: 0 });
    update();
  }, [list, update]);

  const go = (d: 1 | -1) => scroller.current?.scrollBy({ left: d * scroller.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <section id="missions" className="relative scroll-mt-16 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-teal">Mission select</p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-5xl uppercase leading-[0.95] sm:text-7xl">
            Choose your <span className="sunset-text">mission</span>
          </h2>
          <div className="hidden gap-2 md:flex">
            {([-1, 1] as const).map((d) => {
              const on = d === -1 ? left : right;
              return (
                <button
                  key={d}
                  onClick={() => go(d)}
                  disabled={!on}
                  aria-label={d === -1 ? "Scroll missions left" : "Scroll missions right"}
                  className={cn("grid h-11 w-11 place-items-center rounded-full glass transition", on ? "hover:border-hot hover:shadow-[0_0_18px_#ff2e93]" : "opacity-30")}
                >
                  {d === -1 ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                </button>
              );
            })}
          </div>
        </div>

        <div className="no-scrollbar mt-6 flex gap-2 overflow-x-auto pb-1">
          <button onClick={() => setFilter("all")} className={cn("whitespace-nowrap rounded-full px-4 py-2 font-mono text-xs uppercase tracking-widest transition", filter === "all" ? "bg-hot text-white shadow-[0_0_18px_#ff2e93]" : "glass text-white/80 hover:text-white")}>
            All {projects.length}
          </button>
          {categories.map((c) => {
            const d = districts.find((x) => x.id === c.id);
            return (
              <button key={c.id} onClick={() => setFilter(c.id)} className={cn("whitespace-nowrap rounded-full px-4 py-2 font-mono text-xs uppercase tracking-widest transition", filter === c.id ? "bg-hot text-white shadow-[0_0_18px_#ff2e93]" : "glass text-white/80 hover:text-white")}>
                {d?.name ?? c.title} · {projectsFor(c.id).length}
              </button>
            );
          })}
        </div>
      </div>

      <div ref={scroller} onScroll={update} className="no-scrollbar mx-auto mt-2 flex max-w-[1700px] snap-x snap-proximity gap-4 overflow-x-auto px-5 sm:gap-5 sm:px-10">
        {list.map((p, i) => (
          <Poster key={`${filter}-${p.slug}`} project={p} n={i + 1} onOpen={(proj) => onOpen(proj, list)} />
        ))}
        <div className="w-4 shrink-0" aria-hidden />
      </div>
    </section>
  );
}
