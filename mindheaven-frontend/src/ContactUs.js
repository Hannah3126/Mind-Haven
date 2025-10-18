import React from "react";
import Navbar from "./navbar"; // ✅ use your existing navbar
import "./ContactUs.css";

export default function ContactPage({ goToHome, goToLogin, goToSignup, goToGames, goToContact, goTowellness, goToBlogs }) {
  return (
    <div className="contact-page">
      
      {/* ---------- NAVBAR ---------- */}
      <Navbar
        goToHome={goToHome}
        goToLogin={goToLogin}
        goToSignup={goToSignup}
        goToGames={goToGames}
        goToContact={goToContact}
        goTowellness={goTowellness}
        goToBlogs={goToBlogs}
      />

      {/* ---------- HERO SECTION ---------- */}
      <section className="contact-hero">
        <div className="hero-overlay">
          <div className="hero-text">
            <h2>Contact us</h2>
            <p>We’re here to help. Reach out with any questions or feedback.</p>
          </div>
        </div>
      </section>

      {/* ---------- MAIN CONTACT FORM SECTION ---------- */}
      <section className="contact-main">
        <div className="contact-left">
          <h2>We’d love to hear from you...</h2>
          <p>Reach out with your questions, feedback, or support needs — we’re here to help you every step of the way.</p>

          <div className="contact-details">
            <p><strong>Call :</strong><br />+1 314 224 5896</p>
            <p><strong>Email To:</strong><br />mindheaven@gmail.com</p>
          </div>
        </div>

        <form className="contact-form">
          <div className="form-group">
            <label>First Name:</label>
            <input type="text" placeholder="Enter your first name" />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input type="text" placeholder="Enter your last name" />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" placeholder="Enter your email" />
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input type="text" placeholder="Enter your phone number" />
          </div>
          <div className="form-group">
            <label>Message:</label>
            <textarea placeholder="Enter your message or any questions"></textarea>
          </div>
          <button className="submit-btn">Submit</button>
        </form>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="footer">
  <div className="footer-container">
    {/* ---- Brand ---- */}
    <div className="footer-brand">
      <h3>Mind Heaven</h3>
      <p>Real Stories of growth, healing and positive change.</p>
    </div>

    {/* ---- Links ---- */}
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
        <li>Feedback</li>
      </ul>
    </div>

    {/* ---- Contact Info ---- */}
    <div className="footer-contact">
      <h4>Contact</h4>
      <p>Email: mindheaven@gmail.com</p>
      <p>Phone: +1 234 456 8890</p>
    </div>

    {/* ---- Message Box ---- */}
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
      © 2025 Mind Heaven | Designed with ♡ to make mental health accessible for
      everyone.
    </p>
  </div>
</footer>
    </div>
  );
}
