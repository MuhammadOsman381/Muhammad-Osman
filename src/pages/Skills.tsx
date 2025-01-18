import js from "../assets/skills/js.png";
import express from "../assets/skills/express.png";
import node from "../assets/skills/node.png";
import next from "../assets/skills/next.png";
import mongodb from "../assets/skills/mongodb.png";
import react from "../assets/skills/react.png";
import mysql from "../assets/skills/mysql.png";
import laravel from "../assets/skills/laravel.png"
import socket from "../assets/skills/socket.png"
import springBoot from "../assets/skills/springBoot.png"
import ts from "../assets/skills/ts.png"
import shadcn from "../assets/skills/shadcn.png"
import daisyui from "../assets/skills/daisyui.png"
import github from "../assets/skills/github.jpeg"
import tailwind from "../assets/skills/tailwind.png"
import postgres from "../assets/skills/postgres.png"

const Skills = ({ isDarkMode }: { isDarkMode: boolean }) => {
    const skills: { title: string; image: string }[] = [
        { title: "JavaScript", image: js },
        { title: "TypeScript", image: ts },
        { title: "React JS", image: react },
        { title: "Node js", image: node },
        { title: "Express", image: express },
        { title: "MongoDB", image: mongodb },
        { title: "Next js", image: next },
        { title: "React Native", image: react },
        { title: "Laravel", image: laravel },
        { title: "MySQL", image: mysql },
        { title: "PostgreSql", image: postgres },
        { title: "Spring Boot", image: springBoot },
        { title: "Tailwind CSS", image: tailwind },
        { title: "ShadCN", image: shadcn },
        { title: "Daisy UI", image: daisyui },
        { title: "Socket IO", image: socket },
        { title: "GitHub", image: github },
    ];

    return (
        <div id="skills" className={`${isDarkMode ? "bg-gray-900 text-white" : "bg-transparent text-gray-900"} lg:h-screen flex flex-col items-center justify-center   md:p-10 p-7`}>
           <button className={`${isDarkMode ? "bg-gray-600  text-gray-300 hover:bg-gray-700" :"bg-gray-300 text-gray-600   "} text-sm  py-2 px-6 rounded-full `}>
                Skills
            </button>
            <h2 className="text-2xl font-bold  mb-10 mt-10 w-full text-center">What I know?</h2>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {skills.map((skill, index) => (
                    <div
                        key={index}
                        className={`flex flex-row items-center gap-5  ${isDarkMode ? "bg-gray-800" : "  bg-gray-100"}  p-3 rounded-lg shadow transition-transform transform hover:scale-[101%]`}
                    >
                        <span className=" p-3 bg-white rounded-xl" >
                            <img src={skill.image} alt={skill.title} className="w-16 h-16 object-contain rounded-xl" />
                        </span>
                        <p className="text-lg font-medium">{skill.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Skills;
