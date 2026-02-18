import { test, expect } from '../../../../fixtures/pom/test-options';

test.describe('automationExercise - Products', () => {
    test(
        'should search products and show results',
        { tag: ['@smoke', '@functional'] },
        async ({ ae, page, consent }) => {
            await test.step('GIVEN user is on products page', async () => {
                await ae.home.goto();
                await ae.home.productsLink.click();
                await consent.acceptIfVisible();
                await expect(page).toHaveURL(/\/products/i);
            });

            await test.step('WHEN user searches for a product', async () => {
                const searchInput = page.getByPlaceholder(/search product/i);
                await searchInput.fill('Dress');

                await page.getByRole('button', { name: /search/i }).click();
            });

            await test.step('THEN results should be shown', async () => {
                await expect(
                    page.getByRole('heading', { name: /searched products/i })
                ).toBeVisible();

                await expect(page.getByText(/dress/i)).toBeVisible();
            });
        }
    );
});
