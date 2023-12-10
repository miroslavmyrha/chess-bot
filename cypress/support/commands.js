import languageMutationObject from './../fixtures/languageMutations.json'
import stockFishDepth from './../fixtures/stockFishDepth.json'

  // test moving
  // 57 ==> 56, 55 
  // 52 ==> 53, 54

  // 1st number y-axe
  // coordinatesStart.slice(1)
  // 2nd number x-axe
  // coordinatesStart.slice(0, -1)

  // 66 one square

  // 528x528 chessboard

const CHESSBOARD_SIZE = 528
const SQUARE_SIZE = 66

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
      let startCoordinates = calculateChessboardCoordinates(myPlayerColor, coordinatesStart)
      let moveToCoordinates = calculateChessboardCoordinates(myPlayerColor, coordinatesMoveTo)

      cy.get('svg.coordinates')
        .click(
          startCoordinates.x, startCoordinates.y,
          {force: true}
        )
        .click(
          moveToCoordinates.x, moveToCoordinates.y,
          {force: true}
        )
})

function calculateChessboardCoordinates(myPlayerColor, coordinates) {
  let axeY = coordinates.slice(1)
  let axeX = coordinates.slice(0, -1)

  switch (myPlayerColor) {
    case 'white':
      coordinates = {x: (axeX * SQUARE_SIZE) - SQUARE_SIZE / 2, y: CHESSBOARD_SIZE - (axeY * SQUARE_SIZE) + SQUARE_SIZE / 2}
      break
    case 'black':
      coordinates = {x: CHESSBOARD_SIZE - (axeX * SQUARE_SIZE) + SQUARE_SIZE / 2, y: (axeY * SQUARE_SIZE) - SQUARE_SIZE / 2}
      break
  }
  return coordinates
}


Cypress.Commands.add('scanMovesFromChessMoveList', (
    ) => {
      let gameplayMovesFromChessCom = []

      cy.get('div.node').each((move) => {
        if (move.find('span').length) {
          gameplayMovesFromChessCom.push(move.find('span').attr('data-figurine') + move.text().trim())
        } else {
          gameplayMovesFromChessCom.push(move.text().trim())
        }
      })
    return cy.wrap(gameplayMovesFromChessCom)
})

Cypress.Commands.add('getBestMove', (
  gameplayMovesFromChessCom
    ) => {
      cy.task('parseAlgebraicToFEN', gameplayMovesFromChessCom).then(testNotationCodeFEN => {
        cy.request('GET', Cypress.config('stockFishUrl') + testNotationCodeFEN + '&depth=' + stockFishDepth.depth + '&mode=bestmove').then(response => {
          expect(response.status).to.eq(200)
          const parsed = JSON.parse(response.body)
          expect(parsed.success).to.eq(true)
          return parsed
        })
      })
})
