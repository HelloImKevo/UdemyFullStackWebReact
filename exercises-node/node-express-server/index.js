const express = require('express');
const app = express();
const port = 3000;
const { requestLogger, addCustomHeader } = require('./middleware');

// Middleware to parse JSON body
app.use(express.json());
// Middleware to serve static files from 'public' directory
app.use(express.static('public'));
// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));
// Custom middleware
app.use(requestLogger);
app.use(addCustomHeader);

// Root route - sends a welcome message
app.get('/', (req, res) => {
  res.send('<h1>Welcome to Express Server!</h1><p>Try these routes:</p><ul><li><a href="/about">About</a></li><li><a href="/contact">Contact</a></li><li><a href="/api/users">API Users</a></li></ul>');
});

// About page route
app.get('/about', (req, res) => {
  res.send('<h1>About This Project</h1><p>This is a simple Express.js server built as an introductory project.</p><p><a href="/">Back to Home</a></p>');
});

// Contact page route
app.get('/contact', (req, res) => {
  res.send('<h1>Contact Us</h1><p>Email: example@example.com</p><p><a href="/">Back to Home</a></p>');
});

// API route that returns JSON
app.get('/api/users', (req, res) => {
  const users = [
    { id: 1, name: 'Alice', role: 'Developer' },
    { id: 2, name: 'Bob', role: 'Designer' },
    { id: 3, name: 'Charlie', role: 'Manager' }
  ];
  res.json(users);
});

// POST route example
app.post('/api/users', (req, res) => {
  // In a real app, we would save this to a database
  const newUser = req.body;
  console.log('New user received:', newUser);
  res.status(201).json({ 
    message: 'User created successfully', 
    user: newUser 
  });
});

// Route with URL parameters
app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`You requested user with ID: ${userId}`);
});

// Route with query parameters
app.get('/search', (req, res) => {
  const query = req.query.q || 'No query provided';
  res.send(`You searched for: ${query}`);
});

// Route that demonstrates error handling
app.get('/error-demo', (req, res, next) => {
  // This will be caught by the error handling middleware
  try {
    // Simulate an error
    throw new Error('This is a demonstration error');
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
});

// Import error handling middleware
const { errorHandler, notFoundHandler } = require('./middleware');

// 404 route - must be at the end of all routes
app.use(notFoundHandler);

// Error handling middleware - must be the last middleware
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Demo page: http://localhost:${port}/index.html`);
});
