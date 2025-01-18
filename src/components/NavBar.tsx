import React from "react";
import { FaRegMoon } from "react-icons/fa";
import { LuSun } from "react-icons/lu";

interface Mode {
    isDarkMode: boolean;
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBar = ({ isDarkMode, setIsDarkMode }: Mode) => {
    return (
        <div className={isDarkMode ? `navbar bg-gray-900 border-none` : `navbar bg-base-100 border-none`}>
            <div className="navbar-start">
                <div className={`dropdown ${isDarkMode && "text-white"} `}>
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className={`menu menu-sm dropdown-content ${isDarkMode ? "bg-gray-800 text-white" : "bg-base-100 "} rounded-box z-[1] mt-3 w-52 p-2 shadow`}>
                        <li  ><a href="/">Home</a></li>
                        <li ><a href="#about">About</a></li>
                        <li ><a href="#skills">Skills</a></li>
                        <li ><a href="#projects">Projects</a></li>
                        <li ><a href="#contact">Contact</a></li>
                    </ul>
                </div>
                <a className={` btn btn-sm ${isDarkMode ? `text-white` : `text-gray-900`} btn-ghost font-bold text-xl motion-preset-oscillate  `}>
                    {"<MO/>"}
                </a>
            </div>
            <div className="navbar-center hidden lg:flex  gap-2">
                <ul className="menu menu-horizontal px-1">
                    <li className={` ${isDarkMode ? `text-white bg-gray-800 hover:bg-gray-700` : `text-gray-900 bg-gray-200`}  rounded-xl motion-scale-in-[0.46] motion-translate-x-in-[-1%] motion-translate-y-in-[-154%]`} ><a href="/" >Home</a></li>
                    <li className={`${isDarkMode ? `text-white bg-gray-800 hover:bg-gray-700` : `text-gray-900 bg-gray-200`} rounded-xl ml-1 motion-scale-in-[0.46] motion-translate-x-in-[-1%] motion-translate-y-in-[-154%]`} ><a href="#about">About</a></li>
                    <li className={`${isDarkMode ? `text-white bg-gray-800 hover:bg-gray-700` : `text-gray-900 bg-gray-200`} rounded-xl ml-1 motion-scale-in-[0.46] motion-translate-x-in-[-1%] motion-translate-y-in-[-154%]`}><a href="#skills" >Skills</a></li>
                    <li className={`${isDarkMode ? `text-white bg-gray-800 hover:bg-gray-700` : `text-gray-900 bg-gray-200`} rounded-xl ml-1 motion-scale-in-[0.46] motion-translate-x-in-[-1%] motion-translate-y-in-[-154%]`} ><a href="#projects">Projects</a></li>
                    <li className={`${isDarkMode ? `text-white bg-gray-800 hover:bg-gray-700` : `text-gray-900 bg-gray-200`} rounded-xl ml-1 motion-scale-in-[0.46] motion-translate-x-in-[-1%] motion-translate-y-in-[-154%]`}><a href="#contact">Contact</a></li>
                </ul>
            </div>
            <div className="navbar-end motion-scale-in-[0.46] motion-translate-x-in-[-1%] motion-translate-y-in-[-154%] ">
                <span onClick={() => setIsDarkMode(!isDarkMode)} className={`mr-2 ${isDarkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-black"} hover:cursor-pointer text-white p-2 rounded-xl`} >
                    {
                        isDarkMode ?
                            <LuSun size={24} /> :
                            <FaRegMoon size={24} />
                    }
                </span>
            </div>
        </div>
    )
}

export default NavBar