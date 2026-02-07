# Playwright Scaffold

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE) [![Node.js: >=20](https://img.shields.io/badge/Node.js-%3E%3D20-green.svg)](https://nodejs.org/) [![Playwright: ^1.58](https://img.shields.io/badge/Playwright-%5E1.58-orange.svg)](https://playwright.dev/)

A production-ready Playwright test automation scaffold built with TypeScript. Designed for **AI-assisted test development** with modular rules that guide code generation, and ready to use out of the box for UI, API, and E2E testing.

> **This is a scaffold, not a finished framework.** The example files (`AppPage`, `login.spec.ts`, `NavigationComponent`, etc.) demonstrate the patterns and conventions you should follow. Replace them with your real application's pages, tests, and data as you build out your test suite.

---

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Getting Started: Adapting the Scaffold](#getting-started-adapting-the-scaffold)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Environment Variables](#environment-variables)
- [Running Tests](#running-tests)
- [Tag Reference](#tag-reference)
- [Writing Tests](#writing-tests)
- [Page Object Model](#page-object-model)
- [API Testing](#api-testing)
- [Data Strategy](#data-strategy)
- [Authentication Setup](#authentication-setup)
- [Code Quality](#code-quality)
- [Coding Standards](#coding-standards)
- [Core Principles (The Constitution)](#core-principles-the-constitution)
- [AI-Assisted Development Workflow](#ai-assisted-development-workflow)
- [AI Rules Architecture](#ai-rules-architecture)
- [Architecture Overview](#architecture-overview)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Features

- **TypeScript** -- Full type safety with strict mode enabled
- **Page Object Model** -- Maintainable and scalable test architecture
- **Fixture-based Architecture** -- Reusable test components with dependency injection
- **API Testing** -- Built-in API request utilities with Zod schema validation
- **Multi-browser Support** -- Chrome, Firefox, and WebKit configurations
- **Environment Management** -- Flexible `.env` configuration with multi-environment support
- **Authentication Handling** -- Pre-configured storage state for authenticated tests
- **Code Quality** -- ESLint + Prettier + Husky pre-commit hooks
- **Parallel Execution** -- Fast test runs with configurable workers
- **Comprehensive Reporting** -- HTML reports with traces, screenshots, and videos
- **AI-Assisted Development** -- Modular orchestrator rules with glob-scoped auto-loading

## Prerequisites

- **Node.js** v20.x or later
- **npm** v10.x or later

## Installation

1. **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    cd playwright-scaffold
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Install Playwright browsers:**

    ```bash
    npx playwright install
    ```

4. **Set up environment variables:**

    ```bash
    cp env/.env.example env/.env.dev
    ```

    Edit `env/.env.dev` with your application's configuration.

---

## Getting Started: Adapting the Scaffold

This scaffold ships with example files that demonstrate every pattern. Here's how to replace them with your real application code, step by step.

### Step 1: Configure Your Environment

Edit `env/.env.dev` with your application's actual URLs and credentials:

```bash
APP_URL=https://your-real-app.com
API_URL=https://your-real-api.com
APP_EMAIL=your-test-user@example.com
APP_PASSWORD=your-test-password
```

### Step 2: Update Enums

Open `enums/app/app.ts` and replace the placeholder values with your app's actual messages, API endpoints, and storage state paths:

```typescript
export enum Messages {
    LOGIN_SUCCESS = 'Your actual success message',
    LOGIN_ERROR = 'Your actual error message',
    // Add more messages as needed
}

export enum ApiEndpoints {
    LOGIN = '/your/actual/login/endpoint',
    // Add more endpoints as needed
}
```

### Step 3: Create Your First Page Object

Replace `pages/app/app.page.ts` with a page object for your application's actual login page (or whichever page you're testing first). Use the existing file as a template:

1. Update the locators to match your app's actual elements
2. Update the action methods to match your app's actual behavior
3. Keep the same patterns: getter locators, JSDoc comments, `Promise<void>` return types

> **Tip:** If using Cursor with AI, ask it to "navigate to [your-url] and create a page object" -- the AI rules will guide it to explore the page and generate accurate locators.

### Step 4: Update Authentication Setup

Edit `helpers/app/createStorageState.ts` to match your app's actual login flow. The two functions to update:

- `createAppStorageState()` -- Browser-based login for storage state
- `setUserAccessToken()` -- API-based login for access tokens

### Step 5: Write Your First Real Test

Replace the example tests in `tests/app/functional/` with tests for your application. Follow the pattern in the example files:

```typescript
import { expect, test } from '../../../fixtures/pom/test-options';

test.describe('Your Feature', () => {
    test(
        'should do something specific',
        { tag: '@smoke' },
        async ({ appPage }) => {
            await test.step('GIVEN precondition', async () => {
                /* ... */
            });
            await test.step('WHEN action is taken', async () => {
                /* ... */
            });
            await test.step('THEN expected result', async () => {
                /* ... */
            });
        }
    );
});
```

### Step 6: Run and Verify

```bash
npm test
```

### What to Keep vs. What to Replace

| Keep As-Is                                        | Replace With Your App                                   |
| ------------------------------------------------- | ------------------------------------------------------- |
| `fixtures/pom/test-options.ts`                    | `pages/app/*.page.ts` (your page objects)               |
| `fixtures/pom/page-object-fixture.ts` (extend it) | `tests/app/**/*.spec.ts` (your tests)                   |
| `fixtures/api/api-request-fixture.ts`             | `enums/app/app.ts` (your messages/endpoints)            |
| `fixtures/api/plain-function.ts`                  | `test-data/static/app/*.json` (your test data)          |
| `fixtures/api/api-types.ts`                       | `test-data/factories/app/*.factory.ts` (your factories) |
| `config/`, `helpers/util/`                        | `helpers/app/createStorageState.ts` (your auth flow)    |
| `.cursor/rules/` (AI rules)                       | `fixtures/api/schemas/app/` (your API schemas)          |
| `playwright.config.ts` (mostly)                   | `pages/components/` (your UI components)                |

---

## Project Structure

```
root/
├── .cursor/                   # AI rules and prompt templates
│   ├── rules/                 # Cursor rule files (orchestrator + detail rules)
│   │   ├── rules.mdc          # Orchestrator (always loaded)
│   │   ├── selectors.mdc      # Selector strategy (pages/**)
│   │   ├── page-objects.mdc   # POM pattern (pages/**)
│   │   ├── fixtures.mdc       # DI pattern (fixtures/**, tests/**)
│   │   ├── test-standards.mdc # Test structure (tests/**)
│   │   ├── type-safety.mdc    # Type safety (**/*.ts)
│   │   ├── data-strategy.mdc  # Data strategy (test-data/**, tests/**)
│   │   ├── api-testing.mdc    # API testing (fixtures/api/**, tests/**/api/**)
│   │   ├── enums.mdc          # Enum conventions (enums/**)
│   │   ├── config.mdc         # Configuration rules (config/**)
│   │   └── helpers.mdc        # Helper function rules (helpers/**)
│   └── prompts/               # Prompt templates for code generation
│       └── common-tasks.md
│
├── config/                    # Application configuration
│   ├── app.ts                 # App-specific config (URLs, paths)
│   └── util/                  # Utility configurations
│       └── util.ts
│
├── enums/                     # Constants and enumerations
│   ├── app/                   # App-specific enums
│   │   └── app.ts
│   └── util/                  # Shared enums (roles, etc.)
│       └── roles.ts
│
├── env/                       # Environment configuration
│   ├── .env.example           # Template for environment variables
│   └── .env.dev               # Development environment (git-ignored)
│
├── fixtures/                  # Playwright test fixtures
│   ├── api/                   # API testing utilities
│   │   ├── api-request-fixture.ts  # API request fixture
│   │   ├── api-types.ts            # TypeScript types for API
│   │   ├── plain-function.ts       # Core API request function
│   │   └── schemas/                # Zod validation schemas
│   │       ├── app/                # App-specific schemas
│   │       │   └── userSchema.ts
│   │       └── util/               # Common error schemas
│   │           └── errorResponseSchema.ts
│   └── pom/                   # Page Object fixtures
│       ├── page-object-fixture.ts  # Page object instantiation
│       └── test-options.ts         # Merged test fixtures (use this)
│
├── helpers/                   # Helper functions
│   ├── app/                   # App-specific helpers
│   │   └── createStorageState.ts   # Authentication helpers
│   └── util/                  # Utility functions
│       └── util.ts
│
├── pages/                     # Page Object Model classes
│   ├── app/                   # App page objects
│   │   └── app.page.ts        # Main application page
│   └── components/            # Reusable UI components
│       └── navigation.component.ts
│
├── test-data/                 # Test data files
│   ├── static/                # Immutable data (boundary/invalid cases)
│   │   └── app/
│   │       └── invalidCredentials.json
│   └── factories/             # Dynamic data generators (Faker + Zod)
│       └── app/
│           └── user.factory.ts
│
├── tests/                     # Test specifications
│   └── app/                   # App tests
│       ├── auth.setup.ts      # Authentication setup
│       ├── api/               # API tests
│       │   └── login.spec.ts
│       ├── e2e/               # End-to-end tests
│       │   └── e2e.spec.ts
│       └── functional/        # Functional tests
│           └── login.spec.ts
│
├── .gitignore
├── .prettierrc                # Prettier configuration
├── eslint.config.mts          # ESLint configuration (flat config)
├── package.json
├── playwright.config.ts       # Playwright configuration
├── README.md
└── tsconfig.json              # TypeScript configuration
```

## Configuration

### Playwright Configuration

The `playwright.config.ts` file contains all test runner settings:

| Setting            | Local                   | CI                |
| ------------------ | ----------------------- | ----------------- |
| Parallel execution | Enabled                 | Enabled           |
| Workers            | Auto                    | 1                 |
| Retries            | 0                       | 2                 |
| Reporter           | HTML (opens on failure) | Blob + HTML       |
| Traces             | On first retry          | On first retry    |
| Screenshots        | On failure              | On failure        |
| Videos             | Retain on failure       | Retain on failure |

### Browser Projects

| Project    | Description             | Dependencies |
| ---------- | ----------------------- | ------------ |
| `setup`    | Authentication setup    | None         |
| `chromium` | Main tests on Chrome    | `setup`      |
| `firefox`  | Firefox (commented out) | `setup`      |
| `webkit`   | Safari (commented out)  | `setup`      |

### Timeouts

| Timeout            | Value      |
| ------------------ | ---------- |
| Test timeout       | 60 seconds |
| Action timeout     | 10 seconds |
| Navigation timeout | 30 seconds |
| Expect timeout     | 10 seconds |

## Environment Variables

### Setup

1. Copy the example file:

    ```bash
    cp env/.env.example env/.env.dev
    ```

2. Configure your variables in `env/.env.dev`:

    ```bash
    # Application URL (frontend)
    APP_URL=https://your-app-url.com

    # API URL (backend)
    API_URL=https://your-api-url.com

    # Test User Credentials
    APP_EMAIL=your-email@example.com
    APP_PASSWORD=your-secure-password

    # Optional: Additional service URLs
    UTILITY_URL=https://your-utility-service.com
    ```

### Switching Environments

```bash
# Default (dev)
npm test

# Staging environment
ENVIRONMENT=staging npm test

# Production environment (read-only tests)
ENVIRONMENT=prod npm test
```

### Creating New Environments

Create `env/.env.<environment>` files:

- `env/.env.dev` -- Development
- `env/.env.staging` -- Staging
- `env/.env.prod` -- Production

## Running Tests

### Basic Commands

```bash
# Run all tests (excludes @destructive)
npm test

# Run tests on specific browser (excludes @destructive)
npm run test:chromium
npm run test:firefox
npm run test:webkit

# Run in headed mode (see browser)
npm run test:headed

# Run in debug mode (Playwright Inspector)
npm run test:debug

# Run with UI mode (interactive)
npm run test:ui
```

### Running by Tag

Run tests filtered by tag. See the [Tag Reference](#tag-reference) section for the full list of available tags and their meanings.

```bash
# Run by importance level
npm run test:smoke          # Critical path tests
npm run test:sanity         # Key functionality verification
npm run test:regression     # Full regression coverage

# Run by test type
npm run test:api            # API-only tests
npm run test:e2e            # End-to-end user flows

# Run destructive tests only (single worker, isolated)
npm run test:destructive
```

### CI Mode

Optimized for CI environments with single worker, blob reports:

```bash
npm run test:ci
```

### View Reports

```bash
npm run report
```

---

## Tag Reference

Tags control selective test execution. Apply tags to individual tests via `{ tag: '@smoke' }` -- **never** on `test.describe()` blocks.

### All Tags

**Importance tags** (pick one per test):

| Tag | Purpose | npm Command |
| --- | ------- | ----------- |
| `@smoke` | Critical path -- run first and frequently | `npm run test:smoke` |
| `@sanity` | Key functionality verification | `npm run test:sanity` |
| `@regression` | Full regression coverage | `npm run test:regression` |

**Type tags** (pick one per test):

| Tag | Purpose | npm Command |
| --- | ------- | ----------- |
| `@functional` | UI functional tests | -- |
| `@e2e` | End-to-end user flows | `npm run test:e2e` |
| `@api` | API-only tests | `npm run test:api` |

**Cross-cutting tags** (combine with any importance/type tag):

| Tag | Purpose | npm Command |
| --- | ------- | ----------- |
| `@destructive` | Modifies shared application state | `npm run test:destructive` |

### How Tag Filtering Works

- **`npm test`** runs the full suite **excluding** `@destructive` tests (via `--grep-invert`), because the full suite runs in parallel and destructive tests modify shared state.
- **Tag-specific commands** (e.g., `test:smoke`) use `--grep @smoke` to run only matching tests. No separate `@destructive` exclusion is needed because `--grep` already filters to the selected tag.
- **`npm run test:destructive`** runs only `@destructive` tests with `--workers=1` for sequential execution.

### The `@destructive` Tag

Tests tagged `@destructive` modify shared application state (e.g., deleting data, changing global settings, resetting configurations). They follow strict rules:

1. **MUST include cleanup hooks** -- Every `@destructive` test MUST use `test.afterEach()` or `test.afterAll()` to revert any state changes, ensuring subsequent tests always run against a clean environment.
2. **Excluded from `npm test`** -- The base command uses `--grep-invert @destructive` to prevent them from running in the parallel full-suite execution.
3. **Run via dedicated command** -- `npm run test:destructive` with a single worker.

```typescript
test.describe('admin data management', () => {
    test.afterEach(async ({ apiRequest }) => {
        // REQUIRED: Revert state changes made by the test
        await apiRequest({
            method: 'POST',
            url: '/api/admin/reset',
            baseUrl: process.env.API_URL,
        });
    });

    test(
        'should delete all inactive users',
        { tag: ['@destructive', '@regression'] },
        async ({ apiRequest }) => {
            // Test modifies shared state, afterEach reverts it
        }
    );
});
```

### Applying Multiple Tags

Combine importance, type, and cross-cutting tags as needed:

```typescript
// Smoke test that is also an API test
test('should authenticate', { tag: ['@smoke', '@api'] }, async ({ apiRequest }) => { ... });

// Regression test that is destructive
test('should purge cache', { tag: ['@regression', '@destructive'] }, async ({ apiRequest }) => { ... });
```

---

## Writing Tests

### Test File Structure

Always import from the merged fixtures in `test-options.ts`:

```typescript
import { expect, test } from '../../../fixtures/pom/test-options';

test.describe('Feature Tests', () => {
    test.beforeEach(async ({ appPage }) => {
        await appPage.openHomePage();
    });

    test('should perform action', { tag: '@smoke' }, async ({ appPage }) => {
        await test.step('GIVEN user is on the home page', async () => {
            await expect(appPage.appTitle).toBeVisible();
        });

        await test.step('WHEN user performs an action', async () => {
            // Perform action
        });

        await test.step('THEN expected result should occur', async () => {
            // Assert result
        });
    });
});
```

### Using Test Steps

Use `test.step()` for better readability and reporting with Given/When/Then structure:

```typescript
test('descriptive test name', async ({ appPage }) => {
    await test.step('GIVEN user is on the login page', async () => {
        await appPage.openHomePage();
    });

    await test.step('WHEN user enters valid credentials', async () => {
        await appPage.login(email, password);
    });

    await test.step('THEN user should see dashboard', async () => {
        await expect(appPage.username).toBeVisible();
    });
});
```

### Data-Driven Tests

Use loops outside of test blocks to generate individual tests:

```typescript
import testData from '../../../test-data/static/app/invalidCredentials.json';

const { invalidCredentials } = testData;

for (const { description, email, password } of invalidCredentials) {
    test(
        `should show error for ${description}`,
        { tag: '@regression' },
        async ({ appPage }) => {
            await appPage.openHomePage();
            await appPage.login(email, password);
            await expect(appPage.errorMessage).toBeVisible();
        }
    );
}
```

## Page Object Model

### Creating Page Objects

Page objects encapsulate locators and actions for a page or component:

```typescript
import { expect, Locator, Page } from '@playwright/test';

export class MyPage {
    constructor(private readonly page: Page) {}

    // ==================== Locators ====================

    /**
     * The submit button element.
     */
    get submitButton(): Locator {
        return this.page.getByRole('button', { name: 'Submit' });
    }

    /**
     * The form input field.
     */
    get inputField(): Locator {
        return this.page.getByLabel('Email address');
    }

    // ==================== Actions ====================

    /**
     * Submits the form and waits for the response.
     * @param {string} value - The value to enter in the form.
     * @returns {Promise<void>}
     */
    async submitForm(value: string): Promise<void> {
        await this.inputField.fill(value);
        await this.submitButton.click();

        // Wait for API response
        await this.page.waitForResponse((response) =>
            response.url().includes('/api/submit')
        );

        // Verify success
        await expect(this.page.getByText('Success')).toBeVisible();
    }
}
```

### Locator Priority

Use semantic locators in this order of preference:

1. `page.getByRole()` -- Accessibility-based (recommended)
2. `page.getByLabel()` -- Form labels
3. `page.getByPlaceholder()` -- Placeholder text
4. `page.getByText()` -- Text content
5. `page.getByTestId()` -- Test IDs (fallback)
6. `page.locator()` -- CSS/XPath (last resort)

### Registering Page Objects

Add new page objects to `fixtures/pom/page-object-fixture.ts`:

```typescript
import { test as base } from '@playwright/test';
import { AppPage } from '../../pages/app/app.page';
import { MyNewPage } from '../../pages/app/my-new.page';

export type FrameworkFixtures = {
    appPage: AppPage;
    myNewPage: MyNewPage;
};

export const test = base.extend<FrameworkFixtures>({
    appPage: async ({ page }, use) => {
        await use(new AppPage(page));
    },
    myNewPage: async ({ page }, use) => {
        await use(new MyNewPage(page));
    },
});
```

### Using the `resetStorageState` Fixture

The framework provides a `resetStorageState` fixture to clear cookies and permissions during a test. This is useful when testing login flows in authenticated test projects:

```typescript
test.beforeEach(async ({ resetStorageState, appPage }) => {
    await resetStorageState();
    await appPage.openHomePage();
});

test('should login successfully', async ({ appPage }) => {
    await appPage.login(email, password);
    await expect(appPage.username).toBeVisible();
});
```

### Component Pattern

Reusable UI components can be composed into Page Objects:

```typescript
import { NavigationComponent } from '../components/navigation.component';

export class DashboardPage {
    readonly nav: NavigationComponent;

    constructor(private readonly page: Page) {
        this.nav = new NavigationComponent(page);
    }
}

// Usage in tests
await dashboardPage.nav.clickHome();
await dashboardPage.nav.logout();
```

## API Testing

### Making API Requests

Use the `apiRequest` fixture for API calls:

```typescript
import { expect, test } from '../../../fixtures/pom/test-options';
import {
    UserResponse,
    UserResponseSchema,
} from '../../../fixtures/api/schemas/app/userSchema';

test('should return user data', async ({ apiRequest }) => {
    const { status, body } = await apiRequest<UserResponse>({
        method: 'GET',
        url: '/api/users/me',
        baseUrl: process.env.API_URL,
        headers: process.env.ACCESS_TOKEN,
    });

    expect(status).toBe(200);
    expect(UserResponseSchema.parse(body)).toBeTruthy();
});
```

### API Request Options

| Option     | Type                                              | Description                                   |
| ---------- | ------------------------------------------------- | --------------------------------------------- |
| `method`   | `'GET' \| 'POST' \| 'PUT' \| 'DELETE' \| 'PATCH'` | HTTP method                                   |
| `url`      | `string`                                          | Endpoint path                                 |
| `baseUrl`  | `string` (optional)                               | Base URL to prepend                           |
| `body`     | `Record<string, unknown>` (optional)              | Request payload                               |
| `headers`  | `string` (optional)                               | Authentication token for Authorization header |
| `authType` | `'Bearer' \| 'Token' \| 'Basic'` (optional)       | Auth scheme (default: `'Bearer'`)             |

### Schema Validation with Zod

Define schemas in `fixtures/api/schemas/`:

```typescript
import { z } from 'zod';

export const UserResponseSchema = z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    token: z.string(),
});

export type UserResponse = z.infer<typeof UserResponseSchema>;
```

Use schemas to validate responses:

```typescript
const { body } = await apiRequest<UserResponse>({ ... });

// This will throw if the response doesn't match the schema
const validatedUser = UserResponseSchema.parse(body);
```

## Data Strategy

This framework uses a **bifurcated data strategy** to ensure both determinism and test isolation:

### Static Data (`test-data/static/`)

Immutable JSON files for **boundary and invalid data**. This data never changes, ensuring reproducible tests for edge cases.

```
test-data/static/
└── app/
    └── invalidCredentials.json  # Invalid email formats, SQL injection payloads, etc.
```

**Usage:**

```typescript
import invalidData from '../../../test-data/static/app/invalidCredentials.json';

for (const { description, email, password } of invalidData.invalidCredentials) {
    test(`should reject ${description}`, async ({ appPage }) => {
        await appPage.login(email, password);
        await expect(appPage.errorMessage).toBeVisible();
    });
}
```

### Dynamic Data (`test-data/factories/`)

TypeScript factory functions using **Faker + Zod** for generating unique, valid data per test run. This prevents data collision in parallel execution.

```
test-data/factories/
└── app/
    └── user.factory.ts  # generateUser(), generateLoginCredentials()
```

**Usage:**

```typescript
import {
    generateUser,
    generateLoginCredentials,
} from '../../../test-data/factories/app/user.factory';

test('should create user with unique data', async ({ apiRequest }) => {
    // Generate unique user data for this test run
    const user = generateUser();
    const credentials = generateLoginCredentials();

    // Use in API calls or UI interactions
    const { status } = await apiRequest({
        method: 'POST',
        url: '/api/users',
        body: { email: credentials.email, password: credentials.password },
    });

    expect(status).toBe(201);
});
```

**Factory with Overrides:**

```typescript
// Generate user with specific properties
const adminUser = generateUser({ email: 'admin@company.com' });

// Generate credentials with specific password
const creds = generateLoginCredentials({ password: 'SpecificPassword123!' });
```

## Authentication Setup

### How It Works

1. `auth.setup.ts` runs before main tests
2. Performs login via API to get access token
3. Performs login via browser to generate storage state
4. Main tests use the saved storage state (already authenticated)

### Storage State

The storage state is saved to `.auth/app/appStorageState.json` and includes:

- Cookies
- localStorage data
- Session information

### Using Authentication in Tests

Tests using the `chromium` project automatically load the storage state:

```typescript
// No login needed - user is already authenticated
test('should show dashboard', async ({ appPage }) => {
    await appPage.openHomePage();
    await expect(appPage.username).toBeVisible();
});
```

### Using API Token

For API tests requiring authentication:

```typescript
const { status, body } = await apiRequest<UserData>({
    method: 'GET',
    url: '/api/protected-resource',
    baseUrl: process.env.API_URL,
    headers: process.env.ACCESS_TOKEN, // Set by auth.setup.ts
});
```

## Code Quality

### Linting

```bash
# Check for issues
npm run lint

# Auto-fix issues
npm run lint:fix
```

### Formatting

```bash
npm run format
```

### Pre-commit Hooks

Husky automatically runs on staged files before each commit:

- ESLint with auto-fix
- Prettier formatting

## Coding Standards

### TypeScript

| Rule             | Description                                           |
| ---------------- | ----------------------------------------------------- |
| Type annotations | Always specify types for parameters and return values |
| Avoid `any`      | Use proper types or `unknown`                         |
| Strict mode      | Enabled in tsconfig.json                              |
| ESNext features  | Optional chaining, nullish coalescing                 |

### Naming Conventions

| Type             | Convention                 | Example                         |
| ---------------- | -------------------------- | ------------------------------- |
| Variables        | camelCase                  | `userName`                      |
| Functions        | camelCase                  | `getUserData()`                 |
| Classes          | PascalCase                 | `AppPage`                       |
| Interfaces/Types | PascalCase                 | `UserResponse`                  |
| Enums            | PascalCase                 | `Roles`                         |
| Enum values      | SCREAMING_SNAKE            | `ADMIN`                         |
| Files            | kebab-case or dot notation | `user-schema.ts`, `app.page.ts` |

### File Naming Conventions

| Type             | Directory                   | Pattern               | Example                   |
| ---------------- | --------------------------- | --------------------- | ------------------------- |
| Page objects     | `pages/app/`                | `[name].page.ts`      | `login.page.ts`           |
| Components       | `pages/components/`         | `[name].component.ts` | `navigation.component.ts` |
| Functional tests | `tests/app/functional/`     | `[name].spec.ts`      | `login.spec.ts`           |
| API tests        | `tests/app/api/`            | `[name].spec.ts`      | `login.spec.ts`           |
| E2E tests        | `tests/app/e2e/`            | `[name].spec.ts`      | `checkout.spec.ts`        |
| Setup files      | `tests/app/`                | `[name].setup.ts`     | `auth.setup.ts`           |
| Data factories   | `test-data/factories/app/`  | `[name].factory.ts`   | `user.factory.ts`         |
| Static data      | `test-data/static/app/`     | `[name].json`         | `invalidCredentials.json` |
| Zod schemas      | `fixtures/api/schemas/app/` | `[name]Schema.ts`     | `userSchema.ts`           |

### Page Object Guidelines

1. **Locators as Getters** -- Use `get` accessors for all locators
2. **Semantic Locators** -- Prefer `getByRole`, `getByLabel` over CSS/XPath
3. **Action Methods** -- Methods should represent complete user flows
4. **Validation** -- Include assertions in methods to verify action success
5. **JSDoc Comments** -- Document all public methods with descriptions and parameters

### Test Guidelines

1. **Descriptive Names** -- Test names should describe expected behavior
2. **Test Tags** -- Use importance tags (`@smoke`, `@sanity`, `@regression`), type tags (`@functional`, `@e2e`, `@api`), and `@destructive` for tests that modify shared state (see [Tag Reference](#tag-reference))
3. **Tags on Tests Only** -- Apply tags to individual tests via `{ tag: '@...' }`, never on `test.describe()` blocks
4. **Test Steps** -- Use `test.step()` with Given/When/Then for readability
5. **Independence** -- Tests should be independent and not rely on other tests
6. **Web-first Assertions** -- Use `toBeVisible`, `toHaveText`, etc.
7. **No Hardcoded Timeouts** -- Rely on Playwright's auto-waiting

---

## Core Principles (The Constitution)

This repository follows a strict architecture designed for **deterministic Playwright testing** and **AI-assisted development**. All code (human or AI-generated) **MUST** adhere to these rules.

### MUST (Mandatory)

| Rule                     | Description                                                                                                                                                       |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Dependency Injection** | ALWAYS use custom fixtures from `fixtures/pom/test-options.ts`. NEVER instantiate page objects manually (e.g., `new LoginPage(page)` is FORBIDDEN in test files). |
| **Imports**              | ALWAYS import `test` and `expect` from `fixtures/pom/test-options.ts`. NEVER import directly from `@playwright/test` in spec files.                               |
| **Selectors**            | Prioritize semantic locators: `getByRole()`, `getByLabel()`, `getByPlaceholder()`, `getByText()`. Use `getByTestId()` as fallback.                                |
| **Type Safety**          | Strictly enforce TypeScript. All data types must be defined using Zod schemas in `fixtures/api/schemas/`.                                                         |
| **Assertions**           | Use explicit web-first assertions (e.g., `expect(locator).toBeVisible()`).                                                                                        |
| **Linting**              | Code must pass ESLint and Prettier standards without warnings.                                                                                                    |
| **Data Strategy**        | Use `test-data/static/` for immutable boundary data. Use `test-data/factories/` for dynamic Faker-generated data.                                                 |
| **Destructive Cleanup**  | Tests tagged `@destructive` MUST include `afterEach`/`afterAll` hooks to revert state changes. See [Tag Reference](#tag-reference).                                |

### SHOULD (Recommended)

| Rule                        | Description                                                                                                                                    |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| **Explore Before Generate** | Navigate and explore the application before generating page objects, tests, or schemas to discover actual selectors, flows, and API responses. |
| **Data Generation**         | Use Faker via factories in `test-data/factories/` for happy-path data to ensure test isolation.                                                |
| **Test Isolation**          | Tests should be independent. Use `test.beforeEach` for setup, not shared state between tests.                                                  |
| **Test Steps**              | Use `test.step()` with Given/When/Then structure for better readability and reporting.                                                         |
| **Comments**                | Add JSDoc comments to all public methods explaining parameters and return values.                                                              |
| **Enums**                   | Use enums from `enums/` for repeated string values (roles, routes, messages).                                                                  |

### WON'T (Forbidden)

| Rule                        | Description                                                                                                |
| --------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **No XPath**                | NEVER use XPath selectors. They are brittle and unreadable.                                                |
| **No Hard Waits**           | NEVER use `page.waitForTimeout()`. Use web-first assertions (e.g., `await expect(locator).toBeVisible()`). |
| **No Magic Numbers**        | Define timeouts and constants in `config/` or `enums/`.                                                    |
| **No `any` Type**           | Avoid `any` type in TypeScript. Use strictly typed interfaces or Zod schemas.                              |
| **No Manual Instantiation** | NEVER create page objects with `new PageObject(page)` inside test files. Use fixtures.                     |
| **No Hardcoded Secrets**    | NEVER commit credentials, API keys, or environment-specific URLs. Use `process.env`.                       |
| **No Tags on Describe**     | NEVER put tags in `test.describe()`. Apply tags only to individual tests via `{ tag: '@...' }`.            |

---

## AI-Assisted Development Workflow

This framework is optimized for AI-assisted test development. Follow this workflow for the best results:

### The Golden Rule: Verify -> Commit -> Proceed

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         AI-ASSISTED DEVELOPMENT CYCLE                       │
│                                                                             │
│    ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐          │
│    │  PROMPT  │────▶│  REVIEW  │────▶│  VERIFY  │────▶│  COMMIT  │──┐       │
│    │          │     │   CODE   │     │  TESTS   │     │          │  │       │
│    └──────────┘     └──────────┘     └──────────┘     └──────────┘  │       │
│         ▲                                                           │       │
│         └───────────────────────────────────────────────────────────┘       │
│                              Next prompt                                    │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Step-by-Step Best Practices

| Step                         | Action                                                                                                                                  | Why It Matters                                                                  |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| **1. One Task Per Prompt**   | Focus each prompt on a single, well-defined task (one page object, one test file, one schema)                                           | Smaller changes are easier to review, test, and revert if needed                |
| **2. Review Generated Code** | Read through the AI-generated code before running it. Check for selector accuracy, proper patterns, and adherence to Constitution rules | Catch issues early before they propagate to dependent code                      |
| **3. Verify Tests Pass**     | Run the generated tests: `npm test` or specific test commands. Ensure they pass consistently                                            | A failing test committed now becomes technical debt later                       |
| **4. Commit Working Code**   | Once verified, commit immediately with a descriptive message                                                                            | Creates a safe checkpoint. Future prompts cannot break what's already committed |
| **5. Proceed to Next Task**  | Only after committing, move to the next prompt                                                                                          | Builds incrementally on verified, working code                                  |

### Why This Workflow?

- **Isolation of Changes**: Each commit represents a verified, working state
- **Easy Rollback**: If a prompt produces broken code, simply `git checkout` to the last working commit
- **Incremental Progress**: Complex features are built step-by-step with verification at each stage
- **AI Context Preservation**: Committed code becomes part of the codebase context for future prompts
- **Reduced Debugging**: Issues are caught immediately, not after multiple layers of changes

### Example Workflow Session

```bash
# Prompt 1: "Create a LoginPage page object for https://app.example.com/login"
# → Review the generated code
# → Run: npm run test:smoke (verify any smoke tests still pass)
# → Commit: git add . && git commit -m "Add LoginPage page object"

# Prompt 2: "Create login tests for valid and invalid credentials"
# → Review the generated tests
# → Run: npm run test:functional (verify tests pass)
# → Commit: git add . && git commit -m "Add login functional tests"

# Prompt 3: "Add password reset flow to LoginPage"
# → Review the additions
# → Run tests
# → Commit: git add . && git commit -m "Add password reset flow"
```

### Recovery from Bad Prompts

If a prompt produces unsatisfactory results, simply discard the changes and try again:

```bash
# Discard all uncommitted changes and continue
git checkout .
```

If you need to go back to a specific commit (e.g., after multiple bad prompts):

```bash
# View commit history to find the commit you want
git log --oneline

# Go back to a specific commit (replace <commit-hash> with actual hash)
git reset --hard <commit-hash>

# Example: go back to the commit before the last 3 commits
git reset --hard HEAD~3
```

This is why **committing after each verified change** is critical. Each commit is a safe checkpoint you can return to at any time.

---

## AI Rules Architecture

This project uses a **modular orchestrator pattern** for AI-assisted development. Rules are split into focused files that Cursor loads automatically based on file context.

### How It Works

- **Orchestrator** (`.cursor/rules/rules.mdc`) -- Always loaded. Contains the Constitution quick reference, AI workflow, and an index of all detail rule files.
- **Detail rule files** (`.cursor/rules/*.mdc`) -- Glob-scoped. Loaded automatically when editing files matching their patterns. Each file covers one concern in depth.
- **Prompt templates** (`.cursor/prompts/common-tasks.md`) -- Referenced by the orchestrator for code generation tasks. Contains prompt templates, anti-patterns checklist, and verification checklist.

### Rule Files

| File                 | Auto-loads When Editing              | Covers                                                            |
| -------------------- | ------------------------------------ | ----------------------------------------------------------------- |
| `rules.mdc`          | Always                               | Constitution, workflow, file index                                |
| `selectors.mdc`      | `pages/**`                           | Selector priority, locator examples, forbidden patterns           |
| `page-objects.mdc`   | `pages/**`                           | POM pattern, getter locators, component composition, registration |
| `fixtures.mdc`       | `fixtures/**`, `tests/**`            | Dependency injection, fixture creation, merging                   |
| `test-standards.mdc` | `tests/**`                           | Test structure, imports, tagging, steps, assertions               |
| `type-safety.mdc`    | `**/*.ts`                            | Zod schemas, no-any enforcement, TypeScript strict mode           |
| `data-strategy.mdc`  | `test-data/**`, `tests/**`           | Factories, static data, when to use which                         |
| `api-testing.mdc`    | `fixtures/api/**`, `tests/**/api/**` | API fixtures, schema validation, endpoint testing                 |
| `enums.mdc`          | `enums/**`                           | Enum conventions, naming, organization                            |
| `config.mdc`         | `config/**`                          | Configuration patterns, environment variables                     |
| `helpers.mdc`        | `helpers/**`                         | Helper function conventions, auth helpers, helper vs fixture      |

This means when you edit a file in `pages/`, Cursor automatically loads `selectors.mdc` and `page-objects.mdc` alongside the always-present orchestrator -- providing focused, relevant rules without noise from unrelated concerns.

---

## Architecture Overview

The framework uses a layered fixture composition pattern that provides clean separation of concerns:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         test-options.ts                                 │
│                    (Single Import Point for Tests)                      │
│                                                                         │
│     import { test, expect } from 'fixtures/pom/test-options';           │
└───────────────────────────┬─────────────────────────┬───────────────────┘
                            │                         │
                     mergeTests()                mergeTests()
                            │                         │
         ┌──────────────────▼──────────┐   ┌─────────▼─────────────────┐
         │   page-object-fixture.ts    │   │  api-request-fixture.ts   │
         │                             │   │                           │
         │  • appPage: AppPage         │   │  • apiRequest<T>()        │
         │  • resetStorageState()      │   │    - Type-safe responses  │
         │                             │   │    - Zod validation       │
         └──────────────────┬──────────┘   └─────────┬─────────────────┘
                            │                         │
              ┌─────────────▼──────────┐   ┌─────────▼─────────────────┐
              │      pages/            │   │   fixtures/api/schemas/   │
              │                        │   │                           │
              │  • AppPage             │   │  • UserResponseSchema     │
              │  • NavigationComponent │   │  • ErrorResponseSchema    │
              │  • (Your Page Objects) │   │  • (Your API Schemas)     │
              └────────────────────────┘   └───────────────────────────┘
```

### Key Architectural Decisions

| Decision                | Rationale                                                                      |
| ----------------------- | ------------------------------------------------------------------------------ |
| **Single import point** | Tests always import from `test-options.ts`, ensuring consistent fixture access |
| **Fixture composition** | `mergeTests()` combines POM and API fixtures without coupling                  |
| **Schema validation**   | Zod schemas provide runtime type safety for API responses                      |
| **Component pattern**   | Reusable UI components (like `NavigationComponent`) can be composed into pages |

---

## Troubleshooting

### `APP_URL is undefined` or tests navigate to `undefined`

The environment file is missing or not loaded. Ensure `env/.env.dev` exists:

```bash
cp env/.env.example env/.env.dev
```

Then edit it with your application's actual URLs and credentials.

### `browserType.launch: Executable doesn't exist`

Playwright browsers are not installed. Run:

```bash
npx playwright install
```

### Auth setup fails and all tests are skipped

The `setup` project runs before all test projects. If it fails (wrong credentials, app not reachable), all dependent projects are skipped entirely. Check:

1. Your `APP_URL` and `API_URL` are reachable from your machine
2. Your `APP_EMAIL` and `APP_PASSWORD` are valid credentials
3. The login flow in `helpers/app/createStorageState.ts` matches your app's actual login form

### `Cannot find module '../fixtures/pom/test-options'`

Import paths are relative to the test file location. From `tests/app/functional/`:

```typescript
import { expect, test } from '../../../fixtures/pom/test-options';
```

Count the directory levels carefully. Spec files in `tests/app/api/` and `tests/app/e2e/` use the same relative path.

### ESLint errors after generating code

Run the auto-fixer:

```bash
npm run lint:fix
```

If errors persist, check that the generated code follows the [Core Principles](#core-principles-the-constitution) -- common violations are missing return types, use of `any`, or raw locators.

### Tests pass locally but fail in CI

Common causes:

- **Missing environment variables** -- Ensure CI has all variables from `env/.env.example`
- **Timeouts** -- CI machines may be slower; adjust timeouts in `playwright.config.ts` if needed
- **Browser differences** -- CI typically runs headless; test locally with `npm run test:ci` first to reproduce

## License

This project is licensed under the MIT License -- see the [LICENSE](LICENSE) file for details.
