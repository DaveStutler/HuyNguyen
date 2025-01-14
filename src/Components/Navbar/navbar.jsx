import React from "react";
import logo from "../../assets/logo-transparent.png";
import './navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={logo} alt="Huy Nguyen" width={150} height={100}/>
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