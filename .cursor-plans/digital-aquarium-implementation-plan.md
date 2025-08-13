# Digital Aquarium Implementation Plan

## Overview
Digital Aquarium is a desktop application that transforms computer activity into an interactive virtual aquarium. Different fish represent different applications and activities, with the aquarium's health reflecting the user's work-life balance. This plan outlines the implementation of a modern Electron application using React, Vite, and Three.js, following best practices and maintainable architecture patterns.

## Phase 1: Repository Analysis

### New Repository Structure
Since this is a greenfield project, we'll establish a clean architecture that supports:
- **Electron Main/Renderer Process Separation**: Clear boundaries between Electron processes
- **React Component Architecture**: Modular, reusable components with clear responsibilities
- **Three.js Scene Management**: Organized 3D rendering pipeline
- **Activity Monitoring System**: Secure, privacy-respecting activity tracking
- **State Management**: Predictable state updates for aquarium simulation

### Technology Stack
- **Desktop Framework**: Electron (latest stable version)
- **Build Tool**: Vite (fast development and optimized production builds)
- **UI Framework**: React 18+ with TypeScript
- **3D Rendering**: Three.js with React Three Fiber
- **Styling**: Material UI + Tailwind CSS (as per user preference)
- **Testing**: Vitest for unit/integration tests, Playwright for E2E
- **CI/CD**: GitHub Actions for automated testing and releases
- **Package Manager**: npm (for consistency with Electron ecosystem)

### Architecture Patterns
- **Clean Architecture**: Separation between business logic and UI
- **Event-Driven Communication**: Between Electron processes
- **Observer Pattern**: For activity monitoring
- **Factory Pattern**: For fish/entity creation
- **Repository Pattern**: For data persistence

## Phase 2: Implementation Planning

### Surgical Approach
1. **Minimal Viable Structure**: Start with essential Electron + React setup
2. **Incremental Feature Addition**: Build features in isolation
3. **Dependency Strategy**: Use well-maintained packages:
   - `electron`: Desktop framework
   - `vite`: Build tool
   - `react` & `react-dom`: UI framework
   - `three` & `@react-three/fiber`: 3D rendering
   - `@mui/material`: Material UI components
   - `tailwindcss`: Utility-first CSS
   - `vitest`: Testing framework
   - `electron-builder`: App packaging

### File Organization Structure
```
digital-aquarium/
├── .cursor-plans/              # Implementation plans
├── .ai-context/                # AI context documentation
├── .github/                    # GitHub configuration
│   └── workflows/              # CI/CD workflows
├── src/
│   ├── main/                   # Electron main process
│   │   ├── index.ts            # Main entry point
│   │   ├── ipc/                # Inter-process communication
│   │   ├── monitoring/         # Activity monitoring
│   │   └── utils/              # Main process utilities
│   ├── renderer/               # Electron renderer process
│   │   ├── App.tsx             # Root React component
│   │   ├── components/         # React components
│   │   │   ├── aquarium/       # Aquarium-specific components
│   │   │   ├── ui/             # UI components
│   │   │   └── three/          # Three.js components
│   │   ├── hooks/              # Custom React hooks
│   │   ├── services/           # Business logic services
│   │   ├── store/              # State management
│   │   ├── types/              # TypeScript definitions
│   │   └── utils/              # Renderer utilities
│   ├── shared/                 # Shared code between processes
│   │   ├── constants/          # Shared constants
│   │   ├── types/              # Shared TypeScript types
│   │   └── utils/              # Shared utilities
│   └── preload/                # Electron preload scripts
├── public/                     # Static assets
├── tests/                      # Test files
│   ├── unit/                   # Unit tests
│   ├── integration/            # Integration tests
│   └── e2e/                    # End-to-end tests
├── scripts/                    # Build and utility scripts
├── electron-builder.yml        # Electron Builder config
├── package.json                # Package configuration
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite configuration
├── vitest.config.ts            # Vitest configuration
├── tailwind.config.js          # Tailwind configuration
├── .gitignore                  # Git ignore rules
├── .eslintrc.js                # ESLint configuration
├── .prettierrc                 # Prettier configuration
└── README.md                   # Project documentation
```

### Implementation Steps

#### Step 1: Repository Initialization
1. Initialize git repository
2. Create initial directory structure
3. Set up .gitignore with Electron/Node patterns
4. Initialize npm project with appropriate metadata

#### Step 2: Core Dependencies Setup
1. Install Electron and development dependencies
2. Install Vite and React ecosystem
3. Install Three.js and React Three Fiber
4. Install Material UI and Tailwind CSS
5. Install testing frameworks (Vitest, Testing Library)
6. Install development tools (TypeScript, ESLint, Prettier)

#### Step 3: Build Configuration
1. Configure Vite for Electron development
2. Set up TypeScript with strict mode
3. Configure Tailwind CSS with Material UI
4. Set up ESLint and Prettier rules
5. Configure Vitest for unit testing

#### Step 4: Electron Architecture
1. Create main process entry point
2. Set up BrowserWindow with security best practices
3. Implement preload script for secure IPC
4. Create basic IPC communication structure
5. Add development/production environment handling

#### Step 5: React Application Structure
1. Create root React application
2. Set up React Router for navigation (if needed)
3. Implement basic Material UI theme
4. Create initial component structure
5. Set up global state management structure

#### Step 6: Three.js Integration
1. Set up React Three Fiber canvas
2. Create basic 3D scene with lighting
3. Implement camera controls
4. Create fish entity system
5. Add water/environment effects

#### Step 7: Activity Monitoring System
1. Design privacy-respecting monitoring approach
2. Implement active window detection
3. Create activity categorization system
4. Set up data aggregation pipeline
5. Implement work-life balance calculations

