import { mkdirSync } from 'node:fs';
import { test as setup, expect } from '@playwright/test';
import { createAeUser } from '../../../../test-data/ui/user.factory';
import { AuthPage } from '../../../../pages/automationexercise/auth.page';

const storageStatePath = 'storage/.auth/automationexercise.json';

setup('automationExercise - auth setup', async ({ page }) => {
  mkdirSync('storage/.auth', { recursive: true });

  const user = createAeUser();
  const auth = new AuthPage(page);

  await auth.open();
  await expect(auth.signupButton).toBeVisible(); // assert the form, not URL

  await auth.signup(user);
  await page.context().storageState({ path: storageStatePath });
});
