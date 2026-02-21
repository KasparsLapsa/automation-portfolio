import { expect, type Locator, type Page } from '@playwright/test';
import { acceptConsentIfVisible } from '../../helpers/util/consent';
import type { Consent } from '../../src/types';
import { NavBar } from './components/navbar.component';

function defaultConsent(page: Page): Consent {
    return { acceptIfVisible: async () => acceptConsentIfVisible(page) };
}

export class ProductsPage {
    readonly nav: NavBar;

    constructor(
        private readonly page: Page,
        private readonly consent: Consent = defaultConsent(page)
    ) {
        this.nav = new NavBar(page);
    }

    get allProductsHeading(): Locator {
        return this.page.getByRole('heading', { name: /all products/i });
    }

    get searchedProductsHeading(): Locator {
        return this.page.getByRole('heading', { name: /searched products/i });
    }

    get searchInput(): Locator {
        return this.page.getByPlaceholder(/search product/i);
    }

    get searchButton(): Locator {
        // Icon-only button on this site, so role+name is unreliable.
        // eslint-disable-next-line playwright/no-raw-locators
        return this.page.locator('#submit_search');
    }

    private get resultsSection(): Locator {
        // eslint-disable-next-line playwright/no-raw-locators
        return this.page.locator('.features_items', {
            has: this.searchedProductsHeading,
        });
    }

    private get productNameCells(): Locator {
        // eslint-disable-next-line playwright/no-raw-locators
        return this.resultsSection.locator('.productinfo p');
    }

    async goto(): Promise<void> {
        await this.page.goto('/products', { waitUntil: 'domcontentloaded' });
        await this.consent.acceptIfVisible();
        await expect(this.allProductsHeading).toBeVisible();
    }

    async search(term: string): Promise<void> {
        await expect(this.searchInput).toBeVisible();
        await this.searchInput.fill(term);

        await this.searchButton.click();
        await this.consent.acceptIfVisible();

        await expect(this.searchedProductsHeading).toBeVisible();
    }

    async assertHasAnyProductNameMatching(re: RegExp): Promise<void> {
        const matches = this.productNameCells.filter({ hasText: re });

        await expect
            .poll(async () => matches.count(), {
                message: `Expected at least one visible product name matching ${re}`,
            })
            .toBeGreaterThan(0);
    }
}
