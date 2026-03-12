"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Code2, FolderOpen, Briefcase, MessageSquare, LogOut, Menu, X, ChevronRight, File, User } from "lucide-react";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/cv", label: "Upload CV", icon: File },
  { href: "/admin/about", label: "About", icon: User },
  { href: "/admin/skills", label: "Skills", icon: Code2 },
  { href: "/admin/projects", label: "Projects", icon: FolderOpen },
  { href: "/admin/experience", label: "Experience", icon: Briefcase },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },

];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <div className="min-h-screen bg-[#050508] flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 glass border-r border-white/5 flex flex-col transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <div className="p-6 border-b border-white/5">
          <span className="font-display font-bold text-xl text-white">MO <span className="text-cyan-gradient">Admin</span></span>
          <p className="font-mono-code text-[10px] text-slate-600 tracking-widest mt-0.5 uppercase">Portfolio CMS</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link key={href} href={href} onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 group ${active ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" : "text-slate-400 hover:text-white hover:bg-white/5"}`}>
                <Icon size={16} className={active ? "text-cyan-400" : "text-slate-500 group-hover:text-slate-300"} />
                <span className="font-body-custom">{label}</span>
                {active && <ChevronRight size={14} className="ml-auto text-cyan-400/50" />}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/5">
          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-slate-400 hover:text-red-400 hover:bg-red-500/5 transition-all duration-200">
            <LogOut size={16} /><span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {open && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setOpen(false)} />}

      {/* Main */}
      <div className="flex-1 lg:ml-64 min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-16 glass border-b border-white/5 flex items-center px-6 gap-4">
          <button onClick={() => setOpen(!open)} className="lg:hidden text-slate-400 hover:text-white transition-colors">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
          <span className="font-mono-code text-xs text-slate-500 tracking-wider uppercase">
            {NAV.find((n) => n.href === pathname)?.label ?? "Admin"}
          </span>
          <Link href="/" target="_blank" className="ml-auto font-mono-code text-[10px] text-slate-600 hover:text-cyan-400 transition-colors tracking-wider">
            ↗ VIEW SITE
          </Link>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
