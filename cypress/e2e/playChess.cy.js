import playerLevel from '../fixtures/playerLevel.json'

describe('before: start chess game', () => {
  before(() => {
    cy.startChessGame({
      languageMutation: 'cz', 
      playerLevel: playerLevel.new
    })
  })

  it('Check first move', () => {
    
  })
})