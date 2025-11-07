import React from "react";
import "./AchievementPopup.css";
import { X } from "lucide-react";

export default function AchievementPopup({ data, onClose }) {
  return (
    <div className="achievement-overlay" onClick={onClose}>
      <div
        className="achievement-popup"
        onClick={(e) => e.stopPropagation()} // prevents closing when clicking inside
      >
        <button className="popup-close-btn" onClick={onClose}>
          <X size={22} />
        </button>

        <h2 className="achievement-title">🏆 Personal Achievements</h2>
        <p className="achievement-sub">Your journey to a calmer mind is growing 🌱</p>

        <div className="achievement-stats">
          <div className="stat-box">
            <span className="stat-value">{data.gamesPlayedToday}</span>
            <span className="stat-label">Games Played Today</span>
          </div>
          <div className="stat-box">
            <span className="stat-value">{data.wordleStreak}</span>
            <span className="stat-label">Wordle Streak</span>
          </div>
        </div>

        <h3 className="badge-heading">✨ Earned Badges</h3>

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
      </div>
    </div>
  );
}