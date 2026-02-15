import { defineConfig, devices } from '@playwright/test';
import type { ReporterDescription } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'node:path';

const environment = process.env.ENVIRONMENT ?? 'dev';
dotenv.config({ path: path.join(process.cwd(), `env/.env.${environment}`) });

const AE_STORAGE_STATE = 'storage/.auth/automationexercise.json';
const isCI = !!process.env.CI;

function buildReporter(): ReporterDescription[] {
  const html: ReporterDescription = [
    'html',
    { open: 'never', outputFolder: 'playwright-report' },
  ];

  const junit: ReporterDescription = [
    'junit',
    { outputFile: 'test-results/junit.xml' },
  ];

  const list: ReporterDescription = ['list'];

  const smart: ReporterDescription = [
    'playwright-smart-reporter',
    {
      outputFile: 'smart-report.html',
      historyFile: 'smart-history.json',
      maxHistoryRuns: 20,
      enableHistoryDrilldown: true,
    },
  ];

  const ciBase: ReporterDescription[] = [list, html, junit];

  if (process.env.RUN_SMART_REPORTER === '1') {
    return isCI ? [...ciBase, smart] : [html, smart];
  }

  return isCI ? ciBase : [html];
}

export default defineConfig({
  testDir: './tests',
  outputDir: 'test-results',

  reporter: buildReporter(),

  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,

  timeout: 60_000,
  expect: { timeout: 10_000 },

  use: {
    baseURL: process.env.APP_URL,
    testIdAttribute: 'data-qa',

    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    actionTimeout: 10_000,
    navigationTimeout: 30_000,

    locale: 'en-US',
    timezoneId: 'Europe/Riga',
  },

  projects: [
    {
      name: 'setup',
      testMatch: [/app\/automationexercise\/setup\/.*\.setup\.ts/],
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: 'ae-guest',
      testMatch: [/app\/automationexercise\/ui\/.*\.spec\.ts/],
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
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
  ],
});
