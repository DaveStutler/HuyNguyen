import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout.jsx';
import Home from './pages/Home.jsx';
import AboutMe from './pages/AboutMe.jsx';
import Porfolio from './pages/Porfolio.jsx';
import Contact from './pages/Contact.jsx';
import Projects from './components/service/Projects.jsx';
import Description from './components/service/Description.jsx';
import Hero from './components/hero/Hero.jsx';
/**
 * @summary Main App component
 * @description This component is the main entry point of the application. 
 * It sets up the routing for the application using React Router.
 * It defines the main layout and the different routes for the application.
 * Instead of using this approach, figure out a way to keep the pages on 1 page.
 * The route would just lead to the section of the page instead of a new page.
 * @returns {JSX.Element}
 */

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='about' element={<AboutMe />} />
            <Route path='porfolio' element={<Porfolio />} />
            <Route path='contact' element={<Contact />} />
            <Route path='projects' element={<Projects />} />
            <Route path='/projects/:projectName' element={<Description />} />
            {/* Add more routes as needed */} 
            <Route path='*' element={<h1>Not Found</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;