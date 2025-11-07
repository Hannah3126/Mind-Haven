import React, { useState } from "react";
import "./music.css";
import Navbar from "./navbar";
import "./navbar.css";

export default function Music({
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
  const [currentTrack, setCurrentTrack] = useState(null);

  const musicTracks = [
    {
      title: "Peaceful Piano",
      subtitle: "Relaxing Instrumental",
      img: "/music4.jpg",
      link: "https://www.youtube.com/watch?v=fJy26OKglcA",
    },
    {
      title: "Ocean Waves Sound",
      subtitle: "Nature Therapy",
      img: "/music2.jpg",
      link: "https://www.youtube.com/watch?v=40tPuU6jrgQ",
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
      img: "/music1.jpg",
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
      link: "https://www.youtube.com/watch?v=TxkyFCeWAxs&list=RDTxkyFCeWAxs&start_radio=1",
    },
  ];

  return (
    <div className="music-page">
      <Navbar
        currentPage="music"
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

      <section className="music-banner">
        <div className="banner-content">
          <h1>Music Therapy</h1>
          <p>Relax, heal, and elevate your mood through calming music sessions</p>
        </div>
      </section>

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
                onClick={() => setCurrentTrack(track)}
              >
                Play
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ Music Player */}
      {currentTrack && (
        <div className="music-player-bar">
          <h4>🎧 Now Playing: {currentTrack.title}</h4>

          <iframe
            width="1"
            height="1"
            style={{ opacity: 0, position: "absolute", zIndex: -1 }}
            src={`${currentTrack.link.replace("watch?v=", "embed/")}?autoplay=1&controls=0&modestbranding=1&showinfo=0`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
          ></iframe>

          <button className="stop-btn" onClick={() => setCurrentTrack(null)}>
            ✖ Stop
          </button>
        </div>
      )}

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <h3>Mind Heaven</h3>
            <p>Relax your mind and soul with the power of sound and rhythm.</p>
          </div>

          <div className="footer-links">
            <ul>
              <li onClick={goToHome}>Home</li>
              <li onClick={goToWellness}>Wellness</li>
              <li onClick={goToGames}>Games</li>
              <li onClick={goToBlogs}>Blog</li>
              <li onClick={goToContact}>Contact Us</li>
            </ul>

            <ul>
              <li>Relaxing</li>
              <li>Nature Therapy</li>
              <li>Sleep Aid</li>
              <li>Energizing</li>
              <li>Concentration</li>
              <li>Spiritual Balance</li>
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
          <p>© 2025 Mind Heaven | Designed with ♫ to bring peace through music.</p>
        </div>
      </footer>
    </div>
  );
}