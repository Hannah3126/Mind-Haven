import React, { useState } from "react";
import "./Games.css";
import Navbar from "./navbar";
import "./navbar.css";
import AchievementPopup from "./AchievementPopup"; 


const gamesData = [
  {
    title: "Matching Game",
    description: "Challenge your memory and sharpen your focus in a calming way.",
    imageSrc: "/Matching.jpg",
    alt: "Chess game setup",
    action: "matching",
  },
  {
    title: "Wordle",
    description: "Improve your vocabulary while playing with words",
    imageSrc: "/Word.png",
    alt: "Crossword puzzle",
    action: "wordle",
  },
  {
    title: "Pattern Recall",
    description: "Train your mind and focus by recalling glowing sequences!",
    imageSrc: "/Spot.png",
    alt: "Pattern Reacall Game",
    action: "pattern",
  },
  {
    title: "Sliding Puzzle Game",
    description: "Assemble fragmented piece by piece",
    imageSrc: "/Puzzle.png",
    alt: "Jigsaw puzzle pieces",
    action: "Puzzle",
  },
  {
    title: "Tic Tac Toe",
    description: "A quick and simple way to challenge your mind",
    imageSrc: "/Tic.png",
    alt: "Tic Tac Toe game",
    action: "tic",
  },
  {
    title: "Fun Quiz Game",
    description: "Get to know about you in a fun and easy way",
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
  goToWellness,
  goToBlogs,
  goToAdminDashboard,
  goToProfile,
  goToWordle,
  goToTicTacToe,
  goToMatchingGame, 
  goToPatternRecall,
  goToquiz,
  goToPuzzle,
  userEmail,
  userName,
  userRole
}) {

const [showAchievements, setShowAchievements] = useState(false);
// ✅ Get current user ID
const userId = localStorage.getItem("user_id");

// ✅ Wordle streak key for that user
const streakKey = `wordle_streak_${userId}`;

// ✅ Read real streak
const wordleStreak = parseInt(localStorage.getItem(streakKey) || "0");
// Temporary dummy achievement data
const [achievements] = useState({
  gamesPlayedToday: 3,
  wordleStreak: wordleStreak, // ✅ real streak here
  badges: [
    { id: 1, name: "First Game Played", icon: "🎉" },
    { id: 2, name: "Daily Player", icon: "🔥" },
    { id: 3, name: "Wordle Beginner", icon: "🧠" },
  ],
});
  return (
    <div className="games-page">
      {/* ---------- NAVBAR ---------- */}
      <Navbar
        currentPage="home"
        goToHome={goToHome}
        goToLogin={goToLogin}
        goToSignup={goToSignup}
        goToGames={goToGames}
        goToContact={goToContact}
        goToWellness={goToWellness}
        goToBlogs={goToBlogs}
        goToAdminDashboard={goToAdminDashboard}
        goToProfile={goToProfile}
        userName={userName}    // ✅ show logged in name
        userRole={userRole}
        userEmail={userEmail}
      />

      {/* ---------- HERO / BANNER ---------- */}
      <section className="games-banner">
        <div className="banner-content">
          <h1>Games page</h1>
          <p>Games to Relax and Refresh Your Mind</p>
        </div>
        
        <div className="banner-image-placeholder"></div>
        
      </section>

      <section className="achievements-button-wrapper">
        <button className="achievements-btn" onClick={() => setShowAchievements(true)}>
          🏅 View Achievements
        </button>
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
                    } else if (game.action === "tic") {
                      goToTicTacToe();
                    } else if (game.action === "matching") {
                      goToMatchingGame();
                    } else if (game.action === "pattern") {
                      goToPatternRecall();
                    } else if (game.action === "quiz") {
                      goToquiz();
                    } else if (game.action === "Puzzle") {
                      goToPuzzle();
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

      {showAchievements && (
        <AchievementPopup
          data={achievements}
          onClose={() => setShowAchievements(false)}
        />
      )}

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
              <li>Matching Game</li>
              <li>Wordle</li>
              <li>Pattern Recall</li>
              <li>Puzzle</li>
              <li>Tic Tac Toe</li>
              <li>Quiz Trivia</li>
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