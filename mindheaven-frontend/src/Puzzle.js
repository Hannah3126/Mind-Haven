import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import "./Puzzle.css";

export default function PuzzleGame({ goToHome, goToLogin, goToSignup, goToGames, goToContact, goToWellness, goToBlogs,userName,userRole,userEmail }) {
  const size = 4; // 4x4 puzzle
  const [tiles, setTiles] = useState([]);
  const [moveCount, setMoveCount] = useState(0);

  // Initialize the puzzle
  useEffect(() => {
    const initTiles = [...Array(size * size).keys()];
    shuffle(initTiles);
    setTiles(initTiles);
  }, []);

  // Shuffle tiles
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  // Handle tile click
  const handleTileClick = (index) => {
  const emptyIndex = tiles.indexOf(0);

  // Check if tile is in the same row
  const sameRow = Math.floor(emptyIndex / size) === Math.floor(index / size);

  // Check if tile is in the same column
  const sameCol = emptyIndex % size === index % size;

  // Only allow moves if adjacent horizontally or vertically
  if (
    (sameRow && Math.abs(emptyIndex - index) === 1) ||
    (sameCol && Math.abs(emptyIndex - index) === size)
  ) {
    const newTiles = [...tiles];
    [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
    setTiles(newTiles);
    setMoveCount(moveCount + 1);
  }
};


  // Check if solved
  const isSolved = () => tiles.every((val, idx) => val === idx);

  return (
    <div className="puzzle-page">
      <Navbar
        currentPage="puzzle"
        goToHome={goToHome}
        goToLogin={goToLogin}
        goToSignup={goToSignup}
        goToGames={goToGames}
        goToContact={goToContact}
        goToWellness={goToWellness}
        goToBlogs={goToBlogs}
        userName={userName}    // ✅ show logged in name
        userRole={userRole}
        userEmail={userEmail}
      />

      <section className="puzzle-hero">
        <h2>Sliding Puzzle Game</h2>
        <p>Arrange the numbers in order by sliding tiles into the empty space!</p>
      </section>

      <section className="puzzle-board">
        {tiles.map((tile, index) => (
          <div
            key={index}
            className={`tile ${tile === 0 ? "empty" : ""}`}
            onClick={() => handleTileClick(index)}
          >
            {tile !== 0 ? tile : ""}
          </div>
        ))}
      </section>

      <div className="puzzle-info">
        <p>Moves: {moveCount}</p>
        {isSolved() && <p className="solved-msg">🎉 Puzzle Solved! 🎉</p>}
      </div>
    </div>
  );
}
