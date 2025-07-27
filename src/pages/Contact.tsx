
import { FaGithub } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";
import { toast } from "react-toastify";
import { MdOutlineContentCopy } from "react-icons/md";
import { useContext } from "react";
import { MyContext } from "../Context";


interface MyContextType {
    isDarkMode: boolean;
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const Contact = () => {
    const context: MyContextType | any = useContext(MyContext);
    const { isDarkMode } = context;

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success(`${text} copied to clipboard!`);
    };

    return (
        <div
            id="contact"
            className={` text-sm ${isDarkMode ? "bg-zinc-950 text-white" : "bg-white text-zinc-900"} lg:p-0 p-5 h-auto`}
        >

            <footer className={`${isDarkMode ? "bg-zinc-950 text-white" : "bg-white text-zinc-900"} py-10`}>
                <div className="container mx-auto text-center space-y-6">
                    <button
                        className={`text-sm ${isDarkMode ? "bg-zinc-700 text-zinc-300 hover:bg-zinc-700" : "bg-black text-white"} text-sm  py-2 px-6 rounded-full`}
                    >
                        Get in touch
                    </button>

                    <p className={`text-sm ${isDarkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                      Looking for a developer, have a question, or just want to connect? Don’t hesitate to reach out—I’m always open to meaningful conversations and new opportunities.

                    </p>

                    <div className="space-y-4">
                        <div className="flex justify-center items-center space-x-2">
                            <span className="text-sm">📧</span>
                            <span className={`${isDarkMode ? "text-zinc-300" : "text-zinc-600"}`}>
                                mosman257@gmail.com
                            </span>
                            <button
                                className={`${isDarkMode ? "text-zinc-400 hover:text-zinc-200" : "text-zinc-600 hover:text-zinc-800"}`}
                                onClick={() => copyToClipboard("mosman257@gmail.com")}
                            >
                                <MdOutlineContentCopy />
                            </button>
                        </div>

                        <div className="flex justify-center items-center space-x-2">
                            <span className="text-sm">📞</span>
                            <span className={`${isDarkMode ? "text-zinc-300" : "text-zinc-600"}`}>+92 3188523220</span>
                            <button
                                className={`${isDarkMode ? "text-zinc-400 hover:text-zinc-200" : "text-zinc-600 hover:text-zinc-800"}`}
                                onClick={() => copyToClipboard("+92 3466762106")}
                            >
                                <MdOutlineContentCopy />

                            </button>
                        </div>
                    </div>

                    <div className="flex justify-center space-x-4">
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://github.com/MuhammadOsman381" className={`${isDarkMode ? "text-zinc-400 hover:text-white" : "text-zinc-600 hover:text-zinc-800"}`}>
                            <FaGithub size={20} />
                        </a>
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.linkedin.com/in/muhammad-osman-920a81307/" className={`${isDarkMode ? "text-zinc-400 hover:text-white" : "text-zinc-600 hover:text-zinc-800"}`}>
                            <BsLinkedin />
                        </a>
                    </div>

                    <div className={`${isDarkMode ? "text-zinc-400" : "text-zinc-600"} text-sm mt-5`}>
                        <p>Copyright © 2025 - All rights reserved</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Contact;
