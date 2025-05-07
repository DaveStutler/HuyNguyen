import React from "react";
import { useParams } from "react-router-dom";
import { projects } from "../../assets/data/projects.json";

const slugify = (text) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const Description = () => {
  const { projectName } = useParams();
  const project = projects.find(
    (project) => slugify(project.name) === projectName
  );

  if (!project) return <div className="text-center text-lg">🚫 Project not found</div>;

  return (
    <div className="flex justify-center px-4 py-10">
      <div className="card bg-base-100 w-full max-w-4xl shadow-xl">
        <figure>
          <img src={project.image} alt={project.name} className="object-cover" />
        </figure>
        <div className="card-body space-y-4">
          <h2 className="card-title text-3xl font-bold">
            {project.name}
            <div className="badge badge-secondary">{project.status}</div>
          </h2>

          <p className="text-base">{project.description}</p>

          {/* Date Badges */}
          <div className="flex flex-wrap gap-2">
            <div className="badge badge-outline">Start: {project.startDate}</div>
            <div className="badge badge-outline">End: {project.endDate}</div>
          </div>

          {/* Technology Badges */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, idx) => (
              <div key={idx} className="badge badge-primary">{tech}</div>
            ))}
          </div>

          {/* Tag Badges */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, idx) => (
              <div key={idx} className="badge badge-accent">{tag}</div>
            ))}
          </div>

          {/* Contributors */}
          <div className="border-t pt-4 space-y-1">
            <p className="font-semibold">Contributors:</p>
            <ul className="list-disc list-inside">
              {project.contributors.map((c, idx) => (
                <li key={idx}>
                  <span className="font-medium">{c.contributor}</span> – {c.role}
                </li>
              ))}
            </ul>
          </div>

          {/* Buttons */}
          <div className="card-actions justify-end mt-4">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              View Project
            </a>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                View Code
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
