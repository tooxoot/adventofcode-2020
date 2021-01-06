const fs = require('fs')

const input = fs
  .readFileSync('input', { encoding: 'utf8', flag: 'r' })
  .split('\n')
  .map((line, _, arr) => {
    return line
      .split('')
      .map(char => (char === '#' ? 1 : 0))
      .map(v => {
        const zCol = new Array(arr.length).fill(0)
        zCol[Math.floor(arr.length / 2)] = v
        return zCol
      })
  })

const addDim = input => {
  const l = input.length

  // add 2 z layers
  for (let x = 0; x < l; x++)
    for (let y = 0; y < l; y++) {
      const zCol = input[x][y]
      zCol.push(0)
      zCol.unshift(0)
    }

  const getZCol = () => new Array(l + 2).fill(0)

  for (let x = 0; x < l; x++) {
    const yL = input[x]
    yL.push(getZCol())
    yL.unshift(getZCol())
  }

  const getYL = () => new Array(l + 2).fill().map(getZCol)

  input.push(getYL())
  input.unshift(getYL())
}

for (let idx = 0; idx < 10; idx++) {
  addDim(input)
}

const l = input.length

const get = (x, y, z) => {
  if (!input[x]) return 0
  if (!input[x][y]) return 0
  return input[x][y][z]
}

const step = () => {
  const toggle = []

  for (let x = 0; x < l; x++)
    for (let y = 0; y < l; y++)
      for (let z = 0; z < l; z++) {
        const coords = [
          [-1, -1, -1],
          [0, -1, -1],
          [1, -1, -1],
          [-1, 0, -1],
          [0, 0, -1],
          [1, 0, -1],
          [-1, 1, -1],
          [0, 1, -1],
          [1, 1, -1],
          [-1, -1, 0],
          [0, -1, 0],
          [1, -1, 0],
          [-1, 0, 0],
          [1, 0, 0],
          [-1, 1, 0],
          [0, 1, 0],
          [1, 1, 0],
          [-1, -1, 1],
          [0, -1, 1],
          [1, -1, 1],
          [-1, 0, 1],
          [0, 0, 1],
          [1, 0, 1],
          [-1, 1, 1],
          [0, 1, 1],
          [1, 1, 1]
        ]

        const ps = coords.map(cs => get(x + cs[0], y + cs[1], z + cs[2]))

        const active = ps.filter(Boolean).length

        const v = get(x, y, z)
        if (v && ![2, 3].includes(active)) toggle.push([x, y, z])
        if (!v && active === 3) toggle.push([x, y, z])
      }

  toggle.forEach(([x, y, z]) => (input[x][y][z] = input[x][y][z] ? 0 : 1))
}

for (let idx = 0; idx < 6; idx++) {
  step()
}

let count = 0
for (let x = 0; x < l; x++) for (let y = 0; y < l; y++) for (let z = 0; z < l; z++) if (input[x][y][z]) count++

console.log(count)
