# Secrets — Authentication Project

A full-stack Node.js/Express web application where users register, log in, and share secrets anonymously. Combines **bcrypt password hashing**, **Passport.js session authentication** (Local + Google OAuth 2.0), and **PostgreSQL** for persistent storage of users and their secrets.

## Architecture Overview

```
project-secrets-authentication/
├── index.js              # Exercise starter (with TODOs for secret submission)
├── solution.js           # Complete solution (secrets CRUD + dual auth strategies)
├── solution-queries.sql  # SQL migration: adds `secret` column to users table
├── package.json          # Dependencies and project metadata (ES modules)
├── .env                  # Environment variables (DB, session, OAuth credentials)
├── views/
│   ├── home.ejs          # Landing page — Register / Login buttons
│   ├── register.ejs      # Registration form + Google sign-up
│   ├── login.ejs         # Login form + Google sign-in
│   ├── secrets.ejs       # Protected page — displays the user's secret
│   ├── submit.ejs        # Protected form — submit a new secret
│   └── partials/
│       ├── header.ejs    # HTML head with Bootstrap 4 & Font Awesome CDN
│       └── footer.ejs    # Closing body/html tags
├── partials/             # Duplicate partials directory
│   ├── header.ejs
│   └── footer.ejs
├── css/
│   └── styles.css        # Custom styles
└── public/
    └── css/
        └── styles.css    # Static styles served by Express
```

### Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Server** | Express 4 | HTTP routing, middleware pipeline |
| **Templating** | EJS | Server-side rendered HTML views |
| **Authentication** | Passport.js (Local + Google OAuth 2.0) | Dual-strategy authentication framework |
| **Password Security** | bcrypt (10 salt rounds) | Hash and salt passwords before storage |
| **Sessions** | express-session | Cookie-based persistent login sessions |
| **Database** | PostgreSQL (pg) | Stores users, hashed passwords, and secrets |
| **Configuration** | dotenv | Loads secrets from `.env` file |
| **UI** | Bootstrap 4 + Font Awesome 5 | Responsive layout and icons |

### Request Flow

```
Browser ──► Express Router
               │
               ├─ GET  /                     → home.ejs (public)
               ├─ GET  /register             → register.ejs (public)
               ├─ GET  /login                → login.ejs (public)
               ├─ POST /register             → bcrypt.hash → INSERT user → auto-login → /secrets
               ├─ POST /login                → passport.authenticate("local") → /secrets
               ├─ GET  /auth/google          → passport.authenticate("google") → Google consent
               ├─ GET  /auth/google/secrets  → Google OAuth callback → /secrets
               ├─ GET  /secrets              → isAuthenticated() → SELECT secret → secrets.ejs
               ├─ GET  /submit               → isAuthenticated() → submit.ejs
               ├─ POST /submit               → UPDATE users SET secret → /secrets
               └─ GET  /logout               → req.logout() → /
```

### Exercise vs. Solution

| File | What It Covers |
|------|---------------|
| `index.js` | **Starter code** — has working registration, login (local + Google OAuth), and the secrets page, but leaves TODOs for the `/submit` route and for displaying per-user secrets |
| `solution.js` | **Complete solution** — implements `GET /submit` (auth-guarded form), `POST /submit` (saves secret to the DB), and updates `GET /secrets` to query and render each user's saved secret |
| `solution-queries.sql` | SQL migration to add the `secret` column: `ALTER TABLE users ADD COLUMN secret TEXT` |

### Database Schema

```
┌─────────────────────────────────┐
│             users               │
├─────────────────────────────────┤
│ id       SERIAL PRIMARY KEY     │
│ email    VARCHAR(100) NOT NULL   │
│ password VARCHAR(100) NOT NULL   │
│ secret   TEXT                    │  ← added by solution-queries.sql
└─────────────────────────────────┘
```

## Quick Start

### Prerequisites

- **Node.js** ≥ 18
- **PostgreSQL** ≥ 12 running locally
- (Optional) A **Google Cloud** project with OAuth 2.0 credentials

### 1. Install Dependencies

```bash
cd project-secrets-authentication
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

-- Required for the solution (secret submission feature):
ALTER TABLE users ADD COLUMN secret TEXT;
```

### 3. Configure Environment Variables

Edit the `.env` file with your local PostgreSQL credentials:

```dotenv
SESSION_SECRET="pick-a-strong-random-string"
PG_USER="postgres"
PG_HOST="localhost"
PG_DATABASE="secrets"
PG_PASSWORD="your-postgres-password"
PG_PORT="5432"

# Only needed for Google OAuth:
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 4. Run the App

Run the exercise starter:

```bash
node index.js
```

Or run the complete solution:

```bash
node solution.js
```

The server starts at **http://localhost:3000**.

### 5. Test the App

1. Open **http://localhost:3000** in your browser.
2. Click **Register** — create an account with an email and password.
3. You are auto-logged-in and redirected to the **Secrets** page (shows a default secret).
4. Click **Submit a Secret** — enter your own secret and submit.
5. The Secrets page now displays your submitted secret.
6. Click **Log Out**, then log back in via the **Login** page to confirm session persistence.
7. *(Optional)* Use the **Sign In with Google** button for OAuth 2.0 login.

### Setting Up Google OAuth (Optional)

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project (or select an existing one).
3. Navigate to **APIs & Services → Credentials**.
4. Create an **OAuth 2.0 Client ID** (Web application type).
5. Add `http://localhost:3000/auth/google/secrets` as an **Authorized redirect URI**.
6. Copy the Client ID and Client Secret into your `.env` file.

## Key Concepts

- **Bcrypt salting** — each password gets a unique random salt (10 rounds), making rainbow-table attacks infeasible.
- **Dual Passport strategies** — `passport-local` handles email/password login; `passport-google-oauth2` provides social login. Both strategies share the same session and serialization logic.
- **Session-based auth** — Passport serializes the user object into an `express-session` cookie; `req.isAuthenticated()` guards protected routes.
- **Per-user secrets** — the solution stores each user's secret in the `users.secret` column and renders it dynamically on the Secrets page via EJS.
- **Parameterized queries** — all SQL uses `$1`-style placeholders to prevent SQL injection.
