const fs = require('fs')

const input = fs.readFileSync('input', { encoding: 'utf8', flag: 'r' }).split('\n')

const splitIdx = input.findIndex(x => x === '')

const ruleInput = input.slice(0, splitIdx).map(line => line.split(': '))

const idxB = 58
const idxA = 72

const map = {}

for (const r of ruleInput) {
  map[r[0]] = r[1]
}

// const ab = ['1', '14']

const ab = ['72', '58']

map[ab[0]] = { value: 'a' }
map[ab[1]] = { value: 'b' }

const link = (node, idx, nodes) => {
  if (!node.right) node.right = nodes[idx + 1]
  return node
}

const construct = name => {
  if (map[name].value) return map[name]

  const exp = map[name].split(' ')
  const pipeIdx = exp.findIndex(bit => bit === '|')
  let result
  if (pipeIdx !== -1) {
    result = {
      value: '|',
      children: [
        {
          value: '&',
          children: exp.slice(0, pipeIdx).map(construct)
        },
        {
          value: '&',
          children: exp.slice(pipeIdx + 1).map(construct)
        }
      ]
    }
  } else {
    result = {
      value: '&',
      children: exp.map(construct)
    }
  }

  map[name] = result
  return result
}

const getValues = root => {
  if (root.value === '&')
    return root.children.map(getValues).reduce((a, b) => {
      const result = []
      for (const va of a) for (const vb of b) result.push(va + vb)
      return result
    })

  if (root.value === '|') return root.children.flatMap(getValues)

  return [root.value]
}

const n42 = construct(42)
const n31 = construct(31)

// relevant rule values
const values42 = getValues(n42)
const values31 = getValues(n31)

// from values
const l = values31[0].length

const validate = m => {
  let current = m

  if (current.length % l !== 0) return false

  let count31 = 0

  while (values31.includes(current.slice(-l))) {
    current = current.slice(0, -l)

    count31 += 1
  }

  if (count31 < 1) return false

  let count42 = count31
  while (count42 > 0) {
    if (!values42.includes(current.slice(-l))) return false

    current = current.slice(0, -l)

    count42 -= 1
  }

  do {
    if (!values42.includes(current.slice(-l))) return false

    current = current.slice(0, -l)
  } while (current.length > 0)

  return true
}

const result = input.slice(splitIdx + 1).filter(validate).length

console.log(result)
