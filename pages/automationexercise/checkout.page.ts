import { expect, type Locator, type Page } from '@playwright/test';
import { acceptConsentIfVisible } from '../../helpers/util/consent';
import type { Consent } from '../../src/types';

function defaultConsent(page: Page): Consent {
  return { acceptIfVisible: async () => acceptConsentIfVisible(page) };
}

export class CheckoutPage {
  constructor(
    private readonly page: Page,
    private readonly consent: Consent = defaultConsent(page)
  ) {}

  get addressDetailsHeading(): Locator {
    return this.page.getByText(/address details/i);
  }

  get reviewOrderHeading(): Locator {
    return this.page.getByText(/review your order/i);
  }

  async assertCheckoutReady(): Promise<void> {
    await this.consent.acceptIfVisible();
    await expect(this.page).toHaveURL(/\/checkout/i);
    await expect(this.addressDetailsHeading).toBeVisible();
    await expect(this.reviewOrderHeading).toBeVisible();
  }

  // Backwards-compat
  async expectLoaded(): Promise<void> {
    await this.assertCheckoutReady();
  }
}
