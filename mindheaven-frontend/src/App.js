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
import meditation from "./meditation";


import TicTacToe from "./TicTacToe";
import MatchingGame from './MatchingGame';








import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");

  // Handle login role switching
  function handleLogin(userRole, userEmail) {
    setRole(userRole);
    setEmail(userEmail);
    setPage(userRole === "admin" ? "adminDashboard" : "userDashboard");
  }

  // All navigation props to pass to reusable Navbar components
  const navProps = {
    currentPage: page,
    goToHome: () => setPage("home"),
    goToLogin: () => setPage("login"),
    goToSignup: () => setPage("signup"),
    goToGames: () => setPage("games"),
    goToContact: () => setPage("contact"),
    goTowellness: () => setPage("wellness"),
    goToBlogs: () => setPage("blogs"),
    goToMeditation: () => setPage("meditation"), 
  };


  return (
    <div className="App">
      {page === "home" && <HomePage {...navProps} />}
      {/* You can now use the spread operator to pass all nav props easily: */}
      {page === "wellness" && <WellnessPage {...navProps} />}
      {page === "contact" && <ContactUs {...navProps} />}
      {page === "games" && <GamesPage {...navProps} />}
      {page === "blogs" && <Blogs {...navProps} />}
      {/* {page === "meditation" && <meditation {...navProps} />} */}
      {/* ... and so on for all your pages */}
      {page === "meditation" && <meditation {...navProps} />}
    </div>
  );
  
  
  

}

export default App;