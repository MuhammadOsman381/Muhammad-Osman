import { supabase } from "@/lib/supabase";
import { db } from "@/lib/db";
import { cv } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
    try {
        const data = await req.formData();
        const file = data.get("file") as File;
        if (!file) return Response.json({ error: "No file uploaded" }, { status: 400 });
        const arrayBuffer = await file.arrayBuffer();
        const blob = new Blob([arrayBuffer], { type: file.type });
        const fileName = "Muhammad_Osman_Full_Stack_Developer_CV.pdf";
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from("cv-files")
            .upload(fileName, blob, { upsert: true });
        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage
            .from("cv-files")
            .getPublicUrl(fileName);
        const publicUrl = urlData.publicUrl;
        const [existingCV] = await db.select().from(cv).limit(1);
        if (existingCV) {
            await db.update(cv).set({ url: publicUrl }).where(eq(cv.id, existingCV.id));
        } else {
            await db.insert(cv).values({ url: publicUrl });
        }
        return Response.json({ success: true, url: publicUrl });
    } catch (err) {
        console.error(err);
        return Response.json({ error: "Upload failed" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const [existingCV] = await db
            .select()
            .from(cv)
            .limit(1);
        if (!existingCV) {
            return Response.json({ error: "CV not found" }, { status: 404 });
        }
        return Response.json({ success: true, url: existingCV.url });
    } catch (err) {
        console.error(err);
        return Response.json({ error: "Failed to fetch CV URL" }, { status: 500 });
    }
}