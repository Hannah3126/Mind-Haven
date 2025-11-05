import React, { useState } from 'react';
import './wellnesspage.css';
import Navbar from './navbar';
import './navbar.css';
import './meditation.js';
import './Appointment';

// ✅ Thought Tracker Box Component
const ThoughtTrackerBox = () => {
  const [thought, setThought] = useState('');
  const [reframed, setReframed] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReframe = async () => {
    if (!thought.trim()) return;
    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/reframe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ thought }),
        mode: 'cors'
      });
      const data = await res.json();
      setReframed(data.reframed || 'No response received.');
    } catch (err) {
      console.error('Error reframing thought:', err);
      setReframed('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="thought-tracker-box">
      <h3 className="thought-title">💭 Reflect & Reframe</h3>
      <p className="thought-subtitle">
        Type your thought on the left and receive a kinder perspective on the right.
      </p>

      <div className="thought-split">
        {/* LEFT SIDE - Input */}
        <div className="thought-input-box">
          <h4>📝 Your Thought</h4>
          <textarea
            className="thought-textarea"
            placeholder="Write what’s on your mind..."
            value={thought}
            onChange={(e) => setThought(e.target.value)}
          />
          <button className="reframe-btn" onClick={handleReframe} disabled={loading}>
            {loading ? 'Reframing...' : 'Reframe Thought'}
          </button>
        </div>

        {/* RIGHT SIDE - Output */}
        <div className="thought-output-box">
          <h4>💡 Reframed Thought</h4>
          <div className="reframed-display">
            {reframed ? (
              <p>{reframed}</p>
            ) : (
              <p className="placeholder">Your reframed thought will appear here.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ Reusable Section Block Component
const SectionBlock = ({
  title,
  subtitle,
  description,
  buttonText,
  imageSrc,
  imageAlt,
  reverseLayout,
  customClass,
  style,
  onButtonClick,
  children,
}) => (
  <section
    className={`section-block ${reverseLayout ? 'reverse' : ''} ${
      customClass || ''
    }`}
    style={style}
  >
    <div className="image-container">
      <img src={imageSrc} alt={imageAlt} className="section-image" />
    </div>
    <div className="text-container">
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
      <p className="section-description">{description}</p>
      {buttonText && (
        <button className="primary-btn" onClick={onButtonClick}>
          {buttonText}
        </button>
      )}
      {children && <div className="section-children">{children}</div>}
    </div>
  </section>
);

// ✅ Main Page Component
const WellnessPage = ({
  goToHome,
  goToLogin,
  goToSignup,
  goToGames,
  goToContact,
  goToWellness,
  goToBlogs,
  goToMeditation,
  goToMusic,
  goToAppointment,
  goToTips,
  userEmail,
  userName,
  userRole
}) => {
  return (
    <div className="wellness-page">
      {/* ---------- NAVBAR ---------- */}
      <Navbar
        currentPage="wellness"
        goToHome={goToHome}
        goToLogin={goToLogin}
        goToSignup={goToSignup}
        goToGames={goToGames}
        goToContact={goToContact}
        goToWellness={goToWellness}
        goToBlogs={goToBlogs}
        userName={userName}    // ✅ show logged in name
        userRole={userRole}
        userEmail={userEmail}
      />

      {/* ---------- HERO SECTION ---------- */}
      <section className="hero-banner">
        <div className="hero-text-container">
          <h1 className="hero-title">Wellness page</h1>
          <p className="hero-subtitle">
            Small steps every day lead to a peaceful mind
          </p>
        </div>
      </section>

      {/* ---------- MAIN CONTENT ---------- */}
      <main className="main-content">
        <SectionBlock
          title="Meditation and Exercises"
          subtitle="Calm your mind. Refresh your energy."
          description="Find peace through gentle breathing, stretching, and guided mindfulness sessions. Take a few minutes each day to relax your body and reset your mind."
          buttonText="Start Session"
          imageSrc="meditation.png"
          imageAlt="Woman doing yoga"
          reverseLayout={false}
          customClass="no-card"
          onButtonClick={goToMeditation}
        />

        <SectionBlock
          title="Calming Music"
          subtitle="Let every note bring you closer to peace"
          description="Immerse yourself in soothing melodies and nature sounds designed to promote tranquility. Perfect for moments when you need to unwind and breathe."
          buttonText="Explore Now"
          imageSrc="music.png"
          imageAlt="Man meditating with music"
          reverseLayout={true}
          style={{
            border: '3px solid #4a90e2',
            borderRadius: '18px',
            background: '#fff',
            boxShadow: '0 4px 15px rgba(107, 142, 255, 0.12)',
            padding: '30px',
          }}
          onButtonClick={goToMusic}
        />

        <SectionBlock
          title="Thought Tracker"
          subtitle="Understand your feelings, one thought at a time"
          description="Reflect on your emotions and note your thoughts daily. This mindful habit helps you understand your mood patterns and stay emotionally grounded."
          imageSrc="Brain.png"
          imageAlt="Stylized human brain"
          reverseLayout={false}
          customClass="no-card"
        >
          <ThoughtTrackerBox />
        </SectionBlock>

        <SectionBlock
          title="Mental Health Tips"
          subtitle="Small steps. Big impact on your well-being"
          description="Discover simple, science-backed tips to improve focus, manage stress, and nurture a healthy mind. Small actions can create meaningful change over time."
          buttonText="Explore now"
          imageSrc="Tips.png"
          imageAlt="Stylized tips"
          reverseLayout={true}
          style={{
            border: '3px solid #4a90e2',
            borderRadius: '18px',
            background: '#fff',
            boxShadow: '0 4px 15px rgba(107, 142, 255, 0.12)',
            padding: '30px',
          }}
          onButtonClick={goToTips}
        />

        <SectionBlock
          title="Book your appointment"
          subtitle="Get best advice from the expert"
          description="Book your session with trusted professionals and receive the right guidance at the right time. Taking this step brings you closer to healing, growth, and better mental well-being."
          buttonText="Schedule now"
          imageSrc="appointment.png"
          imageAlt="appointment"
          reverseLayout={false}
          customClass="no-card"
          onButtonClick={goToAppointment}
        />
      </main>

      {/* ---------- FOOTER ---------- */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <h3>Mind Heaven</h3>
            <p>Real Stories of growth, healing and positive change.</p>
          </div>

          <div className="footer-links">
            <ul>
              <li>Home</li>
              <li>Wellness</li>
              <li>Games</li>
              <li>Blog</li>
              <li>Contact Us</li>
            </ul>

            <ul>
              <li>Exercises</li>
              <li>Music & Songs</li>
              <li>Tips To Calm Mind</li>
              <li>Thought Tracker</li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Contact</h4>
            <p>Email: mindheaven@gmail.com</p>
            <p>Phone: +1 234 456 8890</p>
          </div>

          <div className="footer-message-box">
            <textarea
              className="footer-textarea"
              placeholder="Type your message..."
            ></textarea>
            <button className="footer-send-btn">Send</button>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © 2025 Mind Heaven | Designed with ♡ to make mental health
            accessible for everyone.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default WellnessPage;