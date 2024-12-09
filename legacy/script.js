document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const projectsSection = document.querySelector('.projects-grid');
    const loadingScreen = document.getElementById('loading-screen');
    const typewriterElement = document.getElementById('typewriter');
    const statValues = document.querySelectorAll('.stat-value');
    const sortDropdown = document.getElementById('sort-options');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    const CONFIG = {
        githubUsername: 'nadeeshafdo',
        typewriterSpeed: 75,
        loadingDuration: 8000,
        adviceDisplayDuration: 4000
    };

    let projectsData = []; // Cache GitHub projects for sorting

    // Typewriter effect implementation
    class Typewriter {
        constructor(element, text, speed = 50) {
            this.element = element;
            this.text = text;
            this.speed = speed;
            this.currentChar = 0;
        }

        type() {
            if (this.currentChar < this.text.length) {
                this.element.textContent += this.text.charAt(this.currentChar);
                this.currentChar++;
                setTimeout(() => this.type(), this.speed);
            }
        }

        start() {
            this.type();
        }
    }

    // Animate number counter
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const duration = 2000;
        const stepTime = duration / 50;

        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = Math.round(target);
                clearInterval(counter);
            } else {
                element.textContent = Math.round(current);
            }
        }, stepTime);
    }

    // Initialize stat counters
    function initializeCounters() {
        statValues.forEach(stat => {
            const targetValue = parseInt(stat.dataset.count);
            animateCounter(stat, targetValue);
        });
    }

// Create project card
function createProjectCard(repo) {
    const card = document.createElement('article');
    card.className = 'project-card';

    const technologies = repo.topics || [];
    const languageClass = repo.language ? repo.language.toLowerCase() : '';

    // Format the created date
    const createdDate = new Date(repo.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    card.innerHTML = `
        <div class="project-header">
            <i class="fas fa-folder-open project-icon"></i>
            <div class="project-links">
                ${repo.homepage ? `
                    <a href="${repo.homepage}" class="project-link" target="_blank" rel="noopener noreferrer" aria-label="Live demo">
                        <i class="fas fa-external-link-alt"></i>
                    </a>
                ` : ''}
                <a href="${repo.html_url}" class="project-link" target="_blank" rel="noopener noreferrer" aria-label="View source">
                    <i class="fab fa-github"></i>
                </a>
            </div>
        </div>
        <h3 class="project-title">${repo.name}</h3>
        <p class="project-description">${repo.description || 'No description available'}</p>
        <div class="project-tech">
            ${technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
        ${repo.language ? `
            <div class="project-language">
                <span class="language-dot ${languageClass}"></span>
                <span>${repo.language}</span>
            </div>
        ` : ''}
        <p class="project-created-date">Created on: ${createdDate}</p>
    `;

    return card;
}

    // Display projects
    function displayProjects(projects) {
        projectsSection.innerHTML = '';

        if (projects.length === 0) {
            projectsSection.innerHTML = '<p class="no-projects">No projects found.</p>';
            return;
        }

        projects.forEach(repo => {
            const projectCard = createProjectCard(repo);
            projectsSection.appendChild(projectCard);
        });
    }

    // Sort projects based on dropdown selection
    function sortProjects(sortBy) {
        let sortedProjects = [...projectsData];
        if (sortBy === 'stars') {
            sortedProjects.sort((a, b) => b.stargazers_count - a.stargazers_count);
        } else if (sortBy === 'name') {
            sortedProjects.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === 'updated') {
            sortedProjects.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        } else {
            sortedProjects.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        }
        displayProjects(sortedProjects);
    }

    // Fetch and display GitHub projects
    async function fetchProjects() {
        try {
            const response = await fetch(
                `https://api.github.com/users/${CONFIG.githubUsername}/repos?per_page=100`,
                { headers: { 'Accept': 'application/vnd.github.v3+json' } }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            projectsData = await response.json();
            sortProjects('created'); // Default sort by creation date
        } catch (error) {
            console.error('Error fetching GitHub repos:', error);
            projectsSection.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>Unable to load projects at this time. Please try again later.</p>
                </div>
            `;
        }
    }

    // Initialize loading sequence
    async function initializeLoadingSequence() {
        try {
            const adviceResponse = await fetch('https://api.adviceslip.com/advice');
            const adviceData = await adviceResponse.json();
            const advice = adviceData.slip.advice;

            const typewriter = new Typewriter(typewriterElement, advice, CONFIG.typewriterSpeed);
            typewriter.start();

            await fetchProjects();

            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                initializeCounters();
            }, CONFIG.loadingDuration + CONFIG.adviceDisplayDuration);
        } catch (error) {
            console.error('Error during loading sequence:', error);
            typewriterElement.textContent = 'Loading your experience...';
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                initializeCounters();
            }, CONFIG.loadingDuration);
        }
    }

    // Initialize sort dropdown
    sortDropdown?.addEventListener('change', (e) => {
        sortProjects(e.target.value);
    });

    // Initialize everything
    async function initialize() {
        initializeLoadingSequence();
        initializeCounters();
    }

    initialize();
});
