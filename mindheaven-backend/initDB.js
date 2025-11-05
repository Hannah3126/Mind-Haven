// createAppointmentsTable.js

import sqlite3 from "sqlite3";

// Connect to DB
const db = new sqlite3.Database("./users.db", (err) => {
  if (err) {
    console.error("❌ Error connecting to database:", err.message);
    return;
  }
  console.log("✅ Connected to SQLite DB");
});

// Create Appointments table
const createTableQuery = `
CREATE TABLE IF NOT EXISTS appointments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  name TEXT,
  email TEXT,
  phone TEXT,
  date TEXT,
  time TEXT,
  notes TEXT
);
`;

db.run(createTableQuery, (err) => {
  if (err) {
    console.error("❌ Failed creating table:", err.message);
  } else {
    console.log("✅ Appointments table created successfully!");
  }
  db.close();
});