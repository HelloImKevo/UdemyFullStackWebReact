# Quick Start Guide

## 🚀 Start the Application

```bash
cd capstone-project-3
npm install
npm start
```

Visit: `http://localhost:3000`

## 📋 Quick Commands

| Command | Description |
|---------|-------------|
| `npm start` | Start the server (production) |
| `npm run dev` | Start with nodemon (development) |
| `node index.js` | Direct server start |
| `lsof -i :3000` | Check port 3000 usage (macOS/Linux) |

## 🔗 Quick Links

- Home Page: `http://localhost:3000/`
- New Post: `http://localhost:3000/new`

## 🎯 Key Features

1. **Create** - Click "New Post" button
2. **Read** - View posts on home page
3. **Update** - Click edit icon on any post
4. **Delete** - Click trash icon with confirmation

## 📱 Test Responsive Design

Open Chrome DevTools (F12) and test these viewports:
- Mobile: 375px × 667px (iPhone)
- Tablet: 768px × 1024px (iPad)
- Desktop: 1920px × 1080px

## 🐛 Quick Troubleshooting

**Port in use?**
```bash
PORT=3001 npm start
```

**Clear all posts?**
```bash
# Just restart the server (Ctrl+C then npm start)
```

**Styles not loading?**
```bash
# Check: http://localhost:3000/css/styles.css
# Should return CSS, not 404
```

## 📂 Project Structure

```
capstone-project-3/
├── index.js          # Server & routes
├── views/            # EJS templates
│   ├── partials/     # Reusable components
│   ├── index.ejs     # Home page
│   ├── new.ejs       # Create form
│   ├── edit.ejs      # Edit form
│   ├── post.ejs      # Single post view
│   └── error.ejs     # Error page
└── public/css/       # Stylesheets
    └── styles.css    # Main CSS
```

## 🎨 Color Reference

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Blue | `#2563eb` | Buttons, links |
| Danger Red | `#dc2626` | Delete actions |
| Success Green | `#16a34a` | Success states |
| Text Dark | `#0f172a` | Main text |
| Background | `#f8fafc` | Page background |

## 🔧 Configuration

**Change Port:**
```javascript
// In index.js, line 10
const port = process.env.PORT || 3000;
```

**Modify Colors:**
```css
/* In public/css/styles.css, :root section */
--primary-color: #2563eb;
```

## 📊 API Endpoints Summary

```
GET    /                    → Home (all posts)
GET    /new                 → New post form
POST   /posts               → Create post
GET    /posts/:id           → View single post
GET    /posts/:id/edit      → Edit form
POST   /posts/:id/edit      → Update post
POST   /posts/:id/delete    → Delete post
```

## ✅ Testing Checklist

- [ ] Create a post
- [ ] View post list
- [ ] Read full post
- [ ] Edit a post
- [ ] Delete a post
- [ ] Test validation (empty fields)
- [ ] Test on mobile view
- [ ] Test on tablet view

## 🎓 Learning Points

1. **Express.js Routing** - RESTful API structure
2. **EJS Templating** - Dynamic HTML rendering
3. **CSS Grid/Flexbox** - Responsive layouts
4. **Form Handling** - POST requests & validation
5. **CRUD Operations** - Full data lifecycle
6. **Middleware** - body-parser for forms
7. **ES6 Modules** - Modern JavaScript
8. **Semantic HTML** - Proper markup

---

**Need Help?** Check the full README.md for detailed documentation.
