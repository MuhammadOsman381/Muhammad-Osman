import { supabase } from "@/lib/supabase";
import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
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
        const timestamp = Date.now();
        const ext = file.name.split(".").pop();
        const fileName = `Muhammad_Osman_Full_Stack_Developer_Image_${timestamp}.${ext}`;
        const { data: listData, error: listError } = await supabase.storage
            .from("files")
            .list("", { search: "Muhammad_Osman_Full_Stack_Developer_Image" });
        if (listError) throw listError;
        if (listData.length > 0) {
            const filesToDelete = listData.map((f) => f.name);
            const { error: removeError } = await supabase.storage
                .from("files")
                .remove(filesToDelete);
            if (removeError) throw removeError;
        }
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from("files")
            .upload(fileName, blob, { upsert: true });
        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage
            .from("files")
            .getPublicUrl(fileName);
        const publicUrl = urlData.publicUrl;

        const [existingfiles] = await db.select().from(files).limit(1);
        if (existingfiles) {
            await db.update(files).set({ img_url: publicUrl }).where(eq(files.id, existingfiles.id));
        } else {
            await db.insert(files).values({ img_url: publicUrl });
        }

        return Response.json({ success: true, url: publicUrl });
    } catch (err) {
        console.error(err);
        return Response.json({ error: "Upload failed" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const [existingfiles] = await db
            .select()
            .from(files)
            .limit(1);
        if (!existingfiles) {
            return Response.json({ error: "files not found" }, { status: 404 });
        }
        return Response.json({ success: true, url: existingfiles.img_url });
    } catch (err) {
        console.error(err);
        return Response.json({ error: "Failed to fetch files URL" }, { status: 500 });
    }
}