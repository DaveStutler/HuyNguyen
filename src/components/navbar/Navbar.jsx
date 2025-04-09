import React from "react";
import logo from "../../assets/logo-transparent.png";
import { Link } from "react-router-dom";
import './Navbar.css';

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

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={logo} alt="Huy Nguyen" width={150} height={100}/>
      <ul className="nav-links">
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/about'>About Me</Link></li>
        <li><Link to='/porfolio'>Porfolio</Link></li>
        <li><Link to='/contact'>Contact</Link></li>
      </ul>
    </div>
  );
}

export default Navbar;