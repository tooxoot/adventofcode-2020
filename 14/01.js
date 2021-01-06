const fs = require('fs')

const input = fs
  .readFileSync('input', { encoding: 'utf8', flag: 'r' })
  .split('\n')
  .map(line => line.split(' = '))
  .map(([c, v]) => {
    if (c === 'mask')
      return {
        command: c,
        value: v
      }

    const [, address] = c.split(/\[|\]/g)
    return {
      command: 'mem',
      value: Number(v).toString(2),
      address
    }
  })

let mask = ''
const mem = []

const commands = {
  mask: value => (mask = value),
  mem: (value, address) => {
    const bits = value.padStart(36, '0').split('')
    for (const idx in mask) {
      if (mask[idx] === 'X') continue
      bits[idx] = mask[idx]
    }

    mem[address] = parseInt(bits.join(''), 2)
  }
}

input.forEach(({ command, address, value }) => commands[command](value, address))

const sum = mem.reduce((a, b) => a + b)

console.log(sum)
