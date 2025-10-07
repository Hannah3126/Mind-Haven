
import React, { useState } from "react";
import HomePage from "./Homepage";
import Login from "./login";
import Signup from "./signup";
import UserDashboard from "./userdashboard";
import AdminDashboard from "./admindashboard";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = (userRole, userEmail) => {
    setRole(userRole);
    setEmail(userEmail);
    setPage(userRole === "admin" ? "adminDashboard" : "userDashboard");
  };

  return (
    <div className="App">
      {page === "home" && (
        <HomePage
          goToLogin={() => setPage("login")}
          goToSignup={() => setPage("signup")}
        />
      )}
      {page === "login" && (
        <Login
          goToSignup={() => setPage("signup")}
          onLogin={handleLogin}
          goToHome={() => setPage("home")}
        />
      )}
      {page === "signup" && (
        <Signup
          goToLogin={() => setPage("login")}
          goToHome={() => setPage("home")}
        />
      )}
      {page === "userDashboard" && (
        <UserDashboard email={email} goToHome={() => setPage("home")} />
      )}
      {page === "adminDashboard" && (
        <AdminDashboard email={email} goToHome={() => setPage("home")} />
      )}
    </div>
  );
}

export default App;






