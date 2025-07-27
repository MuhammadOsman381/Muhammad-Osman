import About from "./About";
import Home from "./Home";
import Skills from "./Skills";
import Projects from "./Projects";
import Contact from "./Contact";

const Main = () => {

    return (
        <div className="flex w-full items-center justify-center bg-zinc-950" >
            <div className="lg:w-[75vw]  ">
                <Home />
                <About />
                <Skills />
                <Projects />
                <Contact />
            </div>
        </div>
    );
};

export default Main;
