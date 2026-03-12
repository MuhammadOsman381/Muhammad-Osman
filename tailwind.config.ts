import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        obsidian: "#03050a",
        "deep-sea": "#060c16",
        ink: "#0a1120",
        "cyan-glow": "#06b6d4",
        "cyan-bright": "#22d3ee",
        "indigo-glow": "#6366f1",
        "violet-glow": "#7c3aed",
        "ice-white": "#e0f2fe",
        "mist": "#94a3b8",
      },
      backgroundImage: {
        "radial-deep": "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(6,182,212,0.08) 0%, transparent 60%)",
        "radial-indigo": "radial-gradient(ellipse 60% 40% at 80% 50%, rgba(99,102,241,0.07) 0%, transparent 60%)",
        "mesh-cyan": "radial-gradient(at 30% 20%, rgba(6,182,212,0.12) 0px, transparent 50%)",
        "grid-lines": "linear-gradient(rgba(6,182,212,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.04) 1px, transparent 1px)",
      },
      animation: {
        "float-a": "floatA 9s ease-in-out infinite",
        "float-b": "floatB 7s ease-in-out infinite",
        "float-c": "floatC 11s ease-in-out infinite",
        "scan": "scan 4s linear infinite",
        "pulse-ring": "pulseRing 2.5s ease-out infinite",
        "shimmer": "shimmer 3s linear infinite",
        "text-glow-pulse": "textGlowPulse 3s ease-in-out infinite",
        "border-flow": "borderFlow 4s linear infinite",
      },
      keyframes: {
        floatA: {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(20px,-30px) scale(1.05)" },
          "66%": { transform: "translate(-15px,15px) scale(0.97)" },
        },
        floatB: {
          "0%,100%": { transform: "translate(0,0)" },
          "50%": { transform: "translate(-25px,-20px)" },
        },
        floatC: {
          "0%,100%": { transform: "translate(0,0) rotate(0deg)" },
          "40%": { transform: "translate(18px,25px) rotate(5deg)" },
          "80%": { transform: "translate(-10px,-15px) rotate(-3deg)" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        pulseRing: {
          "0%": { transform: "scale(0.9)", opacity: "1" },
          "100%": { transform: "scale(1.8)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        textGlowPulse: {
          "0%,100%": { textShadow: "0 0 20px rgba(6,182,212,0.4), 0 0 40px rgba(6,182,212,0.1)" },
          "50%": { textShadow: "0 0 30px rgba(6,182,212,0.7), 0 0 60px rgba(6,182,212,0.25), 0 0 100px rgba(6,182,212,0.1)" },
        },
        borderFlow: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      boxShadow: {
        "cyan-sm": "0 0 15px rgba(6,182,212,0.2)",
        "cyan-md": "0 0 30px rgba(6,182,212,0.25), 0 0 60px rgba(6,182,212,0.08)",
        "cyan-lg": "0 0 50px rgba(6,182,212,0.3), 0 0 100px rgba(6,182,212,0.1)",
        "indigo-sm": "0 0 20px rgba(99,102,241,0.2)",
        "card": "0 4px 30px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)",
        "card-hover": "0 8px 50px rgba(0,0,0,0.6), 0 0 0 1px rgba(6,182,212,0.15), 0 0 30px rgba(6,182,212,0.08)",
      },
    },
  },
  plugins: [],
};
export default config;
