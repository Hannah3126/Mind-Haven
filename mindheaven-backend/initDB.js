import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./users.db");

db.serialize(() => {
  console.log("✅ Creating user_profiles table...");

  db.run(`
    CREATE TABLE IF NOT EXISTS user_profiles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      mood TEXT,
      reason TEXT,
      wantsTherapy TEXT,
      supportAreas TEXT,
      notesForTherapist TEXT,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
  `);

  console.log("✅ Done! user_profiles table created.");
});

db.close();