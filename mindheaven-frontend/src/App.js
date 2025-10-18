
import React, { useState } from "react";
import HomePage from "./Homepage";
import Login from "./login";
import Signup from "./signup";
import UserDashboard from "./userdashboard";
import AdminDashboard from "./admindashboard";
import GamesPage from './Games';
import WordleGame from './Wordle';
import ContactUs from "./ContactUs";
import WellnessPage from "./wellnesspage";
import Tips from "./Tips";
import Blogs from "./blogs";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [wordlePage, setWordlePage] = useState(false);

  const navProps = {
    currentPage: page, // Pass the current state to the Navbar
    goToHome: () => setPage("home"),
    goToLogin: () => setPage("login"),
    goToSignup: () => setPage("signup"),
    goToGames: () => setPage("games"),
    goToContact: () => setPage("contact"),
    goTowellness: () => setPage("wellness"),
    goToBlogs: () => setPage("blogs"),
  };

  return (
    <div className="App">
      {page === "home" && <HomePage {...navProps} />}
      {/* You can now use the spread operator to pass all nav props easily: */}
      {page === "wellness" && <WellnessPage {...navProps} />}
      {page === "contact" && <ContactUs {...navProps} />}
      {page === "games" && <games {...navProps} />}
      {page === "blogs" && <Blogs {...navProps} />}
      {/* ... and so on for all your pages */}
    </div>
  );
  
  
  

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
          goToGames={() => setPage("games")}
          goToContact={() => setPage("contact")}
          goToWellness={() => setPage("wellness")}
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
      {page === "games" && (
        <GamesPage 
        goToHome={() => setPage("home")}
        goToWordle={() => setPage("wordle")} />
        
      )}
      {page === "wordle" && (
        <WordleGame goBack={() => setPage("games")} />
      )}
      {page === "contact" && (
         <ContactUs goToHome={() => setPage("home")} />
     )}
     {page === "wellness" && (
         <WellnessPage goToHome={() => setPage("home")} 
         goToLogin={() => setPage("login")}
         goToSignup={() => setPage("signup")}
         goToGames={() => setPage("games")}
         goToContact={() => setPage("contact")}
         goToTips={() => setPage("tips")}/>
     )}
     {page === "tips" && (
        <Tips goToHome={() => setPage("home")}
        />
      )}
      {page === "blogs" && (
        <Blogs goToHome={() => setPage("home")}
        />
      )}
     

      
    </div>
  );
}

export default App;






