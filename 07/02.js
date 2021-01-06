const fs = require('fs')

const colorMap = {}

const input = fs
  .readFileSync('input', { encoding: 'utf8', flag: 'r' })
  .split('\n')
  .map(line =>
    line
      .replace(/ bags?|,|\.| contain/g, '')
      .split(/(\d)/)
      .map(code => code.trim().replace(' ', ''))
  )
  .forEach(rule => {
    const key = rule[0]
    const values = []

    for (let idx = 1; idx < rule.length; idx += 2) {
      values.push([Number(rule[idx]), rule[idx + 1]])
    }

    if (colorMap[key]) {
      colorMap[key].push(...values)
    } else {
      colorMap[key] = values
    }
  })

const sumChildren = value => {
  return value.reduce((result, [count, color]) => {
    const subSum = colorMap[color] ? sumChildren(colorMap[color]) : 0

    return result + count + count * subSum
  }, 0)
}

let count = sumChildren(colorMap['shinygold'])

console.log(count)
