const fs = require('fs')

const input = fs.readFileSync('input', { encoding: 'utf8', flag: 'r' }).split('\n')
const trees = input.map(line => line.replace(/ /g, ''))

const findR = (s, min) => {
  let depth = 0
  let r
  for (let idx = min + 1; idx < s.length; idx++) {
    r = idx
    if (/\(/.test(s[idx])) depth += 1
    if (/\)/.test(s[idx])) depth -= 1
    if (depth === 0 && /[0-9\)]/.test(s[idx])) break
  }

  return r
}

const findL = (s, max) => {
  let depth = 0
  let l
  for (let idx = max - 1; idx >= 0; idx--) {
    l = idx
    if (/\)/.test(s[idx])) depth += 1
    if (/\(/.test(s[idx])) depth -= 1
    if (depth === 0 && /[0-9\()]/.test(s[idx])) break
  }

  return l
}

const mod = trees.map(line => {
  let nl = line
  for (let idx = 0; idx < nl.length; idx++) {
    if (nl[idx] !== '+') continue
    const r = findR(nl, idx)
    const l = findL(nl, idx)
    nl = nl.slice(0, l) + '(' + nl.slice(l, idx) + '+' + nl.slice(idx + 1, r + 1) + ')' + nl.slice(r + 1)
    idx++
  }

  return nl
})

console.log(mod.map(eval).reduce((a, b) => a + b))

// const results = trees.map(construct).map(evaluate)

// const m = results.map((r, idx) => [input[idx], r])

// m.forEach(([e, r]) => console.log(e, r))

// console.log(result)
