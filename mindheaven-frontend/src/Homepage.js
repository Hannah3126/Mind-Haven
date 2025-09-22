import React from "react";

function HomePage({ goToLogin }) {
  return (
    <div className="home">
      <div className="overlay">
        <header className="header">
          <h1 className="logo">Mindheaven</h1>
          <nav>
            <button className="btn primary" onClick={goToLogin}>
              Login / Sign Up
            </button>
          </nav>
        </header>

        <main className="content">
          <h2>Your mental wellness, reimagined</h2>
          <p>
            Mindheaven helps you explore guided resources, calming videos, and a
            supportive community.
          </p>
          <button className="btn secondary" onClick={goToLogin}>
            Get Started
          </button>
        </main>
      </div>

      <style>{`
        .home {
          min-height: 100vh;
          background: url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop') 
            center/cover no-repeat;
          display: flex;
          flex-direction: column;
        }
        .overlay {
          background: rgba(0, 0, 0, 0.6);
          color: #fff;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 40px;
        }
        .logo {
          font-size: 26px;
          font-weight: 700;
          background: linear-gradient(90deg, #8EC5FC, #E0C3FC);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .content {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 0 20px;
        }
        .content h2 {
          font-size: 36px;
          margin-bottom: 16px;
        }
        .content p {
          font-size: 18px;
          max-width: 600px;
          margin-bottom: 24px;
        }
        .btn {
          padding: 12px 20px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          font-size: 16px;
        }
        .btn.primary {
          background: linear-gradient(90deg, #8EC5FC, #E0C3FC);
          color: #000;
          font-weight: 600;
        }
        .btn.secondary {
          background: rgba(255, 255, 255, 0.2);
          color: #fff;
        }
      `}</style>
    </div>
  );
}

export default HomePage;

 
