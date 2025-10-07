import React, { useState } from "react";
import "./App.css";

function Login({ goToSignup, onLogin, goToHome }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Temporary logic (replace with real API call if needed)
    if (email === "admin@mindheaven.com") {
      onLogin("admin", email);
    } else {
      onLogin("user", email);
    }
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
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
            Login
          </button>
        </form>
        <p>
          Don't have an account?{" "}
          <button className="link-btn" onClick={goToSignup}>
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;


