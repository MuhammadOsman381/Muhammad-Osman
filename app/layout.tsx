import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muhammad Osman — Full Stack Developer",
  description:
    "Full Stack Developer specializing in Next.js, React, Node.js, FastAPI, Python, and PostgreSQL. Building elegant, high-performance web applications.",
  keywords: ["Muhammad Osman", "Full Stack Developer", "React", "Next.js", "Node.js", "FastAPI", "Python"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
