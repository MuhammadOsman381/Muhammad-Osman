import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getAdminFromCookies } from "@/lib/auth";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const admin = getAdminFromCookies();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();

    const { stack, createdAt, updatedAt, ...rest } = body;

    const [updated] = await db
      .update(projects)
      .set({
        ...rest,
        stack: JSON.stringify(
          Array.isArray(stack)
            ? stack
            : stack.split(",").map((s: string) => s.trim())
        ),
        updatedAt: new Date(),
      })
      .where(eq(projects.id, parseInt(params.id)))
      .returning();

    return NextResponse.json({
      ...updated,
      stack: JSON.parse(updated.stack),
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const admin = getAdminFromCookies();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await db.delete(projects).where(eq(projects.id, parseInt(params.id)));
  return NextResponse.json({ success: true });
}
