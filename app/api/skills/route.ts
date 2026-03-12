import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { skillSections, skills } from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";
import { getAdminFromCookies } from "@/lib/auth";

export async function GET() {
  try {
    const sections = await db.select().from(skillSections).orderBy(asc(skillSections.sortOrder));
    const allSkills = await db.select().from(skills).orderBy(asc(skills.sortOrder));

    const result = sections.map((s) => ({
      ...s,
      skills: allSkills.filter((sk) => sk.sectionId === s.id),
    }));

    return NextResponse.json(result);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const admin = getAdminFromCookies();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { name, color, sortOrder } = await req.json();
    if (!name) return NextResponse.json({ error: "Name required" }, { status: 400 });

    const [section] = await db.insert(skillSections)
      .values({ name, color: color || "#06b6d4", sortOrder: sortOrder ?? 0 })
      .returning();

    return NextResponse.json(section, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
