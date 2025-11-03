import React, { useState, useEffect } from "react";
import "./Wordle.css";
import Navbar from "./navbar";

function WordleGame({
  goToHome,
  goToLogin,
  goToSignup,
  goToGames,
  goToContact,
  goTowellness,
  goToBlogs,
  currentPage,
}) {
  const [guesses, setGuesses] = useState([]);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [validWords, setValidWords] = useState([]);
  const [wordToGuess, setWordToGuess] = useState("");

  // Seeded random for daily word
  const getSeededRandomIndex = (wordList) => {
    const today = new Date();
    const seed =
      today.getFullYear() * 10000 +
      (today.getMonth() + 1) * 100 +
      today.getDate();
    const rng = mulberry32(seed);
    return Math.floor(rng() * wordList.length);
  };

  const mulberry32 = (a) => {
    return function () {
      let t = (a += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };

  // Load valid words and pick the daily word
  useEffect(() => {
    fetch("/valid-wordle-words.txt")
      .then((res) => res.text())
      .then((text) => {
        const words = text
          .split("\n")
          .map((w) => w.trim().toUpperCase())
          .filter((w) => w.length === 5);

        setValidWords(words);

        const index = getSeededRandomIndex(words);
        setWordToGuess(words[index]);
      })
      .catch(() => setMessage("⚠️ Failed to load word list."));
  }, []);

  // Handle user guess
  const handleGuess = () => {
    const upperInput = input.toUpperCase();

    if (upperInput.length !== 5) {
      setMessage("❗ Please enter a 5-letter word.");
      return;
    }

    if (!validWords.includes(upperInput)) {
      setMessage("❌ Not a valid English word. Try again.");
      return;
    }

    const newGuesses = [...guesses, upperInput];
    setGuesses(newGuesses);
    setInput("");

    if (upperInput === wordToGuess) {
      setMessage("🎉 Great job! You guessed the word!");
    } else if (newGuesses.length >= 5) {
      setMessage(`😔 Out of tries! The word was ${wordToGuess}.`);
    } else {
      setMessage("");
    }
  };

  // Determine letter color for Wordle logic
  const getColor = (letter, index) => {
    if (!wordToGuess) return "absent";
    if (wordToGuess[index] === letter) return "correct";
    if (wordToGuess.includes(letter)) return "present";
    return "absent";
  };

  return (
    <div className="wordle-container">
      {/* Keep the top blue Navbar */}
      <Navbar
        currentPage={currentPage}
        goToHome={goToHome}
        goToLogin={goToLogin}
        goToSignup={goToSignup}
        goToGames={goToGames}
        goToContact={goToContact}
        goTowellness={goTowellness}
        goToBlogs={goToBlogs}
      />

      <h1 className="wordle-logo">Mind Heaven - Wordle</h1>

      <div className="wordle-body">
        <h2 className="game-title">Guess the 5-letter word 💡</h2>
        <p className="game-subtitle">You have 5 tries. Think calm, think clear!</p>

        <div className="wordle-board">
          {guesses.map((guess, idx) => (
            <div key={idx} className="guess-row">
              {guess.split("").map((letter, i) => (
                <span key={i} className={`letter-box ${getColor(letter, i)}`}>
                  {letter}
                </span>
              ))}
            </div>
          ))}
        </div>

        {guesses.length < 5 && message !== "🎉 Great job! You guessed the word!" && (
          <div className="input-section">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleGuess();
              }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            >
              <input
                type="text"
                maxLength={5}
                value={input}
                onChange={(e) => setInput(e.target.value.toUpperCase())}
                placeholder="Enter your guess"
                className="wordle-input"
                autoFocus
              />
              <button type="submit" className="submit-btn-wordle">
                Submit
              </button>
            </form>
          </div>
        )}

        <p className="status-msg">{message}</p>
      </div>
      
    </div>
  );
}

export default WordleGame;
