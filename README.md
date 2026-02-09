# Automation Portfolio — Playwright + TypeScript (UI + API)

[![CI](https://github.com/KasparsLapsa/automation-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/KasparsLapsa/automation-portfolio/actions/workflows/ci.yml)
[![UI Report](https://img.shields.io/badge/UI%20Report-GitHub%20Pages-blue)](https://kasparslapsa.github.io/automation-portfolio/)

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

## CI & Reports

- **push / pull_request** → runs **API tests** (`public-api`)
- **schedule (nightly) + workflow_dispatch (manual)** → runs **UI tests** (`public-chromium`)
- **Latest UI report (GitHub Pages):** https://kasparslapsa.github.io/automation-portfolio/

## Quick start

### Install

```bash
npm ci
npx playwright install
```
