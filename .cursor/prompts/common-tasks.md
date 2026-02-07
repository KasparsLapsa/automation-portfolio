# AI Prompt Templates for Playwright Scaffold

This file contains prompt templates for common development tasks. Use these as starting points when asking AI to generate code for this repository.

---

## Quick Reference

| Task             | Key Files               | Primary Fixture          |
| ---------------- | ----------------------- | ------------------------ |
| Add page object  | `pages/app/`            | `page-object-fixture.ts` |
| Add API schema   | `fixtures/api/schemas/` | Zod                      |
| Add test         | `tests/app/`            | `test-options.ts`        |
| Add data factory | `test-data/factories/`  | Faker + Zod              |
| Add component    | `pages/components/`     | N/A                      |

---

## Page Object Tasks

> **Important:** Before generating page objects, the AI should navigate to the target page to discover actual element roles, labels, text content, and UI structure. This ensures accurate selectors and realistic action methods.

### Add a New Page Object (With Exploration)

```
Create a new page object for [PAGE NAME].

First, navigate to [URL] and explore the page to discover:
- Element roles, labels, and accessible names
- Form field structure and validation
- Button names and available actions
- Any dynamic content or loading states

Then generate the page object with:
- File location: pages/app/[name].page.ts
- Accurate semantic locators based on exploration
- JSDoc comments for all public methods
- Registration in fixtures/pom/page-object-fixture.ts
```

### Add a New Page Object (Without Exploration)

Use this when you already know the exact element structure:

```
Create a new page object for [PAGE NAME] with the following elements:
- [List of elements/locators needed]
- [Actions the page should perform]

Requirements:
- File location: pages/app/[name].page.ts
- Use semantic locators (getByRole > getByLabel > getByTestId)
- Add JSDoc comments for all public methods
- Register in fixtures/pom/page-object-fixture.ts
- Follow the pattern from pages/app/app.page.ts
```

### Add Locators to Existing Page

```
Add the following locators to [PAGE_NAME] page object:
- [Element 1]: [description]
- [Element 2]: [description]

Use getByRole() as the primary selector strategy.
Add getter methods following the existing pattern.
```

### Add Action Method to Page Object

```
Add an action method to [PAGE_NAME] page object:
- Method name: [methodName]
- Purpose: [what it does]
- Parameters: [list parameters]
- Wait for: [API response or element state]

Include proper return type and JSDoc comment.
```

---

## Test Tasks

> **Important:** For E2E tests, the AI should navigate through the user flow first to understand the actual steps, element interactions, and expected outcomes.

### Create E2E Test (With Exploration)

```
Create an E2E test for [USER FLOW].

First, navigate through the flow at [STARTING_URL] to discover:
- The exact steps a user takes
- Elements involved at each step
- Success/error states and messages
- Any API calls made during the flow

Then generate the test with:
- Location: tests/app/e2e/[name].spec.ts
- Realistic test steps based on exploration
- Proper assertions for each state
- Tags: @e2e and appropriate importance tag
```

### Create a New Test File (Without Exploration)

```
Create a new test file for [FEATURE NAME]:
- Location: tests/app/[functional|api|e2e]/[name].spec.ts
- Import from fixtures/pom/test-options.ts
- Use @[smoke|sanity|regression] for importance level
- Use @[functional|e2e|api] for test type
- Add @destructive to any test that modifies shared state (runs isolated, single worker)
- Structure with test.describe and test.step (Given/When/Then)
- Use beforeEach for setup if needed

Test scenarios:
1. [Scenario 1]
2. [Scenario 2]
```

### Add Data-Driven Tests

```
Add data-driven tests to [TEST FILE] for [SCENARIO]:
- Use static data from test-data/static/app/[file].json
- Loop outside test blocks to generate individual tests
- Each test should have descriptive name including test data

Test data structure:
{
  "testCases": [
    { "description": "", "input": "", "expected": "" }
  ]
}
```

### Add API Test

```
Create an API test for [ENDPOINT]:
- HTTP method: [GET|POST|PUT|DELETE|PATCH]
- Endpoint: [/api/path]
- Request body schema: [describe fields]
- Expected response schema: [describe fields]

Requirements:
- Create Zod schema in fixtures/api/schemas/app/
- Use apiRequest fixture
- Validate response with schema.parse()
- Tag with @api
```

---

## API Schema Tasks

> **Important:** For API schemas, the AI should make a request to the endpoint first to capture the actual response structure, field names, and types.

