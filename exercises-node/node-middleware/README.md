# Testing Express APIs with cURL

This guide explains how to test the Express APIs in this project using cURL commands from the command line instead of GUI tools like Postman.

## Prerequisites

- Node.js and npm installed
- Basic understanding of HTTP methods (GET, POST, PUT, DELETE)
- Terminal/Command Prompt access

## Project Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server (choose one of the index files):
```bash
node index1.js
# OR
node index2.js
# OR
node index3.js
# OR
node index4.js
```

## Available Endpoints

Our Express applications include several endpoints:

1. `GET /` - Serves the main HTML page or returns a simple "Hello" message
2. `POST /submit` - Processes form data (used in index1.js and index4.js)

## Testing with cURL

### For macOS/Linux Terminal

#### GET Requests

Basic GET request to the root endpoint:
```bash
curl http://localhost:3000/
```

GET request with verbose output (shows headers):
```bash
curl -v http://localhost:3000/
```

#### POST Requests

POST form data to the /submit endpoint:
```bash
curl -X POST http://localhost:3000/submit \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "street=Abbey&pet=Tiger"
```

#### Saving Response to File

Save the HTML response to a file:
```bash
curl http://localhost:3000/ -o response.html
```

### For Windows Command Prompt

#### GET Requests

Basic GET request:
```cmd
curl http://localhost:3000/
```

GET request with verbose output:
```cmd
curl -v http://localhost:3000/
```

#### POST Requests

POST form data to the /submit endpoint:
```cmd
curl -X POST http://localhost:3000/submit -H "Content-Type: application/x-www-form-urlencoded" -d "street=Abbey&pet=Tiger"
```

### For Windows PowerShell

Note: In PowerShell, `curl` is an alias for `Invoke-WebRequest`. Use `curl.exe` for the actual cURL command.

```powershell
curl.exe -X POST http://localhost:3000/submit -H "Content-Type: application/x-www-form-urlencoded" -d "street=Abbey&pet=Tiger"
```

## Testing Specific Functionality

### Testing the Band Name Generator (index4.js)

Start the server:
```bash
# Option 1: Using node directly
node index4.js

# Option 2: Using nodemon (if installed)
nodemon index4.js

# Option 3: Using a different port to avoid conflicts
PORT=3001 node index4.js
# Or for nodemon:
PORT=3001 nodemon index4.js
```

Submit form data to generate a band name:
```bash
# If using default port 3000
curl -X POST http://127.0.0.1:3000/submit \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "street=Abbey&pet=Tiger"

# If using port 3001
curl -X POST http://127.0.0.1:3001/submit \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "street=Abbey&pet=Tiger"
```

The response will contain HTML with your generated band name.

### Testing the Logger Middleware (index3.js)

Start the server:
```bash
node index3.js
```

Make a request to trigger the logger:
```bash
curl http://localhost:3000/
```

The server console will show the logged request method and URL.

### Testing Morgan Logger (index2.js)

Start the server:
```bash
node index2.js
```

Make a request:
```bash
curl http://localhost:3000/
```

The server console will show detailed logs in the "combined" format.

## Verifying Your Server

Before testing your API, it's important to verify that your Express server is actually the one responding on the specified port:

### Check Running Processes

#### On macOS/Linux:
```bash
# Find processes using port 3000
lsof -i :3000

# Alternative with netstat
netstat -anp tcp | grep 3000
```

#### On Windows:
```cmd
netstat -ano | findstr :3000
```

### Test Basic Connectivity

```bash
# Simple GET request to check if server responds
curl -v http://127.0.0.1:3000/

# Look for Express-related headers in the response
# If you see HTML with VSCode LivePreview scripts, that's not your Express server!
```

## Advanced cURL Options

### Setting Headers

```bash
curl -H "Accept: application/json" http://localhost:3000/
```

### Custom Request Methods

```bash
curl -X PUT http://localhost:3000/resource
```

### Sending JSON Data

```bash
curl -X POST http://localhost:3000/api \
  -H "Content-Type: application/json" \
  -d '{"name":"John", "age":30}'
```

### Following Redirects

```bash
curl -L http://localhost:3000/redirect
```

### Authentication

```bash
curl -u username:password http://localhost:3000/secure
```

## Troubleshooting

1. **Connection refused**: Ensure the server is running and listening on port 3000
2. **404 Not Found**: Verify the endpoint URL is correct
3. **415 Unsupported Media Type**: Check your Content-Type header matches the expected format
4. **400 Bad Request**: Verify your request payload format
5. **VS Code Live Preview interference**: If you see an error like "File not found" with `/___vscode_livepreview_injected_script`, VS Code's Live Preview might be using port 3000. Solutions:
   - Close any VS Code Live Preview instances
   - Change your Express server's port (e.g., to 3001)
   - Run the curl command with a specific IP address: `curl -X POST http://127.0.0.1:3000/submit` instead of localhost
   
6. **426 Upgrade Required**: This error typically indicates a WebSocket issue. For our simple Express API testing:
   - Ensure you're not connected to the wrong server (like a WebSocket server)
   - Try running your server with a simple node command, not nodemon
   - Check if there's any middleware that's intercepting the request
   
7. **Running in the correct directory**: Make sure you're running your server from the correct directory:
   ```bash
   # Navigate to the right directory first
   cd path/to/exercises-node/node-middleware
   
   # Then start your server
   node index4.js
   ```

## Automating Tests

You can create shell scripts to automate a series of API tests:

### macOS/Linux (test.sh)
```bash
#!/bin/bash
echo "Testing GET /"
curl -s http://localhost:3000/

echo -e "\nTesting POST /submit"
curl -s -X POST http://localhost:3000/submit \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "street=Abbey&pet=Tiger"
```

Make the script executable:
```bash
chmod +x test.sh
./test.sh
```

### Windows (test.bat)
```cmd
@echo off
echo Testing GET /
curl -s http://localhost:3000/

echo.
echo Testing POST /submit
curl -s -X POST http://localhost:3000/submit -H "Content-Type: application/x-www-form-urlencoded" -d "street=Abbey&pet=Tiger"
```

Run the batch file:
```cmd
test.bat
```
