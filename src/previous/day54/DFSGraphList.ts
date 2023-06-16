function search(
  graph: WeightedAdjacencyList,
  curr: number,
  needle: number,
  seen: boolean[],
  path: number[]
): boolean {
  if (seen[curr]) return false

  path.push(curr)
  seen[curr] = true
  if (curr === needle) return true

  const list = graph[curr]
  for (let i = 0; i < list.length; i++) {
    const edge = list[i].to
    if (search(graph, edge, needle, seen, path)) return true
  }
  path.pop()
  return false
}

export default function dfs(
  graph: WeightedAdjacencyList,
  source: number,
  needle: number
): number[] | null {
  const path: number[] = []
  const seen: boolean[] = new Array(graph.length).fill(false)
  search(graph, source, needle, seen, path)

  return path.length ? path : null
}
