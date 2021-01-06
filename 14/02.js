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
      value: Number(v),
      address: Number(address).toString(2)
    }
  })

const explode = (address = '', idx = 0) => {
  if (idx >= address.length) return [address]
  if (address[idx] !== 'X') return explode(address, idx + 1)

  const result = []
  const bits = address.split('')

  bits[idx] = '0'
  result.push(...explode(bits.join(''), idx + 1))

  bits[idx] = '1'
  result.push(...explode(bits.join(''), idx + 1))

  return result
}

let mask = ''
const mem = {}

const commands = {
  mask: value => (mask = value),
  mem: (value, address) => {
    const bits = address.padStart(36, '0').split('')
    for (const idx in mask) {
      if (mask[idx] === '0') continue
      bits[idx] = mask[idx]
    }

    const addresses = explode(bits.join('')).map(address => parseInt(address, 2))

    addresses.forEach(address => (mem[address] = value))
  }
}

input.forEach(({ command, address, value }) => commands[command](value, address))

const sum = Object.values(mem).reduce((a, b) => a + b)
console.log(sum)
