# Basic Repository Structure and Standards

## Overview
This document outlines the foundational principles and standards for the Digital Aquarium repository. These guidelines ensure consistency, maintainability, and scalability across the codebase.

## Core Principles

### 1. Separation of Concerns
- **Electron Process Separation**: Main process handles system operations, renderer handles UI
- **Business Logic Isolation**: Core logic separated from UI components
- **Data Layer Abstraction**: Clear boundaries between data persistence and application logic

### 2. File Organization Philosophy
```
Each file should have ONE clear responsibility:
- Components: Single React component per file
- Services: Single service class per file
- Utilities: Related utility functions grouped logically
- Types: Domain-specific type definitions
```

### 3. Naming Conventions
- **Files**:
  - Components: `PascalCase.tsx` (e.g., `FishEntity.tsx`)
  - Utilities: `camelCase.ts` (e.g., `activityParser.ts`)
  - Types: `PascalCase.types.ts` (e.g., `Aquarium.types.ts`)
  - Tests: `[name].test.ts` or `[name].spec.ts`
- **Directories**: `kebab-case` (e.g., `activity-monitor`)
- **Constants**: `SCREAMING_SNAKE_CASE`
- **Interfaces**: Prefix with `I` (e.g., `IFish`)

### 4. Import/Export Standards
```typescript
// ✅ Named exports for utilities and components
export function calculateHealth(metrics: HealthMetrics): number { }
export const FishComponent: React.FC<FishProps> = () => { }

// ✅ Default exports only for pages/main components
export default function App() { }

// ✅ Barrel exports for clean imports
// index.ts in components/aquarium/
export * from './FishEntity';
export * from './WaterEffect';
export * from './AquariumScene';
```

### 5. Dependency Management

#### Package Selection Criteria
1. **Popularity**: Prefer packages with >1000 weekly downloads
2. **Maintenance**: Last update within 6 months
3. **Security**: No known vulnerabilities
4. **License**: MIT, Apache 2.0, or similar permissive
5. **Size**: Consider bundle impact for renderer process

#### Version Management
```json
{
  "dependencies": {
    "react": "^18.2.0",  // Caret for minor updates
    "electron": "~28.0.0", // Tilde for patch updates only
    "three": "0.160.0"  // Exact version for critical deps
  }
}
```

### 6. Module Boundaries

#### Main Process Modules
- **IPC Handlers**: All IPC communication through defined channels
- **System Access**: File system, native APIs
- **Window Management**: BrowserWindow lifecycle
- **Activity Monitoring**: System-level activity tracking

#### Renderer Process Modules
- **React Components**: UI rendering and interaction
- **Three.js Scenes**: 3D rendering pipeline
- **State Management**: Application state
- **Services**: Business logic and calculations

#### Shared Modules
- **Types**: TypeScript interfaces and types
- **Constants**: Shared configuration values
- **Utilities**: Pure functions used by both processes

### 7. Testing Structure
```
tests/
├── unit/           # Fast, isolated tests
├── integration/    # Component and service integration
├── e2e/           # Full application workflows
└── fixtures/      # Test data and mocks
```

### 8. Configuration Management
- **Environment Variables**: `.env` files for local development
- **Build Configuration**: Separate configs for dev/prod
- **Feature Flags**: Runtime toggles for features
- **User Preferences**: Stored in appropriate OS locations

### 9. Security Standards
- **No Hardcoded Secrets**: Use environment variables
- **Input Validation**: Validate all external inputs
- **Secure IPC**: Whitelist allowed IPC channels
- **CSP Headers**: Strict content security policy

### 10. Performance Guidelines
- **Lazy Loading**: Code split for faster initial load
- **Memoization**: Cache expensive computations
- **Virtual Rendering**: Use virtualization for lists
- **Resource Cleanup**: Proper disposal of Three.js objects

## Development Workflow

### 1. Branch Strategy
```
main           # Production-ready code
├── develop    # Integration branch
└── feature/*  # Feature branches
```

### 2. Commit Standards
```
type(scope): subject

body (optional)

footer (optional)
```
Types: feat, fix, docs, style, refactor, test, chore

### 3. Code Quality Gates
- **Linting**: Must pass ESLint rules
- **Formatting**: Prettier auto-formatting
- **Type Safety**: No TypeScript errors
- **Test Coverage**: Minimum 80% coverage
- **Build Success**: Must build without warnings

### 4. Documentation Requirements
- **Public APIs**: JSDoc comments required
- **Complex Logic**: Inline explanations
- **Architecture Decisions**: Document in ADRs
- **User-Facing Features**: Update user guide

## Package Management Philosophy

### Core Dependencies
Only dependencies absolutely necessary for core functionality:
- `electron`: Desktop framework
- `react`: UI library
- `three`: 3D graphics
- Essential supporting packages

### Development Dependencies
Tools that enhance development experience:
- `typescript`: Type safety
- `vite`: Build tooling
- `vitest`: Testing framework
- `eslint` & `prettier`: Code quality

### Dependency Updates
- **Security Updates**: Immediate
- **Major Updates**: Quarterly review
- **Minor Updates**: Monthly
- **Patch Updates**: Automated via Dependabot

## Anti-Patterns to Avoid

### 1. File Organization
❌ Mixing concerns in single files
❌ Deeply nested directory structures (>4 levels)
❌ Circular dependencies
❌ God objects/components

### 2. Code Style
❌ Commented-out code
❌ TODO comments without tickets
❌ Magic numbers without constants
❌ Copy-paste programming

### 3. Error Handling
❌ Swallowing errors silently
❌ Generic catch-all handlers
❌ Using exceptions for control flow
❌ Returning null/undefined for errors

### 4. Testing
❌ Tests that always pass
❌ Brittle tests dependent on timing
❌ Tests without assertions
❌ Skipped/commented tests

## Monitoring and Metrics

### Code Quality Metrics
- **Coverage**: Target >80%
- **Complexity**: Cyclomatic complexity <10
- **Duplication**: <3% duplicate code
- **Dependencies**: Regular audit for vulnerabilities

### Performance Metrics
- **Startup Time**: <3 seconds
- **Memory Usage**: <200MB baseline
- **Frame Rate**: 60fps for animations
- **CPU Usage**: <10% idle

## Future Considerations

### Scalability
- **Plugin System**: Extensible architecture
- **Theming**: User customization
- **Localization**: i18n support ready
- **Cloud Sync**: Optional user data sync

### Maintenance
- **Automated Updates**: Electron updater
- **Error Reporting**: Opt-in crash reports
- **Analytics**: Privacy-respecting usage stats
- **Feedback**: In-app feedback mechanism

This document serves as the north star for all development decisions in the Digital Aquarium project. When in doubt, refer to these principles and discuss with the team before deviating.
