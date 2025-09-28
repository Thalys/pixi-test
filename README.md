# Softgames GameDev Test

A PixiJS-based game development project implementing three game demos for a SoftGames technical test.

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (JavaScript runtime and package manager)

### Installation

```bash
# (*At the location where you placed the repository*)
# Install dependencies
bun install
```

### Development

```bash
# Start development server
bun run dev
```

This will start a local development server. The application will automatically reload when you make changes.

## Project Structure

- `/src/engine/` - Core engine functionality and utilities
- `/src/app/screens/` - Individual game screens (Screen 1-3)
- `/src/app/features/` - Shared game features (e.g., chat system)
- `/src/fire/` - Fire effect implementation
- `/src/anime/` - Animation utilities and presets

## Requirements

- Write your code in TypeScript and use pixi.js (v7) for rendering.
- Each task should be accessed via an in-game menu.
- Render responsively for both mobile and desktop devices.
- Display the fps in the top left corner.
- Run the application in full screen.

### 1. Ace of Shadows

#### Description

Create 144 sprites (NOT graphic objects)
that are stacked on top of each other like cards in a deck

The top card must cover the bottom card, but not completely

Every 1 second the top card should move to a different stack
the animation of the movement should take 2 seconds

### 2. Magic Words

#### Description

Create a system that allows you to combine text and images like custom emojis

Use it to render a dialogue between characters with the data taken from this

endpoint: https://private-624120-softgamesassignment.apiary-mock.com/v2/magicwords

### 3. Phoenix Flame

#### Description

Make a particle-effect demo showing a great fire effect. Keep the number of

images at max 10 sprites on the screen at the same time.

## Misc

> **["A man chooses, a slave obeys"](https://www.youtube.com/watch?v=oG25S51qJQQ)**\
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;— [_Andrew Ryan_](https://bioshock.fandom.com/wiki/Andrew_Ryan)
