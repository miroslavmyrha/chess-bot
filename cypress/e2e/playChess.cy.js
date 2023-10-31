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

      // get request test to stockfish.online in FEN notation
      const testNotationCodeFEN = 'r2q1rk1/ppp2ppp/3bbn2/3p4/8/1B1P4/PPP2PPP/RNB1QRK1 w - - 5 11&depth=5&mode=eval'

      cy.request('GET', 'https://stockfish.online/api/stockfish.php?fen=' + testNotationCodeFEN).then(response => {
        expect(response.status).to.eq(200)
        const parsed = JSON.parse(response.body)
        // cy.writeFile('response.json', response.body)
        expect(parsed.success).to.eq(true)
        expect(parsed.data).to.eq("Total evaluation: -1.52 (white side)")
      })

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