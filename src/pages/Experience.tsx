import { useContext } from "react";
import { MyContext } from "../Context";

interface MyContextType {
    isDarkMode: boolean;
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const Experience = () => {
    const context: MyContextType | any = useContext(MyContext);
    const { isDarkMode } = context;

    const experiences = [
        {
            role: "Associate Software Developer",
            company: "Cyberify, Multan, Pakistan",
            period: "August 2025 – October 2025",
            projects: [
                {
                    title: "AI Recruitment Automation System",
                    requirements:
                        "Automate pre-screening of candidates, evaluate interview responses automatically, validate uploaded documents securely, and notify shortlisted applicants.",
                    solution:
                        "Built AI-powered scoring system using LangChain, automated document extraction and validation, implemented automatic shortlisting workflow, and integrated AWS S3 for secure file handling.",
                    tech: "React.js, FastAPI, PostgreSQL, LangChain, AWS S3",
                    labelColors: { req: "text-blue-500", sol: "text-green-500", tech: "text-purple-500" }
                },
                {
                    title: "AI Job Discovery & Course Management Platform",
                    requirements:
                        "Centralize job listings, validate and enrich scraped job data, allow admin-controlled course management, and enable secure content uploads.",
                    solution:
                        "Built scraping pipeline using BeautifulSoup & Selenium, created admin dashboard for course management, integrated AWS S3 for secure storage, and structured validated job database.",
                    tech: "React.js, FastAPI, PostgreSQL, LangChain, AWS S3, Beautiful Soup, Selenium",
                    labelColors: { req: "text-blue-500", sol: "text-green-500", tech: "text-purple-500" }
                },
            ]
        },
        {
            role: "Freelance Software Developer",
            company: "Self-Employed, Remote",
            period: "2024 – Present",
            projects: [
                {
                    title: "HolyVibes – Learning Management System (LMS)",
                    requirements:
                        "Develop scalable role-based LMS enabling admins, teachers, and students to manage classes, meeting links, course content, enrollment, and attendance with secure access control.",
                    solution:
                        "Built full-stack LMS with automated authentication and role-based workflows, allowing teachers to manage classes and content while students enroll, access sessions, and track attendance efficiently.",
                    tech: "React.js, Laravel, MySQL, Hostinger",
                    labelColors: { req: "text-blue-600", sol: "text-green-600", tech: "text-purple-600" }
                },
                {
                    title: "Student Management System",
                    requirements:
                        "Manage students, teachers, subjects, attendance, and results with easy data import and export of reports.",
                    solution:
                        "Developed full-stack system with Excel import for students, teachers, and subjects; teachers can add results, attendance coordinator can mark attendance, and administrators can download reports.",
                    tech: "React.js, Node.js, MongoDB",
                    labelColors: { req: "text-blue-400", sol: "text-green-400", tech: "text-purple-400" }
                },
                {
                    title: "eBay Integration – Comic Book Data Automation System",
                    requirements:
                        "Automate extraction and analysis of out-of-stock comic book listings from eBay with secure user authentication and extract CGC certification numbers.",
                    solution:
                        "Designed automated scraping and processing system using Apify and Regex to extract, structure, and rank comic data, displayed in dynamic tabular interface with controlled access.",
                    tech: "HTML, CSS, JavaScript, FastAPI, Apify",
                    labelColors: { req: "text-blue-500", sol: "text-green-500", tech: "text-purple-500" }
                },
                {
                    title: "Vedeera – Employee Attendance & Workforce Management System",
                    requirements:
                        "Develop secure workforce management system with role-based access control, enabling employee check-in/check-out and real-time attendance monitoring with working hour calculations.",
                    solution:
                        "Built full-stack system with Firebase Auth, admin and employee roles, backend hour calculations, mobile check-in integration, deployed scalable infrastructure on AWS.",
                    tech: "React.js, Node.js, PostgreSQL, Firebase Auth, AWS",
                    labelColors: { req: "text-blue-600", sol: "text-green-600", tech: "text-purple-600" }
                },
                {
                    title: "TripAdvisor-Like Mobile App",
                    requirements:
                        "Build travel and restaurant discovery app with interactive maps and smart trip planner to manage cities, restaurants, visit timing, and ride scheduling.",
                    solution:
                        "Developed cross-platform app with Mapbox integration for maps and smart trip planner with backend support for trip management.",
                    tech: "React Native, Node.js, Supabase",
                    labelColors: { req: "text-blue-500", sol: "text-green-500", tech: "text-purple-500" }
                },
                {
                    title: "Musical Keyboards – Music Refining Keyboard",
                    requirements:
                        "Build web-based virtual musical keyboard allowing users to select instruments and play single notes or multiple chords interactively.",
                    solution:
                        "Created interactive keyboard interface integrated with Tone.js to generate instrument-based sounds, enabling users to switch instruments and play multiple chords in real time.",
                    tech: "React.js, Tone.js",
                    labelColors: { req: "text-blue-400", sol: "text-green-400", tech: "text-purple-400" }
                }
            ]
        },

    ];

    const fyp = {
        role: "Final Year Project",
        company: "National Fertilizer Corporation Institute of Engineering & Technology (NFC-IET)",
        period: "",
        projects: [
            {
                title: "AI-Based CRO System for E-Commerce Stores (In Progress)",
                curent: "Developing a RAG-based AI system to analyze e-commerce sites and generate conversion optimization recommendations.",
                tech: "FastAPI, Python, LangChain, LangGraph, React, Vector Database, Playwright/Selenium, Redis",
                labelColors: { req: "text-blue-500", sol: "text-green-500", tech: "text-purple-500" }
            },
        ]
    }

    return (
        <section
            id="experience"
            className={`${isDarkMode ? "bg-zinc-950 text-white" : "bg-zinc-100 text-black"
                } rounded-xl lg:h-auto border-none flex flex-col items-center justify-center py-3 px-3 md:px-12 text-sm`}
        >
            <button
                className={`
          relative text-sm py-2 px-6 rounded-full transition-all duration-300
          mb-6
          ${isDarkMode
                        ? "bg-zinc-800 text-zinc-200 shadow-[0_0_10px_rgba(244,244,245,0.35)] hover:shadow-[0_0_25px_rgba(244,244,245,0.6)]"
                        : "bg-zinc-900 text-zinc-100 shadow-[0_0_10px_rgba(113,113,122,0.6)] hover:shadow-[0_0_25px_rgba(113,113,122,0.9)]"
                    }
        `}
            >
                Experience
            </button>

            <div className="flex flex-col  items-center max-w-full w-full gap-8">
                {experiences.map((exp, idx) => (
                    <div
                        key={idx}
                        className={`max-sm:p-2 p-5 rounded-3xl border ${isDarkMode
                            ? "bg-zinc-900 border-zinc-700"
                            : "bg-gray-50 border-gray-200 shadow-sm"
                            }`}
                    >
                        <h4 className="font-semibold text-base mb-1 max-sm:px-3 max-sm:mt-2">{exp.role}</h4>
                        <p className="text-sm mb-3 font-medium text-zinc-400 max-sm:px-3">{exp.company} | {exp.period}</p>

                        {exp.projects.map((project, pIdx) => (
                            <div key={pIdx} className="mb-6 bg-zinc-950 p-3 rounded-xl border-l-4 border-zinc-700">
                                <h5 className="font-semibold text-sm mb-2">{project.title}</h5>

                                {/* Requirements */}
                                <div className="mb-2">
                                    <h6 className={`font-medium text-sm mb-1 ${project.labelColors.req}`}>
                                        Requirements
                                    </h6>
                                    <p className="text-sm">{project.requirements}</p>
                                </div>

                                {/* Solution */}
                                <div className="mb-2">
                                    <h6 className={`font-medium text-sm mb-1 ${project.labelColors.sol}`}>
                                        Solution
                                    </h6>
                                    <p className="text-sm">{project.solution}</p>
                                </div>

                                <div>
                                    <h6 className={`font-medium text-sm mb-1 ${project.labelColors.tech}`}>
                                        Tech Stack
                                    </h6>
                                    <p className="italic text-sm text-zinc-300">{project.tech}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
                {
                    <div
                        key={fyp.role}
                        className={`p-7 w-full max-sm:p-2 p-5 bg-zinc-900 rounded-3xl border ${isDarkMode
                            ? " border-zinc-700"
                            : "bg-gray-50 border-gray-200 shadow-sm"
                            }`}
                    >
                        <h4 className="font-semibold text-base mb-1 max-sm:px-3 max-sm:mt-2">{fyp.role}</h4>
                        <p className="text-sm mb-3 font-medium text-zinc-400 max-sm:px-3">{fyp.company}</p>

                        {fyp.projects.map((project, pIdx) => (
                            <div key={pIdx} className="mb-6 bg-zinc-950 p-3 rounded-xl border-l-4 border-zinc-700">
                                <h5 className="font-semibold text-sm mb-2">{project.title}</h5>                                                               <div className="mb-2">
                                    <h6 className={`font-medium text-sm mb-1 ${project.labelColors.req}`}>
                                        Requirements
                                    </h6>
                                    <p className="text-sm">{project.curent}</p>
                                </div>

                                <div>
                                    <h6 className={`font-medium text-sm mb-1 ${project.labelColors.tech}`}>
                                        Tech Stack
                                    </h6>
                                    <p className="italic text-sm text-zinc-300">{project.tech}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </section>
    );
};

export default Experience;