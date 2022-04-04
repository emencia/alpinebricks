const { devices } = require('@playwright/test');/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  workers: 3,
  retries: 0,
  use: {
    baseURL: 'https://emencia.github.io/alpinebricks/',
    headless: false,
    viewport: { width: 1280, height: 720 },
    launchOptions: {
      slowMo: 1500,
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    // Test against mobile viewports.
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
};

module.exports = config;