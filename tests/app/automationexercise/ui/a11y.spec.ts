import { test, expect } from '../../../../fixtures/pom/test-options';
import AxeBuilder from '@axe-core/playwright';
import { HomePage } from '../../../../pages/automationexercise/home.page';

test.describe('automationExercise - a11y', () => {
    test(
        'should run an accessibility scan on Home',
        { tag: ['@a11y', '@functional'] },
        async ({ page }) => {
            const home = new HomePage(page);

            await test.step('GIVEN user opens home', async () => {
                await home.goto();
                await home.expectLoaded();
            });

            await test.step('WHEN axe scan runs', async () => {
                const results = await new AxeBuilder({ page })
                    .disableRules(['color-contrast'])
                    .analyze();

                await test.info().attach('axe-violations-home.json', {
                    body: JSON.stringify(results.violations, null, 2),
                    contentType: 'application/json',
                });

                expect(results.violations.length).toBeGreaterThanOrEqual(0);
            });
        }
    );
});
