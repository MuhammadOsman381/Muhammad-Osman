import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contactMessages } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { getAdminFromCookies } from "@/lib/auth";
import { sendContactNotification } from "@/lib/mailer";

export async function GET() {
  const admin = getAdminFromCookies();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const messages = await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  return NextResponse.json(messages);
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email and message are required" }, { status: 400 });
    }

    const [saved] = await db.insert(contactMessages)
      .values({ name, email, subject: subject || "", message })
      .returning();

    // Send email notification (non-blocking)
    sendContactNotification({ name, email, subject: subject || "", message }).catch(console.error);

    return NextResponse.json({ success: true, id: saved.id }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
