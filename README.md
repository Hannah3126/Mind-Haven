Mindheaven – Mental Health Support Prototype

Overview -
Mindheaven is a web-based mental health support platform prototype.

This is Sprint 1 deliverable, which demonstrates:
A login and signup system,
Role-based dashboards -
Admin Dashboard: View all registered users
User Dashboard: Sections with blogs, videos, and forums,
Backend built with Node.js, Express, and SQLite for authentication and user storage
Frontend built with React.

Project Structure -

mindheaven-prototype/
  mindheaven-frontend/   React app
    public/              index.html and static assets
    src/                 React components
    package.json         frontend dependencies

  mindheaven-backend/    Node.js + Express server
    server.js            API routes
    package.json         backend dependencies

  README.md              project documentation
  .gitignore             ignores node_modules and users.db

Setup Instructions -

1. Clone the Repository
git clone https://github.com/your-username/mindheaven-prototype.git
cd mindheaven-prototype

2. Backend Setup
cd mindheaven-backend
npm install
node server.js

IT will create a local SQLite database (users.db) with predefined users -
Admin: admin@mindheaven.com
 / admin123

User: user@mindheaven.com
 / user123

It will also start backend server at http://localhost:5000.


3. Frontend Setup -

cd mindheaven-frontend
npm install
npm start

It will start React app at http://localhost:3000.


Sprint 1 Scope -

Login and signup with database integration,
Role-based dashboards (Admin and User),
Styled UI with branding and password toggle,
Dummy data for blogs, videos, forums.

Next Steps (Sprint 2) -

Admin actions (promote user, delete user),
User features (chatbot, forums, virtual meeting features),
Profile edit (user can update info).
