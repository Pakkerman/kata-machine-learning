import MinHeap from "./MinHeap"

export default function dijkstra_list(
  source: number,
  sink: number,
  arr: WeightedAdjacencyList
): number[] {
  const seen: boolean[] = new Array(arr.length).fill(false)
  const prev: number[] = new Array(arr.length).fill(-1)
  const dists: number[] = new Array(arr.length).fill(Infinity)
  dists[source] = 0

  const heap = new MinHeap()
  heap.insert(source)

  while (heap.length) {
    // getting the smallest number, which is always on the top of the minheap
    const curr = heap.delete()

    seen[curr] = true
    const list = arr[curr]
    for (let i = 0; i < list.length; i++) {
      const { to: edge, weight } = list[i]
      if (seen[edge]) continue
      const dist = dists[curr] + weight
      if (dist < dists[edge]) {
        dists[edge] = dist
        prev[edge] = curr
        // Only when the edge is unvisited will come to this point,
        // and by inserting into the heap, if it is the smallest new number,
        // will automatically bubble to the top.
        heap.insert(edge)
      }
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
