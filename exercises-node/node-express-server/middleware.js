/**
 * Error handling middleware
 * This file demonstrates how to create and use custom middleware in Express.js
 */

// Middleware to log requests
function requestLogger(req, res, next) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next(); // Pass control to the next middleware function
}

// Middleware to add a custom header to all responses
function addCustomHeader(req, res, next) {
  res.setHeader('X-Powered-By', 'Node.js-Express-Demo');
  next();
}

// Middleware to handle errors
function errorHandler(err, req, res, next) {
  console.error('Error:', err.stack);
  res.status(500).json({
    error: {
      message: 'Something went wrong!',
      // In production, you would not want to expose the error details
      details: process.env.NODE_ENV === 'production' ? {} : err.stack
    }
  });
}

// Middleware to handle 404 errors
function notFoundHandler(req, res, next) {
  res.status(404).json({
    error: {
      message: 'Route not found',
      path: req.url
    }
  });
}

// Export all middleware functions
module.exports = {
  requestLogger,
  addCustomHeader,
  errorHandler,
  notFoundHandler
};