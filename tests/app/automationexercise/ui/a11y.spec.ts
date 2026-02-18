import { test, expect } from '../../../../fixtures/pom/test-options';
import AxeBuilder from '@axe-core/playwright';

test.describe('automationExercise - a11y', () => {
    test('home page should not have critical a11y violations', async ({
        ae,
        page,
    }) => {
        await ae.home.goto();

        const results = await new AxeBuilder({ page }).analyze();
        const critical = results.violations.filter(
            (v) => v.impact === 'critical'
        );

        expect(critical, JSON.stringify(critical, null, 2)).toEqual([]);
    });
});
