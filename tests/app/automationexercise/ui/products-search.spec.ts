import { expect, test } from '../../../../fixtures/pom/test-options';
import { acceptAeConsentIfPresent } from '../../../../helpers/util/consent';
test.describe('AutomationExercise - Products', () => {
  test(
    'should search products and show results',
    { tag: ['@sanity', '@functional'] },
    async ({ page }) => {
      await test.step('GIVEN user opens home page', async () => {
        await page.goto(process.env.APP_URL!);
         await acceptAeConsentIfPresent(page);
        await expect(page).toHaveTitle(/Automation Exercise/i);
      });

      await test.step('WHEN user navigates to Products', async () => {
        await page.getByRole('link', { name: /Products/i }).click();
        await expect(page).toHaveURL(/\/products/i);
      });

      await test.step('AND user searches for "Dress"', async () => {
        await page.locator('#search_product').fill('Dress');
        await page.locator('#submit_search').click();
      });

      await test.step('THEN searched products section is visible', async () => {
        await expect(page.getByText(/Searched Products/i)).toBeVisible();
        await expect(page.locator('.productinfo').first()).toBeVisible();
      });
    }
  );
});
