import React, { useState } from "react";
import "./App.css";

function Login({ goToSignup, onLogin, goToHome }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5050/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      // ✅ Store user info locally
      localStorage.setItem("user_name", data.name || "");
      localStorage.setItem("user_email", email);
      localStorage.setItem("user_id", String(data.userId || ""));
      localStorage.setItem("user_role", data.role);

      // ✅ Tell the app user is logged in
      onLogin(data.role, email);

      // ✅ Navigate
      goToHome();

    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="auth-page">
      <nav className="navbar">
        <div className="logo" onClick={goToHome}>Mind Heaven</div>
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

          <button type="submit" className="btn-primary">Login</button>
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