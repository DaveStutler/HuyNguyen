import React from 'react'
import './Projects.css'
import arrow_icon from '../../assets/arrow_icon.png'
import theme_patttern from '../../assets/theme-patten.png'
import { projects } from '../../assets/data/projects.json'
import { Link } from 'react-router-dom'

/**
 * @summary Service component
 * @description This component renders the projects offered by the user.
 * It displays the projects in a grid format with a title, description, 
 * and a link to read more.
 * 
 * Provide a picture for each project as a preview of the project.
 * Update the projects.json file to include the picture. 
 * @returns {JSX.Element}
 */

const slugify = (text) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");


const Projects = () => {
    return (
        <div className="projects">
            <div className="project-title">
                <h1>Projects</h1>
                {/* You can include a header image if desired */}
                <img src= {theme_patttern} alt="Projects Preview" />
            </div>
            <div className="project-container">
                {projects.map((project) => (
                    <div className="projects-format" key={project.id}>
                        <img
                            src={project.image}
                            alt={project.name}
                            className="project-image"
                        />
                        <h2>{project.name}</h2>
                        <p>{project.preview}</p>
                        <p><strong>Status:</strong> {project.status}</p>
                        <div className="projects-readmore">
                            <img
                                src={arrow_icon}
                                alt="arrow"
                                className="arrow-icon"
                            />
                            <Link to={`/projects/${slugify(project.name)}`} className="read-more-link">
                                Read More
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects
