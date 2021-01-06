const ids = '19,x,x,x,x,x,x,x,x,41,x,x,x,x,x,x,x,x,x,823,x,x,x,x,x,x,x,23,x,x,x,x,x,x,x,x,17,x,x,x,x,x,x,x,x,x,x,x,29,x,443,x,x,x,x,x,37,x,x,x,x,x,x,13'
  .split(',')
  .map(Number)

// distances between 443 / 823 and the other numbers are dictating following factors
const a = 37 * 29 * 17 * 823 * 19
const b = 13 * 443 * 41 * 23

let step = a
let time = a

const check = time => (time + 31) % b === 0

while (!check(time)) {
  time += step
}

console.log(time - 19)
