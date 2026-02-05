import { motion } from "motion/react";
import { FaExternalLinkAlt, FaEye } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

interface Data {
    title: string;
    description: string;
    tech_stack: string[];
    image: string;
    video?: string;
    github_link: string;
    showVideo: boolean;
    live_link?: string;
}

interface ProjectData {
    data: Data;
    index: number;
    isDarkMode: boolean;
}

const ProjectCard = ({ data, index, isDarkMode }: ProjectData) => {
    return (
      <motion.div
    key={data.title}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className={`
        ${isDarkMode ? "bg-zinc-950 p-2" : "bg-zinc-200"}
        rounded-2xl max-w-full border-zinc-500 flex flex-col
        
        ${index % 2 === 0
            ? "border-t-4 xl:border-t-0 xl:border-r-4 xl:flex-row-reverse"
            : "border-t-4 xl:border-t-0 xl:border-l-4 xl:flex-row"}
    `}
>
            {/* Media Section */}
            <div className="w-full lg:w-full bg-zinc-950 rounded-2xl flex justify-center items-center">
                {!data.showVideo ? (
                    <video
                        src={data?.video}
                        className="w-full h-auto object-cover rounded-xl"
                        controls
                        autoPlay
                    />
                ) : (
                    <img
                        src={data.image}
                        alt="Project Screenshot"
                        className="w-full h-auto object-cover rounded-2xl border-t-2 border-zinc-600"
                    />
                )}
            </div>

            {/* Content Section */}
            <div
                className={`
                    w-full lg:w-full rounded-2xl flex flex-col justify-center
                    ${isDarkMode ? "bg-zinc-950" : "bg-white"}
                    px-4 py-4 sm:px-8 sm:py-8
                `}
            >
                <h3
                    className={`
                        text-xl sm:text-2xl font-bold mb-4
                        ${isDarkMode ? "text-zinc-100" : "text-zinc-700"}
                    `}
                >
                    {data.title}
                </h3>

                <p
                    className={`
                        text-xs sm:text-sm mb-6 leading-relaxed
                        ${isDarkMode ? "text-zinc-400" : "text-zinc-600"}
                    `}
                >
                    {data.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 sm:gap-3 mb-6">
                    {data.tech_stack.map((tech: string) => (
                        <span
                            key={tech}
                            className={`
                                text-xs sm:text-sm px-3 py-1 rounded-full
                                ${isDarkMode
                                    ? "bg-zinc-800 text-zinc-300"
                                    : "bg-black text-white"}
                            `}
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-4">
                    {data.showVideo && data.title !== "Nexora" && data.video && (
                        <motion.button>
                            <Link
                                to={`/watch/${index}`}
                                className="relative group border border-indigo-500 text-indigo-400 hover:text-white px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs sm:text-sm font-medium transition-all duration-200 shadow-[0_0_10px_rgba(99,102,241,0.5)] hover:shadow-[0_0_20px_rgba(99,102,241,0.8)]"
                            >
                                <span className="z-10">Watch</span>
                                <FaEye size={15} className="z-10" />
                                <span className="absolute inset-0 bg-indigo-500 opacity-0 group-hover:opacity-20 rounded-xl transition duration-300 blur-sm"></span>
                            </Link>
                        </motion.button>
                    )}

                    <a
                        href={data.github_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative group border border-emerald-500 text-emerald-400 hover:text-white px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs sm:text-sm font-medium transition-all duration-200 shadow-[0_0_10px_rgba(16,185,129,0.5)] hover:shadow-[0_0_20px_rgba(16,185,129,0.8)]"
                    >
                        <span className="z-10">Code</span>
                        <FaGithub size={15} className="z-10" />
                        <span className="absolute inset-0 bg-emerald-500 opacity-0 group-hover:opacity-20 rounded-xl transition duration-300 blur-sm"></span>
                    </a>

                    {data.live_link && (
                        <a
                            href={data.live_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative group border border-amber-500 text-amber-400 hover:text-white px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs sm:text-sm font-medium transition-all duration-200 shadow-[0_0_10px_rgba(245,158,11,0.5)] hover:shadow-[0_0_20px_rgba(245,158,11,0.8)]"
                        >
                            <span className="z-10">Live</span>
                            <FaExternalLinkAlt size={15} className="z-10" />
                            <span className="absolute inset-0 bg-amber-500 opacity-0 group-hover:opacity-20 rounded-xl transition duration-300 blur-sm"></span>
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
