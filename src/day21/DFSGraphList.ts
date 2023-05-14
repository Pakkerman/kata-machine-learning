// 07
function traverse(
    graph: WeightedAdjacencyList,
    curr: number,
    needle: number,
    seen: boolean[],
    path: number[],
): boolean {
    if (seen[curr]) return false

    seen[curr] = true
    path.push(curr)
    if (curr === needle) return true

    const list = graph[curr]
    for (let i = 0; i < list.length; i++) {
        const edge = list[i].to
        if (seen[edge]) continue
        if (traverse(graph, edge, needle, seen, path)) return true
    }

    path.pop()
    return false
}

export default function dfs(
    graph: WeightedAdjacencyList,
    source: number,
    needle: number,
): number[] | null {
    const seen: boolean[] = new Array(graph.length).fill(false)
    const path: number[] = []
    traverse(graph, source, needle, seen, path)

    if (path.length === 0) return null

    return path
}
