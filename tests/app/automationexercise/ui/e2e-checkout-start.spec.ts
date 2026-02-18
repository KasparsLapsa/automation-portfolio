import { test, expect } from '../../../../fixtures/pom/test-options';
import { createAeUser } from '../../../../test-data/ui/user.factory';

test.describe('automationExercise - E2E', () => {
    test(
        'should signup, add product to cart, and reach checkout',
        { tag: ['@e2e', '@smoke'] },
        async ({ ae, page }) => {
            const user = createAeUser();

            await test.step('GIVEN a new user signs up and is logged in', async () => {
                await ae.auth.open();
                await ae.auth.signup(user);
            });

            await test.step('WHEN user adds a product to cart', async () => {
                await ae.productDetails.gotoById(1);
                await ae.productDetails.expectProductNameVisible('Blue Top');
                await ae.productDetails.addToCartAndContinueShopping();
            });

            await test.step('AND user proceeds to checkout', async () => {
                await ae.cart.open();
                await ae.cart.expectProductVisible('Blue Top');
                await ae.cart.proceed();
            });

            await test.step('THEN checkout page should be visible', async () => {
                await ae.checkout.assertCheckoutReady();
                await expect(page).toHaveURL(/\/checkout/i);
            });
        }
    );
});
