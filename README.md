# Sandboxi

A pixel-based sandbox simulation built with TypeScript, Vite, and PixiJS. Paint materials, watch them interact, and experiment with a tiny cellular world.

[Try it out here!](https://marcusk00.github.io/Sandboxi/)

## Features
- Real-time cellular simulation loop (sand, water, fire, lava, electric, glitch, and more).
- Material palette UI with mouse-based painting and eraser support.
- Lightweight renderer powered by PixiJS.

## Controls
- **Left click / drag:** paint the selected material.
- **Right click:** eraser.
- **R:** reset the simulation.

## Getting started
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Project structure
- `src/engine/` — simulation loop, rendering, and input handling.
- `src/materials/` — material behaviors and color definitions.
- `src/ui/` — in-game UI and material picker.
- `src/world/` — grid and world data structures.

## Tech stack
- TypeScript
- Vite
- PixiJS
