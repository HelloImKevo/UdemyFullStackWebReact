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

// ===== CUSTOM LOGGING MIDDLEWARE =====

// Request logger - Logs every incoming request
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`\n${'='.repeat(60)}`);
  console.log(`[${timestamp}] 📨 ${req.method} ${req.url}`);
  console.log(`🌐 Request from: ${req.ip || req.connection.remoteAddress}`);
  console.log(`📱 User-Agent: ${req.get('user-agent')?.substring(0, 50)}...`);
  
  if (req.method === 'POST' && Object.keys(req.body || {}).length > 0) {
    console.log(`📦 Request Body Keys: ${Object.keys(req.body).join(', ')}`);
  }
  
  next();
});

// Response logger - Logs response status
app.use((req, res, next) => {
  const originalSend = res.send;
  const originalRender = res.render;
  
  res.send = function(data) {
    console.log(`✅ Response Status: ${res.statusCode}`);
    console.log(`${'='.repeat(60)}\n`);
    return originalSend.call(this, data);
  };
  
  res.render = function(view, options, callback) {
    console.log(`🎨 Rendering view: ${view}.ejs`);
    return originalRender.call(this, view, options, callback);
  };
  
  next();
});

// Middleware configuration
console.log('⚙️  Configuring middleware...');
app.use(bodyParser.urlencoded({ extended: true }));
console.log('✓ body-parser configured for form data');

app.use(express.static("public"));
console.log('✓ Static files serving from /public directory');

// Set view engine
app.set("view engine", "ejs");
app.set("views", "./views");
console.log('✓ EJS template engine configured');
console.log(`✓ Views directory: ${__dirname}/views\n`);

// Helper function to generate unique IDs
function generateId() {
  const id = nextId++;
  console.log(`🔢 Generated new post ID: ${id}`);
  return id;
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
  console.log(`📖 HOME route accessed`);
  console.log(`📊 Current post count: ${posts.length}`);
  
  res.render("index", {
    posts: posts,
    formatDate: formatDate,
    createExcerpt: createExcerpt,
    page: 'home'
  });
});

// NEW POST FORM - Display form to create a new post
app.get("/new", (req, res) => {
  console.log(`➕ NEW POST form requested`);
  
  res.render("new", {
    error: null
  });
});

// CREATE POST - Handle new post submission
app.post("/posts", (req, res) => {
  console.log(`💾 CREATE POST request received`);
  const { title, author, content } = req.body;
  
  console.log(`📝 Post data - Title: "${title?.substring(0, 30)}${title?.length > 30 ? '...' : ''}", Author: "${author}"`);
  
  // Validation
  if (!title || !author || !content) {
    console.log(`❌ Validation failed: Missing required fields`);
    return res.render("new", {
      error: "All fields are required. Please fill out the entire form."
    });
  }
  
  if (title.trim().length === 0 || author.trim().length === 0 || content.trim().length === 0) {
    console.log(`❌ Validation failed: Empty or whitespace-only fields`);
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
  console.log(`✅ Post created successfully - ID: ${newPost.id}`);
  console.log(`📊 Total posts in memory: ${posts.length}`);
  
  res.redirect("/");
});

// VIEW SINGLE POST - Display full post
app.get("/posts/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  console.log(`👁️  VIEW POST request - Post ID: ${postId}`);
  
  const post = posts.find(p => p.id === postId);
  
  if (!post) {
    console.log(`❌ Post not found - ID: ${postId}`);
    return res.status(404).render("error", {
      error: "Post not found",
      message: "The blog post you're looking for doesn't exist or has been deleted."
    });
  }
  
  console.log(`✅ Post found - Title: "${post.title}"`);
  
  res.render("post", {
    post: post,
    formatDate: formatDate
  });
});

// EDIT POST FORM - Display form to edit existing post
app.get("/posts/:id/edit", (req, res) => {
  const postId = parseInt(req.params.id);
  console.log(`✏️  EDIT POST form requested - Post ID: ${postId}`);
  
  const post = posts.find(p => p.id === postId);
  
  if (!post) {
    console.log(`❌ Post not found for editing - ID: ${postId}`);
    return res.status(404).render("error", {
      error: "Post not found",
      message: "The blog post you're trying to edit doesn't exist."
    });
  }
  
  console.log(`✅ Editing post - Title: "${post.title}"`);
  
  res.render("edit", {
    post: post,
    error: null
  });
});

