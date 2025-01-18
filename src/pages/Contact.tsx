
import { FaGithub } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";
import { toast } from "react-toastify";
import { MdOutlineContentCopy } from "react-icons/md";

const Contact = ({ isDarkMode }: { isDarkMode: boolean }) => {
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success(`${text} copied to clipboard!`);
    };

    return (
        <div
            id="contact"
            className={`${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} lg:p-0 p-5 h-auto`}
        >

            <footer className={`${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} py-10`}>
                <div className="container mx-auto text-center space-y-6">
                    <button
                        className={`${isDarkMode ? "bg-gray-600 text-gray-300 hover:bg-gray-700" : "bg-gray-300 text-gray-600 hover:bg-gray-400"} text-sm  py-2 px-6 rounded-full`}
                    >
                        Get in touch
                    </button>

                    <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        What’s next? Feel free to reach out to me if you're looking for a
                        developer, have a query, or simply want to connect.
                    </p>

                    <div className="space-y-4">
                        <div className="flex justify-center items-center space-x-2">
                            <span className="text-lg">📧</span>
                            <span className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                                mosman257@gmail.com
                            </span>
                            <button
                                className={`${isDarkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-gray-800"}`}
                                onClick={() => copyToClipboard("mosman257@gmail.com")}
                            >
                                <MdOutlineContentCopy />
                            </button>
                        </div>

                        <div className="flex justify-center items-center space-x-2">
                            <span className="text-lg">📞</span>
                            <span className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>+92 3466762106</span>
                            <button
                                className={`${isDarkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-gray-800"}`}
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
                            href="https://github.com/MuhammadOsman381" className={`${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-800"}`}>
                            <FaGithub size={20} />
                        </a>
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.linkedin.com/in/muhammad-osman-920a81307/" className={`${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-800"}`}>
                            <BsLinkedin />
                        </a>
                    </div>

                    <div className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} text-sm mt-5`}>
                        <p>Copyright © 2025 - All rights reserved</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Contact;
