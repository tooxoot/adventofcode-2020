const fs = require('fs')

let circle = '247819356'.split('').map(Number)

let current = 0

const getDestV = v => (v === 1 ? 9 : v - 1)

const move = () => {
  const v = circle[current]

  const idxs = [1, 2, 3].map(s => (current + s) % 9)
  const pick = idxs.map(idx => circle[idx])

  idxs.forEach(idx => (circle[idx] = undefined))
  circle = circle.filter(Boolean)

  let destV = getDestV(v)
  while (pick.includes(destV)) destV = getDestV(destV)

  const dest = circle.findIndex(c => c === destV) + 1

  const s1 = circle.slice(0, dest)
  const s2 = circle.slice(dest)
  circle = [...s1, ...pick, ...s2]

  current = (circle.findIndex(c => c === v) + 1) % 9
}

for (let idx = 0; idx < 100; idx++) {
  move()
}

const s = (circle.findIndex(v => v === 1) + 1) % 9
let result = ''
for (let i = 0; i < 8; i++) {
  result += circle[(s + i) % 9]
}

console.log(result)
