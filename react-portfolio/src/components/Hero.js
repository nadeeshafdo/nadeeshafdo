import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Hi, I'm <span className="typing-text">Nadeesha Fernando</span>
          </motion.h1>
          <motion.p
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            I'm a passionate web developer and tech enthusiast.
          </motion.p>
          <div className="hero-buttons">
            <motion.a
              href="#projects"
              className="btn-primary"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              View Projects
            </motion.a>
            <motion.a
              href="#contact"
              className="btn-secondary"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 2 }}
            >
              Contact Me
            </motion.a>
          </div>
        </div>
        <div className="hero-image">
          <motion.div
            className="hero-card"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <img src="https://avatars.githubusercontent.com/u/73843266?v=4" alt="Profile" className="profile-img" />
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-value">5+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">30+</span>
                <span className="stat-label">Projects Completed</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;