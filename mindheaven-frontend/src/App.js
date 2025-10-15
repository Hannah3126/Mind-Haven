import React, { useState } from "react";
import Homepage from "./Homepage";
import Login from "./login";
import Signup from "./signup";
import Profile from "./profile";

export default function App() {
  // pages: "home" | "login" | "signup" | "profile"
  const [page, setPage] = useState("home");

  const [auth, setAuth] = useState({
    loggedIn: false,
    userId: null,
    email: "",
    role: "",
  });

  const handleLoggedIn = ({ email, role, userId }) => {
    setAuth({ loggedIn: true, email, role, userId });
    // IMPORTANT: land on the Homepage (acts as dashboard)
    setPage("home");
  };

  const handleLogout = () => {
    setAuth({ loggedIn: false, email: "", role: "", userId: null });
    setPage("home");
  };

  // ---------- Routes ----------
  if (page === "login") {
    return <Login onSuccess={handleLoggedIn} onBack={() => setPage("home")} />;
  }

  if (page === "signup") {
    return <Signup onBack={() => setPage("home")} onSuccess={() => {}} />;
  }

  if (page === "profile") {
    if (!auth.loggedIn) {
      return <Login onSuccess={handleLoggedIn} onBack={() => setPage("home")} />;
    }
    return (
      <Profile
        apiBase="http://localhost:5000"
        user={{ id: auth.userId, email: auth.email, role: auth.role }}
        onBack={() => setPage("home")}
      />
    );
  }

  // Default: Homepage (acts as user dashboard when logged in)
  return (
    <Homepage
      loggedIn={auth.loggedIn}
      email={auth.email}
      goToLogin={() => setPage("login")}
      goToSignup={() => setPage("signup")}
      goProfile={() => setPage("profile")}
      logout={handleLogout}
    />
  );
}
