import React from "react";
import Navbar from "./navbar";
import "./Appointment.css";
import { CSSTransition, SwitchTransition } from "react-transition-group";

export default function AppointmentPage({
  goToHome, goToLogin, goToSignup, goToGames, goToContact,
  goToWellness, goToBlogs, userRole, userEmail, userName
}) {

  const [name, setName] = React.useState(userName || "");
  const [email, setEmail] = React.useState(userEmail || "");
  const [phone, setPhone] = React.useState("");
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");
  const [notes, setNotes] = React.useState("");

  const [showAppointments, setShowAppointments] = React.useState(false);
  const [appointments, setAppointments] = React.useState([]);

  // ✅ React 18 fix refs
  const formRef = React.useRef(null);
  const apptRef = React.useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("user_id");

    const payload = { userId, name, email, phone, date, time, notes };

    try {
      const res = await fetch("http://localhost:5050/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!data.success) {
        alert("Error booking appointment");
        return;
      }

      alert("✅ Appointment booked successfully!");
      setPhone(""); setDate(""); setTime(""); setNotes("");

    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again.");
    }
  };

  const loadAppointments = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/getAppointmentsByEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      if (data.success) setAppointments(data.appointments);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="appointment-page">

      <Navbar
        currentPage="appointments"
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

      <section className="appointment-hero">
        <div className="hero-overlay">
          <div className="hero-text">
            <h2>Book an Appointment</h2>
            <p>Schedule a session with our experts at your convenience.</p>
          </div>
        </div>
      </section>

      <section className="appointment-main">

        <div className="appointment-left">
          <h2>We’re here for you...</h2>
          <p>Choose a date and time that works best for you.</p>

          <div className="appointment-details">
            <p><strong>Call :</strong><br />+1 314 224 5896</p>
            <p><strong>Email :</strong><br />appointments@mindheaven.com</p>
            <p><strong>Address :</strong><br />123 Wellness Blvd, Mind City</p>
          </div>
        </div>


        {/* ✅ Animated Card */}
        <div className="appointment-card">
          <SwitchTransition mode="out-in">
            <CSSTransition
              key={showAppointments ? "appointments" : "form"}
              timeout={300}
              classNames="fade-slide"
              nodeRef={showAppointments ? apptRef : formRef}
            >
              <div ref={showAppointments ? apptRef : formRef}>
                
                {/* ✅ FORM */}
                {!showAppointments && (
                  <form className="appointment-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label>Full Name:</label>
                      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="form-group">
                      <label>Email:</label>
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="form-group">
                      <label>Phone:</label>
                      <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>

                    <div className="form-group">
                      <label>Preferred Date:</label>
                      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>

                    <div className="form-group">
                      <label>Preferred Time:</label>
                      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                    </div>

                    <div className="form-group">
                      <label>Additional Notes:</label>
                      <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
                    </div>

                    <div className="button-row">
                      <button className="submit-btn" type="submit">Book Now</button>
                      <button type="button" className="secondary-btn"
                        onClick={() => { loadAppointments(); setShowAppointments(true); }}>
                        View Appointments
                      </button>
                    </div>
                  </form>
                )}

                {/* ✅ APPOINTMENTS */}
                {showAppointments && (
                  <div className="appointments-panel">
                    <h3>Your Appointments</h3>

                    {appointments.length === 0 && <p>No appointments found</p>}

                    {appointments.map((appt) => (
                      <div key={appt.id} className="appointment-item">
                        <p><strong>Date:</strong> {appt.date}</p>
                        <p><strong>Time:</strong> {appt.time}</p>
                        <p><strong>Notes:</strong> {appt.notes}</p>
                      </div>
                    ))}

                    <button className="secondary-btn"
                      onClick={() => setShowAppointments(false)}>
                      Back to Booking
                    </button>
                  </div>
                )}
              </div>
            </CSSTransition>
          </SwitchTransition>
        </div>

      </section>

      <footer className="footer">
        <div className="footer-bottom">
          <p>© 2025 Mind Heaven | Designed with ♡ for your wellbeing.</p>
        </div>
      </footer>

    </div>
  );
}