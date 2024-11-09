document.addEventListener('DOMContentLoaded', () => {
    const projectsSection = document.querySelector('#projects');
    const loadingScreen = document.getElementById('loading-screen');
    const loadingText = document.getElementById('loading-text');
    const githubUsername = 'nadeeshafdo';

    // Typewriter effect variables
    let adviceText = '';
    let charIndex = 0;

    // Typewriter function to display one character at a time
    function typeWriter() {
        if (charIndex < adviceText.length) {
            loadingText.textContent += adviceText.charAt(charIndex); // Add one character
            charIndex++;
            setTimeout(typeWriter, 100); // Adjust speed here (100ms per character)
        }
    }

    // Fetch advice message and apply typewriter effect
    fetch('https://api.adviceslip.com/advice')
        .then(response => response.json())
        .then(data => {
            adviceText = data.slip.advice; // Set advice text
            typeWriter(); // Start the typewriter effect
        })
        .catch(error => {
            console.error('Error fetching advice:', error);
            adviceText = 'Loading projects, please wait...';
            typeWriter();
        });

    // Fetch projects from GitHub API
    fetch(`https://api.github.com/users/${githubUsername}/repos?sort=created&per_page=10`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(repos => {
            // Hide the loading screen after fetching the data and displaying advice
            setTimeout(() => {
                loadingScreen.classList.add('hidden'); // Transition out the loading screen
            }, 8000); // Show the advice for 8 seconds

            // Clear any existing projects content
            projectsSection.innerHTML = '';

            if (repos.length === 0) {
                projectsSection.innerHTML = '<p>No projects found.</p>';
            }

            repos.forEach(repo => {
                const projectCard = document.createElement('div');
                projectCard.classList.add('project-card');

                const projectTitle = document.createElement('h3');
                projectTitle.textContent = repo.name;

                const projectDescription = document.createElement('p');
                projectDescription.textContent = repo.description || 'No description available';

                const projectLink = document.createElement('a');
                projectLink.href = repo.html_url;
                projectLink.textContent = 'View Project';
                projectLink.target = '_blank';
                projectLink.style.display = 'block';
                projectLink.style.color = 'var(--primary)';
                projectLink.style.marginTop = '10px';

                // Append title, description, and link to project card
                projectCard.appendChild(projectTitle);
                projectCard.appendChild(projectDescription);
                projectCard.appendChild(projectLink);

                // Append project card to the projects section
                projectsSection.appendChild(projectCard);
            });
        })
        .catch(error => {
            console.error('Error fetching GitHub repos:', error);
            loadingScreen.style.display = 'none';
            projectsSection.innerHTML = `<p>Unable to load projects at this time. Please try again later.</p>`;
        });
});
