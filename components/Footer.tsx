"use client";
import { motion } from "framer-motion";
import { Github, Linkedin, Globe, Mail, Terminal, ArrowUp, Phone } from "lucide-react";

const SOCIALS = [
  { icon: Github, href: "https://github.com/MuhammadOsman381", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/mosman257", label: "LinkedIn" },
  { icon: Phone, label: "Phone", value: "+92 318 852 3220", href: "tel:+923188523220" },
  { icon: Mail, href: "mailto:mosman257@gmail.com", label: "Email" },
];

const NAV = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.04] pt-14 pb-8 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-24 bg-cyan-500/4 blur-[80px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="relative w-9 h-9 flex items-center justify-center">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400/20 to-indigo-500/20 border border-cyan-500/25" />
                <Terminal size={16} className="relative z-10 text-cyan-400" />
              </div>
              <div>
                <span className="font-display text-base font-bold tracking-wider text-white uppercase">M. Osman</span>
                <p className="font-mono-code text-[9px] text-cyan-500/50 tracking-widest">FULL STACK DEV</p>
              </div>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Building high-performance, elegant web applications from Pakistan to the world.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="font-mono-code text-[10px] text-slate-600 uppercase tracking-widest mb-4">Navigation</p>
            <div className="grid grid-cols-2 gap-2">
              {NAV.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-slate-500 hover:text-cyan-400 transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Socials + CTA */}
          <div>
            <p className="font-mono-code text-[10px] text-slate-600 uppercase tracking-widest mb-4">Connect</p>
            <div className="flex flex-wrap gap-2.5 mb-5">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  whileHover={{ y: -2, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                  className="w-9 h-9 rounded-xl glass border border-white/6 flex items-center justify-center text-slate-500 hover:text-cyan-400 hover:border-cyan-500/30 transition-colors duration-300"
                >
                  <Icon size={14} />
                </motion.a>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono-code text-xs text-slate-500">Available for freelance & roles</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono-code text-xs text-slate-700">
            © {new Date().getFullYear()} Muhammad Osman. All rights reserved.
          </p>
        
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ y: -2 }}
            className="w-8 h-8 rounded-lg glass border border-white/8 flex items-center justify-center text-slate-600 hover:text-cyan-400 hover:border-cyan-500/25 transition-colors duration-300"
          >
            <ArrowUp size={14} />
          </motion.button>
        </div>

        {/* Watermark */}
        <div className="mt-8 overflow-hidden pointer-events-none select-none">
          <p
            className="font-display font-bold text-center text-white/[0.02] leading-none tracking-tight"
            style={{ fontSize: "clamp(3rem, 13vw, 10rem)" }}
          >
            MUHAMMAD OSMAN
          </p>
        </div>
      </div>
    </footer>
  );
}
