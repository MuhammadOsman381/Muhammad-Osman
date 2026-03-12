import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { skillSections } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getAdminFromCookies } from "@/lib/auth";

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const admin = getAdminFromCookies();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await db.delete(skillSections).where(eq(skillSections.id, parseInt(params.id)));
  return NextResponse.json({ success: true });
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const admin = getAdminFromCookies();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const [updated] = await db.update(skillSections)
    .set({ name: body.name, color: body.color })
    .where(eq(skillSections.id, parseInt(params.id)))
    .returning();
  return NextResponse.json(updated);
}
