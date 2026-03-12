"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    User, Plus, Trash2, BarChart3, FolderOpen,
    Brain, Clock, Cpu, FileText, Loader2, CheckCircle2,
    MapPin, GraduationCap, Coffee, Lightbulb, Star, Heart, Zap, Globe, Code2, Briefcase,
} from "lucide-react";

type HighlightItem = { icon: string; text: string };
type AboutForm = { bio: string; highlights: HighlightItem[] };
type StatsForm = { shippedProjects: number; yearsExperience: number; aiProjects: number };
type CurrentProjectForm = { title: string; description: string; technologies: string[] };

const INPUT = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-cyan-500/40 transition-all duration-200";
const LABEL = "block font-mono-code text-[10px] uppercase tracking-widest text-slate-500 mb-2";
const TEXTAREA = `${INPUT} resize-none`;

const ICON_OPTIONS = [
    { key: "MapPin", icon: MapPin, label: "Location" },
    { key: "GraduationCap", icon: GraduationCap, label: "Education" },
    { key: "Coffee", icon: Coffee, label: "Coffee" },
    { key: "Lightbulb", icon: Lightbulb, label: "Idea" },
    { key: "Star", icon: Star, label: "Star" },
    { key: "Heart", icon: Heart, label: "Heart" },
    { key: "Zap", icon: Zap, label: "Zap" },
    { key: "Globe", icon: Globe, label: "Globe" },
    { key: "Code2", icon: Code2, label: "Code" },
    { key: "Briefcase", icon: Briefcase, label: "Work" },
];

const ICON_MAP: Record<string, React.ElementType> = {
    MapPin, GraduationCap, Coffee, Lightbulb, Star, Heart, Zap, Globe, Code2, Briefcase,
};

function SuccessBanner({ message, onDismiss }: { message: string; onDismiss: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-5"
        >
            <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
            <span className="text-emerald-400 text-sm flex-1">{message}</span>
            <button onClick={onDismiss} className="text-emerald-600 hover:text-emerald-400 transition-colors font-mono-code text-xs">✕</button>
        </motion.div>
    );
}

