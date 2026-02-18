import { expect, type Locator, type Page } from '@playwright/test';
import type { Consent } from '../../src/types';
import { NavBar } from './components/navbar.component';

export class ProductDetailsPage {
    readonly nav: NavBar;

    constructor(
        private readonly page: Page,
        private readonly consent: Consent
    ) {
        this.nav = new NavBar(page);
    }

    get addToCartButton(): Locator {
        return this.page.getByRole('button', { name: /add to cart/i });
    }

    async gotoById(productId: number): Promise<void> {
        await this.page.goto(`/product_details/${productId}`);
        await this.consent.acceptIfVisible();
        await expect(this.page).toHaveURL(
            new RegExp(`/product_details/${productId}`, 'i')
        );
    }

    async expectProductNameVisible(name: string): Promise<void> {
        await expect(this.page.getByText(name, { exact: true })).toBeVisible();
    }

    async addToCartAndContinueShopping(): Promise<void> {
        await this.addToCartButton.click();

        // Prefer semantic locator to satisfy lint rule.
        // The cart modal is a dialog overlay that blocks header clicks until closed.
        const modal = this.page.getByRole('dialog');

        try {
            await modal.waitFor({ state: 'visible', timeout: 5000 });

            await modal
                .getByRole('button', { name: /continue shopping/i })
                .click();

            await modal.waitFor({ state: 'hidden', timeout: 5000 });
        } catch {
            // modal didn't show up or already disappeared
        }
    }
}
