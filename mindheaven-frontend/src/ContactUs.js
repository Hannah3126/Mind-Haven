import React from "react";
import Navbar from "./navbar";
import "./ContactUs.css";

export default function ContactPage({
  goToHome,
  goToLogin,
  goToSignup,
  goToGames,
  goToContact,
  goToWellness,
  goToBlogs,
  userEmail,
  userName,
  userRole
}) {
  // Pull from props first, then localStorage, then empty string
  const lsName  = localStorage.getItem("user_name")  || "";
  const lsEmail = localStorage.getItem("user_email") || "";

  const initialFirst = userName || lsName || "";
  const initialEmail = userEmail || lsEmail || "";

  const [firstName, setFirstName] = React.useState(initialFirst);
  const [lastName, setLastName]   = React.useState("");
  const [email, setEmail]         = React.useState(initialEmail);
  const [phone, setPhone]         = React.useState("");
  const [message, setMessage]     = React.useState("");

  // Log once on mount
  React.useEffect(() => {
    console.log("[ContactPage] mounted");
    console.log("[ContactPage] props:", { userName, userEmail, userRole });
    console.log("[ContactPage] localStorage:", {
      "user_name": lsName,
      "user_email": lsEmail,
      "user_id": localStorage.getItem("user_id"),
      "auth_token": localStorage.getItem("auth_token"),
    });
    console.log("[ContactPage] initial state:", { firstName: initialFirst, email: initialEmail });
  }, []); // eslint-disable-line

  // If parent props change after mount, reflect them here
  React.useEffect(() => {
    // Only update if a non-empty value arrives different from current
    if (userName && userName !== firstName) {
      console.log("[ContactPage] updating firstName from props:", userName);
      setFirstName(userName);
    }
    if (userEmail && userEmail !== email) {
      console.log("[ContactPage] updating email from props:", userEmail);
      setEmail(userEmail);
    }
  }, [userName, userEmail]); // eslint-disable-line

  // Handlers with logs to confirm controlled inputs are wiring correctly
  const onChangeFirst = (e) => {
    console.log("[ContactPage] firstName change ->", e.target.value);
    setFirstName(e.target.value);
  };
  const onChangeLast = (e) => {
    console.log("[ContactPage] lastName change ->", e.target.value);
    setLastName(e.target.value);
  };
  const onChangeEmail = (e) => {
    console.log("[ContactPage] email change ->", e.target.value);
    setEmail(e.target.value);
  };
  const onChangePhone = (e) => {
    console.log("[ContactPage] phone change ->", e.target.value);
    setPhone(e.target.value);
  };
  const onChangeMessage = (e) => {
    console.log("[ContactPage] message change ->", e.target.value);
    setMessage(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("[ContactPage] submit payload:", {
      firstName, lastName, email, phone, message
    });
    // do your submit here if needed
  };

  return (
    <div className="contact-page">
      <Navbar
        currentPage="contact"
        goToHome={goToHome}
        goToLogin={goToLogin}
        goToSignup={goToSignup}
        goToGames={goToGames}
        goToContact={goToContact}
        goToWellness={goToWellness}
        goToBlogs={goToBlogs}
        userName={userName}
        userRole={userRole}
        userEmail={userEmail}
      />

      <section className="contact-hero">
        <div className="hero-overlay">
          <div className="hero-text">
            <h2>Contact us</h2>
            <p>We’re here to help. Reach out with any questions or feedback.</p>
          </div>
        </div>
      </section>

      <section className="contact-main">
        <div className="contact-left">
          <h2>We’d love to hear from you...</h2>
          <p>
            Reach out with your questions, feedback, or support needs — we’re here to help you every step of the way.
          </p>

          <div className="contact-details">
            <p><strong>Call :</strong><br />+1 314 224 5896</p>
            <p><strong>Email To:</strong><br />mindheaven@gmail.com</p>
          </div>
        </div>

        <form className="contact-form" onSubmit={onSubmit} autoComplete="on">
          <div className="form-group">
            <label>First Name:</label>
            <input
              type="text"
              value={firstName}
              onChange={onChangeFirst}
              placeholder="Enter your first name"
              name="firstName"
              autoComplete="given-name"
            />
          </div>

          <div className="form-group">
            <label>Last Name:</label>
            <input
              type="text"
              value={lastName}
              onChange={onChangeLast}
              placeholder="Enter your last name"
              name="lastName"
              autoComplete="family-name"
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={onChangeEmail}
              placeholder="Enter your email"
              name="email"
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label>Phone:</label>
            <input
              type="text"
              value={phone}
              onChange={onChangePhone}
              placeholder="Enter your phone number"
              name="phone"
              autoComplete="tel"
            />
          </div>

          <div className="form-group">
            <label>Message:</label>
            <textarea
              value={message}
              onChange={onChangeMessage}
              placeholder="Enter your message or any questions"
              name="message"
            />
          </div>

          <button className="submit-btn" type="submit">Submit</button>
        </form>
      </section>

      <footer className="footer">
        <div className="footer-bottom">
          <p>© 2025 Mind Heaven | Designed with ♡ to make mental health accessible for everyone.</p>
        </div>
      </footer>
    </div>
  );
}