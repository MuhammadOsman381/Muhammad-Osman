import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { experience } from "@/lib/db/schema";
import { asc } from "drizzle-orm";
import { getAdminFromCookies } from "@/lib/auth";

export async function GET() {
  try {
    const data = await db.select().from(experience).orderBy(asc(experience.sortOrder));
    return NextResponse.json(
      data.map((e) => ({
        ...e,
        highlights: JSON.parse(e.highlights),
        stack: JSON.parse(e.stack),
      }))
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const admin = getAdminFromCookies();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const [exp] = await db.insert(experience).values({
      ...body,
      highlights: JSON.stringify(Array.isArray(body.highlights) ? body.highlights : [body.highlights]),
      stack: JSON.stringify(Array.isArray(body.stack) ? body.stack : body.stack.split(",").map((s: string) => s.trim())),
    }).returning();
    return NextResponse.json({ ...exp, highlights: JSON.parse(exp.highlights), stack: JSON.parse(exp.stack) }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
