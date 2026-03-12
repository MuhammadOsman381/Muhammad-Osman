"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, Loader2, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      router.push("/admin");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050508] flex items-center justify-center px-4">
      <div className="absolute inset-0 animated-grid opacity-30" />
      <div className="orb w-96 h-96 bg-cyan-500/8 top-0 left-0" />
      <div className="orb w-96 h-96 bg-indigo-500/8 bottom-0 right-0" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="relative glass rounded-3xl p-8 border-cyan-glow overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

          <div className="flex items-center justify-center w-14 h-14 rounded-2xl mx-auto mb-6 bg-cyan-500/10 border border-cyan-500/20">
            <Lock size={24} className="text-cyan-400" />
          </div>

          <h1 className="font-display text-3xl font-bold text-white text-center mb-1">Admin Panel</h1>
          <p className="font-mono-code text-xs text-slate-500 text-center tracking-wider mb-8">PORTFOLIO CMS</p>

          {error && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-mono-code">
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-mono-code text-[10px] uppercase tracking-widest text-slate-500 mb-2">Email</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600" />
                <input
                  type="email" required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="admin@example.com"
                  className="input-field w-full pl-10 pr-4 py-3 rounded-xl text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono-code text-[10px] uppercase tracking-widest text-slate-500 mb-2">Password</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600" />
                <input
                  type={showPass ? "text" : "password"} required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="input-field w-full pl-10 pr-10 py-3 rounded-xl text-sm"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400 transition-colors">
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="relative w-full py-3.5 rounded-xl overflow-hidden group disabled:opacity-70 mt-2">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-indigo-600" />
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors" />
              <span className="relative z-10 flex items-center justify-center gap-2 text-white font-medium text-sm">
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Signing in…</> : "Sign In"}
              </span>
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
