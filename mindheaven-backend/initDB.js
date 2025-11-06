import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./users.db", (err) => {
  if (err) return console.error("DB connection error:", err);
  console.log("✅ Connected to SQLite");
});

const userEmail = "jessica@gmail.com";
const userId = 6;

db.serialize(() => {
  console.log(`🧹 Deleting user ${userEmail} (ID: ${userId})...`);

  // Delete from profiles
  db.run(
    `DELETE FROM user_profiles WHERE user_id = ?`,
    [userId],
    function (err) {
      if (err) return console.error("❌ Error deleting profile:", err);
      console.log(`🗑️ Deleted ${this.changes} profile row(s)`);
    }
  );

  // Delete appointments
  db.run(
    `DELETE FROM appointments WHERE user_id = ?`,
    [userId],
    function (err) {
      if (err) return console.error("❌ Error deleting appointments:", err);
      console.log(`📆 Deleted ${this.changes} appointment(s)`);
    }
  );

  // Delete user account
  db.run(
    `DELETE FROM users WHERE id = ? AND email = ?`,
    [userId, userEmail],
    function (err) {
      if (err) return console.error("❌ Error deleting user:", err);
      console.log(`👤 Deleted ${this.changes} user row(s)`);
      console.log("✅ Completed cleanup");
      db.close();
    }
  );
});