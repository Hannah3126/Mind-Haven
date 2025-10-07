

import React from "react";
import "./App.css";

function HomePage({ goToLogin, goToSignup }) {
  return (
    <div className="homepage">
      {/* ---------- NAVBAR ---------- */}
      <nav className="navbar">
        <div className="logo">Mind Heaven</div>
        <ul className="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">Wellness</a></li>
          <li><a href="#">Games</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">Blogs</a></li>
        </ul>
        <div className="nav-buttons">
          <button className="nav-btn" onClick={goToLogin}>Login</button>
          <button className="nav-btn signup-btn" onClick={goToSignup}>Sign Up</button>
        </div>
      </nav>

      {/* ---------- HERO SECTION ---------- */}
      <section className="hero-section">
        <div className="hero-text">
          <h1>Your mind deserves the same care as your body</h1>
          <p>Nurture it with peace and balance.</p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={goToLogin}>
              Explore Wellness
            </button>
            <button className="btn-secondary">View Blogs</button>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
            alt="Meditation illustration"
          />
        </div>
      </section>

      {/* ---------- FEATURES SECTION ---------- */}
      <section className="features-section">
        <h2>What we provide</h2>
        <p>Everything you need for a healthier, calmer mind</p>
        <div className="features-grid">
          <div className="feature-card">
            <h3>🧘‍♀️ Meditation & Exercise</h3>
            <p>Practice mindfulness and energize your body with guided sessions.</p>
          </div>
          <div className="feature-card">
            <h3>🎵 Songs & Music</h3>
            <p>Boost your spirit with soothing playlists made for your mood.</p>
          </div>
          <div className="feature-card">
            <h3>🧠 Thought Tracker</h3>
            <p>Record, reflect, and track your emotions with ease.</p>
          </div>
          <div className="feature-card">
            <h3>💡 Mental Health Tips</h3>
            <p>Simple science-based advice for everyday wellness.</p>
          </div>
          <div className="feature-card">
            <h3>🎮 Games</h3>
            <p>Fun ways to reduce stress while staying mindful.</p>
          </div>
          <div className="feature-card">
            <h3>📝 Blogs</h3>
            <p>Explore expert insights and personal stories that inspire growth.</p>
          </div>
        </div>
      </section>

      {/* ---------- STATS SECTION ---------- */}
      <section className="stats-section">
        <h2>Did you know?</h2>
        <p>The truth about mental health</p>
        <div className="stats-grid">
          <div className="stat">
            <h3>1+</h3>
            <p>People live with a mental health disorder</p>
          </div>
          <div className="stat">
            <h3>7 Lakh</h3>
            <p>Lose their lives to suicide each year</p>
          </div>
          <div className="stat">
            <h3>1 in 7</h3>
            <p>Individuals experience a mental health condition</p>
          </div>
          <div className="stat">
            <h3>$1 Trillion/yr</h3>
            <p>Depression & anxiety cost the global economy annually</p>
          </div>
        </div>
      </section>

      {/* ---------- BLOG SECTION ---------- */}
      <section className="blog-section">
        <h2>Blogs Section</h2>
        <p>Articles and tips to improve mental health</p>
        <div className="blog-grid">
          <div className="blog-card">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3458/3458595.png"
              alt="Anxiety"
            />
            <h3>Tips to control anxiety</h3>
            <p>Learn simple methods to manage anxiety effectively.</p>
          </div>
          <div className="blog-card">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3940/3940056.png"
              alt="Depression"
            />
            <h3>Tips to reduce depression</h3>
            <p>Discover ways to improve your mood naturally.</p>
          </div>
          <div className="blog-card">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4825/4825112.png"
              alt="Stress management"
            />
            <h3>Tips to reduce stress</h3>
            <p>Balance your life with relaxation and mindfulness.</p>
          </div>
        </div>
      </section>

      {/* ---------- TESTIMONIAL SECTION ---------- */}
      <section className="testimonial-section">
        <h2>Hear from our users</h2>
        <p>Real stories of growth, healing, and positive change</p>
        <div className="testimonial-grid">
          <div className="testimonial">
            <p>
              “Mind Heaven helped me overcome my anxiety and brought peace into my daily routine.”
            </p>
            <h4>— Roger Workman</h4>
          </div>
          <div className="testimonial">
            <p>
              “The meditation and games are so helpful! My mental health has improved significantly.”
            </p>
            <h4>— Aditi Sharma</h4>
          </div>
        </div>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="footer">
        <p>© 2025 Mind Heaven | Designed to make mental health accessible for everyone.</p>
      </footer>
    </div>
  );
}

export default HomePage;

