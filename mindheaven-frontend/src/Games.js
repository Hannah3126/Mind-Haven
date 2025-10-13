import React from "react";
import "./Games.css";
import { Gamepad2, Brain, Smile, ArrowLeft, ArrowUpRight } from "lucide-react";

function GamesPage({ goToHome, goToWordle }) {
  return (
    <div className="games-page">

      {/* -------- Clean, Homepage-style Navbar -------- */}
      <nav className="navbar">
        <div className="navbar-left">
          <button className="nav-back-btn" onClick={goToHome}>
            <ArrowLeft size={18} /> Go Back
          </button>
        </div>

        <div className="navbar-center">Fun Mind Games</div>

        <div className="navbar-right">{/* Optional right-side content */}</div>
      </nav>

      <p className="games-subtitle">Fun ways to improve mental agility and relax</p>

      <div className="games-grid">
        <div className="game-card" onClick={goToWordle}>
          <div className="arrow-icon"><ArrowUpRight color="black" /></div>
          <div className="game-icon"><Gamepad2 size={48} color="#4c6ef5" /></div>
          <h3>Wordle</h3>
          <p>Guess the hidden word in 6 tries. Daily new words!</p>
        </div>

        <div className="game-card">
          <div className="arrow-icon"><ArrowUpRight color="black" /></div>
          <div className="game-icon"><Brain size={48} color="#38bdf8" /></div>
          <h3>Memory Match</h3>
          <p>Coming soon...</p>
        </div>

        <div className="game-card">
          <div className="arrow-icon"><ArrowUpRight color="black" /></div>
          <div className="game-icon"><Smile size={48} color="#10b981" /></div>
          <h3>Mood Boost Quiz</h3>
          <p>Coming soon...</p>
        </div>
      </div>
    </div>
  );
}

export default GamesPage;