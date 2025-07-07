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
            className={`  ${isDarkMode ? "bg-gray-700 " : "bg-gray-200 "
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
                className={`w-full lg:w-[60%]  flex flex-col justify-center ${isDarkMode ? "bg-gray-900" : "bg-white"
                    } px-6 py-6 sm:px-8 sm:py-8`}
            >
                <h3
                    className={`text-xl sm:text-2xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-700"
                        }`}
                >
                    {data.title}
                </h3>
                <p
                    className={`text-sm  sm:text-base ${isDarkMode ? "text-gray-400" : "text-gray-600"
                        } mb-6 leading-relaxed`}
                >
                    {data.description}
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3 mb-6">
                    {data?.tech_stack.map((tech: string) => (
                        <span
                            key={tech}
                            className={`${isDarkMode
                                ? "bg-gray-700 text-gray-300"
                                : "bg-black text-white"
                                } text-xs sm:text-sm px-3 py-1 rounded-full`}
                        >
                            {tech}
                        </span>
                    ))}
                </div>
                <div className="flex flex-wrap gap-4">
                    {data.showVideo && (
                        <Link
                            to={`/watch/${index}`}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 sm:px-6 sm:py-2 rounded-xl flex flex-row items-center justify-center gap-2 text-xs sm:text-sm font-medium transition-all duration-200"
                        >
                            <span>Watch</span>
                            <FaEye size={15} />
                        </Link>
                    )}
                    <a
                        href={data.github_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 sm:px-6 sm:py-2 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm font-medium transition-all duration-200"
                    >
                         <span>Code</span>
                        <FaGithub size={15} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
