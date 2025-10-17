# Code Quality Setup

This document describes the automated code quality checks configured for this project.

## Overview

The project includes comprehensive code quality checks for:
- **Frontend**: TypeScript/Next.js with ESLint, Prettier, and TypeScript compiler
- **Backend**: Python FastAPI services with Black, isort, Flake8, MyPy, and Bandit
- **Database**: Prisma schema validation
- **Security**: npm audit, Python safety checks, and Bandit security linting
- **Docker**: Docker Compose configuration validation

## GitHub Actions Workflow

The `.github/workflows/code-quality.yml` file contains automated checks that run on:
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches

### Workflow Jobs

1. **Frontend Checks**
   - TypeScript type checking
   - ESLint linting
   - Prettier formatting check

2. **Python Checks** (for both AI and API services)
   - Black code formatting
   - isort import sorting
   - Flake8 linting
   - MyPy type checking
   - Pytest test execution with coverage

3. **Database Checks**
   - Prisma schema validation
   - Prisma format checking

4. **Security Checks**
   - npm audit for Node.js dependencies
   - Python safety checks for vulnerabilities
   - Bandit security linting

5. **Docker Checks**
   - Docker Compose configuration validation

## Local Development

### Prerequisites

Install the required dependencies:

```bash
# Install Node.js dependencies
npm install

# Install Python dependencies for each service
cd services/ai && pip install -r requirements.txt
cd ../api && pip install -r requirements.txt

# Install Python quality tools
pip install black flake8 isort mypy bandit safety pytest-cov
```

### Running Quality Checks Locally

#### Frontend Checks
```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Format checking
npm run format:check

# Auto-fix linting issues
npm run lint:fix

# Auto-format code
npm run format

# Run all frontend checks
npm run quality:frontend
```

#### Python Checks
```bash
# Check formatting and linting for all Python services
npm run quality:python

# Auto-fix Python formatting
npm run quality:python:fix

# Or run individually for each service:
cd services/ai
black --check .
isort --check-only .
flake8 .
mypy . --ignore-missing-imports

cd ../api
black --check .
isort --check-only .
flake8 .
mypy . --ignore-missing-imports
```

#### Database Checks
```bash
# Validate Prisma schema
npm run quality:db

# Or run individually:
npx prisma validate
npx prisma format --check
```

#### All Quality Checks
```bash
# Run all quality checks
npm run quality:all
```

## Configuration Files

### Frontend Configuration

- **`.eslintrc.json`**: ESLint configuration with TypeScript support
- **`.prettierrc`**: Prettier formatting configuration
- **`.prettierignore`**: Files to ignore for Prettier formatting

### Python Configuration

Each Python service has a `pyproject.toml` file with:
- **Black**: Code formatting configuration
- **isort**: Import sorting configuration
- **Flake8**: Linting configuration
- **MyPy**: Type checking configuration
- **Bandit**: Security linting configuration

## IDE Integration

### VS Code

Recommended extensions:
- ESLint
- Prettier
- Python
- Pylance
- Black Formatter
- isort

### Settings

Add to your VS Code settings:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },
  "python.formatting.provider": "black",
  "python.linting.enabled": true,
  "python.linting.flake8Enabled": true,
  "python.linting.mypyEnabled": true
}
```

## Pre-commit Hooks (Optional)

To run quality checks before each commit, install pre-commit:

```bash
pip install pre-commit
pre-commit install
```

Create `.pre-commit-config.yaml`:

```yaml
repos:
  - repo: local
    hooks:
      - id: frontend-quality
        name: Frontend Quality Checks
        entry: npm run quality:frontend
        language: system
        files: \.(ts|tsx|js|jsx)$
        
      - id: python-quality
        name: Python Quality Checks
        entry: npm run quality:python
        language: system
        files: \.py$
        
      - id: database-quality
        name: Database Quality Checks
        entry: npm run quality:db
        language: system
        files: prisma/schema\.prisma$
```

## Troubleshooting

### Common Issues

1. **ESLint errors**: Run `npm run lint:fix` to auto-fix issues
2. **Prettier formatting**: Run `npm run format` to auto-format code
3. **Python formatting**: Run `npm run quality:python:fix` to auto-format Python code
4. **TypeScript errors**: Check your type definitions and imports
5. **Prisma errors**: Ensure your schema is valid with `npx prisma validate`

### Getting Help

- Check the GitHub Actions logs for detailed error messages
- Run quality checks locally to reproduce issues
- Review the configuration files for specific rules
- Consult the documentation for each tool (ESLint, Prettier, Black, etc.)

## Contributing

When contributing to this project:

1. Ensure all quality checks pass locally before pushing
2. Fix any issues reported by the automated checks
3. Follow the established code style and formatting rules
4. Add tests for new functionality
5. Update documentation as needed

The automated checks will run on your pull requests and must pass before merging.
