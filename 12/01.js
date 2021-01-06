const fs = require('fs')

const input = fs
  .readFileSync('input', { encoding: 'utf8', flag: 'r' })
  .split('\n')
  .map(line => ({
    command: line[0],
    value: Number(line.slice(1))
  }))

let currentDirection = 'E'
const position = { x: 0, y: 0 }

const commands = {
  F: value => commands[currentDirection](value),
  N: value => (position.y += value),
  E: value => (position.x += value),
  S: value => (position.y -= value),
  W: value => (position.x -= value),
  R: value => {
    const steps = Math.floor(value / 90)
    const directions = ['N', 'E', 'S', 'W']
    const idx = directions.findIndex(d => d === currentDirection)

    currentDirection = directions[(idx + steps) % 4]
  },
  L: value => {
    const steps = Math.floor(value / 90)
    const directions = ['N', 'E', 'S', 'W']
    const idx = directions.findIndex(d => d === currentDirection)

    currentDirection = directions.slice((idx - steps) % 4)[0]
  }
}

input.forEach(instruction => {
  commands[instruction.command](instruction.value)
})

console.log(Math.abs(position.x) + Math.abs(position.y))
