import { expect, Locator, Page } from '@playwright/test';
import { acceptConsentIfVisible } from '../../helpers/util/consent';
import { NavBar } from '../../components/automationexercise/navbar.component';

export class CartPage {
    readonly page: Page;
    readonly nav: NavBar;

    readonly proceedToCheckout: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nav = new NavBar(page);

        this.proceedToCheckout = page
            .getByRole('button', { name: /proceed to checkout/i })
            .or(page.getByRole('link', { name: /proceed to checkout/i }))
            .or(page.getByText(/^proceed to checkout$/i));
    }

    async open(): Promise<void> {
        await this.nav.openCart();
        await acceptConsentIfVisible(this.page);
        await expect(this.page).toHaveURL(/\/view_cart/i);
    }

    async expectProductVisible(name: string): Promise<void> {
        await expect(this.page.getByText(name, { exact: true })).toBeVisible();
    }

    async proceed(): Promise<void> {
        await expect(this.proceedToCheckout).toBeVisible();
        await this.proceedToCheckout.click();
        await expect(this.page).toHaveURL(/\/checkout/i);
    }
}
