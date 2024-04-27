import playerLevel from '../fixtures/playerLevel.json'
import numsOfGameplayMoves from '../fixtures/numsOfGameplayMoves.json'

// default 1000x660

const selectedLanguageMutation = 'en'

function tranformNotation(chessNotationCoordinates) {  
  let axeY = chessNotationCoordinates.slice(1)
  let axeX = chessNotationCoordinates.slice(0, -1)
  const notationSheet = {
      a: "1",
      b: "2",
      c: "3",
      d: "4",
      e: "5",
      f: "6",
      g: "7",
      h: "8"
  }
  return notationSheet[axeX] + axeY
}

describe('before: start chess game', () => {
  before(() => {
    // x, y
    cy.viewport(1000, 660)
    cy.startChessGame({
      languageMutation: selectedLanguageMutation, 
      playerLevel: playerLevel.new
    })
  })

  it('Play chess to win', function () {
    cy.get('[data-cy="move-list"]').should('exist')
    cy.getMyPlayerColor().then(myColor => {
      if (myColor === 'white') {

        cy.move(
          myColor, 
          tranformNotation('e2'),
          tranformNotation('e4') 
        )

        for (let i = 1; i < numsOfGameplayMoves.numsOfGameplay; i++) {

          cy.get('div[data-ply="' + i*2 + '"]').should('exist')

          cy.scanMovesFromChessMoveList().then(moveList => {
            cy.getBestMove(moveList).then(bestMove => {
              cy.move(
                myColor, 
                tranformNotation(bestMove.data.slice(9, 11)),
                tranformNotation(bestMove.data.slice(11, 13))
              )
            })
          })
        }
      } else {
       
        cy.get('div[data-ply="' + 1 + '"]').should('exist')

        cy.move(
          myColor, 
          tranformNotation('b8'),
          tranformNotation('c6')
        )

        for (let i = 3; i < numsOfGameplayMoves.numsOfGameplay; i++) {
          if (i % 2 !== 0) {
            cy.get('div[data-ply="' + i + '"]').should('exist')

            cy.scanMovesFromChessMoveList().then(moveList => {
              cy.getBestMove(moveList).then(bestMove => {
                cy.move(
                  myColor,
                  tranformNotation(bestMove.data.slice(9, 11)),
                  tranformNotation(bestMove.data.slice(11, 13))
                )
              })
            })
          }
        }
      }
    })
  })
})
