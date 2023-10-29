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

      if (myColor === 'white') {
        // x, y
        coordinatesStart = '52'
        coordinatesMoveTo = '54'
        cy.move(
          'pawn',
          myColor, 
          coordinatesStart, 
          coordinatesMoveTo  
        )
      } else {
        // coordinatesStart = '28'
        // coordinatesMoveTo = '36'
        // cy.move(
        //   'knight',
        //   myColor, 
        //   coordinatesStart, 
        //   coordinatesMoveTo
        // )

          
        coordinatesStart = '57'
        coordinatesMoveTo = '55'
        cy.move(
          'pawn',
          myColor, 
          coordinatesStart, 
          coordinatesMoveTo  
        )
      }
    })
  })
})