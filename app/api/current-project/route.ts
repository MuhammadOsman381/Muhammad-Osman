import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db"; // your Drizzle client
import { currentProject } from "@/lib/db/schema"; // updated schema
import { eq } from "drizzle-orm";

export async function GET() {
    try {
        const project = await db
            .select()
            .from(currentProject)
            .limit(1); // assuming only one current project

        if (!project || project.length === 0) {
            return NextResponse.json({ message: "No current project found" }, { status: 404 });
        }

        // Convert technologies string back to array
        const result = {
            ...project[0],
            technologies: project[0].technologies ? project[0].technologies.split(",") : [],
        };

        return NextResponse.json(result);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { title, description, technologies } = body;

        if (!title || !description || !technologies || !Array.isArray(technologies)) {
            return NextResponse.json(
                { message: "Title, description and technologies array are required" },
                { status: 400 }
            );
        }

        // Convert technologies array to comma-separated string for DB
        const techString = technologies.join(",");

        // Check if a current project already exists
        const existing = await db.select().from(currentProject).limit(1);

        let result;
        if (existing && existing.length > 0) {
            // Update the existing project
            result = await db
                .update(currentProject)
                .set({
                    title,
                    description,
                    technologies: techString,
                })
                .where(eq(currentProject.id, existing[0].id))
                .returning();
        } else {
            // Insert new project
            result = await db
                .insert(currentProject)
                .values({
                    title,
                    description,
                    technologies: techString,
                })
                .returning();
        }

        return NextResponse.json(result[0]);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}