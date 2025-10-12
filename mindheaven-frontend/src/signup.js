import React, { useState } from "react";
import "./signup.css";
import { Brain } from "lucide-react";

function Signup({ goToLogin, goToHome }) {
  const [formData, setFormData] = useState({
    symptoms: [],
    episodeLength: "",
    chronicIssues: "",
    specifyIssues: "",
    medication: "",
    email: "",
    password: "",
  });

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      symptoms: checked
        ? [...prev.symptoms, value]
        : prev.symptoms.filter((symptom) => symptom !== value),
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted successfully!");
    goToLogin();
  };

  return (
    <div className="signup-page">
      {/* ✅ Navbar remains unchanged */}
      <nav className="navbar">
        <div className="logo" onClick={goToHome}>
          Mind Heaven
        </div>
        <ul className="nav-links">
          <li>
            <a href="#" onClick={goToHome}>
              Home
            </a>
          </li>
        </ul>
      </nav>

      {/* ✅ Mental Health Tracking Form Section */}
      <div className="tracking-container">
        <div className="form-header">
          <div className="feature-icon">
                        <Brain size={48} color="#38bdf8" strokeWidth={1.5} />
                      </div>
          <h2>Mental Health Tracking Form</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <p className="form-question">
            Have you encountered any of the following symptoms in the past month?
          </p>

          <div className="symptom-grid">
            {[
              "Insanity",
              "Craziness",
              "Mental disorder",
              "Delusions",
              "Schizophrenia",
              "Depression",
              "Crack-up",
              "Other",
            ].map((symptom) => (
              <label key={symptom} className="checkbox-item">
                <input
                  type="checkbox"
                  value={symptom}
                  checked={formData.symptoms.includes(symptom)}
                  onChange={handleCheckboxChange}
                />
                {symptom}
              </label>
            ))}
          </div>

          <div className="form-group">
            <label>
              How long did each episode last?<span className="required">*</span>
            </label>
            <small>minutes</small>
            <input
              type="text"
              name="episodeLength"
              value={formData.episodeLength}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Do you have any chronic mental issues?</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="chronicIssues"
                  value="Yes"
                  checked={formData.chronicIssues === "Yes"}
                  onChange={handleChange}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="chronicIssues"
                  value="No"
                  checked={formData.chronicIssues === "No"}
                  onChange={handleChange}
                />
                No
              </label>
            </div>
          </div>

          {formData.chronicIssues === "Yes" && (
            <div className="form-group">
              <label>If yes, please specify:</label>
              <textarea
                name="specifyIssues"
                value={formData.specifyIssues}
                onChange={handleChange}
              ></textarea>
            </div>
          )}

          <div className="form-group">
            <label>
              Do you take any medication?<span className="required">*</span>
            </label>
            <textarea
              name="medication"
              value={formData.medication}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <hr className="form-divider" />

          {/* ✅ Email & Password fields at the bottom */}
          <div className="form-group email-section">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Submit & Sign Up
          </button>

          <p className="login-redirect">
            Already have an account?{" "}
            <button className="link-btn" onClick={goToLogin}>
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;


