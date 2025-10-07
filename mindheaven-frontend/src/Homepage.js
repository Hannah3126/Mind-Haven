import React from "react";
import "./Homepage.css";

function HomePage({ goToLogin }) {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to MindHeaven</h1>
          <p className="hero-subtitle">
            Discover peace, clarity, and balance. Your journey to mental wellness starts here.
          </p>
          <div className="hero-buttons">
            <button className="primary-btn" onClick={goToLogin}>
              Get Started
            </button>
            <button
              className="secondary-btn"
              onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}
            >
              Learn More
            </button>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1000&q=80"
            alt="Mindful meditation illustration"
          />
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <h2>What is MindHeaven?</h2>
        <p>
          MindHeaven is your safe digital space for mental wellness — combining guided meditation,
          community support, and mood tracking to help you live a calmer and more balanced life.
        </p>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature-card">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2920/2920264.png"
            alt="Meditation"
          />
          <h3>Guided Meditation</h3>
          <p>Explore soothing meditation sessions designed to help you unwind and reconnect.</p>
        </div>
        <div className="feature-card">
          <img
            src="https://cdn-icons-png.flaticon.com/512/833/833472.png"
            alt="Mood Tracker"
          />
          <h3>Mood Tracking</h3>
          <p>Keep track of your emotions and see your progress toward emotional stability.</p>
        </div>
        <div className="feature-card">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1087/1087927.png"
            alt="Community"
          />
          <h3>Supportive Community</h3>
          <p>Connect with people who care — share experiences and grow together.</p>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <p>© 2025 MindHeaven. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;


 