// UPDATE POST - Handle post update submission
app.post("/posts/:id/edit", (req, res) => {
  const postId = parseInt(req.params.id);
  console.log(`🔄 UPDATE POST request - Post ID: ${postId}`);
  
  const postIndex = posts.findIndex(p => p.id === postId);
  
  if (postIndex === -1) {
    console.log(`❌ Post not found for update - ID: ${postId}`);
    return res.status(404).render("error", {
      error: "Post not found",
      message: "The blog post you're trying to update doesn't exist."
    });
  }
  
  const { title, author, content } = req.body;
  console.log(`📝 Update data - Title: "${title?.substring(0, 30)}${title?.length > 30 ? '...' : ''}", Author: "${author}"`);
  
  // Validation
  if (!title || !author || !content) {
    console.log(`❌ Validation failed: Missing required fields`);
    return res.render("edit", {
      post: posts[postIndex],
      error: "All fields are required. Please fill out the entire form."
    });
  }
  
  if (title.trim().length === 0 || author.trim().length === 0 || content.trim().length === 0) {
    console.log(`❌ Validation failed: Empty or whitespace-only fields`);
    return res.render("edit", {
      post: posts[postIndex],
      error: "Fields cannot be empty or contain only whitespace."
    });
  }
  
  // Store old data for comparison
  const oldTitle = posts[postIndex].title;
  
  // Update post
  posts[postIndex] = {
    ...posts[postIndex],
    title: title.trim(),
    author: author.trim(),
    content: content.trim(),
    updatedAt: new Date()
  };
  
  console.log(`✅ Post updated successfully - ID: ${postId}`);
  console.log(`📊 Changed: "${oldTitle}" → "${posts[postIndex].title}"`);
  
  res.redirect("/");
});

// DELETE POST - Handle post deletion
app.post("/posts/:id/delete", (req, res) => {
  const postId = parseInt(req.params.id);
  console.log(`🗑️  DELETE POST request - Post ID: ${postId}`);
  
  const postIndex = posts.findIndex(p => p.id === postId);
  
  if (postIndex === -1) {
    console.log(`❌ Post not found for deletion - ID: ${postId}`);
    return res.status(404).render("error", {
      error: "Post not found",
      message: "The blog post you're trying to delete doesn't exist."
    });
  }
  
  const deletedPost = posts[postIndex];
  posts.splice(postIndex, 1);
  
  console.log(`✅ Post deleted successfully - Title: "${deletedPost.title}"`);
  console.log(`📊 Remaining posts: ${posts.length}`);
  
  res.redirect("/");
});

// 404 Error handler - Catch all undefined routes
app.use((req, res) => {
  console.log(`❌ 404 Error - Undefined route: ${req.method} ${req.url}`);
  
  res.status(404).render("error", {
    error: "Page Not Found",
    message: "The page you're looking for doesn't exist."
  });
});

// Start server
app.listen(port, () => {
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`🎉 BLOG APPLICATION STARTED SUCCESSFULLY`);
  console.log(`${'═'.repeat(60)}`);
  console.log(`🚀 Server running on: http://localhost:${port}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📂 Current directory: ${__dirname}`);
  console.log(`💾 Storage: In-Memory (data will reset on restart)`);
  console.log(`📊 Initial post count: ${posts.length}`);
  console.log(`${'═'.repeat(60)}`);
  console.log(`\n✨ Available Routes:`);
  console.log(`   GET  /                - Home page (view all posts)`);
  console.log(`   GET  /new             - Create new post form`);
  console.log(`   POST /posts           - Submit new post`);
  console.log(`   GET  /posts/:id       - View single post`);
  console.log(`   GET  /posts/:id/edit  - Edit post form`);
  console.log(`   POST /posts/:id/edit  - Submit post updates`);
  console.log(`   POST /posts/:id/delete - Delete post`);
  console.log(`${'═'.repeat(60)}\n`);
  console.log(`💡 Tip: Watch this console for real-time application logs\n`);
});
