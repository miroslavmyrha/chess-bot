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

Cypress.Commands.add('pawnMove', (
  myPlayerColor, coordinatesStart, coordinatesMoveTo   
  ) => {  
    if (myPlayerColor === 'white') {
      // select which pawn you want to move
      cy.get('div.piece.wp.square-' + coordinatesStart)
        .click()

      // 57 ==> 56, 55 
      // 52 ==> 53, 54

      // 1st number
      // coordinatesStart.slice(1)
      // 2nd number
      // coordinatesStart.slice(0, -1)

      // compute how many squares you want to move
      const squaresToMove = coordinatesMoveTo.slice(1) - coordinatesStart.slice(1)

      if ( squaresToMove === 2 ) {
        cy.get('div.piece.wp.square-' + coordinatesStart)
          .click(
            20, -90, 
            {force: true}
          )
      } else if ( squaresToMove === 1 ) {
        cy.get('div.piece.wp.square-' + coordinatesStart)
          .click(
            20, -45, 
            {force: true}
          )
      } else {
        throw new Error('Ilegal move.')
      }

    } else {

      // compute how many squares you want to move
      const squaresToMove = coordinatesStart.slice(1) - coordinatesMoveTo.slice(1)

      // waiting for opponent move
      cy.get('div[data-ply="1"]').should('be.visible')

      // select which pawn you want to move
      cy.get('div.piece.bp.square-' + coordinatesStart).click()
      
      if ( squaresToMove === 2 ) {
        cy.get('div.piece.bp.square-' + coordinatesStart)
          .click(
            20, -90, 
            {force: true}
          )
      } else if ( squaresToMove === 1 ) {
        cy.get('div.piece.bp.square-' + coordinatesStart)
          .click(
            20, -45, 
            {force: true}
          )
      } else {
        throw new Error('Ilegal move.')
      }
    }
})




