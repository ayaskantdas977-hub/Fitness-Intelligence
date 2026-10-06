# Contributing to Fitness Intelligence

Thank you for your interest in contributing to Fitness Intelligence! We welcome contributions to improve biomechanical accuracy, expand exercise tracking, and enhance user experience.

---

## 1. Development Setup

### Prerequisites
- **Node.js**: v20 or higher
- **npm**: v10 or higher
- **Java 17+ / Maven** (optional, only needed for backend local development)

### Quick Start
```bash
# Clone the repository
git clone https://github.com/ayaskantdas977-hub/Fitness-Intelligence.git
cd Fitness-Intelligence

# Install client dependencies
npm install

# Start local Vite development server
npm run dev

# Run unit tests
npm test
```

---

## 2. Coding Guidelines

### TypeScript & Strict Typing
- Ensure zero TypeScript compiler errors (`npm run build`).
- Unused variables and imports are flagged as errors (`noUnusedLocals: true`).
- Maintain strict typing on all biomechanical pose calculations and clinical recommendation engines.

### Testing Standards
- Write comprehensive Vitest specs in `test/` for all new calculators, clinical rules, and data structures.
- All tests must pass before opening a pull request (`npx vitest run`).

### Commit Message Convention
We adhere to [Conventional Commits](https://www.conventionalcommits.org/):
- `feat(...)`: A new feature or user-facing capability.
- `fix(...)`: A bug fix.
- `docs(...)`: Documentation changes only.
- `test(...)`: Adding or updating test suites.
- `refactor(...)`: Code change that neither fixes a bug nor adds a feature.
- `chore(...)`: Tooling, build config, or dependency updates.

---

## 3. Pull Request Process
1. Fork the repo and create your feature branch: `git checkout -b feat/my-new-feature`
2. Commit your changes: `git commit -m 'feat: add new feature'`
3. Ensure all tests and production builds pass: `npm run build && npm test`
4. Push to your branch and submit a Pull Request to `main`.
