# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@../../.claude/docs/dev-commands.md

## Project Architecture

This is a **PixiJS-based game development project** implementing three game demos for a SoftGames technical test.
The project uses TypeScript, Bun as the runtime, and Vite for bundling.

### Core Architecture

- **Engine Layer**: Custom `CreationEngine` class extends PixiJS Application with additional features:
  - Navigation system for screen management
  - Audio management with @pixi/sound
  - Responsive resize handling
  - Visibility change handling (pause/resume)

- **Screen-based Navigation**: Each game demo is implemented as a separate screen:
  - `Screen1`: "Ace of Shadows" - 144 stacked card sprites with movement animation
  - `Screen2`: "Magic Words" - Text/image combination system with API-driven dialogue
  - `Screen3`: "Phoenix Flame" - Fire particle effect demo (currently in development)

- **Modular Structure**:
  - `/engine/` - Core engine functionality and utilities
  - `/app/screens/` - Individual game screens and UI components
  - `/app/features/` - Shared game features (e.g., chat system)
  - `/fire/` - Fire effect implementation (Doom fire algorithm)
  - `/anime/` - Animation utilities and presets

### Key Technologies

- **PixiJS v8.8.1** for 2D rendering
- **@pixi/sound** for audio management
- **@pixi/ui** for UI components
- **Motion** library for advanced animations
- **Bun** as JavaScript runtime and package manager
- **TypeScript** with strict type checking
- **ESLint** with @antfu/eslint-config for code quality
- **Vite** for bundling and development

# PixiJS Project Instructions

This project uses PixiJS. When working on this codebase, you have access to comprehensive PixiJS v8.x documentation.

## Documentation Access

**Local Documentation Path:** `$PIXIJS_DOCS_PATH`

- Full path: `/Users/thalys/dev/llms/llms-txt/PixiJS/normal/downloaded_docs/`
- Contains complete PixiJS v8.x documentation
- Always prioritize this documentation over general knowledge

## Key Documentation Files

When working on PixiJS features, reference these specific files:

### Getting Started & Setup

- **Quick Start:** `$PIXIJS_DOCS_PATH/guides/getting-started/quick-start.md`
- **Application Setup:** `$PIXIJS_DOCS_PATH/guides/components/application.md`
- **Architecture:** `$PIXIJS_DOCS_PATH/guides/concepts/architecture.md`

### Performance & Optimization

- **Performance Tips:** `$PIXIJS_DOCS_PATH/guides/concepts/performance-tips.md`
- **Render Groups:** `$PIXIJS_DOCS_PATH/guides/concepts/render-groups.md`
- **Render Layers:** `$PIXIJS_DOCS_PATH/guides/concepts/render-layers.md`
- **Garbage Collection:** `$PIXIJS_DOCS_PATH/guides/concepts/garbage-collection.md`

### Core Components

- **Scene Graph:** `$PIXIJS_DOCS_PATH/guides/concepts/scene-graph.md`
- **Textures:** `$PIXIJS_DOCS_PATH/guides/components/textures.md`
- **Sprites:** `$PIXIJS_DOCS_PATH/guides/components/scene-objects/sprite.md`
- **Graphics:** `$PIXIJS_DOCS_PATH/guides/components/scene-objects/graphics.md`
- **Containers:** `$PIXIJS_DOCS_PATH/guides/components/scene-objects/container.md`

### Text Rendering

- **Text Overview:** `$PIXIJS_DOCS_PATH/guides/components/scene-objects/text.md`
- **Canvas Text:** `$PIXIJS_DOCS_PATH/guides/components/scene-objects/text/canvas.md`
- **Bitmap Text:** `$PIXIJS_DOCS_PATH/guides/components/scene-objects/text/bitmap.md`
- **HTML Text:** `$PIXIJS_DOCS_PATH/guides/components/scene-objects/text/html.md`
- **Text Styling:** `$PIXIJS_DOCS_PATH/guides/components/scene-objects/text/style.md`

### Advanced Features

- **Filters & Blend Modes:** `$PIXIJS_DOCS_PATH/guides/components/filters.md`
- **Events & Interaction:** `$PIXIJS_DOCS_PATH/guides/components/events.md`
- **Asset Loading:** `$PIXIJS_DOCS_PATH/guides/components/assets.md`
- **Mesh Objects:** `$PIXIJS_DOCS_PATH/guides/components/scene-objects/mesh.md`
- **Particle Systems:** `$PIXIJS_DOCS_PATH/guides/components/scene-objects/particle-container.md`

### Animation & Timing

- **Ticker:** `$PIXIJS_DOCS_PATH/guides/components/ticker.md`
- **Render Loop:** `$PIXIJS_DOCS_PATH/guides/concepts/render-loop.md`

### Utilities

- **Math Utilities:** `$PIXIJS_DOCS_PATH/guides/components/math.md`
- **Color Handling:** `$PIXIJS_DOCS_PATH/guides/components/color.md`
- **Accessibility:** `$PIXIJS_DOCS_PATH/guides/components/accessibility.md`

## Instructions for Claude Code

When working on this PixiJS project:

1. **Always check the local documentation first** before providing guidance
2. **Use the Read tool** to access specific documentation files when needed
3. **Reference exact file paths** when explaining concepts
4. **Provide up-to-date v8.x information** based on the local docs
5. **Check migration guide** at `$PIXIJS_DOCS_PATH/guides/migrations/v8.md` for v8 changes

## Common Tasks & Documentation

- **Setting up a new PixiJS app** → Read: `guides/getting-started/quick-start.md`
- **Performance issues** → Read: `guides/concepts/performance-tips.md`
- **Rendering problems** → Read: `guides/concepts/render-loop.md` and `guides/concepts/render-groups.md`
- **Asset loading issues** → Read: `guides/components/assets.md`
- **Text rendering** → Read: `guides/components/scene-objects/text.md`
- **Event handling** → Read: `guides/components/events.md`
- **Graphics API** → Read: `guides/components/scene-objects/graphics.md`

## Debugging Help

If encountering issues:

1. Check the **FAQ:** `$PIXIJS_DOCS_PATH/faq.md`
2. Review **architecture concepts:** `$PIXIJS_DOCS_PATH/guides/concepts/architecture.md`
3. Verify **environment setup:** `$PIXIJS_DOCS_PATH/guides/concepts/environments.md`

Always prioritize information from these local documentation files over general PixiJS knowledge.

### Asset Management

- Assets are managed through a manifest system (`manifest.json`)
- Bundle-based loading with preload and per-screen bundles
- Asset processing with @assetpack/core

### Development Notes

- Engine singleton pattern for global access (`engine.singleton.ts`)
- Responsive design
- Type-safe configuration through TypeScript interfaces
