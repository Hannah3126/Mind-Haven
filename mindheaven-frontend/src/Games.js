import React from "react";
import "./Games.css";
import Navbar from "./navbar"; // Assuming the Navbar component is in Navbar.js
import "./navbar.css"; // Assuming CSS for Navbar is separate

// Define the data for the game cards
const gamesData = [
  {
    title: "Chess",
    description: "Sharpen your strategy and focus with every move",
    imageSrc: "/Chess.png", // Placeholder image name
    alt: "Chess game setup",
  },
  {
    title: "Wordle",
    description: "Improve your vocabulary while playing with words",
    imageSrc: "/Word.png", // Placeholder image name
    alt: "Crossword puzzle",
  },
  {
    title: "Spot the difference",
    description: "Train your eyes to notice even the smallest things",
    imageSrc: "/Spot.png", // Placeholder image name
    alt: "Spot the difference puzzle",
  },
  {
    title: "Jigsaw puzzle",
    description: "Assemble fragmented piece by piece",
    imageSrc: "/Puzzle.png", // Placeholder image name
    alt: "Jigsaw puzzle pieces",
  },
  {
    title: "Tic Tac Toe",
    description: "A quick and simple way to challenge your mind",
    imageSrc: "/Tic.png", // Placeholder image name
    alt: "Tic Tac Toe game",
  },
  {
    title: "Quiz/Trivia",
    description: "Test your knowledge in a fun and easy way",
    imageSrc: "/Quiz.png", // Placeholder image name
    alt: "Quiz or Trivia game",
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
        {/* The image is handled by CSS background in .games-banner::after for better control */}
        <div className="banner-image-placeholder">
          {/* Placeholder is purely for semantic structure, main visual is CSS background/after element */}
        </div>
      </section>

      {/* ---------- GAMES GRID ---------- */}
      <section className="games-section">
        <div className="games-grid">
          {gamesData.map((game, index) => (
            <div className="games-card" key={index}>
              {/* Note: Actual image paths need to be set up in your public folder */}
              <div className="games-card-image-wrapper">
                <img src={game.imageSrc} alt={game.alt} />
              </div>
              <div className="games-card-content">
                <h3>{game.title}</h3>
                <p>{game.description}</p>
                <button
                  className="play-now-btn"
                  onClick={() => console.log(`Playing ${game.title}`)} // Add actual navigation/game launch logic here
                >
                  Play now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* ---------- FOOTER (Excluded as per request) ---------- */}
      {/* The original code had a placeholder for a footer here, which is now removed. */}
      <footer className="footer">
  <div className="footer-container">
    {/* ---- Brand ---- */}
    <div className="footer-brand">
      <h3>Mind Heaven</h3>
      <p>Real Stories of growth, healing and positive change.</p>
    </div>

    {/* ---- Links ---- */}
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

    {/* ---- Contact Info ---- */}
    <div className="footer-contact">
      <h4>Contact</h4>
      <p>Email: mindheaven@gmail.com</p>
      <p>Phone: +1 234 456 8890</p>
    </div>

    {/* ---- Message Box ---- */}
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
      © 2025 Mind Heaven | Designed with ♡ to make mental health accessible for
      everyone.
    </p>
  </div>
</footer>
      
    </div>
  );
}