import About from "./About"
import Home from "./Home"
import NavBar from "../components/NavBar"
import Skills from "./Skills"
import Projects from "./Projects"
import Contact from "./Contact"

interface Mode {
    isDarkMode: boolean,
}

const Main = ({ isDarkMode }: Mode) => {
    return (
        <div className="main w-full" >
            <Home isDarkMode={isDarkMode} />
            <About isDarkMode={isDarkMode} />
            <Skills isDarkMode={isDarkMode} />
            <Projects isDarkMode={isDarkMode} />
            <Contact isDarkMode={isDarkMode} />
        </div>
    )
}

export default Main