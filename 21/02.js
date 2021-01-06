const fs = require('fs')

const input = fs
  .readFileSync('input', { encoding: 'utf8', flag: 'r' })
  .split('\n')
  .map(line => line.split('(contains '))
  .map(([i, a]) => {
    return {
      ingredients: i.trim().split(' '),
      alergenes: a.slice(0, -1).split(', ')
    }
  })

const is = []
const as = []

const iMap = {}
const aMap = {}

for (const food of input) {
  for (const i of food.ingredients) {
    if (!is.includes(i)) is.push(i)
    if (!iMap[i]) iMap[i] = { count: 1 }
    else iMap[i].count++
  }

  for (const a of food.alergenes) {
    if (!as.includes(a)) as.push(a)
    if (!aMap[a]) aMap[a] = { count: 1 }
    else aMap[a].count++
  }
}

for (const a of as) {
  const dupes = {}
  const foods = input.filter(food => food.alergenes.includes(a))

  for (const food of foods) {
    for (const i of food.ingredients) {
      if (!dupes[i]) dupes[i] = 1
      else dupes[i]++
    }
  }

  for (const i of is) {
    if (dupes[i] < aMap[a].count) delete dupes[i]
  }

  aMap[a].dupes = dupes
}

const isSolved = () => {
  for (const a of as) {
    if (!aMap[a].ingredient) return false
  }
  return true
}

while (!isSolved()) {
  for (const a of as) {
    const keys = Object.keys(aMap[a].dupes)
    if (keys.length === 1) {
      const ingredient = keys[0]
      aMap[a].ingredient = ingredient

      iMap[ingredient].isDangerous = true
      iMap[ingredient].alergene = a

      for (const a of as) delete aMap[a].dupes[ingredient]
    }
  }
}

as.sort()

const dangerous = []

for (const a of as) {
  dangerous.push(aMap[a].ingredient)
}

console.log(dangerous.join(','))
