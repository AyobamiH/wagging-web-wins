# Package.json Scripts to Add

Since package.json cannot be modified directly, please add the following scripts manually:

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "test:ui": "vitest --ui"
  }
}
```

## Running Tests

After adding the scripts:

```bash
# Run all tests once
npm run test

# Watch mode (re-runs on file changes)
npm run test:watch

# Generate coverage report
npm run test:coverage

# Open interactive UI
npm run test:ui
```

## Alternative (Without Scripts)

You can also run tests directly:

```bash
# Run tests
npx vitest run

# Watch mode
npx vitest

# With coverage
npx vitest run --coverage
```
