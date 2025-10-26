// Import required modules
import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { body, param, validationResult } from 'express-validator';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// ES Module directory setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// OpenDota API base URL
const API_BASE_URL = 'https://api.opendota.com/api';

// ============================================
// SECURITY MIDDLEWARE
// ============================================

// Helmet: Set various HTTP headers for security
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com", "https://fonts.googleapis.com"],
      scriptSrc: ["'self'", "'unsafe-inline'"], // Note: Remove 'unsafe-inline' in production
      fontSrc: ["'self'", "https://cdnjs.cloudflare.com", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "https:", "data:"],
      connectSrc: ["'self'"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  frameguard: { action: 'deny' },
  noSniff: true,
  xssFilter: true
}));

// Rate limiting for all routes
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Stricter rate limiting for search endpoint
const searchLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 20 search requests per windowMs
  message: 'Too many search requests, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// API request rate limiter (for OpenDota API calls)
const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60, // Max 60 API calls per minute
  skipSuccessfulRequests: false,
});

app.use(generalLimiter);

// ============================================
// MIDDLEWARE SETUP
// ============================================

// Body parser with size limits to prevent payload attacks
app.use(bodyParser.urlencoded({ 
  extended: true,
  limit: '10kb', // Limit request body size
  parameterLimit: 100 // Limit number of parameters
}));
app.use(bodyParser.json({ 
  limit: '10kb' 
}));

// Static files
app.use(express.static(join(__dirname, 'public')));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

// Disable X-Powered-By header
app.disable('x-powered-by');

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Sanitize user input to prevent XSS
 * @param {string} input - User input string
 * @returns {string} - Sanitized string
 */
function sanitizeInput(input) {
  if (!input || typeof input !== 'string') return '';
  
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
}

/**
 * Validate ID parameter (numeric only)
 * @param {string} id - ID to validate
 * @returns {boolean} - True if valid
 */
function isValidId(id) {
  return /^\d+$/.test(id) && parseInt(id) > 0 && parseInt(id) <= Number.MAX_SAFE_INTEGER;
}

/**
 * Format large numbers with commas for better readability
 * @param {number} num - The number to format
 * @returns {string} - Formatted number string
 */
function formatNumber(num) {
  if (!num || typeof num !== 'number') return '0';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Calculate win rate percentage
 * @param {number} wins - Number of wins
 * @param {number} losses - Number of losses
 * @returns {string} - Win rate percentage
 */
function calculateWinRate(wins, losses) {
  if (typeof wins !== 'number' || typeof losses !== 'number') return '0.0';
  const total = wins + losses;
  if (total === 0) return '0.0';
  return ((wins / total) * 100).toFixed(1);
}

/**
 * Format timestamp to readable date
 * @param {number} timestamp - Unix timestamp
 * @returns {string} - Formatted date string
 */
function formatDate(timestamp) {
  if (!timestamp || typeof timestamp !== 'number') return 'N/A';
  try {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (error) {
    return 'Invalid Date';
  }
}

/**
 * Make API request with error handling, timeout, and validation
 * @param {string} endpoint - API endpoint
 * @returns {Promise<any>} - API response data
 */
async function makeApiRequest(endpoint) {
  try {
    // Validate endpoint format
    if (!endpoint || typeof endpoint !== 'string') {
      throw new Error('Invalid endpoint');
    }
    
    const response = await axios.get(`${API_BASE_URL}${endpoint}`, {
      timeout: 10000, // 10 second timeout
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Dota2StatsViewer/1.0'
      },
      maxRedirects: 5,
      validateStatus: (status) => status >= 200 && status < 300
    });
    
    // Validate response is JSON
    if (typeof response.data !== 'object') {
      throw new Error('Invalid API response format');
    }
    
    return { success: true, data: response.data };
  } catch (error) {
    // Log error securely (don't expose sensitive info)
    console.error(`API Error [${endpoint}]:`, {
      message: error.message,
      code: error.code,
      timestamp: new Date().toISOString()
    });
    
    // Return generic error message to client
    return { 
      success: false, 
      error: 'Unable to fetch data at this time. Please try again later.'
    };
  }
}

/**
 * Generic error renderer with security considerations
 * @param {object} res - Express response object
 * @param {string} title - Error title
 * @param {string} message - User-friendly error message
 */
function renderError(res, title, message) {
  res.status(500).render('error', { 
    title: title || 'Error',
    message: message || 'An unexpected error occurred',
    error: NODE_ENV === 'development' ? 'Check console for details' : 'Please try again later'
  });
}

// ============================================
// INPUT VALIDATION MIDDLEWARE
// ============================================

const validateTeamId = [
  param('id')
    .isInt({ min: 1, max: Number.MAX_SAFE_INTEGER })
    .withMessage('Invalid team ID'),
];

const validatePlayerId = [
  param('id')
    .isInt({ min: 1, max: Number.MAX_SAFE_INTEGER })
    .withMessage('Invalid player ID'),
];

const validateSearchQuery = [
  body('query')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Search query must be between 1 and 100 characters')
    .matches(/^[a-zA-Z0-9\s\-_]+$/)
    .withMessage('Search query contains invalid characters'),
];

// ============================================
// ROUTES
// ============================================

/**
 * Home Page - Display featured content and navigation
 */
app.get('/', (req, res) => {
  res.render('index', { 
    title: 'Dota 2 Stats Viewer',
    formatNumber,
    calculateWinRate,
    formatDate
  });
});

/**
 * Pro Teams Page - Display professional Dota 2 teams
 */
app.get('/teams', apiLimiter, async (req, res) => {
  try {
    const result = await makeApiRequest('/teams');
    
    if (!result.success) {
      return renderError(res, 'Error', 'Failed to fetch teams data');
    }

    // Filter and sort teams by rating (top 50)
    const teams = (result.data || [])
      .filter(team => team && team.rating && team.wins && team.losses)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 50);

    res.render('teams', { 
      title: 'Professional Teams',
      teams,
      formatNumber,
      calculateWinRate,
      formatDate
    });
  } catch (error) {
    console.error('Route Error [/teams]:', error.message);
    renderError(res, 'Error', 'An unexpected error occurred');
  }
});

