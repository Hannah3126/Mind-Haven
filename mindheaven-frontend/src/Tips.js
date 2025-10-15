import React, { useState } from "react";
import "./Tips.css";
import { ArrowLeft } from "lucide-react";

const tipsData = [
  {
    emoji: "🧘‍♀️",
    title: "Try Deep Breathing",
    description: "Inhale for 4, hold for 4, exhale for 4. Just 2 minutes can help calm your nerves.",
    tags: ["#Anxiety", "#Relaxation", "#Breathing"]
  },
  {
    emoji: "💤",
    title: "Respect Your Sleep",
    description: "7–9 hours of rest with no screens 1 hour before bed = a healthier brain.",
    tags: ["#Sleep", "#Recovery"]
  },
  {
    emoji: "🚫📱",
    title: "Limit Doomscrolling",
    description: "Social media breaks reduce anxiety and help improve focus.",
    tags: ["#DigitalDetox", "#Focus", "#Anxiety"]
  },
  {
    emoji: "📝",
    title: "Journal it Out",
    description: "Write your thoughts unfiltered for 5 minutes to release stress.",
    tags: ["#Reflection", "#Emotions", "#Anxiety"]
  },
  {
    emoji: "☀️",
    title: "Get Morning Sun",
    description: "Sunlight helps regulate your mood and sleep cycles naturally.",
    tags: ["#Mood", "#Energy", "#Sleep"]
  },
  {
    emoji: "🌳",
    title: "Go Outside",
    description: "10 minutes in nature can lower cortisol and boost focus.",
    tags: ["#Nature", "#Calm", "#Focus"]
  },
  {
    emoji: "💧",
    title: "Stay Hydrated",
    description: "Dehydration affects your mood more than you think. Keep water near!",
    tags: ["#Hydration", "#Wellness", "#Mood"]
  },
  {
    emoji: "🎧",
    title: "Play a Lo-Fi Track",
    description: "Lo-fi or ambient music helps calm your nervous system and improve focus.",
    tags: ["#Music", "#Calm", "#Focus"]
  },
  {
    emoji: "🤝",
    title: "Talk to a Friend",
    description: "A 10-minute chat with someone you trust can ease emotional weight.",
    tags: ["#Support", "#Connection", "#MentalHealth"]
  },
  {
    emoji: "🏃‍♂️",
    title: "Move Your Body",
    description: "Stretch, walk, or dance — physical movement can lift your mood fast.",
    tags: ["#Exercise", "#Mood", "#Energy"]
  }
];

export default function Tips({ goToHome }) {
  const [search, setSearch] = useState("");

  const filteredTips = tipsData.filter(tip =>
    tip.tags.join(" ").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="tips-page">
      {/* Navbar */}
      <nav className="navbar">
        <button className="back-button" onClick={goToHome}>
          <ArrowLeft size={18} style={{ marginRight: "6px" }} /> Back
        </button>
        <div className="nav-title">Mind Heaven – Wellness Tips</div>
        <div className="spacer" />
      </nav>

      {/* Hero Greeting Section */}
      <div className="hero-greeting">
        <h2>🌞 Read Some Useful Tips to Help You Through</h2>
        <p>
          You’ve arrived at a safe space. Scroll gently, breathe easy, and discover little things 
          that can help you feel more balanced today.
        </p>
      </div>

      {/* Search */}
      <h2 className="tips-heading">🌿 Small Habits, Big Calm</h2>
      <p className="tips-subheading">
        Practical daily tips to help you feel grounded, calm, and recharged.
      </p>

      <input
        type="text"
        className="search-bar"
        placeholder="Search #anxiety, #sleep, #focus..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Tips Grid */}
      <div className="tips-grid">
        {filteredTips.length > 0 ? (
          filteredTips.map((tip, index) => (
            <div className="tip-card" key={index}>
              <div className="emoji">{tip.emoji}</div>
              <h3>{tip.title}</h3>
              <p>{tip.description}</p>
              <div className="tags-container">
                {tip.tags.map((tag, i) => (
                  <span key={i} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No tips found for “{search}”</p>
        )}
      </div>
    </div>
  );
}