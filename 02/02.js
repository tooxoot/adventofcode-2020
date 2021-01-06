const fs = require('fs')

const result = fs
  .readFileSync('input', { encoding: 'utf8', flag: 'r' })
  .split('\n')
  .map(line => line.split(' '))
  .map(([range, letter, pw]) => {
    return {
      pos1: Number(range.split('-')[0]) - 1,
      pos2: Number(range.split('-')[1]) - 1,
      letter: letter[0],
      pw
    }
  })
  .filter(entry => {
    const { pos1, pos2, letter, pw } = entry

    let count = 0

    count += pw[pos1] === letter ? 1 : 0
    count += pw[pos2] === letter ? 1 : 0

    return count === 1
  }).length

console.log(result)