### Create a New Zod Schema (With Exploration)

```
Create a Zod schema for [ENDPOINT].

First, make a request to [API_URL/endpoint] to discover:
- Actual response structure and field names
- Data types for each field
- Optional vs required fields
- Nested objects or arrays

Then generate the schema with:
- Location: fixtures/api/schemas/app/[name]Schema.ts
- Accurate field types based on actual response
- Proper Zod validators (email, uuid, url, etc.)
- Exported TypeScript type
```

### Create a New Zod Schema (Without Exploration)

```
Create a Zod schema for [API RESPONSE/REQUEST]:
- Location: fixtures/api/schemas/[app|util]/[name]Schema.ts
- Fields:
  - [field1]: [type] (required|optional)
  - [field2]: [type] (required|optional)

Export both the schema and the inferred TypeScript type.
Follow the pattern from fixtures/api/schemas/app/userSchema.ts.
```

### Add Fields to Existing Schema

```
Add the following fields to [SCHEMA_NAME]:
- [field1]: [type with validation rules]
- [field2]: [type with validation rules]

Update the corresponding TypeScript type export.
```

---

## Data Factory Tasks

### Create a New Data Factory

```
Create a data factory for [DATA TYPE]:
- Location: test-data/factories/app/[name].factory.ts
- Use @faker-js/faker for data generation
- Validate output with Zod schema from fixtures/api/schemas/
- Support overrides parameter for customization
- Support seed option for reproducibility

Fields to generate:
- [field1]: [faker method to use]
- [field2]: [faker method to use]
```

### Add Static Test Data

```
Create static test data for [PURPOSE]:
- Location: test-data/static/app/[name].json
- Use for: [boundary testing|invalid data|edge cases]

Data structure:
{
  "[category]": [
    { "description": "", "value": "" }
  ]
}
```

---

## Fixture Tasks

### Add a New Fixture

```
Create a new fixture for [PURPOSE]:
- Location: fixtures/[category]/[name]-fixture.ts
- Fixture name: [fixtureName]
- Purpose: [what it provides]

Requirements:
- Export test using base.extend<FixtureType>()
- Export the fixture types
- Add cleanup logic if needed
- Merge into fixtures/pom/test-options.ts
```

---

## Component Tasks

### Add a Reusable Component

```
Create a component object for [COMPONENT NAME] (e.g., header, modal, sidebar):
- Location: pages/components/[name].component.ts
- Elements: [list of elements]
- Actions: [list of actions]

The component should be composable into page objects.
Follow the pattern from pages/components/navigation.component.ts.
```

---

## Common Mistakes to Avoid

1. **DON'T** import from `@playwright/test` in spec files
    - ✅ `import { test, expect } from '../fixtures/pom/test-options'`

2. **DON'T** instantiate page objects manually
    - ❌ `const page = new AppPage(page)`
    - ✅ Use fixture: `async ({ appPage }) => { ... }`

3. **DON'T** use XPath selectors
    - ❌ `page.locator('//div[@id="test"]')`
    - ✅ `page.getByTestId('test')` or `page.getByRole(...)`

4. **DON'T** use hard waits
    - ❌ `await page.waitForTimeout(1000)`
    - ✅ `await expect(locator).toBeVisible()`

5. **DON'T** use `any` type
    - ❌ `const data: any = ...`
    - ✅ Use Zod schema types or explicit interfaces

6. **DON'T** hardcode secrets
    - ❌ `password: 'secret123'`
    - ✅ `password: process.env.APP_PASSWORD`

7. **DON'T** put tags on `test.describe()` blocks
    - ❌ `test.describe('Feature @smoke', () => { ... })`
    - ✅ `test.describe('Feature', () => { test('...', { tag: '@smoke' }, ...) })`

---

## Verification Checklist

After generating code, verify:

- [ ] Imports are from `fixtures/pom/test-options.ts`
- [ ] Locators use semantic selectors
- [ ] No `any` types used
- [ ] No hard waits (`waitForTimeout`)
- [ ] No XPath selectors
- [ ] No hardcoded credentials
- [ ] JSDoc comments on public methods
- [ ] Tests use `test.step` with Given/When/Then
- [ ] Tests have appropriate tags (`@smoke`, `@regression`, `@functional`, `@e2e`, `@api`, `@destructive`, etc.)
- [ ] Tags are on individual tests, not on `test.describe()` blocks
- [ ] Tests that modify shared state are tagged `@destructive` (runs with single worker)
