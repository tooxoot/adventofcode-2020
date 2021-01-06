const fs = require('fs')

const input = fs.readFileSync('input', { encoding: 'utf8', flag: 'r' }).split('\n')

const tiles = []
for (const line of input) {
  if (line === '') {
    continue
  } else if (line.startsWith('Tile')) {
    id = line.match(/\d+/)[0]
    tiles.push({ id, img: [] })
  } else {
    tiles[tiles.length - 1].img.push(line)
  }
}

const getEdges = img => {
  const edges = []

  edges.push(img[0])

  let l = ''
  let r = ''
  for (const line of img) {
    l += line[0]
    r += line[line.length - 1]
  }
  edges.push(r)
  edges.push(img[img.length - 1])
  edges.push(l)

  return edges
}

for (const tile of tiles) {
  tile.edges = getEdges(tile.img)
}

const compare = (edges1, edges2) => {
  const rEdges1 = edges1.map(e => e.split('').reverse().join(''))

  // let idx = edges1.findIndex(e => edges2.includes(e))
  let idxs = edges1.map((e1, i1) => [i1 + 1, edges2.findIndex(e2 => e1 === e2) + 1]).filter(([, i2]) => i2 > 0)

  if (idxs.length) return idxs.flat()

  idxs = rEdges1.map((e1, i1) => [-(i1 + 1), edges2.findIndex(e2 => e1 === e2) + 1]).filter(([, i2]) => i2 > 0)

  if (idxs.length) return idxs.flat()

  return undefined
}

const getMatches = tile => {
  tile.matches = tiles
    .map(tile2 => (tile.id === tile2.id ? [, 0] : [tile2.id, compare(tile.edges, tile2.edges)]))
    .filter(([, c]) => Boolean(c))
}

tiles.forEach(getMatches)

const tMap = {}

for (const tile of tiles) {
  tMap[tile.id] = tile
}

const rotateL = tile => {
  const img = tile.img
  const newImg = new Array(10).fill('')

  for (let lIdx = 0; lIdx < 10; lIdx++) {
    for (let cIdx = 0; cIdx < 10; cIdx++) {
      newImg[9 - cIdx] = newImg[9 - cIdx] + img[lIdx][cIdx]
    }
  }

  tile.img = newImg
  tile.matches = tile.matches.map(([id, [e1, e2]]) => {
    const s = Math.sign(e1)
    const a = Math.abs(e1)

    switch (a) {
      case 1:
        return [id, [s * -1 * 4, e2]]
      case 2:
        return [id, [s * 1, e2]]
      case 3:
        return [id, [s * -1 * 2, e2]]
      case 4:
        return [id, [s * 3, e2]]
      default:
        console.error(e1)
    }
  })
}

const rotateR = tile => {
  const img = tile.img
  const newImg = new Array(10).fill('')

  for (let lIdx = 0; lIdx < 10; lIdx++) {
    for (let cIdx = 0; cIdx < 10; cIdx++) {
      newImg[cIdx] = img[lIdx][cIdx] + newImg[cIdx]
    }
  }

  tile.img = newImg
  tile.matches = tile.matches.map(([id, [e1, e2]]) => {
    const s = Math.sign(e1)
    const a = Math.abs(e1)

    switch (a) {
      case 1:
        return [id, [s * 2, e2]]
      case 2:
        return [id, [s * -1 * 3, e2]]
      case 3:
        return [id, [s * 4, e2]]
      case 4:
        return [id, [s * -1 * 1, e2]]
    }
  })
}

const flipV = tile => {
  const img = tile.img
  const newImg = new Array(10).fill('')

  for (let lIdx = 0; lIdx < 10; lIdx++) {
    newImg[9 - lIdx] = img[lIdx]
  }

  tile.img = newImg
  tile.matches = tile.matches.map(([id, [e1, e2]]) => {
    const s = Math.sign(e1)
    const a = Math.abs(e1)

    switch (a) {
      case 1:
        return [id, [s * 3, e2]]
      case 2:
        return [id, [s * -1 * 2, e2]]
      case 3:
        return [id, [s * 1, e2]]
      case 4:
        return [id, [s * -1 * 4, e2]]
    }
  })
}

const flipH = tile => {
  const img = tile.img
  const newImg = new Array(10).fill('')

  for (let lIdx = 0; lIdx < 10; lIdx++) {
    for (let cIdx = 0; cIdx < 10; cIdx++) {
      newImg[lIdx] = img[lIdx][cIdx] + newImg[lIdx]
    }
  }

  tile.img = newImg
  tile.matches = tile.matches.map(([id, [e1, e2]]) => {
    const s = Math.sign(e1)
    const a = Math.abs(e1)

    switch (a) {
      case 1:
        return [id, [s * -1 * 1, e2]]
      case 2:
        return [id, [s * 4, e2]]
      case 3:
        return [id, [s * -1 * 3, e2]]
      case 4:
        return [id, [s * 2, e2]]
    }
  })
}

const nop = () => {}

const rotateMatches = (tile, e) => {
  tile.matches.forEach(([id, [e1, e2]]) => {
    const a = Math.abs(e1)
    if (a !== e || ![2, 3].includes(a)) return

    const s = Math.sign(e1)
    const match = tMap[id]
    const code = a * 10 + e2

    let diff
    let rotate = nop
    let flip = nop

    switch (code) {
      case 21:
        rotate = rotateL
        diff = 1
        if (s > 0) flip = flipV
        break
      case 22:
        rotate = rotateL
        diff = 2
        if (s > 0) flip = flipV
        break
      case 23:
        rotate = rotateR
        diff = 1
        if (s < 0) flip = flipV
        break
      case 24:
        diff = 0
        if (s < 0) flip = flipV
        break

      case 31:
        diff = 0
        if (s < 0) flip = flipH
        break
      case 32:
        rotate = rotateL
        diff = 1
        if (s < 0) flip = flipH
        break
      case 33:
        rotate = rotateR
        diff = 2
        if (s > 0) flip = flipH
        break
      case 34:
        rotate = rotateR
        diff = 1
        if (s > 0) flip = flipH
        break

      default:
        console.error(code)
    }

    for (let idx = 0; idx < diff; idx++) {
      rotate(match)
    }

    if (flip) {
      flip(match)
    }

    match.matches = match.matches.filter(m => [2, 3].includes(Math.abs(m[1][0])))
  })
}

