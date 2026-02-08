import { expect, test } from '../../../../fixtures/pom/test-options';
import { acceptConsentIfVisible } from '../../../../helpers/util/consent';
import { clickIfVisible } from '../../../../helpers/util/ui';

test.describe('automationExercise - Cart', () => {
    test(
        'should add a product to cart',
        { tag: ['@smoke', '@e2e'] },
        async ({ page }) => {
            await test.step('GIVEN user is on Products page', async () => {
                await page.goto(`${process.env.APP_URL!}/products`);
                await acceptConsentIfVisible(page);
                await expect(page).toHaveURL(/\/products/i);
            });

            await test.step('WHEN user opens a product and adds it to cart', async () => {
                // Open Blue Top product details directly (stable)
                await page.goto(`${process.env.APP_URL!}/product_details/1`);
                await acceptConsentIfVisible(page);

                // Make sure we really opened the right product
                await expect(
                    page.getByText('Blue Top', { exact: true })
                ).toBeVisible();

                // Add to cart (on details page this is typically unique)
                await page
                    .getByRole('button', { name: /add to cart/i })
                    .click();

                // Continue shopping modal (if it appears)
                await clickIfVisible(
                    page.getByRole('button', { name: /continue shopping/i })
                );
            });
        }
    );
});
