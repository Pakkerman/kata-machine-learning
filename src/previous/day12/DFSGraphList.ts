function walk(
    graph: WeightedAdjacencyList,
    curr: number,
    needle: number,
    seen: boolean[],
    path: number[],
): boolean {
    // Base case
    // if seen return false
    if (seen[curr]) return false
    // if needle return true

    // push curr into path before the needle check
    path.push(curr)
    seen[curr] = true

    if (curr === needle) return true
    // Recursion
    //pre

    // recurse
    const list = graph[curr]
    for (let i = 0; i < list.length; i++) {
        const edge = list[i]
        if (walk(graph, edge.to, needle, seen, path)) return true
    }

    //post
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
    walk(graph, source, needle, seen, path)

    if (path.length === 0) return null
    return path
}
