"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trash2, Mail, MailOpen, Loader2, Clock } from "lucide-react";

type Message = { id: number; name: string; email: string; subject: string; message: string; read: boolean; createdAt: string; };

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<number | null>(null);

  const load = () => { setLoading(true); fetch("/api/contact").then((r) => r.json()).then((d) => { setMessages(d); setLoading(false); }).catch(() => setLoading(false)); };
  useEffect(() => { load(); }, []);

  const markRead = async (id: number) => {
    await fetch(`/api/contact/${id}`, { method: "PATCH" });
    setMessages((m) => m.map((msg) => msg.id === id ? { ...msg, read: true } : msg));
  };

  const del = async (id: number) => {
    if (!confirm("Delete this message?")) return;
    await fetch(`/api/contact/${id}`, { method: "DELETE" });
    setMessages((m) => m.filter((msg) => msg.id !== id));
  };

  const unread = messages.filter((m) => !m.read).length;

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <h1 className="font-display text-2xl font-bold text-white">Messages</h1>
          {unread > 0 && <span className="px-2.5 py-0.5 rounded-full text-xs font-mono-code bg-red-500/15 text-red-400 border border-red-500/20">{unread} unread</span>}
        </div>
        <p className="text-slate-500 text-sm">Contact form submissions from your portfolio.</p>
      </div>

      {loading ? <div className="flex justify-center py-16 text-slate-600"><Loader2 size={24} className="animate-spin" /></div>
        : messages.length === 0 ? <div className="text-center py-16 text-slate-600 font-mono-code text-sm">No messages yet.</div>
        : (
          <div className="space-y-3">
            {messages.map((msg, i) => (
              <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className={`glass rounded-2xl border transition-all duration-200 ${msg.read ? "border-white/5" : "border-cyan-500/20"}`}>
                <div className="flex items-start gap-4 p-5 cursor-pointer" onClick={() => { setExpanded(expanded === msg.id ? null : msg.id); if (!msg.read) markRead(msg.id); }}>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${msg.read ? "bg-white/5" : "bg-cyan-500/10 border border-cyan-500/20"}`}>
                    {msg.read ? <MailOpen size={16} className="text-slate-500" /> : <Mail size={16} className="text-cyan-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`font-semibold text-sm ${msg.read ? "text-slate-300" : "text-white"}`}>{msg.name}</span>
                      {!msg.read && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />}
                    </div>
                    <p className="text-slate-500 text-xs font-mono-code mb-1">{msg.email}</p>
                    <p className={`text-sm truncate ${msg.read ? "text-slate-500" : "text-slate-300"}`}>{msg.subject || msg.message}</p>
                  </div>
                  <div className="shrink-0 flex items-center gap-2">
                    <span className="font-mono-code text-[10px] text-slate-600 flex items-center gap-1"><Clock size={10} />{new Date(msg.createdAt).toLocaleDateString()}</span>
                    <button onClick={(e) => { e.stopPropagation(); del(msg.id); }} className="p-1.5 text-slate-600 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                  </div>
                </div>
                {expanded === msg.id && (
                  <div className="px-5 pb-5 border-t border-white/5">
                    {msg.subject && <p className="font-mono-code text-xs text-slate-500 uppercase tracking-wider mt-4 mb-2">Subject: <span className="text-slate-300 normal-case tracking-normal">{msg.subject}</span></p>}
                    <div className="mt-3 p-4 bg-white/3 rounded-xl border border-white/5">
                      <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                    </div>
                    <a href={`mailto:${msg.email}?subject=Re: ${msg.subject || "Your message"}`} className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono-code hover:bg-cyan-500/20 transition-colors">
                      <Mail size={12} /> Reply via Email
                    </a>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
    </div>
  );
}
