function traverse(
    graph: WeightedAdjacencyList,
    curr: number,
    needle: number,
    seen: boolean[],
    path: number[],
): boolean {
    if (curr === needle) return true
    if (seen[curr]) return false

    path.push(curr)
    seen[curr] = true

    const list = graph[curr]
    for (let i = 0; i < list.length; i++) {
        const edge = list[i].to
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

    if (!traverse(graph, source, needle, seen, path)) return null
    path.push(needle)
    return path
}
