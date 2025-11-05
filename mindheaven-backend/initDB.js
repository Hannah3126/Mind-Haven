// updateProfile.js
import sqlite3 from "sqlite3";

// Change path if your DB lives somewhere else
const db = new sqlite3.Database("./users.db", (err) => {
  if (err) {
    console.error("❌ DB connection error:", err);
  } else {
    console.log("✅ Connected to database");
  }
});

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS thoughts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        thought TEXT NOT NULL,
        reframed TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )`,
    (err) => {
      if (err) {
        console.error("❌ Error creating thoughts table:", err);
      } else {
        console.log("✅ thoughts table ready");
      }
    }
  );
});

db.close();