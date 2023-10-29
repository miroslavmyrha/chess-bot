import languageMutationObject from './../fixtures/languageMutations.json'

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('startChessGame', (
  chessGameParametersObject
  ) => {
    cy.visit('/')

    cy.get('div')
      .contains(
        languageMutationObject[chessGameParametersObject.languageMutation].playOnline
      )
      .click()

    cy.get('label[for="' + chessGameParametersObject.playerLevel + '"]')
      .click()

    cy.get('button')
      .contains(
        languageMutationObject[chessGameParametersObject.languageMutation].cookiesReject
      )
      .should('be.visible')
      .click()

    cy.get('button[type="submit"]')
      .filter(':visible')
      .click()

    cy.get('button[type="button"]')
      .contains(
        languageMutationObject[chessGameParametersObject.languageMutation].playButton
      )
      .click()

    cy.get('button[aria-label="Close"]')
      .click()

    cy.get('button[data-cy="new-game-index-play"]')
      .should('be.visible')
      .click()
})

Cypress.Commands.add('getMyPlayerColor', (
  ) => {
    // turn
    cy.get('img[data-cy="avatar"]')
      .eq(1)
      .invoke(
        'attr', 'src'
      )
      .then(myImageSource => {
        if (myImageSource.includes('black_400.png')) {
          cy.log('black')
          return cy.wrap('black')
        } else {
          cy.log('white')
          return cy.wrap('white')
        }
    })
})

Cypress.Commands.add('move', (
  figure , myPlayerColor, coordinatesStart, coordinatesMoveTo   
  ) => {  

    let figurePrefix = ''

    if (myPlayerColor === 'white') {
      switch (figure) {
        case 'king':
          figurePrefix = 'wk'
          break
        case 'queen':
          figurePrefix = 'wq'
          break
        case 'rook':
          figurePrefix = 'wr'
          break
        case 'bishop':
          figurePrefix = 'wb'
          break
        case 'knight': 
          figurePrefix = 'wn'
          break
        case 'pawn': 
          figurePrefix = 'wp'
          break
      }
      

      // 57 ==> 56, 55 
      // 52 ==> 53, 54

      // 1st number y-axe
      // coordinatesStart.slice(1)
      // 2nd number x-axe
      // coordinatesStart.slice(0, -1)

      // 66 one square

      // 528x528 chessboard

      let axeY = coordinatesMoveTo.slice(1)
      let axeX = coordinatesMoveTo.slice(0, -1)

      // select which figure you want to move
      cy.get('div.piece.' + figurePrefix + '.square-' + coordinatesStart).click()
      // move
      cy.get('svg.coordinates')
        .click(
          // x, y
          (axeX * 66) - 33, 528 - (axeY * 66) + 33, 
          {force: true}
        )

    } else {

      switch (figure) {
        case 'king':
          figurePrefix = 'bk'
          break
        case 'queen':
          figurePrefix = 'bq'
          break
        case 'rook':
          figurePrefix = 'br'
          break
        case 'bishop':
          figurePrefix = 'bb'
          break
        case 'knight': 
          figurePrefix = 'bn'
          break
        case 'pawn': 
          figurePrefix = 'bp'
          break
      }

      let axeY = coordinatesMoveTo.slice(1)
      let axeX = coordinatesMoveTo.slice(0, -1)

      // waiting for opponent move
      cy.get('div[data-ply="1"]').should('be.visible')

      // select which figure you want to move
      cy.get('div.piece.' + figurePrefix + '.square-' + coordinatesStart).click()
      // move
      cy.get('svg.coordinates')
      .click(
        // x, y
        528 - (axeX * 66) + 33, (axeY * 66) - 33, 
        {force: true}
      )
    }
})
