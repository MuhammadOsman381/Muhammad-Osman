"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Code2, FolderOpen, Briefcase, MessageSquare, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ skills: 0, projects: 0, experience: 0, messages: 0, unread: 0 });

  useEffect(() => {
    Promise.all([
      fetch("/api/skills").then((r) => r.json()),
      fetch("/api/projects").then((r) => r.json()),
      fetch("/api/experience").then((r) => r.json()),
      fetch("/api/contact").then((r) => r.json()),
    ]).then(([skills, projects, experience, messages]) => {
      const totalSkills = Array.isArray(skills) ? skills.reduce((a: number, s: { skills: unknown[] }) => a + s.skills.length, 0) : 0;
      setCounts({
        skills: totalSkills,
        projects: Array.isArray(projects) ? projects.length : 0,
        experience: Array.isArray(experience) ? experience.length : 0,
        messages: Array.isArray(messages) ? messages.length : 0,
        unread: Array.isArray(messages) ? messages.filter((m: { read: boolean }) => !m.read).length : 0,
      });
    }).catch(console.error);
  }, []);

  const cards = [
    { label: "Skills", value: counts.skills, icon: Code2, color: "#06b6d4", href: "/admin/skills", desc: "Manage skill sections & items" },
    { label: "Projects", value: counts.projects, icon: FolderOpen, color: "#6366f1", href: "/admin/projects", desc: "Add or edit portfolio projects" },
    { label: "Experience", value: counts.experience, icon: Briefcase, color: "#2dd4bf", href: "/admin/experience", desc: "Work history & positions" },
    { label: "Messages", value: counts.messages, icon: MessageSquare, color: "#a855f7", href: "/admin/messages", desc: `${counts.unread} unread messages`, badge: counts.unread },
  ];

  return (
    <div className="br" >
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-white mb-1">Welcome back 👋</h1>
        <p className="text-slate-500 text-sm">Manage your portfolio content from here.</p>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {cards.map(({ label, value, icon: Icon, color, href, desc, badge }, i) => (
          <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Link href={href} className="group block glass rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
                  <Icon size={20} style={{ color }} />
                </div>
                {badge ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono-code bg-red-500/15 text-red-400 border border-red-500/20">{badge} new</span>
                ) : null}
              </div>
              <div className="font-display text-3xl font-bold text-white mb-1">{value}</div>
              <div className="font-display font-semibold text-white mb-1">{label}</div>
              <div className="text-slate-500 text-xs mb-4">{desc}</div>
              <div className="flex items-center gap-1 text-xs font-mono-code group-hover:gap-2 transition-all duration-200" style={{ color }}>
                Manage <ArrowRight size={12} />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
     
    </div>
  );
}
