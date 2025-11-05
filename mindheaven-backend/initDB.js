// updateProfile.js
import sqlite3 from "sqlite3";

// open DB
const db = new sqlite3.Database("./users.db", (err) => {
  if (err) return console.log("❌ DB error:", err.message);
  console.log("✅ Connected to DB");
});

const userId = 5;
const name = "Sarah";

// If row exists → update, otherwise insert
db.get("SELECT * FROM user_profiles WHERE user_id = ?", [userId], (err, row) => {
  if (err) {
    console.log("❌ Error checking profile:", err);
    process.exit();
  }

  if (row) {
    // Update existing
    db.run(
      "UPDATE user_profiles SET name = ? WHERE user_id = ?",
      [name, userId],
      function (err) {
        if (err) return console.log("❌ Update failed:", err.message);
        console.log(`✅ Updated user_id ${userId} → name = ${name}`);
        db.close();
      }
    );
  } else {
    // Insert new
    db.run(
      "INSERT INTO user_profiles (user_id, name) VALUES (?, ?)",
      [userId, name],
      function (err) {
        if (err) return console.log("❌ Insert failed:", err.message);
        console.log(`✅ Added new profile for user_id ${userId} → name = ${name}`);
        db.close();
      }
    );
  }
});