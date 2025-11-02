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
  // ✅ Blog data with external links
  const blogs = [
    {
      title: "Tips to control anxiety",
      category: "Anxiety",
      date: "01 July 2025",
      img: "/blog1.png",
      link: "https://www.healthline.com/health/how-to-calm-anxiety",
    },
    {
      title: "Tips to reduce depression",
      category: "Depression",
      date: "01 June 2025",
      img: "/blog2.png",
      link: "https://www.nimh.nih.gov/health/topics/depression",
    },
    {
      title: "Tips to reduce stress",
      category: "Stress Management",
      date: "01 January 2025",
      img: "/blog3.png",
      link: "https://www.apa.org/topics/stress/tips",
    },
    {
      title: "Positive Emotional Tips",
      category: "Emotional",
      date: "11 August 2025",
      img: "/blog1.png",
      link: "https://newsinhealth.nih.gov/2015/08/positive-emotions-your-health",
    },
    {
      title: "Tips to improve sleep",
      category: "Sleep",
      date: "03 July 2025",
      img: "/blog2.png",
      link: "https://www.sleepfoundation.org/sleep-hygiene/healthy-sleep-tips",
    },
    {
      title: "Tips to Healthy Food Habits",
      category: "Food Habits",
      date: "12 March 2025",
      img: "/blog3.png",
      link: "https://www.cdc.gov/healthyweight/healthy_eating/index.html",
    },
  ];

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
          <p>Read the blogs and get useful insights and advice</p>
        </div>
      </section>

      {/* ---------- BLOG SECTION ---------- */}
      <section className="blog-section">
        <div className="blog-grid">
          {blogs.map((blog, index) => (
            <div key={index} className="blog-card">
              <img src={blog.img} alt={blog.category} />
              <div className="blog-meta">
                <p className="blog-small-title">{blog.category}</p>
                <p className="blog-date">{blog.date}</p>
              </div>
              <h3>{blog.title}</h3>
              <a
                href={blog.link}
                target="_blank"
                rel="noopener noreferrer"
                className="read-more"
              >
                <ArrowRight size={16} strokeWidth={2.5} />
                &nbsp; Read more
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="footer">
        <div className="footer-container">
          {/* ---- Brand ---- */}
          <div className="footer-brand">
            <h3>Mind Heaven</h3>
            <p>Real stories of growth, healing, and positive change.</p>
          </div>

          {/* ---- Links ---- */}
          <div className="footer-links">
            <ul>
              <li onClick={goToHome}>Home</li>
              <li onClick={goTowellness}>Wellness</li>
              <li onClick={goToGames}>Games</li>
              <li onClick={goToBlogs}>Blog</li>
              <li onClick={goToContact}>Contact Us</li>
            </ul>

            <ul>
              <li>Anxiety</li>
              <li>Depression</li>
              <li>Stress</li>
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
            © 2025 Mind Heaven | Designed with ♡ to make mental health
            accessible for everyone.
          </p>
        </div>
      </footer>
    </div>
  );
}
