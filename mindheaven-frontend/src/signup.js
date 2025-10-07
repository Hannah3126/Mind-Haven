import React, { useState } from "react";
import "./App.css";

function Signup({ goToLogin, goToHome }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    alert("Account created! You can now log in.");
    goToLogin();
  };

  return (
    <div className="auth-page">
      <nav className="navbar">
        <div className="logo" onClick={goToHome}>
          Mind Heaven
        </div>
        <ul className="nav-links">
          <li><a href="#" onClick={goToHome}>Home</a></li>
        </ul>
      </nav>

      <div className="auth-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary">
            Sign Up
          </button>
        </form>
        <p>
          Already have an account?{" "}
          <button className="link-btn" onClick={goToLogin}>
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default Signup;

