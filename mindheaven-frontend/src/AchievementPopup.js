import React from "react";
import "./AchievementPopup.css";

export default function AchievementPopup({ data, onClose }) {
  return (
    <div className="achievement-overlay">
      <div className="achievement-popup">
        <h2 className="achievement-title">🏆 Your Achievements</h2>

        <div className="achievement-stats">
          <div className="stat-box">
            <span className="stat-value">{data.gamesPlayedToday}</span>
            <span className="stat-label">Games Today</span>
          </div>
          <div className="stat-box">
            <span className="stat-value">{data.wordleStreak}</span>
            <span className="stat-label">Wordle Streak</span>
          </div>
        </div>

        <h3 className="badge-heading">Badges</h3>

        <div className="badge-grid">
          {data.badges && data.badges.length > 0 ? (
            data.badges.map((badge) => (
              <div key={badge.id} className="badge-card">
                <span className="badge-icon">{badge.icon}</span>
                <span className="badge-name">{badge.name}</span>
              </div>
            ))
          ) : (
            <p className="no-badges">No badges earned yet — start playing!</p>
          )}
        </div>

        <button className="close-btn" onClick={onClose}>
          ✖ Close
        </button>
      </div>
    </div>
  );
}