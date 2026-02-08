import { expect, type Page } from '@playwright/test';

export async function acceptConsentIfVisible(page: Page): Promise<void> {
    const consentBtn = page.getByRole('button', { name: /^consent$/i });

    const visible = await consentBtn
        .isVisible({ timeout: 1500 })
        .catch(() => false);
    if (!visible) return;

    await consentBtn.click();

    // Ensure consent UI is gone
    await expect(consentBtn).toBeHidden({ timeout: 5000 });

    // Site-specific: ensure overlay is removed (without using page.locator)
    await page.waitForFunction(
        () => !document.querySelector('.fc-consent-root, .fc-dialog-overlay'),
        null,
        { timeout: 5000 }
    );
}
