"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

type Skill = { id: number; name: string };
type Section = { id: number; name: string; color: string; skills: Skill[] };

const TECH_TAGS = [
  "Next.js", "React", "Node.js", "FastAPI", "Python",
  "PostgreSQL", "MongoDB", "Redis", "TypeScript", "Tailwind CSS",
  "Docker", "AWS", "LangChain", "Socket.IO", "WebRTC",
  "Firebase", "Supabase", "Stripe", "Playwright", "Jest",
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    fetch("/api/skills").then((r) => r.json()).then(setSections).catch(console.error);
  }, []);

  return (
    <section id="skills" className="relative py-32 overflow-hidden" ref={ref}>
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="orb w-96 h-96 bg-cyan-500/5 left-0 top-1/2 -translate-y-1/2" />
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }} className="flex items-center gap-3 mb-4">
          <span className="font-mono-code text-xs text-cyan-500 tracking-[0.25em] uppercase">02 —</span>
          <span className="font-mono-code text-xs text-slate-500 tracking-wider uppercase">Skills & Technologies</span>
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 25 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }} className="font-display font-bold text-5xl md:text-6xl text-white mb-4">
          Tech I <span className="text-cyan-gradient">Use</span>
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }} className="text-slate-400 mb-14 max-w-xl text-[15px]">
          A collection of modern tools chosen for performance and scalability.
        </motion.p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {sections.map((group, gi) => (
            <motion.div key={group.id} initial={{ opacity: 0, y: 35 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: gi * 0.1, ease: [0.16, 1, 0.3, 1] }} whileHover={{ y: -5, transition: { duration: 0.2 } }} className="group grad-border">
              <div className="relative glass rounded-2xl p-5 h-full overflow-hidden">
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(ellipse at top left, ${group.color}08, transparent 70%)` }} />
                <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(to right, transparent, ${group.color}50, transparent)` }} />
                <div className="relative z-10">
                  <span className="font-mono-code text-xs tracking-widest uppercase mb-4 block" style={{ color: group.color }}>{group.name}</span>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span key={skill.id} className="px-3 py-1.5 rounded-lg text-xs font-mono-code text-slate-300 transition-all duration-200 cursor-default" style={{ background: `${group.color}0d`, border: `1px solid ${group.color}22` }}
                        onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = `${group.color}1a`; el.style.borderColor = `${group.color}55`; el.style.color = group.color; el.style.boxShadow = `0 0 12px ${group.color}18`; el.style.transform = "translateY(-2px)"; }}
                        onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = `${group.color}0d`; el.style.borderColor = `${group.color}22`; el.style.color = ""; el.style.boxShadow = ""; el.style.transform = ""; }}
                      >{skill.name}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
       
      </div>
    </section>
  );
}
