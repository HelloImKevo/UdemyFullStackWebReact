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

### Development Mode with Nodemon

[Nodemon](https://nodemon.io/) is a utility that monitors for changes in your source code and automatically restarts your server, which is extremely helpful during development.

#### Installing Nodemon

You can install Nodemon in two ways:

1. **As a development dependency for your project** (recommended):
   ```bash
   npm install --save-dev nodemon
   ```
   This adds nodemon to your project's package.json under devDependencies.

2. **Globally on your machine**:
   ```bash
   npm install -g nodemon
   ```
   This allows you to use nodemon for any project on your system.

#### Using Nodemon

Once installed, you can use Nodemon in several ways:

1. **Using the npm script** (recommended):
   ```bash
   npm run dev
   ```
   This uses the script defined in package.json: `"dev": "nodemon index.js"`

2. **Using npx** (if installed as a project dependency):
   ```bash
   npx nodemon index.js
   ```

3. **Directly** (if installed globally):
   ```bash
   nodemon index.js
   ```

#### Configuring Nodemon

You can customize Nodemon's behavior by:

1. **Command line arguments**:
   ```bash
   nodemon --ext js,json,html --ignore public/ index.js
   ```
   This watches .js, .json, and .html files, but ignores changes in the public folder.

2. **Creating a configuration file** named `nodemon.json` in your project root:
   ```json
   {
     "watch": ["index.js", "middleware.js", "routes/"],
     "ext": "js,json",
     "ignore": ["*.test.js", "public/"],
     "delay": "1000"
   }
   ```

3. **Adding configuration to package.json**:
   ```json
   {
     "nodemonConfig": {
       "watch": ["index.js", "middleware.js"],
       "ext": "js,json"
     }
   }
   ```

#### Nodemon Features

- **Auto-restart**: Server restarts when files change
- **Watch specific files**: Configure which files to monitor
- **Delay option**: Add delay before restart to handle many simultaneous file changes
- **Extension filtering**: Only watch certain file types
- **Ignore patterns**: Exclude directories or files from triggering restarts

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
├── nodemon.json    # Nodemon configuration for development
├── package.json    # Project configuration and dependencies
├── README.md       # Project documentation (this file)
└── public/         # Static files directory
    └── index.html  # Demo page with form submission
```

## Debugging Node.js Applications

Debugging is an essential part of Node.js development. Here are several approaches to debugging your Express application:

### Console-Based Debugging

The simplest method is using console statements:

```javascript
console.log('Variable value:', myVariable);
console.error('Error occurred:', error);
console.table(users); // Shows tabular data
console.time('Operation') && console.timeEnd('Operation'); // Timing operations
```

### Node.js Built-in Debugger

Node.js includes a built-in debugging client:

1. Start your application in debug mode:
   ```bash
   node --inspect index.js
   ```

2. Open Chrome and navigate to: `chrome://inspect`

3. Click on "Open dedicated DevTools for Node"

### VS Code Debugging

For VS Code users, create a `.vscode/launch.json` file:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/index.js"
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Nodemon",
      "runtimeExecutable": "nodemon",
      "program": "${workspaceFolder}/index.js",
      "restart": true,
      "console": "integratedTerminal"
    }
  ]
}
```

Then press F5 to start debugging with breakpoints support.

### Debugging with Nodemon

You can combine Nodemon with the debugger:

```bash
nodemon --inspect index.js
```

This enables automatic restart while keeping the debugging connection.

## NPM Scripts

This project uses npm scripts to simplify running common tasks. The following scripts are defined in the `package.json` file:

| Script | Command | Description |
|--------|---------|-------------|
| `npm start` | `node index.js` | Starts the server |
| `npm run dev` | `nodemon index.js` | Starts the server with automatic restart on file changes |
| `npm run debug` | `nodemon --inspect index.js` | Starts the server in debug mode with automatic restart |
| `npm test` | `echo "Error: no test specified" && exit 1` | Placeholder for running tests |

Nodemon is already included as a dev dependency in this project, so you don't need to install it separately. Just run `npm install` to set up all dependencies.

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