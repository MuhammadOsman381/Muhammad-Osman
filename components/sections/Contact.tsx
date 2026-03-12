"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send, Mail, Phone, Github, Linkedin, Globe, CheckCircle2, Loader2 } from "lucide-react";

const CONTACT_LINKS = [
  { icon: Mail, label: "Email", value: "mosman257@gmail.com", href: "mailto:mosman257@gmail.com", color: "#06b6d4" },
  { icon: Phone, label: "Phone", value: "+92 318 852 3220", href: "tel:+923188523220", color: "#6366f1" },
  { icon: Github, label: "GitHub", value: "MuhammadOsman381", href: "https://github.com/MuhammadOsman381", color: "#2dd4bf" },
  { icon: Linkedin, label: "LinkedIn", value: "mosman257", href: "https://linkedin.com/in/mosman257", color: "#818cf8" },
];

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden" ref={ref}>
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="orb w-[500px] h-96 bg-indigo-500/6 left-0 bottom-0" />
      <div className="orb w-80 h-80 bg-cyan-500/5 right-0 top-1/4" />
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} className="flex items-center gap-3 mb-4">
          <span className="font-mono-code text-xs text-cyan-500 tracking-[0.25em] uppercase">05 —</span>
          <span className="font-mono-code text-xs text-slate-500 tracking-wider uppercase">Get In Touch</span>
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <motion.h2 initial={{ opacity: 0, y: 25 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="font-display font-bold text-5xl md:text-6xl text-white leading-tight mb-5">
              Let&apos;s Build Something <span className="text-cyan-gradient">Great Together</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }} className="text-slate-400 leading-relaxed mb-10 text-[15px]">
              Whether you have a project in mind, a job opportunity, or just want to say hi — my inbox is always open. I&apos;ll reply within 24 hours.
            </motion.p>
            <div className="space-y-3">
              {CONTACT_LINKS.map(({ icon: Icon, label, value, href, color }, i) => (
                <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.08 * i + 0.4 }} whileHover={{ x: 5 }} className="group flex items-center gap-4 glass rounded-xl px-5 py-3.5 border border-white/5 hover:border-white/10 transition-all duration-300">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300" style={{ background: `${color}12`, border: `1px solid ${color}25` }}>
                    <Icon size={15} style={{ color }} />
                  </div>
                  <div>
                    <p className="font-mono-code text-[10px] uppercase tracking-wider text-slate-600 mb-0.5">{label}</p>
                    <p className="text-sm text-slate-300 group-hover:text-white transition-colors">{value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8, delay: 0.3 }}>
            <div className="relative glass rounded-3xl p-8 border-cyan-glow overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
              {status === "sent" ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-12 text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="font-display text-2xl text-white font-bold">Message sent!</h3>
                  <p className="text-slate-400 max-w-sm text-sm">Thanks for reaching out. I&apos;ll get back to you within 24 hours.</p>
                  <button onClick={() => { setStatus("idle"); setForm({ name: "", email: "", subject: "", message: "" }); }} className="mt-2 px-6 py-2.5 rounded-xl glass border border-white/10 text-slate-300 hover:text-white hover:border-white/20 transition-all text-sm">Send another</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {status === "error" && <p className="text-red-400 text-sm font-mono-code">Something went wrong. Please try again.</p>}
                  <div className="grid sm:grid-cols-2 gap-5">
                    {(["name", "email"] as const).map((field) => (
                      <div key={field}>
                        <label className="block font-mono-code text-[10px] uppercase tracking-widest text-slate-500 mb-2">{field === "name" ? "Full Name" : "Email Address"}</label>
                        <div className="relative">
                          <input type={field === "email" ? "email" : "text"} placeholder={field === "name" ? "John Smith" : "john@company.com"} required value={form[field]} onChange={(e) => setForm({ ...form, [field]: e.target.value })} onFocus={() => setFocused(field)} onBlur={() => setFocused(null)} className="input-field w-full px-4 py-3 rounded-xl text-sm" />
                          {focused === field && <motion.div layoutId="form-focus" className="absolute inset-0 rounded-xl pointer-events-none" style={{ boxShadow: "0 0 0 2px rgba(6,182,212,0.25), 0 0 20px rgba(6,182,212,0.1)" }} transition={{ duration: 0.15 }} />}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block font-mono-code text-[10px] uppercase tracking-widest text-slate-500 mb-2">Subject</label>
                    <input type="text" placeholder="What's this about?" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} onFocus={() => setFocused("subject")} onBlur={() => setFocused(null)} className="input-field w-full px-4 py-3 rounded-xl text-sm" />
                  </div>
                  <div>
                    <label className="block font-mono-code text-[10px] uppercase tracking-widest text-slate-500 mb-2">Message</label>
                    <textarea rows={5} placeholder="Tell me about your project, timeline, or anything else..." required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} onFocus={() => setFocused("message")} onBlur={() => setFocused(null)} className="input-field w-full px-4 py-3 rounded-xl text-sm resize-none" />
                  </div>
                  <motion.button type="submit" disabled={status === "sending"} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="relative w-full py-4 rounded-xl overflow-hidden group disabled:opacity-70">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-indigo-600" />
                    <div className="absolute inset-0 btn-light" />
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors" />
                    <span className="relative z-10 flex items-center justify-center gap-2.5 text-white font-medium text-sm">
                      {status === "sending" ? <><Loader2 className="w-4 h-4 animate-spin" />Sending…</> : <>Send Message<Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" /></>}
                    </span>
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
