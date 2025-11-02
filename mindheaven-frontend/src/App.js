import React, { useState } from "react";
import HomePage from "./Homepage";
import Login from "./login";
import Signup from "./signup";
import UserDashboard from "./userdashboard";
import AdminDashboard from "./admindashboard";
import GamesPage from "./Games";
import WordleGame from "./Wordle";
import ContactUs from "./ContactUs";
import WellnessPage from "./wellnesspage";
import Tips from "./Tips";
import Blogs from "./blogs";
import TicTacToe from "./TicTacToe";
import MatchingGame from "./MatchingGame";
import Meditation from "./meditation";

import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");

  // ✅ Handle login role switching
  const handleLogin = (userRole, userEmail) => {
    setRole(userRole);
    setEmail(userEmail);
    setPage(userRole === "admin" ? "adminDashboard" : "userDashboard");
  };

  return (
    <div className="App">
      {/* 🏠 Home */}
      {page === "home" && (
        <HomePage
          goToLogin={() => setPage("login")}
          goToSignup={() => setPage("signup")}
          goToGames={() => setPage("games")}
          goToContact={() => setPage("contact")}
          goToWellness={() => setPage("wellness")}
          goToBlogs={() => setPage("blogs")}
        />
      )}

      {/* 🔐 Login */}
      {page === "login" && (
        <Login
          goToSignup={() => setPage("signup")}
          onLogin={handleLogin}
          goToHome={() => setPage("home")}
        />
      )}

      {/* 📝 Signup */}
      {page === "signup" && (
        <Signup goToLogin={() => setPage("login")} goToHome={() => setPage("home")} />
      )}

      {/* 👤 User Dashboard */}
      {page === "userDashboard" && (
        <UserDashboard email={email} goToHome={() => setPage("home")} />
      )}

      {/* 🧑‍💼 Admin Dashboard */}
      {page === "adminDashboard" && (
        <AdminDashboard email={email} goToHome={() => setPage("home")} />
      )}
      //

      {/* 🎮 Games Page */}
      {page === "games" && (
        <GamesPage
          goToHome={() => setPage("home")}
          goToWordle={() => setPage("wordle")}
          goToTicTacToe={() => setPage("tictactoe")}
          goToMatchingGame={() => setPage("matching")}
        />
      )}

      {/* 🔠 Wordle Game */}
      {page === "wordle" && <WordleGame goBack={() => setPage("games")} />}

      {/* ❌ Tic Tac Toe */}
      {page === "tictactoe" && <TicTacToe goBack={() => setPage("games")} />}

      {/* 🧩 Matching Game */}
      {page === "matching" && <MatchingGame goBack={() => setPage("games")} />}

      {/* 💬 Contact */}
      {page === "contact" && <ContactUs goToHome={() => setPage("home")} />}

      {/* 🌿 Wellness */}
      {page === "wellness" && (
        <WellnessPage
          goToHome={() => setPage("home")}
          goToLogin={() => setPage("login")}
          goToSignup={() => setPage("signup")}
          goToGames={() => setPage("games")}
          goToContact={() => setPage("contact")}
          goToTips={() => setPage("tips")}
          goToMeditation={() => setPage("meditation")}
        />
      )}

      {/* 💡 Tips */}
      {page === "tips" && <Tips goToHome={() => setPage("home")} />}

      {/* 🧘 Meditation */}
      {page === "meditation" && (
        <Meditation goToHome={() => setPage("home")} goToWellness={() => setPage("wellness")} />
      )}

      {/* 📰 Blogs */}
      {page === "blogs" && <Blogs goToHome={() => setPage("home")} />}
    </div>
  );
}

export default App;