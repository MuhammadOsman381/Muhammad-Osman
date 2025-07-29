import { FaMapMarkerAlt, FaGithub } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";
import profilePic from "../assets/MO-AI-Pic.png";
import "../App.css";
import { useContext } from "react";
import { MyContext } from "../Context";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
// import ShootingStar from "../components/ShootingStars";
import ShootingStars from "../components/ShootingStars";

interface MyContextType {
    isDarkMode: boolean;
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const Home = () => {
    const context: MyContextType | any = useContext(MyContext);
    const { isDarkMode } = context;

    return (
        <section
            id="home"
            className={`${isDarkMode ? "bg-zinc-950 text-white" : "bg-white text-black"
                } flex   items-center justify-center h-[80vh] px-5  lg:h-[70vh]`}
        >

            {/* <section className=" h-[0vh] border overflow-hidden"> */}
                <ShootingStars />
            {/* </section> */}



            <div className="max-w-screen-full   mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10">
                {/* Text Section */}
                <div className="text-center md:text-left">
                    <h1 className="text-2xl md:text-4xl font-bold">
                        <span>Hi, I’m </span>
                        <span className="inline-block">
                            <Typewriter
                                words={["Muhammad Osman"]}
                                loop={false}
                                cursor
                                cursorStyle="|"
                                typeSpeed={200}
                                deleteSpeed={100}
                                delaySpeed={2000}
                            />
                        </span>
                    </h1>


                    <p
                        className={`mt-2 text-xs sm:text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"
                            }`}
                    >
                        A passionate
                        {" "}
                        <span
                            className={`font-bold ${isDarkMode ? "text-white" : "text-black"
                                }`}
                        >
                            Full Stack Developer
                        </span>{" "}
                        with over a year of experience, specializing in building scalable web applications using{" "}
                        <span
                            className={`font-bold ${isDarkMode ? "text-white" : "text-black"
                                }`}
                        >
                            React.js
                        </span>{" "}
                        and{" "}
                        <span
                            className={`font-bold ${isDarkMode ? "text-white" : "text-black"
                                }`}
                        >
                            Node.js
                        </span>
                        .
                    </p>


                    {/* Location & Status */}
                    <div
                        className={`mt-6 text-sm flex flex-col sm:flex-row items-center gap-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                    >
                        <div className="flex items-center gap-2">
                            <FaMapMarkerAlt
                                className={`${isDarkMode ? "text-white" : "text-black"}`}
                            />
                            <span>Multan, Pakistan</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 bg-green-500 rounded-full" />
                            <span>Available for new projects</span>
                        </div>
                    </div>

                    {/* Social Icons */}
                    <div className="mt-6 flex justify-center md:justify-start gap-4 text-gray-500">
                        <motion.a
                            href="https://github.com/MuhammadOsman381"
                            target="_blank"
                            rel="noopener noreferrer"
                            animate={{ x: [0, -5, 5, -5, 0] }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="hover:text-gray-600 transition"
                        >
                            <FaGithub size={24} />
                        </motion.a>
                        <motion.a
                            href="https://www.linkedin.com/in/muhammad-osman-920a81307/"
                            target="_blank"
                            rel="noopener noreferrer"
                            animate={{ x: [0, -5, 5, -5, 0] }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="hover:text-gray-600 transition"
                        >
                            <BsLinkedin size={24} />
                        </motion.a>
                    </div>
                </div>

                {/* Profile Image */}
                <div className="relative">
                    <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: "easeInOut",
                        }}
                        className={`w-64 h-80 sm:w-72 sm:h-96 md:w-80 md:h-[24rem] rounded-3xl overflow-hidden ${isDarkMode
                            ? "bg-gray-800"
                            : "bg-gray-800 shadow-none border border-gray-300"
                            }`}
                    >
                        <img
                            src={profilePic}
                            alt="Profile"
                            className="object-cover w-full h-full"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Home;
