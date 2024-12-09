import React from 'react';
import './ProjectCard.css';

const ProjectCard = ({ repo }) => {
  const technologies = repo.topics || [];
  const languageClass = repo.language ? repo.language.toLowerCase() : '';

  const createdDate = new Date(repo.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="project-card">
      <div className="project-header">
        <i className="fas fa-folder-open project-icon"></i>
        <div className="project-links">
          {repo.homepage && (
            <a href={repo.homepage} className="project-link" target="_blank" rel="noopener noreferrer" aria-label="Live demo">
              <i className="fas fa-external-link-alt"></i>
            </a>
          )}
          <a href={repo.html_url} className="project-link" target="_blank" rel="noopener noreferrer" aria-label="View Source">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </div>
      <h3 className="project-title">{repo.name}</h3>
      <p className="project-description">{repo.description || 'No description available'}</p>
      <div className="project-tech">
        {technologies.map((tech) => (
          <span key={tech} className="tech-tag">{tech}</span>
        ))}
      </div>
      {repo.language && (
        <div className="project-language">
          <span className={`language-dot ${languageClass}`}></span>
          <span>{repo.language}</span>
        </div>
      )}
      <p className="project-created-date">Created on: {createdDate}</p>
    </article>
  );
};

export default ProjectCard;