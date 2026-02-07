/**
 * auth.setup.ts
 * Playwright setup script to generate storage states for authentication.
 *
 * This runs before the main test suite to:
 * 1. Authenticate via API and store access tokens
 * 2. Generate browser storage state with session cookies
 */

import { test } from '../../fixtures/pom/test-options';
import {
    createAppStorageState,
    setUserAccessToken,
} from '../../helpers/app/createStorageState';

test('setup authentication - API token', async ({ apiRequest }) => {
    await setUserAccessToken(apiRequest);
});

test('setup authentication - browser storage state', async () => {
    await createAppStorageState();
});
