import playerLevel from '../fixtures/playerLevel.json'

// default 1000x660

const selectedLanguageMutation = 'cz'

function tranformNotation(chessNotationCoordinates) {  
  let axeY = chessNotationCoordinates.slice(1)
  let axeX = chessNotationCoordinates.slice(0, -1)
  const notationSheet = {
      a: "1",
      b: "2",
      c: "3",
      d: "4",
      e: "5",
      f: "6",
      g: "7",
      h: "8"
  }
  return notationSheet[axeX] + axeY
}

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
      let figure = ''

      if (myColor === 'white') {
        // 'xy'
        figure = 'pawn'
        coordinatesStart = tranformNotation('e2')
        coordinatesMoveTo = tranformNotation('e4')
      } else {
        figure = 'knight'
        coordinatesStart = tranformNotation('b8')
        coordinatesMoveTo = tranformNotation('c6')
      }

      cy.move(
        figure,
        myColor, 
        coordinatesStart, 
        coordinatesMoveTo  
      )

        // coordinatesStart = '57'
        // coordinatesMoveTo = '55'
        // cy.move(
        //   'pawn',
        //   myColor, 
        //   coordinatesStart, 
        //   coordinatesMoveTo  
        // )

    })
  })
})