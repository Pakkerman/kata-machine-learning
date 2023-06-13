export default function prims(
  list: WeightedAdjacencyList
): WeightedAdjacencyList | null {
  const newList: WeightedAdjacencyList = []
  const seen: boolean[] = new Array(list.length).fill(false)
  seen[0] = true

  while (seen.some((s) => !s)) {
    const curr = getLowestUnvisited(seen, list)
    break
  }

  return null
}

function getLowestUnvisited(
  seen: boolean[],
  list: WeightedAdjacencyList
): number {
  let lowestWeight = Infinity
  let edge = -1

  for (let i = 0; i < seen.length; i++) {
    if (!seen[i]) continue
    let k = 0
    while (list[i][k]) {
      if (list[i][k].weight < lowestWeight) {
        lowestWeight = list[i][k].weight
        edge = list[i][k].to
      }
      k++
    }
  }

  return edge
}
// smallest edge connected to a unvisited node
