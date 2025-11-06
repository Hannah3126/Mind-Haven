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
  
  // ✅ pull from localStorage correctly
  const userId = localStorage.getItem("user_id");
  const storedName = localStorage.getItem("user_name");
  
  // ✅ logged in check
  const isLoggedIn = !!userId && !!storedName;

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
            <span className="welcome-text">
              Hi, {storedName.split(" ")[0]} 🌼
            </span>

            <button 
              className="nav-btn logout-btn"
              onClick={() => {
                // ✅ only remove auth keys, not everything
                localStorage.removeItem("user_id");
                localStorage.removeItem("user_name");

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