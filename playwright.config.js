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
export default defineConfig({
  testDir: './tests',
  retries : 1,
  timeout: 45000,
  
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',
    actionTimeout: 10000,
    browserName : 'chromium',
    headless : false,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',
  },

  expect: {
    toHaveScreenshot: {
      maxDiffPixels: 100, 
      maxDiffPixelRatio: 0.1,    // Allow up to 100 mismatched pixels
      threshold: 0.2,         // Sensitivity configuration (0 to 1)
      animations: 'disabled', // Ensure animations are frozen
    },
  },

  
});

