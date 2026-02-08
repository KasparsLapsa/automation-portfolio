import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import { StorageStatePaths } from './enums/app/app';

/**
 * Load environment variables from env/.env.<environment>
 * Defaults to env/.env.dev if ENVIRONMENT is not set.
 *
 * Usage:
 *   ENVIRONMENT=staging npx playwright test
 */
const environment = process.env.ENVIRONMENT ?? 'dev';
const environmentPath = `./env/.env.${environment}`;
dotenv.config({ path: environmentPath });

export default defineConfig({
    testDir: './tests',

    /**
     * Ignore scaffold example suites that require a real app + auth setup.
     * Keep portfolio tests under tests/app/automationexercise/** enabled.
     */
    testIgnore: [
        /app\/auth\.setup\.ts/,
        /app\/api\//,
        /app\/e2e\//,
        /app\/functional\//,
    ],

    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,

    reporter: process.env.CI
        ? [
              ['list'],
              ['html', { open: 'never' }],
              ['junit', { outputFile: 'test-results/junit.xml' }],
          ]
        : [['html', { open: 'never' }]],

    use: {
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        actionTimeout: 10_000,
        navigationTimeout: 30_000,
    },

    timeout: 60_000,
    expect: { timeout: 10_000 },

    projects: [
        /**
         * Portfolio project: public sites (no auth storage state).
         * Runs your AutomationExercise tests.
         */
        {
            name: 'public-chromium',
            testMatch: [/app\/automationexercise\/.*\.spec\.ts/],
            use: {
                ...devices['Desktop Chrome'],
                viewport: { width: 1920, height: 1080 },
            },
        },

        {
            name: 'public-api',
            testMatch: [/expandtesting\/api\/.*\.spec\.ts/],
            use: {},
        },

        /**
         * Scaffold auth setup project (kept for later use).
         * Will run only *.setup.ts files (currently ignored by testIgnore anyway).
         */
        {
            name: 'setup',
            testMatch: [/.*\.setup\.ts/],
            use: {
                ...devices['Desktop Chrome'],
                viewport: { width: 1920, height: 1080 },
            },
        },

        /**
         * Scaffold "authenticated" project (kept for later use).
         */
        {
            name: 'chromium',
            testMatch: [/app\/(api|e2e|functional)\/.*\.spec\.ts/],
            use: {
                ...devices['Desktop Chrome'],
                storageState: StorageStatePaths.APP,
                viewport: { width: 1920, height: 1080 },
            },
            dependencies: ['setup'],
        },
    ],
});
