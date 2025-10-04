# EJS Which Weekday Project

A lightweight Express.js application demonstrating how to use EJS (Embedded JavaScript) templating to create dynamic web pages. This project displays different messages based on whether it's a weekday or weekend.

## What is EJS?

**EJS (Embedded JavaScript)** is a simple templating language that lets you generate HTML markup with plain JavaScript. It's one of the most popular templating engines for Node.js and Express applications.

### Key Features of EJS:

1. **Simple Syntax**: Uses familiar JavaScript syntax inside HTML
2. **Fast Rendering**: Compiled and cached for performance
3. **No Dependencies**: Doesn't require any client-side libraries
4. **Flexible**: Supports partials, includes, and custom functions
5. **Easy to Learn**: If you know JavaScript and HTML, you already know most of EJS

### EJS Tag Types:

- `<%= %>` - Outputs the value (escaped HTML)
- `<%- %>` - Outputs the value (unescaped HTML)
- `<% %>` - Control flow (no output)
- `<%# %>` - Comments (not rendered)
- `<%- include('partial') %>` - Include other EJS files

## Project Setup

### Initial Setup (Already Done)
```bash
# Initialize npm project
npm init -y

# Install dependencies
npm install express ejs

# Create project structure
mkdir views
touch index.js views/index.ejs
```

### Install Dependencies (For New Setup)
```bash
npm install
```

### Project Structure
```
ejs-which-weekday/
├── index.js           # Express server and logic
├── package.json       # Project dependencies
├── views/
│   └── index.ejs      # EJS template
└── README.md          # This file
```

## How to Run

Start the server:
```bash
node index.js
```

The server will start on `http://localhost:3000`

Open your browser and visit:
```
http://localhost:3000
```

### Using Nodemon (Optional)

For auto-restart during development:
```bash
# Install nodemon globally (one-time)
npm install -g nodemon

# Run with nodemon
nodemon index.js
```

## How It Works

### 1. Express Server Setup (`index.js`)

```javascript
import express from "express";

const app = express();
const port = 3000;
```

- Creates an Express application instance
- Sets the server port to 3000
- Uses ES6 module syntax (`import` instead of `require`)

### 2. Date Logic

```javascript
const today = new Date();
const day = today.getDay(); // Returns 0-6 (0 = Sunday, 6 = Saturday)

let type = "a weekday";
let adv = "it's time to work hard";

if (day === 0 || day === 6) {
  type = "the weekend";
  adv = "it's time to have some fun";
}
```

**How it works:**
- `getDay()` returns a number representing the day of the week
- 0 = Sunday, 1 = Monday, 2 = Tuesday, ..., 6 = Saturday
- Checks if the day is Sunday (0) or Saturday (6)
- Sets appropriate message variables based on the day

### 3. Rendering the EJS Template

```javascript
res.render("index.ejs", {
  dayType: type,
  advice: adv,
});
```

**What's happening:**
- `res.render()` tells Express to render an EJS template
- First parameter: template filename (Express looks in the `views` folder by default)
- Second parameter: object containing data to pass to the template
- The keys (`dayType`, `advice`) become variables accessible in the EJS file

### 4. EJS Template (`views/index.ejs`)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Weekday Warrior</title>
</head>
<body>
  <h1>Hey, it's <%= dayType %>, <%= advice %>!</h1>
</body>
</html>
```

**EJS Syntax:**
- `<%= dayType %>` - Outputs the value of the `dayType` variable
- `<%= advice %>` - Outputs the value of the `advice` variable
- The `=` sign means the output will be HTML-escaped for security

**Output Examples:**
- **Weekday**: "Hey, it's a weekday, it's time to work hard!"
- **Weekend**: "Hey, it's the weekend, it's time to have some fun!"

## Integrating EJS with Express

### Basic Integration Steps:

1. **Install EJS**:
   ```bash
   npm install ejs
   ```

2. **Set View Engine** (Optional but recommended):
   ```javascript
   app.set('view engine', 'ejs');
   ```
   This allows you to write `res.render('index')` instead of `res.render('index.ejs')`

3. **Set Views Directory** (Optional if not using default):
   ```javascript
   app.set('views', './views');
   ```

4. **Create Views Folder**:
   - Express looks for EJS files in a `views` folder by default
   - All `.ejs` files should be in this directory

5. **Render Templates**:
   ```javascript
   res.render('template-name', { data: 'value' });
   ```

## Advanced EJS Techniques

### Conditionals in Templates

```html
<% if (dayType === "the weekend") { %>
  <p style="color: green;">Enjoy your weekend!</p>
<% } else { %>
  <p style="color: blue;">Have a productive day!</p>
<% } %>
```

### Loops in Templates

```html
<ul>
<% const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']; %>
<% days.forEach(day => { %>
  <li><%= day %></li>
<% }); %>
</ul>
```

### Using Partials (Reusable Components)

```html
<!-- views/header.ejs -->
<header>
  <h1>My Website</h1>
</header>

<!-- views/index.ejs -->
<%- include('header') %>
<main>
  <p>Content here</p>
</main>
```

## Testing the Application

### Test Different Days

You can modify the code to test different days by uncommenting the test code in `index.js`:

```javascript
// Test weekend (Saturday, June 24, 2023)
const today = new Date("June 24, 2023 11:13:00");

// Test weekday (Tuesday, June 20, 2023)
const today = new Date("June 20, 2023 11:13:00");
```

### Using cURL

Test from the command line:
```bash
curl http://localhost:3000
```

You should see the full HTML response with the current day's message.

## Troubleshooting

### Common Issues:

1. **Error: Cannot find module 'ejs'**
   - Solution: Run `npm install`

2. **Error: Failed to lookup view "index.ejs"**
   - Check that the `views` folder exists
   - Verify `index.ejs` is inside the `views` folder

3. **Port 3000 already in use**
   - Change the port number in `index.js`
   - Or stop other processes using port 3000: `lsof -i :3000`

4. **Page doesn't update after changes**
   - Restart the server (or use nodemon for auto-restart)
   - Clear browser cache (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)

## Expanding This Project

### Ideas for Enhancement:

1. **Add Styling**: Include a CSS file or use Bootstrap
2. **More Day Logic**: Display specific messages for each day of the week
3. **Time-based Messages**: Show different messages based on time of day
4. **User Input**: Accept a date from the user to check any day
5. **Calendar View**: Display a monthly calendar with weekend highlights
6. **Partials**: Break the template into reusable header/footer components

## Learning Resources

- [EJS Official Documentation](https://ejs.co/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [MDN: JavaScript Date Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
