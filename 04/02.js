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

const isHgtValid = hgt => {
  const unit = hgt.slice(-2)
  const hgtNum = Number(hgt.slice(0, -2))

  if (unit === 'cm') return hgtNum >= 150 && hgtNum <= 193
  else if (unit === 'in') return hgtNum >= 59 && hgtNum <= 76
  else return false
}

const isValid = ({ byr, iyr, eyr, hgt, hcl, ecl, pid }) => {
  const hasAllFields = [byr, iyr, eyr, hgt, hcl, ecl, pid].every(Boolean)

  return (
    hasAllFields &&
    Number(byr) >= 1920 &&
    Number(byr) <= 2002 &&
    Number(iyr) >= 2010 &&
    Number(iyr) <= 2020 &&
    Number(eyr) >= 2020 &&
    Number(eyr) <= 2030 &&
    /^\d\d\d?(cm|in)$/.test(hgt) &&
    isHgtValid(hgt) &&
    /^#(\d|[a-f]){6}$/.test(hcl) &&
    ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(ecl) &&
    /^\d{9}$/.test(pid)
  )
}

const result = input.filter(isValid).length

console.log(result)
