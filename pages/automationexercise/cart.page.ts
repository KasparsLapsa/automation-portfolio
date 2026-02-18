import { expect, type Locator, type Page } from '@playwright/test';
import { acceptConsentIfVisible } from '../../helpers/util/consent';
import type { Consent } from '../../src/types';
import { NavBar } from '../../components/automationexercise/navbar.component';

function defaultConsent(page: Page): Consent {
  return { acceptIfVisible: async () => acceptConsentIfVisible(page) };
}

export class CartPage {
  readonly nav: NavBar;

  constructor(
    private readonly page: Page,
    private readonly consent: Consent = defaultConsent(page)
  ) {
    this.nav = new NavBar(page);
  }

  get proceedToCheckout(): Locator {
    return this.page
      .getByRole('button', { name: /proceed to checkout/i })
      .or(this.page.getByRole('link', { name: /proceed to checkout/i }))
      .or(this.page.getByText(/^proceed to checkout$/i));
  }

  async open(): Promise<void> {
    await this.nav.openCart();
    await this.consent.acceptIfVisible();
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
