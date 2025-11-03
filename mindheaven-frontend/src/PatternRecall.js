import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import "./PatternRecall.css";

const TILE_COUNT = 4;
const TILE_COLORS = ["#A2D2FF", "#FFC8DD", "#CDB4DB", "#B5EAD7"];

const getRandomTile = () => Math.floor(Math.random() * TILE_COUNT);

export default function PatternRecall({ goToHome, goToLogin, goToSignup, goToGames, goToContact, goToWellness, goToBlogs }) {
  const [sequence, setSequence] = useState([]);
  const [playerInput, setPlayerInput] = useState([]);
  const [activeTile, setActiveTile] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [level, setLevel] = useState(1);
  const [message, setMessage] = useState("Tap Start to begin");
  const [canClick, setCanClick] = useState(false);

  const playSequence = async (seq) => {
    setCanClick(false);
    for (let i = 0; i < seq.length; i++) {
      await new Promise((resolve) => {
        setTimeout(() => {
          setActiveTile(seq[i]);
          resolve();
        }, 600);
      });
      await new Promise((resolve) => {
        setTimeout(() => {
          setActiveTile(null);
          resolve();
        }, 400);
      });
    }
    setCanClick(true);
  };

  const startGame = () => {
    const firstTile = getRandomTile();
    const newSeq = [firstTile];
    setSequence(newSeq);
    setPlayerInput([]);
    setLevel(1);
    setMessage("Watch and repeat the pattern");
    setIsPlaying(true);
    playSequence(newSeq);
  };

  const handleTileClick = (index) => {
    if (!canClick) return;
    const newInput = [...playerInput, index];
    setPlayerInput(newInput);

    if (index !== sequence[newInput.length - 1]) {
      setMessage("❌ Wrong pattern! Tap Start to try again.");
      setIsPlaying(false);
      setSequence([]);
      setPlayerInput([]);
      setLevel(1);
      setCanClick(false);
      return;
    }

    if (newInput.length === sequence.length) {
      const nextTile = getRandomTile();
      const newSeq = [...sequence, nextTile];
      setSequence(newSeq);
      setPlayerInput([]);
      setLevel(level + 1);
      setMessage("✅ Great! Get ready for next level");
      setTimeout(() => {
        playSequence(newSeq);
        setMessage("Watch and repeat the pattern");
      }, 1000);
    }
  };

  return (
    <div className="pattern-recall-page">
      <Navbar
        goToHome={goToHome}
        goToLogin={goToLogin}
        goToSignup={goToSignup}
        goToGames={goToGames}
        goToContact={goToContact}
        goToWellness={goToWellness}
        goToBlogs={goToBlogs}
      />

      <div className="game-container">
        <h1 className="title">Pattern Recall</h1>
        <p className="status">{message}</p>
        <div className="tiles-grid">
          {[...Array(TILE_COUNT)].map((_, index) => (
            <div
              key={index}
              className={`tile ${activeTile === index ? "active" : ""}`}
              style={{ backgroundColor: TILE_COLORS[index] }}
              onClick={() => handleTileClick(index)}
            ></div>
          ))}
        </div>
        <button className="start-btn" onClick={startGame} disabled={isPlaying}>
          {isPlaying ? `Level ${level}` : "Start"}
        </button>
      </div>
    </div>
  );
}