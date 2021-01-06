const fs = require('fs')

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

const execute = (newCommand, insertionIdx) => {
  const program = input.map((line, idx) => (idx === insertionIdx ? { ...line, command: newCommand } : { ...line }))

  let accumulator = 0
  let currentLine = 0

  let instructions = {
    nop: () => {
      currentLine += 1
    },
    acc: () => {
      accumulator += program[currentLine].value
      currentLine += 1
    },
    jmp: () => {
      currentLine += program[currentLine].value
    }
  }

  while (currentLine < program.length && !program[currentLine].wasVisited) {
    program[currentLine].wasVisited = true
    instructions[program[currentLine].command]()
  }

  if (currentLine >= program.length) {
    return accumulator
  } else {
    return null
  }
}

const cmds = input
  .map(({ command }, idx) => {
    switch (command) {
      case 'nop':
        return ['jmp', idx]
      case 'jmp':
        return ['nop', idx]
      default:
        return undefined
    }
  })
  .filter(Boolean)

for (const [newCommand, insertionIdx] of cmds) {
  const result = execute(newCommand, insertionIdx)
  if (result !== null) {
    console.log(result)
    break
  }
}
