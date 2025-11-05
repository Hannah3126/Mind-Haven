import express from 'express';
import bodyParser from 'body-parser';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import reframeThought from './reframe.js';

const app = express();
const PORT = 5000;

app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));

app.use(express.json());
app.use(bodyParser.json());

// ✅ Confirm CORS works
app.get('/test', (req, res) => {
  res.send("✅ Test route working with CORS");
});

// Database
const db = new sqlite3.Database("./users.db", (err) => {
  if (err) console.error(err.message);
  console.log("Connected to SQLite DB");
});

// Create table
db.run(
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT,
    password TEXT,
    role TEXT
  )`
);

// demo accounts
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


// Login 
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.get(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, row) => {
      if (err) {
        return res.json({ success: false, message: "Error occurred" });
      }
      if (!row) {
        return res.json({ success: false, message: "Invalid email or password" });
      }
      if (row.password !== password) {
        return res.json({ success: false, message: "Invalid email or password" });
      }

     
      res.json({
        success: true,
        message: "Login successful",
        role: row.role
      });
    }
  );
});


// Signup with onboarding info
app.post("/signup", (req, res) => {
  const { name, email, password, mood, reason, wantsTherapy, supportAreas, notesForTherapist } = req.body;

  // Convert array to JSON string
  const supportAreasString = JSON.stringify(supportAreas || []);

  db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
    if (row) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Create user
    db.run(
      "INSERT INTO users (email, password, role) VALUES (?, ?, ?)",
      [email, password, "user"],
      function (err) {
        if (err) {
          console.log(err);
          return res.json({ success: false, message: "Error creating user" });
        }

        const userId = this.lastID; // Newly created user ID

        // Insert onboarding info
        db.run(
          `INSERT INTO user_profiles (user_id, mood, reason, wantsTherapy, supportAreas, notesForTherapist) 
           VALUES (?, ?, ?, ?, ?, ?)`,
          [userId, mood, reason, wantsTherapy, supportAreasString, notesForTherapist],
          (err2) => {
            if (err2) {
              console.log(err2);
              return res.json({ success: false, message: "Error saving profile data" });
            }

            return res.json({
              success: true,
              message: "Signup successful!",
            });
          }
        );
      }
    );
  });
});

app.get("/test", (req, res) => {
  res.json({ message: "CORS test route working" });
});

app.post('/api/reframe', async (req, res) => {
  try {
    const { thought } = req.body;
    const reframed = await reframeThought(thought);
    res.json({ reframed });
  } catch (err) {
    console.error("Reframe Error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});


// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

