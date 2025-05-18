import React from "react";

const Header = ({scrollToProjects}) => { 

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row gap-10">
        <img
          src="/profilePic.jpg"
          alt="Profile"
          className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl rounded-xl shadow-2xl"
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
