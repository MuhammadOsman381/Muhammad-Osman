"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Loader2, ChevronDown, ChevronUp } from "lucide-react";

type Skill = { id: number; name: string };
type Section = { id: number; name: string; color: string; skills: Skill[] };

const COLORS = ["#06b6d4", "#6366f1", "#2dd4bf", "#a855f7", "#f97316", "#10b981", "#ec4899", "#fbbf24"];

export default function AdminSkillsPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<number | null>(null);

  // New section form
  const [newSection, setNewSection] = useState({ name: "", color: "#06b6d4" });
  const [addingSection, setAddingSection] = useState(false);

  // New skill form per section
  const [newSkill, setNewSkill] = useState<{ [key: number]: string }>({});
  const [addingSkill, setAddingSkill] = useState<number | null>(null);

  const load = () => {
    setLoading(true);
    fetch("/api/skills").then((r) => r.json()).then((data) => { setSections(data); setLoading(false); }).catch(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const addSection = async () => {
    if (!newSection.name.trim()) return;
    setAddingSection(true);
    await fetch("/api/skills", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: newSection.name, color: newSection.color, sortOrder: sections.length }) });
    setNewSection({ name: "", color: "#06b6d4" });
    setAddingSection(false);
    load();
  };

  const deleteSection = async (id: number) => {
    if (!confirm("Delete this section and all its skills?")) return;
    await fetch(`/api/skills/sections/${id}`, { method: "DELETE" });
    load();
  };

  const addSkill = async (sectionId: number) => {
    const name = newSkill[sectionId]?.trim();
    if (!name) return;
    setAddingSkill(sectionId);
    await fetch(`/api/skills/sections/${sectionId}/skills`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, sortOrder: 0 }) });
    setNewSkill((p) => ({ ...p, [sectionId]: "" }));
    setAddingSkill(null);
    load();
  };

  const deleteSkill = async (id: number) => {
    await fetch(`/api/skills/items/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-white mb-1">Skills Manager</h1>
        <p className="text-slate-500 text-sm">Create sections (e.g. Frontend) and add skills to each.</p>
      </div>

      {/* Add section */}
      <div className="glass rounded-2xl p-6 border border-white/5 mb-6">
        <h2 className="font-mono-code text-xs text-slate-500 uppercase tracking-widest mb-4">Add New Section</h2>
        <div className="flex gap-3 flex-wrap">
          <input
            type="text" placeholder="Section name (e.g. Frontend)"
            value={newSection.name}
            onChange={(e) => setNewSection({ ...newSection, name: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && addSection()}
            className="input-field flex-1 min-w-48 px-4 py-2.5 rounded-xl text-sm"
          />
          <div className="flex items-center gap-2 flex-wrap">
            {COLORS.map((c) => (
              <button key={c} onClick={() => setNewSection({ ...newSection, color: c })}
                className="w-6 h-6 rounded-full transition-transform hover:scale-110"
                style={{ background: c, outline: newSection.color === c ? `2px solid ${c}` : "none", outlineOffset: 2 }} />
            ))}
          </div>
          <button onClick={addSection} disabled={addingSection} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 transition-colors text-sm font-mono-code disabled:opacity-50">
            {addingSection ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />} Add
          </button>
        </div>
      </div>

      {/* Sections list */}
      {loading ? (
        <div className="flex items-center justify-center py-16 text-slate-600"><Loader2 size={24} className="animate-spin" /></div>
      ) : sections.length === 0 ? (
        <div className="text-center py-16 text-slate-600 font-mono-code text-sm">No sections yet. Add one above.</div>
      ) : (
        <div className="space-y-3">
          {sections.map((section) => (
            <motion.div key={section.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl border border-white/5 overflow-hidden">
              <div className="flex items-center gap-4 px-6 py-4">
                <div className="w-3 h-3 rounded-full shrink-0" style={{ background: section.color }} />
                <span className="font-display font-semibold text-white flex-1">{section.name}</span>
                <span className="font-mono-code text-xs text-slate-600">{section.skills.length} skills</span>
                <button onClick={() => setExpanded(expanded === section.id ? null : section.id)} className="text-slate-500 hover:text-slate-300 transition-colors p-1">
                  {expanded === section.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                <button onClick={() => deleteSection(section.id)} className="text-slate-600 hover:text-red-400 transition-colors p-1"><Trash2 size={15} /></button>
              </div>

              {expanded === section.id && (
                <div className="px-6 pb-5 border-t border-white/5">
                  {/* Skill pills */}
                  <div className="flex flex-wrap gap-2 mt-4 mb-4">
                    {section.skills.map((skill) => (
                      <span key={skill.id} className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono-code text-slate-300 transition-all duration-200"
                        style={{ background: `${section.color}12`, border: `1px solid ${section.color}25` }}>
                        {skill.name}
                        <button onClick={() => deleteSkill(skill.id)} className="text-slate-600 hover:text-red-400 transition-colors"><Trash2 size={10} /></button>
                      </span>
                    ))}
                    {section.skills.length === 0 && <span className="text-slate-600 text-xs font-mono-code">No skills yet</span>}
                  </div>
                  {/* Add skill */}
                  <div className="flex gap-2">
                    <input
                      type="text" placeholder="Add skill (e.g. React.js)"
                      value={newSkill[section.id] || ""}
                      onChange={(e) => setNewSkill((p) => ({ ...p, [section.id]: e.target.value }))}
                      onKeyDown={(e) => e.key === "Enter" && addSkill(section.id)}
                      className="input-field flex-1 px-3 py-2 rounded-lg text-sm"
                    />
                    <button onClick={() => addSkill(section.id)} disabled={addingSkill === section.id}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono-code transition-colors disabled:opacity-50"
                      style={{ background: `${section.color}15`, border: `1px solid ${section.color}25`, color: section.color }}>
                      {addingSkill === section.id ? <Loader2 size={12} className="animate-spin" /> : <Plus size={12} />} Add
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
