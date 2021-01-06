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
      values.push([rule[idx], rule[idx + 1]])
    }

    if (colorMap[key]) {
      colorMap[key].push(...values)
    } else {
      colorMap[key] = values
    }
  })

const findGold = value => {
  const hasGold = value.some(([, color]) => color === 'shinygold')

  if (hasGold) return true

  return value.some(([, color]) => (colorMap[color] ? findGold(colorMap[color]) : false))
}

let count = 0

Object.keys(colorMap).forEach(key => {
  if (findGold(colorMap[key])) count++
})

console.log(count)
