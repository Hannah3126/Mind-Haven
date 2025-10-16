import React, { useState } from "react";
import Homepage from "./Homepage";
import Login from "./login";
import Signup from "./signup";
import Profile from "./profile";
import AdminDashboard from "./admindashboard";
import Games from "./Games";
//import Wellness from "./Wellness"; // you'll add this file in step 3

export default function App() {
  // pages: "home" | "login" | "signup" | "profile" | "admin" | "games" | "wellness"
  const [page, setPage] = useState("home");

  const [auth, setAuth] = useState({
    loggedIn: false,
    userId: null,
    email: "",
    role: "",
  });

  const handleLoggedIn = ({ email, role, userId }) => {
    const next = role === "admin" ? "admin" : "home";
    setAuth({ loggedIn: true, email, role, userId });
    setPage(next);
  };

  const handleLogout = () => {
    setAuth({ loggedIn: false, email: "", role: "", userId: null });
    setPage("home");
  };

  // ------- routes -------
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
        onBack={() => setPage(auth.role === "admin" ? "admin" : "home")}
      />
    );
  }

  if (page === "admin") {
    if (!auth.loggedIn || auth.role !== "admin") {
      return <Login onSuccess={handleLoggedIn} onBack={() => setPage("home")} />;
    }
    return (
      <AdminDashboard
        apiBase="http://localhost:5000"
        admin={{ id: auth.userId, email: auth.email }}
        goProfile={() => setPage("profile")}
        logout={handleLogout}
        goHome={() => setPage("home")}
      />
    );
  }

  if (page === "games") {
    return <Games onBack={() => setPage("home")} />;
  }

  if (page === "wellness") {
  alert("Wellness page coming soon!");
  setPage("home");
}


  // default: Homepage (acts as user dashboard for regular users)
  return (
    <Homepage
      loggedIn={auth.loggedIn}
      email={auth.email}
      goToLogin={() => setPage("login")}
      goToSignup={() => setPage("signup")}
      goProfile={() => setPage("profile")}
      logout={handleLogout}
      goToGames={() => setPage("games")}
      goToWellness={() => setPage("wellness")}
    />
  );
}
