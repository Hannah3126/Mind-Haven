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
  const [userName, setUserName] = useState(localStorage.getItem("user_name") || "");
  const [userEmail, setUserEmail] = useState(localStorage.getItem("user_email") || "");
  const [userRole, setUserRole] = useState(localStorage.getItem("user_role") || "");

  // ✅ Centralized navigation functions
  const navigation = {
    goToHome: () => { setPage("home"); window.scrollTo(0,0); },
    goToLogin: () => { setPage("login"); window.scrollTo(0,0); },
    goToSignup: () => { setPage("signup"); window.scrollTo(0,0); },
    goToUserDashboard: () => { setPage("userDashboard"); window.scrollTo(0,0); },
    goToAdminDashboard: () => { setPage("adminDashboard"); window.scrollTo(0,0); },
    goToGames: () => { setPage("games"); window.scrollTo(0,0); },
    goToWordle: () => { setPage("wordle"); window.scrollTo(0,0); },
    goToTicTacToe: () => { setPage("tictactoe"); window.scrollTo(0,0); },
    goToMatchingGame: () => { setPage("matching"); window.scrollTo(0,0); },
    goToContact: () => { setPage("contact"); window.scrollTo(0,0); },
    goToWellness: () => { setPage("wellness"); window.scrollTo(0,0); },
    goToTips: () => { setPage("tips"); window.scrollTo(0,0); },
    goToMeditation: () => { setPage("meditation"); window.scrollTo(0,0); },
    goToBlogs: () => { setPage("blogs"); window.scrollTo(0,0); },
    goToMusic: () => { setPage("music"); window.scrollTo(0,0); },
    goTospot: () => { setPage("spot"); window.scrollTo(0,0); },
    goToquiz: () => { setPage("quiz"); window.scrollTo(0,0); },
    goToAppointment: () => { setPage("Appointment"); window.scrollTo(0,0); },
    goToPuzzle: () => { setPage("Puzzle"); window.scrollTo(0,0); },
    goToPatternRecall: () => { setPage("patternrecall"); window.scrollTo(0,0); },
  };

  // ✅ Handle login role switching
  const handleLogin = (userRole, userEmail) => {
    setRole(userRole);
    setEmail(userEmail);
  
    // ✅ also set from localStorage immediately
    setUserName(localStorage.getItem("user_name") || "");
    setUserEmail(localStorage.getItem("user_email") || "");
    setUserRole(localStorage.getItem("user_role") || "");
  
    setPage(userRole === "admin" ? "adminDashboard" : "home");
  };

  return (
    <div className="App">
      {/* 🏠 Home */}
      {page === "home" && (
        <HomePage
          {...navigation}
          userName={userName}
          userEmail={userEmail}
          userRole={userRole}
        />
      )}

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
      {page === "Appointment" && (
        <Appointment
          {...navigation}
          userName={localStorage.getItem("user_name") || userName || ""}
          userEmail={localStorage.getItem("user_email") || userEmail || ""}
          userRole={localStorage.getItem("user_role") || userRole || ""}
        />
      )}
    </div>
  );
}

export default App;
