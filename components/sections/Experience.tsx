"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Calendar, MapPin, ChevronRight } from "lucide-react";

type Experience = {
  id: number; role: string; company: string; location: string;
  duration: string; type: string; accentColor: string;
  highlights: string[]; stack: string[];
};

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    fetch("/api/experience").then((r) => r.json()).then(setExperiences).catch(console.error);
  }, []);

  return (
    <section id="experience" className="relative py-32 overflow-hidden" ref={ref}>
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="orb w-80 h-80 bg-cyan-500/5 right-1/4 top-1/2 -translate-y-1/2" />
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} className="flex items-center gap-3 mb-4">
          <span className="font-mono-code text-xs text-cyan-500 tracking-[0.25em] uppercase">04 —</span>
          <span className="font-mono-code text-xs text-slate-500 tracking-wider uppercase">Experience</span>
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 25 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="font-display font-bold text-5xl md:text-6xl text-white mb-4">
          Where I&apos;ve <span className="text-cyan-gradient">Worked</span>
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }} className="text-slate-400 mb-14 max-w-xl text-[15px]">
          Professional roles and projects that shaped how I think about software.
        </motion.p>
        <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-5">
          {experiences.map((exp, i) => (
            <motion.div key={exp.id} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }} whileHover={{ y: -5, transition: { duration: 0.2 } }} className="group grad-border">
              <div className="relative glass rounded-2xl p-7 h-full flex flex-col overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(to right, transparent, ${exp.accentColor}60, transparent)` }} />
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(ellipse at top, ${exp.accentColor}06, transparent 60%)` }} />
                <div className="relative z-10 mb-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${exp.accentColor}12`, border: `1px solid ${exp.accentColor}25` }}>
                      <Briefcase size={18} style={{ color: exp.accentColor }} />
                    </div>
                    <span className="font-mono-code text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider" style={{ background: `${exp.accentColor}10`, color: exp.accentColor, border: `1px solid ${exp.accentColor}25` }}>{exp.type}</span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-white mb-1">{exp.role}</h3>
                  <p className="font-body-custom font-semibold text-sm mb-3" style={{ color: exp.accentColor }}>{exp.company}</p>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500"><Calendar size={11} /><span className="font-mono-code">{exp.duration}</span></div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500"><MapPin size={11} /><span>{exp.location}</span></div>
                  </div>
                </div>
                <div className="relative z-10 space-y-2.5 flex-1 mb-5">
                  {exp.highlights.map((h, j) => (
                    <div key={j} className="flex gap-2.5 text-[13px] text-slate-400">
                      <ChevronRight size={13} className="shrink-0 mt-0.5" style={{ color: exp.accentColor + "80" }} />
                      <span className="leading-relaxed">{h}</span>
                    </div>
                  ))}
                </div>
                <div className="relative z-10 flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                  {exp.stack.map((s) => (
                    <span key={s} className="skill-tag px-2.5 py-1 rounded-lg text-[10px] font-mono-code">{s}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
