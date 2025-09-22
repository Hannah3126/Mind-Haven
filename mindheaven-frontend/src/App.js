import React, { useState, useEffect } from "react";
import HomePage from "./HomePage"; // <-- new import

// ---------------- MAIN APP ----------------
function App() {
  const [view, setView] = useState("home"); // now starts at home
  const [role, setRole] = useState(null);

  // Login API
  const handleLogin = async (email, password) => {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.success) {
      setRole(data.role);
      setView("dashboard");
    } else {
      alert(data.message || "Login failed");
    }
  };

  // Signup API
  const handleSignup = async (email, password) => {
    const res = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    alert(data.message);
    if (data.success) setView("login");
  };

  // ---------------- VIEW ROUTING ----------------
  if (view === "home") {
    return <HomePage goToLogin={() => setView("login")} />;
  }

  if (view === "dashboard") {
    return role === "admin" ? (
      <AdminDashboard onLogout={() => setView("login")} />
    ) : (
      <UserDashboard onLogout={() => setView("login")} />
    );
  }

  if (view === "signup") {
    return (
      <SignupPage
        onSignup={handleSignup}
        switchToLogin={() => setView("login")}
      />
    );
  }

  // default is login
  return (
    <LoginPage
      onLogin={handleLogin}
      switchToSignup={() => setView("signup")}
    />
  );
}

// ---------------- LOGIN PAGE ----------------
function LoginPage({ onLogin, switchToSignup }) {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [show, setShow] = useState(false);

  return (
    <>
      <GlobalStyles />
      <div className="page page-centered">
        <div className="card">
          <div className="brand-row">
            <Logo />
            <h1 className="brand">Mindheaven</h1>
          </div>
          <h2 className="title">Sign in</h2>
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
              onLogin(email, pwd);
            }}
          >
            <label className="label">Email</label>
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label className="label">Password</label>
            <div className="input-wrap password">
              <input
                className="input"
                type={show ? "text" : "password"}
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                required
              />
              <button
                type="button"
                className="eye"
                onClick={() => setShow(!show)}
              >
                {show ? "🙈" : "👁️"}
              </button>
            </div>

            <div className="actions">
              <button className="btn primary" type="submit">
                Login
              </button>
              <button
                className="btn link"
                type="button"
                onClick={switchToSignup}
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

// ---------------- SIGNUP PAGE ----------------
function SignupPage({ onSignup, switchToLogin }) {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [show, setShow] = useState(false);

  return (
    <>
      <GlobalStyles />
      <div className="page page-centered">
        <div className="card">
          <div className="brand-row">
            <Logo />
            <h1 className="brand">Mindheaven</h1>
          </div>
          <h2 className="title">Create account</h2>
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
              onSignup(email, pwd);
            }}
          >
            <label className="label">Email</label>
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label className="label">Password</label>
            <div className="input-wrap password">
              <input
                className="input"
                type={show ? "text" : "password"}
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                required
              />
              <button
                type="button"
                className="eye"
                onClick={() => setShow(!show)}
              >
                {show ? "🙈" : "👁️"}
              </button>
            </div>

            <div className="actions">
              <button className="btn primary" type="submit">
                Sign Up
              </button>
              <button
                className="btn link"
                type="button"
                onClick={switchToLogin}
              >
                Back to Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

