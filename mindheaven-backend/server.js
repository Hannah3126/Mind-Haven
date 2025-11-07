import express from 'express';
import bodyParser from 'body-parser';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import reframeThought from './reframe.js';
import nodemailer from "nodemailer";

const app = express();
const PORT = 5050;

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

// ✅ Wordle Game Stats Table
db.run(
  `CREATE TABLE IF NOT EXISTS wordle_stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    played_on TEXT,
    won INTEGER,
    streak INTEGER
  )`
);

// Email setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "hannahjoshua030@gmail.com",
    pass: "tvng sryz lacv kquc"
  }
});

async function sendAppointmentEmail({ name, email, date, time, notes }) {
  const mailOptions = {
    from: `MindHeaven 💜 <hannahjoshua030@gmail.com>`,
    to: email,
    subject: "Your Appointment is Confirmed ✅",
    html: `
      <h2>Your Mind Heaven Appointment</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
      ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ""}
      <br/>
      <p>We look forward to supporting you 💙</p>
    `
  };

  await transporter.sendMail(mailOptions);
}


// Login 
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.get("SELECT * FROM users WHERE email = ?", [email], (err, userRow) => {
    if (err) {
      return res.json({ success: false, message: "Error occurred" });
    }
    if (!userRow || userRow.password !== password) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    // ✅ Fetch profile (name, mood, etc.)
    db.get("SELECT * FROM user_profiles WHERE user_id = ?", [userRow.id], (err2, profileRow) => {
      if (err2) {
        console.log("Profile fetch error:", err2);
      }

      return res.json({
        success: true,
        message: "Login successful",
        role: userRow.role,
        userId: userRow.id,
        
        // ✅ Return name from profile table
        name: profileRow?.name || ""
      });
    });
  });
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
          `INSERT INTO user_profiles (user_id, name, mood, reason, wantsTherapy, supportAreas, notesForTherapist) 
          VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [userId, name, mood, reason, wantsTherapy, supportAreasString, notesForTherapist],
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

// Save thought + reframe
app.post('/api/reframe', async (req, res) => {
  try {
    const { thought, userId } = req.body;

    if (!thought || !userId) {
      return res.status(400).json({ error: "Thought and userId required" });
    }

    // Run AI reframe
    const reframed = await reframeThought(thought);

    // Insert into DB
    db.run(
      `INSERT INTO thoughts (user_id, thought, reframed) VALUES (?, ?, ?)`,
      [userId, thought, reframed],
      function (err) {
        if (err) {
          console.error("DB Insert Error:", err);
          return res.status(500).json({ error: "Database error" });
        }

        return res.json({
          success: true,
          thoughtId: this.lastID,
          thought,
          reframed
        });
      }
    );
  } catch (err) {
    console.error("Reframe Error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Create appointment
app.post("/appointments", async (req, res) => {
  const { userId, name, email, phone, date, time, notes } = req.body;

  if (!name || !email || !date || !time) {
    return res.status(400).json({ success: false, message: "name, email, date and time are required" });
  }

  const sql = `
    INSERT INTO appointments (user_id, name, email, phone, date, time, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    userId ?? null,
    String(name).trim(),
    String(email).trim(),
    phone ? String(phone).trim() : null,
    String(date).trim(),
    String(time).trim(),
    notes ? String(notes).trim() : null
  ];

  db.run(sql, params, async function(err) {
    if (err) {
      console.error("Appointment insert error:", err);
      return res.status(500).json({ success: false, message: "Failed to save appointment" });
    }

    try {
      // ✅ Send confirmation email
      await sendAppointmentEmail({ name, email, date, time, notes });
      console.log("✅ Appointment confirmation email sent");
    } catch (emailErr) {
      console.error("❌ Email failed:", emailErr);
    }

    return res.json({ success: true, appointmentId: this.lastID });
  });
});

app.post("/api/getAppointmentsByEmail", async (req, res) => {
  const { email } = req.body;

  try {
    db.all(
      `SELECT * FROM appointments WHERE email = ? ORDER BY date ASC, time ASC`,
      [email],
      (err, rows) => {
        if (err) return res.json({ success: false, error: err.message });

        return res.json({
          success: true,
          appointments: rows
        });
      }
    );
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

app.post("/api/game/wordle/save", (req, res) => {
  const { userId, won, streak } = req.body;

  if (!userId) {
    return res.json({ success: false, message: "User ID required" });
  }

  const today = new Date().toDateString();

  db.run(
    `INSERT INTO wordle_stats (user_id, played_on, won, streak)
     VALUES (?, ?, ?, ?)`,
    [userId, today, won ? 1 : 0, streak],
    (err) => {
      if (err) {
        console.error("DB Error:", err);
        return res.json({ success: false, message: "DB error" });
      }
      return res.json({ success: true });
    }
  );
});

app.post("/api/game/wordle/stats", (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.json({ success: false, message: "User ID required" });
  }

  db.all(
    `SELECT * FROM wordle_stats WHERE user_id = ? ORDER BY id DESC`,
    [userId],
    (err, rows) => {
      if (err) {
        console.error("Fetch error:", err);
        return res.json({ success: false, message: "DB error" });
      }

      const gamesPlayed = rows.length;
      const wins = rows.filter((r) => r.won === 1).length;
      const winRate = gamesPlayed > 0 ? ((wins / gamesPlayed) * 100).toFixed(0) : 0;
      const longestStreak = rows.reduce((max, r) => Math.max(max, r.streak), 0);
      const currentStreak = rows[0]?.streak || 0;

      return res.json({
        success: true,
        gamesPlayed,
        wins,
        winRate,
        longestStreak,
        currentStreak
      });
    }
  );
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

