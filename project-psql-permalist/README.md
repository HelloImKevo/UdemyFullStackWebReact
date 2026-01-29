# Permalist: Persistent To-Do List (PostgreSQL Edition)

A web application to track To-Do items using Node.js, Express, and PostgreSQL.

## 🛠 Technology Stack

- **Backend**: Node.js with Express.js
- **Database**: PostgreSQL (using `pg` library)
- **Templating**: EJS (Embedded JavaScript)
- **Frontend**: HTML5, CSS3
- **Middleware**: body-parser

## 🚀 Installation & Setup

### 1. Install Dependencies

```bash
# Initialize npm (if needed)
npm init -y

# Install project dependencies
npm install

# Fix security vulnerabilities
npm audit fix
```

### 2. PostgreSQL & pgAdmin Setup (macOS)

This guide assumes you are using **Homebrew** on macOS.

#### Install PostgreSQL
```bash
# Install PostgreSQL
brew install postgresql@15

# Start PostgreSQL service
brew services start postgresql@15

# Verify installation
psql --version
```

#### 🔧 Troubleshooting

### Error: `zsh: command not found: psql`

If you see this error, the PostgreSQL binaries are not in your system `PATH`.

**Step 1: Verify Installation**
First, ensure the package is actually installed:
```bash
brew list postgresql@15
```
If this returns an error, install it first: `brew install postgresql@15`

**Step 2: Add to PATH (Robust Method)**
Run the following command to automatically find the correct installation path (regardless of whether you are on Intel or Apple Silicon) and add it to your shell configuration:

```bash
# 1. Add the dynamic path to your zsh configuration
echo "export PATH=\"$(brew --prefix postgresql@15)/bin:\$PATH\"" >> ~/.zshrc

# 2. Apply the changes to your current session
source ~/.zshrc
```

**Step 3: Verify**
```bash
psql --version
```

#### Install pgAdmin 4
pgAdmin is the most popular administration and development platform for PostgreSQL.

**Option 1: Install via Homebrew (Recommended)**
```bash
brew install --cask pgadmin4
```

**Option 2: Manual Download (If Homebrew fails)**
If you encounter SSL/TLS errors (e.g., `tlsv1 alert protocol version`) due to corporate firewalls or proxies:

1. Visit the official download page: [https://www.pgadmin.org/download/pgadmin-4-macos/](https://www.pgadmin.org/download/pgadmin-4-macos/)
2. Download the latest `.dmg` file manually.
3. Open the `.dmg` and drag pgAdmin 4 to your Applications folder.

**Option 3: Install via Python (CLI Alternative)**
If you prefer a CLI-based installation and have Python installed, you can install pgAdmin as a Python package:

```bash
# Create a virtual environment (recommended)
python3 -m venv pgadmin-venv
source pgadmin-venv/bin/activate

# Install pgAdmin4
pip install pgadmin4

# Run pgAdmin4
pgadmin4
```
*Note: This runs pgAdmin as a web server accessible at http://127.0.0.1:5050*

### Application Configuration

This project uses **environment variables** to manage sensitive database credentials securely.

1. Create a file named `.env` in the project root.
2. Add your database configuration details:

```env
DB_USER=postgres
DB_HOST=localhost
DB_DATABASE=world
DB_PASSWORD=your_actual_password
DB_PORT=5432
PORT=3000
```

> **Note:** The `.env` file is ignored by Git to prevent leaking secrets.

## Miscellaneous Helpful Commands

```bash
npm uninstall dotenv helmet && cd exercises-psql/psql-travel-tracker && npm install dotenv helmet
```

## 🏃‍♂️ Running the Application

Start the server:
```bash
# Using nodemon
nodemon index.js
```

Open URL in Browser:  
http://localhost:3000/

