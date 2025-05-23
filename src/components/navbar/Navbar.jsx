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

      // query shouldn't match with anything other than the name of the project
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

  // Center Logo
  const [logoSrc, setLogoSrc] = useState("/Logo/1.png");

  useEffect(() => {
    // Check initial theme (optional, if you want to sync with system or saved theme)
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    setLogoSrc(isDark ? "/Logo/2.png" : "/Logo/1.png");
  }, []);

  const handleThemeToggle = (e) => {
    const checked = e.target.checked;
    setLogoSrc(checked ? "/Logo/2.png" : "/Logo/1.png");
    // Optionally, set theme attribute here if you want to control theme
    document.documentElement.setAttribute("data-theme", checked ? "dark" : "light");
  };

  // Handle logo transition on scroll
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="navbar bg-base-100 shadow-sm md:flex-nowrap">
      {/* Mobile menu Icon, Desktop Menu */}
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


      {/* Center Logo */}
      <div className="navbar-center justify-center md:w-auto">
        <Link to="/" className="btn btn-ghost p-0">
          <img
            src={logoSrc}
            alt="Logo"
            className={`w-20 h-20 md:w-20 md:h-20 rounded-full transition-all duration-700 ease-in-out ${scrolled ? "h-12" : "h-0"}`}
            style={{
              opacity: scrolled ? 1 : 0,
              transform: scrolled
                ? "translateY(0)"
                : "translateY(-40px)",
            }}
          />
        </Link>
      </div>


      {/* Desktop Menu */}
      <div className="navbar-end justify-end">
        <label className="flex cursor-pointer gap-2 mr-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <path
              d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
          <input type="checkbox" value="coffee" className="toggle theme-controller" onChange={handleThemeToggle} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </label>

        {/* Search menu */}
        <div className="hidden md:block">
          <label className="input input-lg">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              required
              placeholder="Search for projects"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleSearch}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default Navbar;