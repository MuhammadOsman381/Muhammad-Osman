import { motion } from "motion/react";
import { FaEye } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

interface Data {
    title: string;
    description: string;
    tech_stack: string[];
    image: string;
    video: string;
    github_link: string;
    showVideo: boolean;
}

interface ProjectData {
    data: Data;
    index: number;
    isDarkMode: boolean;
}

const ProjectCard = ({ data, index, isDarkMode }: ProjectData) => {
    return (
        <div
            key={data.title}
            className={`   ${isDarkMode ? "bg-zinc-800  " : "bg-zinc-200 "
                } rounded-2xl flex flex-col ${index % 2 === 0 ? "lg:flex-row-reverse   " : "lg:flex-row"
                } overflow-hidden     `}
        >
            <div className={`w-full lg:w-[40%] bg-transparent flex justify-center items-center p-4 lg:p-6`}>
                {!data.showVideo ? (
                    <video
                        src={data.video}
                        className="w-full h-auto  object-cover rounded-xl "
                        controls
                        autoPlay
                    />
                ) : (
                    <img
                        src={data.image}
                        alt="Project Screenshot"
                        className="w-full h-auto  object-cover rounded-xl "
                    />
                )}
            </div>




            <div
                className={`w-full lg:w-[60%]  flex flex-col justify-center ${isDarkMode ? "bg-zinc-950" : "bg-white"
                    } px-6 py-6 sm:px-8 sm:py-8`}
            >
                <h3
                    className={`text-xl sm:text-2xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-zinc-700"
                        }`}
                >
                    {data.title}
                </h3>
                <p
                    className={`text-sm    sm:text-base ${isDarkMode ? "text-zinc-400" : "text-zinc-600"
                        } mb-6 leading-relaxed`}
                >
                    {data.description}
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3 mb-6">
                    {data?.tech_stack.map((tech: string) => (
                        <span
                            key={tech}
                            className={`${isDarkMode
                                ? "bg-zinc-700 text-zinc-300"
                                : "bg-black text-white"
                                } text-xs sm:text-sm px-3 py-1 rounded-full`}
                        >
                            {tech}
                        </span>
                    ))}
                </div>
                <div className="flex flex-wrap gap-4">
                    {data.showVideo && data.title !== "Nexora" && (
                        <motion.button>
                            <Link
                                to={`/watch/${index}`}
                                className="relative group border border-indigo-500 text-indigo-400 hover:text-white px-4 py-2 sm:px-4 sm:py-2 rounded-lg flex flex-row items-center justify-center gap-2 text-xs sm:text-sm font-medium transition-all duration-200 shadow-[0_0_10px_rgba(99,102,241,0.5)] hover:shadow-[0_0_20px_rgba(99,102,241,0.8)]"
                            >
                                <span className="z-10">Watch</span>
                                <FaEye size={15} className="z-10" />
                                <span className="absolute inset-0 bg-indigo-500 opacity-0 group-hover:opacity-0 rounded-xl transition duration-300 blur-sm"></span>
                            </Link>
                        </motion.button>
                    )}
                    <a
                        href={data.github_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative group border border-emerald-500 text-emerald-400 hover:text-white px-4 py-2 sm:px-4 sm:py-2 rounded-lg flex items-center justify-center gap-2 text-xs sm:text-sm font-medium transition-all duration-200 shadow-[0_0_10px_rgba(16,185,129,0.5)] hover:shadow-[0_0_20px_rgba(16,185,129,0.8)]"
                    >
                        <span className="z-10">Code</span>
                        <FaGithub size={15} className="z-10" />
                        <span className="absolute inset-0 bg-emerald-500 opacity-0 group-hover:opacity-20 rounded-xl transition duration-300 blur-sm"></span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
