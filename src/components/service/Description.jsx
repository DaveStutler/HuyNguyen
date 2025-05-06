import React from "react";
import "./Description.css"; // Assuming you have a CSS file for styling
import { useParams } from "react-router-dom";
import { projects } from "../../assets/data/projects.json";
// This component is designed to display detailed information about a project.


const slugify = (text) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const Description = () => {
    const { projectName } = useParams();
    const project = projects.find((project) =>slugify(project.name) === projectName);

    if (!project) return <div>Project not found</div>;

    


    return (
        <div className="project-description">
            <h2 className="text-3xl font-bold underline">{project.name}</h2>
            <p>{project.description}</p>
            <p><strong>Status:</strong> {project.status}</p>
            <div className="project-links">
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                    View Project
                </a>
                {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                        View Code
                    </a>
                )}
            </div>
            <div className="project-image">
                <img src={project.image} alt={project.name} />
            </div>
            <div className="project-tags">
                {project.tags.map((tag, index) => (
                    <span key={index} className="project-tag">
                        {tag}
                    </span>
                ))}
            </div>
            <div className="project-date">
                <p><strong>Start Date:</strong> {project.startDate}</p>
                <p><strong>End Date:</strong> {project.endDate}</p>
            </div>
            <div className="project-contributors">
                <p><strong>Contributors:</strong></p>
                <ul>
                    {project.contributors.map((contributor, index) => (
                        <li key={index}>{contributor.contributor} - {contributor.role}</li>
                    ))}
                </ul>
            </div>
            <div className="project-technologies">
                <p><strong>technologies:</strong></p>
                <ul>
                    {project.technologies.map((technology, index) => (
                        <li key={index}>{technology}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
export default Description;
// This component is designed to display detailed information about a project.
