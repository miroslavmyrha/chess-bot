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

  it('Pawn´s first move test', () => {
    // to-do: develop waiting for oponent connection method..
    cy.wait(5000)
    cy.getMyPlayerColor().then(myColor => {
      let coordinatesStart = ''
      let coordinatesMoveTo = ''
      let figure = ''

      if (myColor === 'white') {
        // 'xy'
        figure = 'pawn'
        coordinatesStart = tranformNotation('e2')
        coordinatesMoveTo = tranformNotation('e4')
      } else {
        figure = 'knight'
        coordinatesStart = tranformNotation('b8')
        coordinatesMoveTo = tranformNotation('c6')
      }

      cy.move(
        figure,
        myColor, 
        coordinatesStart, 
        coordinatesMoveTo  
      )


      // collect a few moves to get response from stockfish.online api

      // TO-DO - get figures to notation

      cy.wait(50000)

      // find which figure who moved, ještě rozdělovat barvy?

      // let pole = []

      // cy.get('div.move').each(moves => {
      //   cy.wrap(moves).find('div.white.node').each((whiteNode, index) => {
      //     if (whiteNode[index].find('span').length) {
      //       cy.wrap(whiteNode[index]).find('span').invoke('attr', 'data-figurine').then(figurine => {
      //         window.alert(figurine)
      //         pole.push('White: ' +  figurine)
      //       })
      //     } else {
      //       window.alert('není')
      //       pole.push('White:  Pawn')
      //     }
      //   })

      //   cy.wrap(moves).find('div.white.node').each((blackNode, index) => {
      //     if (blackNode[index].find('span').length) {
      //       cy.wrap(blackNode[index]).find('span').invoke('attr', 'data-figurine').then(figurine => {
      //         window.alert(figurine)
      //         pole.push('Black: ' +  figurine)
      //       })
      //     } else {
      //       window.alert('není')
      //       pole.push('Black:  Pawn')
      //     }
      //   })
      // })

      // cy.writeFile('tahy.txt', pole)

        let gameplayMovesFromChessCom = []

        cy.get('div.move').find('div.white').each((moveWhite, index) => {
          cy.get('div.move').find('div.black').each((moveBlack, index2) => {
            if (index === index2) { 
              if (moveWhite.find('span').length) {
                moveWhite.find('span').invoke('text').then(figure => {
                  gameplayMovesFromChessCom.push(figure + ' ' + moveWhite.text().trim())
                })
              } else {
                gameplayMovesFromChessCom.push(moveWhite.text().trim())
              }

              if (moveBlack.find('span').length) {
                moveBlack.find('span').invoke('text').then(figure => {
                  gameplayMovesFromChessCom.push(figure + ' ' + moveBlack.text().trim())
                })
              } else {
                gameplayMovesFromChessCom.push(moveBlack.text().trim())
              }
            
              // cy.task('parseAlgebraicToFEN', gameplayMovesFromChessCom).then(testNotationCodeFEN => {
              //   cy.request('GET', Cypress.config('stockFishUrl') + testNotationCodeFEN + '&depth=' + stockFishDifficulty.difficutlty + '&mode=bestmove').then(response => {
              //     expect(response.status).to.eq(200)
              //     const parsed = JSON.parse(response.body)
              //     cy.writeFile('response.json', response.body)
              //     //window.alert(parsed.data)
              //     expect(parsed.success).to.eq(true)
              //   })
              // })
            }
          })
        })

        cy.writeFile('tahy.txt', gameplayMovesFromChessCom)
    })
  })
})
