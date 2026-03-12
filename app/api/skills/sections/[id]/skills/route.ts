import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { skills } from "@/lib/db/schema";
import { getAdminFromCookies } from "@/lib/auth";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const admin = getAdminFromCookies();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, sortOrder } = await req.json();
  if (!name) return NextResponse.json({ error: "Name required" }, { status: 400 });

  const [skill] = await db.insert(skills)
    .values({ sectionId: parseInt(params.id), name, sortOrder: sortOrder ?? 0 })
    .returning();

  return NextResponse.json(skill, { status: 201 });
}
