// @ts-check
import { defineConfig, devices } from '@playwright/test';


/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
 import dotenv from 'dotenv';
 import path from 'path';
 dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  retries : 0,
  timeout: 450000,
  expect: { timeout: 10_000 },

  use: { 
        browserName: 'chromium',
        headless : false,
        actionTimeout: 20000,
        trace: 'on',
  },
  
  reporter: 
  [
    ['html'],
    ['tamash-playwright-dashboard'],
    //['line'], // Optional: keeps console output clean
   // ['allure-playwright', { outputFolder: 'allure-results' }] //npx allure serve allure-results
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  
// projects: [
//     // 1. Define the setup project
//     // {
//     //   name: 'setup',
//     //   testMatch: /.*\.setup\.js/,
//     // },
//     // 2. Configure your main testing browser projects
//     {
//       name: 'chromium',
//       use: { 
//         browserName: 'chromium',
//         headless : false,
//         actionTimeout: 20000,
//         trace: 'on',

//         // Consume the saved storage state in your tests
//        // storageState: 'user.json',
//       },
//       //dependencies: ['setup'], // Forces 'setup' to run first!
//     },
  //],

  
});

