# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Essential Development Commands

**Primary Development:**
- `yarn dev` - Start Electron desktop app with hot reload (main command)
- `yarn test` - Run tests in watch mode during development
- `yarn check:all` - Run ALL checks (types, lint, format, tests) - runs on pre-commit

**Quality Assurance:**
- `yarn typecheck` - TypeScript type checking (must pass)
- `yarn lint` - ESLint checking (must pass)
- `yarn format` - Auto-format code with Prettier
- `yarn test:coverage` - Run tests with coverage report (>50% required)

**Build & Deploy:**
- `yarn build` - Build for production (creates Electron app)

## Architecture Overview

This is an **Electron desktop application** that visualizes computer activity as a 2D virtual aquarium where different fish represent different applications, and aquarium health reflects work-life balance.

### Key Architecture Decisions:
- **Desktop Framework**: Electron (not web-based)
- **UI**: React 18+ with TypeScript
- **Rendering**: 2D Canvas API (NOT Three.js - deliberately chosen for 2D)
- **Styling**: Material UI + Tailwind CSS
- **Package Manager**: Yarn exclusively (never npm)
- **Build Tool**: Vite for fast development
- **Testing**: Vitest with React Testing Library

### Process Architecture:
- **Main Process**: `src/main/index.ts` - Electron main process with IPC handlers
- **Renderer Process**: `src/renderer/main.tsx` - React app entry point
- **Preload**: `src/preload/index.ts` - Security bridge between main/renderer
- **Shared**: `src/shared/types/index.ts` - TypeScript types shared across processes

### Core Components:
- **AquariumCanvas**: 2D canvas rendering the fish/aquarium (`src/renderer/components/aquarium/`)
- **Activity Monitoring**: IPC-based system monitoring (main process)
- **Fish System**: Fish spawned based on app usage, health reflects work-life balance

### Critical Configuration:
- Path aliases: `@main`, `@renderer`, `@shared` are configured in both vite.config.ts and vitest.config.ts
- Security: Electron runs with `contextIsolation: true`, `sandbox: true`, `nodeIntegration: false`
- Pre-commit hooks automatically run `yarn check:all` - cannot be bypassed

## Project Constraints

**Absolute Requirements:**
1. **Yarn Only**: Never use npm commands, always yarn
2. **Local-Only**: All data stays on user's machine, no cloud sync or telemetry
3. **Fail Hard**: All errors should throw exceptions, no silent failures
4. **macOS Priority**: Primary development target, though cross-platform
5. **Canvas 2D**: Use Canvas API, not Three.js (user preference)

**Test Requirements:**
- Minimum 50% coverage (lines/functions/statements), 75% branches
- Canvas API is mocked in `tests/setup.ts`
- Use Arrange-Act-Assert pattern
- No snapshot tests (considered brittle)

**Code Style:**
- TypeScript strict mode enabled
- ESLint + Prettier enforced
- Pre-commit hooks prevent commits that fail checks
- Material UI theme configured in `src/renderer/main.tsx`

## Common Development Patterns

**Adding Dependencies:**
```bash
yarn add package-name          # Production
yarn add -D package-name       # Development
```

**IPC Communication:**
- Main process handlers in `src/main/index.ts` setupIpcHandlers()
- Preload exposes APIs via `window.electronAPI`
- Renderer calls via `window.electronAPI.methodName()`

**Testing:**
- Unit tests in `tests/unit/`
- Canvas mocking is already configured
- Run `yarn test` during development

## File Structure Notes

- Configuration files: `vite.config.ts`, `vitest.config.ts`, `package.json`
- Cursor AI rules in `.cursor/rules/` (project has comprehensive AI guidance)
- Pre-built releases in `release/` directory
- Coverage reports generated in `coverage/`