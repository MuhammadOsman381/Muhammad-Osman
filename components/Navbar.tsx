"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal } from "lucide-react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "glass-strong border-b border-white/[0.04] py-3" : "bg-transparent py-5"
          }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">

          <a href="#" className="group flex items-center gap-2.5">
            <div className="relative w-9 h-9 flex items-center justify-center">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400/20 to-indigo-500/20 border border-cyan-500/25 group-hover:border-cyan-400/50 transition-all duration-300" />
              <div className="absolute inset-0 rounded-xl bg-cyan-500/10 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300" />
              <Terminal size={16} className="relative z-10 text-cyan-400" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-base font-bold tracking-wider text-white uppercase" style={{ letterSpacing: "0.12em" }}>
                M. Osman
              </span>
              <span className="font-mono-code text-[9px] text-cyan-500/70 tracking-widest">FULL STACK DEV</span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i + 0.35 }}
                onClick={() => setActive(link.label)}
                className={`relative px-4 py-2 text-sm font-body-custom tracking-wide rounded-lg group transition-all duration-300 ${active === link.label ? "text-cyan-300" : "text-slate-400 hover:text-slate-200"
                  }`}
              >
                {active === link.label && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-lg bg-cyan-500/8 border border-cyan-500/15"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
                <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 h-px w-0 bg-gradient-to-r from-cyan-400 to-indigo-400 group-hover:w-4 transition-all duration-300 rounded-full" />
              </motion.a>
            ))}
          </nav>

          {/* CTA */}
          <motion.a
            href="#contact"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="hidden md:flex items-center gap-2 relative px-5 py-2.5 rounded-xl overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/80 to-indigo-600/80 group-hover:from-cyan-500/90 group-hover:to-indigo-500/90 transition-all duration-300" />
            <div className="absolute inset-0 btn-light" />
            <span className="relative z-10 text-sm font-medium text-white">Hire Me</span>
          </motion.a>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-slate-400 hover:text-white transition-colors p-1"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[68px] left-4 right-4 z-40 glass-strong rounded-2xl p-5 border border-white/6"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/8 rounded-xl transition-all duration-200 font-medium"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50" />
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-3 flex items-center justify-center py-3 rounded-xl bg-gradient-to-r from-cyan-600/80 to-indigo-600/80 text-white font-medium text-sm"
            >
              Hire Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
