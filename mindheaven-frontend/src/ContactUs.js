import React, { useState } from "react";
import "./ContactUs.css";

function ContactUs({ goToHome }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting us! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-page">
      {/* ✅ Navbar */}
      <nav className="navbar">
        <div className="logo" onClick={goToHome}>
          Mind Heaven
        </div>
        <ul className="nav-links">
          <li>
            <a href="#" onClick={goToHome}>
              Home
            </a>
          </li>
        </ul>
      </nav>

      {/* ✅ Contact Form Section */}
      <div className="contact-container">
        <h2>Contact Us</h2>
        <p className="contact-desc">
          Have questions, feedback, or just want to reach out?  
          Fill in the form below and we’ll respond as soon as possible.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit" className="submit-btn">
            Send Message
          </button>
        </form>
        

    

      </div>
    </div>
  );
}

export default ContactUs;
