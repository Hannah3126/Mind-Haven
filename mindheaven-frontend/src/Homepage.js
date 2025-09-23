import React from "react";

function HomePage({ goToLogin, goToSignup }) {
  return (
    <div style={styles.pageContainer}>
      {/* Full-screen background image */}
      <img
        src={process.env.PUBLIC_URL + "/Home.jpg"} // Place your background image in public folder
        alt="background"
        style={styles.backgroundImage}
      />

      {/* Gradient overlay */}
      <div style={styles.overlay}></div>

      {/* Floating Card */}
      <div style={styles.card}>
        {/* Logo and Brand */}
        <div style={styles.logoRow}>
          {/* Big Round Logo Image */}
          <img
            src={process.env.PUBLIC_URL + "/logo.png"} // Place your logo in public folder
            alt="Mindheaven Logo"
            style={styles.logoImage}
          />
          <h1 style={styles.brand}>MINDHEAVEN</h1>
        </div>

        {/* Title and Subtitle */}
        <h2 style={styles.title}>Welcome to Mindheaven</h2>
        <p style={styles.subtitle}>
          Explore mindfulness, meditation, and a supportive community.
        </p>

        {/* Buttons */}
        <div style={styles.actions}>
          <button style={styles.primaryBtn} onClick={goToLogin}>
            Login
          </button>
          
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    position: "relative",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Inter', sans-serif",
    overflow: "hidden",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: -2,
    transform: "scale(1.05)", // slight zoom for depth effect
    transition: "transform 10s ease-in-out infinite alternate",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6))",
    zIndex: -1,
  },
  card: {
    position: "relative",
    zIndex: 1,
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(16px)",
    padding: "50px",
    borderRadius: "25px",
    textAlign: "center",
    maxWidth: "550px",
    width: "90%",
    boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
    animation: "float 6s ease-in-out infinite",
    color: "#fff",
    transition: "transform 0.3s, box-shadow 0.3s",
  },
  logoRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px", // more spacing for bigger logo
    marginBottom: "20px",
  },
  logoImage: {
    width: "80px",          // bigger size
    height: "80px",         // same as width for perfect circle
    objectFit: "cover",     // fills circle without distortion
    borderRadius: "50%",    // makes it round
    border: "3px solid #8EC5FC", // optional border for style
  },
  brand: {
    fontSize: "28px",
    fontWeight: "800",
    background: "linear-gradient(90deg, #8EC5FC, #E0C3FC)",
    WebkitBackgroundClip: "text",
    color: "transparent",
  },
  title: {
    fontSize: "30px",
    marginBottom: "16px",
    fontWeight: "700",
  },
  subtitle: {
    fontSize: "16px",
    marginBottom: "32px",
    color: "#ddd",
    lineHeight: "1.5",
  },
  actions: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  primaryBtn: {
    padding: "16px 32px",
    borderRadius: "14px",
    border: "none",
    background: "linear-gradient(90deg, #8EC5FC, #E0C3FC)",
    color: "#000",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  secondaryBtn: {
    padding: "16px 32px",
    borderRadius: "14px",
    border: "1px solid #8EC5FC",
    background: "transparent",
    color: "#8EC5FC",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
};

// Floating card animation
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
    100% { transform: translateY(0px); }
  }
`, styleSheet.cssRules.length);

// Button hover effect
styleSheet.insertRule(`
  button:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.4);
  }
`, styleSheet.cssRules.length);

export default HomePage;

 
