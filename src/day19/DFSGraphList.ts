// 42

function search(
    graph: WeightedAdjacencyList,
    curr: number,
    needle: number,
    seen: boolean[],
    path: number[],
): boolean {
    if (seen[curr]) return false

    path.push(curr)
    seen[curr] = true

    if (curr === needle) return true

    const list = graph[curr]
    for (let i = 0; i < list.length; i++) {
        const { to: edge } = list[i]
        if (seen[edge]) continue
        if (search(graph, edge, needle, seen, path)) return true
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
    search(graph, source, needle, seen, path)

    if (path.length === 0) return null

    return path
}
