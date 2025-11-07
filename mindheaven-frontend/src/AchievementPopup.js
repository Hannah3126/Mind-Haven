import React from "react";
import "./AchievementPopup.css";

export default function AchievementPopup({ data, onClose }) {
  const allBadges = [
    { id: 1, name: "First Game Played", icon: "🎉" },
    { id: 2, name: "Daily Player", icon: "🔥" },
    { id: 3, name: "3-Day Game Streak", icon: "💪" },
    { id: 4, name: "Memory Beginner", icon: "🧠" },
    { id: 5, name: "Memory Master", icon: "👑" },
    { id: 6, name: "Wordle Beginner", icon: "🌱" },
    { id: 7, name: "Wordle Master", icon: "🏆" },
    { id: 8, name: "Speed Thinker", icon: "⚡" },
  ];

  const earnedIds = data.badges?.map(b => b.id) || [];

  return (
    <div className="achievement-overlay" onClick={onClose}>
      <div className="achievement-popup" onClick={(e) => e.stopPropagation()}>
        <h2 className="achievement-title">🎮 Personal Game Achievements</h2>
        <p className="achievement-sub">Training your mind one game at a time 🧠✨</p>

        <div className="achievement-stats">
          <div className="stat-box">
            <span className="stat-value">{data.gamesPlayedToday || 0}</span>
            <span className="stat-label">Games Today</span>
          </div>
          <div className="stat-box">
            <span className="stat-value">{data.totalGamesPlayed || 0}</span>
            <span className="stat-label">Total Games</span>
          </div>
          <div className="stat-box">
            <span className="stat-value">{data.wordleStreak || 0}</span>
            <span className="stat-label">Wordle Streak</span>
          </div>
          <div className="stat-box">
            <span className="stat-value">{data.bestMemoryScore || "-"}</span>
            <span className="stat-label">Best Memory Score</span>
          </div>
        </div>

        <h3 className="badge-heading">✨ Earned Badges</h3>
        <div className="badge-grid">
          {data.badges?.length > 0 ? (
            data.badges.map((badge) => (
              <div key={badge.id} className="badge-card earned">
                <span className="badge-icon">{badge.icon}</span>
                <span className="badge-name">{badge.name}</span>
              </div>
            ))
          ) : (
            <p className="no-badges">Start playing to unlock badges 🌈</p>
          )}
        </div>

        <h3 className="badge-heading">🔒 Locked Badges</h3>
        <div className="badge-grid locked">
          {allBadges
            .filter(b => !earnedIds.includes(b.id))
            .map(badge => (
              <div key={badge.id} className="badge-card locked">
                <span className="badge-icon">{badge.icon}</span>
                <span className="badge-name">{badge.name}</span>
              </div>
            ))}
        </div>

        <button className="close-btn" onClick={onClose}>
          ✖ Close
        </button>
      </div>
    </div>
  );
}