import { expect, Locator, Page } from '@playwright/test';

export class CheckoutPage {
    readonly addressDetailsHeading: Locator;
    readonly reviewOrderHeading: Locator;

    constructor(private readonly page: Page) {
        this.addressDetailsHeading = page.getByText(/address details/i);
        this.reviewOrderHeading = page.getByText(/review your order/i);
    }

    async expectLoaded(): Promise<void> {
        await expect(this.page).toHaveURL(/\/checkout/i);
        await expect(this.addressDetailsHeading).toBeVisible();
        await expect(this.reviewOrderHeading).toBeVisible();
    }
}
