import React from "react";
import "./blogs.css";
import Navbar from "./navbar";
import "./navbar.css";
import { ArrowRight } from "lucide-react";

export default function BlogPage({
  goToHome,
  goToLogin,
  goToSignup,
  goToGames,
  goToContact,
  goTowellness,
  goToBlogs,
}) {
  return (
    <div className="blogpage">
      {/* ---------- NAVBAR ---------- */}
      <Navbar
        currentPage="blogs"
        goToHome={goToHome}
        goToLogin={goToLogin}
        goToSignup={goToSignup}
        goToGames={goToGames}
        goToContact={goToContact}
        goTowellness={goTowellness}
        goToBlogs={goToBlogs}
      />

      {/* ---------- BLOG PAGE BANNER ---------- */}
      <section className="blog-banner">
        <div className="banner-content">
          <h1>Blogs</h1>
          <p>Read the blogs and get useful insights and advices</p>
        </div>
      </section>

      {/* ---------- BLOG SECTION ---------- */}
      <section className="blog-section">
        <div className="blog-grid">
          {/* Card 1 */}
          <div className="blog-card">
            <img src="/blog1.png" alt="Anxiety" />
            <div className="blog-meta">
              <p className="blog-small-title">Anxiety</p>
              <p className="blog-date">01 July 2025</p>
            </div>
            <h3>Tips to control anxiety</h3>
            <a href="#" className="read-more">
              <ArrowRight size={16} strokeWidth={2.5} />
              Read more
            </a>
          </div>

          {/* Card 2 */}
          <div className="blog-card">
            <img src="/blog2.png" alt="Depression" />
            <div className="blog-meta">
              <p className="blog-small-title">Depression</p>
              <p className="blog-date">01 June 2025</p>
            </div>
            <h3>Tips to reduce depression</h3>
            <a href="#" className="read-more">
              <ArrowRight size={16} strokeWidth={2.5} />
              Read more
            </a>
          </div>

          {/* Card 3 */}
          <div className="blog-card">
            <img src="/blog3.png" alt="Stress management" />
            <div className="blog-meta">
              <p className="blog-small-title">Stress management</p>
              <p className="blog-date">01 January 2025</p>
            </div>
            <h3>Tips to reduce stress</h3>
            <a href="#" className="read-more">
              <ArrowRight size={16} strokeWidth={2.5} />
              Read more
            </a>
          </div>

          {/* Repeat same 3 again for layout symmetry */}
          <div className="blog-card">
            <img src="/blog1.png" alt="Anxiety" />
            <div className="blog-meta">
              <p className="blog-small-title">Emotional</p>
              <p className="blog-date">11 August 2025</p>
            </div>
            <h3>Positive Emotional Tips</h3>
            <a href="#" className="read-more">
              <ArrowRight size={16} strokeWidth={2.5} />
              Read more
            </a>
          </div>

          <div className="blog-card">
            <img src="/blog2.png" alt="Depression" />
            <div className="blog-meta">
              <p className="blog-small-title">Sleep</p>
              <p className="blog-date">03 July 2025</p>
            </div>
            <h3>Tips to improve sleep</h3>
            <a href="#" className="read-more">
              <ArrowRight size={16} strokeWidth={2.5} />
              Read more
            </a>
          </div>

          <div className="blog-card">
            <img src="/blog3.png" alt="Stress management" />
            <div className="blog-meta">
              <p className="blog-small-title">Food Habits</p>
              <p className="blog-date">12 March 2025</p>
            </div>
            <h3>Tips to Healthy Food Habits</h3>
            <a href="#" className="read-more">
              <ArrowRight size={16} strokeWidth={2.5} />
              Read more
            </a>
          </div>
        </div>

        {/* View More button section */}
        
      </section>
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
        <li>Anxiety  </li>
        <li>Depression</li>
        <li>Stess</li>
        <li>Sleep</li>
        <li>Food Habits</li>
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
