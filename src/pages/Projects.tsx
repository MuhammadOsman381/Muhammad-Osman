import ProjectCard from '../components/ProjectCard'
import tunestream_image from "../assets/projects/images/tunestream.png";
import tunestream_video from "../assets/projects/videos/tunestream.webm";
import streamify_image from "../assets/projects/images/streamify.png";
import streamify_video from "../assets/projects/videos/streamify.webm";
// import userhub_image from "../assets/projects/images/userhub.png";
// import userhub_video from "../assets/projects/videos/userhub.webm";
// import echoo_image from "../assets/projects/images/echo.png";
// import echoo_video from "../assets/projects/videos/echoo.webm";
import neoprompt_image from "../assets/projects/images/neoprompt.png";
import neoprompt_video from "../assets/projects/videos/neoprompt.webm";
import { useContext } from 'react';
import { MyContext } from '../Context';
import bloggerHeaven_image from "../assets/projects/images/blogger_heaven.png"
import bloggerHeaven_video from "../assets/projects/videos/bloggerHeaven.webm"
import connectly_image from "../assets/projects/images/connectly.png"
import connectly_video from "../assets/projects/videos/connectly.webm"
// import aiTubeSummerizer_image from "../assets/projects/images/aiTubeSummerizer.jpeg"
import aiTubeSummerizer_video from "../assets/projects/videos/aiTubeSummerizer.webm"
import chatSphere_image from "../assets/projects/images/chatSphere.png"
import chatSphere_video from "../assets/projects/videos/chatSphere.webm"
import nexora_image from "../assets/projects/images/nexora.png"

interface ProjectData {
    title: string,
    description: string,
    tech_stack: string[],
    image: string,
    video: string,
    github_link: string,
    showVideo: boolean
}

interface MyContextType {
    isDarkMode: boolean;
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const Projects = () => {
    const context: MyContextType | any = useContext(MyContext);
    const { isDarkMode } = context;

    const projectsData: ProjectData[] = [
        {
            title: "Connectly",
            description: "Connectly is a one-to-one communication platform enabling real-time text messaging and high-quality video calls. Messages are powered by Socket.IO for instant delivery, while WebRTC ensures secure, peer-to-peer video communication — all packed into a clean interface.",
            tech_stack: ["Node JS", "React JS", "WebRtc", "Socket IO",],
            image: connectly_image,
            video: connectly_video,
            github_link: "https://github.com/MuhammadOsman381/Nexora",
            showVideo: true
        },
        {
            title: "Nexora",
            description: "A full-stack SaaS application that allows users to create chat sessions by entering a website URL or title, and scrape website content using Puppeteer. The scraped data is then processed using LangChain and Google GenAI to generate a custom AI model for each chat. Users can ask questions based on the website's content. The app also includes a subscription system, enabling users to unlock more chats and premium features.",
            tech_stack: ["Node JS", "React JS", "Langchain", "Stripe", "Google Gen AI Model",],
            image: nexora_image,
            video: aiTubeSummerizer_video,
            github_link: "https://github.com/MuhammadOsman381/Nexora",
            showVideo: true
        },
        {
            title: "Blogger's Heaven",
            description: "Blogger’s Heaven is an AI-powered blogging platform where users can create, edit, and delete accounts and blogs effortlessly. With AI-assisted content generation, users can write and manage blogs, explore others’ posts, and engage through likes, dislikes, and comments. The platform also supports tag creation for better content organization, making blogging more interactive and efficient.",
            tech_stack: ["Node JS", "React JS", "MySQL", "Google Gemini API", "TypeScript"],
            image: bloggerHeaven_image,
            video: bloggerHeaven_video,
            github_link: "https://github.com/MuhammadOsman381/Blog-App",
            showVideo: true
        },
        {
            title: "Chat Sphere",
            description: "Chat-Sphere is a real-time chat application that allows users to create, view, and delete accounts. Users can send friend requests to others, which can be accepted or declined. Once connected as friends, users can engage in seamless one-on-one conversations, making Chat-Sphere a simple yet effective messaging platform.",
            tech_stack: ["Node JS", "React Native", "MongoDB"],
            image: chatSphere_image,
            video: chatSphere_video,
            github_link: "https://github.com/MuhammadOsman381/ReactNative_ChatSphere",
            showVideo: true
        },
        {
            title: "NeoPrompt",
            description: "NeoPrompt is a platform for managing collections and chatting with AI. Users can create an account, log in, and upload profile photos. They can create, edit, or delete collections while chatting with AI powered by Google Gemini. Chats are stored securely, and users can manage or delete their data anytime.",
            tech_stack: ["Next JS", "Laravel", "MySQL", "Google Gemini API", "TypeScript"],
            image: neoprompt_image,
            video: neoprompt_video,
            github_link: "https://github.com/MuhammadOsman381/NeoPrompt-server",
            showVideo: true
        },
        {
            title: "TuneStream",
            description: "TuneStream is a music streaming platform for artists and listeners. Artists can upload and manage songs, while listeners can stream, like, comment, and create playlists. The platform supports real-time interactions and artist following.",
            tech_stack: ["Next JS", "MongoDB", "Socket IO", "TypeScript"],
            image: tunestream_image,
            video: tunestream_video,
            github_link: "https://github.com/MuhammadOsman381/TuneStream",
            showVideo: true
        },
        {
            title: "Streamify",
            description: "Streamify is a video streaming platform where users can create accounts, upload videos, and interact with content. Users can like posts, subscribe to channels, and track video views. The platform ensures smooth content delivery and easy account management.",
            tech_stack: ["Next JS", "MongoDB"],
            image: streamify_image,
            video: streamify_video,
            github_link: "https://github.com/MuhammadOsman381/next-js_streamify",
            showVideo: true
        },

    ];

    return (
        <div id='projects' className={`${isDarkMode && "bg-zinc-950 text-white"} flex flex-col rounded-xl  items-center justify-center gap-6  md:p-10 p-4 bg-gray-100 h-auto`} >
            <button className={`${isDarkMode ? "bg-zinc-700  text-zinc-300 hover:bg-zinc-700" : "bg-black text-white   "} text-sm  py-2 px-6 rounded-full `}>
                Projects
            </button>
            {/* <h2 className="text-2xl font-bold  w-full text-center">Some of the noteworthy projects I have built:</h2> */}
            {
                projectsData.map((items: ProjectData, index) => (
                    <ProjectCard data={items} index={index + 1} isDarkMode={isDarkMode} />
                ))
            }
        </div>
    )
}

export default Projects