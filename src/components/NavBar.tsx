import { useContext, useState } from "react";
import { MyContext } from "../Context";
import { motion, useScroll } from "motion/react"
import { useLocation } from "react-router-dom";

interface MyContextType {
    isDarkMode: boolean;
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBar = () => {
    const location = useLocation();
    const context: MyContextType | any = useContext(MyContext);
    const { isDarkMode } = context;

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navBg = isDarkMode ? `bg-zinc-950 text-white` : "bg-zinc-100 text-black";
    const linkBg = isDarkMode ? `bg-zinc-800 hover:bg-zinc-700 text-white` : "bg-zinc-100 hover:bg-zinc-200 text-black";
    const { scrollYProgress } = useScroll()

    return (
        <div
            className={`fixed z-50   w-full transition-all duration-300 ease-in-out ${navBg} ${isMenuOpen ? "h-[320px]" : "h-[64px]"
                }`}
        >
            <motion.div className=" h-1 origin-left bg-white w-full" style={{ scaleX: scrollYProgress }} />

            <div className="navbar px-4">
                <div className="navbar-start">
                    <div className={`lg:hidden`}>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="btn btn-ghost"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                    <motion.a
                        animate={{
                            y: [0, -10, 0],
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: "easeInOut",
                        }}
                        className={`btn btn-sm btn-ghost font-bold text-xl ${isDarkMode ? "text-white" : "text-zinc-900"}`}>
                        {"<MO/>"}
                    </motion.a>
                </div>

                <div className="navbar-center hidden lg:flex gap-2">
                    <ul className="menu menu-horizontal px-1">
                        {location.pathname.startsWith('/watch') ? (
                            <li className="bg-zinc-800 rounded-xl ml-1">
                                <a href="/">Home</a>
                            </li>
                        ) : (
                            ["Home", "About", "Skills", "Projects", "Contact"].map((item, idx) => (
                                <li key={idx} className={`bg-zinc-800 rounded-xl ml-1`}>
                                    {item === "Home" ? (
                                        <a href="/">{item}</a>
                                    ) : (
                                        <a href={`#${item.toLowerCase()}`}>{item}</a>
                                    )}
                                </li>
                            ))
                        )}
                    </ul>
                </div>

                <div className="navbar-end">

                </div>
            </div>

            <div
                className={`lg:hidden flex flex-col items-start px-4 transition-all duration-500 ease-in-out overflow-hidden ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10 pointer-events-none"
                    }`}
            >
                <ul onClick={() => setIsMenuOpen(false)} className="menu flex flex-col gap-2 mt-2 w-full">
                    <li className={`rounded-xl ${linkBg}`}><a href="/">Home</a></li>
                    {
                        !location.pathname.startsWith('/watch') &&
                        <>
                            <li className={`rounded-xl ${linkBg}`}><a href="#about">About</a></li>
                            <li className={`rounded-xl ${linkBg}`}><a href="#skills">Skills</a></li>
                            <li className={`rounded-xl ${linkBg}`}><a href="#projects">Projects</a></li>
                            <li className={`rounded-xl ${linkBg}`}><a href="#contact">Contact</a></li>
                        </>
                    }
                </ul>
            </div>
        </div>
    );
};

export default NavBar;
