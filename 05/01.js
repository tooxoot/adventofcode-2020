const fs = require('fs')

const binaryMap = {
  F: 0,
  B: 1,
  L: 0,
  R: 1
}

const input = fs
  .readFileSync('input', { encoding: 'utf8', flag: 'r' })
  .split('\n')
  .map(line => line.split('').reverse())
  .map(code => code.map(char => binaryMap[char]))
  .map(code => code.map((char, idx) => char * 2 ** idx))
  .map(code => code.reduce((a, b) => a + b))
  .sort((a, b) => (a > b ? 1 : -1))

// console.log(input)

console.log(input.slice(-1)[0])
