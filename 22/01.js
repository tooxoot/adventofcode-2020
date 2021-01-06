const fs = require('fs')

const input = fs.readFileSync('input', { encoding: 'utf8', flag: 'r' }).split('\n')

const p2Idx = input.findIndex(line => line === 'Player 2:')

const deck1 = input.slice(1, p2Idx - 1).map(Number)
const deck2 = input.slice(p2Idx + 1).map(Number)

const noWinner = () => deck1.length && deck2.length

while (noWinner()) {
  const c1 = deck1.shift()
  const c2 = deck2.shift()

  if (c1 > c2) deck1.push(c1, c2)
  else deck2.push(c2, c1)
}

const winningDeck = deck1.length ? deck1 : deck2

winningDeck.reverse()

const score = winningDeck.reduce((result, v, idx) => result + v * (idx + 1))

console.log(score)
