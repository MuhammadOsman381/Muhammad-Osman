import { supabase } from "@/lib/supabase";
import { db } from "@/lib/db";
import { cv } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
    try {
        const data = await req.formData();
        const file = data.get("file") as File;

        if (!file) {
            return Response.json({ error: "No file uploaded" }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const blob = new Blob([arrayBuffer], { type: file.type });

        // ✅ Generate a unique filename to avoid cached URLs
        const timestamp = Date.now();
        const fileName = `Muhammad_Osman_Full_Stack_Developer_CV_${timestamp}.pdf`;

        // 1️⃣ Optional: delete all existing CVs if you want only one
        const { data: listData, error: listError } = await supabase.storage
            .from("cv-files")
            .list("", { search: "Muhammad_Osman_Full_Stack_Developer_CV" });

        if (listError) throw listError;

        if (listData.length > 0) {
            const filesToDelete = listData.map((f) => f.name);
            const { error: removeError } = await supabase.storage
                .from("cv-files")
                .remove(filesToDelete);
            if (removeError) throw removeError;
        }

        // 2️⃣ Upload the new file
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from("cv-files")
            .upload(fileName, blob, { upsert: true });
        if (uploadError) throw uploadError;

        // 3️⃣ Get public URL
        const { data: urlData } = supabase.storage
            .from("cv-files")
            .getPublicUrl(fileName);
        const publicUrl = urlData.publicUrl;

        // 4️⃣ Update DB (replace old CV row or insert new)
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