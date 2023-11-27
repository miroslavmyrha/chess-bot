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
  myPlayerColor, coordinatesStart, coordinatesMoveTo   
  ) => {  

    let colorPrefix =''

    if (myPlayerColor === 'white') {
      colorPrefix = 'w'
    } else {
      colorPrefix = 'b'
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

    let moveToaxeY = coordinatesMoveTo.slice(1)
    let moveToaxeX = coordinatesMoveTo.slice(0, -1)
    let startMoveaxeY = coordinatesStart.slice(1)
    let startMoveaxeX = coordinatesStart.slice(0, -1)
    let coordinates = ''
    let startCoordinates = ''

    // select which figure you want to move
    // cy.get('div.piece.' + figurePrefix + '.square-' + coordinatesStart).click()


    // compute coordinates move start
    switch (myPlayerColor) {
    case 'white':
      startCoordinates = {x: (startMoveaxeX * 66) - 33, y: 528 - (startMoveaxeY * 66) + 33}
      break
    case 'black':
      startCoordinates = {x: 528 - (startMoveaxeX * 66) + 33, y: (startMoveaxeY * 66) - 33}
      break
    }
    // move from
    cy.get('svg.coordinates')
      .click(
        // x, y
        startCoordinates.x, startCoordinates.y, 
        {force: true}
      )
    

    // compute coordinates move to
    switch (myPlayerColor) {
      case 'white':
        coordinates = {x: (moveToaxeX * 66) - 33, y: 528 - (moveToaxeY * 66) + 33}
        break
      case 'black':
        coordinates = {x: 528 - (moveToaxeX * 66) + 33, y: (moveToaxeY * 66) - 33}
        break
    }
    // move TO
    cy.get('svg.coordinates')
      .click(
        // x, y
        coordinates.x, coordinates.y, 
        {force: true}
      )
})
