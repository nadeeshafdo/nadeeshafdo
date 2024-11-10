document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const projectsSection = document.querySelector('.projects-grid');
    const loadingScreen = document.getElementById('loading-screen');
    const typewriterElement = document.getElementById('typewriter');
    const statValues = document.querySelectorAll('.stat-value');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    const CONFIG = {
        githubUsername: 'nadeeshafdo',
        typewriterSpeed: 75,
        loadingDuration: 8000,
        adviceDisplayDuration: 4000
    };

    // Typewriter effect implementation
    class Typewriter {
        constructor(element, text, speed = 50) {
            this.element = element;
            this.text = text;
            this.speed = speed;
            this.currentChar = 0;
            this.isDeleting = false;
        }

        type() {
            // Current text based on deletion or typing
            const fullText = this.text;
            const currentText = fullText.substring(0, this.currentChar);

            // Update the element text
            this.element.textContent = currentText;

            // Add blinking cursor
            if (!this.isDeleting && this.currentChar === fullText.length) {
                return;
            }

            // Speed for typing and deleting
            let typeSpeed = this.speed;

            if (!this.isDeleting) {
                this.currentChar++;
            }

            // Continue typing
            setTimeout(() => this.type(), typeSpeed);
        }

        start() {
            this.type();
        }
    }

    // Animate number counter
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50; // Divide animation into 50 steps
        const duration = 2000; // 2 seconds
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
        `;

        return card;
    }

    // Fetch and display GitHub projects
    async function fetchProjects() {
        try {
            const response = await fetch(
                `https://api.github.com/users/${CONFIG.githubUsername}/repos?sort=created&per_page=6`,
                {
                    headers: {
                        'Accept': 'application/vnd.github.v3+json',
                        'Accept-Encoding': 'gzip, deflate'
                    }
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const repos = await response.json();
            
            if (repos.length === 0) {
                projectsSection.innerHTML = '<p class="no-projects">No projects found.</p>';
                return;
            }

            // Clear and populate projects
            projectsSection.innerHTML = '';
            repos.forEach(repo => {
                const projectCard = createProjectCard(repo);
                projectsSection.appendChild(projectCard);
            });
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
            // Fetch advice while loading
            const adviceResponse = await fetch('https://api.adviceslip.com/advice');
            const adviceData = await adviceResponse.json();
            const advice = adviceData.slip.advice;

            // Start typewriter effect
            const typewriter = new Typewriter(typewriterElement, advice, CONFIG.typewriterSpeed);
            typewriter.start();

            // Initialize projects fetch
            await fetchProjects();

            // Hide loading screen after everything is loaded
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

    // Mobile menu toggle
    function initializeMobileMenu() {
        mobileMenuBtn?.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        navLinks?.addEventListener('click', (e) => {
            if (e.target.classList.contains('nav-link')) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }

    // Scroll reveal animation
    function initializeScrollReveal() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.project-card, .about-content, .contact-content')
            .forEach(element => observer.observe(element));
    }

    // Initialize everything
    function initialize() {
        initializeLoadingSequence();
        initializeMobileMenu();
        initializeScrollReveal();
    }

    initialize();
});