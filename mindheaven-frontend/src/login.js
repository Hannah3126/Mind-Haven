import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Login({ onSuccess = () => {}, onBack = () => {} }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    try {
      setBusy(true);
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data && data.success) {
        onSuccess({ email: data.email || email, role: data.role, userId: data.userId });
      } else {
        alert(data?.message || "Invalid email or password");
      }
    } catch (err) {
      alert("Unable to reach server");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #8EC5FC 0%, #E0C3FC 100%)",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          width: "360px",
          background: "#fff",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          padding: "32px 28px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "28px", fontWeight: "800", marginBottom: "6px", color: "#4c6ef5" }}>
          Mindheaven
        </h1>
        <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "24px" }}>
          Welcome back! Please log in to continue.
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          {/* Email */}
          <div style={{ textAlign: "left" }}>
            <label style={{ fontSize: "14px", fontWeight: "600", color: "#374151" }}>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "10px 12px",
                borderRadius: "10px",
                border: "1px solid #d1d5db",
                marginTop: "6px",
                outline: "none",
                fontSize: "14px",
              }}
            />
          </div>

          {/* Password with eye icon */}
          <div style={{ textAlign: "left", position: "relative" }}>
            <label style={{ fontSize: "14px", fontWeight: "600", color: "#374151" }}>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "10px 36px 10px 12px", // space for the eye icon
                borderRadius: "10px",
                border: "1px solid #d1d5db",
                marginTop: "6px",
                outline: "none",
                fontSize: "14px",
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              style={{
                position: "absolute",
                right: "10px",
                top: "34px",
                cursor: "pointer",
                color: "#6b7280",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
                border: "none",
                padding: 0,
                lineHeight: 0,
              }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={busy}
            style={{
              padding: "10px 14px",
              borderRadius: "10px",
              border: "none",
              background: busy
                ? "linear-gradient(90deg, #9ca3af, #d1d5db)"
                : "linear-gradient(90deg, #8EC5FC, #E0C3FC)",
              color: "#111",
              fontWeight: "700",
              cursor: "pointer",
              fontSize: "15px",
              transition: "0.2s ease",
            }}
          >
            {busy ? "Signing in..." : "Login"}
          </button>

          <button
            type="button"
            onClick={onBack}
            style={{
              background: "transparent",
              border: "none",
              color: "#4b5563",
              marginTop: "8px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            ← Back to Home
          </button>
        </form>
      </div>
    </div>
  );
}