// ---------------- ADMIN DASHBOARD ----------------
function AdminDashboard({ onLogout }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <>
      <GlobalStyles />
      <div className="page page-centered">
        <div className="card" style={{ maxWidth: "800px" }}>
          <div className="brand-row">
            <Logo />
            <h1 className="brand">Mindheaven Admin</h1>
          </div>
          <h2 className="title">Users Data</h2>
          <table
            style={{
              width: "100%",
              marginTop: "12px",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th style={{ borderBottom: "1px solid #555" }}>ID</th>
                <th style={{ borderBottom: "1px solid #555" }}>Email</th>
                <th style={{ borderBottom: "1px solid #555" }}>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="actions" style={{ marginTop: "20px" }}>
            <button className="btn secondary" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ---------------- USER DASHBOARD ----------------
function UserDashboard({ onLogout }) {
  const blogs = [
    { title: "5 Ways to Reduce Stress", preview: "Simple daily habits..." },
    { title: "Meditation Basics", preview: "How to start today..." },
  ];
  const videos = [
    { title: "Mindfulness 101", preview: "Video intro..." },
    { title: "Yoga for Anxiety", preview: "Follow along..." },
  ];
  const forums = [
    { title: "Coping with Exams", preview: "Share tips..." },
    { title: "Workplace Stress", preview: "Discuss burnout..." },
  ];

  return (
    <>
      <GlobalStyles />
      <div className="page page-centered">
        <div className="card" style={{ maxWidth: "800px" }}>
          <div className="brand-row">
            <Logo />
            <h1 className="brand">Mindheaven</h1>
          </div>
          <h2 className="title">Welcome User</h2>
          <Section title="Recommended Blogs" items={blogs} />
          <Section title="Videos & Podcasts" items={videos} />
          <Section title="Community Highlights" items={forums} />
          <div className="actions" style={{ marginTop: "20px" }}>
            <button className="btn secondary" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ---------------- REUSABLE SECTION ----------------
function Section({ title, items }) {
  return (
    <div style={{ margin: "20px 0" }}>
      <h3>{title}</h3>
      <div style={{ display: "flex", gap: "12px", overflowX: "auto" }}>
        {items.map((it, i) => (
          <div
            key={i}
            style={{
              minWidth: "200px",
              padding: "12px",
              background: "#222",
              borderRadius: "12px",
            }}
          >
            <h4>{it.title}</h4>
            <p style={{ fontSize: "13px" }}>{it.preview}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------- LOGO ----------------
function Logo() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" className="logo">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8EC5FC" />
          <stop offset="100%" stopColor="#E0C3FC" />
        </linearGradient>
      </defs>
      <path
        fill="url(#g)"
        d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"
      />
    </svg>
  );
}

// ---------------- STYLES ----------------
function GlobalStyles() {
  return (
    <style>{`
      body { margin: 0; font-family: Inter, sans-serif; }
      .page { min-height: 100vh; display: grid; place-items: center;
        background: linear-gradient(to bottom right, rgba(15,23,42,0.6), rgba(2,6,23,0.6)),
        url('https://images.unsplash.com/photo-1523246191871-c0aa1a3d79d7?q=80&w=1600&auto=format&fit=crop') center/cover no-repeat fixed;
      }
      .card { width: 100%; max-width: 440px; padding: 28px;
        background: rgba(255,255,255,0.08); border-radius: 18px;
        backdrop-filter: blur(12px); color: #fff; }
      .brand-row { display: flex; align-items: center; gap: 10px; }
      .brand { font-weight: 700; font-size: 22px; background: linear-gradient(90deg, #8EC5FC, #E0C3FC);
        -webkit-background-clip: text; background-clip: text; color: transparent; }
      .title { margin-top: 12px; font-size: 22px; }
      .form { display: grid; gap: 12px; }
      .label { font-size: 13px; }
      .input { width: 100%; padding: 10px; border-radius: 12px; border: none; }
      .password { position: relative; }
      .eye { position: absolute; right: 8px; top: 8px; background: transparent; border: none; cursor: pointer; color: #ddd; }
      .actions { display: flex; gap: 10px; margin-top: 12px; }
      .btn { padding: 10px 14px; border-radius: 12px; cursor: pointer; border: none; }
      .btn.primary { background: linear-gradient(90deg, #8EC5FC, #E0C3FC); color: #000; font-weight: 600; }
      .btn.secondary { background: rgba(255,255,255,0.2); color: #fff; }
      .btn.link { background: none; color: #bbb; text-decoration: underline; }
      h3 { margin-top: 18px; }
    `}</style>
  );
}

export default App;

