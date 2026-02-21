import { test as base, type Page } from '@playwright/test';
import { acceptConsentIfVisible } from '../../helpers/util/consent';
import type { Consent } from '../../src/types';

import { AuthPage } from '../../pages/automationexercise/auth.page';
import { CartPage } from '../../pages/automationexercise/cart.page';
import { CheckoutPage } from '../../pages/automationexercise/checkout.page';
import { HomePage } from '../../pages/automationexercise/home.page';
import { ProductDetailsPage } from '../../pages/automationexercise/product-details.page';
import { ProductsPage } from '../../pages/automationexercise/products.page';

function defaultConsent(page: Page): Consent {
    return { acceptIfVisible: async () => acceptConsentIfVisible(page) };
}

export type AePages = {
    home: HomePage;
    products: ProductsPage;
    auth: AuthPage;
    productDetails: ProductDetailsPage;
    cart: CartPage;
    checkout: CheckoutPage;
};

export type FrameworkFixtures = {
    consent: Consent;
    ae: AePages;
    resetStorageState: () => Promise<void>;
};

export const test = base.extend<FrameworkFixtures>({
    consent: async ({ page }, use) => {
        await use(defaultConsent(page));
    },

    ae: async ({ page, consent }, use) => {
        await use({
            home: new HomePage(page, consent),
            products: new ProductsPage(page, consent),
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
