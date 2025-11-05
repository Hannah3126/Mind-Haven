// Navbar.js

import React from "react";

const Navbar = ({ 
  currentPage, 
  goToHome, 
  goToLogin, 
  goToSignup, 
  goToGames, 
  goToContact, 
  goToWellness, 
  goToBlogs,
  onLogout
}) => {

  const userName = localStorage.getItem("user_name");
  const isLoggedIn = !!userName;

  const isActive = (pageName) => currentPage === pageName ? "active" : "";

  return (
    <nav className="navbar">
      <div className="logo" onClick={goToHome}>Mind Heaven</div>

      <ul className="nav-links">
        <li><a href="#" onClick={goToHome} className={isActive("home")}>Home</a></li>
        <li><a href="#" onClick={goToWellness} className={isActive("wellness")}>Wellness</a></li>
        <li><a href="#" onClick={goToGames} className={isActive("games")}>Games</a></li>
        <li><a href="#" onClick={goToBlogs} className={isActive("blogs")}>Blogs</a></li>
        <li><a href="#" onClick={goToContact} className={isActive("contact")}>Contact Us</a></li>
      </ul>

      <div className="nav-buttons">
        {isLoggedIn ? (
          <>
            <span className="welcome-text">Hi, {userName.split(" ")[0]} 🌼</span>
            <button 
              className="nav-btn logout-btn"
              onClick={() => {
                localStorage.clear();
                onLogout && onLogout();
                goToHome();
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="nav-btn" onClick={goToLogin}>Login</button>
            <button className="nav-btn signup-btn" onClick={goToSignup}>Sign Up</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;