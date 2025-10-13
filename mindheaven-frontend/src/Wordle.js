import React, { useState } from "react";
import "./Wordle.css";
import { ArrowLeft } from "lucide-react";

const WORD_TO_GUESS = "GRACE";

function WordleGame({ goBack }) {
  const [guesses, setGuesses] = useState([]);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");

  const handleGuess = () => {
    if (input.length !== 5) {
      setMessage("❗ Please enter a 5-letter word.");
      return;
    }

    const upperInput = input.toUpperCase();
    const newGuesses = [...guesses, upperInput];
    setGuesses(newGuesses);
    setInput("");

    if (upperInput === WORD_TO_GUESS) {
      setMessage("🎉 Great job! You guessed the word!");
    } else if (newGuesses.length >= 5) {
      setMessage(`😔 Out of tries! The word was ${WORD_TO_GUESS}.`);
    } else {
      setMessage("");
    }
  };

  const getColor = (letter, index) => {
    if (WORD_TO_GUESS[index] === letter) return "correct";
    if (WORD_TO_GUESS.includes(letter)) return "present";
    return "absent";
  };

  return (
    <div className="wordle-container">
      <nav className="wordle-navbar">
        <button className="back-btn" onClick={goBack}>
          <ArrowLeft size={18} /> Back
        </button>
        <h1 className="wordle-logo">Mind Heaven - Wordle</h1>
      </nav>

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
            <input
              type="text"
              maxLength={5}
              value={input}
              onChange={(e) => setInput(e.target.value.toUpperCase())}
              placeholder="Enter your guess"
              className="wordle-input"
            />
            <button className="submit-btn" onClick={handleGuess}>
              Submit
            </button>
          </div>
        )}

        <p className="status-msg">{message}</p>
      </div>
    </div>
  );
}

export default WordleGame;