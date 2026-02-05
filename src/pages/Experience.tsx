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
            role: "Associate Software Engineer — Probation",
            company: "Cybrify",
            duration: "Sept 2025 – Nov 2025",
            projects: [
                {
                    title: "HolyVibes – Learning Management System (LMS)",
                    description: `Developed a role-based LMS for admins, teachers, and students.
Enabled teachers to create classes with meeting links and manage course content.
Implemented student enrollment, class access, and attendance workflows.
Built secure authentication and role-based access control.
Delivered a scalable, user-friendly full-stack solution.`,
                    tech: "React.js, Laravel, MySQL, Deployed on Hostinger"
                },
                {
                    title: "AI Recruitment Automation System",
                    description: `Built an AI-powered system to evaluate pre-screen interview responses.
Automated candidate scoring and shortlisting using defined evaluation rules.
Integrated document data extraction and validation for eligibility checks.
Automated email notifications to shortlisted candidates.
Reduced manual screening effort through end-to-end workflow automation.`,
                    tech: "React.js, FastAPI, PostgreSQL, LangChain, AWS deployment, AWS Textract, S3"
                },
                {
                    title: "AI Job Discovery & Course Management Platform",
                    description: `Scraped job listings from multiple websites and centralized job data.
Filtered jobs specifically related to housing schemes.
Enriched and validated job listings using additional sources.
Built an admin panel to create courses and manage learning materials.
Implemented secure file uploads and storage for course content using AWS S3.`,
                    tech: "React.js, FastAPI, PostgreSQL, LangChain, AWS deployment, S3, BeautifulSoup, Selenium"
                },
            ]
        },
    ];

    return (
        <section
            id="experience"
            className={`${isDarkMode ? "bg-zinc-950 text-white" : "bg-zinc-100 text-black"
                } rounded-xl lg:h-auto border-none flex flex-col items-center justify-center py-12 px-6 md:px-12 text-sm`}
        >
            <button className={`${isDarkMode ? "bg-zinc-700 text-zinc-300 hover:bg-zinc-700" : "bg-black text-white"} text-sm mb-6 py-2 px-6 rounded-full`}>
                Experience
            </button>

            <div className="flex flex-col items-center max-w-8xl w-full gap-8">
                {experiences.map((exp, idx) => (
                    <div
                        key={idx}
                        className={`w-full rounded-2xl p-6 border ${isDarkMode ? "border-zinc-700 bg-zinc-900" : "border-gray-300 bg-white shadow-md"
                            }`}
                    >
                        <h3 className="text-lg font-bold mb-1">{exp.role}</h3>
                        <p className={`${isDarkMode ? "text-zinc-300" : "text-gray-600"} mb-4`}>
                            {exp.company} | {exp.duration}
                        </p>

                        <div className="flex flex-col gap-4">
                            {exp.projects.map((project, i) => (
                                <div key={i} className="p-4 rounded-xl border-l-4 border-blue-500">
                                    <h4 className="font-semibold">{project.title}</h4>
                                    <p className={`${isDarkMode ? "text-zinc-300" : "text-gray-700"} mt-1 whitespace-pre-line`}>
                                        {project.description}
                                    </p>
                                    <p className="mt-2 italic text-sm text-blue-500">{project.tech}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Experience;
