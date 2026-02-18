import { Locator, Page, expect } from '@playwright/test';

export class NavBar {
    readonly header: Locator;
    readonly homeLink: Locator;
    readonly productsLink: Locator;
    readonly cartLink: Locator;
    readonly signupLoginLink: Locator;
    readonly logoutLink: Locator;
    readonly loggedInAs: Locator;

    constructor(private readonly page: Page) {
        this.header = page.getByRole('banner');

        this.homeLink = this.header.getByRole('link', { name: /home/i });
        this.productsLink = this.header.getByRole('link', {
            name: /products/i,
        });
        this.cartLink = this.header.getByRole('link', { name: /cart/i });
        this.signupLoginLink = this.header.getByRole('link', {
            name: /signup\s*\/\s*login/i,
        });

        // Visible only after login
        this.logoutLink = this.header.getByRole('link', { name: /logout/i });
        this.loggedInAs = this.header.getByText(/logged in as/i);
    }

    async openCart(): Promise<void> {
        await this.cartLink.click();
    }

    async expectLoggedIn(): Promise<void> {
        await expect(this.loggedInAs).toBeVisible();
        await expect(this.logoutLink).toBeVisible();
    }
}
