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

const myticket = input[myTicketIdx].split(',').map(Number)
const tickets = input.slice(ticketsIdx).map(ticket => ticket.split(',').map(Number))

const boungindRules = rules.map(({ inBounds }) => inBounds)
const isValid = v =>
  boungindRules.some(inBounds => {
    return inBounds(v)
  })

const result = tickets
  .flat()
  .filter(v => !isValid(v))
  .reduce((a, b) => a + b)

console.log(result)
