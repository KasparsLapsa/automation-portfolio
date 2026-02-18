import { expect, test } from '../../../../../fixtures/pom/test-options';

test.describe('automationExercise - Cart', () => {
    test(
        'should add a product to cart',
        { tag: ['@smoke', '@e2e'] },
        async ({ ae, page }) => {
            await test.step('GIVEN user is on Products page', async () => {
                await page.goto('/products');
                await expect(page).toHaveURL(/\/products/i);
            });

            await test.step('WHEN user opens a product and adds it to cart', async () => {
                await ae.productDetails.gotoById(1);
                await ae.productDetails.expectProductNameVisible('Blue Top');
                await ae.productDetails.addToCartAndContinueShopping();
            });

            await test.step('THEN cart contains the product', async () => {
                await ae.cart.open(); // avoids header click flake
                await expect(page).toHaveURL(/\/view_cart/i);
                await expect(
                    page.getByText('Blue Top', { exact: true })
                ).toBeVisible();
            });
        }
    );
});
