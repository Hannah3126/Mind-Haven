import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import './navbar.css';
import './MatchingGame.css';

const ALL_ICONS = ['🌿', '🌞', '💧', '🌸', '🍃', '🪷', '🔥', '🌙', '🪻', '🌼', '🍂', '🌊'];

export default function MatchingGame({
  goToHome,
  goToLogin,
  goToSignup,
  goToGames,
  goToContact,
  goToWellness,
  goToBlogs,
  currentPage = "matching",
  userEmail,
  userRole,
  userName
}) {
  const [level, setLevel] = useState('medium');
  const [cards, setCards] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [turns, setTurns] = useState(0);
  const [allMatched, setAllMatched] = useState(false);

  useEffect(() => {
    startNewGame(level);
  }, [level]);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.icon === choiceTwo.icon) {
        setCards(prev =>
          prev.map(card =>
            card.icon === choiceOne.icon ? { ...card, matched: true } : card
          )
        );
        resetTurn();
      } else {
        setTimeout(resetTurn, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    if (cards.length && cards.every(card => card.matched)) {
      setAllMatched(true);
    }
  }, [cards]);

  const handleCardClick = (card) => {
    if (!disabled && card !== choiceOne && !card.matched) {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prev => prev + 1);
    setDisabled(false);
  };

  const startNewGame = (difficulty) => {
    const count = difficulty === 'easy' ? 3 : difficulty === 'hard' ? 9 : 6;
    const selectedIcons = ALL_ICONS.slice(0, count);
    const duplicated = [...selectedIcons, ...selectedIcons];
    const shuffled = duplicated
      .map(icon => ({ icon, id: Math.random(), matched: false }))
      .sort(() => Math.random() - 0.5);

    setCards(shuffled);
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
    setAllMatched(false);
  };

  return (
    <div className="memory-game-page">
      {/* ---------- NAVBAR ---------- */}
      <Navbar
        currentPage="matching"
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

      {/* ---------- MEMORY GAME ---------- */}
      <div className="memory-container">
        <h2>Memory Match 🧠</h2>

        <div className="level-select">
          <label htmlFor="level">Choose Difficulty: </label>
          <select id="level" value={level} onChange={(e) => setLevel(e.target.value)}>
            <option value="easy">Easy (3 Pairs)</option>
            <option value="medium">Medium (6 Pairs)</option>
            <option value="hard">Hard (9 Pairs)</option>
          </select>
        </div>

        <p>{allMatched ? '🎉 You matched all cards!' : 'Flip cards to find pairs'}</p>

        <div
          className="card-grid"
          style={{
            gridTemplateColumns:
              cards.length <= 6 ? 'repeat(3, 80px)' :
              cards.length <= 12 ? 'repeat(4, 80px)' :
              'repeat(6, 80px)'
          }}
        >
          {cards.map(card => (
            <div
              key={card.id}
              className={`card ${card === choiceOne || card === choiceTwo || card.matched ? 'flipped' : ''}`}
              onClick={() => handleCardClick(card)}
            >
              <div className="front">{card.icon}</div>
              <div className="back">❔</div>
            </div>
          ))}
        </div>

        <button className="restart-btn" onClick={() => startNewGame(level)}>
          Restart
        </button>

        <p>Turns: {turns}</p>
      </div>
    </div>
  );
}
