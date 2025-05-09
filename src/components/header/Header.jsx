import React from "react";
import profile_img from "../../assets/profilePic.jpg";

const Header = ({scrollToProjects}) => { 

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row gap-10">
        <img
          src={profile_img}
          alt="Profile"
          className="max-w-xl rounded-xl shadow-2xl lb:mr-10"
        />
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
          <p className="mb-5 text-2xl">
            I'm Huy, currently pursuing a Master's degree in Computer Science - Game Development at USC, 
            with a passion for <strong> Game Development, Full-stack Development,</strong> and<strong> Cloud Network Computing</strong>.
          </p>
          <button className="btn btn-accent btn-xl rounded-2xl" onClick={scrollToProjects}>My Projects</button>
        </div>
      </div>
    </div>

  );
};

export default Header;
