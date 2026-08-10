// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',

  timeout: 30 * 1000, //gobal level


  expect: {
    timeout: 5000
  },

  reporter: 'html',

  use: {
    //browser options 
    browserName: 'chromium',
    //firefox, webkit, chromium
    headless: false,
    actionTimeout: 10 * 1000,
    navigationTimeout: 30 * 1000,
    screenshot: 'on',
    trace: 'retain-on-failure',//on //off
    //window maximize 
    viewport: null,
    launchOptions: {
      args: ['--start-maximized'],
    },
    video:'off'

  },

});

module.exports = config;

