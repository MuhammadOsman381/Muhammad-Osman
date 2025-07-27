import { useContext } from "react";
import profilePic from "../assets/mo.jpeg";
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
                }  rounded-xl lg:h-auto border-none flex flex-col items-center justify-center py-12 px-6 md:px-12 text-sm`}
        >
            <button className={`${isDarkMode ? "bg-zinc-700  text-white hover:bg-zinc-700" : "bg-black text-white   "} text-sm mb-6 py-2 px-6 rounded-full `}>
                About
            </button>
            <div className=" flex flex-col md:flex-row  items-center justify-center max-w-6xl gap-12">

                <div className="w-full text-center md:w-2/3">
                    <p className={`${isDarkMode ? "text-white" : "text-black"} mb-4`}>
                        Dedicated <span className={`${isDarkMode ? "text-white" : "text-black"} font-bold`}>full stack developer</span> focused on crafting modern, user-friendly digital experiences. Specializes in building responsive web applications using{" "}
                        <span className={`${isDarkMode ? "text-white" : "text-black"} font-bold`}>React.js</span> and{" "}
                        <span className={`${isDarkMode ? "text-white" : "text-black"} font-bold`}>Node.js</span>, with a strong emphasis on clean code and intuitive design.
                    </p>

                    <p className={`${isDarkMode ? "text-zinc-300" : "text-black"} mb-4`}>
                        Started the development journey in 2023, consistently embracing new technologies and challenges to grow professionally. Currently pursuing a BSCS from NFC-IET Multan, with over a year of hands-on experience in web development.
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
