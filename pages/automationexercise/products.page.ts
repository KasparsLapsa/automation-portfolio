import { expect, Locator, Page } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;

  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchIconButton: Locator;

  readonly searchedProductsHeading: Locator;
  readonly anyDressText: Locator;

  constructor(page: Page) {
    this.page = page;

    this.searchInput = page.getByPlaceholder(/search product/i);

    this.searchButton = page.getByRole('button', { name: /^search$/i });
    this.searchIconButton = page.getByRole('button', { name: // });

    this.searchedProductsHeading = page.getByRole('heading', { name: /searched products/i });
    this.anyDressText = page.getByText(/dress/i);
  }

  async search(term: string): Promise<void> {
    await this.searchInput.fill(term);

    if (await this.searchButton.isVisible().catch(() => false)) {
      await this.searchButton.click();
    } else {
      await this.searchIconButton.click();
    }

    await expect(this.searchedProductsHeading).toBeVisible();
  }

  async expectHasAnyDressResult(): Promise<void> {
    await expect(this.anyDressText).not.toHaveCount(0);
  }
}
