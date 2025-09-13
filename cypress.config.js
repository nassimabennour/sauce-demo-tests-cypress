// cypress.config.js
const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    specPattern: 'cypress/e2e/**/*.feature',
    supportFile: 'cypress/support/e2e.js',
    video: true,
    chromeWebSecurity: false,
    retries: { runMode: 1, openMode: 0 },
    defaultCommandTimeout: 8000,
    pageLoadTimeout: 60000,
    reporter: 'junit',
    reporterOptions: { mochaFile: 'results/junit-[hash].xml', toConsole: true },

    setupNodeEvents: async (on, config) => {
      await addCucumberPreprocessorPlugin(on, config);
      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );
      return config;
    },
  },
});
