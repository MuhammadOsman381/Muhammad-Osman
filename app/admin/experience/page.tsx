"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Edit2, X, Loader2, Briefcase } from "lucide-react";

type Exp = { id: number; role: string; company: string; location: string; duration: string; type: string; accentColor: string; highlights: string[]; stack: string[]; };
type FormData = Omit<Exp, "id">;

const EMPTY: FormData = { role: "", company: "", location: "", duration: "", type: "Full-time", accentColor: "#06b6d4", highlights: [], stack: [] };
const COLORS = ["#06b6d4","#6366f1","#2dd4bf","#a855f7","#f97316","#10b981"];
const TYPES = ["Full-time","Part-time","Freelance","Contract","Internship","Academic"];

export default function AdminExperiencePage() {
  const [items, setItems] = useState<Exp[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Exp | null>(null);
  const [form, setForm] = useState<FormData>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [highlightsInput, setHighlightsInput] = useState("");
  const [stackInput, setStackInput] = useState("");

  const load = () => { setLoading(true); fetch("/api/experience").then((r) => r.json()).then((d) => { setItems(d); setLoading(false); }).catch(() => setLoading(false)); };
  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditing(null); setForm(EMPTY); setHighlightsInput(""); setStackInput(""); setShowForm(true); };
  const openEdit = (e: Exp) => { setEditing(e); setForm({ ...e }); setHighlightsInput(e.highlights.join("\n")); setStackInput(e.stack.join(", ")); setShowForm(true); };

  const save = async () => {
    setSaving(true);
    const payload = { ...form, highlights: highlightsInput.split("\n").map((s) => s.trim()).filter(Boolean), stack: stackInput.split(",").map((s) => s.trim()).filter(Boolean) };
    if (editing) {
      await fetch(`/api/experience/${editing.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    } else {
      await fetch("/api/experience", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...payload, sortOrder: items.length }) });
    }
    setSaving(false); setShowForm(false); load();
  };

  const del = async (id: number) => { if (!confirm("Delete this experience?")) return; await fetch(`/api/experience/${id}`, { method: "DELETE" }); load(); };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="font-display text-2xl font-bold text-white mb-1">Experience</h1><p className="text-slate-500 text-sm">Manage work history and roles.</p></div>
        <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 transition-colors text-sm font-mono-code"><Plus size={14} /> Add Experience</button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative glass rounded-2xl p-7 w-full max-w-2xl border-cyan-glow overflow-y-auto max-h-[90vh]">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-bold text-white">{editing ? "Edit Experience" : "Add Experience"}</h2>
              <button onClick={() => setShowForm(false)} className="text-slate-500 hover:text-white transition-colors"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="field-label">Role</label><input className="input-field w-full px-3 py-2.5 rounded-xl text-sm" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="Associate Software Developer" /></div>
                <div><label className="field-label">Company</label><input className="input-field w-full px-3 py-2.5 rounded-xl text-sm" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Cyberify" /></div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="field-label">Location</label><input className="input-field w-full px-3 py-2.5 rounded-xl text-sm" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Multan, Pakistan" /></div>
                <div><label className="field-label">Duration</label><input className="input-field w-full px-3 py-2.5 rounded-xl text-sm" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="Aug 2025 — Oct 2025" /></div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="field-label">Type</label>
                  <select className="input-field w-full px-3 py-2.5 rounded-xl text-sm" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                    {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="field-label">Accent Color</label>
                  <div className="flex gap-2 flex-wrap mt-1">
                    {COLORS.map((c) => <button key={c} onClick={() => setForm({ ...form, accentColor: c })} className="w-6 h-6 rounded-full hover:scale-110 transition-transform" style={{ background: c, outline: form.accentColor === c ? `2px solid ${c}` : "none", outlineOffset: 2 }} />)}
                  </div>
                </div>
              </div>
              <div><label className="field-label">Highlights (one per line)</label><textarea rows={4} className="input-field w-full px-3 py-2.5 rounded-xl text-sm resize-none" value={highlightsInput} onChange={(e) => setHighlightsInput(e.target.value)} placeholder={"Built AI system...\nDeveloped feature..."} /></div>
              <div><label className="field-label">Stack (comma separated)</label><input className="input-field w-full px-3 py-2.5 rounded-xl text-sm" value={stackInput} onChange={(e) => setStackInput(e.target.value)} placeholder="React.js, FastAPI, PostgreSQL" /></div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowForm(false)} className="flex-1 py-2.5 rounded-xl glass border border-white/10 text-slate-400 hover:text-white text-sm transition-colors">Cancel</button>
              <button onClick={save} disabled={saving} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 text-white text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-60">
                {saving ? <Loader2 size={14} className="animate-spin" /> : null} {editing ? "Save Changes" : "Add Experience"}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {loading ? <div className="flex justify-center py-16 text-slate-600"><Loader2 size={24} className="animate-spin" /></div> : (
        <div className="space-y-4">
          {items.map((exp, i) => (
            <motion.div key={exp.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className="glass rounded-2xl p-6 border border-white/5">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${exp.accentColor}15`, border: `1px solid ${exp.accentColor}25` }}>
                    <Briefcase size={16} style={{ color: exp.accentColor }} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-white">{exp.role}</h3>
                    <p className="text-sm font-semibold mb-1" style={{ color: exp.accentColor }}>{exp.company}</p>
                    <div className="flex gap-3 text-xs text-slate-500 font-mono-code">
                      <span>{exp.duration}</span><span>·</span><span>{exp.location}</span>
                      <span className="px-2 py-0.5 rounded-full" style={{ background: `${exp.accentColor}10`, color: exp.accentColor, border: `1px solid ${exp.accentColor}25` }}>{exp.type}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => openEdit(exp)} className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"><Edit2 size={14} /></button>
                  <button onClick={() => del(exp.id)} className="p-1.5 rounded-lg bg-red-500/5 text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-colors"><Trash2 size={14} /></button>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mt-4 pt-3 border-t border-white/5">
                {exp.stack.map((s) => <span key={s} className="px-2 py-0.5 rounded text-[10px] font-mono-code bg-white/5 text-slate-500">{s}</span>)}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
