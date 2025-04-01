import React from 'react';

const UnderConstruction: React.FC = () => {
  return (
    <div className="construction-container">
      <h1 className="title">🚧 Under Construction 🚧</h1>
      <p className="subtitle">Building something awesome...</p>
      
      <div className="terminal">
        <div className="terminal-header">
          <div className="terminal-buttons">
            <div className="terminal-button red"></div>
            <div className="terminal-button yellow"></div>
            <div className="terminal-button green"></div>
          </div>
        </div>
        <div className="terminal-content">
          <span style={{ color: '#27c93f' }}>$</span> npm install<br />
          <span style={{ color: '#27c93f' }}>$</span> npm run build<br />
          <br />
          <div className="terminal-messages">
            <span className="compile-text">Compiling module...</span>
            <span className="compile-text">Loading dependencies...</span>
            <span className="compile-text">Building assets...</span>
            <span className="compile-text">Optimizing build...</span>
          </div>
          <span className="blink">_</span>
        </div>
      </div>

      <div className="progress-bar">
        <div className="progress"></div>
      </div>

      <div className="code-block">
        $ git commit -m "🚀 Initial commit"<br />
        $ git push origin main<br />
        Building site...<span className="blink">_</span>
      </div>
    </div>
  );
};

export default UnderConstruction;
