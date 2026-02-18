import { expect, type Locator, type Page } from '@playwright/test';
import type { Consent } from '../../src/types';

export class CheckoutPage {
    constructor(
        private readonly page: Page,
        private readonly consent: Consent
    ) {}

    get addressDetailsHeading(): Locator {
        return this.page.getByText(/address details/i);
    }

    get reviewOrderHeading(): Locator {
        return this.page.getByText(/review your order/i);
    }

    async assertCheckoutReady(): Promise<void> {
        await this.consent.acceptIfVisible();
        await expect(this.page).toHaveURL(/\/checkout/i);
        await expect(this.addressDetailsHeading).toBeVisible();
        await expect(this.reviewOrderHeading).toBeVisible();
    }

    // Backwards-compat alias
    async expectLoaded(): Promise<void> {
        await this.assertCheckoutReady();
    }
}
