# Poreitsid Monorepo

A monorepo for the Poreitsid game project with Next.js web app, game engine, simulation tools, and shared UI components.

## 📦 Project Structure

```
poreitsid-monorepo/
├── .github/
│   └── workflows/          # CI/CD pipelines
│       ├── ci.yml         # Test, lint, build
│       └── deploy.yml     # Production deployment
├── apps/
│   └── web/               # Next.js web application
│       ├── middleware.ts  # Security headers
│       └── public/        # Static assets
├── packages/
│   ├── engine/            # Game engine
│   ├── sim/              # Simulation tools
│   ├── ui/               # Shared UI components
│   └── config/           # Shared configs
├── vercel.json           # Vercel deployment config
├── package.json          # Root package.json
└── pnpm-workspace.yaml   # pnpm workspace config
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 20.0.0
- pnpm >= 9.0.0

### Installation

```bash
# Install dependencies
pnpm i -w

# Start development server
pnpm dev
```

## 📝 Available Scripts

```bash
# Development
pnpm dev              # Start Next.js dev server

# Building
pnpm build            # Build all packages
pnpm -F @poreitsid/web build  # Build only web app

# Testing
pnpm test             # Run all tests
pnpm -F @poreitsid/engine test  # Test engine only

# Code Quality
pnpm lint             # Lint all packages
pnpm typecheck        # TypeScript type checking

# Simulation
pnpm -F @poreitsid/sim sim -- --games 100

# Cleanup
pnpm clean            # Remove all node_modules and build artifacts
```

## 🔧 Development

Each package has its own `package.json` with specific scripts. Use the `-F` flag to run commands in specific packages:

```bash
pnpm -F @poreitsid/engine test
pnpm -F @poreitsid/web dev
pnpm -F @poreitsid/sim sim
```

## 🚢 Deployment

This project uses GitHub Actions + Vercel for CI/CD:

1. **Pull Requests**: Automatic preview deployments
2. **Main Branch**: Automatic production deployment after CI passes

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete setup instructions.

## 📚 Documentation

- [Deployment Guide](./DEPLOYMENT.md)
- [Contributing Guidelines](./CONTRIBUTING.md)

## 📄 License

[Your License Here]
