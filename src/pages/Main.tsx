import About from "./About"
import Home from "./Home"
import Skills from "./Skills"
import Projects from "./Projects"
import Contact from "./Contact"

const Main = () => {
    return (
        <div className="w-full">
            <Home />
            <About />
            <Skills />
            <Projects />
            <Contact />
        </div>
    )
}

export default Main