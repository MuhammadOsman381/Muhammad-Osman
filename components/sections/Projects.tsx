"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Github, ExternalLink, Star, ChevronRight } from "lucide-react";

type Project = {
  id: number; title: string; subtitle: string; description: string;
  stack: string[]; github: string; live: string; accent: string;
  accentB: string; featured: boolean; stars: number;
};

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState<number | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch("/api/projects").then((r) => r.json()).then(setProjects).catch(console.error);
  }, []);

  return (
    <section id="projects" className="relative py-32 overflow-hidden" ref={ref}>
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="orb w-[500px] h-96 bg-violet-600/5 right-0 bottom-0" />
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} className="flex items-center gap-3 mb-4">
          <span className="font-mono-code text-xs text-cyan-500 tracking-[0.25em] uppercase">03 —</span>
          <span className="font-mono-code text-xs text-slate-500 tracking-wider uppercase">My Creations</span>
        </motion.div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-5xl md:text-6xl text-white"
          >
            Projects That <span className="text-cyan-gradient">Shine</span>
          </motion.h2>
          <motion.a initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }} href="https://github.com/MuhammadOsman381" target="_blank" className="group flex items-center gap-1.5 text-sm text-slate-500 hover:text-cyan-400 transition-colors font-body-custom">
            All on GitHub <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <motion.div key={project.id} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
              onHoverStart={() => setHovered(project.id)} onHoverEnd={() => setHovered(null)}
              whileHover={{ y: -6, transition: { duration: 0.2 } }} className="group grad-border"
              style={{ filter: hovered === project.id ? `drop-shadow(0 0 20px ${project.accent}20)` : "none", transition: "filter 0.3s ease" }}>
              <div className="relative glass rounded-2xl p-6 h-full flex flex-col overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(to right, transparent, ${project.accent}70, transparent)` }} />
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(ellipse at top, ${project.accent}06, transparent 60%)` }} />
                <div className="relative z-10 flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono-code text-[10px] tracking-widest uppercase" style={{ color: project.accent }}>{project.subtitle}</span>
                    </div>
                    <h3 className="font-display font-bold text-xl text-white group-hover:text-glow-cyan transition-all duration-300">{project.title}</h3>
                  </div>
                </div>
                <p className="relative z-10 text-slate-400 text-[13px] leading-relaxed mb-5 flex-1">{project.description}</p>
                <div className="relative z-10 flex flex-wrap gap-1.5 mb-5">
                  {project.stack.map((tech) => (
                    <span key={tech} className="px-2.5 py-1 rounded-lg text-[11px] font-mono-code glass text-slate-400 border border-white/6 group-hover:border-white/10 transition-colors">{tech}</span>
                  ))}
                </div>
                <div className="relative z-10 flex gap-3 pt-4 border-t border-white/5">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-white transition-colors font-body-custom"><Github size={14} /> GitHub</a>
                  {project.live !== "#" && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs transition-colors font-body-custom" style={{ color: project.accent + "99" }}><ExternalLink size={14} /> Live Demo</a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
