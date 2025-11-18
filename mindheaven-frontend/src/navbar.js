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
  goToChatbot,
  goToProfile,
  goToAdminDashboard,
  onLogout
  }) => {
  
  // ✅ pull from localStorage correctly
  const userId = localStorage.getItem("user_id");
  const storedName = localStorage.getItem("user_name");
  const storedRole = localStorage.getItem("user_role");          // "admin" or "user"
  //const isLoggedIn = !!userId && !!storedName && !!storedRole;
  const isActive = (pageName) => currentPage === pageName ? "active" : "";
  const userRole = localStorage.getItem("user_role");
  const isLoggedIn = !!storedRole;

  return (
    <nav className="navbar">
      <div className="logo" onClick={goToHome}>Mind Heaven</div>

      <ul className="nav-links">
        <li><a href="#" onClick={goToHome} className={isActive("home")}>Home</a></li>
        <li><a href="#" onClick={goToWellness} className={isActive("wellness")}>Wellness</a></li>
        <li><a href="#" onClick={goToGames} className={isActive("games")}>Games</a></li>
        <li><a href="#" onClick={goToBlogs} className={isActive("blogs")}>Blogs</a></li>
        <li><a href="#" onClick={goToContact} className={isActive("contact")}>Contact Us</a></li>
        <li><a href="#" onClick={goToChatbot} className={isActive("chatbot")}>Chatbot</a></li>
        {storedRole === "admin" && (<li><a href="#" onClick={goToAdminDashboard} className={isActive("Admin")}>Admin</a></li>)}
      </ul>


      <div className="nav-buttons">
        {isLoggedIn ? (
          <>
            <span className="welcome-text"
              onClick={goToProfile}>
                Hi, {(storedName || (storedRole === "admin" ? "Admin" : "Friend")).split(" ")[0]} 🌼
              {/* Hi, {storedName.split(" ")[0]} 🌼 */}
            </span>

            <button 
              className="nav-btn logout-btn"
              onClick={() => {
                // ✅ only remove auth keys, not everything
                localStorage.removeItem("user_id");
                localStorage.removeItem("user_name");
                localStorage.removeItem("user_email");
                localStorage.removeItem("user_role");

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