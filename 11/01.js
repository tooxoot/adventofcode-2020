const fs = require('fs')

// 0 floor
// 1 empty seat
// 2 occupied seat

const input = fs
  .readFileSync('input', { encoding: 'utf8', flag: 'r' })
  .split('\n')
  .map(line => line.split(''))

const evalPosition = (area, x, y) => {
  if (area[x][y] === '.') return '.'

  const lines = [area[x - 1] || [], area[x], area[x + 1] || []]

  const seats = [
    lines[0][y - 1] || '.',
    lines[0][y] || '.',
    lines[0][y + 1] || '.',
    lines[1][y - 1] || '.',
    lines[1][y + 1] || '.',
    lines[2][y - 1] || '.',
    lines[2][y] || '.',
    lines[2][y + 1] || '.'
  ]

  const occupied = seats.filter(seat => seat === '#').length

  if (area[x][y] === 'L' && occupied === 0) return '#'
  if (area[x][y] === '#' && occupied >= 4) return 'L'

  return area[x][y]
}

const step = area => {
  const newArea = []

  area.forEach(_ => newArea.push([]))

  for (let x = 0; x < area.length; x++) {
    for (let y = 0; y < area.length; y++) {
      newArea[x][y] = evalPosition(area, x, y)
    }
  }

  return newArea
}

let oldArea = []
let newArea = input

while (JSON.stringify(oldArea) !== JSON.stringify(newArea)) {
  oldArea = newArea
  newArea = step(oldArea)
}

const occupied = newArea.flat().filter(seat => seat === '#').length
console.log(occupied)
