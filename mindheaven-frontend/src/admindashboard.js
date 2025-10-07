import React, { useEffect, useState } from "react";
import Logo from "./Logo";

function AdminDashboard({ onLogout, userEmail }) {
const [users, setUsers] = useState([]);

useEffect(() => {
setUsers([
{ id: 1, email: "[user1@example.com](mailto:user1@example.com)", role: "user" },
{ id: 2, email: "[user2@example.com](mailto:user2@example.com)", role: "user" },
]);
}, []);

return ( <div className="page page-centered">
<div className="card" style={{ maxWidth: "800px" }}> <div className="brand-row"> <Logo /> <h1 className="brand">MindHeaven Admin</h1> </div> <h2 className="title">Welcome, {userEmail}</h2>
<table
style={{
width: "100%",
marginTop: "12px",
borderCollapse: "collapse",
}}
> <thead> <tr>
<th style={{ borderBottom: "1px solid #555" }}>ID</th>
<th style={{ borderBottom: "1px solid #555" }}>Email</th>
<th style={{ borderBottom: "1px solid #555" }}>Role</th> </tr> </thead> <tbody>
{users.map((u) => ( <tr key={u.id}> <td>{u.id}</td> <td>{u.email}</td> <td>{u.role}</td> </tr>
))} </tbody> </table>
<div className="actions" style={{ marginTop: "20px" }}> <button className="btn secondary" onClick={onLogout}>
Logout </button> </div> </div> </div>
);
}

export default AdminDashboard;
