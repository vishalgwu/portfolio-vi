"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin, Briefcase } from "lucide-react";
import { profile } from "@/lib/data";

const stats = [
  { label: "Coupa-to-ERP auto-match", value: 94, shown: "94%", color: "from-hot to-flame" },
  { label: "Lead-scoring recall retained", value: 72, shown: "72%", color: "from-violet to-hot" },
  { label: "Lead-scoring precision (from 61%)", value: 68, shown: "68%", color: "from-teal to-violet" },
  { label: "Reviewer prep time cut", value: 55, shown: "55%", color: "from-gold to-flame" },
  { label: "Accruals routed to a human", value: 22, shown: "22%", color: "from-ice to-teal" },
];

export default function Protagonist() {
  return (
    <section id="protagonist" className="relative scroll-mt-16 px-5 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <motion.div
          initial={{ opacity: 0, x: -50, rotate: -3 }}
          whileInView={{ opacity: 1, x: 0, rotate: -1.5 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="absolute -inset-3 rotate-3 rounded-[28px] bg-gradient-to-br from-hot via-flame to-gold opacity-90 blur-[1px]" />
          <div className="relative overflow-hidden rounded-[24px] border-4 border-night bg-night">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/vishal.jpg" alt="Vishal Fulsundar" className="aspect-[4/5] w-full object-cover object-top [filter:saturate(1.15)_contrast(1.05)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-transparent" />
            <div className="absolute inset-0 mix-blend-soft-light [background:linear-gradient(160deg,#6a4bd6,transparent_45%,#ff2e93)]" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">Playable character</p>
              <p className="font-script text-5xl leading-none text-white neon-pink">Vishal</p>
            </div>
          </div>
        </motion.div>

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-teal">Character profile</p>
          <h2 className="mt-2 font-display text-5xl uppercase leading-[0.95] sm:text-7xl">
            Meet the <span className="sunset-text">protagonist</span>
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85">{profile.summary}</p>

          <ul className="mt-6 grid gap-2 sm:grid-cols-3">
            <li className="glass flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm">
              <Briefcase className="h-4 w-4 shrink-0 text-gold" /> {profile.experience[0].org}
            </li>
            <li className="glass flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm">
              <GraduationCap className="h-4 w-4 shrink-0 text-gold" /> GWU, M.S. Data Science
            </li>
            <li className="glass flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm">
              <MapPin className="h-4 w-4 shrink-0 text-gold" /> {profile.location}
            </li>
          </ul>

          <h3 className="mb-3 mt-9 font-display text-2xl uppercase tracking-wide text-gold">Stat sheet <span className="font-mono text-xs normal-case tracking-normal text-white/50">(measured results, from the resume)</span></h3>
          <div className="space-y-3.5">
            {stats.map((s, i) => (
              <div key={s.label}>
                <div className="mb-1 flex justify-between font-mono text-xs uppercase tracking-wider text-white/80">
                  <span>{s.label}</span>
                  <span className="text-gold">{s.shown}</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-white/10 ring-1 ring-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    className={`h-full rounded-full bg-gradient-to-r ${s.color} shadow-[0_0_14px_rgba(255,46,147,0.6)]`}
                  />
                </div>
              </div>
            ))}
          </div>

          <h3 className="mb-3 mt-9 font-display text-2xl uppercase tracking-wide text-gold">Loadout</h3>
          <div className="space-y-3">
            {profile.skills.map((g) => (
              <div key={g.group} className="flex flex-wrap items-center gap-1.5">
                <span className="mr-2 w-full font-mono text-[11px] uppercase tracking-widest text-ice/80 sm:w-auto sm:min-w-44">{g.group}</span>
                {g.items.slice(0, 6).map((it) => (
                  <span key={it} className="rounded-md border border-white/15 bg-white/5 px-2 py-0.5 text-xs text-white/85">
                    {it}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
