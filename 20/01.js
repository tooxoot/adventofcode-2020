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

  let idx = edges1.findIndex(e => edges2.includes(e))

  if (idx > -1) return idx + 1

  idx = rEdges1.findIndex(e => edges2.includes(e))

  if (idx > -1) return -(idx + 1)

  return 0
}

const getMatches = tile => {
  tile.matches = tiles
    .map(tile2 => (tile.id === tile2.id ? [, 0] : [tile2.id, compare(tile.edges, tile2.edges)]))
    .filter(([, c]) => Boolean(c))
}

tiles.forEach(getMatches)

console.log(
  tiles
    .filter(t => t.matches.length === 2)
    .map(t => Number(t.id))
    .reduce((a, b) => a * b)
)
