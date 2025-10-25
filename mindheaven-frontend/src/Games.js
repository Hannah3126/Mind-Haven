import React from "react";
import "./Games.css";
import Navbar from "./navbar";
import "./navbar.css";

const gamesData = [
  {
    title: "Chess",
    description: "Sharpen your strategy and focus with every move",
    imageSrc: "/Chess.png",
    alt: "Chess game setup",
    action: "chess",
  },
  {
    title: "Wordle",
    description: "Improve your vocabulary while playing with words",
    imageSrc: "/Word.png",
    alt: "Crossword puzzle",
    action: "wordle",
  },
  {
    title: "Spot the difference",
    description: "Train your eyes to notice even the smallest things",
    imageSrc: "/Spot.png",
    alt: "Spot the difference puzzle",
    action: "spot",
  },
  {
    title: "Jigsaw puzzle",
    description: "Assemble fragmented piece by piece",
    imageSrc: "/Puzzle.png",
    alt: "Jigsaw puzzle pieces",
    action: "jigsaw",
  },
  {
    title: "Tic Tac Toe",
    description: "A quick and simple way to challenge your mind",
    imageSrc: "/Tic.png",
    alt: "Tic Tac Toe game",
    action: "tic",
  },
  {
    title: "Quiz/Trivia",
    description: "Test your knowledge in a fun and easy way",
    imageSrc: "/Quiz.png",
    alt: "Quiz or Trivia game",
    action: "quiz",
  },
];

export default function GamesPage({
  goToHome,
  goToLogin,
  goToSignup,
  goToGames,
  goToContact,
  goTowellness,
  goToBlogs,
  goToWordle, // ✅ make sure App.js passes this prop
}) {
  return (
    <div className="games-page">
      {/* ---------- NAVBAR ---------- */}
      <Navbar
        currentPage="games"
        goToHome={goToHome}
        goToLogin={goToLogin}
        goToSignup={goToSignup}
        goToGames={goToGames}
        goToContact={goToContact}
        goTowellness={goTowellness}
        goToBlogs={goToBlogs}
      />

      {/* ---------- HERO / BANNER ---------- */}
      <section className="games-banner">
        <div className="banner-content">
          <h1>Games page</h1>
          <p>Games to Relax and Refresh Your Mind</p>
        </div>
        <div className="banner-image-placeholder"></div>
      </section>

      {/* ---------- GAMES GRID ---------- */}
      <section className="games-section">
        <div className="games-grid">
          {gamesData.map((game, index) => (
            <div className="games-card" key={index}>
              <div className="games-card-image-wrapper">
                <img src={game.imageSrc} alt={game.alt} />
              </div>
              <div className="games-card-content">
                <h3>{game.title}</h3>
                <p>{game.description}</p>
                <button
                  className="play-now-btn"
                  onClick={() => {
                    if (game.action === "wordle") {
                      goToWordle();
                    } else {
                      alert(`${game.title} is coming soon!`);
                    }
                  }}
                >
                  Play now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

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
}