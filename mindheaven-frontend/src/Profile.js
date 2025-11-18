// src/profile.js
import React, { useEffect, useState } from "react";
import "./Profile.css";
import Navbar from "./navbar";
import "./navbar.css";

const API_BASE = "http://localhost:5050";

/**
 * Props:
 * - userId: number (from login)
 * - isLoggedIn: boolean
 * - storedName: string (user's name from login/signup)
 * - goToHome: () => void
 * - goToLogin: () => void
 * - goToProfile: () => void   // for navbar welcome text click
 */
function Profile({ userId, userEmail, isLoggedIn, storedName, goToHome, goToLogin, goToProfile,
  goToSignup,
  goToGames,
  goToContact,
  goToWellness,
  goToBlogs,
  goToAdminDashboard, }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mood: "",
    reason: "",
    wantsTherapy: "",
    supportAreas: [],
    notesForTherapist: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Same options as Signup page
  const moodOptions = [
    "Calm 🙂",
    "Stressed 😣",
    "Overwhelmed 😔",
    "Hopeful 🌱",
    "Just exploring 👀",
  ];

  const reasonOptions = [
    "Stress relief",
    "Improve mood",
    "Build routines",
    "CBT & self-growth",
    "Therapy support",
  ];

  const supportAreaOptions = [
    "Stress",
    "Anxiety",
    "Motivation",
    "Relationships",
    "Low mood",
    "Self-confidence",
    "Sleep",
  ];

  const therapyOptions = ["Yes", "Not right now"];

  useEffect(() => {
  if (!userEmail) {
    setError("User not logged in.");
    setLoading(false);
    return;
  }

  const fetchProfile = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5050/api/profile/get", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Could not load profile.");
        setLoading(false);
        return;
      }

      const p = data.profile;
      setFormData({
        name: p.name || "",
        email: p.email || "",
        mood: p.mood || "",
        reason: p.reason || "",
        wantsTherapy: p.wantsTherapy || "",
        supportAreas: Array.isArray(p.supportAreas) ? p.supportAreas : [],
        notesForTherapist: p.notesForTherapist || "",
      });
    } catch (err) {
      console.error("Profile fetch error:", err);
      setError("Could not load profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  fetchProfile();
}, [userEmail]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => {
        const current = prev.supportAreas || [];
        return {
          ...prev,
          supportAreas: checked
            ? [...current, value]
            : current.filter((a) => a !== value),
        };
      });
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 const API_BASE = "http://localhost:5050"; // if you don't already have this at top

const handleSubmit = async (e) => {
  e.preventDefault();
  setSaving(true);
  setError("");
  setMessage("");

  try {
    const res = await fetch(`${API_BASE}/api/profile/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currentEmail: userEmail,      // identity (from login / props)
        email: formData.email,       // new email from the form
        name: formData.name,
        mood: formData.mood,
        reason: formData.reason,
        wantsTherapy: formData.wantsTherapy,
        supportAreas: formData.supportAreas,
        notesForTherapist: formData.notesForTherapist,
      }),
    });

    const data = await res.json();

    if (!data.success) {
      setError(data.message || "Could not save profile.");
    } else {
      setMessage("Profile updated successfully ✔");
      // Optional: you could also update localStorage here if email changed
      // localStorage.setItem("user_email", formData.email);
    }
  } catch (err) {
    console.error("Profile save error:", err);
    setError("Could not save profile. Please try again.");
  } finally {
    setSaving(false);
  }
};

  return (
    <div className="profile">
        <Navbar
        currentPage="Profile"
        goToHome={goToHome}
        goToLogin={goToLogin}
        goToSignup={goToSignup}
        goToGames={goToGames}
        goToContact={goToContact}
        goToWellness={goToWellness}
        goToBlogs={goToBlogs}
        goToAdminDashboard={goToAdminDashboard}
      />
        {/* <div className="logo" onClick={goToHome}>
          Mind Heaven
        </div> */}

        {/* <ul className="nav-links">
          <li>
            <button onClick={goToHome}>Home</button>
          </li>
        </ul> */}

        {/* <div className="nav-buttons">
          {isLoggedIn ? (
            <>
              <span
                className="welcome-text-link"
                onClick={goToProfile}
              >
                Hi, {storedName?.split(" ")[0] || "Friend"} 🌼
              </span>
            </>
          ) : (
            <button className="login-btn" onClick={goToLogin}>
              Login
            </button>
          )}
        </div> */}
      {/* </nav> */}

      {/* ✅ Main profile card, simple like other pages */}
      <div className="profile-card">
        <h2>My Profile</h2>
        <p className="profile-subtitle">
          View and update your account and therapy preferences.
        </p>

        {loading && <p>Loading your details…</p>}

        {!loading && (
          <>
            {error && <div className="profile-error">{error}</div>}
            {message && <div className="profile-message">{message}</div>}

            <form onSubmit={handleSubmit} className="profile-form">
              {/* Basic info */}
              <div className="form-row">
                <div className="form-group">
                  <label>Name (optional)</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Mood & reason */}
              <div className="form-row">
                <div className="form-group">
                  <label>How are you feeling today?</label>
                  <select
                    name="mood"
                    value={formData.mood}
                    onChange={handleChange}
                  >
                    <option value="">Choose one</option>
                    {moodOptions.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>What brings you to Mind Heaven?</label>
                  <select
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                  >
                    <option value="">Select one</option>
                    {reasonOptions.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Therapy preferences */}
              <div className="form-group">
                <label>Would you like help connecting to a therapist?</label>
                <select
                  name="wantsTherapy"
                  value={formData.wantsTherapy}
                  onChange={handleChange}
                >
                  <option value="">Choose one</option>
                  {therapyOptions.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {formData.wantsTherapy === "Yes" && (
                <>
                  <div className="form-group">
                    <label>Areas you want support with:</label>
                    <div className="checkbox-list">
                      {supportAreaOptions.map((area) => (
                        <label key={area}>
                          <input
                            type="checkbox"
                            value={area}
                            checked={formData.supportAreas.includes(area)}
                            onChange={handleChange}
                          />{" "}
                          {area}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Anything you'd like your therapist to know?</label>
                    <textarea
                      name="notesForTherapist"
                      value={formData.notesForTherapist}
                      onChange={handleChange}
                      placeholder="Optional message..."
                      rows={4}
                    />
                  </div>
                </>
              )}

              <div className="profile-actions">
                <button type="submit" disabled={saving}>
                  {saving ? "Saving…" : "Save changes"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
