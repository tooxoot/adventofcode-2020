const fs = require('fs')

const input = fs.readFileSync('input', { encoding: 'utf8', flag: 'r' }).split('\n').map(Number)

const getPrevious = currentIdx => input.slice(currentIdx - 25, currentIdx)

const sums = input25 => {
  const result = []
  for (let idx1 = 0; idx1 < input25.length - 1; idx1++) {
    for (let idx2 = idx1 + 1; idx2 < input25.length; idx2++) {
      result.push(input25[idx1] + input25[idx2])
    }
  }
  return result
}

const isSum = currentIdx => sums(getPrevious(currentIdx)).find(sum => sum === input[currentIdx])

for (let idx = 25; idx < input.length; idx++) {
  if (!isSum(idx)) {
    console.log(input[idx])
  }
}
