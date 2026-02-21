import { test, expect } from '../../../../fixtures/pom/test-options';

const adNetworkRegex =
    /googlesyndication|doubleclick|googleads|adservice|fundingchoices|googletagmanager/i;

test.describe('automationExercise - products search', () => {
    test.beforeEach(async ({ context }) => {
        await context.route(adNetworkRegex, (route) => route.abort());
    });

    test(
        'should show "Searched Products" after searching for Dress',
        { tag: ['@smoke', '@functional'] },
        async ({ ae }) => {
            await test.step('Open Products page', async () => {
                await ae.products.goto();
            });

            await test.step('Search for "Dress"', async () => {
                await ae.products.search('Dress');
            });

            await test.step('Verify results section is shown', async () => {
                await expect(ae.products.searchedProductsHeading).toBeVisible();
            });

            await test.step('Verify at least one visible result contains "Dress"', async () => {
                await ae.products.assertHasAnyProductNameMatching(/dress/i);
            });
        }
    );
});
