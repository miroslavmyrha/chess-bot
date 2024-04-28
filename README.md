
# Chess-bot

**Chess-bot** is an automated application designed for demonstration and educational purposes on [chess.com](https://www.chess.com), the most popular chess website and mobile application. 

**Please refrain from using this bot for cheating purposes.**

![ezgif com-video-to-gif](https://github.com/miroslavkadidlo/chess-bot/assets/16743203/4a716141-36a5-4dc2-91bf-1dc44cef590f)

## Introduction

This bot leverages several technologies and resources to function effectively:

- **[chess.com](https://www.chess.com):** The main platform where the bot operates.
- **[stockfish.online](https://stockfish.online):** Utilizes Stockfish, the most powerful chess engine, to evaluate the best moves considering multiple depths.
- **[cypress.io](https://www.cypress.io):** A leading JavaScript/TypeScript testing framework used for writing automated tests.
- **[chess.js](https://npmjs.com/package/chess.js):** A handy npm package employed for converting algebraic notation to FEN.

## How it Works?

### 1. Game Initialization

The bot begins by setting up the visual field of the game:

```javascript
cy.viewport(1000, 660)
```

Custom settings are managed within the `/fixtures` folder, which includes:

- `languageMutations.json`
- `playerLevel.json`
- `stockFishDepth.json`
- `numOfGameplayMoves.json`
- `firstMove.json`

### 2. Making the First Move

The first move depends on the color assigned to the bot:

```javascript
cy.getMyPlayerColor()
```

- **White:** Opens with King's Pawn Opening - `e4`.
- **Black:** Uses a defensive move - `kc6`.

These moves are configurable in the fixture files.

### 3. Monitoring Opponent's Moves

The bot waits for each opponent's turn using a loop:

```javascript
cy.get('[data-ply="x"]').should('exist')
```

### 4. Scanning and Evaluating Moves

All moves from chess.com are scanned:

```javascript
cy.scanMovesFromChessMoveList()
```

This populates an array with all the moves, which is then evaluated to determine the best move using Stockfish:

```javascript
cy.getBestMove(listOfMoves)
```

### 5. Executing Moves

The bot executes moves using:

```javascript
cy.move()
```

This function calculates the necessary board coordinates for the move.

## Installation

Clone the repository and set up the project:

```bash
git clone https://github.com/miroslavmyrha/chess-bot.git
cd chess-bot
npm install
```

To run the bot:

```bash
npm run cypress:open
```

Select `playChess.cy.js` in the Cypress UI to start the bot.

## Contributing

Contributions are welcome! For major changes, please open an issue first to discuss what you'd like to change. Ensure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
