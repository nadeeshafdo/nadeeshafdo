import React, { useEffect, useState } from 'react';
import './Projects.css';
import ProjectCard from './ProjectCard';
import LoadingScreen from './LoadingScreen';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [sortedProjects, setSortedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const CONFIG = {
    githubUsername: 'nadeeshafdo',
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${CONFIG.githubUsername}/repos?per_page=100`,
          { headers: { 'Accept': 'application/vnd.github.v3+json' } }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProjects(data);
        setSortedProjects(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching GitHub repos:', error);
      }
    };

    fetchProjects();
  }, []);

  const sortProjects = (sortBy) => {
    let sorted = [...projects];
    if (sortBy === 'stars') {
      sorted.sort((a, b) => b.stargazers_count - a.stargazers_count);
    } else if (sortBy === 'name') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'updated') {
      sorted.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    } else {
      sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
    setSortedProjects(sorted);
  };

  return (
    <section id="projects" className="projects-grid">
      <div className="sort-container">
        <label htmlFor="sort-options" className="sort-label">Sort By:</label>
        <select id="sort-options" className="sort-dropdown" onChange={(e) => sortProjects(e.target.value)}>
          <option value="created" selected>Date Created</option>
          <option value="updated">Last Updated</option>
          <option value="name">Name</option>
          <option value="stars">Stars</option>
        </select>
      </div>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="projects-grid">
          {sortedProjects.map((repo) => (
            <ProjectCard key={repo.id} repo={repo} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Projects;