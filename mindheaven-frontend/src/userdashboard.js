import React, { useState } from "react";
import Chatbot from "./Chatbot";
import { MessageCircle } from "lucide-react";

export default function UserDashboard({ user = {}, onLogout = () => {}, onProfile = () => {} }) {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
      {/* Navbar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          borderBottom: "1px solid #e5e7eb",
          background: "#fff",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <div style={{ fontWeight: 800, fontSize: 20, color: "#4c6ef5" }}>Mindheaven</div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={() => setChatOpen((v) => !v)}
            title="Open Chat"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 12px",
              borderRadius: 10,
              border: "1px solid #e5e7eb",
              background: "#fff",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            <MessageCircle size={18} /> Chat
          </button>

          <button
            onClick={onProfile}
            style={{
              padding: "8px 12px",
              borderRadius: 10,
              background: "#4c6ef5",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            Profile
          </button>

          <button
            onClick={onLogout}
            style={{
              padding: "8px 12px",
              borderRadius: 10,
              background: "#b91c1c",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Dashboard content */}
      <div style={{ padding: "24px 32px" }}>
        <h2 style={{ marginBottom: 16 }}>Welcome, {user?.email || "User"} 👋</h2>
        <p style={{ color: "#475569", maxWidth: 640 }}>
          This is your personalized dashboard. You can view your profile, connect with the community,
          explore wellness tools, or chat with the AI companion anytime using the chat icon below.
        </p>
      </div>

      {/* Floating Chat */}
      <Chatbot
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        userEmail={user?.email || ""}
        apiBase="http://localhost:5000"
      />
    </div>
  );
}
