import { test as base } from '@playwright/test';
import { AppPage } from '../../pages/app/app.page';
import { acceptConsentIfVisible } from '../../helpers/util/consent';
import type { Consent } from '../../src/types';

import { HomePage } from '../../pages/automationexercise/home.page';
import { AuthPage } from '../../pages/automationexercise/auth.page';
import { ProductDetailsPage } from '../../pages/automationexercise/product-details.page';
import { CartPage } from '../../pages/automationexercise/cart.page';
import { CheckoutPage } from '../../pages/automationexercise/checkout.page';

export type AePages = {
    home: HomePage;
    auth: AuthPage;
    productDetails: ProductDetailsPage;
    cart: CartPage;
    checkout: CheckoutPage;
};

/**
 * Framework fixtures for page objects.
 * Add new page object types here as you create them.
 */
export type FrameworkFixtures = {
    /** Consent handler fixture */
    consent: Consent;

    /** Main application page object */
    appPage: AppPage;

    /** AutomationExercise POM bundle */
    ae: AePages;

    resetStorageState: () => Promise<void>;
};

export const test = base.extend<FrameworkFixtures>({
    consent: async ({ page }, use) => {
        await use({
            acceptIfVisible: async () => acceptConsentIfVisible(page),
        });
    },

    appPage: async ({ page }, use) => {
        await use(new AppPage(page));
    },

    ae: async ({ page, consent }, use) => {
        await use({
            home: new HomePage(page, consent),
            auth: new AuthPage(page, consent),
            productDetails: new ProductDetailsPage(page, consent),
            cart: new CartPage(page, consent),
            checkout: new CheckoutPage(page, consent),
        });
    },
    resetStorageState: async ({ context }, use) => {
        await use(async () => {
            await context.clearCookies();
            await context.clearPermissions();
        });
    },
});
