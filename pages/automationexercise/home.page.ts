import { expect, type Locator, type Page } from '@playwright/test';
import { acceptConsentIfVisible } from '../../helpers/util/consent';
import type { Consent } from '../../src/types';

function defaultConsent(page: Page): Consent {
  return { acceptIfVisible: async () => acceptConsentIfVisible(page) };
}

export class HomePage {
  constructor(
    private readonly page: Page,
    private readonly consent: Consent = defaultConsent(page)
  ) {}

  // Header (scope so we don't match footer)
  get header(): Locator {
    return this.page.getByRole('banner');
  }

  // Top nav
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

  // Unique home content (stable)
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

  // Backwards-compat (so existing tests don't break immediately)
  async expectLoaded(): Promise<void> {
    await this.assertHomeReady();
  }

  async goHome(): Promise<void> {
    await this.homeLink.click();
    await this.consent.acceptIfVisible();
    await this.assertHomeReady();
  }

  async goToProducts(): Promise<void> {
    await this.productsLink.click();
    await this.consent.acceptIfVisible();
    await expect(this.page).toHaveURL(/\/products/i);
  }

  async goToCart(): Promise<void> {
    await this.cartLink.click();
    await this.consent.acceptIfVisible();
    await expect(this.page).toHaveURL(/\/view_cart/i);
  }

  async goToSignupLogin(): Promise<void> {
    await this.signupLoginLink.click();
    await this.consent.acceptIfVisible();
    await expect(this.page).toHaveURL(/\/login/i);
  }

  async goToTestCases(): Promise<void> {
    await this.testCasesLink.click();
    await this.consent.acceptIfVisible();
    await expect(this.page).toHaveURL(/\/test_cases/i);
  }

  async goToApiTesting(): Promise<void> {
    await this.apiTestingLink.click();
    await this.consent.acceptIfVisible();
    await expect(this.page).toHaveURL(/\/api_list/i);
  }

  async goToContactUs(): Promise<void> {
    await this.contactUsLink.click();
    await this.consent.acceptIfVisible();
    await expect(this.page).toHaveURL(/\/contact_us/i);
  }
}
