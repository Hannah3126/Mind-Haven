

import React from "react";
import "./App.css";
import { Brain, Music, Flower, Lightbulb, Gamepad2, BookOpen } from "lucide-react";
import { ArrowUpRight } from "lucide-react";





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
          <li><a href="#">Blogs</a></li>
          <li><a href="#">Contact Us</a></li>
        </ul>
        <div className="nav-buttons">
          <button className="nav-btn" onClick={goToLogin}>Login</button>
          <button className="nav-btn signup-btn" onClick={goToSignup}>Sign Up</button>
        </div>
      </nav>

      {/* ---------- HERO SECTION ---------- */}
      
<section
  className="hero-section"
  style={{
    // backgroundImage: `url(${process.env.PUBLIC_URL + '/Home.png'})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    color: "#fff",
    padding: "70px 70px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: "25px",
    minHeight: "60vh",
    position: "relative",
    zIndex: 1,
    margin: "10px auto 40px auto",
    width: "85%",
    overflow: "hidden",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
  }}
>
  <div
    className="hero-text"
    style={{
      maxWidth: "70%",
      padding: "20px 0",
      textAlign: "left",
    }}
  >
    <h1
      style={{
        
        color: "black",
        fontSize: "2.2rem",
        marginBottom: "12px",
        lineHeight: "1.2",
        fontWeight: "600",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        textShadow: "2px 2px 6px rgba(0, 0, 0, 0.4)", // makes text readable on bright areas
      }}
    >
      Your mind deserves the same care as your body
    </h1>

    <p
      style={{
        color: "black",
        fontSize: "1rem",
        marginBottom: "20px",
        textShadow: "1px 1px 4px rgba(0, 0, 0, 0.4)",
      }}
    >
      Nurture it with peace and balance.
    </p>

    <div className="hero-buttons" style={{ display: "flex", gap: "12px" }}>
      <button
        className="btn-primary"
        style={{
          backgroundColor: "#4c6ef5",
          color: "#fff",
          padding: "10px 22px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "600",
        }}
        onClick={goToLogin}
      >
        Explore Wellness
      </button>

      <button
        className="btn-secondary"
        style={{
          backgroundColor: "#fff",
          color: "#4c6ef5",
          padding: "10px 22px",
          border: "2px solid #4a90e2",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "600",
          
        }}
      >
        View Blogs
      </button>
    </div>
  </div>
</section>











      {/* ---------- FEATURES SECTION ---------- */}
      <section className="features-section">
        <h2 className="feature-title" style={{ color: "black" }}>
  What we <span style={{ color: "#4c6ef5" }}>provide</span>
</h2>
        <p>Everything you need for a healthier, calmer mind</p>
        <div className="features-grid">
          <div className="feature-card">
            <a href="/meditation" className="arrow-icon">
                 <ArrowUpRight  color="black" />
            </a>
            <div className="feature-icon">
              <Flower size={80} color="#a78bfa" strokeWidth={1.5} />
            </div>
            <h3>Meditation & Exercise</h3>
            <p>Practice mindfulness and energize your body with guided sessions.</p>
          </div>
          <div className="feature-card">
            <a href="/songs" className="arrow-icon">
                 <ArrowUpRight  color="black" />
            </a>
            <div className="feature-icon">
              <Music size={48} color="#4c6ef5" strokeWidth={1.5} />
            </div>
            <h3> Songs & Music</h3>
            <p>Boost your spirit with soothing playlists made for your mood.</p>
          </div>
          <div className="feature-card">
            <a href="/Tracker" className="arrow-icon">
                 <ArrowUpRight  color="black" />
            </a>
            <div className="feature-icon">
              <Brain size={48} color="#38bdf8" strokeWidth={1.5} />
            </div>
            <h3> Thought Tracker</h3>
            <p>Record, reflect, and track your emotions with ease.</p>
          </div>
          <div className="feature-card">
            <a href="/tips" className="arrow-icon">
                 <ArrowUpRight  color="black" />
            </a>
            <div className="feature-icon">
              <Lightbulb size={48} color="#fbbf24" strokeWidth={1.5} />
            </div>
            <h3> Mental Health Tips</h3>
            <p>Simple science-based advice for everyday wellness.</p>
          </div>
          <div className="feature-card">
            <a href="/games" className="arrow-icon">
                 <ArrowUpRight  color="black" />
            </a>
            <div className="feature-icon">
              <Gamepad2 size={48} color="#34d399" strokeWidth={1.5} />
            </div>
            <h3> Games</h3>
            <p>Fun ways to reduce stress while staying mindful.</p>
          </div>
          <div className="feature-card">
            <a href="/blogs" className="arrow-icon">
                 <ArrowUpRight  color="black" />
            </a>
            <div className="feature-icon">
              <BookOpen size={48} color="#f472b6" strokeWidth={1.5} />
            </div>
            <h3> Blogs</h3>
            <p>Explore expert insights and personal stories that inspire growth.</p>
          </div>
        </div>
      </section>

      {/* ---------- STATS SECTION ---------- */}
      <section className="did-you-know-section">
  <div className="did-you-know-card">
    <h2>Did you know<span className="question-mark">?</span></h2>
    <p className="subtitle">The Truth About Mental Health</p>
    <p className="description">
      Good mental health is the foundation of a happy and meaningful life. 
      It allows us to manage stress, build strong relationships, and make positive choices. 
      A healthy mind leads to inner peace and personal growth.
    </p>
    <button className="learn-more-btn">Learn more</button>
  </div>

  <div className="did-you-know-stats">
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
      <p>Adolescents experience a mental health condition</p>
    </div>
    <div className="stat">
      <h3>5%</h3>
      <p>Adults are affected by depression</p>
    </div>
    <div className="stat">
      <h3>75%</h3>
      <p>People in low-income countries receive no treatment</p>
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

