// src/Chatbot.js
import React, { useState } from "react";
import "./Chatbot.css";
import Navbar from "./navbar"; // ⬅️ if your navbar file is named differently, adjust this path

const API_BASE = "http://localhost:5050";

function Chatbot({
  goToHome,
  goToLogin,
  goToSignup,
  goToGames,
  goToContact,
  goToWellness,
  goToBlogs,
  goToAdminDashboard,
  goToProfile,
}) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi, I’m MindHeaven. How are you feeling today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const newMessages = [...messages, { role: "user", content: trimmed }];

    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Backend error response:", res.status, text);
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      const botReply = data.reply || "Sorry, I could not respond right now.";

      setMessages([...newMessages, { role: "assistant", content: botReply }]);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Navbar on top, same as other pages */}
      <Navbar
        currentPage="chatbot"
        goToHome={goToHome}
        goToLogin={goToLogin}
        goToSignup={goToSignup}
        goToGames={goToGames}
        goToContact={goToContact}
        goToWellness={goToWellness}
        goToBlogs={goToBlogs}
        goToAdminDashboard={goToAdminDashboard}
        goToProfile={goToProfile}
      />

      {/* Chat area below navbar */}
      <div className="mh-chat-page">
        <section className="chat-area">
          <div className="mh-chat-card">
            <h1 className="mh-title">MindHeaven Chatbot</h1>
            <p className="mh-disclaimer">
              This chatbot is for general emotional support only and is{" "}
              <strong>not</strong> a substitute for professional mental health
              care. If you are in crisis or feel unsafe, please contact local
              emergency services or a mental health professional.
            </p>

            <div className="mh-chat-window">
              {messages.map((m, idx) => {
                const isUser = m.role === "user";
                return (
                  <div
                    key={idx}
                    className={`mh-message ${
                      isUser ? "mh-user" : "mh-assistant"
                    }`}
                  >
                    <div className="mh-bubble-wrapper">
                      <div className="mh-bubble-label">
                        {isUser ? "You" : "MindHeaven Bot"}
                      </div>
                      <div
                        className={`mh-bubble ${
                          isUser ? "mh-bubble-user" : "mh-bubble-assistant"
                        }`}
                      >
                        {m.content}
                      </div>
                    </div>
                  </div>
                );
              })}

              {loading && (
                <div className="mh-message mh-assistant">
                  <div className="mh-bubble-wrapper">
                    <div className="mh-bubble-label">MindHeaven Bot</div>
                    <div className="mh-bubble mh-bubble-assistant mh-typing">
                      Typing…
                    </div>
                  </div>
                </div>
              )}
            </div>

            {error && <div className="mh-error">{error}</div>}

            <form className="mh-input-row" onSubmit={handleSubmit}>
              <textarea
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type how you're feeling or what’s on your mind..."
              />
              <button type="submit" disabled={loading || !input.trim()}>
                Send
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}

export default Chatbot;
