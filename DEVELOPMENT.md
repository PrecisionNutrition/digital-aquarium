# Digital Aquarium Development Guide

## Quick Start

```bash
# Install dependencies
yarn install

# Start the Electron app in development mode
yarn dev

# Run all checks (types, lint, format, tests)
yarn check:all
```

## Available Scripts

- `yarn dev` - Start the Electron desktop app with hot reload
- `yarn build` - Build the app for production
- `yarn test` - Run tests in watch mode
- `yarn test:coverage` - Run tests with coverage report
- `yarn lint` - Run ESLint
- `yarn format` - Format code with Prettier
- `yarn format:check` - Check code formatting
- `yarn typecheck` - Run TypeScript type checking
- `yarn check:all` - Run all checks (types, lint, format, tests)

## Pre-commit Hook

A pre-commit hook is configured to run `yarn check:all` before every commit. This ensures:
- TypeScript compiles without errors
- ESLint rules pass
- Code is properly formatted
- All tests pass with coverage

To bypass the hook in emergencies: `git commit --no-verify`

## Development Workflow

1. Make your changes
2. Test locally with `yarn dev`
3. Run `yarn check:all` to verify everything passes
4. Commit your changes (pre-commit hook will run automatically)
5. Push to GitHub

## CI/CD

GitHub Actions runs on every push and pull request:
- Uses Node.js 20.x (latest LTS)
- Runs all type checking, linting, and tests
- Builds the application
- Reports code coverage

## Package Management

This project uses Yarn. Please use `yarn add` to install new dependencies:

```bash
# Add a production dependency
yarn add package-name

# Add a development dependency
yarn add -D package-name
```

## Testing

Tests use Vitest with the following setup:
- Unit tests in `tests/unit/`
- Coverage threshold: 50% (lines, functions, statements), 75% (branches)
- Canvas API is mocked for component tests
- Run with `yarn test` or `yarn test:coverage`

## Electron Development

The app uses:
- Electron for the desktop framework
- React for the UI
- Vite for fast development builds
- 2D Canvas for the aquarium rendering

Main process code is in `src/main/`
Renderer process code is in `src/renderer/`
Shared types and utilities are in `src/shared/`
