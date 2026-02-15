# Automation Portfolio — Playwright + TypeScript (UI + API)

[![PR - checks + API](https://github.com/KasparsLapsa/automation-portfolio/actions/workflows/pr.yml/badge.svg)](https://github.com/KasparsLapsa/automation-portfolio/actions/workflows/pr.yml)
[![Nightly - UI + report to Pages](https://github.com/KasparsLapsa/automation-portfolio/actions/workflows/nightly-ui.yml/badge.svg)](https://github.com/KasparsLapsa/automation-portfolio/actions/workflows/nightly-ui.yml)
[![UI Report](https://img.shields.io/badge/UI%20Report-GitHub%20Pages-blue)](https://kasparslapsa.github.io/automation-portfolio/)

A practical automation portfolio built with **Playwright + TypeScript**, showcasing:

- **UI automation** against a public demo site (**AutomationExercise**)
- **API testing** with **contract validation** using **Zod** (**ExpandTesting**)
- **CI pipelines** (GitHub Actions): PR runs quality checks + API, UI runs nightly/manual and publishes a report to Pages

---

## What’s inside

### UI (AutomationExercise) — `ae-guest` / `ae-auth`

- Smoke + basic end-to-end flows
- Consent/cookie handling
- Playwright best practices (auto-waits, stable selectors, assertions)
- Tagged tests: `@smoke`, `@functional`, `@e2e`, `@a11y`, `@visual`

### API (ExpandTesting) — `public-api`

- Fast API tests with **Zod contract validation**
- Positive + negative scenarios (success + error contracts)
- Business assertions (example validations beyond status codes)

---

## CI & Reports

### Workflows

- **PR / push** → runs **quality checks + API tests**
  - `npm run check`
  - `npm run test:api`

- **Nightly + manual** → runs **UI tests** and publishes **Playwright HTML report** to GitHub Pages

### Latest UI report
https://kasparslapsa.github.io/automation-portfolio/

---

## Quick start

### Prerequisites
- Node.js **20+**

### Install
```bash
npm ci
npx playwright install --with-deps chromium
Quality checks (format + lint + typecheck)
npm run check
Run API tests
npm run test:api
Run UI tests (guest)
npm run test:ae:guest
Run smoke tests
npm run test:smoke
CI-style run (single worker)
npm run test:ci
Open last Playwright report locally
npm run report
Useful scripts
npm run check — Prettier check + ESLint + TypeScript typecheck

npm run check:fix — auto-format + auto-fix lint issues

npm run test:api — API project tests (public-api)

npm run test:ae:guest — UI guest tests (ae-guest)

npm run test:ae:auth — UI authenticated tests (ae-auth)

npm run test:smoke — all smoke tests

npm run test:visual — visual snapshot tests

npm run test:visual:update — update visual snapshots

Notes
UI tests run on GitHub-hosted runners, where third-party ads/popups can occasionally cause noise. The nightly workflow still publishes the report to Pages for debugging and visibility.