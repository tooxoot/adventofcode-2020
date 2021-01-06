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

// sorted input should be valid chain. check to be sure

const chain = [0, ...input, input.slice(-1)[0] + 3]

for (let idx = 0; idx < chain.length - 1; idx++) {
  const diff = chain[idx + 1] - chain[idx]

  if (diff > 3 || diff < 1) throw Error('invalid chain: ' + JSON.stringify(chain))

  diffs[diff] += 1
}
console.log(diffs[1] * diffs[3])