function FormCard({ children, color = "#06b6d4" }: { children: React.ReactNode; color?: string }) {
    return (
        <div className="relative glass rounded-3xl overflow-hidden" style={{ border: `1px solid ${color}20` }}>
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, transparent, ${color}50, transparent)` }} />
            <div className="p-8">{children}</div>
        </div>
    );
}

function FormHeader({ icon: Icon, color, label, title }: { icon: React.ElementType; color: string; label: string; title: string }) {
    return (
        <div className="flex items-center gap-3 mb-7">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
                <Icon size={18} style={{ color }} />
            </div>
            <div>
                <span className="font-mono-code text-[10px] tracking-widest uppercase" style={{ color }}>{label}</span>
                <h2 className="font-display font-bold text-xl text-white leading-none">{title}</h2>
            </div>
        </div>
    );
}

export default function Page() {

    // ── About ────────────────────────────────────────────────────────────────
    const [about, setAbout] = useState<AboutForm>({
        bio: "",
        highlights: [{ icon: "MapPin", text: "" }],
    });
    const [savingAbout, setSavingAbout] = useState(false);
    const [savedAbout, setSavedAbout] = useState(false);
    const [openIconPicker, setOpenIconPicker] = useState<number | null>(null);

    const updateHighlight = (i: number, field: keyof HighlightItem, val: string) => {
        const arr = [...about.highlights];
        arr[i] = { ...arr[i], [field]: val };
        setAbout({ ...about, highlights: arr });
    };
    const addHighlight = () => setAbout({ ...about, highlights: [...about.highlights, { icon: "Star", text: "" }] });
    const removeHighlight = (i: number) => setAbout({ ...about, highlights: about.highlights.filter((_, j) => j !== i) });

    const submitAbout = async () => {
        setSavingAbout(true);
        fetch(`/api/about`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(about) }).then(() => { setSavingAbout(false); }).finally(() => { setSavedAbout(true); })
    };

    // ── Stats ────────────────────────────────────────────────────────────────
    const [stats, setStats] = useState<StatsForm>({ shippedProjects: 0, yearsExperience: 0, aiProjects: 0 });
    const [savingStats, setSavingStats] = useState(false);
    const [savedStats, setSavedStats] = useState(false);

    const submitStats = async () => {
        setSavingStats(true);
        const payload = {
            shipped: stats.shippedProjects, experience: stats.yearsExperience, aiProjects: stats.aiProjects
        }
        fetch(`/api/state`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }).then(() => {
            setSavingStats(false);
        }).finally(() => {
            setSavedStats(true);
        })
    };

    // ── Current project ──────────────────────────────────────────────────────
    const [project, setProject] = useState<CurrentProjectForm>({ title: "", description: "", technologies: [""] });
    const [savingProject, setSavingProject] = useState(false);
    const [savedProject, setSavedProject] = useState(false);

    const updateTech = (i: number, val: string) => { const a = [...project.technologies]; a[i] = val; setProject({ ...project, technologies: a }); };
    const addTech = () => setProject({ ...project, technologies: [...project.technologies, ""] });
    const removeTech = (i: number) => setProject({ ...project, technologies: project.technologies.filter((_, j) => j !== i) });

    const submitProject = async () => {
        setSavingProject(true);
        fetch(`/api/current-project`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(project) }).then(() => {
            setSavingProject(false);
            setSavedProject(true);
        })
    };

    async function getAbout() {
        try {
            const res = await fetch("/api/about");
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            console.log(data.data)
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
            setStats({
                aiProjects: data.aiProjects,
                shippedProjects: data.shipped,
                yearsExperience: data.experience
            })
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
        getAbout()
        getState()
        getProject()
    }, [])

    return (
        <div className="min-h-screen bg-[#050508] ">
            <div className="absolute inset-0 animated-grid opacity-30" />
            <div className="orb w-96 h-96 bg-cyan-500/8 top-0 left-0" />
            <div className="orb w-96 h-96 bg-indigo-500/8 bottom-0 right-0" />

            <div className="relative z-10 max-w-3xl  space-y-6">

                <div className=" ">
                    <span className="font-mono-code text-[10px] text-cyan-500 tracking-[0.25em] uppercase">Portfolio</span>
                    <h1 className="font-display font-bold text-3xl text-white mt-1">Content Manager</h1>
                    <p className="text-slate-500 text-sm mt-1">Update each section independently.</p>
                </div>

                {/* ── Form 1: About ──────────────────────────────────────────────── */}
                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
                    <FormCard color="#06b6d4">
                        <FormHeader icon={User} color="#06b6d4" label="Form 1 · About" title="About Details" />

                        <AnimatePresence>
                            {savedAbout && <SuccessBanner message="About saved successfully!" onDismiss={() => setSavedAbout(false)} />}
                        </AnimatePresence>

                        <div className="space-y-5">

                            {/* Bio only */}
                            <div>
                                <label className={LABEL}>Bio</label>
                                <textarea
                                    className={TEXTAREA} rows={4}
                                    value={about.bio}
                                    onChange={(e) => setAbout({ ...about, bio: e.target.value })}
                                    placeholder="Short intro about yourself..."
                                />
                            </div>

                            {/* Highlight items with icon picker */}
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <label className={LABEL + " mb-0"}>Stats / Highlights</label>
                                    <button onClick={addHighlight} className="flex items-center gap-1 text-[10px] font-mono-code text-cyan-400 hover:text-cyan-300 transition-colors">
                                        <Plus size={11} /> Add
                                    </button>
                                </div>

                                <div className="space-y-2">
                                    {about.highlights.map((h, i) => {
                                        const SelectedIcon = ICON_MAP[h.icon] || MapPin;
                                        return (
                                            <motion.div key={i} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2">

                                                {/* Icon picker trigger */}
                                                <div className="relative">
                                                    <button
                                                        onClick={() => setOpenIconPicker(openIconPicker === i ? null : i)}
                                                        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 shrink-0 bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20"
                                                    >
                                                        <SelectedIcon size={15} className="text-cyan-400" />
                                                    </button>

                                                    {/* Icon dropdown */}
                                                    <AnimatePresence>
                                                        {openIconPicker === i && (
                                                            <motion.div
                                                                initial={{ opacity: 0, scale: 0.95, y: -4 }}
                                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                                exit={{ opacity: 0, scale: 0.95, y: -4 }}
                                                                transition={{ duration: 0.15 }}
                                                                className="absolute left-0 top-12 z-50 glass rounded-2xl p-3 border border-white/10 grid grid-cols-5 gap-1.5 w-52"
                                                            >
                                                                {ICON_OPTIONS.map(({ key, icon: Ic, label }) => (
                                                                    <button
                                                                        key={key}
                                                                        onClick={() => { updateHighlight(i, "icon", key); setOpenIconPicker(null); }}
                                                                        title={label}
                                                                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150 ${h.icon === key ? "bg-cyan-500/20 border border-cyan-500/30" : "hover:bg-white/8"}`}
                                                                    >
                                                                        <Ic size={14} className={h.icon === key ? "text-cyan-400" : "text-slate-400"} />
                                                                    </button>
                                                                ))}
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>

                                                {/* Text input */}
                                                <div className="flex items-center gap-2 flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 focus-within:border-cyan-500/40 transition-all duration-200">
                                                    <input
                                                        className="flex-1 bg-transparent text-sm text-white placeholder-slate-600 outline-none"
                                                        value={h.text}
                                                        onChange={(e) => updateHighlight(i, "text", e.target.value)}
                                                        placeholder={i === 0 ? "Multan, Pakistan · Remote" : i === 1 ? "BSCS — NFC-IET (2026)" : "Add a highlight..."}
                                                    />
                                                </div>

                                                {about.highlights.length > 1 && (
                                                    <button onClick={() => removeHighlight(i)} className="text-slate-700 hover:text-red-400 transition-colors p-1 shrink-0">
                                                        <Trash2 size={14} />
                                                    </button>
                                                )}
                                            </motion.div>
                                        );
                                    })}
                                </div>

                                {/* Preview */}
                                {about.highlights.filter((h) => h.text).length > 0 && (
                                    <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
                                        <p className="font-mono-code text-[9px] text-slate-600 uppercase tracking-widest mb-2">Preview</p>
                                        {about.highlights.filter((h) => h.text).map((h, i) => {
                                            const Ic = ICON_MAP[h.icon] || MapPin;
                                            return (
                                                <div key={i} className="flex items-center gap-2.5 group">
                                                    <div className="w-7 h-7 rounded-lg bg-cyan-500/8 border border-cyan-500/15 flex items-center justify-center shrink-0">
                                                        <Ic size={12} className="text-cyan-400" />
                                                    </div>
                                                    <span className="text-sm text-slate-400">{h.text}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>

                        <motion.button
                            onClick={submitAbout}
                            disabled={!about.bio.trim() || savingAbout}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="mt-7 w-full relative py-3.5 rounded-xl overflow-hidden group disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-cyan-500" />
                            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors" />
                            <span className="relative z-10 flex items-center justify-center gap-2 text-white font-medium text-sm">
                                {savingAbout ? <><Loader2 size={14} className="animate-spin" />Saving…</> : savedAbout ? <><CheckCircle2 size={14} />Saved!</> : "Save About"}
                            </span>
                        </motion.button>
                    </FormCard>
                </motion.div>

                {/* ── Form 2: Stats ──────────────────────────────────────────────── */}
                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
                    <FormCard color="#6366f1">
                        <FormHeader icon={BarChart3} color="#6366f1" label="Form 2 · Numbers" title="Your Stats" />

                        <AnimatePresence>
                            {savedStats && <SuccessBanner message="Stats saved successfully!" onDismiss={() => setSavedStats(false)} />}
                        </AnimatePresence>

                        <div className="space-y-4">
                            {[
                                { key: "shippedProjects", label: "Shipped Projects", icon: FolderOpen, color: "#06b6d4", suffix: "+" },
                                { key: "yearsExperience", label: "Years of Experience", icon: Clock, color: "#6366f1", suffix: "yrs" },
                                { key: "aiProjects", label: "AI Projects Built", icon: Brain, color: "#a855f7", suffix: "+" },
                            ].map(({ key, label, icon: Icon, color, suffix }) => (
                                <div key={key} className="flex items-center gap-4 bg-white/5 border border-white/8 rounded-2xl px-5 py-4 focus-within:border-white/15 transition-all duration-200">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
                                        <Icon size={18} style={{ color }} />
                                    </div>
                                    <div className="flex-1">
                                        <label className={LABEL + " mb-0.5"}>{label}</label>
                                        <input
                                            type="number" min="0"
                                            className="w-full bg-transparent text-2xl font-display font-bold text-white outline-none placeholder-slate-700"
                                            value={stats[key as keyof StatsForm] || ""}
                                            onChange={(e) => setStats({ ...stats, [key]: parseInt(e.target.value) || 0 })}
                                            placeholder="0"
                                        />
                                    </div>
                                    <span className="font-mono-code text-xs text-slate-600">{suffix}</span>
                                </div>
                            ))}
                        </div>

                        {(stats.shippedProjects > 0 || stats.yearsExperience > 0 || stats.aiProjects > 0) && (
                            <div className="flex gap-3 mt-5 pt-4 border-t border-white/5">
                                {[
                                    { val: stats.shippedProjects, label: "Projects", color: "#06b6d4" },
                                    { val: stats.yearsExperience, label: "Years", color: "#6366f1" },
                                    { val: stats.aiProjects, label: "AI Built", color: "#a855f7" },
                                ].filter((s) => s.val > 0).map(({ val, label, color }) => (
                                    <div key={label} className="flex-1 text-center glass rounded-xl py-3" style={{ border: `1px solid ${color}15` }}>
                                        <div className="font-display text-xl font-bold" style={{ color }}>{val}+</div>
                                        <div className="font-mono-code text-[9px] text-slate-600 uppercase tracking-widest mt-0.5">{label}</div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <motion.button
                            onClick={submitStats}
                            disabled={savingStats}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="mt-7 w-full relative py-3.5 rounded-xl overflow-hidden group disabled:opacity-40"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600" />
                            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors" />
                            <span className="relative z-10 flex items-center justify-center gap-2 text-white font-medium text-sm">
                                {savingStats ? <><Loader2 size={14} className="animate-spin" />Saving…</> : savedStats ? <><CheckCircle2 size={14} />Saved!</> : "Save Stats"}
                            </span>
                        </motion.button>
                    </FormCard>
                </motion.div>

                {/* ── Form 3: Current Project ────────────────────────────────────── */}
                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.19 }}>
                    <FormCard color="#a855f7">
                        <FormHeader icon={Cpu} color="#a855f7" label="Form 3 · Building" title="Current Project" />

                        <AnimatePresence>
                            {savedProject && <SuccessBanner message="Current project saved successfully!" onDismiss={() => setSavedProject(false)} />}
                        </AnimatePresence>

                        <div className="space-y-5">
                            <div>
                                <label className={LABEL}>Project Title</label>
                                <input className={INPUT} value={project.title} onChange={(e) => setProject({ ...project, title: e.target.value })} placeholder="AI-Based CRO System" />
                            </div>

                            <div>
                                <label className={LABEL}>Description</label>
                                <textarea className={TEXTAREA} rows={4} value={project.description} onChange={(e) => setProject({ ...project, description: e.target.value })} placeholder="What are you building and why..." />
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className={LABEL + " mb-0"}>Technologies</label>
                                    <button onClick={addTech} className="flex items-center gap-1 text-[10px] font-mono-code text-violet-400 hover:text-violet-300 transition-colors">
                                        <Plus size={11} /> Add
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    {project.technologies.map((t, i) => (
                                        <motion.div key={i} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2">
                                            <div className="flex items-center gap-2 flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 focus-within:border-violet-500/40 transition-all duration-200">
                                                <FileText size={12} className="text-slate-600 shrink-0" />
                                                <input
                                                    className="flex-1 bg-transparent text-sm text-white placeholder-slate-600 outline-none"
                                                    value={t}
                                                    onChange={(e) => updateTech(i, e.target.value)}
                                                    placeholder={i === 0 ? "FastAPI" : i === 1 ? "LangChain" : "Technology..."}
                                                />
                                            </div>
                                            {project.technologies.length > 1 && (
                                                <button onClick={() => removeTech(i)} className="text-slate-700 hover:text-red-400 transition-colors p-1">
                                                    <Trash2 size={14} />
                                                </button>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>

                                {project.technologies.filter(Boolean).length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/5">
                                        {project.technologies.filter(Boolean).map((t, i) => (
                                            <span key={i} className="px-2.5 py-1 rounded-lg text-[11px] font-mono-code bg-violet-500/10 text-violet-300 border border-violet-500/20">{t}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <motion.button
                            onClick={submitProject}
                            disabled={!project.title.trim() || savingProject}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="mt-7 w-full relative py-3.5 rounded-xl overflow-hidden group disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600" />
                            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors" />
                            <span className="relative z-10 flex items-center justify-center gap-2 text-white font-medium text-sm">
                                {savingProject ? <><Loader2 size={14} className="animate-spin" />Saving…</> : savedProject ? <><CheckCircle2 size={14} />Saved!</> : "Save Project"}
                            </span>
                        </motion.button>
                    </FormCard>
                </motion.div>

            </div>
        </div>
    );
}