export default function bfs(
  graph: WeightedAdjacencyMatrix,
  source: number,
  needle: number
): number[] | null {
  const queue: Array<number> = [source]
  const prev: Array<number> = new Array(graph.length).fill(-1)
  const seen: Array<boolean> = new Array(graph.length).fill(false)
  seen[source] = true

  while (queue.length) {
    const curr = queue.shift() as number

    const adjs = graph[curr]
    for (let i = 0; i < adjs.length; i++) {
      if (adjs[i] === 0) continue
      if (seen[i]) continue
      seen[i] = true
      prev[i] = curr
      queue.push(i)
    }
  }

  if (prev[needle] === -1) return null

  const out: Array<number> = []
  let curr = needle
  while (prev[curr] !== -1) {
    out.push(curr)
    curr = prev[curr]
  }
  out.push(source)
  return out.reverse()
}