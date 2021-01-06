const earliestDeparture = 1005162
const ids = '19,x,x,x,x,x,x,x,x,41,x,x,x,x,x,x,x,x,x,823,x,x,x,x,x,x,x,23,x,x,x,x,x,x,x,x,17,x,x,x,x,x,x,x,x,x,x,x,29,x,443,x,x,x,x,x,37,x,x,x,x,x,x,13'
  .split(',')
  .map(Number)
  .filter(Boolean)

let nextId = undefined
let time = earliestDeparture

while (!nextId) {
  nextId = ids.find(id => time % id === 0)
  time += 1
}

console.log(nextId * (time - 1 - earliestDeparture))
