import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-message">
        <span className="loading">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingScreen;