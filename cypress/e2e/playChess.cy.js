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
      if (myColor === 'white') {
        cy.get('div.piece.wp.square-52').click()
        cy.get('div.piece.wp.square-52').click(20, -90, {force: true})
      } else {
        cy.get('div[data-ply="1"]').should('be.visible')
        cy.get('div.piece.bp.square-47').click()
        cy.get('div.piece.bp.square-47').click(20, -90, {force: true})
      }
    })
  })
})