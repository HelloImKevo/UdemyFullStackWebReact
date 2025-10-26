# Dota 2 Stats Viewer 🎮

A comprehensive web application that integrates with the **OpenDota API** to display real-time statistics, professional teams, players, heroes, and live match data for Dota 2.

![Dota 2](https://img.shields.io/badge/Dota_2-Stats_Viewer-d32f2f?style=for-the-badge&logo=steam)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Integration](#api-integration)
- [Routes & Endpoints](#routes--endpoints)
- [Screenshots](#screenshots)
- [Error Handling](#error-handling)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

This project is a full-stack web application built with **Express**, **Node.js**, **Axios**, and **EJS** templating. It demonstrates best practices in:

- **API Integration**: Seamless communication with the OpenDota REST API
- **Server-Side Rendering**: Dynamic content generation using EJS templates
- **Responsive Design**: Mobile-first approach with modern CSS
- **Error Handling**: Comprehensive error management for API requests
- **User Experience**: Intuitive navigation and data presentation

### About Dota 2

Dota 2 is a free-to-play multiplayer online battle arena (MOBA) game where two teams of five players compete to destroy the opposing team's "Ancient" structure while defending their own. This application provides comprehensive statistics about the professional Dota 2 esports scene.

## ✨ Features

### Core Features

- 🏆 **Professional Teams**: Browse top professional teams ranked by performance rating
- 👤 **Player Profiles**: Detailed information about pro players including stats and recent matches
- 🐉 **Heroes Database**: Comprehensive list of all Dota 2 heroes with statistics
- 📡 **Live Matches**: Real-time tracking of ongoing professional matches
- 🔍 **Search Functionality**: Search for players and teams quickly
- 📊 **Statistics Dashboard**: Win rates, match history, and performance metrics

### Technical Features

- **RESTful API Integration**: GET requests to OpenDota API endpoints
- **Dynamic Data Rendering**: Server-side rendering with EJS templates
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Error Handling**: Graceful error management with user-friendly error pages
- **Modular Architecture**: Clean separation of concerns with partials and layouts
- **Modern UI/UX**: Dota 2-themed color scheme with smooth animations

## 🛠 Technologies Used

### Backend

- **Node.js** (v14+): JavaScript runtime environment
- **Express.js** (v4.18.2): Web application framework
- **Axios** (v1.6.2): HTTP client for API requests
- **Body-Parser** (v1.20.2): Request body parsing middleware

### Frontend

- **EJS** (v3.1.9): Embedded JavaScript templating
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **Font Awesome** (v6.4.0): Icon library
- **Google Fonts**: Roboto and Rajdhani fonts

### Development Tools

- **Nodemon** (v3.0.2): Auto-restart server during development

## 📁 Project Structure

```
capstone-project-4/
├── index.js                    # Main server file with Express app
├── package.json                # Project dependencies and scripts
├── README.md                   # This file
├── public/                     # Static assets
│   └── css/
│       └── styles.css         # Main stylesheet
└── views/                      # EJS templates
    ├── index.ejs              # Home page
    ├── teams.ejs              # Teams listing page
    ├── team-details.ejs       # Individual team details
    ├── players.ejs            # Players listing page
    ├── player-details.ejs     # Individual player details
    ├── heroes.ejs             # Heroes listing page
    ├── live.ejs               # Live matches page
    ├── search-results.ejs     # Search results page
    ├── error.ejs              # Error page
    └── partials/              # Reusable components
        ├── header.ejs         # HTML head and opening tags
        ├── footer.ejs         # Footer and closing tags
        └── navigation.ejs     # Navigation bar
```

## 🚀 Installation

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)
- Internet connection (for API requests)

### Step-by-Step Installation

1. **Clone or navigate to the project directory**:
   ```bash
   cd capstone-project-4
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```
   
   This will install:
   - express
   - axios
   - ejs
   - body-parser
   - nodemon (dev dependency)

3. **Verify installation**:
   ```bash
   npm list
   ```

## 💻 Usage

### Starting the Server

#### Development Mode (with auto-restart):
```bash
npm run dev
```
or
```bash
nodemon index.js
```

#### Production Mode:
```bash
npm start
```
or
```bash
node index.js
```

### Accessing the Application

Once the server is running, you'll see:
```
🚀 Dota 2 Stats Viewer is running on http://localhost:3000
📊 Connected to OpenDota API: https://api.opendota.com/api
```

Open your browser and navigate to:
```
http://localhost:3000
```

### Available Pages

- **Home**: `http://localhost:3000/`
- **Teams**: `http://localhost:3000/teams`
- **Players**: `http://localhost:3000/players`
- **Heroes**: `http://localhost:3000/heroes`
- **Live Matches**: `http://localhost:3000/live`
- **Team Details**: `http://localhost:3000/team/:id`
- **Player Details**: `http://localhost:3000/player/:id`

## 🔌 API Integration

### OpenDota API

The application uses the **OpenDota API**, which provides free access to Dota 2 data without requiring authentication for most endpoints.

**Base URL**: `https://api.opendota.com/api`

**API Documentation**: [https://docs.opendota.com/](https://docs.opendota.com/)

### API Endpoints Used

| Endpoint | Purpose | Route |
|----------|---------|-------|
| `/teams` | Get professional teams | `/teams` |
| `/teams/:team_id` | Get team details | `/team/:id` |
| `/teams/:team_id/players` | Get team roster | `/team/:id` |
| `/proPlayers` | Get professional players | `/players` |
| `/players/:account_id` | Get player details | `/player/:id` |
| `/players/:account_id/wl` | Get player win/loss | `/player/:id` |
| `/players/:account_id/recentMatches` | Get recent matches | `/player/:id` |
| `/heroes` | Get all heroes | `/heroes` |
| `/heroStats` | Get hero statistics | `/heroes` |
| `/live` | Get live matches | `/live` |
| `/search?q=query` | Search players | `/search` |

### Error Handling for API Requests

The application includes a robust error handling system:

```javascript
async function makeApiRequest(endpoint) {
  try {
    const response = await axios.get(`${API_BASE_URL}${endpoint}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error.message);
    return { 
      success: false, 
      error: error.response?.data?.error || error.message 
    };
  }
}
```

- **Console Logging**: All API errors are logged to the console for debugging
- **User-Friendly Messages**: Users see helpful error pages instead of crashes
- **Graceful Degradation**: Failed API calls don't break the entire application

## 🛣 Routes & Endpoints

### GET Routes

#### `GET /`
- **Description**: Home page with navigation and features
- **Template**: `index.ejs`
- **Data**: Static content

#### `GET /teams`
- **Description**: List of professional teams
- **Template**: `teams.ejs`
- **API Call**: `/api/teams`
- **Features**:
  - Top 50 teams by rating
  - Team logos, names, and tags
  - Win/loss statistics and win rates
  - Links to detailed team pages

#### `GET /team/:id`
- **Description**: Detailed information about a specific team
- **Template**: `team-details.ejs`
- **API Calls**: 
  - `/api/teams/:id` - Team information
  - `/api/teams/:id/players` - Team roster
- **Features**:
  - Team statistics (rating, wins, losses)
  - Current roster with player names
  - Back navigation to teams list

#### `GET /players`
- **Description**: List of professional players
- **Template**: `players.ejs`
- **API Call**: `/api/proPlayers`
- **Features**:
  - Top 100 professional players
  - Player avatars and names
  - Team affiliations
  - Player roles and status

#### `GET /player/:id`
- **Description**: Detailed player profile
- **Template**: `player-details.ejs`
- **API Calls**:
  - `/api/players/:id` - Player profile
  - `/api/players/:id/wl` - Win/loss stats
  - `/api/players/:id/recentMatches` - Recent 20 matches
- **Features**:
  - Rank tier and leaderboard position
  - Win/loss statistics
  - Recent match history with KDA
  - Steam profile link

#### `GET /heroes`
- **Description**: All Dota 2 heroes with statistics
- **Template**: `heroes.ejs`
- **API Calls**:
  - `/api/heroes` - Hero list
  - `/api/heroStats` - Hero statistics
- **Features**:
  - Hero images and names
  - Hero roles and attributes
  - Professional pick rates and win rates

#### `GET /live`
- **Description**: Currently ongoing professional matches
- **Template**: `live.ejs`
- **API Call**: `/api/live`
- **Features**:
  - Real-time match information
  - Team scores and game time
  - Spectator counts
  - Auto-refresh every 30 seconds

### POST Routes

#### `POST /search`
- **Description**: Search for players by name
- **Template**: `search-results.ejs`
- **API Call**: `/api/search?q=query`
- **Body**: `{ query: "search term" }`
- **Features**:
  - Player search functionality
  - Match similarity scoring
  - Links to player profiles

### Error Routes

#### `404 Handler`
- **Description**: Handles undefined routes
- **Template**: `error.ejs`
- **Status Code**: 404

## 📸 Screenshots

### Home Page
The landing page features a hero section with navigation cards to different sections of the application, along with feature highlights and information about Dota 2.

### Teams Page
Displays professional teams in a card-based grid layout with:
- Team logos
- Win/loss statistics
- Win rate percentages
- Rating information
- Quick links to detailed pages

### Player Profile
Shows comprehensive player information including:
- Player avatar and name
- Rank tier and leaderboard position
- Win/loss statistics
- Recent match history with detailed KDA stats
- Steam profile integration

### Heroes Page
Features all Dota 2 heroes with:
- Hero portraits
- Role badges
- Attack types
- Professional pick and win rates

### Live Matches
Real-time display of ongoing professional matches with:
- Team names and logos
- Current scores
- Game duration
- Spectator counts
- Live indicator with pulse animation

## 🛡 Error Handling

### Application-Level Error Handling

1. **API Request Errors**:
   ```javascript
   if (!result.success) {
     return res.render('error', { 
       title: 'Error',
       message: 'Failed to fetch data',
       error: result.error
     });
   }
   ```

2. **Route-Level Errors**:
   ```javascript
   try {
     // Route logic
   } catch (error) {
     console.error('Route Error:', error.message);
     res.render('error', { 
       title: 'Error',
       message: 'An unexpected error occurred',
       error: error.message
     });
   }
   ```

3. **404 Not Found**:
   - Custom 404 page for undefined routes
   - User-friendly message with navigation options

### User-Facing Error Messages

- Clear, non-technical error descriptions
- Suggested actions (return home, go back)
- Error details displayed when available
- Console logging for developers

## 🚀 Future Enhancements

### Potential Improvements

1. **Caching**: Implement Redis or in-memory caching to reduce API calls
2. **Pagination**: Add pagination for large datasets (teams, players)
3. **Filtering & Sorting**: Allow users to filter and sort results
4. **Favorites**: Let users save favorite teams and players
5. **Match Analytics**: Detailed match analysis with graphs and charts
6. **Hero Comparisons**: Side-by-side hero comparisons
7. **Tournament Brackets**: Display tournament information and brackets
8. **User Authentication**: Save preferences and favorites per user
9. **Dark/Light Mode**: Toggle between color themes
10. **PWA Support**: Convert to Progressive Web App for offline support

### Technical Improvements

1. **Rate Limiting**: Implement API rate limiting to avoid hitting limits
2. **Database Integration**: Store frequently accessed data locally
3. **WebSocket Integration**: Real-time updates for live matches
4. **Testing**: Add unit and integration tests
5. **TypeScript**: Migrate to TypeScript for better type safety
6. **API Rate Limiting**: Handle OpenDota rate limits gracefully
7. **Localization**: Multi-language support

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **OpenDota**: For providing the free API
- **Valve Corporation**: For creating Dota 2
- **Font Awesome**: For the icon library
- **Google Fonts**: For the Roboto and Rajdhani fonts

## 📞 Support & Resources

- **Dota 2 Official**: [https://www.dota2.com/](https://www.dota2.com/)
- **Dota 2 Esports**: [https://www.dota2.com/esports](https://www.dota2.com/esports)
- **OpenDota**: [https://www.opendota.com/](https://www.opendota.com/)
- **OpenDota API Docs**: [https://docs.opendota.com/](https://docs.opendota.com/)

## 🎓 Learning Objectives Achieved

This project demonstrates:

✅ Integration of public APIs into web projects  
✅ Practical experience with Express/Node.js for server-side programming  
✅ Client-server communication using Axios  
✅ Manipulation and presentation of API data  
✅ Error handling for both application and API requests  
✅ Responsive web design principles  
✅ Best practices for web security and scalability  

---

**Built with ❤️ for the Dota 2 community**

*This project is not affiliated with Valve Corporation or Dota 2.*
