// src/admindashboard.js
import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import Navbar from "./navbar"; // adjust path if needed

const API_BASE = "http://localhost:5050";

function AdminDashboard({
  goToHome,
  goToLogin,
  goToSignup,
  goToGames,
  goToContact,
  goToWellness,
  goToBlogs,
  goToAdminDashboard,
  goToProfile,
  goToChatbot,
  onLogout,
  email,
  role,
}) {
  const [tables, setTables] = useState([
    "users",
    "user_profiles",
    "appointments",
    "wordle_stats",
  ]);
  const [selectedTable, setSelectedTable] = useState("users");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savingRowId, setSavingRowId] = useState(null);
  const [error, setError] = useState("");

  // Labels to show instead of raw table names
  const tableLabels = {
    users: "Users",
    user_profiles: "User Profiles",
    appointments: "Appointments",
    wordle_stats: "Wordle Stats",
  };

  // ✅ Same options as signup/profile
  const moodOptions = [
    "",
    "Calm 🙂",
    "Stressed 😣",
    "Overwhelmed 😔",
    "Hopeful 🌱",
    "Just exploring 👀",
  ];

  const reasonOptions = [
    "",
    "Stress relief",
    "Improve mood",
    "Build routines",
    "CBT & self-growth",
    "Therapy support",
  ];

  const wantsTherapyOptions = ["", "Yes", "Not right now"];

  const supportAreaOptions = [
    "Stress",
    "Anxiety",
    "Motivation",
    "Relationships",
    "Low mood",
    "Self-confidence",
    "Sleep",
  ];

  // 🔹 Load table list from backend (optional; falls back to default)
  useEffect(() => {
    const fetchTables = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/admin/tables`);
        const data = await res.json();
        if (data.success && Array.isArray(data.tables) && data.tables.length > 0) {
          setTables(data.tables);
          if (!data.tables.includes(selectedTable)) {
            setSelectedTable(data.tables[0]);
          }
        }
      } catch (err) {
        console.error("Admin tables fetch error:", err);
        // use default tables if call fails
      }
    };

    fetchTables();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 🔹 Load rows whenever selected table changes
  useEffect(() => {
    if (!selectedTable) return;

    const fetchRows = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${API_BASE}/api/admin/table/${selectedTable}`);
        const data = await res.json();
        if (!data.success) {
          setError(data.message || "Failed to load table data");
          setRows([]);
        } else {
          let outRows = data.rows || [];

          // ✅ For user_profiles, parse supportAreas JSON into an array
          if (selectedTable === "user_profiles") {
            outRows = outRows.map((row) => {
              let parsedAreas = [];
              try {
                if (row.supportAreas) {
                  parsedAreas = JSON.parse(row.supportAreas);
                  if (!Array.isArray(parsedAreas)) parsedAreas = [];
                }
              } catch (e) {
                parsedAreas = [];
              }
              return { ...row, supportAreas: parsedAreas };
            });
          }

          setRows(outRows);
        }
      } catch (err) {
        console.error("Admin table rows fetch error:", err);
        setError("Failed to load table data");
        setRows([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRows();
  }, [selectedTable]);

  // 🔹 Simple auth gate
  if (role !== "admin") {
    return (
      <div className="admin-page">
        <Navbar
          currentPage="admin"
          goToHome={goToHome}
          goToLogin={goToLogin}
          goToSignup={goToSignup}
          goToGames={goToGames}
          goToContact={goToContact}
          goToWellness={goToWellness}
          goToBlogs={goToBlogs}
          goToAdminDashboard={goToAdminDashboard}
          goToProfile={goToProfile}
          goToChatbot={goToChatbot}
          onLogout={onLogout}
        />
        <div className="admin-content">
          <h2>Admin Dashboard</h2>
          <p>You are not authorized to view this page.</p>
        </div>
      </div>
    );
  }

  const handleCellChange = (rowIndex, colName, value) => {
    setRows((prevRows) => {
      const updated = [...prevRows];
      updated[rowIndex] = { ...updated[rowIndex], [colName]: value };
      return updated;
    });
  };

  // ✅ Toggle a checkbox in supportAreas for user_profiles
  const toggleSupportArea = (rowIndex, area) => {
    setRows((prevRows) => {
      const updated = [...prevRows];
      const row = { ...updated[rowIndex] };
      const current = Array.isArray(row.supportAreas) ? row.supportAreas : [];
      if (current.includes(area)) {
        row.supportAreas = current.filter((a) => a !== area);
      } else {
        row.supportAreas = [...current, area];
      }
      updated[rowIndex] = row;
      return updated;
    });
  };

  const handleUpdateRow = async (rowIndex) => {
    const row = rows[rowIndex];
    if (!row || row.id == null) {
      alert("Row has no id, cannot update.");
      return;
    }

    setSavingRowId(row.id);
    setError("");

    // ✅ For user_profiles, convert supportAreas array back to JSON string
    let payloadRow = row;
    if (selectedTable === "user_profiles") {
      payloadRow = {
        ...row,
        supportAreas: JSON.stringify(row.supportAreas || []),
      };
    }

    try {
      const res = await fetch(
        `${API_BASE}/api/admin/table/${selectedTable}/update`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ row: payloadRow }),
        }
      );

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Failed to update row");
      } else {
        console.log("Row updated");
      }
    } catch (err) {
      console.error("Admin row update error:", err);
      setError("Failed to update row");
    } finally {
      setSavingRowId(null);
    }
  };

  const hasRows = rows && rows.length > 0;
  const columns = hasRows ? Object.keys(rows[0]) : [];

  return (
    <div className="admin-page">
      {/* Top navbar */}
      <Navbar
        currentPage="admin"
        goToHome={goToHome}
        goToLogin={goToLogin}
        goToSignup={goToSignup}
        goToGames={goToGames}
        goToContact={goToContact}
        goToWellness={goToWellness}
        goToBlogs={goToBlogs}
        goToAdminDashboard={goToAdminDashboard}
        goToProfile={goToProfile}
        goToChatbot={goToChatbot}
        onLogout={onLogout}
      />

      <div className="admin-content">
        <h2>Admin Dashboard</h2>
        <p className="admin-subtitle">
          Logged in as <strong>{email || "admin"}</strong>
        </p>

        {/* Second navbar: table buttons */}
        <div className="admin-table-nav">
          {tables.map((t) => (
            <button
              key={t}
              className={
                t === selectedTable
                  ? "admin-table-btn admin-table-btn-active"
                  : "admin-table-btn"
              }
              onClick={() => setSelectedTable(t)}
            >
              {tableLabels[t] || t}
            </button>
          ))}
        </div>

        {/* Table area */}
        <div className="admin-table-wrapper">
          {loading && <p>Loading {selectedTable}…</p>}
          {error && <div className="admin-error">{error}</div>}

          {!loading && !error && !hasRows && (
            <p>No rows found in this table.</p>
          )}

          {!loading && !error && hasRows && (
            <div className="admin-table-scroll">
              <table className="admin-table">
                <thead>
                  <tr>
                    {columns.map((col) => (
                      <th key={col}>{col}</th>
                    ))}
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, rowIndex) => (
                    <tr key={row.id || rowIndex}>
                      {columns.map((col) => {
                        // ✅ Special UI for user_profiles
                        if (selectedTable === "user_profiles") {
                          if (col === "mood") {
                            return (
                              <td key={col}>
                                <select
                                  value={row.mood || ""}
                                  onChange={(e) =>
                                    handleCellChange(
                                      rowIndex,
                                      "mood",
                                      e.target.value
                                    )
                                  }
                                >
                                  {moodOptions.map((opt) => (
                                    <option key={opt} value={opt}>
                                      {opt === "" ? "Choose one" : opt}
                                    </option>
                                  ))}
                                </select>
                              </td>
                            );
                          }

                          if (col === "reason") {
                            return (
                              <td key={col}>
                                <select
                                  value={row.reason || ""}
                                  onChange={(e) =>
                                    handleCellChange(
                                      rowIndex,
                                      "reason",
                                      e.target.value
                                    )
                                  }
                                >
                                  {reasonOptions.map((opt) => (
                                    <option key={opt} value={opt}>
                                      {opt === "" ? "Select one" : opt}
                                    </option>
                                  ))}
                                </select>
                              </td>
                            );
                          }

                          if (col === "wantsTherapy") {
                            return (
                              <td key={col}>
                                <select
                                  value={row.wantsTherapy || ""}
                                  onChange={(e) =>
                                    handleCellChange(
                                      rowIndex,
                                      "wantsTherapy",
                                      e.target.value
                                    )
                                  }
                                >
                                  {wantsTherapyOptions.map((opt) => (
                                    <option key={opt} value={opt}>
                                      {opt === "" ? "Choose one" : opt}
                                    </option>
                                  ))}
                                </select>
                              </td>
                            );
                          }

                          if (col === "supportAreas") {
                            return (
                              <td key={col}>
                                <div className="checkbox-list admin-checkbox-list">
                                  {supportAreaOptions.map((area) => (
                                    <label key={area} className="checkbox-inline">
                                      <input
                                        type="checkbox"
                                        checked={
                                          Array.isArray(row.supportAreas) &&
                                          row.supportAreas.includes(area)
                                        }
                                        onChange={() =>
                                          toggleSupportArea(rowIndex, area)
                                        }
                                      />
                                      {area}
                                    </label>
                                  ))}
                                </div>
                              </td>
                            );
                          }
                        }

                        // Default text input for all other fields
                        return (
                          <td key={col}>
                            <input
                              type="text"
                              value={
                                row[col] != null ? String(row[col]) : ""
                              }
                              onChange={(e) =>
                                handleCellChange(
                                  rowIndex,
                                  col,
                                  e.target.value
                                )
                              }
                            />
                          </td>
                        );
                      })}
                      <td>
                        <button
                          className="admin-update-btn"
                          onClick={() => handleUpdateRow(rowIndex)}
                          disabled={savingRowId === row.id}
                        >
                          {savingRowId === row.id ? "Saving..." : "Update"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

