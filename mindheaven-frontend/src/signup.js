import React, { useState } from "react";
import "./signup.css";
import { Brain, ChevronRight } from "lucide-react";

function Signup({ goToLogin, goToHome }) {
  const [step, setStep] = useState(1);
  const [fade, setFade] = useState(true);

  const nextStep = () => {
    setFade(false);
    setTimeout(() => {
      setStep(step + 1);
      setFade(true);
    }, 300);
  };

  const prevStep = () => {
    setFade(false);
    setTimeout(() => {
      setStep(step - 1);
      setFade(true);
    }, 300);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mood: "",
    reason: "",
    wantsTherapy: "",
    supportAreas: [],
    notesForTherapist: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        supportAreas: checked
          ? [...prev.supportAreas, value]
          : prev.supportAreas.filter((a) => a !== value),
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (data.success) {
        alert("🎉 Account created successfully!");
        goToLogin();
      } else {
        alert("⚠️ " + data.message);
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("Server error — please try again.");
    }
  };

  return (
    <div className="signup-page">
      <nav className="navbar">
        <div className="logo" onClick={goToHome}>Mind Heaven</div>
        <ul className="nav-links">
          <li><button onClick={goToHome}>Home</button></li>
        </ul>
      </nav>

      <div className="tracking-container fade-wrapper">
        
        <div className="form-header">
          <div className="feature-icon">
            <Brain size={48} color="#38bdf8" strokeWidth={1.5} />
          </div>
          <h2>
            {step === 1 && "Create Your Account"}
            {step === 2 && "How Are You Feeling?"}
            {step === 3 && "Personalize Therapy Support (Optional)"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className={fade ? "fade-in" : "fade-out"}>

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <div className="form-group">
                <label>Name (optional)</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input required type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input required type="password" name="password" placeholder="Create a password" value={formData.password} onChange={handleChange} />
              </div>

              <button type="button" className="sign-next-btn" onClick={nextStep}>
                Next <ChevronRight size={18} />
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div className="form-group">
                <label>How are you feeling today?</label>
                <select name="mood" value={formData.mood} onChange={handleChange}>
                  <option value="">Choose one</option>
                  <option value="Calm 🙂">Calm 🙂</option>
                  <option value="Stressed 😣">Stressed 😣</option>
                  <option value="Overwhelmed 😔">Overwhelmed 😔</option>
                  <option value="Hopeful 🌱">Hopeful 🌱</option>
                  <option value="Just exploring 👀">Just exploring 👀</option>
                </select>
              </div>

              <div className="form-group">
                <label>What brings you to Mind Heaven?</label>
                <select name="reason" value={formData.reason} onChange={handleChange}>
                  <option value="">Select one</option>
                  <option value="Stress relief">Stress relief</option>
                  <option value="Improve mood">Improve mood</option>
                  <option value="Build routines">Build routines</option>
                  <option value="CBT & self-growth">CBT & self-growth</option>
                  <option value="Therapy support">Therapy support</option>
                </select>
              </div>

              <div className="step-nav">
                <button type="button" className="sign-back-btn" onClick={prevStep}>Back</button>
                <button type="button" className="sign-next-btn" onClick={nextStep}>
                  Next <ChevronRight size={18}/>
                </button>
              </div>
            </>
          )}
          {/* STEP 3 */}
          {step === 3 && (
            <>
              <div className="form-group">
                <label>Would you like help connecting to a therapist?</label>
                <select name="wantsTherapy" value={formData.wantsTherapy} onChange={handleChange}>
                  <option value="">Choose one</option>
                  <option value="Yes">Yes</option>
                  <option value="Not right now">Not right now</option>
                </select>
              </div>

              {formData.wantsTherapy === "Yes" && (
                <>
                  <label>Areas you want support with:</label>

                  <div className="checkbox-list">
                    {["Stress", "Anxiety", "Motivation", "Relationships", "Low mood", "Self-confidence", "Sleep"].map(area => (
                      <label key={area}>
                        <input type="checkbox" value={area} checked={formData.supportAreas.includes(area)} onChange={handleChange} /> {area}
                      </label>
                    ))}
                  </div>

                  <div className="form-group">
                    <label>Anything you'd like your therapist to know?</label>
                    <textarea name="notesForTherapist" value={formData.notesForTherapist} onChange={handleChange} placeholder="Optional message..." />
                  </div>
                </>
              )}

              <div className="step-nav">
                <button type="button" className="sign-back-btn" onClick={prevStep}>Back</button>
                <button type="submit" className="submit-btn">Finish & Create Account</button>
              </div>
            </>
          )}
        </form>

        <p className="login-redirect">
          Already have an account? <button className="link-btn" onClick={goToLogin}>Login</button>
        </p>
      </div>
    </div>
  );
}

export default Signup;