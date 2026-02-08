import { test, expect } from '../../../../fixtures/pom/test-options';
import { HomePage } from '../../../../pages/automationexercise/home.page';
import { ProductsPage } from '../../../../pages/automationexercise/products.page';

test('should search products and show results', { tag: ['@sanity', '@functional'] }, async ({ page }) => {
  const home = new HomePage(page);
  const products = new ProductsPage(page);

  await test.step('GIVEN user opens home page', async () => {
    await home.goto();
    await home.expectLoaded();
  });

  await test.step('WHEN user searches for a product', async () => {
    await home.goToProducts();
    await products.search('Dress');
  });

  await test.step('THEN results should be visible', async () => {
    await expect(products.searchedProductsHeading).toBeVisible();
    await products.expectHasAnyDressResult();
  });
});
