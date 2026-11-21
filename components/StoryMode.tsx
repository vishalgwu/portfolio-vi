"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { profile } from "@/lib/data";
import { cn } from "@/lib/utils";

const tone = ["from-hot to-flame", "from-violet to-hot", "from-teal to-violet"];

function Banner({ current }: { current: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 2.4, letterSpacing: "0.5em" }}
      whileInView={{ opacity: 1, scale: 1, letterSpacing: "0.04em" }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.7, ease: [0.2, 0.9, 0.2, 1] }}
      className={cn("font-display text-4xl uppercase leading-none sm:text-6xl", current ? "text-teal neon-teal" : "sunset-text")}
    >
      {current ? "Mission in progress" : "Mission passed"}
    </motion.div>
  );
}

export default function StoryMode() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="story" className="relative scroll-mt-16 px-5 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-teal">Story mode</p>
        <h2 className="mt-2 font-display text-5xl uppercase leading-[0.95] sm:text-7xl">
          The story <span className="sunset-text">so far</span>
        </h2>
        <p className="mt-4 max-w-2xl text-white/75">Three chapters, newest first. Each ends with what actually moved.</p>

        <div className="relative mt-12 space-y-10 before:absolute before:bottom-0 before:left-[19px] before:top-0 before:w-px before:bg-gradient-to-b before:from-hot before:via-violet before:to-transparent sm:before:left-[27px]">
          {profile.experience.map((e, i) => (
            <motion.article
              key={e.org}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="relative pl-14 sm:pl-20"
            >
              <span className={cn("absolute left-0 top-1 grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br font-display text-xl text-night shadow-[0_0_20px_rgba(255,46,147,0.6)] sm:h-14 sm:w-14 sm:text-2xl", tone[i % 3])}>
                {String(profile.experience.length - i).padStart(2, "0")}
              </span>

              <Banner current={i === 0} />
              <p className="mt-3 font-mono text-xs uppercase tracking-widest text-gold">
                Chapter {profile.experience.length - i} · {e.dates} · {e.place}
              </p>
              <h3 className="mt-1 font-display text-3xl uppercase leading-tight sm:text-4xl">
                {e.role} <span className="text-white/50">@</span> {e.org}
              </h3>

              <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {e.highlights.map((h, k) => (
                  <motion.div
                    key={h.label}
                    initial={{ opacity: 0, scale: 0.8, y: 12 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + k * 0.12, type: "spring", stiffness: 240, damping: 16 }}
                    className="rounded-xl border border-gold/30 bg-gold/[0.06] px-3 py-3"
                  >
                    <p className="font-display text-2xl leading-none text-gold sm:text-3xl">
                      <span className="text-base text-teal">+ </span>
                      {h.value}
                    </p>
                    <p className="mt-1 font-mono text-[10px] uppercase leading-tight tracking-wide text-white/65">{h.label}</p>
                  </motion.div>
                ))}
              </div>

              <p className="mt-4 text-white/85">{e.detail}</p>

              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-hot hover:text-gold"
              >
                {open === i ? "Hide" : "Read"} full briefing <ChevronDown className={cn("h-4 w-4 transition", open === i && "rotate-180")} />
              </button>
              {open === i && (
                <motion.ul initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-3 space-y-2.5 overflow-hidden">
                  {e.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-sm leading-relaxed text-white/80">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-hot shadow-[0_0_8px_#ff2e93]" />
                      {b}
                    </li>
                  ))}
                </motion.ul>
              )}
            </motion.article>
          ))}
        </div>

        <div className="mt-14 grid gap-3 sm:grid-cols-3">
          {profile.education.map((e) => (
            <div key={e.school} className="glass rounded-2xl p-4">
              <p className="font-mono text-[10px] uppercase tracking-widest text-ice/80">Training · {e.dates}</p>
              <p className="mt-1 font-display text-xl uppercase leading-tight">{e.degree.replace("Master of Science", "M.S.").replace("Postgraduate Diploma in", "PG Diploma:")}</p>
              <p className="mt-1 text-sm text-white/65">{e.school.replace("The ", "")}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
