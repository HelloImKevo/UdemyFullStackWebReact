# Drum Kit Project

An interactive drum kit web application that allows users to play drum sounds by clicking on buttons or pressing keyboard keys.

![Drum Kit Interface](images/kit-preview.png)

## Features

- Interactive drum sounds triggered by mouse clicks
- Keyboard support for playing drums (keys W, A, S, D, J, K, L)
- Visual feedback with button animations
- TypeScript support for better code quality and development experience

## Project Structure

```
project-drum-kit/
├── dist/               # Compiled JavaScript (generated)
├── images/             # Drum button images
├── sounds/             # Audio files for drum sounds
├── src/                # TypeScript source files
│   └── index.ts        # Main application logic
├── index.html          # Main HTML page
├── styles.css          # CSS styling
├── package.json        # Project dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```

## TypeScript Setup

This project uses TypeScript for type safety and better development experience. Here's how to work with the TypeScript setup:

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- npm (comes with Node.js)

### Installation

1. Clone or download this repository
2. Navigate to the project directory:
 ```bash
 cd project-drum-kit
 ```
3. Install dependencies:
 ```bash
 npm install
 ```

### Development

- **Build the project once**:
 ```bash
 npm run build
 ```
 This compiles the TypeScript files from `src/` into JavaScript in the `dist/` directory.

- **Watch mode for development**:
 ```bash
 npm run watch
 ```
 This starts the TypeScript compiler in watch mode, automatically recompiling files when they change.

### Key TypeScript Features

- Strong typing for drum keys (`w`, `a`, `s`, `d`, `j`, `k`, `l`)
- Type-safe event handling
- Clear sound file mapping
- Error handling for audio playback

## Running the Application

After building the project, simply open `index.html` in your web browser to use the drum kit.
