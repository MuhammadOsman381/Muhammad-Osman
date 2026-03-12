import { writeFile, unlink } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
    try {
        const data = await req.formData();
        const file = data.get("file") as File;
        if (!file) {
            return Response.json({ error: "No file uploaded" }, { status: 400 });
        }
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const uploadDir = path.join(process.cwd(), "public/assets");
        const fileName = "Muhammad_Osman_Full_Stack_Developer_CV.pdf";
        const filePath = path.join(uploadDir, fileName);
        try {
            await unlink(filePath);
        } catch (err) {
            if ((err as NodeJS.ErrnoException).code !== "ENOENT") {
                throw err;
            }
        }
        await writeFile(filePath, buffer);
        return Response.json({ success: true, file: fileName });
    } catch (error) {
        console.error(error);
        return Response.json({ error: "Upload failed" }, { status: 500 });
    }
}