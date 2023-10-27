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
      .click()
})
