const tStep = (v, x) => {
  return (v * x) % 20201227
}

const transform = (x, loops) => {
  let v = 1

  for (let idx = 0; idx < loops; idx++) {
    v = tStep(v, x)
  }

  return v
}

const findLoops = public => {
  let v = 1
  for (let guess = 0; guess < 1000000000000; guess++) {
    if (v === public) return guess
    v = tStep(v, 7)
  }

  throw 'not enough guesses'
}

const cardPK = 10604480
const doorPK = 4126658

const cardLoops = findLoops(cardPK)
const doorLoops = findLoops(doorPK)

const cardEK = transform(doorPK, cardLoops)
const doorEK = transform(cardPK, doorLoops)

if (cardEK !== doorEK) throw `unequal encryption keys: ${cardEK} ${doorEK}`

console.log(cardEK)
