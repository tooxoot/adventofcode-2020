const fs = require('fs')

const result = fs
  .readFileSync('input', { encoding: 'utf8', flag: 'r' })
  .split('\n')
  .map(line => line.split(' '))
  .map(([range, letter, pw]) => {
    return {
      lowerBoundry: range.split('-')[0],
      upperBoundry: range.split('-')[1],
      letter: letter[0],
      pw
    }
  })
  .map(entry => {
    const { letter, pw } = entry
    let count = 0

    for (const x of pw) {
      count += x === letter ? 1 : 0
    }

    return { ...entry, count }
  })
  .filter(entry => {
    const { lowerBoundry, upperBoundry, count } = entry

    return count >= lowerBoundry && count <= upperBoundry
  }).length

console.log(result)
