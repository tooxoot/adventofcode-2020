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

console.log(input.length)
