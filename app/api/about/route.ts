import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { about } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

type Highlight = { highlight: string; icon: string };

type AboutBody = {
    bio?: string;
    highlights?: Highlight[];
};

export async function GET() {
    try {
        const data = await db.select().from(about).limit(1);
        return NextResponse.json({ success: true, data: data[0] || null });
    } catch (err) {
        console.error("GET /api/about error:", err);
        return NextResponse.json({ success: false, error: "Failed to fetch about data" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body: AboutBody = await req.json();

        // Fetch existing row
        const existing = await db.select().from(about).limit(1);

        if (existing.length > 0) {
            // Update existing row
            const updated = await db
                .update(about)
                .set({
                    bio: body.bio ?? existing[0].bio,
                    highlights: body.highlights ?? existing[0].highlights,
                })
                .where(eq(about.id, existing[0].id));

            return NextResponse.json({ success: true, message: "About updated", data: updated });
        } else {
            // Insert new row
            const inserted = await db.insert(about).values({
                bio: body.bio ?? "",
                highlights: body.highlights ?? [],
            }).returning();

            return NextResponse.json({ success: true, message: "About created", data: inserted[0] });
        }
    } catch (err) {
        console.error("POST /api/about error:", err);
        return NextResponse.json({ success: false, error: "Failed to save about data" }, { status: 500 });
    }
}