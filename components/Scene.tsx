"use client";

import { useEffect, useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/** Small seeded PRNG so the skyline is identical on server and client. */
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

interface Building {
  x: number;
  w: number;
  h: number;
}

function skyline(seed: number, minH: number, maxH: number, minW: number, maxW: number): Building[] {
  const r = rng(seed);
  const out: Building[] = [];
  let x = -40;
  while (x < 1640) {
    const w = minW + r() * (maxW - minW);
    const h = minH + Math.pow(r(), 1.6) * (maxH - minH);
    out.push({ x, w, h });
    x += w + r() * 6;
  }
  return out;
}

function frond(cx: number, cy: number, angle: number, len: number): string {
  const rad = (angle * Math.PI) / 180;
  const ex = cx + Math.cos(rad) * len;
  const ey = cy + Math.sin(rad) * len + len * 0.38;
  const mx = cx + Math.cos(rad) * len * 0.55;
  const my = cy + Math.sin(rad) * len * 0.55 - len * 0.1;
  return `M${cx} ${cy} Q${mx} ${my - 16} ${ex} ${ey} Q${mx} ${my + 14} ${cx} ${cy}Z`;
}

function Palm({ scale = 1, flip = false }: { scale?: number; flip?: boolean }) {
  const top = { x: 18, y: -330 };
  const angles = [-175, -150, -125, -100, -75, -50, -25, 0, 150, 175];
  return (
    <g transform={`scale(${flip ? -scale : scale} ${scale})`} fill="#07040f">
      <path d="M-9 0 C2 -120 -16 -240 14 -332 L22 -330 C-6 -236 14 -120 9 0Z" />
      {angles.map((a, i) => (
        <path key={a} d={frond(top.x, top.y, a, 150 + (i % 3) * 22)} />
      ))}
    </g>
  );
}

interface SceneProps {
  /** 0..1, how bright the scene is; the trailer modal dims it */
  intensity?: number;
  interactive?: boolean;
}

export default function Scene({ intensity = 1, interactive = true }: SceneProps) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });

  const far = { x: useTransform(smx, [-1, 1], [-10, 10]), y: useTransform(smy, [-1, 1], [-3, 3]) };
  const near = { x: useTransform(smx, [-1, 1], [-26, 26]), y: useTransform(smy, [-1, 1], [-6, 6]) };
  const palms = { x: useTransform(smx, [-1, 1], [-46, 46]), y: useTransform(smy, [-1, 1], [-10, 10]) };
  const sun = { x: useTransform(smx, [-1, 1], [4, -4]), y: useTransform(smy, [-1, 1], [2, -2]) };

  useEffect(() => {
    if (!interactive || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const move = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [interactive, mx, my]);

  const stars = useMemo(() => {
    const r = rng(7);
    return Array.from({ length: 70 }, () => ({ x: r() * 1600, y: r() * 340, r: 0.6 + r() * 1.4, d: r() * 3 }));
  }, []);
  const farB = useMemo(() => skyline(11, 50, 210, 26, 62), []);
  const nearB = useMemo(() => skyline(23, 90, 330, 38, 92), []);
  const windows = useMemo(() => {
    const r = rng(99);
    const colors = ["#ffc15e", "#ff2e93", "#19e3d1", "#ffe9b0"];
    const out: { x: number; y: number; c: string }[] = [];
    nearB.forEach((b) => {
      const cols = Math.floor(b.w / 12);
      const rows = Math.floor(b.h / 18);
      for (let i = 0; i < cols; i++)
        for (let j = 0; j < rows; j++)
          if (r() > 0.62) out.push({ x: b.x + 6 + i * 12, y: 640 - b.h + 10 + j * 18, c: colors[Math.floor(r() * colors.length)] });
    });
    return out;
  }, [nearB]);

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden" style={{ opacity: 0.35 + intensity * 0.65 }}>
      <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0e0730" />
            <stop offset="0.3" stopColor="#2f1a73" />
            <stop offset="0.5" stopColor="#7a3aa6" />
            <stop offset="0.64" stopColor="#d8408f" />
            <stop offset="0.76" stopColor="#ff6a6a" />
            <stop offset="0.88" stopColor="#ff9a52" />
            <stop offset="1" stopColor="#ffd27a" />
          </linearGradient>
          <linearGradient id="sunfill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff0a8" />
            <stop offset="0.45" stopColor="#ffb347" />
            <stop offset="1" stopColor="#ff2e93" />
          </linearGradient>
          <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#5a2a86" />
            <stop offset="0.35" stopColor="#2a1458" />
            <stop offset="1" stopColor="#0b0718" />
          </linearGradient>
          <linearGradient id="streak" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#ff2e93" stopOpacity="0" />
            <stop offset="0.5" stopColor="#ffb347" stopOpacity="0.9" />
            <stop offset="1" stopColor="#ff2e93" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="halo" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#ff8a4c" stopOpacity="0.85" />
            <stop offset="0.5" stopColor="#ff2e93" stopOpacity="0.28" />
            <stop offset="1" stopColor="#ff2e93" stopOpacity="0" />
          </radialGradient>
          <mask id="sunmask">
            <rect x="0" y="0" width="1600" height="900" fill="#fff" />
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <rect key={i} x="560" y={560 + i * 15} width="480" height={1.5 + i * 1.5} fill="#000" />
            ))}
          </mask>
        </defs>

        <rect width="1600" height="900" fill="url(#sky)" />
        {stars.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#fff" className="animate-twinkle" style={{ animationDelay: `${s.d}s` }} />
        ))}
        <ellipse cx="300" cy="470" rx="320" ry="16" fill="#ff7ab0" opacity="0.18" />
        <ellipse cx="1280" cy="430" rx="360" ry="14" fill="#ffb27a" opacity="0.2" />

        <motion.g style={sun}>
          <circle cx="800" cy="610" r="340" fill="url(#halo)" />
          <circle cx="800" cy="610" r="150" fill="url(#sunfill)" mask="url(#sunmask)" />
        </motion.g>

        <motion.g style={far}>
          {farB.map((b, i) => (
            <rect key={i} x={b.x} y={640 - b.h} width={b.w} height={b.h + 4} fill="#4b2a86" opacity="0.85" />
          ))}
        </motion.g>

        <motion.g style={near}>
          {nearB.map((b, i) => (
            <rect key={i} x={b.x} y={640 - b.h} width={b.w} height={b.h + 4} fill="#190c3f" />
          ))}
          {windows.map((w, i) => (
            <rect key={i} x={w.x} y={w.y} width="4" height="7" fill={w.c} opacity="0.85" />
          ))}
          <g transform="translate(1210 540)">
            <g className="animate-wheel" style={{ transformOrigin: "0 0" }}>
              <circle r="78" fill="none" stroke="#ff2e93" strokeWidth="3" style={{ filter: "drop-shadow(0 0 8px #ff2e93)" }} />
              <circle r="52" fill="none" stroke="#19e3d1" strokeWidth="2" style={{ filter: "drop-shadow(0 0 6px #19e3d1)" }} />
              {Array.from({ length: 12 }, (_, i) => (
                <line key={i} x1="0" y1="0" x2={78 * Math.cos((i * Math.PI) / 6)} y2={78 * Math.sin((i * Math.PI) / 6)} stroke="#ffc15e" strokeWidth="1.5" opacity="0.9" />
              ))}
              {Array.from({ length: 12 }, (_, i) => (
                <circle key={i} cx={78 * Math.cos((i * Math.PI) / 6)} cy={78 * Math.sin((i * Math.PI) / 6)} r="4" fill="#fff" />
              ))}
            </g>
            <path d="M-34 100 L0 0 L34 100" fill="none" stroke="#190c3f" strokeWidth="6" />
          </g>
        </motion.g>

        <rect x="0" y="636" width="1600" height="264" fill="url(#water)" />
        <path d="M0 640 L1600 640" stroke="#ff9a52" strokeOpacity="0.55" strokeWidth="2" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <rect
            key={i}
            x={800 - 190 + i * 18}
            y={660 + i * 22}
            width={380 - i * 36}
            height="5"
            fill="url(#streak)"
            className="animate-shimmer"
            style={{ animationDelay: `${i * 0.25}s` }}
          />
        ))}
        {nearB.slice(8, 30).map((b, i) => (
          <rect key={i} x={b.x} y={646} width={b.w} height={b.h * 0.35} fill="#ff2e93" opacity="0.07" />
        ))}

        <motion.g style={palms}>
          <g transform="translate(120 910)">
            <Palm scale={1.55} />
          </g>
          <g transform="translate(330 920)">
            <Palm scale={1.05} />
          </g>
          <g transform="translate(1490 910)">
            <Palm scale={1.6} flip />
          </g>
          <g transform="translate(1290 925)">
            <Palm scale={1.0} flip />
          </g>
        </motion.g>
      </svg>

      <span className="animate-drift absolute left-0 top-[14%] h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_10px_#fff]" />
      <span className="animate-drift absolute left-0 top-[22%] h-1 w-1 rounded-full bg-hot shadow-[0_0_10px_#ff2e93] [animation-delay:-30s] [animation-duration:95s]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,transparent_35%,rgba(11,7,24,0.85)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-night to-transparent" />
    </div>
  );
}
