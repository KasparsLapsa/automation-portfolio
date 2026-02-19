import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const adNetworkRegex =
    /googlesyndication|doubleclick|googleads|adservice|fundingchoices|googletagmanager/i;

test.describe('automationExercise - a11y', () => {
    test('home page should not have critical a11y violations', async ({
        page,
        context,
    }) => {
        await test.step('Block ad/analytics iframes (prevents axe context errors)', async () => {
            await context.route(adNetworkRegex, (route) => route.abort());
        });

        await test.step('Open Home page and wait for main content', async () => {
            await page.goto('/', { waitUntil: 'domcontentloaded' });
            await expect(
                page.getByRole('heading', { name: /automationexercise/i })
            ).toBeVisible();
        });

        await test.step('Run axe scan (exclude iframes)', async () => {
            const results = await new AxeBuilder({ page })
                .exclude('iframe')
                .analyze();

            const critical = results.violations.filter(
                (v) => v.impact === 'critical'
            );
            const remainingCritical = critical
                .map((v) => ({
                    ...v,
                    nodes: v.nodes.filter(
                        (n) =>
                            !(
                                v.id === 'button-name' &&
                                n.target?.includes('#subscribe')
                            )
                    ),
                }))
                .filter((v) => v.nodes.length > 0);

            expect(
                remainingCritical,
                JSON.stringify(remainingCritical, null, 2)
            ).toEqual([]);
        });
    });
});
