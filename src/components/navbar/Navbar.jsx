import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import './Navbar.css';
import { projects } from '../../assets/data/projects.json'

/**
 * @summary Navbar component
 * @description This component renders the navigation bar of the application.
 * It contains the logo and the navigation links to different sections of the application.
 * It uses React Router's Link component for navigation.
 * Figure out a way to keep the pages on 1 page. The route would just lead to 
 * the section of the page instead of a new page.
 * 
 * Also make the navbar mobile responsive.
 * @returns {JSX.Element}
 */
const slugify = (text) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");


const Navbar = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      const query = searchValue.toLowerCase().trim();
      if (!query) return;

      const match = projects.find((project) =>
        project.name.toLowerCase().includes(query)
        // || project.description.toLowerCase().includes(query)
        // || project.preview.toLowerCase().includes(query)
      );
      console.log(match)

      if (!match) {
        alert("No matching project found. Please try different words or phrases.");
        return;
      }
      const slug = slugify(match.name);
      navigate(`/projects/${slug}`);
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-xl dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li><Link to='/'>Home Page</Link></li>
            <li><Link to='/porfolio'>Porfolio</Link></li>
            <li><Link to='/about'> About Me</Link></li>
            <li><Link to='/contact'>Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-2xl"><Link to='/'>Huy Nguyen</Link></a>
      </div>
      <div className="navbar-end">
        <label className="input input-lg">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            required
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleSearch}
          />
        </label>
      </div>
    </div>
  );
}

export default Navbar;