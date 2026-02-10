import { mkdirSync } from 'node:fs';
import { test, expect } from '../../../../fixtures/pom/test-options';
import { createAeUser } from '../../../../test-data/ui/user.factory';
import { AuthPage } from '../../../../pages/automationexercise/auth.page';

const storageStatePath = 'storage/.auth/automationexercise.json';

test.describe('automationExercise - auth setup', () => {
    test('should create logged-in storage state', async ({ page }) => {
        mkdirSync('storage/.auth', { recursive: true });

        const user = createAeUser();
        const auth = new AuthPage(page);

        await test.step('GIVEN user opens signup/login page', async () => {
            await auth.open();
            await expect(page).toHaveURL(/\/login/i);
        });

        await test.step('WHEN user signs up', async () => {
            await auth.signup(user);
        });

        await test.step('THEN storage state is saved', async () => {
            await page.context().storageState({ path: storageStatePath });
            expect(storageStatePath).toBeTruthy();
        });
    });
});
