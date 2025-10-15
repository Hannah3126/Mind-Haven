require("dotenv").config();
const OpenAI = require("openai");

// Default model (you can override in .env)
const MODEL = process.env.MODEL || "gpt-4o-mini";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// server.js
const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ---------- SQLite setup ----------
const db = new sqlite3.Database("./users.db", (err) => {
  if (err) console.error(err.message);
  console.log("Connected to SQLite DB");
});
db.run("PRAGMA foreign_keys = ON");

db.run(
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT
  )`
);

db.run(
  `CREATE TABLE IF NOT EXISTS user_info (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER UNIQUE,
    full_name TEXT,
    address TEXT,
    phone TEXT,
    photo TEXT,
    symptoms TEXT,
    episode_length TEXT,
    chronic_issues TEXT,
    specify_issues TEXT,
    medication TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
  )`
);

// seed users
db.get("SELECT 1 FROM users WHERE email = ?", ["admin@mindheaven.com"], (err, row) => {
  if (!row) db.run("INSERT INTO users (email, password, role) VALUES (?, ?, ?)", ["admin@mindheaven.com", "admin123", "admin"]);
});
db.get("SELECT 1 FROM users WHERE email = ?", ["user@mindheaven.com"], (err, row) => {
  if (!row) db.run("INSERT INTO users (email, password, role) VALUES (?, ?, ?)", ["user@mindheaven.com", "user123", "user"]);
});

const ok = (res, message, extra = {}) => res.json({ success: true, message, ...extra });
const fail = (res, message) => res.json({ success: false, message });

// ---------- Auth ----------
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return fail(res, "Email and password required");
  db.get("SELECT * FROM users WHERE email = ?", [email], (e, row) => {
    if (e) return fail(res, "Error occurred");
    if (!row || row.password !== password) return fail(res, "Invalid email or password");
    res.json({ success: true, message: "Login successful", role: row.role, userId: row.id, email: row.email });
  });
});

app.post("/signup", (req, res) => {
  const {
    email,
    password,
    full_name = null,
    address = null,
    phone = null,
    photo = null,
    symptoms = [],
    episodeLength = "",
    chronicIssues = "",
    specifyIssues = "",
    medication = ""
  } = req.body;

  if (!email || !password) return fail(res, "Email and password required");

  db.get("SELECT 1 FROM users WHERE email = ?", [email], (e, exists) => {
    if (exists) return fail(res, "User already exists");

    db.run("INSERT INTO users (email, password, role) VALUES (?, ?, ?)", [email, password, "user"], function (e2) {
      if (e2) return fail(res, "Error creating user");
      const userId = this.lastID;

      const symptomsStr = Array.isArray(symptoms) ? JSON.stringify(symptoms) : symptoms;
      db.run(
        `INSERT INTO user_info (user_id, full_name, address, phone, photo, symptoms, episode_length, chronic_issues, specify_issues, medication)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [userId, full_name, address, phone, photo, symptomsStr, episodeLength, chronicIssues, specifyIssues, medication],
        (e3) => {
          if (e3) return fail(res, "User created but error saving profile");
          ok(res, "Account created successfully", { userId });
        }
      );
    });
  });
});

// ---------- Admin ops ----------
app.get("/users", (req, res) => {
  db.all("SELECT id, email, role FROM users ORDER BY id ASC", [], (e, rows) => {
    if (e) return res.json([]);
    res.json(rows);
  });
});
app.put("/promote/:id", (req, res) => {
  db.run("UPDATE users SET role = 'admin' WHERE id = ?", [req.params.id], function (e) {
    if (e) return fail(res, "Error promoting user");
    if (this.changes === 0) return fail(res, "User not found");
    ok(res, "User promoted to admin");
  });
});
app.delete("/delete/:id", (req, res) => {
  db.run("DELETE FROM users WHERE id = ?", [req.params.id], function (e) {
    if (e) return fail(res, "Error deleting user");
    if (this.changes === 0) return fail(res, "User not found");
    ok(res, "User deleted successfully");
  });
});

