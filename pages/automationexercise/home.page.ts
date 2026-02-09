import { expect, Locator, Page } from '@playwright/test';
import { acceptConsentIfVisible } from '../../helpers/util/consent';

export class HomePage {
    readonly page: Page;

    readonly header: Locator;
    readonly homeLink: Locator;
    readonly productsLink: Locator;

    constructor(page: Page) {
        this.page = page;

        // Scope to top navigation area (avoids matching footer links)
        this.header = page.getByRole('banner');

        // Icon is part of accessible name, so don’t anchor to ^home$
        this.homeLink = this.header.getByRole('link', { name: /home/i });
        this.productsLink = this.header.getByRole('link', {
            name: /products/i,
        });
    }

    async goto(): Promise<void> {
        const url = process.env.APP_URL;
        if (!url) throw new Error('APP_URL is not set');

        await this.page.goto(url);
        await acceptConsentIfVisible(this.page);
    }

    async expectLoaded(): Promise<void> {
        await expect(this.page).toHaveTitle(/Automation Exercise/i);
    }

    async goToProducts(): Promise<void> {
        await this.productsLink.click();
        await acceptConsentIfVisible(this.page);
    }
}
