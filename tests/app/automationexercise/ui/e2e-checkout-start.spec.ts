import { test, expect } from '../../../../fixtures/pom/test-options';
import { createAeUser } from '../../../../test-data/ui/user.factory';
import { AuthPage } from '../../../../pages/automationexercise/auth.page';
import { ProductDetailsPage } from '../../../../pages/automationexercise/product-details.page';
import { CartPage } from '../../../../pages/automationexercise/cart.page';
import { CheckoutPage } from '../../../../pages/automationexercise/checkout.page';

test.describe('automationExercise - E2E', () => {
    test(
        'should signup, add product to cart, and reach checkout',
        { tag: ['@e2e', '@smoke'] },
        async ({ page }) => {
            const user = createAeUser();

            const auth = new AuthPage(page);
            const productDetails = new ProductDetailsPage(page);
            const cart = new CartPage(page);
            const checkout = new CheckoutPage(page);

            await test.step('GIVEN a new user signs up and is logged in', async () => {
                await auth.open();
                await auth.signup(user);
            });

            await test.step('WHEN user adds a product to cart', async () => {
                await productDetails.gotoById(1);
                await productDetails.expectProductNameVisible('Blue Top');
                await productDetails.addToCartAndContinueShopping();
            });

            await test.step('AND user proceeds to checkout', async () => {
                await cart.open();
                await cart.expectProductVisible('Blue Top');
                await cart.proceed();
            });

            await test.step('THEN checkout page should be visible', async () => {
                await checkout.expectLoaded();
                await expect(page).toHaveURL(/\/checkout/i);
            });
        }
    );
});
