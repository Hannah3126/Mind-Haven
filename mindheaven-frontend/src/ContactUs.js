import React, { useState } from "react";
import "./ContactUs.css";

function ContactUs({ goToHome, goToLogin, goToSignup, goToGames, goToContact }) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Thank you for contacting us! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
     <div className="contact-page">
      {/* ✅ SAME NAVBAR AS HOMEPAGE */}
      <nav className="navbar">
        <div className="logo">Mind Heaven</div>
        <ul className="nav-links">
          <li><a href="#" onClick={goToHome}>Home</a></li>
          <li><a href="#">Wellness</a></li>
          <li><a href="#" onClick={goToGames}>Games</a></li>
          <li><a href="#">Blogs</a></li>
          <li><a href="#" onClick={goToContact}>ContactUs</a></li>
        </ul>
        
      </nav>
      {/* Contact Section */}
      <div className="contact-container">
        <h2>Contact Us</h2>
        <p className="contact-desc">
          Have questions, feedback, or just want to reach out?  
          Fill in the form below and we’ll respond as soon as possible.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Type your message here..."
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">
            Send Message
          </button>
        </form>

        {/* Contact Info Section */}
        <div className="contact-info">
          <h3>Our Contact Information</h3>
          <p>
            📍 <strong>Location:</strong> 123 Mind Street, Serenity City, USA
          </p>
          <p>
            📞 <strong>Phone:</strong> +1 (555) 987-6543
          </p>
          <p>
            ✉️ <strong>Email:</strong> support@mindheaven.com
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="contact-footer">
        <p>© {new Date().getFullYear()} Mind Heaven. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default ContactUs;

