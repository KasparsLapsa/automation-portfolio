import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import { StorageStatePaths } from './enums/app/app';

const environment = process.env.ENVIRONMENT ?? 'dev';
dotenv.config({ path: `./env/.env.${environment}` });

const AE_STORAGE_STATE = 'storage/.auth/automationexercise.json';

export default defineConfig({
  testDir: './tests',

  // Global ignore: keep non-portfolio scaffold areas out of runs
  testIgnore: [/app\/auth\.setup\.ts/, /app\/api\//, /app\/e2e\//, /app\/functional\//],

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: process.env.CI
    ? [['list'], ['html', { open: 'never' }], ['junit', { outputFile: 'test-results/junit.xml' }]]
    : [['html', { open: 'never' }]],

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
    {
      name: 'setup',
      testMatch: [/app\/automationexercise\/setup\/.*\.setup\.ts/],
      use: { ...devices['Desktop Chrome'], viewport: { width: 1920, height: 1080 } },
    },

    {
      name: 'ae-guest',
      testMatch: [/app\/automationexercise\/.*\.spec\.ts/],
      testIgnore: [
        /app\/automationexercise\/auth\/.*\.spec\.ts/,
        /app\/automationexercise\/setup\/.*\.setup\.ts/,
      ],
      use: { ...devices['Desktop Chrome'], viewport: { width: 1920, height: 1080 } },
    },

    {
      name: 'ae-auth',
      testMatch: [/app\/automationexercise\/auth\/.*\.spec\.ts/],
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
        storageState: AE_STORAGE_STATE,
      },
    },

    {
      name: 'public-api',
      testMatch: [/expandtesting\/api\/.*\.spec\.ts/],
      use: {},
    },

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
