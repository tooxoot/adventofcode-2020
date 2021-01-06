const fs = require('fs')

const input = fs
  .readFileSync('input', { encoding: 'utf8', flag: 'r' })
  .split('\n')
  .reduce(
    (result, line) => {
      if (line === '') return [[], ...result]

      const newEntries = line.split(' ').map(segment => segment.split(':'))
      result[0].push(...newEntries)

      return result
    },
    [[]]
  )
  .map(Object.fromEntries)

const expectedFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
const isValid = passport => {
  const keys = Object.keys(passport)

  return expectedFields.every(expectedKey => keys.includes(expectedKey))
}

const result = input.filter(isValid).length

console.log(result)
