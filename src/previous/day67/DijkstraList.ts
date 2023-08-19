import MinHeap from "./MinHeap"

export default function dijkstra_list(
  source: number,
  sink: number,
  arr: WeightedAdjacencyList
): number[] {
  const minheap = new MinHeap()
  const prev: number[] = new Array(arr.length).fill(-1)
  const dists: number[] = new Array(arr.length).fill(Infinity)
  dists[source] = 0
  minheap.insert(source)

  while (minheap.length) {
    const curr = minheap.delete()

    const list = arr[curr]
    for (let i = 0; i < list.length; i++) {
      const { to: edge, weight } = list[i]
      const dist = dists[curr] + weight
      if (dist >= dists[edge]) continue
      dists[edge] = dist
      prev[edge] = curr
      minheap.insert(edge)
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

// function hasUnvisited(seen: boolean[], dists: number[]): boolean {
//   return seen.some((item, idx) => !item && dists[idx] < Infinity)
// }

// function getLowestUnvisited(seen: boolean[], dists: number[]): number {
//   let lowest = Infinity
//   let idx = 0

//   for (let i = 0; i < seen.length; i++) {
//     if (seen[i]) continue
//     if (dists[i] >= lowest) continue
//     idx = i
//     lowest = dists[i]
//   }
//   return idx
// }
