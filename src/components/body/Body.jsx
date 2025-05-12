import React from 'react'
import './Body.css'


const Body = () => {
  return (
    // hero section
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col">
        <img
          src="/profilePic2.jpg"
          className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl rounded-4xl shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold">Hello there!</h1>
          <p className="py-6 text-2xl">
            I'm a Master's student in Computer Science (Game Development) at the
            University of Southern California, with a strong foundation in
            software engineering, AI, and interactive media. My experience spans
            from gameplay system design for 2D and 3D, gameplay animation, level design, UI/UX design to
            full-stack web development, and simulation and testing tools for automotive research.
            Passionate about building meaningful digital experiences, I combine
            technical expertise with creative problem-solving to deliver polished,
            user-focused solutions.
          </p>
        </div>
      </div>
    </div>


  )
}

export default Body
