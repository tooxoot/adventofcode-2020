const fs = require('fs')

const input = fs
  .readFileSync('input', { encoding: 'utf8', flag: 'r' })
  .split('\n')
  .map(line => line.replace(/ /g, '').split(''))

const calculate = exp => {
  let idx = 0
  let ROOT = {}

  const construct = root => {
    if (/\d/.test(exp[idx])) {
      const node = { value: Number(exp[idx++]) }

      if (!root.left) root.left = node
      else root.right = node

      construct(root)
    }

    if (/[*+]/.test(exp[idx])) {
      if (root.left && root.right) {
        root.left = { ...root }
        root.right = undefined
        root.op = exp[idx++]
      } else {
        root.op = exp[idx++]
      }
      construct(root)
    }

    if (/\(/.test(exp[idx])) {
      const node = {}
      idx++
      construct(node)

      if (!root.left) root.left = node
      else root.right = node

      idx++
      construct(root)
    }
  }

  const ops = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b
  }

  const evaluate = root => {
    if (!root.op) return root.value
    return ops[root.op](evaluate(root.left), evaluate(root.right))
  }

  construct(ROOT)
  return evaluate(ROOT)
}

const result = input.map(calculate).reduce((a, b) => a + b)

console.log(result)
