import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import axios from "axios";

const app = express();
const port = 3000;

// Database Configuration
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "booknotes", // Ensure you create this DB first
  password: "ENTER_PASSWORD_HERE",  // Change to your actual password
  port: 5432,
});

db.connect();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

// -- Routes --

// 1. GET Home Page (List all books)
app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM books ORDER BY id DESC");
    res.render("index.ejs", { books: result.rows });
  } catch (err) {
    console.error("Error executing query", err.stack);
    res.render("index.ejs", { books: [] });
  }
});

// 2. GET Sort Books
app.get("/sort", async (req, res) => {
  const sort = req.query.sort;
  let orderBy = "id DESC"; // Default

  if (sort === "rating") {
    orderBy = "rating DESC";
  } else if (sort === "recency") {
    orderBy = "date_read DESC";
  } else if (sort === "title") {
    orderBy = "title ASC";
  }

  try {
    const result = await db.query(`SELECT * FROM books ORDER BY ${orderBy}`);
    res.render("index.ejs", { books: result.rows });
  } catch (err) {
    console.error("Error executing query", err.stack);
    res.redirect("/");
  }
});

// 3. GET New Book Form
app.get("/new", async (req, res) => {
  const isbnLookup = req.query.isbn;
  let bookData = {};

  if (isbnLookup) {
    try {
      const response = await axios.get(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbnLookup}&jscmd=details&format=json`);
      const data = response.data[`ISBN:${isbnLookup}`];
      
      if (data && data.details) {
        bookData = {
          title: data.details.title,
          author: data.details.authors ? data.details.authors.map(a => a.name).join(", ") : "Unknown",
          isbn: isbnLookup
        };
      }
    } catch (err) {
      console.error("Error fetching from Open Library API:", err.message);
      // Fallback: just pass the ISBN back so user doesn't lose it
      bookData = { isbn: isbnLookup };
    }
  }
  
  res.render("form.ejs", { book: null, prefill: bookData });
});

// 4. POST Add New Book
app.post("/add", async (req, res) => {
  const { title, author, isbn, rating, date_read, notes } = req.body;
  
  // Clean ISBN (remove dashes/spaces)
  const cleanIsbn = isbn ? isbn.replace(/[-\s]/g, "") : null;

  try {
    await db.query(
      "INSERT INTO books (title, author, isbn, rating, date_read, notes) VALUES ($1, $2, $3, $4, $5, $6)",
      [title, author, cleanIsbn, rating, date_read, notes]
    );
    res.redirect("/");
  } catch (err) {
    console.error("Error inserting book", err.stack);
    res.redirect("/new");
  }
});

// 5. GET Edit Book Form
app.get("/edit/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db.query("SELECT * FROM books WHERE id = $1", [id]);
    if (result.rows.length > 0) {
      res.render("form.ejs", { book: result.rows[0] });
    } else {
      res.redirect("/");
    }
  } catch (err) {
    console.error("Error fetching book for edit", err.stack);
    res.redirect("/");
  }
});

// 6. POST Update Book
app.post("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const { title, author, isbn, rating, date_read, notes } = req.body;
  const cleanIsbn = isbn ? isbn.replace(/[-\s]/g, "") : null;

  try {
    await db.query(
      "UPDATE books SET title = $1, author = $2, isbn = $3, rating = $4, date_read = $5, notes = $6 WHERE id = $7",
      [title, author, cleanIsbn, rating, date_read, notes, id]
    );
    res.redirect("/");
  } catch (err) {
    console.error("Error updating book", err.stack);
    res.redirect("/");
  }
});

// 7. POST Delete Book
app.post("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await db.query("DELETE FROM books WHERE id = $1", [id]);
    res.redirect("/");
  } catch (err) {
    console.error("Error deleting book", err.stack);
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
