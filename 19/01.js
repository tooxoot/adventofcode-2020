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

// const ab = ['4', '5']

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

const root = construct(0)

const values = getValues(root)

const result = input.slice(splitIdx + 1).filter(v => values.includes(v)).length

console.log(result)
