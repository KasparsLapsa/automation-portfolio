import { Locator } from '@playwright/test';

/**
 * Clicks a locator only if it becomes visible within a short timeout.
 * Keeps tests clean (no conditionals inside tests).
 */
export async function clickIfVisible(
    locator: Locator,
    timeoutMs = 2000
): Promise<void> {
    try {
        await locator.waitFor({ state: 'visible', timeout: timeoutMs });
        await locator.click();
    } catch {
        // Not visible within timeout -> do nothing
    }
}
