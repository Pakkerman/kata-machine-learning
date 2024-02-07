export default function dijkstra_list(
  source: number,
  sink: number,
  arr: WeightedAdjacencyList
): number[] {
  const seen: boolean[] = new Array(arr.length).fill(false)
  const prev: number[] = new Array(arr.length).fill(-1)
  const dists: number[] = new Array(arr.length).fill(Infinity)
  dists[source] = 0

  while (hasUnvisited(seen, dists)) {
    const curr = getLowerstUnvisited(seen, dists)
    seen[curr] = true
    const list = arr[curr]
    for (let i = 0; i < list.length; i++) {
      const { to: edge, weight } = list[i]
      const dist = dists[curr] + weight
      if (dists[edge] <= dist) continue

      dists[edge] = dist
      prev[edge] = curr
    }
  }

  const out: number[] = []
  let curr = sink
  while (prev[curr] !== -1) {
    out.push(curr)
    curr = prev[curr]
  }

  out.push(source)
  return out.reverse()
}

function getLowerstUnvisited(seen: boolean[], dists: number[]): number {
  let lowest = Infinity
  let idx = -1
  for (let i = 0; i < seen.length; i++) {
    if (seen[i]) continue
    if (dists[i] < lowest) {
      lowest = dists[i]
      idx = i
    }
  }

  return idx
}

function hasUnvisited(seen: boolean[], dists: number[]): boolean {
  // some(): if any item in array is true, return true
  // if any seen element is false we do !seen[i] and that will be true, and then some() will return true
  // && if both true will return true
  // if haven't seen(!seen[i]) and the dists[i] is not infinity, (infiity means we have not go the the node and process it),
  // found: this function will have issue if there is an unconnected node
  return seen.some((item, idx) => !item && dists[idx] !== Infinity)
}
