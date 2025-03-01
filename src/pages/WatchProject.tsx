import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import tunestream_image from "../assets/projects/images/tunestream.png";
import tunestream_video from "../assets/projects/videos/tunestream.webm";
import streamify_image from "../assets/projects/images/streamify.png";
import streamify_video from "../assets/projects/videos/streamify.webm";
import userhub_image from "../assets/projects/images/userhub.png";
import userhub_video from "../assets/projects/videos/userhub.webm";
import echoo_image from "../assets/projects/images/echo.png";
import echoo_video from "../assets/projects/videos/echoo.webm";
import neoprompt_image from "../assets/projects/images/neoprompt.png";
import neoprompt_video from "../assets/projects/videos/neoprompt.webm";
import { MyContext } from "../Context";

interface ProjectData {
    title: string,
    description: string,
    tech_stack: string[],
    image: string,
    video: string,
    github_link: string,
    showVideo: false
}

interface MyContextType {
    isDarkMode: boolean;
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const WatchProject = () => {
    const { video_no } = useParams();
    const context: MyContextType | any = useContext(MyContext);
    const { isDarkMode } = context;

    const defaultProjectData: ProjectData = {
        title: "",
        description: "",
        tech_stack: [""],
        image: "",
        video: "",
        github_link: "",
        showVideo: false
    }

    const [project, setProject] = useState<ProjectData>(defaultProjectData)

    const projectsData: ProjectData[] = [
        {
            title: "NeoPrompt",
            description: "NeoPrompt is a platform for managing collections and chatting with AI. Users can create an account, log in, and upload profile photos. They can create, edit, or delete collections while chatting with AI powered by Google Gemini. Chats are stored securely, and users can manage or delete their data anytime.",
            tech_stack: ["Next JS", "Laravel", "MySQL", "Google Gemini API", "TypeScript"],
            image: neoprompt_image,
            video: neoprompt_video,
            github_link: "https://github.com/MuhammadOsman381/NeoPrompt-server",
            showVideo: false
        },
        {
            title: "TuneStream",
            description: "TuneStream is a music streaming platform for artists and listeners. Artists can upload and manage songs, while listeners can stream, like, comment, and create playlists. The platform supports real-time interactions and artist following.",
            tech_stack: ["Next JS", "MongoDB", "Socket IO", "TypeScript"],
            image: tunestream_image,
            video: tunestream_video,
            github_link: "https://github.com/MuhammadOsman381/TuneStream",
            showVideo: false
        },
        {
            title: "Streamify",
            description: "Streamify is a video streaming platform where users can create accounts, upload videos, and interact with content. Users can like posts, subscribe to channels, and track video views. The platform ensures smooth content delivery and easy account management.",
            tech_stack: ["Next JS", "MongoDB"],
            image: streamify_image,
            video: streamify_video,
            github_link: "https://github.com/MuhammadOsman381/next-js_streamify",
            showVideo: false
        },
        {
            title: "UserHub",
            description: "UserHub is a simple user management app where users can create, view, and manage profiles. Users can upload profile pictures, edit their details, and delete accounts easily.",
            tech_stack: ["React JS", "MongoDB", "Spring Boot", "TypeScript"],
            image: userhub_image,
            video: userhub_video,
            github_link: "https://github.com/MuhammadOsman381/UserHub_SpringBoot",
            showVideo: false
        },
        {
            title: "Echoo",
            description: "Echoo is a real-time global chat app where users can create an account, log in, and chat with anyone worldwide. It supports secure messaging and profile management.",
            tech_stack: ["Next JS", "MongoDB", "Mongoose ORM", "Socket IO"],
            image: echoo_image,
            video: echoo_video,
            github_link: "https://github.com/MuhammadOsman381/next-js_chat-app",
            showVideo: false
        }
    ];

    useEffect(() => {
        const matchedItem = projectsData.find((_, index) => index + 1 === Number(video_no));
        if (matchedItem) {
            setProject(matchedItem);
        }
    }, []);


    return (
        <div className={`lg:h-[92vh]  ${isDarkMode ? " bg-gray-800 text-white" : "bg-gray-100"} lg:p-10 p-5  flex items-center justify-center`} >
            <ProjectCard data={project} index={0} isDarkMode={isDarkMode} />
        </div>
    )
}

export default WatchProject