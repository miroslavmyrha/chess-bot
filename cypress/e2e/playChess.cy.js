import playerLevel from '../fixtures/playerLevel.json'
import stockFishDifficulty from '../fixtures/stockFishDifficulty.json'

// default 1000x660

const selectedLanguageMutation = 'cz'

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

  it('Pawn´s first move test', function () {
    // to-do: develop waiting for oponent connection method..
    cy.wait(5000)
    cy.getMyPlayerColor().then(myColor => {
      if (myColor === 'white') {

        cy.move(
          myColor, 
          tranformNotation('e2'),
          tranformNotation('e4') 
        )

        cy.get('div[data-ply="' + 2 + '"]').should('be.visible')

        let gameplayMovesFromChessCom = []

        cy.get('div.move').find('div.white').each((moveWhite, index) => {
          cy.get('div.move').find('div.black').each((moveBlack, index2) => {
            if (index === index2) { 
              if (moveWhite.find('span').length) {
                gameplayMovesFromChessCom.push(moveWhite.find('span').attr('data-figurine') + moveWhite.text().trim())
              } else {
                gameplayMovesFromChessCom.push(moveWhite.text().trim())
              }
  
              if (moveBlack.find('span').length) {
                gameplayMovesFromChessCom.push(moveBlack.find('span').attr('data-figurine') + moveBlack.text().trim())
              } else {
                gameplayMovesFromChessCom.push(moveBlack.text().trim())
              }
            
              cy.task('parseAlgebraicToFEN', gameplayMovesFromChessCom).then(testNotationCodeFEN => {
                cy.request('GET', Cypress.config('stockFishUrl') + testNotationCodeFEN + '&depth=' + stockFishDifficulty.difficutlty + '&mode=bestmove').then(response => {
                  expect(response.status).to.eq(200)
                  const parsed = JSON.parse(response.body)
                  cy.writeFile('response.json', response.body)
                  expect(parsed.success).to.eq(true)
                  // start
                  cy.move(
                    myColor, 
                    tranformNotation(parsed.data.slice(9, 11)),
                    tranformNotation(parsed.data.slice(11, 13))
                  )
                })
              })
            }
          })
        })
        cy.writeFile('tahy.txt', gameplayMovesFromChessCom)

        // const start = (this.taskToBestMove).slice(2)
        // const moveTo = (this.taskToBestMove).slice(0, 2)
        

        // cy.move(
        //   myColor, 
        //   tranformNotation(start),
        //   tranformNotation(moveTo) 
        // )
      } else {
        window.alert('black')
      }

        // collect a few moves to get response from stockfish.online api

      // TO-DO - get figures to notation
    })
  })
})
