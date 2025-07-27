import { useContext } from "react";
// import profilePic from "../assets/mo.jpeg";
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
            className={`${isDarkMode ? "bg-zinc-900 text-white" : "bg-zinc-100 text-black"
                }   lg:h-auto border-none flex flex-col items-center justify-center py-12 px-6 md:px-12`}
        >
            <button className={`${isDarkMode ? "bg-zinc-700  text-white hover:bg-zinc-700" : "bg-black text-white   "} text-sm mb-6 py-2 px-6 rounded-full `}>
                About
            </button>
            <div className=" flex flex-col md:flex-row  items-center justify-center max-w-6xl gap-12">
                {/* <div className="w-full md:w-1/3    flex justify-center">
                    <div className="relative bg-zinc-800 rounded-lg overflow-hidden shadow-lg w-64 h-64 md:w-full md:h-auto">
                        <img
                            src={profilePic}
                            alt="About Me"
                            className="object-cover w-full h-full rounded-lg"
                        />
                    </div>
                </div> */}
                <div className=" w-full text-center md:w-2/3">
                    <p
                        className={`${isDarkMode ? "text-white" : "text-black"
                            } mb-4`}
                    >
                        I'm a passionate <span className={`${isDarkMode ? "text-white" : "text-black"} font-bold`}>developer</span>{" "}
                        with a focus on{" "}
                        <span className={`${isDarkMode ? "text-white" : "text-black"} font-bold`}>full stack development</span>. I
                        love bringing digital products to life through well-crafted designs,
                        clean code, and user-friendly experiences.
                    </p>
                    <p
                        className={`${isDarkMode ? "text-zinc-300" : "text-black"
                            } mb-4`}
                    >
                        My journey began as a developer in 2023, and since then, I’ve
                        embraced new challenges and technologies. I specialize in creating
                        modern applications using technologies like{" "}
                        <span className={`${isDarkMode ? "text-white" : "text-black"} font-bold`}>React.js, Node.js</span>.
                    </p>
                    <p
                        className={`${isDarkMode ? "text-zinc-300" : "text-black"
                            } mb-6`}
                    >
                        Let’s create
                        something amazing together!
                    </p>
                    <ul
                        className={`list-disc list-inside ${isDarkMode ? "text-zinc-300" : "text-black"
                            }`}
                    >
                        <li>Pursuing BSCS from NFC-IET Multan</li>
                        <li>1+ year of experience</li>
                        <li>Open to freelance projects</li>
                    </ul>
                    <p
                        className={`mt-6 ${isDarkMode ? "text-zinc-300" : "text-black"
                            }`}
                    >
                        Feel free to reach out if you want to collaborate! 😊
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;
