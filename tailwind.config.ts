import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    screens: { xs: "420px", sm: "640px", md: "768px", lg: "1024px", xl: "1280px", "2xl": "1536px" },
    extend: {
      colors: {
        night: "#0b0718",
        dusk: "#1a0f3d",
        plum: "#2a1458",
        violet: "#6a4bd6",
        hot: "#ff2e93",
        flame: "#ff7a45",
        gold: "#ffc15e",
        teal: "#19e3d1",
        ice: "#9fe6ff",
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        script: ["var(--font-script)", "cursive"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        spin: { to: { transform: "rotate(360deg)" } },
        twinkle: { "0%,100%": { opacity: "0.25" }, "50%": { opacity: "1" } },
        drift: { from: { transform: "translateX(-10vw)" }, to: { transform: "translateX(110vw)" } },
        shimmer: { "0%,100%": { opacity: "0.35" }, "50%": { opacity: "0.9" } },
        flicker: { "0%,100%": { opacity: "1" }, "45%": { opacity: "0.55" }, "55%": { opacity: "1" }, "70%": { opacity: "0.7" } },
        sweep: { from: { transform: "translateX(-120%) skewX(-18deg)" }, to: { transform: "translateX(220%) skewX(-18deg)" } },
        slam: {
          "0%": { opacity: "0", transform: "scale(2.4)", letterSpacing: "0.5em" },
          "60%": { opacity: "1", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        radar: "spin 3.2s linear infinite",
        wheel: "spin 40s linear infinite",
        twinkle: "twinkle 3s ease-in-out infinite",
        drift: "drift 70s linear infinite",
        shimmer: "shimmer 2.6s ease-in-out infinite",
        flicker: "flicker 3.5s linear infinite",
        sweep: "sweep 1.1s ease-in-out",
        slam: "slam 0.7s cubic-bezier(.2,.9,.2,1) both",
      },
    },
  },
  plugins: [],
};
export default config;
