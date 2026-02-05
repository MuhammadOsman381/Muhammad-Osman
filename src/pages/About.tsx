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


            <div className="flex flex-col md:flex-row items-center justify-center max-w-8xl gap-12">
                <div className="w-full text-center md:w-2/3">
                    <p className={`${isDarkMode ? "text-white" : "text-black"} mb-4`}>
                        Dedicated <span className={`${isDarkMode ? "text-white" : "text-black"} font-bold`}>full stack developer</span> focused on crafting modern, user-friendly digital experiences.
                    </p>

                    <p className={`${isDarkMode ? "text-zinc-300" : "text-black"} mb-4`}>
                        Started the development journey in 2023, consistently embracing new challenges to grow professionally. Currently pursuing a BSCS from NFC-IET Multan, with over a year of hands-on experience in web development.
                    </p>

                    <p className={`${isDarkMode ? "text-zinc-300" : "text-black"} mb-6`}>
                        Open to freelance opportunities and eager to collaborate on impactful digital solutions that drive innovation and deliver real value.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;
