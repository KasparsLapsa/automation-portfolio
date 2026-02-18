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

// Enforce APP_URL only when UI projects are involved.
// If user runs only `--project=public-api`, APP_URL is not required.
function requiresAppUrl(argv: string[]): boolean {
    const uiProjects = new Set(['setup', 'ae-guest', 'ae-auth']);
    const projectArgs: string[] = [];

    for (let i = 0; i < argv.length; i += 1) {
        const a = argv[i];
        if (a === '--project' && argv[i + 1]) projectArgs.push(argv[i + 1]);
        if (a.startsWith('--project=')) projectArgs.push(a.split('=')[1] ?? '');
    }

    // If no project specified => all projects run => UI requires APP_URL
    if (projectArgs.length === 0) return true;

    return projectArgs.some((p) => uiProjects.has(p));
}

const baseURL = process.env.APP_URL;

if (requiresAppUrl(process.argv) && !baseURL) {
    throw new Error(
        'APP_URL is not set. UI projects (setup/ae-guest/ae-auth) require APP_URL.'
    );
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
        baseURL: baseURL, // may be undefined for API-only runs
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
