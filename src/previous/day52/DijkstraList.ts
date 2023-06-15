import MinHeap from "./MinHeap"

export default function dijkstra_list(
  source: number,
  sink: number,
  arr: WeightedAdjacencyList
): number[] {
  const prev: number[] = new Array(arr.length).fill(-1)
  const dists: MinHeap = new MinHeap()
  for (let i = 0; i < arr.length; i++) {
    dists.insert()
  }

  dists.insert(0)

  while (dists.length) {
    const curr = dists.delete()
    if(curr)
    
  }
}

function hasUnvisited(seen: boolean[], dists: MinHeap) {
  return seen.some((seen, idx) => !seen && dists.length > 0)
}
