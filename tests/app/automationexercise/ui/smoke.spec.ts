import { test, expect } from '../../../../fixtures/pom/test-options';

test.describe('automationExercise - smoke', () => {
  test(
    'should load home page',
    { tag: ['@smoke', '@functional'] },
    async ({ ae }) => {
      await test.step('GIVEN the user opens AutomationExercise', async () => {
        await ae.home.goto();
      });

      await test.step('THEN the home page title should be correct', async () => {
        await ae.home.expectLoaded();
      });

      await test.step('AND key home content should be visible', async () => {
        await expect(ae.home.homeLink).toBeVisible();
      });
    }
  );
});
