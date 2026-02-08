import { expect, type Page } from '@playwright/test';

export async function acceptConsentIfVisible(page: Page): Promise<void> {
  const dialog = page.getByRole('dialog', { name: /consent/i });

  const visible = await dialog.isVisible({ timeout: 1500 }).catch(() => false);
  if (!visible) return;

  // Click the consent button inside the dialog
  await dialog.getByRole('button', { name: /^consent$/i }).click();

  // Ensure the modal AND its overlay are actually gone before continuing
  await expect(dialog).toBeHidden({ timeout: 5000 });

  // Optional but very helpful on this site (it uses an overlay that blocks clicks)
  await expect(page.locator('.fc-consent-root, .fc-dialog-overlay')).toHaveCount(0, {
    timeout: 5000,
  });
}
