import { expect, type Locator, type Page } from '@playwright/test';

export class ProductsPage {
    constructor(private readonly page: Page) {}

    get allProductsHeading(): Locator {
        return this.page.getByRole('heading', { name: /all products/i });
    }

    get searchedProductsHeading(): Locator {
        return this.page.getByRole('heading', { name: /searched products/i });
    }

    get searchInput(): Locator {
        return this.page.getByPlaceholder(/search product/i);
    }

    async goto(): Promise<void> {
        await this.page.goto('/products', { waitUntil: 'domcontentloaded' });
        await expect(this.allProductsHeading).toBeVisible();
    }

    async search(term: string): Promise<void> {
        await expect(this.searchInput).toBeVisible();
        await this.searchInput.fill(term);

        // Avoid clicking the icon-only button (would require a raw locator)
        await this.searchInput.press('Enter');

        await expect(this.searchedProductsHeading).toBeVisible();
    }

    async expectAtLeastOneVisibleResultContains(term: RegExp): Promise<void> {
        // `/dress/i` can match hidden sidebar category link "Dress"
        // -> exclude exact "Dress" and then assert at least one is actually visible
        const matches = this.page
            .getByText(term)
            .filter({ hasNotText: /^dress$/i });

        await expect
            .poll(async () => {
                return matches.evaluateAll((els) =>
                    els.some((el) => {
                        const e = el as HTMLElement;
                        const style = window.getComputedStyle(e);
                        const rect = e.getBoundingClientRect();
                        return (
                            style.display !== 'none' &&
                            style.visibility !== 'hidden' &&
                            rect.width > 0 &&
                            rect.height > 0
                        );
                    })
                );
            })
            .toBe(true);
    }
}
