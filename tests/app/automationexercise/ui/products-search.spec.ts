import { test, expect } from '@playwright/test';

const adNetworkRegex =
    /googlesyndication|doubleclick|googleads|adservice|fundingchoices|googletagmanager/i;

test.describe('automationExercise - products search', () => {
    test('should show "Searched Products" after searching for Dress', async ({
        page,
        context,
    }) => {
        await test.step('Block ad/analytics requests (stability)', async () => {
            await context.route(adNetworkRegex, (route) => route.abort());
        });

        await test.step('Open Products page', async () => {
            await page.goto('/products', { waitUntil: 'domcontentloaded' });
            await expect(
                page.getByRole('heading', { name: /all products/i })
            ).toBeVisible();
        });

        await test.step('Search for "Dress"', async () => {
            const searchInput = page.getByPlaceholder(/search product/i);
            await expect(searchInput).toBeVisible();

            await searchInput.fill('Dress');
            // Prefer Enter instead of clicking #submit_search (avoids raw locator + a11y-name issues)
            await searchInput.press('Enter');

            await expect(page).toHaveURL(/\/products\?search=Dress/i);
            await expect(
                page.getByRole('heading', { name: /searched products/i })
            ).toBeVisible();
        });

        await test.step('Verify at least one visible result contains "Dress"', async () => {
            // "View Product" links are accessible and present on product cards
            const viewProductLinks = page.getByRole('link', {
                name: /view product/i,
            });

            const count = await viewProductLinks.count();
            expect(count).toBeGreaterThan(0);

            // Check card text around the link in the browser context (no nth/first needed)
            const hasDress = await viewProductLinks.evaluateAll((links) => {
                const re = /dress/i;

                return links.some((a) => {
                    // Try a few common ancestor patterns (AutomationExercise layout)
                    const card =
                        a.closest('.product-image-wrapper') ||
                        a.closest('.single-products') ||
                        a.closest('.productinfo') ||
                        a.parentElement;

                    return re.test(card?.textContent ?? '');
                });
            });

            expect(hasDress).toBe(true);
        });
    });
});
