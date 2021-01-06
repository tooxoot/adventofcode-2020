const fs = require('fs')

const e = 'e'
const se = 'se'
const sw = 'sw'
const w = 'w'
const nw = 'nw'
const ne = 'ne'

const pairs = [
  [e, w],
  [se, nw],
  [sw, ne]
]

let input = fs
  .readFileSync('input', { encoding: 'utf8', flag: 'r' })
  .split('\n')
  .map(line => {
    let l = line
    let result = []

    while (l.length) {
      if ('ew'.includes(l[0])) {
        result.push(l[0])
        l = l.slice(1)
      } else {
        result.push(l.slice(0, 2))
        l = l.slice(2)
      }
    }

    return result
  })
  .map(cs => {
    const pos = [0, 0]

    for (const c of cs) {
      switch (c) {
        case e:
          pos[0] += 1
          break
        case se:
          pos[0] += 1
          pos[1] -= 1
          break
        case sw:
          pos[1] -= 1
          break
        case w:
          pos[0] -= 1
          break
        case nw:
          pos[0] -= 1
          pos[1] += 1
          break
        case ne:
          pos[1] += 1
          break
        default:
          console.error(c)
      }
    }

    return pos.join(',')
  })

for (let idx1 = 0; idx1 < input.length; idx1++) {
  const line1 = input[idx1]
  if (!line1) continue

  const idx2 = input.findIndex((line2, idx2) => idx2 !== idx1 && line1 === line2)

  if (idx2 !== -1) {
    input[idx1] = undefined
    input[idx2] = undefined
  }
}

input = input.filter(Boolean)

const d = 1000
const grid = new Array(d).fill().map(_ => new Array(d))

input.forEach(s => {
  const [x, y] = s.split(',').map(Number)
  grid[x + d / 2][y + d / 2] = 1
})

const deltas = [
  [-1, 1],
  [0, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, 0]
]

const step = () => {
  const toggle = []

  for (let x = 1; x < d - 1; x++) {
    for (let y = 1; y < d - 1; y++) {
      const active = deltas.map(([dx, dy]) => grid[x + dx][y + dy]).filter(Boolean).length

      if (grid[x][y] && (active === 0 || active > 2)) toggle.push([x, y])
      if (!grid[x][y] && active === 2) toggle.push([x, y])
    }
  }

  toggle.forEach(([x, y]) => {
    grid[x][y] = grid[x][y] ? 0 : 1
  })
}

for (let i = 0; i < 100; i++) {
  step()
}

let count = 0

for (let x = 0; x < d; x++) for (let y = 0; y < d; y++) if (grid[x][y]) count++

console.log(count)
