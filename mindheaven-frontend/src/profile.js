import React, { useEffect, useState } from "react";

export default function Profile({ apiBase = "http://localhost:5000", user, onBack = () => {} }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({
    full_name: "",
    address: "",
    phone: "",
    photo: "",
    symptoms: [],
    episode_length: "",
    chronic_issues: "",
    specify_issues: "",
    medication: "",
  });

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${apiBase}/profile/${user.id}`);
        const data = await res.json();
        if (!mounted) return;
        if (data?.success) {
          const p = data.profile || {};
          setForm({
            full_name: p.full_name || "",
            address: p.address || "",
            phone: p.phone || "",
            photo: p.photo || "",
            symptoms: Array.isArray(p.symptoms) ? p.symptoms : [],
            episode_length: p.episode_length || "",
            chronic_issues: p.chronic_issues || "",
            specify_issues: p.specify_issues || "",
            medication: p.medication || "",
          });
        } else {
          setMsg(data?.message || "");
        }
      } catch {
        setMsg("Unable to load profile");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    if (user?.id) load();
    return () => { mounted = false; };
  }, [apiBase, user]);

  const save = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setMsg("");
      const payload = { ...form };
      const res = await fetch(`${apiBase}/profile/${user.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setMsg(data?.message || (data?.success ? "Saved" : "Error"));
    } catch {
      setMsg("Unable to save profile");
    } finally {
      setSaving(false);
    }
  };

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, rgba(142,197,252,0.18), rgba(224,195,252,0.18))",
        display: "grid",
        placeItems: "center",
        padding: 16,
      }}
    >
      <div
        style={{
          width: 920,
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: 16,
          boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
          padding: 22,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <button
            onClick={onBack}
            style={{ background: "transparent", border: "none", cursor: "pointer", color: "#4b5563", fontWeight: 600 }}
          >
            ← Back
          </button>
          <div
            style={{
              fontSize: 22,
              fontWeight: 800,
              background: "linear-gradient(90deg,#8EC5FC,#E0C3FC)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            My Profile
          </div>
          <div style={{ color: "#6b7280", fontSize: 14 }}>{user?.email}</div>
        </div>

        {loading ? (
          <div style={{ padding: 10, color: "#6b7280" }}>Loading…</div>
        ) : (
          <form onSubmit={save} style={{ display: "grid", gap: 14 }}>
            {/* Basic info */}
            <div
              style={{
                display: "grid",
                gap: 12,
                gridTemplateColumns: "1fr 1fr",
                background: "#f9fafb",
                border: "1px solid #e5e7eb",
                borderRadius: 12,
                padding: 14,
              }}
            >
              <Field label="Full Name">
                <input className="pf-in" value={form.full_name} onChange={(e) => set("full_name", e.target.value)} />
              </Field>
              <Field label="Phone">
                <input className="pf-in" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
              </Field>
              <Field label="Address" full>
                <input className="pf-in" value={form.address} onChange={(e) => set("address", e.target.value)} />
              </Field>
            </div>

            {/* Medical / signup info from user_info table */}
            <div
              style={{
                display: "grid",
                gap: 12,
                gridTemplateColumns: "1fr 1fr",
                background: "#f9fafb",
                border: "1px solid #e5e7eb",
                borderRadius: 12,
                padding: 14,
              }}
            >
              <Field label="Symptoms (comma separated)" full>
                <input
                  className="pf-in"
                  value={Array.isArray(form.symptoms) ? form.symptoms.join(", ") : ""}
                  onChange={(e) =>
                    set(
                      "symptoms",
                      e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean)
                    )
                  }
                />
              </Field>
              <Field label="Episode Length">
                <input className="pf-in" value={form.episode_length} onChange={(e) => set("episode_length", e.target.value)} />
              </Field>
              <Field label="Chronic Issues">
                <input className="pf-in" value={form.chronic_issues} onChange={(e) => set("chronic_issues", e.target.value)} />
              </Field>
              <Field label="Specify Issues">
                <input className="pf-in" value={form.specify_issues} onChange={(e) => set("specify_issues", e.target.value)} />
              </Field>
              <Field label="Medication" full>
                <input className="pf-in" value={form.medication} onChange={(e) => set("medication", e.target.value)} />
              </Field>
            </div>

            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <div style={{ color: msg?.includes("Error") ? "#b91c1c" : "#16a34a", alignSelf: "center" }}>
                {msg}
              </div>
              <button
                type="submit"
                disabled={saving}
                style={{
                  padding: "10px 14px",
                  borderRadius: 10,
                  border: "none",
                  background: saving ? "#9ca3af" : "linear-gradient(90deg,#8EC5FC,#E0C3FC)",
                  color: "#111",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                {saving ? "Saving…" : "Save Profile"}
              </button>
            </div>
          </form>
        )}
      </div>

      <style>{`
        .pf-in {
          width: 100%;
          padding: 10px 12px;
          border-radius: 10px;
          border: 1px solid #e5e7eb;
          outline: none;
          background: #fff;
        }
        @media (max-width: 720px) {
          .pf-2col {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

function Field({ label, full = false, children }) {
  return (
    <div style={{ gridColumn: full ? "1 / -1" : "auto" }}>
      <div style={{ fontWeight: 600, marginBottom: 6 }}>{label}</div>
      {children}
    </div>
  );
}