/**
 * Team Details Page - Display specific team information
 */
app.get('/team/:id', validateTeamId, apiLimiter, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('error', {
        title: 'Invalid Request',
        message: 'Invalid team ID provided',
        error: 'Please check the URL and try again'
      });
    }

    const teamId = parseInt(req.params.id, 10);
    
    // Fetch team details
    const teamResult = await makeApiRequest(`/teams/${teamId}`);
    
    if (!teamResult.success) {
      return renderError(res, 'Error', 'Failed to fetch team details');
    }

    // Fetch team players
    const playersResult = await makeApiRequest(`/teams/${teamId}/players`);
    
    res.render('team-details', { 
      title: `Team: ${sanitizeInput(teamResult.data?.name || 'Unknown')}`,
      team: teamResult.data,
      players: playersResult.success ? playersResult.data : [],
      formatNumber,
      calculateWinRate,
      formatDate
    });
  } catch (error) {
    console.error('Route Error [/team/:id]:', error.message);
    renderError(res, 'Error', 'An unexpected error occurred');
  }
});

/**
 * Pro Players Page - Display professional Dota 2 players
 */
app.get('/players', apiLimiter, async (req, res) => {
  try {
    const result = await makeApiRequest('/proPlayers');
    
    if (!result.success) {
      return renderError(res, 'Error', 'Failed to fetch players data');
    }

    // Filter active players (top 100)
    const players = (result.data || [])
      .filter(player => player && player.name)
      .slice(0, 100);

    res.render('players', { 
      title: 'Professional Players',
      players,
      formatNumber,
      calculateWinRate,
      formatDate
    });
  } catch (error) {
    console.error('Route Error [/players]:', error.message);
    renderError(res, 'Error', 'An unexpected error occurred');
  }
});

/**
 * Player Details Page - Display specific player information
 */