#### Step 8: Aquarium Simulation
1. Create fish behavior system
2. Implement aquarium health metrics
3. Add fish spawning based on activities
4. Create visual feedback systems
5. Implement persistence layer

#### Step 9: Testing Infrastructure
1. Set up Vitest with coverage reporting
2. Create unit tests for core logic
3. Add integration tests for IPC
4. Implement component testing
5. Set up E2E test framework

#### Step 10: CI/CD Pipeline
1. Create GitHub Actions workflow
2. Add automated testing on PR
3. Set up code coverage reporting
4. Configure build matrix for multiple OS
5. Add release automation

### FAIL HARD Policy Implementation

#### Required Behaviors
```typescript
// ✅ CORRECT: Throw meaningful exceptions
export class ActivityMonitor {
  async startMonitoring(): Promise<void> {
    if (!this.hasPermissions()) {
      throw new Error('ActivityMonitor: Missing required system permissions');
    }
    // ... implementation
  }
}

// ✅ CORRECT: Validate inputs and fail fast
export function createFish(type: FishType, activity: Activity): Fish {
  if (!isValidFishType(type)) {
    throw new Error(`Invalid fish type: ${type}`);
  }
  if (!activity.name || !activity.category) {
    throw new Error('Activity must have name and category');
  }
  // ... implementation
}

// ✅ CORRECT: Let errors propagate
export async function loadUserPreferences(): Promise<Preferences> {
  const data = await fs.readFile(PREFS_PATH);
  return JSON.parse(data); // Let parse errors propagate
}
```

#### Unacceptable Patterns to Avoid
```typescript
// ❌ WRONG: Suppressing errors
try {
  await someOperation();
} catch (e) {
  console.log(e); // Just logging is not enough!
}

// ❌ WRONG: Returning fallback values
async function getActivity() {
  try {
    return await monitor.getCurrentActivity();
  } catch {
    return null; // Don't hide failures!
  }
}

// ❌ WRONG: Making tests pass artificially
test('should create fish', () => {
  const fish = createFish('invalid', null);
  expect(fish).toBeTruthy(); // Don't lower the bar!
});
```

### Testing Strategy

#### Test Categories
1. **Unit Tests**: Core logic, utilities, calculations
2. **Integration Tests**: IPC communication, data flow
3. **Component Tests**: React component behavior
4. **E2E Tests**: Full application workflows

#### Test-Driven Development Cycle
1. Write failing test for new feature
2. Implement minimal code to pass
3. Refactor while keeping tests green
4. Achieve >80% coverage before moving on

### Security Considerations
1. **Context Isolation**: Enable in all renderer processes
2. **Node Integration**: Disabled in renderer
3. **Remote Module**: Deprecated, not used
4. **CSP Headers**: Strict content security policy
5. **Input Validation**: All IPC messages validated

### Performance Optimization
1. **Virtual Fish Rendering**: Use instanced meshes for many fish
2. **Activity Sampling**: Throttled monitoring to reduce CPU usage
3. **State Updates**: Batched updates to prevent re-renders
4. **Memory Management**: Proper cleanup of Three.js resources
5. **Build Optimization**: Code splitting and lazy loading

## Phase 3: Implementation Approach

### Task Management
Using todo_write tool to track:
- [ ] Repository setup and initialization
- [ ] Core dependency installation
- [ ] Build configuration
- [ ] Electron architecture implementation
- [ ] React application setup
- [ ] Three.js scene creation
- [ ] Activity monitoring system
- [ ] Aquarium simulation logic
- [ ] Testing infrastructure
- [ ] CI/CD pipeline setup

### Development Workflow
1. **Branch Strategy**: Feature branches with PR reviews
2. **Commit Standards**: Conventional commits for automated releases
3. **Code Review**: All code must pass linting and tests
4. **Documentation**: Update docs with each feature

## Phase 4: Final Documentation Structure

### .ai-context Contents
1. **BASIC_REPO_STRUCTURE.md**: Repository organization philosophy
2. **ARCHITECTURE_DECISIONS.md**: Key architectural choices
3. **ACTIVITY_MONITORING.md**: How activity tracking works
4. **AQUARIUM_SIMULATION.md**: Fish behavior and health system
5. **DEPLOYMENT_GUIDE.md**: Building and releasing the app

### User Documentation
1. **README.md**: Project overview and quick start
2. **CONTRIBUTING.md**: Contribution guidelines
3. **USER_GUIDE.md**: End-user documentation
4. **PRIVACY.md**: Privacy policy and data handling

## Success Criteria
1. ✅ Electron app launches successfully
2. ✅ Three.js scene renders with basic aquarium
3. ✅ Activity monitoring captures app usage
4. ✅ Fish spawn based on activities
5. ✅ All tests pass with >80% coverage
6. ✅ GitHub CI reports green
7. ✅ App packages for macOS, Windows, Linux

## Risk Mitigation
1. **Performance Issues**: Profile early, optimize rendering
2. **Privacy Concerns**: Clear data handling, local-only storage
3. **Cross-Platform Bugs**: Test on all target platforms in CI
4. **Dependency Updates**: Use dependabot, test updates
5. **User Adoption**: Focus on delightful UI/UX

## Timeline Estimate
- **Week 1**: Repository setup, core infrastructure
- **Week 2**: Electron architecture, basic React app
- **Week 3**: Three.js integration, basic aquarium
- **Week 4**: Activity monitoring, fish system
- **Week 5**: Polish, testing, CI/CD
- **Week 6**: Documentation, release preparation

## Next Steps
1. Review and approve this plan
2. Initialize git repository
3. Begin Phase 1 implementation
4. Track progress with todo management
