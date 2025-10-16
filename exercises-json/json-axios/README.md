# JSON Axios Exercise - Bored API Activity Finder

A lightweight Express.js application demonstrating Axios HTTP client usage with the Bored API to find random activities based on user preferences.

## 📋 Project Overview

This project demonstrates:
- **Axios** for making HTTP requests to external APIs
- **Express.js** server-side rendering with EJS templates
- **Body-Parser** for handling form submissions
- **Error handling** for API failures and SSL issues
- **RESTful API** integration patterns

---

## 🚀 Installation

```bash
# Initialize npm (if needed)
npm init -y

# Install dependencies
npm install

# Fix security vulnerabilities
npm audit fix
```

### Required Dependencies

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "body-parser": "^1.20.2",
    "axios": "^1.6.0",
    "ejs": "^3.1.9"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

---

## 🏃 Start the Server

```bash
# Option 1: Using node directly
node index.js

# Option 2: Using nodemon (if installed globally or locally)
nodemon index.js

# Option 3: Using a different port to avoid conflicts
PORT=3001 node index.js

# Option 4: Using nodemon with custom port
PORT=3001 nodemon index.js

# Option 5: Using npm scripts (add to package.json)
npm start
npm run dev
```

**Access the application:**  
http://localhost:3000/

---

## 🔧 Important: API Protocol Issue

### ⚠️ HTTPS Not Supported by Bored API

**Issue Discovered:** The Bored API at `bored-api.appbrewery.com` does **NOT properly support HTTPS**. Attempting to use HTTPS results in SSL/TLS errors:

```
Failed to make request: write EPROTO ...SSL routines:ssl3_get_record:wrong version number
```

### ✅ Solution: Use HTTP Instead (Current Implementation)

The code has been updated to use **HTTP** instead of HTTPS:

```javascript
// ✅ Correct - Using HTTP
const response = await axios.get("http://bored-api.appbrewery.com/random");

// ❌ Incorrect - HTTPS will fail
const response = await axios.get("https://bored-api.appbrewery.com/random");
```

**Why this works:** The API server is configured to only accept HTTP connections, not HTTPS. The "wrong version number" error occurs because the server responds with HTTP to an HTTPS request, causing a protocol mismatch.

### Understanding the Error

**Error Message:**
```
SSL routines:ssl3_get_record:wrong version number
```

**What it means:**
- Your client (Axios) tries to establish an HTTPS/SSL connection
- The server responds with plain HTTP (not SSL/TLS)
- The SSL library expects encrypted data but receives unencrypted HTTP
- This causes a version mismatch error

**Note:** While the HTTPS agent configuration remains in the code for educational purposes, it's not needed when using HTTP. The HTTP protocol doesn't use SSL/TLS encryption.

---

## 🔧 Alternative: Troubleshooting SSL Certificate Errors (For Reference)

If you encounter SSL/TLS errors with **other APIs that do support HTTPS**, here are common solutions:

### Common SSL Errors with Axios

```
Failed to make request: unable to get local issuer certificate
Failed to make request: write EPROTO ...SSL routines errors
```

### Root Causes:

1. **API doesn't support HTTPS** - Use HTTP instead (like Bored API)
2. **Corporate/Educational Network Proxies** - Network intercepting SSL traffic
3. **Self-Signed Certificates** - API uses self-signed certificates
4. **Outdated SSL/TLS Protocols** - Version mismatch between client and server
5. **VPN/Antivirus Software** - Security software intercepting HTTPS traffic
6. **Node.js SSL Certificate Chain Issues** - Missing or outdated certificate authorities

### ✅ Solution for APIs with SSL Issues: Development Mode

For APIs that DO support HTTPS but have certificate issues:

```javascript
import https from "https";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false, // Disable SSL certificate validation
});

axios.defaults.httpsAgent = httpsAgent;
```

**⚠️ WARNING:** Only use this approach in development/learning environments. Never deploy to production with `rejectUnauthorized: false`.

### ✅ Solution 2: Environment-Specific Configuration

For a more secure approach, use environment variables:

```javascript
import https from "https";

const httpsAgent = new https.Agent({
  rejectUnauthorized: process.env.NODE_ENV === 'production', // Strict in production
});

axios.defaults.httpsAgent = httpsAgent;
```

Then set environment variable:

```bash
# Development
NODE_ENV=development node index.js

# Production (with proper SSL validation)
NODE_ENV=production node index.js
```

### ✅ Solution 3: Check if API Supports HTTPS

**Always verify the API's actual protocol support:**

```bash
# Test HTTPS
curl -v https://api-domain.com/endpoint

# Test HTTP
curl -v http://api-domain.com/endpoint
```

If HTTPS fails with protocol errors, the API likely only supports HTTP.

### ✅ Solution 4: Update Node.js and Certificates

```bash
# Update Node.js to latest LTS version
brew upgrade node  # macOS
# or
nvm install --lts  # if using nvm

# Update npm
npm install -g npm@latest

# Update project dependencies
npm update
```

### ✅ Solution 5: Configure Corporate Proxy

If behind a corporate proxy:

```javascript
axios.defaults.proxy = {
  host: 'proxy.company.com',
  port: 8080,
  auth: {
    username: 'your-username',
    password: 'your-password'
  }
};
```

