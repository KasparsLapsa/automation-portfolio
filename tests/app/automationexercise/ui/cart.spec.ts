import { expect, test } from '../../../../fixtures/pom/test-options';
import { acceptConsentIfVisible } from '../../../../helpers/util/consent';
import { ProductDetailsPage } from '../../../../pages/automationexercise/product-details.page';

test.describe('automationExercise - Cart', () => {
    test(
        'should add a product to cart',
        { tag: ['@smoke', '@e2e'] },
        async ({ page }) => {
            const productDetails = new ProductDetailsPage(page);

            await test.step('GIVEN user is on Products page', async () => {
                await page.goto(`${process.env.APP_URL!}/products`);
                await acceptConsentIfVisible(page);
                await expect(page).toHaveURL(/\/products/i);
            });

            await test.step('WHEN user opens a product and adds it to cart', async () => {
                await productDetails.gotoById(1);
                await productDetails.expectProductNameVisible('Blue Top');
                await productDetails.addToCartAndContinueShopping();
            });

            await test.step('THEN cart contains the product', async () => {
                await page.getByRole('link', { name: /cart/i }).click();
                await expect(page).toHaveURL(/\/view_cart/i);
                await expect(
                    page.getByText('Blue Top', { exact: true })
                ).toBeVisible();
            });
        }
    );
});
