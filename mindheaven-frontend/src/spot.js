import React, { useState } from "react";
import "./spot.css";
import Navbar from "./navbar";
import "./navbar.css";

export default function SpotTheDifference({
  goToHome,
  goToGames,
  goTowellness,
  goToBlogs,
  goToContact,
}) {
  // Hidden difference areas (coordinates & sizes)
  const differences = [
    { top: "30%", left: "45%" },
    { top: "60%", left: "25%" },
    { top: "75%", left: "65%" },
  ];

  const [found, setFound] = useState([]);
  const [message, setMessage] = useState("");

  const handleClick = (index) => {
    if (!found.includes(index)) {
      setFound([...found, index]);
      if (found.length + 1 === differences.length) {
        setMessage("🎉 Great job! You found all the differences!");
      } else {
        setMessage("✅ Good eye! Keep going...");
      }
    }
  };

  return (
    <div className="spot-page">
      <Navbar
        currentPage="spot"
        goToHome={goToHome}
        goToGames={goToGames}
        goTowellness={goTowellness}
        goToBlogs={goToBlogs}
        goToContact={goToContact}
      />

      <section className="spot-banner">
        <h1>Spot the Difference 🕵️‍♀️</h1>
        <p>Find all the differences between the two images below.</p>
      </section>

      <div className="spot-game-container">
        <div className="spot-images">
          <div className="spot-image-wrapper">
            <img src="/SpotLeft.jpg" alt="Left Image" className="spot-image" />
          </div>
          <div className="spot-image-wrapper spot-right">
            <img src="/SpotRight.jpg" alt="Right Image" className="spot-image" />

            {/* Render clickable differences */}
            {differences.map((diff, index) => (
              <div
                key={index}
                className={`spot-difference ${
                  found.includes(index) ? "found" : ""
                }`}
                style={{ top: diff.top, left: diff.left }}
                onClick={() => handleClick(index)}
              ></div>
            ))}
          </div>
        </div>

        <div className="spot-status">
          <p>
            Found {found.length} of {differences.length} differences
          </p>
          <p className="spot-message">{message}</p>
        </div>
      </div>

      <footer className="spot-footer">
        <p>🧠 Keep observing — mindfulness begins with noticing the little things.</p>
      </footer>
    </div>
  );
}
