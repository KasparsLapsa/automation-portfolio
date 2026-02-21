# Automation Portfolio — Playwright + TypeScript (UI + API)

[![PR - checks + API](https://github.com/KasparsLapsa/automation-portfolio/actions/workflows/pr.yml/badge.svg)](https://github.com/KasparsLapsa/automation-portfolio/actions/workflows/pr.yml)
[![Nightly - UI + report to Pages](https://github.com/KasparsLapsa/automation-portfolio/actions/workflows/nightly-ui.yml/badge.svg)](https://github.com/KasparsLapsa/automation-portfolio/actions/workflows/nightly-ui.yml)
[![UI Report](https://img.shields.io/badge/UI%20Report-GitHub%20Pages-blue)](https://kasparslapsa.github.io/automation-portfolio/)

A practical automation portfolio built with **Playwright + TypeScript**, showcasing:

- **UI automation** against a public demo site (**AutomationExercise**)
- **API testing** with **contract validation** using **Zod** (**ExpandTesting**)
- **CI pipelines** (GitHub Actions): PR runs checks + API, UI runs nightly/manual and publishes report to Pages

---

## Table of contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Environment variables](#environment-variables)
- [Running tests](#running-tests)
- [Projects](#projects)
- [Tag reference](#tag-reference)
- [Architecture](#architecture)
- [Reporting](#reporting)
- [CI](#ci)
- [Recommended ignores](#recommended-ignores-keep-prs-clean)
- [Troubleshooting](#troubleshooting)
- [Credits](#credits)

---

## Features

- **TypeScript (strict)** + ESLint + Prettier
- **Fixture-based architecture** (dependency injection)
- **POM + components** with semantic locators (`getByRole`, `getByLabel`, etc.)
- **Consent handling** as a fixture (single source of truth)
- **API tests** with **Zod** response validation
- **Faker** factories for unique test data
- **Reports**: Playwright HTML + JUnit, optional Smart Reporter
- **Stability**: ad/iframe noise is mitigated in UI tests where needed

---

## Prerequisites

- **Node.js 20+**
- **npm** (comes with Node)

---

## Setup

Install dependencies and Playwright browsers:

```bash
npm ci
npx playwright install --with-deps chromium
```

Run quality checks:

```bash
npm run check
```

---

## Environment variables

This repo loads `env/.env.<environment>` based on `ENVIRONMENT` (defaults to `dev`).

- `env/.env.example` (committed) — template you copy locally
- `env/.env.dev` (local, git-ignored)

Create your local env file:

```bash
cp env/.env.example env/.env.dev
```

Typical values for this portfolio:

```env
APP_URL=https://automationexercise.com
API_URL=https://practice.expandtesting.com/api

# Optional (only needed if you add login-based flows later)
APP_EMAIL=your-email@example.com
APP_PASSWORD=your-secure-password
```

Switch environment:

```bash
# default (dev)
npm run test:ae:guest

# example: staging
ENVIRONMENT=staging npm run test:ae:guest
```

> API-only runs do not require `APP_URL` if you run only `--project=public-api`.

---

## Running tests

```bash
# Quality checks (format + lint + typecheck)
npm run check

# API tests (public-api)
npm run test:api

# UI tests (guest)
npm run test:ae:guest

# Setup only (creates storageState)
npm run test:ae:setup

# UI tests (auth, uses storageState created by setup)
npm run test:ae:auth

# Smoke tests
npm run test:smoke

# Default suite (excludes @destructive)
npm test

# CI-style run (single worker)
npm run test:ci

# Open last Playwright HTML report
npm run report
```

---

## Projects

Defined in `playwright.config.ts`:

| Project      | Purpose                            | Notes                |
| ------------ | ---------------------------------- | -------------------- |
| `setup`      | Creates authenticated storageState | Used by `ae-auth`    |
| `ae-guest`   | UI tests without auth              | Runs directly        |
| `ae-auth`    | UI tests with auth                 | Depends on `setup`   |
| `public-api` | API tests (ExpandTesting)          | Fast + Zod contracts |

Storage state path: `storage/.auth/automationexercise.json`

---

## Tag reference

Tags are applied on tests (not `test.describe`).

- `@smoke` — critical fast checks
- `@functional` — feature-level UI checks
- `@e2e` — end-to-end flows
- `@a11y` — accessibility checks
- `@visual` — snapshot tests
- `@destructive` — excluded from default run (`npm test`)

Example:

```ts
test('loads home', { tag: ['@smoke'] }, async ({ ae }) => {
    // ...
});
```

---

## Architecture

### Fixtures (what tests should use)

Tests should import the merged fixtures from:

```ts
import { test, expect } from '../fixtures/pom/test-options';
```

(Use the correct relative path for your spec location.)

Key fixtures:

- UI fixtures via POM/page-object fixture
- API fixture via `api-request-fixture`

### Locator strategy

Preferred order:

1. `getByRole`
2. `getByLabel`
3. `getByPlaceholder`
4. `getByText`
5. `getByTestId` (fallback)
6. `locator()` (last resort)

---

## Reporting

### Playwright HTML report

Open locally:

```bash
npm run report
```

### Smart Reporter (optional)

Enable locally:

```bash
RUN_SMART_REPORTER=1 npm run test:ae:guest
```

---

## CI

### PR workflow

Runs:

- `npm run check`
- `npm run test:api`

### Nightly/manual UI workflow

Runs UI tests and publishes the Playwright HTML report to GitHub Pages:

- https://kasparslapsa.github.io/automation-portfolio/

---

## Recommended ignores (keep PRs clean)

Generated history/report files are ignored to keep PR diffs clean.

Recommended to ignore:

- `test-results/`
- `playwright-report/`
- `blob-report/`
- `tests/history-runs/`
- `tests/smart-report.html` / `tests/smart-history.json` (or root equivalents)

---

## Troubleshooting

### `APP_URL is not set`

UI projects require `APP_URL`. Ensure `env/.env.dev` exists and includes `APP_URL`.

### Tests pass locally but fail in CI

Common causes:

- slower machines (consider higher timeouts if needed)
- unexpected modals/overlays (keep handling inside POM/fixtures)
- environment instability (use traces + videos from the CI report)

### `browserType.launch: Executable doesn't exist`

Install browsers:

```bash
npx playwright install --with-deps chromium
```

---

## Credits

Based on a purchased scaffold (reviewed by Ivan) and then extended/customized for this portfolio.
