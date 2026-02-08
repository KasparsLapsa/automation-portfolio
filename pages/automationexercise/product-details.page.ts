import { expect, Locator, Page } from '@playwright/test';
import { acceptConsentIfVisible } from '../../helpers/util/consent';
import { clickIfVisible } from '../../helpers/util/ui';

export class ProductDetailsPage {
  readonly page: Page;

  readonly productTitle: Locator;
  readonly addToCartButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // AutomationExercise uses exact product names on details page
    this.productTitle = page.getByRole('heading').or(page.getByText(/.+/)); // not used directly
    this.addToCartButton = page.getByRole('button', { name: /add to cart/i });
    this.continueShoppingButton = page.getByRole('button', {
      name: /continue shopping/i,
    });
  }

  async gotoById(productId: number): Promise<void> {
    const base = process.env.APP_URL;
    if (!base) throw new Error('APP_URL is not set');

    await this.page.goto(`${base}/product_details/${productId}`);
    await acceptConsentIfVisible(this.page);
  }

  async expectProductNameVisible(name: string): Promise<void> {
    await expect(this.page.getByText(name, { exact: true })).toBeVisible();
  }

  async addToCartAndContinueShopping(): Promise<void> {
    await this.addToCartButton.click();
    await clickIfVisible(this.continueShoppingButton);
  }
}
