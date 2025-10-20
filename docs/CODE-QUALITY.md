# Simple Code Quality

This project has basic automated code quality checks to catch common issues.

## What It Checks

- **TypeScript errors** - Catches type issues before deployment
- **ESLint warnings** - Finds code style and potential bugs
- **Build errors** - Ensures the app can build successfully

## GitHub Actions

The checks run automatically on:
- Push to `main` branch
- Pull requests to `main` branch

## Local Development

### Run All Checks
```bash
npm run check
```

### Individual Checks
```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Build check
npm run build
```

## Configuration

- **`.eslintrc.json`** - Basic ESLint rules for Next.js
- **`.github/workflows/code-quality.yml`** - GitHub Actions workflow

## Troubleshooting

**ESLint errors?** Run `npm run lint:fix` to auto-fix most issues.

**Build failing?** Check the error messages and fix the issues shown.

**TypeScript errors?** Make sure your types are correct and imports are valid.
