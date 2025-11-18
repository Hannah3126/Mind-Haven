import express from 'express';
import bodyParser from 'body-parser';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import reframeThought from './reframe.js';
import nodemailer from "nodemailer";
import axios from 'axios';


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

// ✅ Get full profile for a given user
app.post("/api/profile/get", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({ success: false, message: "Email required" });
  }

  const sql = `
    SELECT 
      u.id AS userId,
      u.email,
      u.role,
      p.name,
      p.mood,
      p.reason,
      p.wantsTherapy,
      p.supportAreas,
      p.notesForTherapist
    FROM users u
    LEFT JOIN user_profiles p ON u.id = p.user_id
    WHERE u.email = ?
  `;

  db.get(sql, [email], (err, row) => {
    if (err) {
      console.error("Profile fetch error:", err);
      return res.json({ success: false, message: "DB error" });
    }

    if (!row) {
      console.log("No user found for email:", email);
      return res.json({ success: false, message: "User not found" });
    }

    let supportAreas = [];
    try {
      supportAreas = row.supportAreas ? JSON.parse(row.supportAreas) : [];
    } catch (e) {
      supportAreas = [];
    }

    return res.json({
      success: true,
      profile: {
        userId: row.userId,
        email: row.email,
        role: row.role,
        name: row.name || "",
        mood: row.mood || "",
        reason: row.reason || "",
        wantsTherapy: row.wantsTherapy || "",
        supportAreas,
        notesForTherapist: row.notesForTherapist || ""
      }
    });
  });
});

// ✅ Update profile for a given user
app.post("/api/profile/update", (req, res) => {
  const {
    currentEmail,          // logged-in email (identity)
    email,                 // new email from form
    name,
    mood,
    reason,
    wantsTherapy,
    supportAreas,
    notesForTherapist
  } = req.body;

  if (!currentEmail) {
    return res.json({ success: false, message: "Current email required" });
  }

  const supportAreasString = JSON.stringify(supportAreas || []);

  // 1) Find user by current email
  db.get(
    "SELECT * FROM users WHERE email = ?",
    [currentEmail],
    (err, userRow) => {
      if (err) {
        console.error("User lookup error:", err);
        return res.json({ success: false, message: "DB error" });
      }

      if (!userRow) {
        return res.json({ success: false, message: "User not found" });
      }

      const userId = userRow.id;

      // 2) Update users.email (to new email from form)
      db.run(
        "UPDATE users SET email = ? WHERE id = ?",
        [email, userId],
        (err2) => {
          if (err2) {
            console.error("Email update error:", err2);
            return res.json({ success: false, message: "Failed to update email" });
          }

          // 3) Check if profile row exists
          db.get(
            "SELECT * FROM user_profiles WHERE user_id = ?",
            [userId],
            (err3, profileRow) => {
              if (err3) {
                console.error("Profile check error:", err3);
                return res.json({ success: false, message: "DB error" });
              }

              if (!profileRow) {
                // INSERT new profile
                db.run(
                  `INSERT INTO user_profiles 
                    (user_id, name, mood, reason, wantsTherapy, supportAreas, notesForTherapist)
                   VALUES (?, ?, ?, ?, ?, ?, ?)`,
                  [
                    userId,
                    name || "",
                    mood || "",
                    reason || "",
                    wantsTherapy || "",
                    supportAreasString,
                    notesForTherapist || "",
                  ],
                  function (err4) {
                    if (err4) {
                      console.error("Profile insert error:", err4);
                      return res.json({
                        success: false,
                        message: "Failed to save profile",
                      });
                    }

                    return res.json({
                      success: true,
                      message: "Profile created",
                      profile: {
                        userId,
                        email,
                        name,
                        mood,
                        reason,
                        wantsTherapy,
                        supportAreas,
                        notesForTherapist,
                      },
                    });
                  }
                );
              } else {
                // UPDATE existing profile
                db.run(
                  `UPDATE user_profiles
                   SET name = ?, mood = ?, reason = ?, wantsTherapy = ?, supportAreas = ?, notesForTherapist = ?
                   WHERE user_id = ?`,
                  [
                    name || "",
                    mood || "",
                    reason || "",
                    wantsTherapy || "",
                    supportAreasString,
                    notesForTherapist || "",
                    userId,
                  ],
                  function (err5) {
                    if (err5) {
                      console.error("Profile update error:", err5);
                      return res.json({
                        success: false,
                        message: "Failed to update profile",
                      });
                    }

                    return res.json({
                      success: true,
                      message: "Profile updated",
                      profile: {
                        userId,
                        email,
                        name,
                        mood,
                        reason,
                        wantsTherapy,
                        supportAreas,
                        notesForTherapist,
                      },
                    });
                  }
                );
              }
            }
          );
        }
      );
    }
  );
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

app.get("/api/game/wordle/streak/:userId", (req, res) => {
  const { userId } = req.params;

  db.get(
    `SELECT streak FROM wordle_scores WHERE user_id = ? ORDER BY played_on DESC LIMIT 1`,
    [userId],
    (err, row) => {
      if (err) return res.json({ success: false });

      const streak = row ? row.streak : 0;
      res.json({ success: true, streak });
    }
  );
});

// ✅ Allowed tables for admin dashboard
const ADMIN_TABLES = {
  users: "users",
  user_profiles: "user_profiles",
  appointments: "appointments",
  wordle_stats: "wordle_stats",
  thoughts: "thoughts",
  // add/remove table names here as needed
};

// ✅ Get list of admin tables
app.get("/api/admin/tables", (req, res) => {
  const tables = Object.keys(ADMIN_TABLES);
  res.json({ success: true, tables });
});

// ✅ Get all rows for a specific table
app.get("/api/admin/table/:table", (req, res) => {
  const key = req.params.table;
  const tableName = ADMIN_TABLES[key];

  if (!tableName) {
    return res.status(400).json({ success: false, message: "Invalid table" });
  }

  const sql = `SELECT * FROM ${tableName}`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error("Admin table fetch error:", err);
      return res
        .status(500)
        .json({ success: false, message: "DB error loading table" });
    }

    res.json({ success: true, rows });
  });
});

