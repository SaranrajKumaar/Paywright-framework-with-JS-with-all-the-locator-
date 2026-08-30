// @ts-check
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  timeout: 30 * 1000,

  expect: {
    timeout: 5000,
  },

  reporter: 'html',

  use: {
    headless: false,

    actionTimeout: 10 * 1000,

    navigationTimeout: 30 * 1000,

    screenshot: 'on',

    trace: 'on',

    video: 'off',

    // Browser viewport
    viewport: {
      width: 1920,
      height: 1080,
    },

    // Maximize Chrome window
    launchOptions: {
      args: [
        '--start-maximized',
        '--window-position=0,0',
        '--window-size=1920,1080',
      ],
    },
  },

  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
      },
    },
    
    // Uncomment if you need Firefox
    /*
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
    */

    // Uncomment if you need WebKit
    /*
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },
    */
  ],
});