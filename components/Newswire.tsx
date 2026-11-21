"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";
import { emoji, fmtUpdated, sticker } from "@/lib/meta";
import { headline, poster } from "@/lib/theme";
import type { Project } from "@/lib/types";

export default function Newswire({ onOpen }: { onOpen: (p: Project, list: Project[]) => void }) {
  const latest = [...projects].sort((a, b) => b.updated.localeCompare(a.updated)).slice(0, 7);

  return (
    <section id="newswire" className="relative scroll-mt-16 px-5 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-teal">Newswire</p>
        <h2 className="mt-2 font-display text-5xl uppercase leading-[0.95] sm:text-7xl">
          Latest <span className="sunset-text">drops</span>
        </h2>
        <p className="mt-4 max-w-2xl text-white/75">The seven most recently updated repositories, straight from GitHub.</p>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {latest.map((p, i) => {
            const c = poster[p.accent];
            const st = sticker(p);
            const big = i === 0;
            return (
              <motion.button
                key={p.slug}
                onClick={() => onOpen(p, latest)}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.07 }}
                whileHover={{ y: -6 }}
                aria-label={`Read: ${p.title}`}
                className={`group relative overflow-hidden rounded-2xl border border-white/12 text-left outline-none transition-shadow hover:shadow-[0_0_40px_-6px_#ff2e93] ${big ? "md:col-span-2 lg:row-span-2" : ""}`}
                style={{ background: `linear-gradient(150deg, ${c.from}, ${c.mid} 60%, ${c.to})` }}
              >
                {p.thumb && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={`/${p.thumb}`} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top opacity-40 mix-blend-luminosity transition duration-500 group-hover:scale-105" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-night via-night/55 to-night/10" />
                <span className="absolute -right-6 -top-4 text-[120px] opacity-25 transition group-hover:rotate-6 group-hover:scale-110" aria-hidden>
                  {emoji(p)}
                </span>
                <div className={`relative flex h-full flex-col justify-end p-5 ${big ? "min-h-[300px] lg:min-h-[420px]" : "min-h-[210px]"}`}>
                  <div className="mb-2 flex items-center gap-2">
                    {st && (
                      <span className="rounded-md px-2 py-0.5 font-mono text-[10px] font-extrabold uppercase tracking-wider text-night" style={{ background: st.color }}>
                        {st.text}
                      </span>
                    )}
                    <span className="rounded-md bg-night/70 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white/80">{fmtUpdated(p.updated)}</span>
                    <span className="rounded-md bg-night/70 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-gold">{headline(p)}</span>
                  </div>
                  <h3 className={`font-display uppercase leading-[0.98] text-white ${big ? "text-4xl sm:text-6xl" : "text-2xl"}`}>{p.title}</h3>
                  <p className={`mt-2 text-white/80 ${big ? "line-clamp-3 max-w-xl text-base" : "line-clamp-2 text-sm"}`}>{p.tagline}</p>
                  <span className="mt-3 inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest text-gold">
                    Read the briefing <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
