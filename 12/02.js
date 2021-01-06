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
let waypoint = { x: 10, y: 1 }

const commands = {
  F: value => {
    position.x += waypoint.x * value
    position.y += waypoint.y * value
  },
  N: value => (waypoint.y += value),
  E: value => (waypoint.x += value),
  S: value => (waypoint.y -= value),
  W: value => (waypoint.x -= value),
  R: value => {
    const steps = Math.floor(value / 90) % 4
    switch (steps) {
      case 0:
        return
      case 1:
        waypoint = {
          x: waypoint.y,
          y: -waypoint.x
        }
        return
      case 2:
        waypoint = {
          x: -waypoint.x,
          y: -waypoint.y
        }
        return
      case 3:
        waypoint = {
          x: -waypoint.y,
          y: waypoint.x
        }
        return
    }
  },
  L: value => commands.R(360 - value)
}

input.forEach(instruction => {
  commands[instruction.command](instruction.value)
})

console.log(Math.abs(position.x) + Math.abs(position.y))
