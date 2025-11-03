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
import Music from "./music";
import SpotTheDifference from "./spot";
import FunQuizGame from "./quiz";
import Appointment from "./Appointment";
import Puzzle from "./Puzzle";
import PatternRecall from "./PatternRecall";


import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");

  // ✅ Centralized navigation functions
  const navigation = {
    goToHome: () => setPage("home"),
    goToLogin: () => setPage("login"),
    goToSignup: () => setPage("signup"),
    goToUserDashboard: () => setPage("userDashboard"),
    goToAdminDashboard: () => setPage("adminDashboard"),
    goToGames: () => setPage("games"),
    goToWordle: () => setPage("wordle"),
    goToTicTacToe: () => setPage("tictactoe"),
    goToMatchingGame: () => setPage("matching"),
    goToContact: () => setPage("contact"),
    goToWellness: () => setPage("wellness"),
    goToTips: () => setPage("tips"),
    goToMeditation: () => setPage("meditation"),
    goToBlogs: () => setPage("blogs"),
    goToMusic: () => setPage("music"),
    goTospot: () => setPage("spot"),
    goToquiz: () => setPage("quiz"),
    goToAppointment: () => setPage("Appointment"),
    goToPuzzle: () => setPage("Puzzle"),
    goToPatternRecall: () => setPage("patternrecall"),
  };

  // ✅ Handle login role switching
  const handleLogin = (userRole, userEmail) => {
    setRole(userRole);
    setEmail(userEmail);
    setPage(userRole === "admin" ? "adminDashboard" : "userDashboard");
  };

  return (
    <div className="App">
      {/* 🏠 Home */}
      {page === "home" && <HomePage {...navigation} />}

      {/* 🔐 Login */}
      {page === "login" && <Login {...navigation} onLogin={handleLogin} />}

      {/* 📝 Signup */}
      {page === "signup" && <Signup {...navigation} />}

      {/* 👤 User Dashboard */}
      {page === "userDashboard" && (
        <UserDashboard {...navigation} email={email} role={role} />
      )}

      {/* 🧑‍💼 Admin Dashboard */}
      {page === "adminDashboard" && (
        <AdminDashboard {...navigation} email={email} role={role} />
      )}

      {/* 🎮 Games */}
      {page === "games" && <GamesPage {...navigation} />}

      {/* 🔠 Wordle */}
      {page === "wordle" && <WordleGame {...navigation} />}

      {/* ❌ Tic Tac Toe */}
      {page === "tictactoe" && <TicTacToe {...navigation} />}

      {/* 🧩 Matching Game */}
      {page === "matching" && <MatchingGame {...navigation} />}

      {page === "spot" && <SpotTheDifference {...navigation} />}
      {page === "quiz" && <FunQuizGame {...navigation} />}
      {page === "Puzzle" && <Puzzle {...navigation} />}
      {page === "patternrecall" && <PatternRecall {...navigation} />}


      {/* 💬 Contact */}
      {page === "contact" && <ContactUs {...navigation} />}

      {/* 🌿 Wellness */}
      {page === "wellness" && <WellnessPage {...navigation} />}

      {/* 💡 Tips */}
      {page === "tips" && <Tips {...navigation} />}

      {/* 🧘 Meditation */}
      {page === "meditation" && <Meditation {...navigation} />}

      {/* 📰 Blogs */}
      {page === "blogs" && <Blogs {...navigation} />}

      {page === "music" && <Music {...navigation} />}
      {page === "Appointment" && <Appointment {...navigation} />}
    </div>
  );
}

export default App;