// ✅ Update a single row in a table (by id)
app.post("/api/admin/table/:table/update", (req, res) => {
  const key = req.params.table;
  const tableName = ADMIN_TABLES[key];

  if (!tableName) {
    return res.status(400).json({ success: false, message: "Invalid table" });
  }

  const { row } = req.body;

  if (!row || row.id == null) {
    return res
      .status(400)
      .json({ success: false, message: "Row with id is required" });
  }

  // Build dynamic UPDATE: SET col1 = ?, col2 = ?, ...
  const columns = Object.keys(row).filter((col) => col !== "id");

  if (columns.length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "No columns to update" });
  }

  const setClause = columns.map((col) => `${col} = ?`).join(", ");
  const values = columns.map((col) => row[col]);
  values.push(row.id); // for WHERE id = ?

  const sql = `UPDATE ${tableName} SET ${setClause} WHERE id = ?`;

  db.run(sql, values, function (err) {
    if (err) {
      console.error("Admin row update error:", err);
      return res
        .status(500)
        .json({ success: false, message: "DB error updating row" });
    }

    return res.json({ success: true, message: "Row updated" });
  });
});




//const app = express();

//const PORT = 5000; // fixed port
const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama3.2'; // you said you pulled this

app.use(cors({
  origin: 'http://localhost:3000', // React dev server
}));
app.use(express.json());

// Simple health route to test ports/CORS
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', model: OLLAMA_MODEL });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;

  if (!Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages must be an array' });
  }

  const systemMessage = {
    role: 'system',
    content:
      'You are MindHeaven, a friendly, supportive mental health chatbot. ' +
      'You offer general emotional support, coping ideas, and gentle reflections. ' +
      'You are NOT a doctor or therapist and you never give medical, diagnostic, or emergency advice. ' +
      'If the user sounds like they might hurt themselves or others, encourage them to contact ' +
      'local emergency services, a crisis line, or a mental health professional immediately.',
  };

  try {
    const response = await axios.post(`${OLLAMA_URL}/api/chat`, {
      model: OLLAMA_MODEL,
      stream: false,
      messages: [systemMessage, ...messages],
    });

    const reply = response.data?.message?.content || '';
    return res.json({ reply });
  } catch (err) {
    console.error('Error talking to Ollama:', err.message);
    if (err.response) {
      console.error('Ollama response data:', err.response.data);
    }
    return res.status(500).json({ error: 'Failed to get response from model' });
  }
});

app.listen(PORT, () => {
  console.log(`MindHeaven chatbot backend running at http://localhost:${PORT}`);
  console.log(`Talking to Ollama at ${OLLAMA_URL} using model "${OLLAMA_MODEL}"`);
});


// // Start Server
// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });

