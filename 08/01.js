const fs = require('fs')

let accumulator = 0
let currentLine = 0

let instructions = {
  nop: () => {
    currentLine += 1
  },
  acc: () => {
    accumulator += input[currentLine].value
    currentLine += 1
  },
  jmp: () => {
    currentLine += input[currentLine].value
  }
}

const input = fs
  .readFileSync('input', { encoding: 'utf8', flag: 'r' })
  .split('\n')
  .map(line => {
    const [command, value] = line.split(' ')

    return {
      command,
      value: Number(value),
      wasVisited: false
    }
  })

while (!input[currentLine].wasVisited) {
  input[currentLine].wasVisited = true
  instructions[input[currentLine].command]()
}

console.log(accumulator)
