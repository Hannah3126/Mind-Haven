import React, { useEffect, useRef, useState } from "react";

export default function Chatbot({
  apiBase = "http://localhost:5000",
  open = false,
  onClose = () => {},
  userEmail = "",
}) {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I’m here to listen. How are you feeling today?" },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scroller = useRef(null);

  useEffect(() => {
    if (scroller.current) scroller.current.scrollTop = scroller.current.scrollHeight;
  }, [messages, open]);

  const send = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    // append my message
    const mine = { from: "me", text };
    setMessages((m) => [...m, mine]);

    // seed an empty bot bubble we will "type" into
    const botIndex = messages.length + 1;
    setMessages((m) => [...m, { from: "bot", text: "" }]);
    setInput("");

    try {
      setBusy(true);

      // Try streaming endpoint first
      const res = await fetch(`${apiBase}/chat/stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, user: userEmail }),
      });

      if (!res.body || !window.ReadableStream) {
        // fallback to non-stream
        const r = await fetch(`${apiBase}/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text, user: userEmail }),
        });
        const data = await r.json();
        const reply = data?.reply || "Thanks for sharing. I’m here with you.";
        setMessages((m) => m.map((msg, i) => (i === botIndex ? { ...msg, text: reply } : msg)));
        setBusy(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let done, chunk;
      while (true) {
        ({ value: chunk, done } = await reader.read());
        if (done) break;
        const str = decoder.decode(chunk, { stream: true });
        if (!str) continue;
        setMessages((m) =>
          m.map((msg, i) => (i === botIndex ? { ...msg, text: msg.text + str } : msg))
        );
      }
    } catch {
      setMessages((m) =>
        m.map((msg, i) =>
          i === botIndex
            ? { ...msg, text: "I couldn’t reach the server, but I’m still here to listen." }
            : msg
        )
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <style>{`
        .cb-wrap {
          position: fixed; right: 16px; bottom: 16px; z-index: 70;
          width: 340px; max-width: calc(100vw - 32px);
          transform: translateY(${open ? "0" : "16px"});
          opacity: ${open ? 1 : 0};
          pointer-events: ${open ? "auto" : "none"};
          transition: all .18s ease-in-out;
        }
        .cb-card {
          background: #fff; border: 1px solid #e5e7eb; border-radius: 16px;
          box-shadow: 0 18px 40px rgba(0,0,0,.12); overflow: hidden;
          display: grid; grid-template-rows: auto 1fr auto;
        }
        .cb-top {
          display:flex; align-items:center; justify-content: space-between;
          padding: 10px 12px; background: linear-gradient(90deg,#8EC5FC,#E0C3FC);
          color: #111; font-weight: 800;
        }
        .cb-body {
          height: 320px; overflow: auto; padding: 12px; background: #f8fafc;
        }
        .cb-row { display: flex; margin-bottom: 8px; }
        .cb-me { justify-content: flex-end; }
        .cb-bubble {
          max-width: 78%;
          padding: 8px 12px; border-radius: 12px; font-size: 14px; line-height: 1.4;
          border: 1px solid #e5e7eb; background: #fff; color: #111;
        }
        .cb-bot .cb-bubble { background: #eef2ff; border-color: #dbeafe; }
        .cb-input {
          display:flex; gap:8px; padding:10px; background:#fff; border-top:1px solid #e5e7eb;
        }
        .cb-text {
          flex:1; padding:10px 12px; border:1px solid #e5e7eb; border-radius:10px; outline:none;
        }
        .cb-send {
          padding:10px 14px; border:none; border-radius:10px; cursor:pointer;
          background:${busy ? "#9ca3af" : "linear-gradient(90deg,#8EC5FC,#E0C3FC)"}; color:#111; font-weight:800;
        }
        .cb-close {
          background:#111827; border:none; color:#fff; border-radius: 10px;
          padding: 6px 10px; cursor:pointer; font-weight:700;
        }
      `}</style>

      <div className="cb-wrap" aria-hidden={!open}>
        <div className="cb-card">
          <div className="cb-top">
            <div>Mindheaven Chat</div>
            <button className="cb-close" onClick={onClose}>Close</button>
          </div>

          <div className="cb-body" ref={scroller}>
            {messages.map((m, i) => (
              <div key={i} className={`cb-row ${m.from === "me" ? "cb-me" : "cb-bot"}`}>
                <div className="cb-bubble">{m.text}</div>
              </div>
            ))}
          </div>

          <form className="cb-input" onSubmit={send}>
            <input
              className="cb-text"
              placeholder="Type your message…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={busy}
            />
            <button className="cb-send" type="submit" disabled={busy}>
              {busy ? "…" : "Send"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
