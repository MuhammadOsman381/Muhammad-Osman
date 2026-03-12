import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import bcrypt from "bcryptjs";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

async function seed() {
  console.log("🌱 Seeding database...");

  // Admin
  const hash = await bcrypt.hash("123456", 10);
  await db.insert(schema.admins).values({ email: "mosman257@gmail.com", password: hash }).onConflictDoNothing();
  console.log("✅ Admin created — email: mosman257@gmail.com  password: admin123");

  // Skill sections + skills
  const sections = [
    { name: "Frontend", color: "#06b6d4", skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
    { name: "Backend", color: "#6366f1", skills: ["Node.js", "Express.js", "FastAPI", "Python", "Laravel"] },
    { name: "Database & Cloud", color: "#2dd4bf", skills: ["PostgreSQL", "MongoDB", "Redis", "AWS S3", "Docker"] },
    { name: "AI & Tools", color: "#a855f7", skills: ["LangChain", "LangGraph", "Socket.IO", "WebRTC", "Git / GitHub"] },
  ];

  for (let i = 0; i < sections.length; i++) {
    const s = sections[i];
    const [section] = await db.insert(schema.skillSections)
      .values({ name: s.name, color: s.color, sortOrder: i })
      .returning();
    for (let j = 0; j < s.skills.length; j++) {
      await db.insert(schema.skills).values({ sectionId: section.id, name: s.skills[j], sortOrder: j });
    }
    console.log(`✅ Section: ${s.name}`);
  }

  // Projects
  const projectsData = [
    {
      title: "AI Resume Enhancer", subtitle: "AI-Powered Career Tool",
      description: "Generates ATS-friendly, role-specific resumes and cover emails from a LinkedIn URL or manual form. Powered by LangChain and Groq with a Next.js frontend and UpStash queue.",
      stack: JSON.stringify(["Next.js", "LangChain", "Groq", "Puppeteer", "UpStash"]),
      github: "https://github.com/MuhammadOsman381", live: "https://ai-resume-enhancer-mu.vercel.app",
      accent: "#06b6d4", accentB: "#6366f1", featured: true, stars: 24, sortOrder: 0,
    },
    {
      title: "Nexora SaaS Platform", subtitle: "AI Chatbot Builder",
      description: "SaaS app that scrapes a user's website, processes the content, and creates a context-aware AI chatbot with subscription-based access via Stripe.",
      stack: JSON.stringify(["React.js", "Node.js", "LangChain", "Groq", "Stripe"]),
      github: "https://github.com/MuhammadOsman381", live: "https://nexora-seven-rosy.vercel.app",
      accent: "#7c3aed", accentB: "#ec4899", featured: true, stars: 18, sortOrder: 1,
    },
    {
      title: "Connectly", subtitle: "Real-Time Communication",
      description: "Full-duplex real-time messaging and HD video calling platform using WebRTC peer-to-peer connections and Socket.IO for low-latency signaling.",
      stack: JSON.stringify(["React.js", "Node.js", "Socket.IO", "WebRTC"]),
      github: "https://github.com/MuhammadOsman381", live: "https://web-rtc-client-one.vercel.app",
      accent: "#2dd4bf", accentB: "#06b6d4", featured: false, stars: 31, sortOrder: 2,
    },
    {
      title: "Vedeera Workforce", subtitle: "HR Management System",
      description: "Secure employee check-in/out system with role-based access control, real-time attendance monitoring, and net/gross working hour calculations deployed on AWS.",
      stack: JSON.stringify(["React.js", "Node.js", "PostgreSQL", "Firebase Auth", "AWS"]),
      github: "https://github.com/MuhammadOsman381", live: "#",
      accent: "#f97316", accentB: "#fbbf24", featured: false, stars: 12, sortOrder: 3,
    },
    {
      title: "HolyVibes LMS", subtitle: "Learning Management System",
      description: "Role-based LMS for admins, teachers, and students with class management, live meeting links, course content delivery, enrollment tracking, and attendance.",
      stack: JSON.stringify(["React.js", "Laravel", "MySQL", "Hostinger"]),
      github: "https://github.com/MuhammadOsman381", live: "#",
      accent: "#10b981", accentB: "#2dd4bf", featured: false, stars: 9, sortOrder: 4,
    },
    {
      title: "AI Recruitment System", subtitle: "Automated HR Pipeline",
      description: "Automates pre-screening by scoring candidate responses, extracting and verifying documents using LangChain, and notifying shortlisted applicants via email.",
      stack: JSON.stringify(["React.js", "FastAPI", "PostgreSQL", "LangChain", "AWS S3"]),
      github: "https://github.com/MuhammadOsman381", live: "#",
      accent: "#6366f1", accentB: "#7c3aed", featured: false, stars: 16, sortOrder: 5,
    },
  ];

  for (const p of projectsData) {
    await db.insert(schema.projects).values(p);
  }
  console.log("✅ Projects seeded");

  // Experience
  const experienceData = [
    {
      role: "Associate Software Developer", company: "Cyberify",
      location: "Multan, Pakistan", duration: "Aug 2025 — Oct 2025", type: "Full-time",
      accentColor: "#06b6d4",
      highlights: JSON.stringify([
        "Built AI Recruitment Automation System using LangChain — auto-scored and shortlisted candidates, cutting manual screening time by 70%.",
        "Developed a Job Discovery & Course Management Platform that scrapes, validates, and enriches job listings with AWS S3 content uploads.",
        "Delivered production-ready features using React.js, FastAPI, and PostgreSQL in an agile environment.",
      ]),
      stack: JSON.stringify(["React.js", "FastAPI", "PostgreSQL", "LangChain", "AWS S3"]),
      sortOrder: 0,
    },
    {
      role: "Freelance Full Stack Developer", company: "Independent",
      location: "Remote Worldwide", duration: "2023 — Present", type: "Freelance",
      accentColor: "#6366f1",
      highlights: JSON.stringify([
        "Designed and shipped HolyVibes LMS with full role-based access, class management, and attendance tracking for 200+ users.",
        "Built Vedeera workforce management system with Firebase Auth, role-based check-in/out, and AWS deployment for an enterprise client.",
        "Developed eBay Comic Data Automation using Apify + regex, processing thousands of listings for a US-based collector.",
        "Created a TripAdvisor-style mobile app with Mapbox integration and smart trip planning features.",
      ]),
      stack: JSON.stringify(["React.js", "Node.js", "Laravel", "MySQL", "Firebase", "AWS"]),
      sortOrder: 1,
    },
    {
      role: "Final Year Project Lead", company: "NFC-IET — Academic",
      location: "Multan, Pakistan", duration: "2025 — 2026", type: "Academic",
      accentColor: "#2dd4bf",
      highlights: JSON.stringify([
        "Building an AI-Based CRO System for E-Commerce stores using RAG architecture.",
        "System analyzes e-commerce sites and generates conversion optimization recommendations.",
        "Tech stack: FastAPI, LangChain, LangGraph, Vector Database, Redis, Playwright/Selenium.",
      ]),
      stack: JSON.stringify(["FastAPI", "LangChain", "LangGraph", "Redis", "React.js"]),
      sortOrder: 2,
    },
  ];

  for (const e of experienceData) {
    await db.insert(schema.experience).values(e);
  }
  console.log("✅ Experience seeded");

  console.log("\n🎉 Seed complete!");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
