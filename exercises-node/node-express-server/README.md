# Node.js Express Server

A simple web application built with Node.js and Express.js to demonstrate fundamental concepts of building web servers and RESTful APIs.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Express.js Concepts](#expressjs-concepts)
- [Next Steps](#next-steps)
- [Resources](#resources)

## Introduction

This project serves as an educational introduction to web server development using Node.js and Express.js. It covers basic concepts such as routing, middleware, parameter handling, and serving static files.

## Features

- Basic Express.js server setup
- Multiple route handling (GET and POST requests)
- Serving static files
- URL parameter handling
- Query parameter handling
- JSON response formatting
- Form data handling
- Interactive demo page
- API endpoints

## Requirements

- [Node.js](https://nodejs.org/) (v14.0.0 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation

1. Clone or download this repository
2. Navigate to the project directory:
   ```bash
   cd node-express-server
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Server

You can start the server in two ways:

### Using npm scripts

Start the server using the npm script defined in package.json:

```bash
npm start
```

This executes the `start` script defined in package.json, which runs `node index.js`.

### Using Node directly

Alternatively, you can start the server directly with Node:

```bash
node index.js
```

Once started, the server will be available at [http://localhost:3000](http://localhost:3000)

### Checking Port Status

If you encounter issues like "Port already in use" when starting the server, you can check which processes are using your ports:

#### macOS and Linux

Check if port 3000 is in use:

```bash
sudo lsof -i :3000
```

Kill a process using the port (replace PID with the process ID from the lsof command):

```bash
kill -9 PID
```

#### Windows

Check if port 3000 is in use:

```bash
netstat -ano | findstr :3000
```

Kill a process using the port (replace PID with the process ID from the netstat command):

```bash
taskkill /F /PID PID
```

### Development Mode

If you have nodemon installed, you can use the dev script for automatic server restarts during development:

```bash
npm run dev
```

or if nodemon is not installed globally:

```bash
npx nodemon index.js
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /        | Home page with links to other routes |
| GET    | /about   | About page |
| GET    | /contact | Contact page |
| GET    | /api/users | Returns a list of users as JSON |
| POST   | /api/users | Creates a new user (send JSON in request body) |
| GET    | /api/users/:id | Returns details for a specific user ID |
| GET    | /search?q=term | Search with query parameters |

## Project Structure

```
node-express-server/
├── index.js        # Main server file
├── middleware.js   # Custom middleware definitions
├── package.json    # Project configuration and dependencies
├── README.md       # Project documentation (this file)
└── public/         # Static files directory
    └── index.html  # Demo page with form submission
```

## NPM Scripts

This project uses npm scripts to simplify running common tasks. The following scripts are defined in the `package.json` file:

| Script | Command | Description |
|--------|---------|-------------|
| `npm start` | `node index.js` | Starts the server |
| `npm run dev` | `nodemon index.js` | Starts the server with automatic restart on file changes (requires nodemon) |
| `npm test` | `echo "Error: no test specified" && exit 1` | Placeholder for running tests |

To install nodemon as a development dependency:

```bash
npm install --save-dev nodemon
```

## Express.js Concepts

### Routing

Express.js provides a simple way to define routes for handling HTTP requests:

```javascript
// Basic GET route
app.get('/path', (req, res) => {
  res.send('Response');
});

// POST route
app.post('/path', (req, res) => {
  res.json({ message: 'Data received' });
});
```

### Middleware

Middleware functions are functions that have access to the request and response objects and can execute code, make changes to the request/response, or end the request-response cycle:

```javascript
// Built-in middleware for parsing JSON
app.use(express.json());

// Built-in middleware for parsing URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Middleware for serving static files
app.use(express.static('public'));

// Custom middleware
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.path}`);
  next(); // Pass control to the next middleware
});
```

### Request Parameters

Express.js allows you to access URL parameters and query parameters:

```javascript
// URL parameters (e.g., /users/123)
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`User ID: ${userId}`);
});

// Query parameters (e.g., /search?q=term)
app.get('/search', (req, res) => {
  const query = req.query.q;
  res.send(`Search query: ${query}`);
});
```

### Request Body

For POST requests, you can access the request body:

```javascript
app.post('/users', (req, res) => {
  const userData = req.body;
  // Process the data...
  res.status(201).json(userData);
});
```

## Troubleshooting

### Common Issues

#### Port Already in Use

If you see the error "Error: listen EADDRINUSE: address already in use :::3000":

1. Another process is using port 3000
2. Use the port checking commands in the "Running the Server" section to identify and stop the process
3. Alternatively, change the port number in index.js:
   ```javascript
   const port = 3001; // Change to a different port number
   ```

#### Cannot Find Module

If you see "Cannot find module 'express'" or similar errors:

1. Make sure you've installed dependencies:
   ```bash
   npm install
   ```
2. Check that the module is listed in package.json
3. Try deleting node_modules folder and reinstalling:
   ```bash
   rm -rf node_modules
   npm install
   ```

#### Module not found: 'net'

This typically happens in frontend JavaScript trying to use Node.js core modules:

1. Express.js is server-side only and won't work in browser-side JavaScript
2. For frontend-backend communication, use AJAX/fetch as shown in public/index.html

### Performance Monitoring

To get basic performance data about your Express server:

```bash
NODE_DEBUG=http node index.js
```

## Next Steps

Here are some ways to extend this project:

1. **Add a database**: Connect to MongoDB or SQLite to store and retrieve data
2. **Implement authentication**: Add user login functionality with Passport.js
3. **Organize routes**: Create separate route files for better organization
4. **Add validation**: Validate incoming data using a library like Joi
5. **Implement error handling**: Add comprehensive error handling middleware
6. **Add testing**: Write unit and integration tests for your routes
7. **Improve UI**: Enhance the frontend with a framework like React or Vue
8. **Add logging**: Implement logging with a library like Winston or Morgan

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [MDN Web Docs: Express/Node Introduction](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction)
- [RESTful API Design Best Practices](https://restfulapi.net/)
- [Express.js Production Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)