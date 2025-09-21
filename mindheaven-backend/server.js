// =========================
// 1. Imports & Setup
// =========================
const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

// =========================
// 2. Database Setup
// =========================
const db = new sqlite3.Database("./users.db", (err) => {
  if (err) console.error(err.message);
  console.log("Connected to SQLite DB");
});

// Create table if not exists
db.run(
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT,
    password TEXT,
    role TEXT
  )`
);

// Seed demo accounts if they don’t exist
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

// =========================
// 3. Routes
// =========================

// Login validation
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

      // ✅ Login successful
      res.json({
        success: true,
        message: "Login successful",
        role: row.role
      });
    }
  );
});


// Signup (create account)
app.post("/signup", (req, res) => {
  const { email, password } = req.body;

  // Check if user already exists
  db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
    if (row) {
      return res.json({ success: false, message: "User already exists" });
    }

    // New users are always "user"
    db.run(
      "INSERT INTO users (email, password, role) VALUES (?, ?, ?)",
      [email, password, "user"],
      function (err) {
        if (err) {
          return res.json({ success: false, message: "Error creating user" });
        }
        res.json({ success: true, message: "Account created successfully" });
      }
    );
  });
});


// Optional: view all users (for demo/testing)
app.get("/users", (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) {
      return res.json({ message: "Error fetching users" });
    }
    res.json(rows);
  });
});

// =========================
// 4. Start Server
// =========================
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
