import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { asc } from "drizzle-orm";
import { getAdminFromCookies } from "@/lib/auth";

export async function GET() {
  try {
    const data = await db.select().from(projects).orderBy(asc(projects.sortOrder));
    return NextResponse.json(
      data.map((p) => ({
        ...p,
        stack: JSON.parse(p.stack),
      }))
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


export async function POST(req: NextRequest) {
  const admin = getAdminFromCookies();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();

    const [project] = await db.insert(projects).values({
      ...body,
      stack: JSON.stringify(
        Array.isArray(body.stack)
          ? body.stack
          : body.stack.split(",").map((s: string) => s.trim())
      ),
      createdAt: body.createdAt ? new Date(body.createdAt) : new Date(),
      updatedAt: new Date(),
    }).returning();

    return NextResponse.json(
      { ...project, stack: JSON.parse(project.stack) },
      { status: 201 }
    );

  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}