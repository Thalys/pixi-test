# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands

- `bun dev` - Start development server on port 3489
- `bun check` - Run both typecheck and lint
- `bun fix` - Run typecheck followed by lint:fix

### Other Commands

- `bun build` - Build the project for production (includes typecheck)
- `bun clean` - Clean dist, node_modules, and generated files
- `bun lint` - Run ESLint
- `bun lint:fix` - Run ESLint with auto-fix
- `bun typecheck` - Run TypeScript type checking
- `bun preview` - Preview the production build

## Project Architecture

This is a **Pixi.js v8 game development project** built with TypeScript, Vite, and Bun. The project is for the "Softgames GameDev Test" which involves creating card animation demos.

### Key Architecture Components

**CreationEngine (`/src/engine/engine.ts`)**: The main game engine that handles initialization, rendering, and core game systems. Acts as the central orchestrator for the entire application.

**Engine Singleton (`/src/app/engine-singleton.ts`)**: Provides global access to the engine instance throughout the application.

**Navigation System (`/src/engine/navigation/`)**: Handles screen transitions and popup management. Screens are shown via `engine.navigation.showScreen()` and popups via `engine.navigation.presentPopup()`.

**Screen-Based Architecture (`/src/app/screens/`)**: The app uses a screen-based navigation system where different game states/views are organized as screens (LoadScreen, etc.).

### Directory Structure

- `src/app/` - Application-level code (screens, popups, UI components, utils)
- `src/engine/` - Core engine systems (audio, navigation, resize handling, utilities)
- `src/tools/` - Development and utility tools
- `raw-assets/` - Source assets before processing
- `public/` - Processed/built assets

### Asset Processing

The project uses AssetPack for asset processing. Assets are processed from `raw-assets/` into `public/` during build.

### Import Alias

- `@/` maps to `src/` directory

### ESLint Configuration

- Uses @antfu/eslint-config with strict TypeScript rules
- 2-space indentation, single quotes, no semicolons
- Strict type checking enabled with noUnusedLocals
- Format support for CSS, HTML, and Markdown

## Development Notes

- **Bun Runtime**: This project uses Bun as the JavaScript runtime and package manager
- **Vite Build**: Uses rolldown-vite (alternative Vite implementation) for building
- **PIXI DevTools**: Available in development mode for debugging
- **Responsive Design**: Engine configured with minWidth: 768, minHeight: 1024
- **TypeScript Strict**: Strict type checking enabled with comprehensive rules
