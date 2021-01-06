const fs = require('fs')

const input = fs
  .readFileSync('input', { encoding: 'utf8', flag: 'r' })
  .split('\n')
  .map(line => line.split('').map(char => (char === '.' ? 0 : 1)))

const grid = input
grid.dupe = () => grid.forEach(line => line.push(...line))
grid.toString = () => grid.map(line => line.join('')).reduce((output, line) => output + line + '\n', '')

const dy = 3
let x = 0
let y = 0

let count = 0

while (++x < grid.length) {
  y += dy

  if (y >= grid[0].length) grid.dupe()

  count += grid[x][y]
}

console.log(count)
