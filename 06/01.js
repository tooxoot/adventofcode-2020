const fs = require('fs')

const input = fs
  .readFileSync('input', { encoding: 'utf8', flag: 'r' })
  .split('\n')
  .reduce(
    (result, line) => {
      if (line === '') return [{}, ...result]

      line.split('').forEach(char => (result[0][char] = true))

      return result
    },
    [{}]
  )
  .map(group => Object.keys(group).length)
  .reduce((a, b) => a + b)

console.log(input)
