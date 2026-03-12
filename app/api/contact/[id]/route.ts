import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contactMessages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getAdminFromCookies } from "@/lib/auth";

export async function PATCH(_req: NextRequest, { params }: { params: { id: string } }) {
  const admin = getAdminFromCookies();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await db.update(contactMessages).set({ read: true }).where(eq(contactMessages.id, parseInt(params.id)));
  return NextResponse.json({ success: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const admin = getAdminFromCookies();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await db.delete(contactMessages).where(eq(contactMessages.id, parseInt(params.id)));
  return NextResponse.json({ success: true });
}
