import React from "react";
import "./Games.css";
import Navbar from "./navbar";
import "./navbar.css";

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
      </section>

      {/* ---------- GAMES GRID ---------- */}
      <section className="games-section">
        <div className="games-grid">
          <div className="game-card">
            <img src="/chess.png" alt="Chess" />
            <div className="game-info">
              <h3>Chess</h3>
              <p>Sharpen your strategy and focus with every move</p>
              <button className="play-btn">Play now</button>
            </div>
          </div>

          <div className="game-card">
            <img src="/crossword.png" alt="Crossword" />
            <div className="game-info">
              <h3>Crossword</h3>
              <p>Relax your mind while playing with words</p>
              <button className="play-btn">Play now</button>
            </div>
          </div>

          <div className="game-card">
            <img src="/spotdifference.png" alt="Spot the difference" />
            <div className="game-info">
              <h3>Spot the difference</h3>
              <p>Boost your focus by noticing the little things</p>
              <button className="play-btn">Play now</button>
            </div>
          </div>

          <div className="game-card">
            <img src="/jigsaw.png" alt="Jigsaw puzzle" />
            <div className="game-info">
              <h3>Jigsaw puzzle</h3>
              <p>Assemble calmness piece by piece</p>
              <button className="play-btn">Play now</button>
            </div>
          </div>

          <div className="game-card">
            <img src="/tictactoe.png" alt="Tic Tac Toe" />
            <div className="game-info">
              <h3>Tic Tac Toe</h3>
              <p>A quick strategy game to challenge your mind</p>
              <button className="play-btn">Play now</button>
            </div>
          </div>

          <div className="game-card">
            <img src="/quiz.png" alt="Quiz/Trivia" />
            <div className="game-info">
              <h3>Quiz/Trivia</h3>
              <p>Test your knowledge in a fun way</p>
              <button className="play-btn">Play now</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
