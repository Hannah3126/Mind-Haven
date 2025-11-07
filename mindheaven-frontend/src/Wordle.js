import React, { useState, useEffect } from "react";
import "./Wordle.css";
import Navbar from "./navbar";

function WordleGame({
  goToHome,
  goToLogin,
  goToSignup,
  goToGames,
  goToContact,
  goToWellness,
  goToBlogs,
  currentPage,
  userEmail,
  userName,
  userRole
}) {
  // ✅ Logged-in user ID
  const userId = parseInt(localStorage.getItem("user_id"));

  // ✅ Keys unique to each user BEFORE using them
  const streakKey = `wordle_streak_${userId}`;
  const dayKey = `wordle_last_day_${userId}`;

  // ✅ Streak + lastPlayed loaded per-user
  const [streak, setStreak] = useState(
    parseInt(localStorage.getItem(streakKey) || "0")
  );
  const [lastPlayedDay, setLastPlayedDay] = useState(
    localStorage.getItem(dayKey) || ""
  );

  const [guesses, setGuesses] = useState([]);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [validWords, setValidWords] = useState([]);
  const [wordToGuess, setWordToGuess] = useState("");

  // ✅ Deterministic daily word RNG
  const mulberry32 = (a) => {
    return function () {
      let t = (a += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };

  const getSeededRandomIndex = (wordList) => {
    const today = new Date();
    const seed =
      today.getFullYear() * 10000 +
      (today.getMonth() + 1) * 100 +
      today.getDate();
    const rng = mulberry32(seed);
    return Math.floor(rng() * wordList.length);
  };

  // ✅ Load valid words + today’s word
  useEffect(() => {
    fetch("/valid-wordle-words.txt")
      .then((res) => res.text())
      .then((text) => {
        const words = text
          .split("\n")
          .map((w) => w.trim().toUpperCase())
          .filter((w) => w.length === 5);

        setValidWords(words);
        const idx = getSeededRandomIndex(words);
        setWordToGuess(words[idx]);
      })
      .catch(() => setMessage("⚠️ Failed to load word list."));
  }, []);

  // ✅ If new day, allow play again
  useEffect(() => {
    const today = new Date().toDateString();
    if (lastPlayedDay !== today) {
      setLastPlayedDay(today);
      localStorage.setItem(dayKey, today);
    }
  }, [lastPlayedDay, dayKey]);

  // ✅ Handle guess logic
  const handleGuess = () => {
    const today = new Date().toDateString();
  
    // ✅ BLOCK IF the user already finished today's game (win or lose)
    const alreadyFinishedToday =
      lastPlayedDay === today &&
      (localStorage.getItem(streakKey) !== null); // If streakKey exists for today, game was already counted
  
    if (alreadyFinishedToday && guesses.length === 0) {
      setMessage("✅ You've already played today's Wordle!");
      return;
    }
  
    const guess = input.toUpperCase();
  
    if (guess.length !== 5) {
      setMessage("❗ Enter a 5-letter word");
      return;
    }
    if (!validWords.includes(guess)) {
      setMessage("❌ Not a valid English word");
      return;
    }
  
    const newGuesses = [...guesses, guess];
    setGuesses(newGuesses);
    setInput("");
  
    // ✅ WIN
    if (guess === wordToGuess) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      localStorage.setItem(streakKey, newStreak);
      localStorage.setItem(dayKey, today);
  
      setMessage("🎉 You got it!");
  
      fetch("http://localhost:5050/api/game/wordle/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, won: true, streak: newStreak })
      });
  
      return;
    }
  
    // ❌ LOSS (out of tries)
    if (newGuesses.length >= 5) {
      setMessage(`😔 Out of tries. The word was ${wordToGuess}`);
  
      setStreak(0);
      localStorage.setItem(streakKey, 0);
      localStorage.setItem(dayKey, today);
  
      fetch("http://localhost:5050/api/game/wordle/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, won: false, streak: 0 })
      });
  
      return;
    }
  
    setMessage("");
  };

  const getColor = (letter, index) => {
    if (!wordToGuess) return "absent";
    if (wordToGuess[index] === letter) return "correct";
    if (wordToGuess.includes(letter)) return "present";
    return "absent";
  };

  return (
    <div className="wordle-container">
      <Navbar
        currentPage="wordle"
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

      <h1 className="wordle-logo">Mind Heaven - Wordle</h1>

      <div className="wordle-body">
        <h2 className="game-title">Guess the 5-letter word 💡</h2>

        <p style={{
          fontWeight: "bold",
          color: "white",
          background: "#4c6ef5",
          padding: "6px 12px",
          borderRadius: "20px",
          display: "inline-block",
          fontSize: "14px",
          marginBottom: "8px"
        }}>
          🔥 Streak: {streak} day{streak !== 1 && "s"}
        </p>

        <div className="wordle-board">
          {guesses.map((g, row) => (
            <div key={row} className="guess-row">
              {g.split("").map((letter, i) => (
                <span key={i} className={`letter-box ${getColor(letter, i)}`}>
                  {letter}
                </span>
              ))}
            </div>
          ))}
        </div>

        {guesses.length < 5 && !message.includes("🎉") && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleGuess();
              
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%"
            }}
          >
            <input
              type="text"
              maxLength={5}
              value={input}
              onChange={(e) => setInput(e.target.value.toUpperCase())}
              placeholder="Enter guess"
              className="wordle-input"
              autoFocus
            />
            <button className="submit-btn-wordle">Submit</button>
          </form>
        )}

        <p className="status-msg">{message}</p>
      </div>
    </div>
  );
}

export default WordleGame;