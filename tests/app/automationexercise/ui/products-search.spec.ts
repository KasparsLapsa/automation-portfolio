import { expect, test } from '../../../../fixtures/pom/test-options';
import { acceptConsentIfVisible } from '../../../../helpers/util/consent';

test.describe('automationExercise - Products', () => {
    test(
        'should search products and show results',
        { tag: ['@sanity', '@functional'] },
        async ({ page }) => {
            await test.step('GIVEN user opens home page', async () => {
                await page.goto(process.env.APP_URL!);
                await acceptConsentIfVisible(page);
                await expect(page).toHaveTitle(/Automation Exercise/i);
            });

            await test.step('WHEN user searches for a product', async () => {
                await page.getByRole('link', { name: /products/i }).click();
                await acceptConsentIfVisible(page);

                await page.getByPlaceholder(/search product/i).fill('Dress');

                // This site uses an icon-only search button (accessible name is the icon)
                await page.getByRole('button', { name: // }).click();
            });

            await test.step('THEN results should be visible', async () => {
                await expect(
                    page.getByRole('heading', { name: /searched products/i })
                ).toBeVisible();

                // Optional sanity: at least one product result contains "Dress"
                // (keeps it simple + no raw locators)
                await expect(page.getByText(/dress/i)).not.toHaveCount(0);
            });
        }
    );
});
