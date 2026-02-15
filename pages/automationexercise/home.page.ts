import { expect, Locator, Page } from '@playwright/test';
import { acceptConsentIfVisible } from '../../helpers/util/consent';

export class HomePage {
    readonly page: Page;

    // Top nav
    readonly header: Locator;
    readonly homeLink: Locator;
    readonly productsLink: Locator;
    readonly cartLink: Locator;
    readonly signupLoginLink: Locator;
    readonly testCasesLink: Locator;
    readonly apiTestingLink: Locator;
    readonly contactUsLink: Locator;

    // Unique home page content (stable, not duplicated like the slider)
    readonly categoryHeading: Locator;
    readonly featuresItemsHeading: Locator;
    readonly subscriptionHeading: Locator;

    constructor(page: Page) {
        this.page = page;

        // Scope to header so we don't match footer links
        this.header = page.getByRole('banner');

        this.homeLink = this.header.getByRole('link', { name: /home/i });
        this.productsLink = this.header.getByRole('link', {
            name: /products/i,
        });
        this.cartLink = this.header.getByRole('link', { name: /cart/i });
        this.signupLoginLink = this.header.getByRole('link', {
            name: /signup\s*\/\s*login/i,
        });
        this.testCasesLink = this.header.getByRole('link', {
            name: /test cases/i,
        });
        this.apiTestingLink = this.header.getByRole('link', {
            name: /api testing/i,
        });
        this.contactUsLink = this.header.getByRole('link', {
            name: /contact us/i,
        });

        // These headings are unique on the page (unlike the carousel slide content)
        this.categoryHeading = page.getByRole('heading', {
            name: /^category$/i,
        });
        this.featuresItemsHeading = page.getByRole('heading', {
            name: /^features items$/i,
        });
        this.subscriptionHeading = page.getByRole('heading', {
            name: /^subscription$/i,
        });
    }

    async goto(): Promise<void> {
        // If baseURL is configured -> "/" works. If not, fall back to APP_URL.
        try {
            await this.page.goto('/');
        } catch {
            const url = process.env.APP_URL;
            if (!url)
                throw new Error('baseURL is not set and APP_URL is missing');
            await this.page.goto(url);
        }

        await acceptConsentIfVisible(this.page);
        await this.expectLoaded();
    }

    async expectLoaded(): Promise<void> {
        await expect(this.page).toHaveTitle(/automation exercise/i);
        await expect(this.header).toBeVisible();

        // Proof home content is loaded (stable)
        await expect(this.categoryHeading).toBeVisible();
        await expect(this.featuresItemsHeading).toBeVisible();
        await expect(this.subscriptionHeading).toBeVisible();
    }

    async goHome(): Promise<void> {
        await this.homeLink.click();
        await acceptConsentIfVisible(this.page);
        await this.expectLoaded();
    }

    async goToProducts(): Promise<void> {
        await this.productsLink.click();
        await acceptConsentIfVisible(this.page);
        await expect(this.page).toHaveURL(/\/products/i);
    }

    async goToCart(): Promise<void> {
        await this.cartLink.click();
        await acceptConsentIfVisible(this.page);
        await expect(this.page).toHaveURL(/\/view_cart/i);
    }

    async goToSignupLogin(): Promise<void> {
        await this.signupLoginLink.click();
        await acceptConsentIfVisible(this.page);
        await expect(this.page).toHaveURL(/\/login/i);
    }

    async goToTestCases(): Promise<void> {
        await this.testCasesLink.click();
        await acceptConsentIfVisible(this.page);
        await expect(this.page).toHaveURL(/\/test_cases/i);
    }

    async goToApiTesting(): Promise<void> {
        await this.apiTestingLink.click();
        await acceptConsentIfVisible(this.page);
        await expect(this.page).toHaveURL(/\/api_list/i);
    }

    async goToContactUs(): Promise<void> {
        await this.contactUsLink.click();
        await acceptConsentIfVisible(this.page);
        await expect(this.page).toHaveURL(/\/contact_us/i);
    }
}
