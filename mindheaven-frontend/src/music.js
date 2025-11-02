import React from "react";
import "./music.css";
import Navbar from "./navbar";
import "./navbar.css";

export default function Music({
  goToHome,
  goToLogin,
  goToSignup,
  goToGames,
  goToContact,
  goTowellness,
  goToBlogs,
}) {
  const musicTracks = [
    {
      title: "Peaceful Piano",
      subtitle: "Relaxing Instrumental",
      img: "/music1.jpg",
      link: "https://www.youtube.com/watch?v=1ZYbU82GVz4",
    },
    {
      title: "Ocean Waves Sound",
      subtitle: "Nature Therapy",
      img: "/music2.jpg",
      link: "https://www.youtube.com/watch?v=1L0rDA8SglI",
    },
    {
      title: "Calm Sleep Music",
      subtitle: "Sleep Aid",
      img: "/music3.jpg",
      link: "https://www.youtube.com/watch?v=2OEL4P1Rz04",
    },
    {
      title: "Morning Motivation Beats",
      subtitle: "Energizing",
      img: "/music4.jpg",
      link: "https://www.youtube.com/watch?v=UfcAVejslrU",
    },
    {
      title: "Focus Music for Study",
      subtitle: "Concentration",
      img: "/music5.jpg",
      link: "https://www.youtube.com/watch?v=WPni755-Krg",
    },
    {
      title: "Chakra Healing Music",
      subtitle: "Spiritual Balance",
      img: "/music6.jpg",
      link: "https://www.youtube.com/watch?v=QJqz6VqRex8",
    },
  ];

  return (
    <div className="music-page">
      {/* ---------- NAVBAR ---------- */}
      <Navbar
        currentPage="music"
        goToHome={goToHome}
        goToLogin={goToLogin}
        goToSignup={goToSignup}
        goToGames={goToGames}
        goToContact={goToContact}
        goTowellness={goTowellness}
        goToBlogs={goToBlogs}
      />

      {/* ---------- BANNER ---------- */}
      <section className="music-banner">
        <div className="banner-content">
          <h1>Music Therapy</h1>
          <p>Relax, heal, and elevate your mood through calming music sessions</p>
        </div>
      </section>

      {/* ---------- MUSIC GRID ---------- */}
      <section className="music-section">
        <div className="music-grid">
          {musicTracks.map((track, index) => (
            <div key={index} className="music-card">
              <img src={track.img} alt={track.subtitle} />
              <div className="music-meta">
                <p className="music-small-title">{track.subtitle}</p>
              </div>
              <h3>{track.title}</h3>
              <button
                className="start-btn"
                onClick={() => window.open(track.link, "_blank")}
              >
                Play
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
            <p>Relax your mind and soul with the power of sound and rhythm.</p>
          </div>

          {/* Navigation Links */}
          <div className="footer-links">
            <ul>
              <li onClick={goToHome}>Home</li>
              <li onClick={goTowellness}>Wellness</li>
              <li onClick={goToGames}>Games</li>
              <li onClick={goToBlogs}>Blog</li>
              <li onClick={goToContact}>Contact Us</li>
            </ul>

            <ul>
              <li>Relaxation</li>
              <li>Focus</li>
              <li>Healing</li>
              <li>Sleep</li>
              <li>Energy</li>
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
            © 2025 Mind Heaven | Designed with ♫ to bring peace through music.
          </p>
        </div>
      </footer>
    </div>
  );
}
