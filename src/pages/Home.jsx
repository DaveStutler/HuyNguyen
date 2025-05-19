import {useRef} from "react";
import Header from "../components/header/Header";
import Projects from "../components/service/Projects";
import Hero from "../components/hero/Hero"

const Home = () => {
  const projectRef = useRef(null);

  return (
    <div>
        <Hero />
        <Header scrollToProjects = {() => projectRef.current.scrollIntoView({ behavior: 'smooth' })} />
        <div ref={projectRef}>
          <Projects />
        </div>
    </div>
  );
}

export default Home;