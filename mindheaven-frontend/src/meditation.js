import React, { useState } from "react";
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
  const [currentMeditation, setCurrentMeditation] = useState(null);

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
      <Navbar
        currentPage="meditation"
        goToHome={goToHome}
        goToLogin={goToLogin}
        goToSignup={goToSignup}
        goToGames={goToGames}
        goToContact={goToContact}
        goToWellness={goToWellness}
        goToBlogs={goToBlogs}
        userName={userName}
        userRole={userRole}
        userEmail={userEmail}
      />

      <section className="meditation-banner">
        <div className="banner-content">
          <h1>Meditation</h1>
          <p>Find calm, focus, and peace through guided meditation sessions</p>
        </div>
      </section>

      <section className="meditation-section">
        <div className="meditation-grid">
          {meditations.map((item, index) => (
            <div key={index} className="meditation-card">
              <img src={item.img} alt={item.subtitle} />
              <div className="meditation-meta">
                <p className="meditation-small-title">{item.subtitle}</p>
              </div>
              <h3>{item.title}</h3>
              <button
                className="start-btn"
                onClick={() => setCurrentMeditation(item)}
              >
                Start
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ Meditation Player Section */}
      {currentMeditation && (
        <div className="meditation-overlay">
          <div className="meditation-modal">
            <button className="close-btn" onClick={() => setCurrentMeditation(null)}>✖</button>
            <h3>🧘 Now Meditating: {currentMeditation.title}</h3>
            
            <iframe
              width="100%"
              height="350"
              src={currentMeditation.link.replace("watch?v=", "embed/") + "?autoplay=1"}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>

            <button className="end-session" onClick={() => setCurrentMeditation(null)}>
              End Session
            </button>
          </div>
        </div>
      )}

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <h3>Mind Heaven</h3>
            <p>Guided meditations to help you relax, focus, and heal.</p>
          </div>
          
          <div className="footer-links">
            <ul>
              <li onClick={goToHome}>Home</li>
              <li onClick={goToWellness}>Wellness</li>
              <li onClick={goToGames}>Games</li>
              <li onClick={goToBlogs}>Blog</li>
              <li onClick={goToContact}>Contact Us</li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Contact</h4>
            <p>Email: mindheaven@gmail.com</p>
            <p>Phone: +1 234 456 8890</p>
          </div>
        </div>
      </footer>
    </div>
  );
}