// ---------- Profile ----------
app.get("/profile/:userId", (req, res) => {
  const userId = req.params.userId;
  db.get("SELECT id, email, role FROM users WHERE id = ?", [userId], (e, user) => {
    if (e || !user) return fail(res, "User not found");
    db.get(
      "SELECT full_name, address, phone, photo, symptoms, episode_length, chronic_issues, specify_issues, medication FROM user_info WHERE user_id = ?",
      [userId],
      (e2, profile) => {
        if (e2) return fail(res, "Error fetching profile");
        const parsed = profile && profile.symptoms ? { ...profile, symptoms: JSON.parse(profile.symptoms || "[]") } : profile || {};
        res.json({ success: true, user, profile: parsed });
      }
    );
  });
});
app.post("/profile/:userId", (req, res) => {
  const userId = req.params.userId;
  const {
    full_name = null,
    address = null,
    phone = null,
    photo = null,
    symptoms = [],
    episodeLength = "",
    chronicIssues = "",
    specifyIssues = "",
    medication = ""
  } = req.body;

  const symptomsStr = Array.isArray(symptoms) ? JSON.stringify(symptoms) : symptoms;

  db.run(
    `INSERT INTO user_info (user_id, full_name, address, phone, photo, symptoms, episode_length, chronic_issues, specify_issues, medication)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(user_id) DO UPDATE SET
       full_name = excluded.full_name,
       address = excluded.address,
       phone = excluded.phone,
       photo = excluded.photo,
       symptoms = excluded.symptoms,
       episode_length = excluded.episode_length,
       chronic_issues = excluded.chronic_issues,
       specify_issues = excluded.specify_issues,
       medication = excluded.medication`,
    [userId, full_name, address, phone, photo, symptomsStr, episodeLength, chronicIssues, specifyIssues, medication],
    function (e) {
      if (e) return fail(res, "Error saving profile");
      ok(res, "Profile saved successfully");
    }
  );
});

// ---------- Chat (non-stream fallback) ----------
// ---------- Chat (non-stream) ----------
app.post("/chat", async (req, res) => {
  const { message = "", user = "" } = req.body || {};
  try {
    const system = `You are a supportive, non-clinical mental health companion.
Keep replies short (80–120 words), empathetic, and include one actionable tip.
Avoid diagnosis or medical advice.`;

    const out = await openai.chat.completions.create({
      model: MODEL, // 👈 uses gpt-4o-mini
      messages: [
        { role: "system", content: system },
        { role: "user", content: message || "Hello" },
      ],
      max_tokens: 140,
      temperature: 0.7,
    });

    const text = out.choices?.[0]?.message?.content || "I'm here to listen.";
    res.json({ reply: text });
  } catch (err) {
    console.error("Chat error:", err.status || "", err.message);
    if (err.response?.data) console.error("Details:", err.response.data);
    res.json({ reply: "I couldn’t reach the AI service right now, but I’m here to listen." });
  }
});


// ---------- Chat (STREAM) ----------
// ---------- Chat (STREAM) ----------
app.post("/chat/stream", async (req, res) => {
  const { message = "" } = req.body || {};

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Transfer-Encoding", "chunked");
  res.setHeader("Cache-Control", "no-cache");

  const system = `You are a supportive, non-clinical mental health companion.
Keep replies short (80–120 words), empathetic, and include one actionable tip.
Avoid diagnosis or medical advice.`;

  try {
    const stream = await openai.chat.completions.create({
      model: MODEL, // 👈 uses gpt-4o-mini
      stream: true,
      messages: [
        { role: "system", content: system },
        { role: "user", content: message || "Hello" },
      ],
      max_tokens: 140,
      temperature: 0.7,
    });

    for await (const chunk of stream) {
      const delta = chunk?.choices?.[0]?.delta?.content || "";
      if (delta) res.write(delta);
    }
    res.end();
  } catch (err) {
    console.error("stream error details:", err.status || "", err.message);
    if (err.response?.data) console.error("body:", err.response.data);
    try { res.status(502).end(); } catch {}
  }
});


// --- legacy aliases if your frontend still calls /api/... ---
app.post("/api/login", (req, res) => app._router.handle(req, res, () => {}, "/login"));
app.post("/api/signup", (req, res) => app._router.handle(req, res, () => {}, "/signup"));
app.get("/api/users", (req, res) => app._router.handle(req, res, () => {}, "/users"));
app.put("/api/users/:id/promote", (req, res) => app._router.handle(req, res, () => {}, `/promote/${req.params.id}`));
app.delete("/api/users/:id", (req, res) => app._router.handle(req, res, () => {}, `/delete/${req.params.id}`));
app.get("/api/profile/:userId", (req, res) => app._router.handle(req, res, () => {}, `/profile/${req.params.userId}`));
app.post("/api/profile/:userId", (req, res) => app._router.handle(req, res, () => {}, `/profile/${req.params.userId}`));

app.get("/healthz", (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
