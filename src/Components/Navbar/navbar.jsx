import React from "react";
import logo from "../../assets/logo-transparent.png";
import { Link } from "react-router-dom";
import './navbar.css';

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
      <div className="nav-connect">Connect With Me</div>
    </div>
  );
}

export default Navbar;