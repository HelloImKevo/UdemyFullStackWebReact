# React + Vite

Created with:
```bash
npm create vite@latest vite-template-app --template react
```

Vite requires Node.js version 20.19+ or 22.12+. Please upgrade your Node.js version.  

See: https://nodejs.org/en/download  

To start the development server:
```bash
npm run dev
```

Open the Vite app in a web browser: http://localhost:5173/  

---

## Exercise Launcher

This app doubles as a **springboard** for micro exercise pages. The default Vite splash page includes an **Exercises** section with links that route to standalone exercise pages built with React.

### Time-Based Greeting (`/greeting`)

A single-page exercise demonstrating dynamic rendering and inline CSS in React.

**Requirements:**
- Display an `<h1>` greeting that changes based on the time of day:
  - **Good Morning** — midnight to 12 PM
  - **Good Afternoon** — 12 PM to 6 PM
  - **Good Evening** — 6 PM to midnight
- The heading uses the `.heading` class from `GreetingPage.css`.
- The heading color changes dynamically via inline styles:
  - Morning = **red**, Afternoon = **green**, Evening = **blue**
- A `<input type="time">` picker lets the user change the time interactively (defaults to the current clock time on load).

**Key files:**
| File | Purpose |
|------|---------|
| `src/main.jsx` | Sets up `BrowserRouter` with routes for `/` and `/greeting` |
| `src/App.jsx` | Splash page with the exercise launcher section |
| `src/pages/GreetingPage.jsx` | Greeting exercise component |
| `src/pages/GreetingPage.css` | Styles for the greeting page (`.heading` class) |

**Added dependency:** `react-router-dom` — client-side routing between the splash page and exercise pages.

---

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
