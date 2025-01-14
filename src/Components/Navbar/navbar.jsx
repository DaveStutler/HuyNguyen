import React from "react";
import logo from "../../assets/logo.svg";
import './navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <img src="https://www.docplanner.com/img/logo-default-group-en.svg?v=1" alt="Docplanner Group" />
      <ul className="nav-links">
        <li>Home</li>
        <li>About Me</li>
        <li>Porfolio</li>
        <li>Services</li>
        <li>Contact</li>
      </ul>
      <div className="nav-connect">Connect With Me</div>
    </div>
  );
}

export default Navbar;