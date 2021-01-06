const fs = require('fs')

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
const GROUP = Object.fromEntries(alphabet.map(char => [char, 0]))
const newGroup = () => ({ ...GROUP, count: 0 })

const input = fs
  .readFileSync('input', { encoding: 'utf8', flag: 'r' })
  .split('\n')
  .reduce(
    (result, line) => {
      if (line === '') return [newGroup(), ...result]

      result[0].count += 1
      line.split('').forEach(char => (result[0][char] += 1))

      return result
    },
    [newGroup()]
  )
  .map(group => alphabet.map(char => group[char] === group.count).filter(Boolean).length)
  .reduce((a, b) => a + b)

console.log(input)
