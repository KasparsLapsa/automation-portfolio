import { test, expect } from '../../../../fixtures/pom/test-options';
import { createAeUser } from '../../../../test-data/ui/user.factory';
import fs from 'node:fs';
import path from 'node:path';

const STORAGE_STATE_PATH = path.join(
    process.cwd(),
    'storage/.auth/automationexercise.json'
);

test.describe('automationExercise - setup', () => {
    test('create authenticated storage state', async ({ ae, page }) => {
        const user = createAeUser();

        await ae.auth.open();
        await ae.auth.signup(user);

        // Assertion to satisfy lint rule and ensure we are really logged in.
        await expect(page.getByText(/logged in as/i)).toBeVisible();

        fs.mkdirSync(path.dirname(STORAGE_STATE_PATH), { recursive: true });
        await page.context().storageState({ path: STORAGE_STATE_PATH });
    });
});
