import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";
import helmet from "helmet";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Security Best Practice: Use Helmet to set secure HTTP headers
// FIX: Helmet's default Content Security Policy (CSP) blocks inline scripts.
// The EJS template uses an inline <script> tag to color the map (Visited Countries).
// We disable CSP here to allow that script to run, fixing the rendering issue.
app.use(helmet({
  contentSecurityPolicy: false,
}));

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function checkVisited() {
  const result = await db.query("SELECT country_code FROM visited_countries");

  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

// GET home page
app.get("/", async (req, res) => {
  try {
    const countries = await checkVisited();
    res.render("index.ejs", { countries: countries, total: countries.length, error: null });
  } catch (err) {
    console.error(err);
    res.render("index.ejs", { countries: [], total: 0, error: "Error retrieving data" });
  }
});

// INSERT new country
app.post("/add", async (req, res) => {
  const input = req.body["country"];

  // Input Validation
  if (!input || typeof input !== 'string' || input.trim() === '') {
    const countries = await checkVisited();
    return res.render("index.ejs", { countries: countries, total: countries.length, error: "Please enter a valid country name." });
  }

  try {
    // Parameterized Query - Prevents SQL Injection
    // Using LOWER() for case-insensitive matching
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%'",
      [input.toLowerCase().trim()]
    );

    if (result.rows.length !== 0) {
      const data = result.rows[0];
      const countryCode = data.country_code;

      // Check if already visited to prevent duplicates/errors
      const checkResult = await db.query(
        "SELECT country_code FROM visited_countries WHERE country_code = $1",
        [countryCode]
      );

      if (checkResult.rows.length === 0) {
        await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [
          countryCode,
        ]);
        res.redirect("/");
      } else {
        const countries = await checkVisited();
        res.render("index.ejs", { countries: countries, total: countries.length, error: "Country already added." });
      }
    } else {
      const countries = await checkVisited();
      res.render("index.ejs", { countries: countries, total: countries.length, error: "Country not found." });
    }
  } catch (err) {
    console.error(err);
    const countries = await checkVisited();
    res.render("index.ejs", { countries: countries, total: countries.length, error: "Database error." });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
