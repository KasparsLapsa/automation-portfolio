import { expect, test } from '../../../../fixtures/pom/test-options';
import { acceptAeConsentIfPresent } from '../../../../helpers/util/consent';
test.describe('AutomationExercise - Cart', () => {
  test(
    'should add a product to cart',
    { tag: ['@smoke', '@e2e'] },
    async ({ page }) => {
      await test.step('GIVEN user is on Products page', async () => {
        await page.goto(`${process.env.APP_URL!}/products`);
        await acceptAeConsentIfPresent(page);
        await expect(page).toHaveURL(/\/products/i);
      });

      await test.step('WHEN user adds first product to cart', async () => {
        await page.locator('.productinfo a:has-text("Add to cart")').first().click();

        // Modal typically appears
        await expect(page.getByRole('button', { name: /Continue Shopping/i })).toBeVisible();
        await page.getByRole('button', { name: /Continue Shopping/i }).click();
      });

      await test.step('AND user opens the Cart', async () => {
        await page.getByRole('link', { name: /Cart/i }).click();
        await expect(page).toHaveURL(/\/view_cart/i);
      });

      await test.step('THEN cart should contain at least one item', async () => {
        await expect(page.locator('#cart_info_table tbody tr').first()).toBeVisible();
      });
    }
  );
});
