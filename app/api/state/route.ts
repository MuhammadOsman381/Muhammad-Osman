import { eq } from "drizzle-orm/expressions";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { stats } from "@/lib//db/schema";

export async function GET(req: NextRequest) {
    try {
        const data = await db.select().from(stats).limit(1);
        return NextResponse.json(data[0] || null);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { shipped, experience, aiProjects } = body;
        const existing = await db.select().from(stats).limit(1);
        let result;
        if (existing.length > 0) {
            result = await db
                .update(stats)
                .set({ shipped, experience, aiProjects })
                .where(eq(stats.id, existing[0].id)) // ✅ correct syntax
                .returning();
        } else {
            result = await db
                .insert(stats)
                .values({ shipped, experience, aiProjects })
                .returning();
        }
        return NextResponse.json(result[0]);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to save stats" }, { status: 500 });
    }
}