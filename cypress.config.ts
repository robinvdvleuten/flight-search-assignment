import { defineConfig } from "cypress";

export default defineConfig({
  experimentalFetchPolyfill: true,
  fixturesFolder: false,

  e2e: {
    baseUrl: "http://localhost:5173",

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
