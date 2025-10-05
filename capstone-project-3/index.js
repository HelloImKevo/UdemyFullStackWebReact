import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// In-memory storage for blog posts
let posts = [];
let nextId = 1;

// Middleware configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Set view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// Helper function to generate unique IDs
function generateId() {
  return nextId++;
}

// Helper function to format date
function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

// Helper function to create excerpt
function createExcerpt(content, maxLength = 150) {
  if (content.length <= maxLength) return content;
  return content.substring(0, maxLength).trim() + "...";
}

// ===== ROUTES =====

// HOME - Display all blog posts
app.get("/", (req, res) => {
  res.render("index", {
    posts: posts,
    formatDate: formatDate,
    createExcerpt: createExcerpt
  });
});

// NEW POST FORM - Display form to create a new post
app.get("/new", (req, res) => {
  res.render("new", {
    error: null
  });
});

// CREATE POST - Handle new post submission
app.post("/posts", (req, res) => {
  const { title, author, content } = req.body;
  
  // Validation
  if (!title || !author || !content) {
    return res.render("new", {
      error: "All fields are required. Please fill out the entire form."
    });
  }
  
  if (title.trim().length === 0 || author.trim().length === 0 || content.trim().length === 0) {
    return res.render("new", {
      error: "Fields cannot be empty or contain only whitespace."
    });
  }
  
  // Create new post
  const newPost = {
    id: generateId(),
    title: title.trim(),
    author: author.trim(),
    content: content.trim(),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  posts.unshift(newPost); // Add to beginning of array
  res.redirect("/");
});

// VIEW SINGLE POST - Display full post
app.get("/posts/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find(p => p.id === postId);
  
  if (!post) {
    return res.status(404).render("error", {
      error: "Post not found",
      message: "The blog post you're looking for doesn't exist or has been deleted."
    });
  }
  
  res.render("post", {
    post: post,
    formatDate: formatDate
  });
});

// EDIT POST FORM - Display form to edit existing post
app.get("/posts/:id/edit", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find(p => p.id === postId);
  
  if (!post) {
    return res.status(404).render("error", {
      error: "Post not found",
      message: "The blog post you're trying to edit doesn't exist."
    });
  }
  
  res.render("edit", {
    post: post,
    error: null
  });
});

// UPDATE POST - Handle post update submission
app.post("/posts/:id/edit", (req, res) => {
  const postId = parseInt(req.params.id);
  const postIndex = posts.findIndex(p => p.id === postId);
  
  if (postIndex === -1) {
    return res.status(404).render("error", {
      error: "Post not found",
      message: "The blog post you're trying to update doesn't exist."
    });
  }
  
  const { title, author, content } = req.body;
  
  // Validation
  if (!title || !author || !content) {
    return res.render("edit", {
      post: posts[postIndex],
      error: "All fields are required. Please fill out the entire form."
    });
  }
  
  if (title.trim().length === 0 || author.trim().length === 0 || content.trim().length === 0) {
    return res.render("edit", {
      post: posts[postIndex],
      error: "Fields cannot be empty or contain only whitespace."
    });
  }
  
  // Update post
  posts[postIndex] = {
    ...posts[postIndex],
    title: title.trim(),
    author: author.trim(),
    content: content.trim(),
    updatedAt: new Date()
  };
  
  res.redirect("/");
});

// DELETE POST - Handle post deletion
app.post("/posts/:id/delete", (req, res) => {
  const postId = parseInt(req.params.id);
  const postIndex = posts.findIndex(p => p.id === postId);
  
  if (postIndex === -1) {
    return res.status(404).render("error", {
      error: "Post not found",
      message: "The blog post you're trying to delete doesn't exist."
    });
  }
  
  posts.splice(postIndex, 1);
  res.redirect("/");
});

// 404 Error handler - Catch all undefined routes
app.use((req, res) => {
  res.status(404).render("error", {
    error: "Page Not Found",
    message: "The page you're looking for doesn't exist."
  });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Blog application running on http://localhost:${port}`);
  console.log(`📝 Ready to create amazing blog posts!`);
});
