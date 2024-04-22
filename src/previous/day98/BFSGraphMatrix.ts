export default function bfs(
  graph: WeightedAdjacencyMatrix,
  source: number,
  needle: number
): number[] | null {
  const queue: number[] = [source]
  const seen: boolean[] = Array(graph.length).fill(false)
  const prev: number[] = Array(graph.length).fill(-1)

  while (queue.length) {
    const curr = queue.shift()!
    const adjs = graph[curr]

    if (needle === curr) break

    for (let i = 0; i < adjs.length; i++) {
      if (adjs[i] === 0 || seen[i]) continue

      prev[i] = curr
      seen[i] = true
      queue.push(i)
    }
  }

  if (prev[needle] === -1) return null

  const out: number[] = []
  let curr = needle
  while (prev[curr] !== -1) {
    out.push(curr)
    curr = prev[curr]
  }
  out.push(source)
  return out.reverse()
}
