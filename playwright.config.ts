import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import { StorageStatePaths } from './enums/app/app';

/**
 * Loads env vars from env/.env.<ENVIRONMENT>
 * Default: env/.env.dev
 */
const environment = process.env.ENVIRONMENT ?? 'dev';
dotenv.config({ path: `./env/.env.${environment}` });

// Storage state produced by the AutomationExercise setup project
const AE_STORAGE_STATE = 'storage/.auth/automationexercise.json';

export default defineConfig({
    testDir: './tests',

    // Ignore legacy example suites; keep portfolio specs enabled
    testIgnore: [
        /app\/auth\.setup\.ts/,
        /app\/api\//,
        /app\/e2e\//,
        /app\/functional\//,
    ],

    // Allow tests to run in parallel locally; CI uses 1 worker for stability
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,

    // HTML report locally; CI adds list + JUnit (useful for pipelines)
    reporter: process.env.CI
        ? [
              ['list'],
              ['html', { open: 'never' }],
              ['junit', { outputFile: 'test-results/junit.xml' }],
          ]
        : [['html', { open: 'never' }]],

    // Defaults applied to all projects unless overridden
    use: {
        testIdAttribute: 'data-qa',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        actionTimeout: 10_000,
        navigationTimeout: 30_000,
    },

    timeout: 60_000,
    expect: { timeout: 10_000 },

    projects: [
        // Creates a logged-in storageState once per run (used by UI project)
        {
            name: 'setup',
            testMatch: [/app\/automationexercise\/setup\/.*\.setup\.ts/],
            use: {
                ...devices['Desktop Chrome'],
                viewport: { width: 1920, height: 1080 },
            },
        },

        // UI portfolio tests (AutomationExercise) using the storageState created by setup
        {
            name: 'public-chromium',
            testMatch: [/app\/automationexercise\/.*\.spec\.ts/],
            dependencies: ['setup'],
            use: {
                ...devices['Desktop Chrome'],
                viewport: { width: 1920, height: 1080 },
                storageState: AE_STORAGE_STATE,
            },
        },

        // API portfolio tests (ExpandTesting)
        {
            name: 'public-api',
            testMatch: [/expandtesting\/api\/.*\.spec\.ts/],
            use: {},
        },

        // Optional project kept for future expansion (authenticated app tests)
        {
            name: 'chromium',
            testMatch: [/app\/(api|e2e|functional)\/.*\.spec\.ts/],
            dependencies: ['setup'],
            use: {
                ...devices['Desktop Chrome'],
                viewport: { width: 1920, height: 1080 },
                storageState: StorageStatePaths.APP,
            },
        },
    ],
});