Or use environment variables:

```bash
export HTTP_PROXY=http://proxy.company.com:8080
export HTTPS_PROXY=http://proxy.company.com:8080
export NO_PROXY=localhost,127.0.0.1
```

### ✅ Solution 6: Install System CA Certificates

```bash
# macOS - Update certificates
brew install ca-certificates

# Set Node.js to use system certificates
export NODE_EXTRA_CA_CERTS=/etc/ssl/certs/ca-certificates.crt
```

---

## 🏗️ Application Architecture

### File Structure

```
json-axios/
├── index.js           # Main Express.js server
├── package.json       # Dependencies and scripts
├── views/
│   └── index.ejs      # EJS template for UI
├── public/
│   └── styles/
│       └── main.css   # Styling
└── README.md          # This file
```

### API Endpoints

#### `GET /`
- **Purpose**: Display a random activity on initial page load
- **API Call**: `https://bored-api.appbrewery.com/random`
- **Response**: Renders `index.ejs` with random activity data

#### `POST /`
- **Purpose**: Filter activities by type and participants
- **Form Data**: 
  - `type` (education, charity, recreational, etc.)
  - `participants` (1-4)
- **API Call**: `https://bored-api.appbrewery.com/filter?type={type}&participants={participants}`
- **Response**: Renders `index.ejs` with filtered random activity

---

## 📊 API Reference

### Bored API Endpoints

**Base URL**: `http://bored-api.appbrewery.com`

**⚠️ Important:** This API only supports HTTP, not HTTPS.

#### Get Random Activity
```
GET /random
```

**Response Example:**
```json
{
  "activity": "Learn Express.js",
  "type": "education",
  "participants": 1,
  "price": 0.1,
  "link": "",
  "key": "3943506",
  "accessibility": 0.1
}
```

#### Filter Activities
```
GET /filter?type={type}&participants={participants}
```

**Parameters:**
- `type`: education, charity, recreational, relaxation, busywork, social, diy, music
- `participants`: 1-4

**Response Example:**
```json
[
  {
    "activity": "Volunteer at a local charity",
    "type": "charity",
    "participants": 2,
    "price": 0,
    "link": "",
    "key": "9432462",
    "accessibility": 0.1
  }
]
```

---

## 🔒 Security Best Practices

### For Production Deployment:

1. **Enable SSL Certificate Validation**
   ```javascript
   const httpsAgent = new https.Agent({
     rejectUnauthorized: true, // Always true in production
   });
   ```

2. **Use Environment Variables**
   ```javascript
   const port = process.env.PORT || 3000;
   const apiUrl = process.env.API_URL || 'https://bored-api.appbrewery.com';
   ```

3. **Implement Rate Limiting**
   ```bash
   npm install express-rate-limit
   ```

4. **Add Security Headers**
   ```bash
   npm install helmet
   ```

5. **Validate User Input**
   ```javascript
   const validTypes = ['education', 'charity', 'recreational', 'relaxation', 'busywork', 'social', 'diy', 'music'];
   if (!validTypes.includes(req.body.type)) {
     return res.status(400).send('Invalid type');
   }
   ```

---

## 🐛 Debugging Tips

### Enable Axios Debug Logging

```javascript
axios.interceptors.request.use(request => {
  console.log('Starting Request', JSON.stringify(request, null, 2));
  return request;
});

axios.interceptors.response.use(response => {
  console.log('Response:', JSON.stringify(response.data, null, 2));
  return response;
});
```

### Check Network Connectivity

```bash
# Test API directly
curl https://bored-api.appbrewery.com/random

# Test with verbose output
curl -v https://bored-api.appbrewery.com/random

# Test SSL handshake
openssl s_client -connect bored-api.appbrewery.com:443
```

---

## 📚 Additional Resources

- **Axios Documentation**: https://axios-http.com/docs/intro
- **Express.js Guide**: https://expressjs.com/
- **EJS Templating**: https://ejs.co/
- **Bored API**: https://www.boredapi.com/documentation
- **Node.js HTTPS Module**: https://nodejs.org/api/https.html
- **SSL/TLS Troubleshooting**: https://nodejs.org/api/tls.html

---

## 🎓 Learning Objectives

This exercise teaches:
- Making HTTP requests with Axios
- Handling async/await patterns
- Form data processing with body-parser
- EJS template rendering
- Error handling and user feedback
- SSL/TLS certificate management
- API integration best practices

---

## 🚨 Common Issues & Fixes

| Issue | Cause | Solution |
|-------|-------|----------|
| Port already in use | Another process using port 3000 | Use different port: `PORT=3001 node index.js` |
| SSL certificate errors | Corporate proxy/VPN | Disable SSL verification (dev only) |
| Cannot find module 'axios' | Missing dependencies | Run `npm install` |
| 404 from API | No matching activities | Handle error gracefully (already implemented) |
| EJS template not found | Wrong views directory | Ensure `views/index.ejs` exists |

---

**Note:** This is a learning/exercise project. For production applications, always implement proper SSL certificate validation, input sanitization, rate limiting, and comprehensive error handling.

---

*Last Updated: October 2025*  
