import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout.jsx';
import Home from './pages/Home.jsx';
import AboutMe from './pages/AboutMe.jsx';
import Porfolio from './pages/Porfolio.jsx';
import Contact from './pages/Contact.jsx';

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
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;