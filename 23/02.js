const fs = require('fs')

const l = 1000000

let circle = new Array(l).fill().map((_, idx) => ({ value: idx + 1, next: undefined }))
circle.forEach((l, idx, arr) => (l.next = arr[idx + 1]))
circle[l - 1].next = circle[0]

'247819356'
  .split('')
  .map(Number)
  .forEach((v, idx) => (circle[idx].value = v))

const vMap = Object.fromEntries(Object.values(circle).map(v => [v.value, v]))

let current = circle[0]

const getDestV = v => (v === 1 ? l : v - 1)

const move = () => {
  const v = current.value

  const pick = [current.next, current.next.next, current.next.next.next]
  const pickVs = pick.map(({ value }) => value)

  current.next = pick[2].next

  let destV = getDestV(v)
  while (pickVs.includes(destV)) destV = getDestV(destV)

  const dest = vMap[destV]

  const next = dest.next
  dest.next = pick[0]
  pick[2].next = next

  current = current.next
}

for (let idx = 0; idx < 10000000; idx++) {
  move()
}

const c1 = vMap[1].next.value
const c2 = vMap[1].next.next.value

let result = c1 * c2

console.log(result)
