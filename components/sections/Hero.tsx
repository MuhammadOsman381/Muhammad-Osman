"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Download, ChevronDown, Code2, Server, Globe } from "lucide-react";
import Image from "next/image";
import mo from "../../assets/mo-img.jpeg"

const ROLES = ["Full Stack Developer", "React Specialist", "API Architect", "AI Integrator"];

function TypewriterRoles() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % ROLES.length), 3000);
    return () => clearInterval(t);
  }, []);
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={idx}
        initial={{ y: 20, opacity: 0, filter: "blur(4px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        exit={{ y: -20, opacity: 0, filter: "blur(4px)" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="text-glow-cyan inline-block"
      >
        {ROLES[idx]}
      </motion.span>
    </AnimatePresence>
  );
}

function Particle({ x, y, size, delay, color }: {
  x: number; y: number; size: number; delay: number; color: string;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, background: color }}
      animate={{ opacity: [0, 0.7, 0], scale: [0.5, 1.2, 0.5], y: [0, -40, 0] }}
      transition={{ duration: 5 + Math.random() * 3, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  x: 5 + (i * 4.7) % 92,
  y: 10 + (i * 7.3) % 80,
  size: 2 + (i % 4),
  delay: i * 0.4,
  color:
    i % 3 === 0 ? "rgba(6,182,212,0.5)"
      : i % 3 === 1 ? "rgba(99,102,241,0.4)"
        : "rgba(34,211,238,0.35)",
}));

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const [url, setUrl] = useState("");

  useEffect(() => {
    fetch("/api/cv").then(r => r.json()).then(d => setUrl(d.url));
  }, []);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 animated-grid opacity-70" />
      <div className="absolute inset-0 scanline-overlay" />
      <div className="orb w-[700px] h-[500px] bg-cyan-500/8 top-[-10%] left-[-10%] animate-float-a" />
      <div className="orb w-[500px] h-[500px] bg-indigo-500/7 bottom-[-5%] right-[-8%] animate-float-b" />
      <div className="orb w-[400px] h-[400px] bg-violet-600/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      {PARTICLES.map((p, i) => <Particle key={i} {...p} />)}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-500/5"
        style={{ width: 650, height: 650 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-500/4"
        style={{ width: 900, height: 900 }}
        animate={{ rotate: -360 }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-24 pb-16"
      >
        <div className="flex flex-col lg:grid lg:grid-cols-5 gap-6 lg:gap-12 items-center">

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 flex items-center justify-center lg:order-last"
          >
            <div className="relative flex items-center justify-center">
              <div className="absolute w-48 h-48 lg:w-64 lg:h-64 rounded-full bg-gradient-to-br from-cyan-500/25 to-indigo-600/20 blur-2xl" />
              <motion.div
                className="absolute w-[160px] h-[160px] lg:w-[280px] lg:h-[280px] rounded-full border border-dashed border-cyan-500/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute w-[195px] h-[195px] lg:w-[320px] lg:h-[320px] rounded-full border border-dashed border-indigo-500/10"
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
              <div
                className="relative w-60 h-60 lg:w-80 lg:h-80 rounded-full overflow-hidden border-2 border-cyan-500/30 shrink-0"
                style={{ boxShadow: "0 0 40px rgba(6,182,212,0.2), 0 0 80px rgba(6,182,212,0.08)" }}
              >
                <Image src={mo} alt="Muhammad Osman" fill className="object-contain bg-white object-center" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/30 via-transparent to-transparent" />
              </div>
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 -right-4 glass border-cyan-glow rounded-xl px-3 py-2 flex items-center gap-2"
              >
                <Code2 size={13} className="text-cyan-400" />
                <span className="font-mono-code text-[11px] text-slate-300">Full Stack</span>
              </motion.div>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-0 -left-4 glass border-cyan-glow rounded-xl px-3 py-2 flex items-center gap-2"
              >
                <Server size={13} className="text-indigo-400" />
                <span className="font-mono-code text-[11px] text-slate-300">AI + APIs</span>
              </motion.div>
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-4 -right-8 glass border-cyan-glow rounded-xl px-3 py-2 flex items-center gap-2"
              >
                <Globe size={13} className="text-teal-400" />
                <span className="font-mono-code text-[11px] text-slate-300">Remote Ready</span>
              </motion.div>
            </div>
          </motion.div>

          <div className="lg:col-span-3 min-w-0 lg:order-first text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2.5 glass border-cyan-glow rounded-full px-4 py-2 mb-6"
            >
              <span className="relative flex w-2.5 h-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-emerald-400" />
              </span>
              <span className="font-mono-code text-xs text-slate-400 tracking-wider">Available for hire</span>
              <span className="w-px h-3.5 bg-white/10" />
              <span className="font-mono-code text-xs text-cyan-400">Open to remote</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono-code text-sm text-cyan-500/70 tracking-[0.3em] uppercase mb-3"
            >
              Hello, I&apos;m
            </motion.p>

            <div className="mb-4">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
                className="font-display font-bold leading-[1.05] tracking-tight text-cyan-gradient"
                style={{ fontSize: "clamp(2.8rem, 7.5vw, 6rem)" }}
              >
                Muhammad
              </motion.h1>
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
                className="font-display font-bold leading-[1.05] tracking-tight text-white"
                style={{ fontSize: "clamp(2.8rem, 7.5vw, 6rem)" }}
              >
                Osman
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="font-display text-xl md:text-2xl font-medium mb-4 h-9 flex items-center lg:justify-start justify-center"
            >
              <TypewriterRoles />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="text-slate-400 leading-relaxed mb-7 max-w-lg text-[15px] mx-auto lg:mx-0"
            >
              I build high-performance web applications from frontend to backend, focusing on clean code and great user experience.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-indigo-600" />
                <div className="absolute inset-0 btn-light" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-cyan-500 to-indigo-500" />
                <span className="relative z-10 font-medium text-white text-sm tracking-wide">View Projects</span>
                <ArrowRight className="relative z-10 w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href={url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl glass border-cyan-glow text-slate-300 hover:text-white hover:border-cyan-400/40 transition-all duration-300"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium tracking-wide">Download CV</span>
              </a>
            </motion.div>
          </div>

        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer group"
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
      >
        <span className="font-mono-code text-[10px] text-slate-600 tracking-[0.2em] uppercase group-hover:text-slate-400 transition-colors">
          Scroll
        </span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ChevronDown size={16} className="text-slate-600 group-hover:text-cyan-500 transition-colors" />
        </motion.div>
      </motion.div>
    </section>
  );
}