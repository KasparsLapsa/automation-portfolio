import { expect, Page } from '@playwright/test';

/**
 * Accepts AutomationExercise consent banner if it appears.
 * Safe to call on every test; does nothing if banner is not present.
 */
export async function acceptAeConsentIfPresent(page: Page): Promise<void> {
  const consentRoot = page.locator('.fc-consent-root');
  const isVisible = await consentRoot.isVisible().catch(() => false);

  if (!isVisible) return;

  // The button label may vary ("Consent", sometimes "I Consent").
  const consentButton = page
    .getByRole('button', { name: /consent/i })
    .first();

  await expect(consentButton).toBeVisible({ timeout: 10_000 });
  await consentButton.click();

  // Wait for overlay to be gone so it cannot intercept clicks
  await expect(page.locator('.fc-dialog-overlay')).toBeHidden({
    timeout: 10_000,
  });
}
