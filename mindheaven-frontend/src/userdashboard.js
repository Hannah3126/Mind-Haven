
import React from "react";
import Logo from "./Logo";

function Section({ title, items }) {
return (
<div style={{ margin: "20px 0" }}> <h3>{title}</h3>
<div style={{ display: "flex", gap: "12px", overflowX: "auto" }}>
{items.map((it, i) => (
<div
key={i}
style={{
minWidth: "200px",
padding: "12px",
background: "#222",
borderRadius: "12px",
}}
> <h4>{it.title}</h4>
<p style={{ fontSize: "13px" }}>{it.preview}</p> </div>
))} </div> </div>
);
}

function UserDashboard({ onLogout, userEmail }) {
const blogs = [
{ title: "5 Ways to Reduce Stress", preview: "Simple daily habits..." },
{ title: "Meditation Basics", preview: "How to start today..." },
];
const videos = [
{ title: "Mindfulness 101", preview: "Video intro..." },
{ title: "Yoga for Anxiety", preview: "Follow along..." },
];
const forums = [
{ title: "Coping with Exams", preview: "Share tips..." },
{ title: "Workplace Stress", preview: "Discuss burnout..." },
];

return ( <div className="page page-centered">
<div className="card" style={{ maxWidth: "800px" }}> <div className="brand-row"> <Logo /> <h1 className="brand">MindHeaven</h1> </div> <h2 className="title">Welcome, {userEmail || "User"}</h2> <Section title="Recommended Blogs" items={blogs} /> <Section title="Videos & Podcasts" items={videos} /> <Section title="Community Highlights" items={forums} />
<div className="actions" style={{ marginTop: "20px" }}> <button className="btn secondary" onClick={onLogout}>
Logout </button> </div> </div> </div>
);
}

export default UserDashboard;
