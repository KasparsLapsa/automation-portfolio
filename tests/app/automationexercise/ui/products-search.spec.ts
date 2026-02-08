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

        const searchInput = page.getByPlaceholder(/search product/i);
        await searchInput.fill('Dress');

        await searchInput.press('Enter');

      });

      await test.step('THEN results should be visible', async () => {
        await expect(
          page.getByRole('heading', { name: /searched products/i })
        ).toBeVisible();

      });
    }
  );
});
