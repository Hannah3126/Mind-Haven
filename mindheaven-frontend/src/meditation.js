import React from "react";
import "./meditation.css";
import Navbar from "./navbar";
import "./navbar.css";

export default function Meditation({
  goToHome,
  goToLogin,
  goToSignup,
  goToGames,
  goToContact,
  goToWellness,
  goToBlogs,
  userEmail,
  userName,
  userRole
  
}) {
  const meditations = [
    {
      title: "Mindfulness Meditation",
      subtitle: "Mindfulness",
      
      img: "/med1.jpg",
      link: "https://www.youtube.com/watch?v=ssss7V1_eyA",
    },
    {
      title: "Deep Breathing Practice",
      subtitle: "Breathing",
      
      img: "/med2.jpg",
      link: "https://www.youtube.com/watch?v=Z8emmFOuhxE",
    },
    {
      title: "Relaxation & Calm Mind",
      subtitle: "Relaxation",
      
      img: "/med3.jpg",
      link: "https://www.youtube.com/watch?v=VpHz8Mb13_Y",
    },
    {
      title: "Positive Energy Meditation",
      subtitle: "Positivity",
      
      img: "/med4.jpg",
      link: "https://www.youtube.com/watch?v=j734gLbQFbU",
    },
    {
      title: "Sleep Meditation",
      subtitle: "Sleep",
      
      img: "/med5.jpg",
      link: "https://www.youtube.com/watch?v=2K4T9HmEhWE",
    },
    {
      title: "Healing Meditation",
      subtitle: "Healing",
      
      img: "/med6.jpg",
      link: "https://www.youtube.com/watch?v=e69dOMFLLl8",
    },
  ];

  return (
    <div className="meditation-page">
      {/* ---------- NAVBAR ---------- */}
      <Navbar
        currentPage="meditation"
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

      {/* ---------- BANNER ---------- */}
      <section className="meditation-banner">
        <div className="banner-content">
          <h1>Meditation</h1>
          <p>Find calm, focus, and peace through guided meditation sessions</p>
        </div>
      </section>

      {/* ---------- MEDITATION GRID ---------- */}
      <section className="meditation-section">
        <div className="meditation-grid">
          {meditations.map((item, index) => (
            <div key={index} className="meditation-card">
              <img src={item.img} alt={item.subtitle} />
              <div className="meditation-meta">
                <p className="meditation-small-title">{item.subtitle}</p>
                <p className="meditation-date">{item.date}</p>
              </div>
              <h3>{item.title}</h3>
              <button
                className="start-btn"
                onClick={() => window.open(item.link, "_blank")}
              >
                Start
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="footer">
        <div className="footer-container">
          {/* Brand Info */}
          <div className="footer-brand">
            <h3>Mind Heaven</h3>
            <p>Guided meditations to help you relax, focus, and heal.</p>
          </div>

          {/* Navigation Links */}
          <div className="footer-links">
            <ul>
              <li onClick={goToHome}>Home</li>
              <li onClick={goToWellness}>Wellness</li>
              <li onClick={goToGames}>Games</li>
              <li onClick={goToBlogs}>Blog</li>
              <li onClick={goToContact}>Contact Us</li>
            </ul>

            <ul>
              <li>Mindfulness</li>
              <li>Breathing</li>
              <li>Relaxation</li>
              <li>Sleep</li>
              <li>Healing</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-contact">
            <h4>Contact</h4>
            <p>Email: mindheaven@gmail.com</p>
            <p>Phone: +1 234 456 8890</p>
          </div>

          {/* Message Box */}
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
            © 2025 Mind Heaven | Designed with ♡ to make mindfulness accessible
            for everyone.
          </p>
        </div>
      </footer>
    </div>
  );
}
