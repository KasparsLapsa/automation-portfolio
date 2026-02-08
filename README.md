# Automation Portfolio — Playwright + TypeScript (UI + API)

A practical automation portfolio built with **Playwright + TypeScript**, showcasing:

- **UI automation** against a public demo site (AutomationExercise)
- **API contract testing** with **Zod** (ExpandTesting)
- **CI pipeline** (GitHub Actions): API runs on push/PR, UI runs nightly/manual

## What’s inside

### UI (AutomationExercise) — `public-chromium`

- Smoke + basic flows
- Consent/cookie handling
- Playwright best practices (auto-waits, assertions, stable selectors)

### API (ExpandTesting) — `public-api`

- Fast API tests with **contract validation** using **Zod**
- Positive + negative cases (200 contract + 400 error contract)
- Business assertions (e.g., conversion math)

---

## Quick start

### Install

```bash
npm ci
npx playwright install
Environment variables
Locally, variables are loaded from env/.env.<environment> (default: env/.env.dev).

Create your local file:

cp env/.env.example env/.env.dev
Example values:

APP_URL=https://automationexercise.com
API_URL=https://practice.expandtesting.com/api
env/.env.dev is git-ignored. In CI we set APP_URL and API_URL via workflow env vars.

Run tests (portfolio)
UI (public-chromium)
npm run test:portfolio:ui
npm run test:portfolio:smoke
npm run test:portfolio:sanity
API (public-api)
npm run test:portfolio:api
npm run test:portfolio:api:smoke
npm run test:portfolio:api:sanity
Report
npm run report
Run tests (scaffold / legacy scripts)
These are kept from the original scaffold and target the chromium project:

npm test
npm run test:smoke
npm run test:sanity
npm run test:regression
npm run test:api
npm run test:e2e
CI (GitHub Actions)
Workflow: .github/workflows/ci.yml

Triggers
push / pull_request → runs API tests (public-api)

schedule (nightly) + workflow_dispatch (manual) → runs UI tests (public-chromium)

How to verify triggers quickly
Push any commit → check Actions tab for a new run

Create a PR → Actions should run automatically

Manual: Actions → workflow → Run workflow

Nightly: runs via schedule (cron)

Why Zod is here (short version)
A 200 status only means “server responded OK”.

Zod validates the response body contract, e.g.:

/cars must return { status: string, cars: Car[] }

/currency-convert must return { from, to, rate, amount, converted }

Negative tests validate { error: string }

This makes API tests fail for meaningful reasons (contract drift), not just status codes.

Code quality
npm run lint
npm run lint:fix
npm run format
```
