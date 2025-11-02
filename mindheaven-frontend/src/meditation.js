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
  goTowellness,
  goToBlogs,
}) {
  // ✅ Meditation data with YouTube links (replace with your own)
  const meditations = [
    {
      title: "Mindfulness Meditation",
      subtitle: "Mindfulness",
      date: "01 July 2025",
      img: "/blog1.png",
      link: "https://www.youtube.com/watch?v=inpok4MKVLM",
    },
    {
      title: "Deep Breathing Practice",
      subtitle: "Breathing",
      date: "01 June 2025",
      img: "/blog2.png",
      link: "https://www.youtube.com/watch?v=nmFUDkj1Aq0",
    },
    {
      title: "Relaxation & Calm Mind",
      subtitle: "Relaxation",
      date: "01 January 2025",
      img: "/blog3.png",
      link: "https://www.youtube.com/watch?v=ZToicYcHIOU",
    },
    {
      title: "Positive Energy Meditation",
      subtitle: "Positivity",
      date: "11 August 2025",
      img: "/blog1.png",
      link: "https://www.youtube.com/watch?v=ltC6W3PzO9Q",
    },
    {
      title: "Sleep Meditation",
      subtitle: "Sleep",
      date: "03 July 2025",
      img: "/blog2.png",
      link: "https://www.youtube.com/watch?v=1vx8iUvfyCY",
    },
    {
      title: "Healing Meditation",
      subtitle: "Healing",
      date: "12 March 2025",
      img: "/blog3.png",
      link: "https://www.youtube.com/watch?v=inpok4MKVLM",
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
        goTowellness={goTowellness}
        goToBlogs={goToBlogs}
      />

      {/* ---------- MEDITATION PAGE BANNER ---------- */}
      <section className="meditation-banner">
        <div className="banner-content">
          <h1>Meditation</h1>
          <p>Find calm, focus, and peace through guided meditation sessions</p>
        </div>
      </section>

      {/* ---------- MEDITATION SECTION ---------- */}
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
          <div className="footer-brand">
            <h3>Mind Heaven</h3>
            <p>Guided meditations to help you relax, focus, and heal.</p>
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
              <li>Mindfulness</li>
              <li>Breathing</li>
              <li>Relaxation</li>
              <li>Sleep</li>
              <li>Healing</li>
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
            © 2025 Mind Heaven | Designed with ♡ to make mindfulness accessible
            for everyone.
          </p>
        </div>
      </footer>
    </div>
  );
}
