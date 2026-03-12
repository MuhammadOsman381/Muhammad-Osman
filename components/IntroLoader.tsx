"use client";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

export default function IntroLoader() {
  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[200] bg-obsidian flex flex-col items-center justify-center gap-6 overflow-hidden"
    >
      {/* Grid */}
      <div className="absolute inset-0 animated-grid opacity-50" />

      {/* Pulsing rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-cyan-500/20"
          style={{ width: 80 + i * 60, height: 80 + i * 60 }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}

      {/* Logo */}
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.7, ease: "backOut" }}
        className="relative w-16 h-16 flex items-center justify-center"
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-600/30 to-indigo-600/30 border border-cyan-500/30" />
        <div className="absolute inset-0 rounded-2xl bg-cyan-500/10 blur-md" />
        <Terminal size={28} className="relative z-10 text-cyan-400" />
      </motion.div>

      {/* Progress */}
      <div className="w-40 h-px bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="font-mono-code text-xs text-slate-600 tracking-[0.3em] uppercase"
      >
        Loading Portfolio...
      </motion.div>
    </motion.div>
  );
}
