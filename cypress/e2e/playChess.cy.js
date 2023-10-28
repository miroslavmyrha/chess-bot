import playerLevel from '../fixtures/playerLevel.json'

// default 1000x660

const selectedLanguageMutation = 'cz'

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
      
      // if white has first turn, move with king pawn by two sqares
      // if black has first turn, move with king pawn by one sqare
      if (myColor === 'white') {
        coordinatesStart = '52'
        coordinatesMoveTo = '54'
        cy.pawnMove(
          myColor, 
          coordinatesStart, 
          coordinatesMoveTo  
        )
      } else {
        coordinatesStart = '57'
        coordinatesMoveTo = '56'
        cy.pawnMove(
          myColor, 
          coordinatesStart, 
          coordinatesMoveTo  
        )
      }
    })
  })
})