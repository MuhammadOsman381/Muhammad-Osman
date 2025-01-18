import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react'
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

interface ProjectData {
    title: string,
    description: string,
    tech_stack: string[],
    image: string,
    video: string,
    github_link: string,
    showVideo: boolean
}

interface Mode {
    isDarkMode: boolean,
}

const WatchProject = ({ isDarkMode }: Mode) => {
    const { video_no } = useParams();

    const defaultProjectData = {
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
            description: "NeoPrompt is an innovative platform that combines personalized collection management with advanced AI-powered chat functionality. Users can create an account, log in securely, and upload their profile photos, which are stored on the server. After logging in, users can create, edit, and delete their own collections. NeoPrompt integrates seamlessly with the Google Gemini model, enabling users to engage in intelligent and dynamic conversations, with all chats securely stored in the database. Additionally, users have complete control over their data, with options to delete their chats, edit collections, and manage their accounts by editing or deleting them. NeoPrompt offers a feature-rich, intuitive platform designed for creativity and seamless interaction with cutting-edge AI.",
            tech_stack: ["Next JS", "Laravel", "MySQL", "Eloquent ORM", "Google Gemini Api", "TypeScript", "Daisy UI",],
            image: neoprompt_image,
            video: neoprompt_video,
            github_link: "https://github.com/MuhammadOsman381/NeoPrompt-server",
            showVideo: false

        },
        {
            title: "TuneStream",
            description: "TuneStream is a versatile and dynamic music streaming platform designed to cater to both artists and music enthusiasts. The platform allows users to securely sign up and log in, with the option to upload a profile picture that is stored on the server. Users can create two types of accounts: artist or listener. Artists can upload, edit, and delete their songs, view detailed song statistics like likes, dislikes, and comments, and manage their profile information. Listeners, on the other hand, can stream songs, like or dislike tracks, and add real-time comments using Socket.IO. They can also create personalized playlists to organize their favorite songs, follow their favorite artists to stay updated, and manage their profiles. With a seamless and user-friendly interface powered by Next.js and a robust backend utilizing Node.js, Express, MongoDB, and Socket.IO, TuneStream provides an engaging and interactive music experience for all users.",
            tech_stack: ["Next JS", "Mongodb", "Mongoose ORM", "Socket IO", "TypeScript", "Daisy UI"],
            image: tunestream_image,
            video: tunestream_video,
            github_link: "https://github.com/MuhammadOsman381/TuneStream",
            showVideo: false
        },
        {
            title: "Streamify",
            description: "Streamify is an engaging video streaming platform that empowers users to create, share, and interact with content seamlessly. Users can sign up to create their accounts and have the ability to set up their own channels to upload posts. Other users can like posts, subscribe to channels, and interact with content creators. Streamify also allows users to edit or delete their accounts and manage their posts by editing or deleting them as needed. Content creators can track the views on their videos, providing insights into their audience engagement. All uploaded files are efficiently stored on the server and served statically on the frontend for a smooth user experience. Streamify combines powerful backend technology and a user-friendly interface to create a dynamic platform for content sharing and engagement.",
            tech_stack: ["Next JS", "Mongodb", "Mongoose ORM", "Daisy UI"],
            image: streamify_image,
            video: streamify_video,
            github_link: "https://github.com/MuhammadOsman381/next-js_streamify",
            showVideo: false
        },
        {
            title: "UserHub",
            description: "UserHub is a streamlined application designed for managing user profiles with ease. The platform allows users to create profiles by providing a name, email, and password. Additionally, users can upload profile pictures, which are securely stored on the server and served statically for seamless accessibility. UserHub enables users to view and manage the list of created profiles, making it an efficient tool for handling user data. With its intuitive design and efficient functionality, UserHub offers a simple yet effective solution for user management.",
            tech_stack: ["React JS", "Mongodb", "SpringBoot", "TypeScript", "Daisy UI"],
            image: userhub_image,
            video: userhub_video,
            github_link: "https://github.com/MuhammadOsman381/UserHub_SpringBoot",
            showVideo: false
        },
        {
            title: "Echoo",
            description: "Echoo is a real-time global chat platform that connects users worldwide. Users can create an account, log in securely, and engage in conversations with anyone across the platform. Echoo also provides profile management features, allowing users to edit or delete their accounts effortlessly. With its user-friendly interface and seamless chat functionality, Echoo fosters global communication and interaction in an accessible and efficient way.",
            tech_stack: ["Next JS", "Mongodb", "Mongoose ORM", "Socket IO"],
            image: echoo_image,
            video: echoo_video,
            github_link: "https://github.com/MuhammadOsman381/next-js_chat-app",
            showVideo: false
        }
    ]

    useEffect(() => {
        const matchedItem = projectsData.find((_, index) => index + 1 === Number(video_no));
        if (matchedItem) {
            setProject(matchedItem);
        }
    }, [projectsData, video_no]);


    return (
        <div className={`lg:h-[92vh]  ${isDarkMode ? " bg-gray-800 text-white" : "bg-gray-100"} lg:p-10 p-5  flex items-center justify-center  `} >
            <ProjectCard data={project} index={0} isDarkMode={isDarkMode} />
        </div>
    )
}

export default WatchProject