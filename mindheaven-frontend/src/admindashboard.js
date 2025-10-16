import React, { useEffect, useState } from "react";

export default function AdminDashboard({ apiBase = "http://localhost:5000", admin = {}, goProfile = () => {}, logout = () => {}, goHome = () => {} }) {
  const [tab, setTab] = useState("users"); // "users" | "userinfo"
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const [editingId, setEditingId] = useState(null);
  const [profileForm, setProfileForm] = useState({
    full_name: "",
    address: "",
    phone: "",
    photo: "",
    symptoms: [],
    episodeLength: "",
    chronicIssues: "",
    specifyIssues: "",
    medication: ""
  });
  const [saving, setSaving] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      const res = await fetch(`${apiBase}/users`);
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const promote = async (id) => {
    if (!window.confirm("Promote this user to admin?")) return;
    const res = await fetch(`${apiBase}/promote/${id}`, { method: "PUT" });
    const data = await res.json();
    alert(data.message || "Done");
    fetchUsers();
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this user? This cannot be undone.")) return;
    const res = await fetch(`${apiBase}/delete/${id}`, { method: "DELETE" });
    const data = await res.json();
    alert(data.message || "Done");
    // if you deleted the one you were editing, reset editor
    if (editingId === id) {
      setEditingId(null);
      setProfileForm({
        full_name: "", address: "", phone: "", photo: "",
        symptoms: [], episodeLength: "", chronicIssues: "",
        specifyIssues: "", medication: ""
      });
    }
    fetchUsers();
  };

  const startEditProfile = async (userId) => {
    setEditingId(userId);
    try {
      const res = await fetch(`${apiBase}/profile/${userId}`);
      const data = await res.json();
      if (data?.success) {
        const p = data.profile || {};
        setProfileForm({
          full_name: p.full_name || "",
          address: p.address || "",
          phone: p.phone || "",
          photo: p.photo || "",
          symptoms: Array.isArray(p.symptoms) ? p.symptoms : [],
          episodeLength: p.episode_length || "",
          chronicIssues: p.chronic_issues || "",
          specifyIssues: p.specify_issues || "",
          medication: p.medication || "",
        });
        setTab("userinfo");
      } else {
        // no profile yet: prepare blank editor
        setProfileForm({
          full_name: "", address: "", phone: "", photo: "",
          symptoms: [], episodeLength: "", chronicIssues: "",
          specifyIssues: "", medication: ""
        });
        setTab("userinfo");
      }
    } catch {
      alert("Failed to fetch profile");
    }
  };

  const saveProfile = async () => {
    if (!editingId) return;
    try {
      setSaving(true);
      const res = await fetch(`${apiBase}/profile/${editingId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileForm),
      });
      const data = await res.json();
      alert(data.message || "Saved");
    } catch {
      alert("Error saving profile");
    } finally {
      setSaving(false);
    }
  };

  const Input = ({ label, ...props }) => (
    <div style={{ display: "grid", gap: 6 }}>
      <label style={{ fontSize: 13, color: "#374151", fontWeight: 600 }}>{label}</label>
      <input
        {...props}
        style={{
          padding: "10px 12px",
          border: "1px solid #e5e7eb",
          borderRadius: 10,
          outline: "none",
          fontSize: 14,
          background: "#fff",
        }}
      />
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
      {/* Top bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 16px", borderBottom: "1px solid #e5e7eb", background: "#fff", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ fontWeight: 800, fontSize: 20, color: "#4c6ef5" }}>Mindheaven — Admin</div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => setTab("users")}
            style={{ padding: "8px 12px", borderRadius: 10, border: "1px solid #e5e7eb", background: tab === "users" ? "#eef2ff" : "#fff", cursor: "pointer", fontWeight: 700 }}
          >
            Users
          </button>
          <button
            onClick={() => setTab("userinfo")}
            disabled={!editingId}
            title={!editingId ? "Pick a user → Edit Profile" : "Edit selected user's profile"}
            style={{ padding: "8px 12px", borderRadius: 10, border: "1px solid #e5e7eb", background: tab === "userinfo" ? "#eef2ff" : "#fff", cursor: editingId ? "pointer" : "not-allowed", fontWeight: 700 }}
          >
            User Info
          </button>
          <button onClick={goProfile} style={{ padding: "8px 12px", borderRadius: 10, background: "#4c6ef5", color: "#fff", border: "none", fontWeight: 700, cursor: "pointer" }}>
            My Profile
          </button>
          <button onClick={goHome} style={{ padding: "8px 12px", borderRadius: 10, border: "1px solid #e5e7eb", background: "#fff", fontWeight: 700, cursor: "pointer" }}>
            Home
          </button>
          <button onClick={logout} style={{ padding: "8px 12px", borderRadius: 10, background: "#b91c1c", color: "#fff", border: "none", fontWeight: 700, cursor: "pointer" }}>
            Logout
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: 20, maxWidth: 1100, margin: "0 auto" }}>
        {tab === "users" && (
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 16, boxShadow: "0 8px 24px rgba(0,0,0,.06)" }}>
            <div style={{ padding: 16, borderBottom: "1px solid #e5e7eb", fontWeight: 800 }}>Users</div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f9fafb" }}>
                    <th style={{ textAlign: "left", padding: 12, borderBottom: "1px solid #e5e7eb" }}>ID</th>
                    <th style={{ textAlign: "left", padding: 12, borderBottom: "1px solid #e5e7eb" }}>Email</th>
                    <th style={{ textAlign: "left", padding: 12, borderBottom: "1px solid #e5e7eb" }}>Role</th>
                    <th style={{ textAlign: "left", padding: 12, borderBottom: "1px solid #e5e7eb" }}>Edit Profile</th>
                    <th style={{ textAlign: "left", padding: 12, borderBottom: "1px solid #e5e7eb" }}>Promote</th>
                    <th style={{ textAlign: "left", padding: 12, borderBottom: "1px solid #e5e7eb" }}>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {loadingUsers ? (
                    <tr><td colSpan="6" style={{ padding: 16 }}>Loading…</td></tr>
                  ) : users.length === 0 ? (
                    <tr><td colSpan="6" style={{ padding: 16 }}>No users found.</td></tr>
                  ) : (
                    users.map((u) => (
                      <tr key={u.id}>
                        <td style={{ padding: 12, borderBottom: "1px solid #f1f5f9" }}>{u.id}</td>
                        <td style={{ padding: 12, borderBottom: "1px solid #f1f5f9" }}>{u.email}</td>
                        <td style={{ padding: 12, borderBottom: "1px solid #f1f5f9" }}>{u.role}</td>
                        <td style={{ padding: 12, borderBottom: "1px solid #f1f5f9" }}>
                          <button onClick={() => startEditProfile(u.id)} style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer", fontWeight: 700 }}>
                            Edit Profile
                          </button>
                        </td>
                        <td style={{ padding: 12, borderBottom: "1px solid #f1f5f9" }}>
                          {u.role === "admin" ? (
                            <span style={{ color: "#6b7280" }}>—</span>
                          ) : (
                            <button onClick={() => promote(u.id)} style={{ padding: "6px 10px", borderRadius: 8, background: "#10b981", color: "#fff", border: "none", cursor: "pointer", fontWeight: 700 }}>
                              Promote
                            </button>
                          )}
                        </td>
                        <td style={{ padding: 12, borderBottom: "1px solid #f1f5f9" }}>
                          <button onClick={() => remove(u.id)} style={{ padding: "6px 10px", borderRadius: 8, background: "#ef4444", color: "#fff", border: "none", cursor: "pointer", fontWeight: 700 }}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "userinfo" && (
          <div style={{ marginTop: 16, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 16, boxShadow: "0 8px 24px rgba(0,0,0,.06)" }}>
            <div style={{ padding: 16, borderBottom: "1px solid #e5e7eb", fontWeight: 800 }}>
              {editingId ? `Editing Profile for User #${editingId}` : "Pick a user in Users tab → Edit Profile"}
            </div>
            {editingId ? (
              <div style={{ display: "grid", gap: 12, padding: 16, gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
                <Input label="Full Name" value={profileForm.full_name} onChange={(e) => setProfileForm({ ...profileForm, full_name: e.target.value })} />
                <Input label="Phone" value={profileForm.phone} onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })} />
                <Input label="Address" value={profileForm.address} onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })} />
                <Input label="Photo URL" value={profileForm.photo} onChange={(e) => setProfileForm({ ...profileForm, photo: e.target.value })} />
                <Input label="Episode Length" value={profileForm.episodeLength} onChange={(e) => setProfileForm({ ...profileForm, episodeLength: e.target.value })} />
                <Input label="Chronic Issues" value={profileForm.chronicIssues} onChange={(e) => setProfileForm({ ...profileForm, chronicIssues: e.target.value })} />
                <Input label="Specify Issues" value={profileForm.specifyIssues} onChange={(e) => setProfileForm({ ...profileForm, specifyIssues: e.target.value })} />
                <Input label="Medication" value={profileForm.medication} onChange={(e) => setProfileForm({ ...profileForm, medication: e.target.value })} />

                <div style={{ gridColumn: "1 / -1", display: "grid", gap: 6 }}>
                  <label style={{ fontSize: 13, color: "#374151", fontWeight: 600 }}>Symptoms (comma separated)</label>
                  <input
                    value={Array.isArray(profileForm.symptoms) ? profileForm.symptoms.join(", ") : profileForm.symptoms}
                    onChange={(e) => {
                      const arr = e.target.value.split(",").map(s => s.trim()).filter(Boolean);
                      setProfileForm({ ...profileForm, symptoms: arr });
                    }}
                    style={{ padding: "10px 12px", border: "1px solid #e5e7eb", borderRadius: 10, outline: "none", fontSize: 14, background: "#fff" }}
                  />
                </div>

                <div style={{ gridColumn: "1 / -1", display: "flex", gap: 10, marginTop: 8 }}>
                  <button onClick={saveProfile} disabled={saving} style={{ padding: "10px 14px", borderRadius: 10, background: "#4c6ef5", color: "#fff", border: "none", fontWeight: 800, cursor: "pointer" }}>
                    {saving ? "Saving…" : "Save Profile"}
                  </button>
                  <button onClick={() => setTab("users")} style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #e5e7eb", background: "#fff", fontWeight: 800, cursor: "pointer" }}>
                    Back to Users
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ padding: 16 }}>Select a user from the **Users** tab and click **Edit Profile**.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