const getRMatch = tile => tile.matches.find(m => m[1][0] === 2 || m[1][0] === -2)
const getDMatch = tile => tile.matches.find(m => m[1][0] === 3 || m[1][0] === -3)

const lines = new Array(12).fill(0).map(_ => [])
lines[0][0] = '2207'

let current = tMap[2207]
for (let idx = 0; idx < 11; idx++) {
  rotateMatches(current, 3)
  const [id] = getDMatch(current)
  lines[idx + 1].push(id)
  current = tMap[id]
}

for (let idx = 0; idx < 12; idx++) {
  let current = tMap[lines[idx][0]]

  for (let _ = 0; _ < 11; _++) {
    rotateMatches(current, 2)
    const [id] = getRMatch(current)
    lines[idx].push(id)
    current = tMap[id]
  }
}

for (const tile of tiles) {
  tile.img = tile.img.slice(1, -1).map(line => line.slice(1, -1))
}

let IMG = new Array(12 * 8).fill(0).map(_ => '')

for (let lIdx = 0; lIdx < lines.length; lIdx++) {
  for (let cIdx = 0; cIdx < lines[lIdx].length; cIdx++) {
    for (let iIdx = 0; iIdx < 8; iIdx++) {
      IMG[lIdx * 8 + iIdx] += tMap[lines[lIdx][cIdx]].img[iIdx]
    }
  }
}

for (let idx = 0; idx < IMG.length; idx++) {
  IMG[idx] = IMG[idx].replace(/\./g, ' ')
}

const rotateImg = img => {
  const newImg = new Array(12 * 8).fill('')

  for (let lIdx = 0; lIdx < 12 * 8; lIdx++) {
    for (let cIdx = 0; cIdx < 12 * 8; cIdx++) {
      newImg[cIdx] = img[lIdx][cIdx] + newImg[cIdx]
    }
  }

  return newImg
}

const flipVImg = img => {
  const newImg = new Array(12 * 8).fill('')

  for (let lIdx = 0; lIdx < 12 * 8; lIdx++) {
    newImg[12 * 8 - 1 - lIdx] = img[lIdx]
  }

  return newImg
}

const flipHImg = img => {
  const newImg = new Array(12 * 8).fill('')

  for (let lIdx = 0; lIdx < 12 * 8; lIdx++) {
    for (let cIdx = 0; cIdx < 12 * 8; cIdx++) {
      newImg[lIdx] = img[lIdx][cIdx] + newImg[lIdx]
    }
  }

  return newImg
}

const imgs = []
imgs[0] = IMG
imgs[1] = flipVImg(IMG)
imgs[2] = flipHImg(IMG)

imgs[3] = rotateImg(imgs[0])
imgs[4] = flipVImg(imgs[3])
imgs[5] = flipHImg(imgs[3])

imgs[6] = rotateImg(imgs[3])
imgs[7] = flipVImg(imgs[6])
imgs[8] = flipHImg(imgs[6])

imgs[9] = rotateImg(imgs[6])
imgs[10] = flipVImg(imgs[9])
imgs[11] = flipHImg(imgs[9])

const addMoinster = (img, lIdx, cIdx) => {
  let [l1, l2, l3] = img.slice(lIdx, lIdx + 3)
  l1 = l1.split('')
  l2 = l2.split('')
  l3 = l3.split('')

  const m1 = '..................#.'
  const m2 = '#....##....##....###'
  const m3 = '.#..#..#..#..#..#...'

  for (let idx = 0; idx < m1.length; idx++) {
    l1[cIdx + idx] = m1[idx] === '#' ? 'O' : l1[cIdx + idx]
  }

  for (let idx = 0; idx < m2.length; idx++) {
    l2[cIdx + idx] = m2[idx] === '#' ? 'O' : l2[cIdx + idx]
  }

  for (let idx = 0; idx < m2.length; idx++) {
    l3[cIdx + idx] = m3[idx] === '#' ? 'O' : l3[cIdx + idx]
  }

  img[lIdx] = l1.join('')
  img[lIdx + 1] = l2.join('')
  img[lIdx + 2] = l3.join('')
}

const findInLine = (img, lIdx) => {
  const m1 = /^..................#./
  const m2 = /^#....##....##....###/
  const m3 = /^.#..#..#..#..#..#.../

  let found = 0
  for (let cIdx = 0; cIdx < 12 * 8; cIdx++) {
    const [l1, l2, l3] = img.slice(lIdx, lIdx + 3).map(l => l.slice(cIdx))

    if (m1.test(l1) && m2.test(l2) && m3.test(l3)) {
      found++
      addMoinster(img, lIdx, cIdx)
    }
  }

  return found
}

const findInImg = img => {
  let found = 0

  for (let lIdx = 0; lIdx < 12 * 8 - 2; lIdx++) {
    found += findInLine(img, lIdx)
  }

  return found
}

const findings = imgs.map(findInImg)

console.log(imgs[9].join('\n'))

let count = 0

for (const line of imgs[9]) {
  count += line.replace(/[^#]/g, '').length
}

console.log(count)
