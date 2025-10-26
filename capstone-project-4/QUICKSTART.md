# Dota 2 Stats Viewer - Quick Start Guide

## 🚀 Quick Start in 3 Steps

### 1. Install Dependencies
```bash
npm install
```
or
```bash
npm i
```

### 2. Start the Server

#### For Development (with auto-restart on file changes):
```bash
npm run dev
```
or
```bash
nodemon index.js
```

#### For Production:
```bash
npm start
```
or
```bash
node index.js
```

### 3. Open Your Browser
Navigate to: **http://localhost:3000**

---

## 📝 What You'll See

When the server starts successfully, you'll see:
```
🚀 Dota 2 Stats Viewer is running on http://localhost:3000
📊 Connected to OpenDota API: https://api.opendota.com/api
```

---

## 🗺 Available Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with navigation |
| `/teams` | Browse professional teams |
| `/team/:id` | View specific team details |
| `/players` | Browse professional players |
| `/player/:id` | View player profile |
| `/heroes` | View all Dota 2 heroes |
| `/live` | See live professional matches |
| `/search` | Search for players (POST) |

---

## ⚙️ Configuration

### Port Configuration
The application runs on **port 3000** by default. To change it, modify the `PORT` constant in `index.js`:
```javascript
const PORT = 3000; // Change to your desired port
```

### API Base URL
The OpenDota API base URL is configured in `index.js`:
```javascript
const API_BASE_URL = 'https://api.opendota.com/api';
```

---

## 🐛 Troubleshooting

### Port Already in Use
If you see "Port 3000 is already in use":
1. Stop any other application using port 3000
2. Or change the port in `index.js`
3. Or kill the process: 
   ```bash
   lsof -ti:3000 | xargs kill
   ```

### Dependencies Not Installed
If you see module not found errors:
```bash
npm install
```

### API Errors
- Check your internet connection
- OpenDota API might be temporarily unavailable
- Check API status: https://www.opendota.com/

---

## 📦 Project Dependencies

- **express**: ^4.18.2 - Web framework
- **axios**: ^1.6.2 - HTTP client
- **ejs**: ^3.1.9 - Template engine
- **body-parser**: ^1.20.2 - Request parsing
- **nodemon**: ^3.0.2 - Auto-restart (dev)

---

## 🎯 Features to Explore

1. **Teams Page**: View top 50 professional teams
2. **Player Profiles**: See detailed stats and recent matches
3. **Heroes Database**: Browse all 120+ Dota 2 heroes
4. **Live Matches**: Watch real-time professional games
5. **Search**: Find your favorite players

---

## 📚 Additional Resources

- Full documentation: See `README.md`
- API Documentation: https://docs.opendota.com/
- Dota 2 Official: https://www.dota2.com/

---

**Enjoy exploring Dota 2 statistics! 🎮**
