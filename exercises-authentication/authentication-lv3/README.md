# Authentication Level 3 — Hashing & Salting with Passport.js

A Node.js/Express web application that demonstrates **Level 3 authentication**: password hashing and salting using **bcrypt** combined with session-based authentication via **Passport.js**. The solution file extends the exercise by adding **Google OAuth 2.0** as a social login strategy.

## Architecture Overview

```
authentication-lv3/
├── index.js              # Exercise: local auth with bcrypt + Passport.js
├── solution.js           # Solution: adds Google OAuth 2.0 strategy
├── package.json          # Dependencies and project metadata
├── .env                  # Environment variables (DB, session, OAuth)
├── views/
│   ├── home.ejs          # Landing page with Register / Login buttons
│   ├── register.ejs      # Registration form + Google sign-up button
│   ├── login.ejs         # Login form + Google sign-in button
│   ├── secrets.ejs       # Protected page (visible only when authenticated)
│   ├── submit.ejs        # Form to submit a secret
│   └── partials/
│       ├── header.ejs    # HTML head, Bootstrap 4 & Font Awesome CDN links
│       └── footer.ejs    # Closing body/html tags
├── partials/             # Duplicate partials (used by some views)
│   ├── header.ejs
│   └── footer.ejs
├── css/
│   └── styles.css        # Custom styles
└── public/
    └── css/
        └── styles.css    # Static styles served by Express
```

### How It Works

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Server** | Express 4 | HTTP routing, middleware pipeline |
| **Templating** | EJS | Server-side rendered HTML views |
| **Authentication** | Passport.js (Local + Google OAuth 2.0) | Strategy-based auth framework |
| **Password Security** | bcrypt (10 salt rounds) | Hashing & salting passwords before storage |
| **Sessions** | express-session | Persistent login sessions via cookies |
| **Database** | PostgreSQL (pg) | Stores user credentials |
| **Configuration** | dotenv | Loads secrets from `.env` file |
| **UI** | Bootstrap 4 + Font Awesome 5 | Responsive layout and icons |

### Request Flow

```
Browser ──► Express Router
               │
               ├─ GET  /                → home.ejs (public)
               ├─ GET  /register        → register.ejs (public)
               ├─ GET  /login           → login.ejs (public)
               ├─ POST /register        → bcrypt.hash → INSERT user → auto-login → /secrets
               ├─ POST /login           → passport.authenticate("local") → /secrets
               ├─ GET  /auth/google     → passport.authenticate("google") → Google consent
               ├─ GET  /auth/google/secrets → Google callback → /secrets
               ├─ GET  /secrets         → isAuthenticated() guard → secrets.ejs
               └─ GET  /logout          → req.logout() → /
```

### Exercise vs. Solution

| File | Strategies | Description |
|------|-----------|-------------|
| `index.js` | Local (email + password) | The exercise starter — implements bcrypt hashing with Passport Local strategy |
| `solution.js` | Local + Google OAuth 2.0 | Complete solution — adds Google OAuth 2.0 as a second Passport strategy |

## Quick Start

### Prerequisites

- **Node.js** ≥ 18
- **PostgreSQL** ≥ 12 running locally
- (Optional) A **Google Cloud** project with OAuth 2.0 credentials for the solution file

### 1. Install Dependencies

```bash
cd exercises-authentication/authentication-lv3
npm install
```

### 2. Set Up the Database

Connect to PostgreSQL and create the database and table:

```bash
psql -U postgres
```

```sql
CREATE DATABASE secrets;

\c secrets

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL
);
```

### 3. Configure Environment Variables

Edit the `.env` file to match your local PostgreSQL credentials:

```dotenv
SESSION_SECRET="your-session-secret"
PG_USER="postgres"
PG_HOST="localhost"
PG_DATABASE="secrets"
PG_PASSWORD="your-postgres-password"
PG_PORT="5432"

# Only needed for solution.js (Google OAuth)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 4. Run the App

Run the exercise starter:

```bash
node index.js
```

Or run the complete solution (with Google OAuth):

```bash
node solution.js
```

The server starts at **http://localhost:3000**.

### 5. Test the App

1. Open **http://localhost:3000** in your browser.
2. Click **Register** and create an account with an email and password.
3. You are automatically logged in and redirected to the **Secrets** page.
4. Click **Log Out**, then log back in via the **Login** page.
5. *(Solution only)* Use the **Sign In with Google** button to authenticate via OAuth 2.0.

### Setting Up Google OAuth (Solution Only)

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project (or select an existing one).
3. Navigate to **APIs & Services → Credentials**.
4. Create an **OAuth 2.0 Client ID** (Web application type).
5. Add `http://localhost:3000/auth/google/secrets` as an **Authorized redirect URI**.
6. Copy the Client ID and Client Secret into your `.env` file.

## Key Concepts

- **Bcrypt salting** — each password gets a unique random salt (10 rounds), preventing rainbow table attacks.
- **Passport strategies** — pluggable authentication modules; this project uses `passport-local` for email/password and `passport-google-oauth2` for social login.
- **Session serialization** — Passport serializes the full user object into the session and deserializes it on each request to populate `req.user`.
- **Protected routes** — `req.isAuthenticated()` guards the `/secrets` route, redirecting unauthenticated users to `/login`.