app.get('/player/:id', validatePlayerId, apiLimiter, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('error', {
        title: 'Invalid Request',
        message: 'Invalid player ID provided',
        error: 'Please check the URL and try again'
      });
    }

    const playerId = parseInt(req.params.id, 10);
    
    // Fetch player details
    const playerResult = await makeApiRequest(`/players/${playerId}`);
    
    if (!playerResult.success) {
      return renderError(res, 'Error', 'Failed to fetch player details');
    }

    // Fetch player win/loss stats
    const wlResult = await makeApiRequest(`/players/${playerId}/wl`);
    
    // Fetch player recent matches (last 20)
    const matchesResult = await makeApiRequest(`/players/${playerId}/recentMatches`);
    
    res.render('player-details', { 
      title: `Player: ${sanitizeInput(playerResult.data?.profile?.personaname || 'Unknown')}`,
      player: playerResult.data,
      winLoss: wlResult.success ? wlResult.data : { win: 0, lose: 0 },
      recentMatches: matchesResult.success ? (matchesResult.data || []).slice(0, 20) : [],
      formatNumber,
      calculateWinRate,
      formatDate
    });
  } catch (error) {
    console.error('Route Error [/player/:id]:', error.message);
    renderError(res, 'Error', 'An unexpected error occurred');
  }
});

/**
 * Heroes Page - Display all Dota 2 heroes with statistics
 */
app.get('/heroes', apiLimiter, async (req, res) => {
  try {
    // Fetch heroes data
    const heroesResult = await makeApiRequest('/heroes');
    
    if (!heroesResult.success) {
      return renderError(res, 'Error', 'Failed to fetch heroes data');
    }

    // Fetch hero stats
    const statsResult = await makeApiRequest('/heroStats');
    
    res.render('heroes', { 
      title: 'Dota 2 Heroes',
      heroes: heroesResult.data || [],
      heroStats: statsResult.success ? statsResult.data : [],
      formatNumber,
      calculateWinRate,
      formatDate
    });
  } catch (error) {
    console.error('Route Error [/heroes]:', error.message);
    renderError(res, 'Error', 'An unexpected error occurred');
  }
});

/**
 * Live Games Page - Display currently ongoing professional matches
 */
app.get('/live', apiLimiter, async (req, res) => {
  try {
    const result = await makeApiRequest('/live');
    
    if (!result.success) {
      return renderError(res, 'Error', 'Failed to fetch live games');
    }

    res.render('live', { 
      title: 'Live Professional Matches',
      games: result.data || [],
      formatNumber,
      calculateWinRate,
      formatDate
    });
  } catch (error) {
    console.error('Route Error [/live]:', error.message);
    renderError(res, 'Error', 'An unexpected error occurred');
  }
});

/**
 * Search functionality - Search for players or teams
 */
app.post('/search', searchLimiter, validateSearchQuery, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('error', {
        title: 'Invalid Search',
        message: 'Invalid search query provided',
        error: 'Please use only letters, numbers, spaces, hyphens, and underscores'
      });
    }

    const searchQuery = sanitizeInput(req.body.query);
    
    if (!searchQuery || searchQuery.length === 0) {
      return res.redirect('/');
    }

    // Search for players
    const result = await makeApiRequest(`/search?q=${encodeURIComponent(searchQuery)}`);
    
    if (!result.success) {
      return renderError(res, 'Error', 'Failed to perform search');
    }

    res.render('search-results', { 
      title: `Search Results: ${searchQuery}`,
      query: searchQuery,
      results: result.data || [],
      formatNumber,
      calculateWinRate,
      formatDate
    });
  } catch (error) {
    console.error('Route Error [/search]:', error.message);
    renderError(res, 'Error', 'An unexpected error occurred');
  }
});

/**
 * 404 Error Handler - Page not found
 */
app.use((req, res) => {
  res.status(404).render('error', {
    title: '404 - Page Not Found',
    message: 'The page you are looking for does not exist',
    error: 'Please check the URL or return to the home page'
  });
});

/**
 * Global Error Handler
 */
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', {
    message: err.message,
    stack: NODE_ENV === 'development' ? err.stack : undefined,
    timestamp: new Date().toISOString()
  });
  
  res.status(err.status || 500).render('error', {
    title: 'Server Error',
    message: 'An unexpected error occurred',
    error: NODE_ENV === 'development' ? err.message : 'Please try again later'
  });
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
  console.log(`🚀 Dota 2 Stats Viewer is running on http://localhost:${PORT}`);
  console.log(`📊 Connected to OpenDota API: ${API_BASE_URL}`);
  console.log(`🔒 Security: Helmet enabled, Rate limiting active`);
  console.log(`🌍 Environment: ${NODE_ENV}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully...');
  process.exit(0);
});
