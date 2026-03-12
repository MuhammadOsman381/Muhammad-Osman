"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, GraduationCap, Coffee, Lightbulb, Github, Linkedin, Globe, Mail, Phone } from "lucide-react";
import * as Icons from "lucide-react";

const HIGHLIGHTS = [
  { icon: MapPin, text: "Multan, Pakistan · Remote Worldwide" },
  { icon: GraduationCap, text: "BSCS — NFC-IET Multan (2026)" },
  { icon: Lightbulb, text: "AI-powered app enthusiast" },
];

const STATS = [
  { value: "10+", label: "Projects Shipped" },
  { value: "1+", label: "Years Experience" },
  { value: "5", label: "AI Systems Built" },
  { value: "100%", label: "Remote Ready" },
];

const SOCIALS = [
  { icon: Github, href: "https://github.com/MuhammadOsman381", label: "GitHub", color: "#06b6d4" },
  { icon: Linkedin, href: "https://linkedin.com/in/mosman257", label: "LinkedIn", color: "#6366f1" },
  { icon: Phone, label: "Phone", value: "+92 318 852 3220", href: "tel:+923188523220", color: "#6366f1" },
  { icon: Mail, href: "mailto:mosman257@gmail.com", label: "Email", color: "#a855f7" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

type Experience = {
  id: number; role: string; company: string; location: string;
  duration: string; type: string; accentColor: string;
  highlights: string[]; stack: string[];
};



interface StringIconsProps {
  iconStringFromDB: string;
  size?: number;
}

const StringIcons = ({ iconStringFromDB, size = 24 }: StringIconsProps) => {
  // Clean the string from DB to match icon names if needed
  const cleanIconName = iconStringFromDB.replace(/\s+/g, '');
  const IconComponent = (Icons as any)[cleanIconName];

  return IconComponent ? <IconComponent size={size} /> : <span>{iconStringFromDB}</span>;
};


export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });



  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [about, setAbout] = useState({
    bio: "",
    highlights: [{ icon: "", text: "" }]
  })
  const [states, setStates] = useState<{ value: string | number; label: string }[]>([]);

  const [project, setProject] = useState({
    title: "",
    description: "",
    technologies: [""]
  })

  async function getAbout() {
    try {
      const res = await fetch("/api/about");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setAbout({
        bio: data.data.bio,
        highlights: data.data.highlights,
      })
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  }


  async function getState() {
    try {
      const res = await fetch("/api/state");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();

      // Map API response into array of { value, label }
      setStates([
        { value: data.shipped || 0, label: "Projects Shipped" },
        { value: data.aiProjects || 0, label: "AI Systems Built" },
        { value: data.experience || 0, label: "Years Experience" },
        { value: "100%", label: "Remote Ready" },
      ]);

      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  }


  async function getProject() {
    try {
      const res = await fetch("/api/current-project");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setProject(data)
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  }


  useEffect(() => {
    fetch("/api/experience").then((r) => r.json()).then(setExperiences).catch(console.error);
  }, []);

  useEffect(() => {
    getAbout()
    getState()
    getProject()
  }, [])
  return (
    <section id="about" className="relative py-32 overflow-hidden" ref={ref}>
      <div className="section-divider mb-0 absolute top-0 left-0 right-0" />
      <div className="orb w-80 h-80 bg-indigo-500/6 right-0 top-1/2 -translate-y-1/2" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {/* Section label */}
          <motion.div variants={item} className="flex items-center gap-3 mb-4">
            <span className="font-mono-code text-xs text-cyan-500 tracking-[0.25em] uppercase">01 —</span>
            <span className="font-mono-code text-xs text-slate-500 tracking-wider uppercase">About Me</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <div>
              <motion.h2
                variants={item}
                className="font-display font-bold text-5xl md:text-6xl text-white mb-6 leading-tight"
              >
                Building <span className="text-cyan-gradient">Digital Experiences</span>
              </motion.h2>

              <motion.p variants={item} className="text-slate-400 leading-relaxed mb-4 text-[15px]">
                {about?.bio}
              </motion.p>

              {/* <motion.p variants={item} className="text-slate-400 leading-relaxed mb-8 text-[15px]">
                Currently pursuing my BSCS at NFC-IET Multan while shipping production-ready applications.
                My sweet spot is building AI-powered web apps with Next.js, FastAPI, and LangChain — turning
                complex problems into elegant, intuitive solutions.
              </motion.p> */}

              {/* Highlights */}
              <motion.div variants={container} className="space-y-3">
                {about?.highlights?.map(({ icon, text }) => (
                  <motion.div
                    key={text}
                    variants={item}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/8 border border-cyan-500/15 flex items-center justify-center shrink-0 group-hover:bg-cyan-500/15 group-hover:border-cyan-400/30 transition-all duration-300">
                      <StringIcons iconStringFromDB={icon} size={18} />
                    </div>
                    <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">{text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right: Stats + Socials */}
            <div className="space-y-5">

              {/* Stats grid */}
              <motion.div variants={item}>
                <div className="grid grid-cols-2 gap-3">
                  {states.map(({ value, label }, i) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.1 * i + 0.4, ease: "backOut" }}
                      whileHover={{ y: -3, transition: { duration: 0.2 } }}
                      className="group relative glass rounded-2xl p-5 overflow-hidden cursor-default"
                    >
                      {/* Hover glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative z-10">
                        <div className="font-display font-bold text-3xl text-glow-cyan mb-1">{value}</div>
                        <div className="font-mono-code text-[10px] text-slate-500 uppercase tracking-wider">{label}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Connect card */}
              {/* <motion.div
                variants={item}
                className="relative glass rounded-2xl p-6 overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent" />
                <p className="font-mono-code text-[10px] text-slate-600 uppercase tracking-widest mb-4">
                  Find me online
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {SOCIALS.map(({ icon: Icon, href, label, color }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 3, transition: { duration: 0.2 } }}
                      className="group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300"
                      style={{ background: `${color}08`, border: `1px solid ${color}15` }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.background = `${color}15`;
                        el.style.borderColor = `${color}35`;
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.background = `${color}08`;
                        el.style.borderColor = `${color}15`;
                      }}
                    >
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: `${color}15` }}
                      >
                        <Icon size={13} style={{ color }} />
                      </div>
                      <span className="font-mono-code text-xs text-slate-400 group-hover:text-slate-200 transition-colors">
                        {label}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </motion.div> */}

              {/* Currently building */}
              <motion.div
                variants={item}
                className="relative glass rounded-2xl p-6 overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <p className="font-mono-code text-[10px] text-emerald-400 uppercase tracking-widest">
                    Currently Building
                  </p>
                </div>
                <p className="text-white font-medium text-sm mb-1">{project.title}</p>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono-code text-cyan-400/70 bg-cyan-500/8 border border-cyan-500/15"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}