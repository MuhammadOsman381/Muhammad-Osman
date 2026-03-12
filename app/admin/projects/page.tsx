"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Edit2, X, Loader2, Star, ExternalLink } from "lucide-react";

type Project = { id: number; title: string; subtitle: string; description: string; stack: string[]; github: string; live: string; accent: string; accentB: string; featured: boolean; stars: number; };
type FormData = Omit<Project, "id">;

const EMPTY: FormData = { title: "", subtitle: "", description: "", stack: [], github: "", live: "#", accent: "#06b6d4", accentB: "#6366f1", featured: false, stars: 0 };
const COLORS = ["#06b6d4","#6366f1","#2dd4bf","#a855f7","#f97316","#10b981","#ec4899","#fbbf24"];

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState<FormData>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [stackInput, setStackInput] = useState("");

  const load = () => { setLoading(true); fetch("/api/projects").then((r) => r.json()).then((d) => { setProjects(d); setLoading(false); }).catch(() => setLoading(false)); };
  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditing(null); setForm(EMPTY); setStackInput(""); setShowForm(true); };
  const openEdit = (p: Project) => { setEditing(p); setForm({ ...p }); setStackInput(p.stack.join(", ")); setShowForm(true); };

  const save = async () => {
    setSaving(true);
    const payload = { ...form, stack: stackInput.split(",").map((s) => s.trim()).filter(Boolean) };
    if (editing) {
      await fetch(`/api/projects/${editing.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    } else {
      await fetch("/api/projects", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...payload, sortOrder: projects.length }) });
    }
    setSaving(false); setShowForm(false); load();
  };

  const del = async (id: number) => { if (!confirm("Delete this project?")) return; await fetch(`/api/projects/${id}`, { method: "DELETE" }); load(); };

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="font-display text-2xl font-bold text-white mb-1">Projects</h1><p className="text-slate-500 text-sm">Manage your portfolio projects.</p></div>
        <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 transition-colors text-sm font-mono-code">
          <Plus size={14} /> New Project
        </button>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative glass rounded-2xl p-7 w-full max-w-2xl border-cyan-glow overflow-y-auto max-h-[90vh]">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-bold text-white">{editing ? "Edit Project" : "New Project"}</h2>
              <button onClick={() => setShowForm(false)} className="text-slate-500 hover:text-white transition-colors"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="field-label">Title</label><input className="input-field w-full px-3 py-2.5 rounded-xl text-sm" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="AI Resume Enhancer" /></div>
                <div><label className="field-label">Subtitle</label><input className="input-field w-full px-3 py-2.5 rounded-xl text-sm" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} placeholder="AI-Powered Career Tool" /></div>
              </div>
              <div><label className="field-label">Description</label><textarea rows={3} className="input-field w-full px-3 py-2.5 rounded-xl text-sm resize-none" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
              <div><label className="field-label">Stack (comma separated)</label><input className="input-field w-full px-3 py-2.5 rounded-xl text-sm" value={stackInput} onChange={(e) => setStackInput(e.target.value)} placeholder="Next.js, LangChain, Groq" /></div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="field-label">GitHub URL</label><input className="input-field w-full px-3 py-2.5 rounded-xl text-sm" value={form.github} onChange={(e) => setForm({ ...form, github: e.target.value })} /></div>
                <div><label className="field-label">Live URL</label><input className="input-field w-full px-3 py-2.5 rounded-xl text-sm" value={form.live} onChange={(e) => setForm({ ...form, live: e.target.value })} /></div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="field-label">Accent Color</label>
                  <div className="flex gap-2 flex-wrap mt-1">
                    {COLORS.map((c) => <button key={c} onClick={() => setForm({ ...form, accent: c })} className="w-6 h-6 rounded-full hover:scale-110 transition-transform" style={{ background: c, outline: form.accent === c ? `2px solid ${c}` : "none", outlineOffset: 2 }} />)}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1"><label className="field-label">Stars</label><input type="number" min="0" className="input-field w-full px-3 py-2.5 rounded-xl text-sm" value={form.stars} onChange={(e) => setForm({ ...form, stars: parseInt(e.target.value) || 0 })} /></div>
                  <div className="flex items-center gap-2 mt-5"><input type="checkbox" id="featured" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4 accent-cyan-500" /><label htmlFor="featured" className="text-sm text-slate-400">Featured</label></div>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowForm(false)} className="flex-1 py-2.5 rounded-xl glass border border-white/10 text-slate-400 hover:text-white text-sm transition-colors">Cancel</button>
              <button onClick={save} disabled={saving} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 text-white text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-60">
                {saving ? <Loader2 size={14} className="animate-spin" /> : null} {editing ? "Save Changes" : "Add Project"}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {loading ? <div className="flex justify-center py-16 text-slate-600"><Loader2 size={24} className="animate-spin" /></div> : (
        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass rounded-2xl p-5 border border-white/5">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="font-mono-code text-[10px] tracking-widest uppercase" style={{ color: p.accent }}>{p.subtitle}</span>
                  <h3 className="font-display font-bold text-white">{p.title}</h3>
                </div>
                <div className="flex items-center gap-1 ml-2">
                  {p.featured && <span className="px-2 py-0.5 rounded-full text-[9px] font-mono-code bg-amber-500/10 text-amber-400 border border-amber-500/20">Featured</span>}
                  <span className="flex items-center gap-0.5 font-mono-code text-xs text-slate-600"><Star size={10} className="text-yellow-400/60 fill-yellow-400/60" />{p.stars}</span>
                </div>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed mb-3 line-clamp-2">{p.description}</p>
              <div className="flex flex-wrap gap-1 mb-4">
                {p.stack.map((t) => <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono-code bg-white/5 text-slate-500">{t}</span>)}
              </div>
              <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                {p.live !== "#" && <a href={p.live} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-cyan-400 transition-colors"><ExternalLink size={14} /></a>}
                <div className="flex gap-2 ml-auto">
                  <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"><Edit2 size={14} /></button>
                  <button onClick={() => del(p.id)} className="p-1.5 rounded-lg bg-red-500/5 text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-colors"><Trash2 size={14} /></button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
