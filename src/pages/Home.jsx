import React, {useRef} from "react";
import Header from "../components/header/Header";
import Projects from "../components/service/Projects";
import Footer from "../components/footer/Footer";

const Home = () => {
  const projectRef = useRef(null);

  return (
    <div>
        <Header scrollToProjects = {() => projectRef.current.scrollIntoView({ behavior: 'smooth' })} />
        <div ref={projectRef}>
          <Projects />
        </div>
    </div>
  );
}

export default Home;