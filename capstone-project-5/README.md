# Book Notes Capstone Project

This is a Node.js full-stack application that helps users track, rate, and review books they have read. It automatically fetches book covers using the Open Library API and persists data in a PostgreSQL database.

## Features
- **Add Books**: Enter title, author, rating, notes, and ISBN.
- **View Covers**: Automatically fetches book covers based on ISBN from the Open Library API.
- **Sort List**: Sort your library by Rating, Recency (Date Read), or Title.
- **Edit/Delete**: Update your notes or remove books from your collection.
- **Persistence**: All data remains saved in a local PostgreSQL database.

## Prerequisites
1. **Node.js**: Installed on your machine.
2. **PostgreSQL**: Installed and running locally.

## Setup Instructions

### 1. Database Setup
You need to create the database and the required table before running the app.

1. Open your PostgreSQL command line tool (psql) or a GUI like pgAdmin.
2. Create the database:
   ```sql
   CREATE DATABASE booknotes;
   ```
3. Connect to the database and run the schema script. You can execute the commands found in `schema.sql`:
   ```sql
   CREATE TABLE books (
       id SERIAL PRIMARY KEY,
       title VARCHAR(100) NOT NULL,
       author VARCHAR(100) NOT NULL,
       isbn VARCHAR(13), 
       rating INTEGER CHECK (rating >= 1 AND rating <= 10),
       notes TEXT,
       date_read DATE
   );
   ```

### 2. Application Setup
1. Navigate to this directory in your terminal:
   ```bash
   cd capstone-project-5
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. **Configure Database Connection**:
   Open `index.js` and check the `db` configuration object. Update the `password` field to match your local PostgreSQL password.
   ```javascript
   const db = new pg.Client({
     user: "postgres",
     host: "localhost",
     database: "booknotes",
     password: "your_password_here", // <--- Update this
     port: 5432,
   });
   ```

### 3. Run the Application
1. Start the server:
   ```bash
   node index.js
   # OR if you have nodemon installed
   nodemon index.js
   ```
2. Open your browser and go to: `http://localhost:3000`

## Tech Stack
- **Backend**: Node.js, Express.js
- **Frontend**: EJS (Templating), CSS
- **Database**: PostgreSQL
- **API**: Open Library Covers API (used directly in `<img>` tags via ISBN)
