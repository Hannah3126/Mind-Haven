import React, { useState, useEffect } from "react";
import "./Wordle.css";
import Navbar from "./navbar";

function WordleGame({ goToHome, goToLogin, goToSignup, goToGames, goToContact, goToWellness, goToBlogs, userEmail, userName, userRole }) {
  const userId = parseInt(localStorage.getItem("user_id"));
  
  const dayKey = `wordle_last_day_${userId}`;

  const [streak, setStreak] = useState(0);
  const [lastPlayedDay, setLastPlayedDay] = useState(localStorage.getItem(dayKey) || "");
  const [guesses, setGuesses] = useState([]);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [validWords, setValidWords] = useState([]);
  const [wordToGuess, setWordToGuess] = useState("");

  // ✅ Fetch streak from DB on load
  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:5050/api/game/wordle/streak/${userId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStreak(data.streak);
        }
      })
      .catch(err => console.log("Error fetching streak", err));
  }, [userId]);

  // 🎯 Seeded random word of the day
  const mulberry32 = (a) => {
    return function () {
      let t = (a += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };

  const getSeededIndex = (list) => {
    const d = new Date();
    const seed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
    const rng = mulberry32(seed);
    return Math.floor(rng() * list.length);
  };

  // ✅ Load word list and set today's word
  useEffect(() => {
    fetch("/valid-wordle-words.txt")
      .then(r => r.text())
      .then(text => {
        const words = text
          .split("\n")
          .map(w => w.trim().toUpperCase())
          .filter(w => w.length === 5);

        setValidWords(words);
        setWordToGuess(words[getSeededIndex(words)]);
      });
  }, []);

  // ✅ Allow playing again on new day
  useEffect(() => {
    const today = new Date().toDateString();
    if (lastPlayedDay !== today) {
      setGuesses([]);
      setMessage("");

      setLastPlayedDay(today);
      localStorage.setItem(dayKey, today);
    }
  }, [lastPlayedDay, dayKey]);

  const handleGuess = () => {
    const today = new Date().toDateString();

    // ❌ Block if user already finished today's game
    if (lastPlayedDay === today && guesses.length === 0) {
      setMessage("✅ You've already played today!");
      return;
    }

    const guess = input.toUpperCase();
    if (guess.length !== 5) return setMessage("❗ Enter a 5-letter word");
    if (!validWords.includes(guess)) return setMessage("❌ Word not in list");

    const newGuesses = [...guesses, guess];
    setGuesses(newGuesses);
    setInput("");

    // 🎉 WIN
    if (guess === wordToGuess) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setLastPlayedDay(today);
      localStorage.setItem(dayKey, today);

      setMessage("🎉 You guessed it!");

      fetch("http://localhost:5050/api/game/wordle/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, won: true, streak: newStreak })
      });

      return;
    }

    // ❌ LOSS — no tries left
    if (newGuesses.length >= 5) {
      setMessage(`😔 Out of tries. Word was ${wordToGuess}`);

      setStreak(0);
      setLastPlayedDay(today);
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

  const getColor = (letter, idx) => {
    if (!wordToGuess) return "absent";
    if (wordToGuess[idx] === letter) return "correct";
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