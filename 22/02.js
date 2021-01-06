const fs = require('fs')

const input = fs.readFileSync('input', { encoding: 'utf8', flag: 'r' }).split('\n')

const p2Idx = input.findIndex(line => line === 'Player 2:')

const deck1 = input.slice(1, p2Idx - 1).map(Number)
const deck2 = input.slice(p2Idx + 1).map(Number)

const play = (d1, d2, idx = 0) => {
  const configs = []

  while (d1.length && d2.length) {
    const config = d1.join(',') + '|' + d2.join(',')
    if (configs.includes(config)) {
      return 1
    }
    configs.push(config)

    const c1 = d1.shift()
    const c2 = d2.shift()

    let roundWin

    if (d1.length >= c1 && d2.length >= c2) {
      const subDeck1 = d1.slice(0, c1)
      const subDeck2 = d2.slice(0, c2)

      roundWin = play(subDeck1, subDeck2, idx + 1)
    } else {
      roundWin = c1 > c2 ? 1 : 2
    }

    if (roundWin === 1) d1.push(c1, c2)
    else d2.push(c2, c1)
  }

  const winner = d1.length ? 1 : 2

  return winner
}

const winner = play(deck1, deck2)

const winningDeck = winner === 1 ? deck1 : deck2

winningDeck.reverse()

const score = winningDeck.reduce((result, v, idx) => result + v * (idx + 1))

console.log(score)
