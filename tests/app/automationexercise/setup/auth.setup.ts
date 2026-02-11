import { mkdirSync } from 'node:fs';
import { test, expect } from '@playwright/test';
import { createAeUser } from '../../../../test-data/ui/user.factory';
import { AuthPage } from '../../../../pages/automationexercise/auth.page';

const storageStatePath = 'storage/.auth/automationexercise.json';

test.describe('automationExercise - setup', () => {
    test('should create logged-in storage state', async ({ page }) => {
        await test.step('GIVEN auth storage folder exists', async () => {
            mkdirSync('storage/.auth', { recursive: true });
        });

        const user = createAeUser();
        const auth = new AuthPage(page);

        await test.step('WHEN user opens signup/login page', async () => {
            await auth.open();
            await expect(auth.signupButton).toBeVisible();
        });

        await test.step('AND user signs up', async () => {
            await auth.signup(user);
        });

        await test.step('THEN storage state is saved', async () => {
            await page.context().storageState({ path: storageStatePath });
            expect(storageStatePath).toBeTruthy();
        });
    });
});
