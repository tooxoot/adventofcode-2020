const fs = require('fs')
const input = fs
  .readFileSync('input', { encoding: 'utf8', flag: 'r' })
  .split('\n')
  .map(Number)
  .sort((a, b) => a - b)

const diffs = {
  1: 0,
  2: 0,
  3: 0
}

// sorted input should be valid chain.

const chain = [0, ...input, input.slice(-1)[0] + 3]
const slices = []

// split on gaps of 3
let idx = 0
while (idx < chain.length) {
  idx++
  const diff = chain[idx] - chain[idx - 1]

  if (diff === 3) {
    slices.push(chain.splice(0, idx))
    idx = 0
  }
}

if (chain.length) slices.push(chain)

// slices are not longer than 5
if (slices.some(slice => slice.length > 5)) throw Error('slice longer than 5 detected')

// No gaps larger than 3! => edges have to stay + no deletion of 3 elements in a row
const combinations = {
  1: 1, // o
  2: 1, // oo
  3: 2, // ooo oxo
  4: 4, // oooo oxoo ooxo oxxo
  5: 7 // oo - ooo xoo oxo xxo , ox - ooo xoo oxo
}

const result = slices.map(slice => combinations[slice.length]).reduce((a, b) => a * b)

console.log(result)
