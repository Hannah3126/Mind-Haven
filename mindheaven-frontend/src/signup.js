import React, { useState } from "react";

export default function Signup({
  apiBase = "http://localhost:5000",
  onBack = () => {},
  onSuccess = () => {},
}) {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  const [form, setForm] = useState({
    full_name: "",
    address: "",
    phone: "",

    email: "",
    password: "",

    symptoms: [],
    episodeLength: "",
    chronicIssues: "",
    specifyIssues: "",
    medication: "",
  });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const toggleSymptom = (name) => {
    setForm((f) => {
      const has = f.symptoms.includes(name);
      return { ...f, symptoms: has ? f.symptoms.filter((s) => s !== name) : [...f.symptoms, name] };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!form.email || !form.password) {
      setMsg("Email and password are required");
      return;
    }

    try {
      setBusy(true);
      const payload = {
        email: form.email.trim(),
        password: form.password,

        full_name: form.full_name.trim() || null,
        address: form.address.trim() || null,
        phone: form.phone.trim() || null,

        symptoms: form.symptoms,                 // array -> server stores JSON
        episodeLength: form.episodeLength || "",
        chronicIssues: form.chronicIssues || "",
        specifyIssues: form.specifyIssues || "",
        medication: form.medication || "",
      };

      const res = await fetch(`${apiBase}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data?.success) {
        setMsg("Account created successfully");
        // optional callback
        onSuccess();
        // go back to home (then user can click Login)
        onBack();
      } else {
        setMsg(data?.message || "Error creating account");
      }
    } catch {
      setMsg("Unable to reach server");
    } finally {
      setBusy(false);
    }
  };

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
          width: 960,
          maxWidth: "95vw",
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
            Create your Mindheaven account
          </div>
          <div style={{ width: 64 }} />
        </div>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
          {/* Basic profile info (saved to user_info) */}
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
              <input className="sg-in" value={form.full_name} onChange={(e) => set("full_name", e.target.value)} />
            </Field>
            <Field label="Phone">
              <input className="sg-in" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
            </Field>
            <Field label="Address" full>
              <input className="sg-in" value={form.address} onChange={(e) => set("address", e.target.value)} />
            </Field>
          </div>

          {/* Auth info (saved to users) */}
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
            <Field label="Email">
              <input type="email" className="sg-in" value={form.email} onChange={(e) => set("email", e.target.value)} required />
            </Field>
            <Field label="Password">
              <input type="password" className="sg-in" value={form.password} onChange={(e) => set("password", e.target.value)} required />
            </Field>
          </div>

          {/* Medical / signup info (saved to user_info) */}
          <div
            style={{
              display: "grid",
              gap: 12,
              background: "#f9fafb",
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              padding: 14,
            }}
          >
            <div style={{ fontWeight: 700 }}>Symptoms</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {["Anxiety", "Stress", "Insomnia", "Low Mood", "Panic", "Overthinking"].map((s) => (
                <label key={s} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <input
                    type="checkbox"
                    checked={form.symptoms.includes(s)}
                    onChange={() => toggleSymptom(s)}
                  />
                  {s}
                </label>
              ))}
            </div>

            <Field label="Episode Length">
              <select className="sg-in" value={form.episodeLength} onChange={(e) => set("episodeLength", e.target.value)}>
                <option value="">Select…</option>
                <option value="Under 1 week">Under 1 week</option>
                <option value="1-4 weeks">1–4 weeks</option>
                <option value="1-3 months">1–3 months</option>
                <option value="Over 3 months">Over 3 months</option>
              </select>
            </Field>

            <Field label="Chronic Issues">
              <input className="sg-in" value={form.chronicIssues} onChange={(e) => set("chronicIssues", e.target.value)} />
            </Field>

            <Field label="Specify Issues">
              <input className="sg-in" value={form.specifyIssues} onChange={(e) => set("specifyIssues", e.target.value)} />
            </Field>

            <Field label="Medication">
              <input className="sg-in" value={form.medication} onChange={(e) => set("medication", e.target.value)} />
            </Field>
          </div>

          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", alignItems: "center" }}>
            <div style={{ color: msg?.includes("Error") ? "#b91c1c" : "#16a34a" }}>{msg}</div>
            <button
              type="submit"
              disabled={busy}
              style={{
                padding: "10px 14px",
                borderRadius: 10,
                border: "none",
                background: busy ? "#9ca3af" : "linear-gradient(90deg,#8EC5FC,#E0C3FC)",
                color: "#111",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              {busy ? "Creating…" : "Create account"}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .sg-in {
          width: 100%;
          padding: 10px 12px;
          border-radius: 10px;
          border: 1px solid #e5e7eb;
          outline: none;
          background: #fff;
        }
        @media (max-width: 720px) {
          .sg-2col {
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
