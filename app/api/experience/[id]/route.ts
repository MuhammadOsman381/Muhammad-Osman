import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { experience } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getAdminFromCookies } from "@/lib/auth";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const admin = getAdminFromCookies();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const [updated] = await db.update(experience).set({
    ...body,
    highlights: JSON.stringify(Array.isArray(body.highlights) ? body.highlights : [body.highlights]),
    stack: JSON.stringify(Array.isArray(body.stack) ? body.stack : body.stack.split(",").map((s: string) => s.trim())),
    createdAt: body.createdAt ? new Date(body.createdAt) : new Date(),
    updatedAt: new Date(),
  }).where(eq(experience.id, parseInt(params.id))).returning();

  return NextResponse.json({ ...updated, highlights: JSON.parse(updated.highlights), stack: JSON.parse(updated.stack) });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const admin = getAdminFromCookies();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await db.delete(experience).where(eq(experience.id, parseInt(params.id)));
  return NextResponse.json({ success: true });
}
