const { defineConfig } = require("cypress")
const Chess = require('chess.js').Chess

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.chess.com',
    stockFishUrl: 'https://stockfish.online/api/stockfish.php?fen=',
    defaultCommandTimeout: 200000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        parseAlgebraicToFEN(arrayOfMoves) {
          const chess = new Chess()
          for (const move of arrayOfMoves) {
            chess.move(move)
          }
          return chess.fen()
        },
      })
    },
  },
})
