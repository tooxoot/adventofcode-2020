const fs = require('fs')

const input = fs
  .readFileSync('input', { encoding: 'utf8', flag: 'r' })
  .split('\n')
  .map(line => line.split('').map(char => (char === '.' ? 0 : 1)))

const grid = input
grid.dupe = () => grid.forEach(line => line.push(...line))
grid.toString = () => grid.map(line => line.join('')).reduce((output, line) => output + line + '\n', '')

const slopes = [
  [1, 1],
  [1, 3],
  [1, 5],
  [1, 7],
  [2, 1]
]

let result = 1

for (const [dx, dy] of slopes) {
  let x = 0
  let y = 0
  let count = 0

  while ((x += dx) < grid.length) {
    y += dy

    if (y >= grid[0].length) grid.dupe()

    count += grid[x][y]
  }

  result = result * count
}

console.log(result)
