"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, X, CheckCircle2, Loader2 } from "lucide-react";

export default function Page() {
    const [file, setFile] = useState<File | null>(null);
    const [dragging, setDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploaded, setUploaded] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFile = (f: File) => {
        if (f.type === "application/pdf" || f.name.endsWith(".pdf") || f.name.endsWith(".docx")) {
            setFile(f);
            setUploaded(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
        const f = e.dataTransfer.files[0];
        if (f) handleFile(f);
    };

    const handleSubmit = async () => {
        if (!file) return;
        const formData = new FormData();
        formData.append("file", file);
        setUploading(true);
        fetch("/api/cv", { method: "POST", body: formData }).then(() => { setUploading(false); }).finally(() => { setUploaded(true); })
    };

    const reset = () => {
        setFile(null);
        setUploaded(false);
        if (inputRef.current) inputRef.current.value = "";
    };

    const formatSize = (bytes: number) =>
        bytes < 1024 * 1024
            ? `${(bytes / 1024).toFixed(1)} KB`
            : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

    return (
        <div className="min-h-screen bg-[#050508]  ">
            <div className="absolute inset-0 animated-grid opacity-40" />
            <div className="orb w-96 h-96 bg-cyan-500/8 top-0 left-0" />
            <div className="orb w-96 h-96 bg-indigo-500/8 bottom-0 right-0" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-full max-w-3xl"
            >
                <div className="relative glass rounded-3xl p-8 border-cyan-glow overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

                    {/* Header */}
                    <div className="mb-7">
                        <span className="font-mono-code text-[10px] text-cyan-500 tracking-[0.25em] uppercase">Upload</span>
                        <h2 className="font-display font-bold text-2xl text-white mt-1">Submit Your CV</h2>
                        <p className="text-slate-500 text-sm mt-1">PDF or DOCX · Max 10MB</p>
                    </div>

                    {uploaded ? (
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
                                <p className="text-slate-500 text-sm mt-1">We'll be in touch soon.</p>
                            </div>
                            <button
                                onClick={reset}
                                className="mt-2 px-6 py-2.5 rounded-xl glass border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-all text-sm"
                            >
                                Upload another
                            </button>
                        </motion.div>
                    ) : (
                        <>
                            {/* Drop zone */}
                            <div
                                onClick={() => inputRef.current?.click()}
                                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                                onDragLeave={() => setDragging(false)}
                                onDrop={handleDrop}
                                className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer mb-5 ${dragging
                                    ? "border-cyan-400/60 bg-cyan-500/8"
                                    : file
                                        ? "border-indigo-500/40 bg-indigo-500/5"
                                        : "border-white/10 hover:border-white/20 hover:bg-white/3"
                                    }`}
                            >
                                <input
                                    ref={inputRef}
                                    type="file"
                                    accept=".pdf,.docx"
                                    className="hidden"
                                    onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
                                />

                                {file ? (
                                    <div className="flex items-center gap-4 p-5">
                                        <div className="w-12 h-12 rounded-xl bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center shrink-0">
                                            <FileText size={22} className="text-indigo-400" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-white text-sm font-medium truncate">{file.name}</p>
                                            <p className="text-slate-500 text-xs font-mono-code mt-0.5">{formatSize(file.size)}</p>
                                        </div>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); reset(); }}
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

                            {/* Submit button */}
                            <motion.button
                                onClick={handleSubmit}
                                disabled={!file || uploading}
                                whileHover={{ scale: file && !uploading ? 1.02 : 1 }}
                                whileTap={{ scale: file && !uploading ? 0.98 : 1 }}
                                className="relative w-full py-3.5 rounded-xl overflow-hidden group disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-indigo-600" />
                                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors" />
                                <span className="relative z-10 flex items-center justify-center gap-2.5 text-white font-medium text-sm">
                                    {uploading ? (
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
        </div>
    );
}