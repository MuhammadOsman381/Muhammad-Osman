// import js from "../assets/skills/js.png";
import express from "../assets/skills/express.png";
import node from "../assets/skills/node.png";
import next from "../assets/skills/next.png";
import mongodb from "../assets/skills/mongodb.png";
import react from "../assets/skills/react.png";
import mysql from "../assets/skills/mysql.png";
import laravel from "../assets/skills/laravel.png"
import socket from "../assets/skills/socket.png"
// import springBoot from "../assets/skills/springBoot.png"
import ts from "../assets/skills/ts.png"
// import shadcn from "../assets/skills/shadcn.png"
// import flask from "../assets/skills/flask.png"
import github from "../assets/skills/github.jpeg"
import tailwind from "../assets/skills/tailwind.png"
import postgres from "../assets/skills/postgres.png"
import { useContext } from "react";
import { MyContext } from "../Context";

interface MyContextType {
    isDarkMode: boolean;
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const Skills = () => {
    const context: MyContextType | any = useContext(MyContext);
    const { isDarkMode } = context;

    const skills: { title: string; image: string }[] = [
        // { title: "JavaScript", image: js },
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
        // { title: "Spring Boot", image: springBoot },
        { title: "Tailwind CSS", image: tailwind },
        // { title: "ShadCN", image: shadcn },
        // { title: "Flask", image: flask },
        { title: "Socket IO", image: socket },
        { title: "GitHub", image: github },
    ];

    return (
        <div id="skills" className={`${isDarkMode ? "bg-zinc-950 text-white" : "bg-white text-zinc-900"} h-auto flex flex-col items-center justify-center   md:p-10 p-7`}>
            <button className={`${isDarkMode ? "bg-zinc-700  text-zinc-300 hover:bg-zinc-700" : "bg-black text-white   "} text-sm  py-2 px-6 rounded-full `}>
                Skills
            </button>
            <div className="w-full grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-3 mt-6">
                {skills.map((skill, index) => (
                    <div
                        key={index}
                        className={`flex flex-row flex-wrap justify-start items-center gap-3  ${isDarkMode ? "bg-zinc-900   " : "  bg-zinc-200 "}   p-3 rounded-lg  transition-transform transform hover:scale-[101%]`}
                    >
                        {
                            index === 3 || index === 5 || index === 11 ?
                                <>
                                    <span className={`  bg-white rounded-full  `} >
                                        <img src={skill.image} alt={skill.title} className="w-10 h-10   object-contain rounded-lg" />
                                    </span>
                                    <p className={`text-md ${isDarkMode ? "text-zinc-300" : "text-black"} font-medium`}>{skill.title}</p>
                                </>
                                :

                                <>
                                    <img src={skill.image} alt={skill.title} className="w-10 h-10  object-contain rounded-lg" />
                                    <p className={`text-md ${isDarkMode ? "text-zinc-300" : "text-black"} font-medium`}>{skill.title}</p>
                                </>
                        }


                    </div>
                ))}
            </div>
        </div>
    );
};

export default Skills;
