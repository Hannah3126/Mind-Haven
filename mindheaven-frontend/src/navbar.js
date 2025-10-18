// Navbar.js

import React from "react";
// Import any necessary icons if you use them here, though your current JSX doesn't.

// Navbar must accept props for navigation (goTo...) and to know the current page.
const Navbar = ({ currentPage, goToHome, goToLogin, goToSignup, goToGames, goToContact, goTowellness, goToBlogs }) => {
  
  // Helper to apply 'active' class (assuming you pass currentPage from App.js)
  const isActive = (pageName) => currentPage === pageName ? 'active' : '';

  return (
    <nav className="navbar">
      <div className="logo" onClick={goToHome}>Mind Heaven</div>
      <ul className="nav-links">
        {/* Pass currentPage (e.g., "home") from App.js to check if the link is active */}
        <li><a href="#" onClick={goToHome} className={isActive("home")}>Home</a></li>
        <li><a href="#" onClick={goTowellness} className={isActive("wellness")}>Wellness</a></li>
        <li><a href="#" onClick={goToGames} className={isActive("games")}>Games</a></li>
        <li><a href="#" onClick={goToBlogs} className={isActive("blogs")}>Blogs</a></li>
        <li><a href="#" onClick={goToContact} className={isActive("contact")}>ContactUs</a></li>
      </ul>
      <div className="nav-buttons">
        <button className="nav-btn" onClick={goToLogin}>Login</button>
        <button className="nav-btn signup-btn" onClick={goToSignup}>Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;