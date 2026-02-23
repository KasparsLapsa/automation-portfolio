# Reliability notes

## Locator strategy

Prefer:

1. getByRole
2. getByLabel / getByPlaceholder
3. getByText (scoped)
4. getByTestId
5. locator() as a last resort

## Waiting strategy

- Avoid fixed sleeps
- Prefer Playwright web-first assertions (`expect(locator).toBeVisible()`, `toHaveText`, `toHaveURL`)
- Wait on the user-visible state that proves the page is ready

## Overlays / consent

- Handle consent/overlays via a dedicated helper/fixture
- Keep that logic in one place to avoid duplication

## Debugging in CI

- Use traces/videos/screenshots from the CI report
- Reproduce locally with the same command and `--workers=1` when needed

## Flakiness rules

- Fix root cause first (locators/waits/state)
- Only increase timeouts as a last resort
