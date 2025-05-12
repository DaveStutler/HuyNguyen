import React from 'react';
import arrow_icon from '../../assets/arrow_icon.png';
import { projects } from '../../assets/data/projects.json';
import { Link } from 'react-router-dom';

const slugify = (text) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const Projects = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-20 px-4 sm:px-12 md:px-20 lg:px-40 my-20">
      <div className="relative text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold px-4">Projects</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex flex-col justify-center gap-5 p-6 rounded-xl border-2 border-slate-300 
             hover:border-[#DF8908] focus:border-[#DF8908] 
             hover:bg-gradient-to-br focus:bg-gradient-to-br 
             hover:from-[#3f0028] hover:to-[#582358] 
             focus:from-[#3f0028] focus:to-[#582358] 
             transform hover:scale-105 focus:scale-105 
             transition-all duration-300 outline-none"
          >
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h2 className="text-2xl font-extrabold bg-gradient-to-r from-[#DF8908] to-[#B415FF] bg-clip-text text-transparent">
              {project.name}
            </h2>
            <p className="text-gray-500 text-base leading-6">{project.preview}</p>
            <p className="text-yellow-500 font-medium text-sm">Status: {project.status}</p>
            <div className="flex gap-3 items-center mt-2">
              <img src={arrow_icon} alt="arrow" className="w-5 h-5" />
              <Link
                to={`/projects/${slugify(project.name)}`}
                className="text-gray-400 font-semibold text-base hover:underline"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
