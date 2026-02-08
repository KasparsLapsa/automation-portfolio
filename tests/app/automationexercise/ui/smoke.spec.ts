import { test, expect } from '../../../../fixtures/pom/test-options';
import { HomePage } from '../../../../pages/automationexercise/home.page';

test.describe('automationExercise - smoke', () => {
  test(
    'should load home page',
    { tag: ['@smoke', '@functional'] },
    async ({ page }) => {
      const home = new HomePage(page);

      await test.step('GIVEN the user opens AutomationExercise', async () => {
        await home.goto();
      });

      await test.step('THEN the home page title should be correct', async () => {
        await home.expectLoaded();
      });

      await test.step('AND key home content should be visible', async () => {
        await expect(home.homeLink).toBeVisible();
      });
    }
  );
});
