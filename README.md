# chess-bot

chess bot on chess.com

The goal of this project is to create a chess bot to demonstrate that it is feasible.

**Please don't cheat!** - It is just for demo.

![ezgif com-video-to-gif](https://github.com/miroslavkadidlo/chess-bot/assets/16743203/4a716141-36a5-4dc2-91bf-1dc44cef590f)

## Introduction

**Used technologies and pages:**

- [chess.com](https://www.chess.com/) is the most popular chess website and mobile application for playing chess.
- [stockfish.online](https://stockfish.online/) - stockfish is the most popular and powerfull chess engine which can evaluate best move with depth of moves.
- [cypress.io](https://cypress.io) is most popular JS/TS test framework for writing automated tests.

## How it works?

### 1. First of all, it need to start the game.

Fixed wiewport sets to: cy.viewport(1000, 660)

There are also several settings available to change in /fixtures folder as:

- langageMutations.json
- playerLevel.json
- stockFishDepth.json

### 2. As first move are chosen:

Before that, we need to check what color do we have. It will be find via cy.getMyPlayerColor()

- for white: King´s Pawn Opening - e4
- for black: as defense - kc6

Parametrized first move can be parametrized and changed in the future in fixture file.

Waiting for every turn is handled by loop with cy.get('[data-ply=x]').should(be.visible) which x is step of opponent move.

### 3. It needs scan all moves from chess.com [data-cy="move-list"]

It is handled by cy.scanMovesFromChessMoveList() with populate each nodes to array.

### 4. If I have all moves, I need to compute evaluation and get best move from stockfish.online

It is handled by cy.getBestMove(listOfMoves), which will be converted from algebraic notation to FEN and then will be sended via cy.request() to stockfish.online for best move request.

### 5. Action with cy.move()

It is handled by cy.move() custom command which needs to calculate chess board from coordinates - to coordinates.

## Installation

clonning repo:

```bash
git clone https://github.com/miroslavkadidlo/chess-bot.git
```

```bash
cd /<project>

npm install
```

## Run chess

```bash
npm cypress open
```

optional you can use npx

```bash
npx cypress open
```
click on playChess.cy.js

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
