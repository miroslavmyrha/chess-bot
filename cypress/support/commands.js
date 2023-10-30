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
    let colorPrefix =''

    if (myPlayerColor === 'white') {
      colorPrefix = 'w'
    } else {
      colorPrefix = 'b'
    }

    switch (figure) {
      case 'king':
        figurePrefix = colorPrefix + 'k'
        break
      case 'queen':
        figurePrefix = colorPrefix + 'q'
        break
      case 'rook':
        figurePrefix = colorPrefix + 'r'
        break
      case 'bishop':
        figurePrefix = colorPrefix + 'b'
        break
      case 'knight': 
        figurePrefix = colorPrefix + 'n'
        break
      case 'pawn': 
        figurePrefix = colorPrefix + 'p'
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


    if (myPlayerColor === 'black') {
      // waiting for opponent move
      cy.get('div[data-ply="1"]').should('be.visible')        
    }

    let axeY = coordinatesMoveTo.slice(1)
    let axeX = coordinatesMoveTo.slice(0, -1)
    let coordinates = ''

    // select which figure you want to move
    cy.get('div.piece.' + figurePrefix + '.square-' + coordinatesStart).click()

    // compute coordinates
    switch (myPlayerColor) {
      case 'white':
        coordinates = {x: (axeX * 66) - 33, y: 528 - (axeY * 66) + 33}
        break
      case 'black':
        coordinates = {x: 528 - (axeX * 66) + 33, y: (axeY * 66) - 33}
        break
    }
    // move
    cy.get('svg.coordinates')
    .click(
      // x, y
      coordinates.x, coordinates.y, 
      {force: true}
    )
})
