const fs = require('fs')

// 0 floor
// 1 empty seat
// 2 occupied seat

const input = fs
  .readFileSync('input', { encoding: 'utf8', flag: 'r' })
  .split('\n')
  .map(line => line.split(''))

const getVisible = (area, x, y, dx, dy) => {
  const x2 = x + dx
  const y2 = y + dy

  if (!area[x2]) return '.'
  if (!area[x2][y2]) return '.'
  if (area[x2][y2] === 'L') return 'L'
  if (area[x2][y2] === '#') return '#'
  return getVisible(area, x2, y2, dx, dy)
}

const evalPosition = (area, x, y) => {
  if (area[x][y] === '.') return '.'

  const lines = [area[x - 1] || [], area[x], area[x + 1] || []]

  const seats = [
    getVisible(area, x, y, -1, -1),
    getVisible(area, x, y, -1, 0),
    getVisible(area, x, y, -1, 1),

    getVisible(area, x, y, 0, 1),
    getVisible(area, x, y, 0, -1),

    getVisible(area, x, y, 1, -1),
    getVisible(area, x, y, 1, 0),
    getVisible(area, x, y, 1, 1)
  ]

  const occupied = seats.filter(seat => seat === '#').length

  if (area[x][y] === 'L' && occupied === 0) return '#'
  if (area[x][y] === '#' && occupied >= 5) return 'L'

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
