import { expect, type Locator, type Page } from '@playwright/test';
import { acceptConsentIfVisible } from '../../helpers/util/consent';
import type { Consent } from '../../src/types';
import { NavBar } from '../../components/automationexercise/navbar.component';

function defaultConsent(page: Page): Consent {
  return { acceptIfVisible: async () => acceptConsentIfVisible(page) };
}

export class ProductDetailsPage {
  readonly nav: NavBar;

  constructor(
    private readonly page: Page,
    private readonly consent: Consent = defaultConsent(page)
  ) {
    this.nav = new NavBar(page);
  }

  get addToCartButton(): Locator {
    return this.page.getByRole('button', { name: /add to cart/i });
  }

  get continueShoppingButton(): Locator {
    return this.page.getByRole('button', { name: /continue shopping/i });
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

    // Modal/button doesn't always appear; keep it simple and non-flaky.
    try {
      if (await this.continueShoppingButton.isVisible({ timeout: 1200 })) {
        await this.continueShoppingButton.click();
      }
    } catch {
      // do nothing
    }
  }
}
