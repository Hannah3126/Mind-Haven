// WellnessPage.js

import React from 'react';
import './wellnesspage.css'; 
// Import the shared Navbar component
import Navbar from './navbar'; 


// --- Reusable Component for the alternating sections (Keep This) ---
const SectionBlock = ({ title, subtitle, description, buttonText, imageSrc, imageAlt, reverseLayout }) => (
  <section className={`section-block ${reverseLayout ? 'reverse' : ''}`}>
    <div className="image-container">
      {/* Ensure images are loaded correctly from the public directory */}
      <img src={process.env.PUBLIC_URL + '/' + imageSrc} alt={imageAlt} className="section-image" />
    </div>
    <div className="text-container">
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
      <h2 className="section-title">{title}</h2>
      <p className="section-description">{description}</p>
      <button className="primary-btn">{buttonText}</button>
    </div>
  </section>
);


// --- Footer Component (Using the detailed definition from your original code) ---
// Note: This should ideally be moved to a shared Footer.js file later!
// const Footer = () => (
//   <footer className="footer">
//     <div className="footer-content">
//       <div className="footer-logo">
//         <h3>Mind Heaven</h3>
//         <p>Real stories of growth, healing, and positive change</p>
//       </div>
//       <div className="footer-links">
//         <h4>Home</h4>
//         <ul>
//           <li>Home</li>
//           <li>Wellness</li>
//           <li>Guides</li>
//           <li>Contact us</li>
//         </ul>
//       </div>
//       <div className="footer-links">
//         <h4>Exercises</h4>
//         <ul>
//           <li>Breath</li>
//           <li>Easy to calm mind</li>
//           <li>Thought tracker</li>
//         </ul>
//       </div>
//       <div className="footer-contact">
//         <h4>Contact</h4>
//         <p>Phone: +1 346 224 5896</p>
//         <p>Email: mail@mindheaven@gmail.com</p>
//         <div className="newsletter">
//           <input type="email" placeholder="Enter your mail" />
//           <button>Send Message</button>
//         </div>
//       </div>
//     </div>
//   </footer>
// );


// --- Main Page Component ---

// 1. Must accept all the navigation props from App.js
const WellnessPage = ({ currentPage, goToHome, goToLogin, goToSignup, goToGames, goToContact, goTowellness }) => {
  return (
    <div className="wellness-page">
      
      {/* 2. RENDER THE SHARED NAVBAR */}
      <Navbar 
          currentPage={currentPage}
          goToHome={goToHome}
          goToLogin={goToLogin}
          goToSignup={goToSignup}
          goToGames={goToGames}
          goToContact={goToContact}
          goTowellness={goTowellness}
      />
      
      {/* 1. Hero Banner Section */}
      <section className="hero-banner">
        <div className="hero-text-container">
          <h1 className="hero-title">Wellness page</h1>
          <p className="hero-subtitle">Small steps every day lead to a peaceful mind</p>
        </div>
      </section>

      <main className="main-content">
        
        {/* 2. Meditation and Exercises Section */}
        <SectionBlock
          title="Meditation and Exercises"
          description="Find peace through gentle breathing, warm light, and guided mindfulness sessions. Take a few minutes each day to relax your body and reset your mind."
          buttonText="Start Session"
          imageSrc="meditation.png" 
          imageAlt="Woman doing yoga"
          reverseLayout={false} 
        />
        
        {/* 3. Calming Music Section */}
        <SectionBlock
          title="Calming Music"
          subtitle="Let every note bring you closer to peace"
          description="Immerse yourself in soothing melodies and nature sounds designed to promote tranquility. Perfect for moments when you need to unwind and breathe."
          buttonText="Explore Now"
          imageSrc="music.png" 
          imageAlt="Man meditating with music"
          reverseLayout={true} 
        />
        
        {/* 4. Thought Tracker Section */}
        <SectionBlock
          title="Thought Tracker"
          subtitle="Understand your feelings, one thought at a time"
          description="Reflect on your emotions and note your thoughts daily. This mindful habit helps you understand your mood patterns and stay emotionally grounded."
          buttonText="Get Started"
          imageSrc="Brain.png" 
          imageAlt="Stylized human brain"
          reverseLayout={false} 
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
            <img src={process.env.PUBLIC_URL + "/Tips.png"} alt="Checklist and magnifying glass" />
          </div>
        </div>

      </main>

      {/* 3. RENDER THE LOCAL FOOTER */}
      {/* <Footer />  */}
    </div>
  );
};<footer className="footer">
        <p>© 2025 Mind Heaven | Designed with ♡ to make mental health accessible for everyone.</p>
      </footer>

export default WellnessPage;