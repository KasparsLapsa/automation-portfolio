import { expect, test } from '../../../../fixtures/pom/test-options';
import { acceptAeConsentIfPresent } from '../../../../helpers/util/consent';

test.describe('AutomationExercise - smoke', () => {
  test(
    'should load home page',
    { tag: ['@smoke', '@functional'] },
    async ({ page }) => {
      await test.step('GIVEN the user opens AutomationExercise', async () => {
        await page.goto(process.env.APP_URL!);
        await acceptAeConsentIfPresent(page);
      });

      await test.step('THEN the home page title should be correct', async () => {
        await expect(page).toHaveTitle(/Automation Exercise/i);
      });

      await test.step('AND key home content should be visible', async () => {
        // stable-ish assertion: the header/logo text
        await expect(page.getByRole('link', { name: /Home/i })).toBeVisible();
      });
    }
  );
});
