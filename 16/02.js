const fs = require('fs')

const input = fs.readFileSync('input', { encoding: 'utf8', flag: 'r' }).split('\n')

const myTicketIdx = input.findIndex(line => line === 'your ticket:') + 1
const lastRuleIdx = myTicketIdx - 2
const ticketsIdx = input.findIndex(line => line === 'nearby tickets:') + 1

const rules = input.slice(0, lastRuleIdx).map(line => {
  const [name, ranges] = line.split(': ')

  const [range1, range2] = ranges.split(' or ')
  const [min1, max1] = range1.split('-').map(Number)
  const [min2, max2] = range2.split('-').map(Number)

  const inBounds = v => (v >= min1 && v <= max1) || (v >= min2 && v <= max2)

  return { name, min1, min1, min2, min2, inBounds }
})

const names = rules.map(rule => rule.name)

const rulesMap = {}
for (const rule of rules) {
  rulesMap[rule.name] = rule
}

const myticket = input[myTicketIdx].split(',').map(Number)
const tickets = input.slice(ticketsIdx).map(ticket => ticket.split(',').map(Number))

const boungindRules = rules.map(({ inBounds }) => inBounds)
const isValid = v =>
  boungindRules.some(inBounds => {
    return inBounds(v)
  })

const validTickets = tickets.filter(ticket => ticket.every(v => isValid(v)))

// investigation found only one invalid rule per value in ticket
const invalidNames = validTickets
  .map(line =>
    line.map(v => {
      const { name } = rules.find(rule => !rule.inBounds(v)) || {}
      return name
    })
  )
  .reduce(
    (result, names) => {
      names.forEach((name, idx) => {
        if (name) result[idx].push(name)
      })
      return result
    },
    names.map(_ => [])
  )

let validNames = invalidNames.map(arr => names.filter(name => !arr.includes(name)))

const arrangement = []

while (validNames.some(arr => arr.length > 0)) {
  const idx = validNames.findIndex(arr => arr.length === 1)
  const name = validNames[idx][0]
  arrangement[idx] = name

  validNames = validNames.map(arr => arr.filter(n => n !== name))
}

const result = arrangement
  .map((name, idx) => (name.startsWith('departure') ? myticket[idx] : 1))
  .reduce((a, b) => a * b)
console.log(result)
