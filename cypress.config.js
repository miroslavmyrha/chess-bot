const { defineConfig } = require("cypress")

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.chess.com',
    defaultCommandTimeout: 100000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})
