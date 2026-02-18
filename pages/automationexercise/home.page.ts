import { expect, type Locator, type Page } from '@playwright/test';
import type { Consent } from '../../src/types';

export class HomePage {
    constructor(
        private readonly page: Page,
        private readonly consent: Consent
    ) {}

    get header(): Locator {
        return this.page.getByRole('banner');
    }

    get homeLink(): Locator {
        return this.header.getByRole('link', { name: /home/i });
    }
    get productsLink(): Locator {
        return this.header.getByRole('link', { name: /products/i });
    }
    get cartLink(): Locator {
        return this.header.getByRole('link', { name: /cart/i });
    }
    get signupLoginLink(): Locator {
        return this.header.getByRole('link', { name: /signup\s*\/\s*login/i });
    }
    get testCasesLink(): Locator {
        return this.header.getByRole('link', { name: /test cases/i });
    }
    get apiTestingLink(): Locator {
        return this.header.getByRole('link', { name: /api testing/i });
    }
    get contactUsLink(): Locator {
        return this.header.getByRole('link', { name: /contact us/i });
    }

    get categoryHeading(): Locator {
        return this.page.getByRole('heading', { name: /^category$/i });
    }
    get featuresItemsHeading(): Locator {
        return this.page.getByRole('heading', { name: /^features items$/i });
    }
    get subscriptionHeading(): Locator {
        return this.page.getByRole('heading', { name: /^subscription$/i });
    }

    async goto(): Promise<void> {
        await this.page.goto('/');
        await this.consent.acceptIfVisible();
        await this.assertHomeReady();
    }

    async assertHomeReady(): Promise<void> {
        await expect(this.page).toHaveTitle(/automation exercise/i);
        await expect(this.header).toBeVisible();
        await expect(this.categoryHeading).toBeVisible();
        await expect(this.featuresItemsHeading).toBeVisible();
        await expect(this.subscriptionHeading).toBeVisible();
    }

    // keep alias so you don’t need to update all tests right now
    async expectLoaded(): Promise<void> {
        await this.assertHomeReady();
    }
}
