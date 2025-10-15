import React from 'react';
import './wellnesspage.css'; // Assuming the CSS file is named WellnessPage.css

// --- Placeholder Components (for a realistic setup) ---

// Placeholder for the main navigation/header
const Header = () => (
  <header className="header">
    <div className="logo">Mind Heaven</div>
    <nav className="nav">
      <a href="/home">Home</a>
      <a href="/wellness" className="active">Wellness</a>
      <a href="/guides">Guides</a>
      <a href="/contact">Contact US</a>
      <a href="/blog">Blogs</a>
    </nav>
    <div className="auth-buttons">
      <button className="signup-btn">Signup</button>
      <button className="login-btn">Login</button>
    </div>
  </header>
);

// Placeholder for the footer
const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-logo">
        <h3>Mind Heaven</h3>
        <p>Real stories of growth, healing, and positive change</p>
      </div>
      <div className="footer-links">
        <h4>Home</h4>
        <ul>
          <li>Home</li>
          <li>Wellness</li>
          <li>Guides</li>
          <li>Contact us</li>
        </ul>
      </div>
      <div className="footer-links">
        <h4>Exercises</h4>
        <ul>
          <li>Breath</li>
          <li>Easy to calm mind</li>
          <li>Thought tracker</li>
        </ul>
      </div>
      <div className="footer-contact">
        <h4>Contact</h4>
        <p>Phone: +1 346 224 5896</p>
        <p>Email: mail@mindheaven@gmail.com</p>
        <div className="newsletter">
          <input type="email" placeholder="Enter your mail" />
          <button>Send Message</button>
        </div>
      </div>
    </div>
  </footer>
);

// --- Main Page Component ---

const WellnessPage = () => {
  return (
    <div className="wellness-page">
      <Header />
      
      {/* 1. Hero Banner Section */}
      <section className="hero-banner">
        <div className="hero-text-container">
          <h1 className="hero-title">Wellness page</h1>
          <p className="hero-subtitle">Small steps every day lead to a peaceful mind</p>
        </div>
        {/* The background image and overlay would be handled by CSS */}
      </section>

      <main className="main-content">
        
        {/* 2. Meditation and Exercises Section (Alternating Layout) */}
        <SectionBlock
          title="Meditation and Exercises"
          description="Find peace through gentle breathing, warm light, and guided mindfulness sessions. Take a few minutes each day to relax your body and reset your mind."
          buttonText="Start Session"
          imageSrc="meditation.png" // Replace with actual image
          imageAlt="Woman doing yoga"
          reverseLayout={false} // Text on right
        />
        
        {/* 3. Calming Music Section (Alternating Layout) */}
        <SectionBlock
          title="Calming Music"
          subtitle="Let every note bring you closer to peace"
          description="Immerse yourself in soothing melodies and nature sounds designed to promote tranquility. Perfect for moments when you need to unwind and breathe."
          buttonText="Explore Now"
          imageSrc="music.png" // Replace with actual image
          imageAlt="Man meditating with music"
          reverseLayout={true} // Text on left
        />
        
        {/* 4. Thought Tracker Section (Alternating Layout) */}
        <SectionBlock
          title="Thought Tracker"
          subtitle="Understand your feelings, one thought at a time"
          description="Reflect on your emotions and note your thoughts daily. This mindful habit helps you understand your mood patterns and stay emotionally grounded."
          buttonText="Get Started"
          imageSrc="Brain.png" // Replace with actual image
          imageAlt="Stylized human brain"
          reverseLayout={false} // Text on right
        />
        
        {/* 5. Mental Health Tips Section (Non-Alternating/Full Width) */}
        <div className="mental-health-section">
          <div className="content-box">
            <h2 className="title">Mental Health Tips</h2>
            <p className="subtitle">Discover simple, actionable tips to improve your well-being</p>
            <p className="description">Discover simple, actionable, science-backed tips to improve focus, manage stress, and nurture a healthy mind. Small actions can create meaningful change over time.</p>
            <button className="primary-btn">Read Articles</button>
          </div>
          <div className="image-box">
            {/* Placeholder for Mental Health Tips Image (Clipboard/Checklist) */}
            <img src="Tips.png" alt="Checklist and magnifying glass" />
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
};

// Reusable Component for the alternating sections
const SectionBlock = ({ title, subtitle, description, buttonText, imageSrc, imageAlt, reverseLayout }) => (
  <section className={`section-block ${reverseLayout ? 'reverse' : ''}`}>
    <div className="image-container">
      {/* In a real app, use the actual uploaded image via props or a pre-defined path */}
      <img src={imageSrc} alt={imageAlt} className="section-image" />
    </div>
    <div className="text-container">
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
      <h2 className="section-title">{title}</h2>
      <p className="section-description">{description}</p>
      <button className="primary-btn">{buttonText}</button>
    </div>
  </section>
);

export default WellnessPage;