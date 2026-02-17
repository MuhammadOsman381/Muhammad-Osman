import { useContext } from "react";
import { MyContext } from "../Context";

interface MyContextType {
    isDarkMode: boolean;
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const About = () => {
    const context: MyContextType | any = useContext(MyContext);
    const { isDarkMode } = context;

    return (
        <section
            id="about"
            className={`${isDarkMode ? "bg-zinc-950 text-white" : "bg-zinc-100 text-black"
                } rounded-xl lg:h-auto border-none flex flex-col items-center justify-center py-12 px-6 md:px-12 text-sm`}
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
                About
            </button>

            <div className="text-center text-zinc-400">
                Full Stack Software Developer with hands-on experience building scalable, <br /> AI-powered web
                applications using React.js, Node.js, FastAPI, and AWS. <br /> Skilled in secure authentication, REST APIs,
                database-driven systems, and Agile development, <br /> with proven experience delivering production-
                ready solutions.
            </div>
        </section>
    );
};

export default About;
