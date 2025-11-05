import React from "react";
import Navbar from "./navbar";
import "./Appointment.css";

export default function AppointmentPage({ goToHome, goToLogin, goToSignup, goToGames, goToContact, goToWellness, goToBlogs, userRole, userEmail,userName }) {
  const [name, setName] = React.useState(userName || "");
  const [email, setEmail] = React.useState(userEmail || "");


  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page refresh
    console.log("Booking Data:", { name, email,});
    alert("Appointment Recorded")
  }

  return (
    <div className="appointment-page">

      {/* ---------- NAVBAR ---------- */}
      <Navbar
        currentPage="appointements"
        goToHome={goToHome}
        goToLogin={goToLogin}
        goToSignup={goToSignup}
        goToGames={goToGames}
        goToContact={goToContact}
        goToWellness={goToWellness}
        goToBlogs={goToBlogs}
        userName={userName}    // ✅ show logged in name
        userRole={userRole}
        userEmail={userEmail}
      />

      {/* ---------- HERO SECTION ---------- */}
      <section className="appointment-hero">
        <div className="hero-overlay">
          <div className="hero-text">
            <h2>Book an Appointment</h2>
            <p>Schedule a session with our experts at your convenience.</p>
          </div>
        </div>
      </section>

      {/* ---------- MAIN FORM SECTION ---------- */}
      <section className="appointment-main">
        <div className="appointment-left">
          <h2>We’re here for you...</h2>
          <p>Choose a date and time that works best for you. Our team is ready to support your journey toward mental wellness.</p>

          <div className="appointment-details">
            <p><strong>Call :</strong><br />+1 314 224 5896</p>
            <p><strong>Email :</strong><br />appointments@mindheaven.com</p>
            <p><strong>Address :</strong><br />123 Wellness Blvd, Mind City</p>
          </div>
        </div>

        <form className="appointment-form">
        <div className="form-group">
          <label>Full Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
          <div className="form-group">
            <label>Phone:</label>
            <input type="text" placeholder="Enter your phone number" />
          </div>
          <div className="form-group">
            <label>Preferred Date:</label>
            <input type="date" />
          </div>
          <div className="form-group">
            <label>Preferred Time:</label>
            <input type="time" />
          </div>
          <div className="form-group">
            <label>Additional Notes:</label>
            <textarea placeholder="Any specific concerns or questions?"></textarea>
          </div>
          <button className="submit-btn">Book Now</button>
        </form>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <h3>Mind Heaven</h3>
            <p>Real Stories of growth, healing and positive change.</p>
          </div>

          <div className="footer-links">
            <ul>
              <li>Home</li>
              <li>Wellness</li>
              <li>Games</li>
              <li>Blog</li>
              <li>Contact Us</li>
            </ul>

            <ul>
              <li>Phone</li>
              <li>Mail To</li>
              <li>Drop Your Message</li>
              <li>Book Now</li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Contact</h4>
            <p>Email: appointments@mindheaven.com</p>
            <p>Phone: +1 314 224 5896</p>
          </div>

          <div className="footer-message-box">
            <textarea
              className="footer-textarea"
              placeholder="Type your message..."
            ></textarea>
            <button className="footer-send-btn">Send</button>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © 2025 Mind Heaven | Designed with ♡ to make mental health accessible for everyone.
          </p>
        </div>
      </footer>

    </div>
  );
}
