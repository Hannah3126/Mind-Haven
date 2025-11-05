import React, { useState } from "react";
import "./Games.css";
import Navbar from "./navbar";
import "./navbar.css";
import "./quiz.css";

const quizQuestions = [
  {
    question: "How do you usually start your day?",
    options: [
      { text: "A calm morning coffee ☕", type: "calm" },
      { text: "Music and energy! 🎶", type: "happy" },
      { text: "Scrolling through my phone 📱", type: "chill" },
      { text: "Exercise or yoga 🧘", type: "motivated" },
    ],
  },
  {
    question: "What makes you feel most relaxed?",
    options: [
      { text: "Listening to nature sounds 🌿", type: "calm" },
      { text: "Dancing around my room 💃", type: "happy" },
      { text: "Watching Netflix 📺", type: "chill" },
      { text: "Finishing a to-do list ✅", type: "motivated" },
    ],
  },
  {
    question: "Pick a color that feels like ‘you’ today:",
    options: [
      { text: "Blue 💙", type: "calm" },
      { text: "Yellow 💛", type: "happy" },
      { text: "Purple 💜", type: "chill" },
      { text: "Red ❤️", type: "motivated" },
    ],
  },
  {
    question: "What would your dream vacation look like?",
    options: [
      { text: "A peaceful mountain cabin 🏔️", type: "calm" },
      { text: "A lively city adventure 🌆", type: "happy" },
      { text: "A beachside hammock 🌴", type: "chill" },
      { text: "A hiking challenge 🥾", type: "motivated" },
    ],
  },
  {
    question: "What’s your go-to comfort activity?",
    options: [
      { text: "Meditating quietly 🧘‍♀️", type: "calm" },
      { text: "Hanging out with friends 😄", type: "happy" },
      { text: "Taking a cozy nap 😴", type: "chill" },
      { text: "Working on a project 💻", type: "motivated" },
    ],
  },
];

const results = {
  calm: {
    title: "☁️ Calm Cloud",
    description:
      "You radiate peace and positivity. You take life one gentle step at a time and remind others to breathe. 🌿",
  },
  happy: {
    title: "🌈 Joyful Sunbeam",
    description:
      "You bring brightness wherever you go! Your energy uplifts others and keeps the vibes high. ☀️",
  },
  chill: {
    title: "🍃 Serene Breeze",
    description:
      "You flow with life, taking it easy and finding joy in the little things. You’re everyone’s calm friend. 🌸",
  },
  motivated: {
    title: "🔥 Motivated Mountain",
    description:
      "You’re unstoppable! You climb higher every day, inspiring others with your focus and drive. ⛰️",
  },
};

export default function FunQuizGame({
  goToHome,
  goToLogin,
  goToSignup,
  goToGames,
  goToContact,
  goToWellness,
  goToBlogs,
  userEmail,
  userName,
  userRole
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (type) => {
    setAnswers([...answers, type]);
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  const calculateResult = () => {
    const counts = answers.reduce((acc, type) => {
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});
    return Object.keys(counts).reduce((a, b) =>
      counts[a] > counts[b] ? a : b
    );
  };

  const resultType = showResult ? calculateResult() : null;
  const result = resultType ? results[resultType] : null;

  return (
    <div className="quiz-page">
            <Navbar
        currentPage="quiz"
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

      <section className="quiz-banner">
        <div className="banner-content">
          <h1>Fun Personality Quiz</h1>
          <p>Find out what your current mood says about you!</p>
        </div>
      </section>

      <section className="quiz-section">
        <div className="quiz-card">
          {!showResult ? (
            <>
              <h2>
                Question {currentQuestion + 1} of {quizQuestions.length}
              </h2>
              <p className="quiz-question">
                {quizQuestions[currentQuestion].question}
              </p>

              <div className="quiz-options">
                {quizQuestions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    className="quiz-option"
                    onClick={() => handleAnswer(option.type)}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <h2>{result.title}</h2>
              <p>{result.description}</p>

              <div className="quiz-buttons">
                <button onClick={handleRestart} className="play-again-btn">
                  Play Again 🔁
                </button>
                
              </div>
            </>
          )}
        </div>
      </section>

      <footer className="footer">
        <div className="footer-bottom">
          <p>© 2025 Mind Heaven | Designed with ♡ to lift your mood.</p>
        </div>
      </footer>
    </div>
  );
}
