import React from "react";
import "./Header.css";
import profile_img from "../../assets/profile.png";

const Header = () => {
  return (
    <div className="header">
      <img src={profile_img} alt=""/>
      <h1>I'm Huy Nguyen,<span> graduate student at USC</span></h1>
      <p>
        I am pursuing a Master degree in Computer Science - Game Development at
        USC. I am inspired full stack developer, learning more about cloud
        computing and cloud security{" "}
      </p>
      <div className="header-action">
        <div className="header-connect">Connect With Me</div>
        <div className="header-resume">My Resume</div>
      </div>
    </div>
  );
};

export default Header;
