# Contributing to Poreitsid

Thank you for your interest in contributing! This guide will help you get started.

## Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/poreitsid-monorepo.git
   cd poreitsid-monorepo
   ```

2. **Install dependencies**
   ```bash
   pnpm i -w
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Project Structure

- `apps/web/` - Next.js web application
- `packages/engine/` - Game engine logic
- `packages/sim/` - Simulation and testing tools
- `packages/ui/` - Shared React components
- `packages/config/` - Shared configuration files

## Development Workflow

1. **Make your changes** in the appropriate package
2. **Run tests** to ensure nothing breaks:
   ```bash
   pnpm -w test
   pnpm -w lint
   pnpm -w typecheck
   ```
3. **Build to verify** everything compiles:
   ```bash
   pnpm -w build
   ```
4. **Commit your changes** with a clear message:
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

## Commit Message Convention

We follow conventional commits:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

## Pull Request Process

1. Push your branch to GitHub
2. Create a Pull Request with a clear title and description
3. Wait for CI checks to pass
4. Request review from maintainers
5. Address any feedback
6. Once approved, your PR will be merged

## Code Style

- Use TypeScript for all new code
- Follow the ESLint configuration
- Run `pnpm -w lint` before committing
- Use Prettier for formatting

## Testing

- Write tests for new features
- Ensure all tests pass before submitting PR
- Aim for >80% code coverage in the engine package

## Questions?

Feel free to open an issue for any questions or concerns!
