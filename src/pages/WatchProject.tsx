import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from 'react'
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
import { MyContext } from "../Context";
import bloggerHeaven_image from "../assets/projects/images/blogger_heaven.png"
import bloggerHeaven_video from "../assets/projects/videos/bloggerHeaven.webm"
import queryDocs_image from "../assets/projects/images/QueryDocs.png"
import queryDocs_video from "../assets/projects/videos/queryDocs.webm"
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
            title: "Nexora",
            description: "Developed a full-stack SaaS application that allows users to create accounts, create chat sessions by entering a website URL or title, and scrape website content using Puppeteer. The scraped data is then processed using LangChain and Google GenAI to generate a custom AI model for each chat. Users can ask questions based on the website's content, with complete chat history tracking. The app also includes a subscription system, enabling users to unlock more chats and premium features.",
            tech_stack: ["Node JS", "React JS", "Langchain", "Stripe", "Google Gen AI Model",],
            image: nexora_image,
            video: aiTubeSummerizer_video,
            github_link: "https://github.com/MuhammadOsman381/Nexora",
            showVideo: false
        },
        {
            title: "Blogger's Heaven",
            description: "Blogger’s Heaven is an AI-powered blogging platform where users can create, edit, and delete accounts and blogs effortlessly. With AI-assisted content generation, users can write and manage blogs, explore others’ posts, and engage through likes, dislikes, and comments. The platform also supports tag creation for better content organization, making blogging more interactive and efficient.",
            tech_stack: ["Node JS", "React JS", "MySQL", "Google Gemini API", "TypeScript"],
            image: bloggerHeaven_image,
            video: bloggerHeaven_video,
            github_link: "https://github.com/MuhammadOsman381/Blog-App",
            showVideo: false
        },
        // {
        //     title: "AI TubeSummarizer",
        //     description: "AI TubeSummarizer is an intelligent video summarization tool that simplifies content consumption. Users can input a YouTube URL, and the app retrieves the transcript using the YouTube API. The transcript is then processed by the Google Gemini model, which generates a concise and insightful summary of the video. This makes it easier for users to quickly grasp key points without watching the entire video.",
        //     tech_stack: ["Flask", "React JS", "Google Gemini API", "Youtube API", "TypeScript"],
        //     image: aiTubeSummerizer_image,
        //     video: aiTubeSummerizer_video,
        //     github_link: "https://github.com/MuhammadOsman381/AI-TubeSummarizer",
        //     showVideo: false
        // },
        {
            title: "QueryDocs",
            description: "QueryDocs is an AI-powered document assistant that leverages Google Gemini models to enhance PDF interactions. Users can upload PDFs, and the AI processes the content, allowing them to ask any questions about the document. With intelligent search and instant responses, QueryDocs makes reading and extracting information from PDFs seamless and efficient.",
            tech_stack: ["Node JS", "React JS", "Google Gemini API", "TypeScript"],
            image: queryDocs_image,
            video: queryDocs_video,
            github_link: "https://github.com/MuhammadOsman381/QueryDocs",
            showVideo: false
        },
        {
            title: "Chat Sphere",
            description: "Chat-Sphere is a real-time chat application that allows users to create, view, and delete accounts. Users can send friend requests to others, which can be accepted or declined. Once connected as friends, users can engage in seamless one-on-one conversations, making Chat-Sphere a simple yet effective messaging platform.",
            tech_stack: ["Node JS", "React Native", "MongoDB"],
            image: chatSphere_image,
            video: chatSphere_video,
            github_link: "https://github.com/MuhammadOsman381/ReactNative_ChatSphere",
            showVideo: false
        },
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
        // {
        //     title: "UserHub",
        //     description: "UserHub is a simple user management app where users can create, view, and manage profiles. Users can upload profile pictures, edit their details, and delete accounts easily.",
        //     tech_stack: ["React JS", "MongoDB", "Spring Boot", "TypeScript"],
        //     image: userhub_image,
        //     video: userhub_video,
        //     github_link: "https://github.com/MuhammadOsman381/UserHub_SpringBoot",
        //     showVideo: false
        // },
        // {
        //     title: "Echoo",
        //     description: "Echoo is a real-time global chat app where users can create an account, log in, and chat with anyone worldwide. It supports secure messaging and profile management.",
        //     tech_stack: ["Next JS", "MongoDB", "Mongoose ORM", "Socket IO"],
        //     image: echoo_image,
        //     video: echoo_video,
        //     github_link: "https://github.com/MuhammadOsman381/next-js_chat-app",
        //     showVideo: false
        // }
    ];

    useEffect(() => {
        const matchedItem = projectsData.find((_, index) => index + 1 === Number(video_no));
        if (matchedItem) {
            setProject(matchedItem);
        }
    }, []);


    return (
        <div className={`  ${isDarkMode ? " bg-zinc-950 text-white" : "bg-zinc-950"} lg:p-10 p-5  flex items-center justify-center`} >
            <div className="lg:w-[75vw] " >
                <ProjectCard data={project} index={0} isDarkMode={isDarkMode} />
            </div>
        </div>
    )
}

export default WatchProject