"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, X, CheckCircle2, Loader2, ImageIcon } from "lucide-react";

export default function Page() {
    const [cvFile, setCvFile] = useState<File | null>(null);
    const [imgFile, setImgFile] = useState<File | null>(null);
    const [cvDragging, setCvDragging] = useState(false);
    const [imgDragging, setImgDragging] = useState(false);
    const [cvUploading, setCvUploading] = useState(false);
    const [imgUploading, setImgUploading] = useState(false);
    const [cvUploaded, setCvUploaded] = useState(false);
    const [imgUploaded, setImgUploaded] = useState(false);
    const [imgPreview, setImgPreview] = useState<string | null>(null);
    const cvInputRef = useRef<HTMLInputElement>(null);
    const imgInputRef = useRef<HTMLInputElement>(null);

    const handleCvFile = (f: File) => {
        if (f.type === "application/pdf" || f.name.endsWith(".pdf") || f.name.endsWith(".docx")) {
            setCvFile(f);
            setCvUploaded(false);
        }
    };

    const handleImgFile = (f: File) => {
        if (f.type.startsWith("image/")) {
            setImgFile(f);
            setImgUploaded(false);
            const reader = new FileReader();
            reader.onload = (e) => setImgPreview(e.target?.result as string);
            reader.readAsDataURL(f);
        }
    };

    const handleCvDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setCvDragging(false);
        const f = e.dataTransfer.files[0];
        if (f) handleCvFile(f);
    };

    const handleImgDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setImgDragging(false);
        const f = e.dataTransfer.files[0];
        if (f) handleImgFile(f);
    };

    const handleCvSubmit = async () => {
        if (!cvFile) return;
        const formData = new FormData();
        formData.append("file", cvFile);
        setCvUploading(true);
        fetch("/api/cv", { method: "POST", body: formData })
            .then(() => setCvUploaded(true))
            .finally(() => setCvUploading(false));
    };

    const handleImgSubmit = async () => {
        if (!imgFile) return;
        console.log("Image file:", imgFile);
        setImgUploading(true);
        const formData = new FormData();
        formData.append("file", imgFile);
        fetch("/api/image", { method: "POST", body: formData })
            .then(() => setImgUploaded(true))
            .finally(() => setImgUploading(false));
    };

    const resetCv = () => {
        setCvFile(null);
        setCvUploaded(false);
        if (cvInputRef.current) cvInputRef.current.value = "";
    };

    const resetImg = () => {
        setImgFile(null);
        setImgUploaded(false);
        setImgPreview(null);
        if (imgInputRef.current) imgInputRef.current.value = "";
    };

    const formatSize = (bytes: number) =>
        bytes < 1024 * 1024
            ? `${(bytes / 1024).toFixed(1)} KB`
            : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

    return (
        <div className="min-h-screen bg-[#050508] flex flex-col gap-5">
            <div className="absolute inset-0 animated-grid opacity-40" />
            <div className="orb w-96 h-96 bg-cyan-500/8 top-0 left-0" />
            <div className="orb w-96 h-96 bg-indigo-500/8 bottom-0 right-0" />

            {/* CV Upload */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-full max-w-3xl"
            >
                <div className="relative glass rounded-3xl p-8 border-cyan-glow overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
                    <div className="mb-7">
                        <span className="font-mono-code text-[10px] text-cyan-500 tracking-[0.25em] uppercase">Upload</span>
                        <h2 className="font-display font-bold text-2xl text-white mt-1">Submit Your CV</h2>
                        <p className="text-slate-500 text-sm mt-1">PDF · Max 50MB</p>
                    </div>

                    {cvUploaded ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center py-8 gap-4 text-center"
                        >
                            <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                            </div>
                            <div>
                                <p className="font-display font-bold text-white text-lg">CV Uploaded!</p>
                                <p className="text-slate-500 text-sm mt-1">Your CV has been saved.</p>
                            </div>
                            <button
                                onClick={resetCv}
                                className="mt-2 px-6 py-2.5 rounded-xl glass border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-all text-sm"
                            >
                                Upload another
                            </button>
                        </motion.div>
                    ) : (
                        <>
                            <div
                                onClick={() => cvInputRef.current?.click()}
                                onDragOver={(e) => { e.preventDefault(); setCvDragging(true); }}
                                onDragLeave={() => setCvDragging(false)}
                                onDrop={handleCvDrop}
                                className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer mb-5 ${cvDragging
                                    ? "border-cyan-400/60 bg-cyan-500/8"
                                    : cvFile
                                        ? "border-indigo-500/40 bg-indigo-500/5"
                                        : "border-white/10 hover:border-white/20 hover:bg-white/3"
                                    }`}
                            >
                                <input
                                    ref={cvInputRef}
                                    type="file"
                                    accept=".pdf,.docx"
                                    className="hidden"
                                    onChange={(e) => { const f = e.target.files?.[0]; if (f) handleCvFile(f); }}
                                />
                                {cvFile ? (
                                    <div className="flex items-center gap-4 p-5">
                                        <div className="w-12 h-12 rounded-xl bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center shrink-0">
                                            <FileText size={22} className="text-indigo-400" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-white text-sm font-medium truncate">{cvFile.name}</p>
                                            <p className="text-slate-500 text-xs font-mono-code mt-0.5">{formatSize(cvFile.size)}</p>
                                        </div>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); resetCv(); }}
                                            className="text-slate-600 hover:text-red-400 transition-colors p-1 shrink-0"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-3 py-10 px-6 text-center">
                                        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                                            <Upload size={20} className="text-slate-400" />
                                        </div>
                                        <div>
                                            <p className="text-slate-300 text-sm font-medium">
                                                Drop your CV here or <span className="text-cyan-400">browse</span>
                                            </p>
                                            <p className="text-slate-600 text-xs font-mono-code mt-1">PDF · DOCX</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <motion.button
                                onClick={handleCvSubmit}
                                disabled={!cvFile || cvUploading}
                                whileHover={{ scale: cvFile && !cvUploading ? 1.02 : 1 }}
                                whileTap={{ scale: cvFile && !cvUploading ? 0.98 : 1 }}
                                className="relative w-full py-3.5 rounded-xl overflow-hidden group disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-indigo-600" />
                                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors" />
                                <span className="relative z-10 flex items-center justify-center gap-2.5 text-white font-medium text-sm">
                                    {cvUploading ? (
                                        <><Loader2 className="w-4 h-4 animate-spin" />Uploading…</>
                                    ) : (
                                        <><Upload className="w-4 h-4" />Submit CV</>
                                    )}
                                </span>
                            </motion.button>
                        </>
                    )}
                </div>
            </motion.div>

            {/* Image Upload */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="relative z-10 w-full max-w-3xl"
            >
                <div className="relative glass rounded-3xl p-8 border-cyan-glow overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
                    <div className="mb-7">
                        <span className="font-mono-code text-[10px] text-cyan-500 tracking-[0.25em] uppercase">Upload</span>
                        <h2 className="font-display font-bold text-2xl text-white mt-1">Submit Your Picture</h2>
                        <p className="text-slate-500 text-sm mt-1">JPG · PNG · Max 5MB</p>
                    </div>

                    {imgUploaded ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center py-8 gap-4 text-center"
                        >
                            <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                            </div>
                            <div>
                                <p className="font-display font-bold text-white text-lg">Picture Uploaded!</p>
                                <p className="text-slate-500 text-sm mt-1">Your picture has been saved.</p>
                            </div>
                            <button
                                onClick={resetImg}
                                className="mt-2 px-6 py-2.5 rounded-xl glass border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-all text-sm"
                            >
                                Upload another
                            </button>
                        </motion.div>
                    ) : (
                        <>
                            <div
                                onClick={() => imgInputRef.current?.click()}
                                onDragOver={(e) => { e.preventDefault(); setImgDragging(true); }}
                                onDragLeave={() => setImgDragging(false)}
                                onDrop={handleImgDrop}
                                className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer mb-5 ${imgDragging
                                    ? "border-cyan-400/60 bg-cyan-500/8"
                                    : imgFile
                                        ? "border-indigo-500/40 bg-indigo-500/5"
                                        : "border-white/10 hover:border-white/20 hover:bg-white/3"
                                    }`}
                            >
                                <input
                                    ref={imgInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImgFile(f); }}
                                />
                                {imgFile ? (
                                    <div className="flex items-center gap-4 p-5">
                                        {imgPreview && (
                                            <img
                                                src={imgPreview}
                                                alt="preview"
                                                className="w-12 h-12 rounded-xl object-cover shrink-0 border border-indigo-500/25"
                                            />
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-white text-sm font-medium truncate">{imgFile.name}</p>
                                            <p className="text-slate-500 text-xs font-mono-code mt-0.5">{formatSize(imgFile.size)}</p>
                                        </div>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); resetImg(); }}
                                            className="text-slate-600 hover:text-red-400 transition-colors p-1 shrink-0"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-3 py-10 px-6 text-center">
                                        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                                            <ImageIcon size={20} className="text-slate-400" />
                                        </div>
                                        <div>
                                            <p className="text-slate-300 text-sm font-medium">
                                                Drop your picture here or <span className="text-cyan-400">browse</span>
                                            </p>
                                            <p className="text-slate-600 text-xs font-mono-code mt-1">JPG · PNG · WEBP</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <motion.button
                                onClick={handleImgSubmit}
                                disabled={!imgFile || imgUploading}
                                whileHover={{ scale: imgFile && !imgUploading ? 1.02 : 1 }}
                                whileTap={{ scale: imgFile && !imgUploading ? 0.98 : 1 }}
                                className="relative w-full py-3.5 rounded-xl overflow-hidden group disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-indigo-600" />
                                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors" />
                                <span className="relative z-10 flex items-center justify-center gap-2.5 text-white font-medium text-sm">
                                    {imgUploading ? (
                                        <><Loader2 className="w-4 h-4 animate-spin" />Uploading…</>
                                    ) : (
                                        <><Upload className="w-4 h-4" />Submit Picture</>
                                    )}
                                </span>
                            </motion.button>
                        </>
                    )}
                </div>
            </motion.div>
        </div>
    );
}