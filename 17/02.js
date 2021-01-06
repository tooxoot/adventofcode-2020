const input = [
  '####.#..'.split('').map(v => (v === '#' ? 1 : 0)),
  '.......#'.split('').map(v => (v === '#' ? 1 : 0)),
  '#..#####'.split('').map(v => (v === '#' ? 1 : 0)),
  '.....##.'.split('').map(v => (v === '#' ? 1 : 0)),
  '##...###'.split('').map(v => (v === '#' ? 1 : 0)),
  '#..#.#.#'.split('').map(v => (v === '#' ? 1 : 0)),
  '.##...#.'.split('').map(v => (v === '#' ? 1 : 0)),
  '#...##..'.split('').map(v => (v === '#' ? 1 : 0))
]

let ih = Math.floor(input.length / 2)
let l = input.length + 20
let h = Math.floor(l / 2)

const newW = () => 0
const newZ = () => new Array(l).fill().map(newW)
const newY = () => new Array(l).fill().map(newZ)
const newX = () => new Array(l).fill().map(newY)
const newCube = () => new Array(l).fill().map(newX)

let CUBE = newCube()

for (let x = 0; x < input.length; x++) {
  for (let y = 0; y < input[x].length; y++) {
    CUBE[h - ih + x][h - ih + y][h][h] = input[x][y]
  }
}

const p = [-1, 0, 1]
const coords = []

for (const x of p)
  for (const y of p)
    for (const z of p)
      for (const w of p) {
        if ([x, y, z, w].join('') === '0000') continue
        coords.push([x, y, z, w])
      }

const step = () => {
  const toggle = []

  for (let x = 1; x < l - 1; x++)
    for (let y = 1; y < l - 1; y++)
      for (let z = 1; z < l - 1; z++)
        for (let w = 1; w < l - 1; w++) {
          let active = 0

          for (const cs of coords) {
            if (CUBE[x + cs[0]][y + cs[1]][z + cs[2]][w + cs[3]]) active++
          }

          const v = CUBE[x][y][z][w]
          if (v && active !== 2 && active !== 3) toggle.push([x, y, z, w])
          if (!v && active === 3) toggle.push([x, y, z, w])
        }

  toggle.forEach(([x, y, z, w]) => {
    CUBE[x][y][z][w] = CUBE[x][y][z][w] ? 0 : 1
  })
}

for (let idx = 0; idx < 6; idx++) {
  step()
}

let count = 0
for (let x = 0; x < l; x++)
  for (let y = 0; y < l; y++) for (let z = 0; z < l; z++) for (let w = 0; w < l; w++) if (CUBE[x][y][z][w]) count++

console.log(count)
