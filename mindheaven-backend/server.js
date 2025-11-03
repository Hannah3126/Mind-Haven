console.log("API KEY:", process.env.OPENAI_API_KEY); // optional debug

import express from "express";
import bodyParser from "body-parser";
import sqlite3 from "sqlite3";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { OpenAI } from "openai";
import fetch from "node-fetch"; // Needed for older Node versions


console.log("API KEY:", process.env.OPENAI_API_KEY);

// Fix fetch support for OpenAI SDK
if (!globalThis.fetch) globalThis.fetch = fetch;

dotenv.config();

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

// Connect to SQLite
const db = new sqlite3.Database("./users.db", (err) => {
  if (err) console.error(err.message);
  console.log("Connected to SQLite DB");
});

// Create table if missing
db.run(
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT,
    password TEXT,
    role TEXT
  )`
);

// Insert demo accounts if missing
db.get("SELECT * FROM users WHERE email = ?", ["admin@mindheaven.com"], (err, row) => {
  if (!row) {
    db.run("INSERT INTO users (email, password, role) VALUES (?, ?, ?)", [
      "admin@mindheaven.com",
      "admin123",
      "admin"
    ]);
  }
});

db.get("SELECT * FROM users WHERE email = ?", ["user@mindheaven.com"], (err, row) => {
  if (!row) {
    db.run("INSERT INTO users (email, password, role) VALUES (?, ?, ?)", [
      "user@mindheaven.com",
      "user123",
      "user"
    ]);
  }
});

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// LOGIN endpoint
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
    if (err) return res.json({ success: false, message: "Error occurred" });
    if (!row || row.password !== password)
      return res.json({ success: false, message: "Invalid email or password" });

    res.json({
      success: true,
      message: "Login successful",
      role: row.role
    });
  });
});

// SIGNUP endpoint
app.post("/signup", (req, res) => {
  const { email, password } = req.body;

  db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
    if (row) return res.json({ success: false, message: "User already exists" });

    db.run("INSERT INTO users (email, password, role) VALUES (?, ?, ?)", [email, password, "user"], function (err) {
      if (err) return res.json({ success: false, message: "Error creating user" });
      res.json({ success: true, message: "Account created successfully" });
    });
  });
});

// CBT Reframing Endpoint
app.post("/api/reframe", async (req, res) => {
  const { thought } = req.body;
  if (!thought) return res.status(400).json({ error: "Thought is required" });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a CBT therapist helping users reframe negative thoughts." },
        { role: "user", content: `Reframe this negative thought: "${thought}"` }
      ],
      temperature: 0.7,
      max_tokens: 100
    });

    const reframed = completion.choices[0].message.content.trim();
    res.json({ reframed });
  } catch (error) {
    console.error("OpenAI API error:", error.message);
    res.status(500).json({ error: "Failed to generate reframed thought." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});